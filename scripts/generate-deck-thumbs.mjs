import http from "node:http";
import { readFileSync, statSync, existsSync, mkdirSync, unlinkSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const args = process.argv.slice(2);
const getArg = (key, fallback) => {
  const idx = args.indexOf(`--${key}`);
  if (idx === -1 || idx + 1 >= args.length) return fallback;
  return args[idx + 1];
};

const publicDir = resolve("public");
const deck = getArg(
  "deck",
  "/material-docente/01-FT-06-SIM-MC/semana-01/presentacion.html",
);
const outDirArg = getArg(
  "outDir",
  "/material-docente/01-FT-06-SIM-MC/semana-01/thumbs",
);
const port = Number.parseInt(getArg("port", "4174"), 10);
const width = Number.parseInt(getArg("width", "1280"), 10);
const height = Number.parseInt(getArg("height", "720"), 10);
const webpQuality = Number.parseInt(getArg("quality", "78"), 10);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function safeFileFromUrl(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const rel = decoded === "/" ? "/index.html" : decoded;
  const abs = normalize(join(publicDir, rel));
  if (!abs.startsWith(publicDir)) return null;
  return abs;
}

const server = http.createServer((req, res) => {
  const file = safeFileFromUrl(req.url || "/");
  if (!file || !existsSync(file) || statSync(file).isDirectory()) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  try {
    const body = readFileSync(file);
    res.setHeader("Content-Type", mime[extname(file)] || "application/octet-stream");
    res.end(body);
  } catch {
    res.statusCode = 500;
    res.end("Error");
  }
});

await new Promise((resolveListen) => server.listen(port, "127.0.0.1", resolveListen));

const outAbs = resolve("public", outDirArg.replace(/^\//, ""));
mkdirSync(outAbs, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width, height } });
const page = await context.newPage();

const deckUrl = `http://127.0.0.1:${port}${deck}?embedded=1`;
await page.goto(deckUrl, { waitUntil: "networkidle" });
await page.waitForTimeout(250);
const totalSlides = await page.evaluate(() => document.querySelectorAll(".slide").length);

for (let i = 1; i <= totalSlides; i += 1) {
  const url = `http://127.0.0.1:${port}${deck}?embedded=1&thumb=1&slide=${i}`;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(120);
  const base = `slide-${String(i).padStart(2, "0")}`;
  const pngPath = join(outAbs, `${base}.png`);
  const webpPath = join(outAbs, `${base}.webp`);
  await page.screenshot({
    path: pngPath,
    type: "png",
    fullPage: false,
  });
  await sharp(pngPath).webp({ quality: webpQuality }).toFile(webpPath);
  unlinkSync(pngPath);
  console.log(`Generated ${base}.webp`);
}

await browser.close();
await new Promise((resolveClose) => server.close(resolveClose));
console.log(`Done. Slides: ${totalSlides}, output: ${outAbs}`);
