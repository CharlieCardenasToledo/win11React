import icons from "./apps";

var { taskbar, desktop, pinned, recent } = {
  taskbar: (localStorage.getItem("taskbar") &&
    JSON.parse(localStorage.getItem("taskbar"))) || [
    "Settings",
    "File Explorer",
    "Browser",
    "Store",
  ],
  desktop: (localStorage.getItem("desktop") &&
    JSON.parse(localStorage.getItem("desktop"))) || [
    "Material Docente",
    "Blue",
    "Recycle Bin",
  ],
  pinned: (localStorage.getItem("pinned") &&
    JSON.parse(localStorage.getItem("pinned"))) || [
    "Material Docente",
    "01-FT-06-SIM-MC",
    "02-LTI-05A-458-PMSBD-MC",
    "03-PP-07-HCI-ASC",
    "04-GA-GEA-F-10-ED-MC",
    "05-LTI-05A-300-SGBD-ASC",
    "06-LTI-05A-INS-IS-ASC",
    "07-PP-08-AIPTI",
    "Browser",
    "Get Started",
    "Task Manager",
    "Mail",
    "Settings",
    "Store",
    "Unescape",
    "Buy me a coffee",
    "Notepad",
    "Whiteboard",
    "Calculator",
    "Twitter",
    "File Explorer",
    "Terminal",
    "Github",
    "Discord",
    "Camera",
  ],
  recent: (localStorage.getItem("recent") &&
    JSON.parse(localStorage.getItem("recent"))) || [
    "Mail",
    "Twitter",
    "Terminal",
    "Github",
    "File Explorer",
    "Edge",
  ],
};

taskbar = taskbar.filter((x) => x !== "Spotify");
desktop = desktop.filter((x) => x !== "Spotify");
pinned = pinned.filter((x) => x !== "Spotify");
recent = recent.filter((x) => x !== "Spotify");

if (!taskbar.includes("Material Docente")) {
  taskbar.unshift("Material Docente");
}

const desktopAllowed = ["Material Docente", "Recycle Bin", "Blue"];
desktop = desktop.filter((x) => desktopAllowed.includes(x));
desktopAllowed.forEach((name) => {
  if (!desktop.includes(name)) desktop.push(name);
});

const subjectApps = [
  "Material Docente",
  "01-FT-06-SIM-MC",
  "02-LTI-05A-458-PMSBD-MC",
  "03-PP-07-HCI-ASC",
  "04-GA-GEA-F-10-ED-MC",
  "05-LTI-05A-300-SGBD-ASC",
  "06-LTI-05A-INS-IS-ASC",
  "07-PP-08-AIPTI",
];

subjectApps.forEach((name) => {
  if (!pinned.includes(name)) pinned.unshift(name);
});

export const taskApps = icons.filter((x) => taskbar.includes(x.name));

export const desktopApps = icons
  .filter((x) => desktop.includes(x.name))
  .sort((a, b) => {
    return desktop.indexOf(a.name) > desktop.indexOf(b.name) ? 1 : -1;
  });

export const pinnedApps = icons
  .filter((x) => pinned.includes(x.name))
  .sort((a, b) => {
    return pinned.indexOf(a.name) > pinned.indexOf(b.name) ? 1 : -1;
  });

export const recentApps = icons
  .filter((x) => recent.includes(x.name))
  .sort((a, b) => {
    return recent.indexOf(a.name) > recent.indexOf(b.name) ? 1 : -1;
  });

export const allApps = icons.filter((app) => {
  return app.type === "app";
});

export const dfApps = {
  taskbar,
  desktop,
  pinned,
  recent,
};
