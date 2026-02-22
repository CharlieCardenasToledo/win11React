import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Icon, ToolBar } from "../../../utils/general";
import "./assets/powerpoint.scss";

export const PowerPointReader = () => {
  const wnapp = useSelector((state) => state.apps.powerpoint);
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [presentMode, setPresentMode] = useState(false);
  const [deckState, setDeckState] = useState({
    current: 0,
    total: 0,
    titles: [],
    previews: [],
  });
  const frameRef = useRef(null);
  const thumbsRef = useRef(null);
  const [visibleThumbs, setVisibleThumbs] = useState({});
  const [thumbErrors, setThumbErrors] = useState({});

  const slides = useMemo(
    () => [
      {
        id: 1,
        title: t("ppt.slide1.title"),
        subtitle: t("ppt.slide1.subtitle"),
        bullets: [
          t("ppt.slide1.b1"),
          t("ppt.slide1.b2"),
          t("ppt.slide1.b3"),
        ],
      },
      {
        id: 2,
        title: t("ppt.slide2.title"),
        subtitle: t("ppt.slide2.subtitle"),
        bullets: [
          t("ppt.slide2.b1"),
          t("ppt.slide2.b2"),
          t("ppt.slide2.b3"),
        ],
      },
      {
        id: 3,
        title: t("ppt.slide3.title"),
        subtitle: t("ppt.slide3.subtitle"),
        bullets: [
          t("ppt.slide3.b1"),
          t("ppt.slide3.b2"),
          t("ppt.slide3.b3"),
        ],
      },
      {
        id: 4,
        title: t("ppt.slide4.title"),
        subtitle: t("ppt.slide4.subtitle"),
        bullets: [
          t("ppt.slide4.b1"),
          t("ppt.slide4.b2"),
          t("ppt.slide4.b3"),
        ],
      },
    ],
    [t],
  );

  const slide = slides[activeSlide];
  const hasDeck = Boolean(wnapp.url);
  const deckTotal = hasDeck ? deckState.total : slides.length;
  const currentIndex = hasDeck ? deckState.current : activeSlide;
  const deckTitles = hasDeck
    ? (deckState.titles.length
        ? deckState.titles
        : Array.from({ length: deckState.total || 0 }, (_, i) => `Slide ${i + 1}`))
    : slides.map((s) => s.title);
  const deckPreviews = hasDeck ? deckState.previews || [] : [];
  const deckUrl = useMemo(() => {
    if (!wnapp.url) return "";
    const [base, hash = ""] = wnapp.url.split("#");
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}embedded=1${hash ? `#${hash}` : ""}`;
  }, [wnapp.url]);

  const deckThumbImageUrl = (index) => {
    if (!wnapp.url) return "";
    const [base] = wnapp.url.split("?");
    const folder = base.replace(/\/[^/]*$/, "");
    return `${folder}/thumbs/slide-${String(index + 1).padStart(2, "0")}.webp`;
  };

  const sendDeckCommand = (command, index) => {
    const target = frameRef.current?.contentWindow;
    if (!target) return;
    target.postMessage({ type: "ppt-command", command, index }, "*");
  };

  const prev = () => {
    if (hasDeck) {
      sendDeckCommand("prev");
    } else {
      setActiveSlide((v) => Math.max(0, v - 1));
    }
  };
  const next = () => {
    if (hasDeck) {
      sendDeckCommand("next");
    } else {
      setActiveSlide((v) => Math.min(slides.length - 1, v + 1));
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!presentMode || !hasDeck) return;
      if (e.key === "ArrowLeft") sendDeckCommand("prev");
      if (e.key === "ArrowRight") sendDeckCommand("next");
      if (e.key === "Escape") setPresentMode(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presentMode, hasDeck]);

  useEffect(() => {
    if (!hasDeck) return;
    const onMessage = (event) => {
      const data = event.data || {};
      if (data.type !== "ppt-state") return;
      setDeckState({
        current: Number.isInteger(data.current) ? data.current : 0,
        total: Number.isInteger(data.total) ? data.total : 0,
        titles: Array.isArray(data.titles) ? data.titles : [],
        previews: Array.isArray(data.previews) ? data.previews : [],
      });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [hasDeck]);

  useEffect(() => {
    if (!hasDeck) return;
    const root = thumbsRef.current;
    if (!root) return;
    const nodes = root.querySelectorAll(".pptThumbMini[data-idx]");
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleThumbs((prev) => {
          const next = { ...prev };
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (Number.isInteger(idx)) {
              next[idx] = true;
              observer.unobserve(entry.target);
            }
          });
          return next;
        });
      },
      { root, rootMargin: "120px 0px", threshold: 0.01 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [hasDeck, deckTitles.length]);

  return (
    <div
      className="pptreader floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name={t("ppt.appName")}
      />
      <div className="windowScreen flex flex-col">
        <div className="pptTopBar px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon src="powerpoint" width={18} />
            <span className="text-xs font-semibold">
              {hasDeck ? t("ppt.deckLoaded") : t("ppt.readOnly")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {hasDeck ? (
              <button
                className="pptModeBtn"
                onClick={() => setPresentMode((v) => !v)}
              >
                {presentMode ? t("ppt.exitPresentMode") : t("ppt.presentMode")}
              </button>
            ) : null}
            <div className="text-xs">
              {t("ppt.slideCounter", {
                current: Math.max(1, currentIndex + 1),
                total: Math.max(1, deckTotal),
              })}
            </div>
          </div>
        </div>

        <div className="restWindow flex-grow flex" data-present={presentMode}>
          <div className="pptThumbs win11Scroll" ref={thumbsRef}>
            {deckTitles.map((title, idx) => (
              <button
                key={`${title}-${idx}`}
                className="pptThumb"
                data-active={idx === currentIndex}
                onClick={() => (hasDeck ? sendDeckCommand("go", idx) : setActiveSlide(idx))}
              >
                <div className="pptThumbNum">{idx + 1}</div>
                <div className="pptThumbMini" data-idx={idx}>
                  {hasDeck && (visibleThumbs[idx] || idx === currentIndex) && !thumbErrors[idx] ? (
                    <img
                      className="pptThumbImage"
                      src={deckThumbImageUrl(idx)}
                      alt={`Slide ${idx + 1}`}
                      loading="lazy"
                      onError={() =>
                        setThumbErrors((prev) => ({ ...prev, [idx]: true }))
                      }
                    />
                  ) : (
                    <>
                      <div className="pptThumbMiniAccent" />
                      <div className="pptThumbMiniBody">
                        <div className="pptThumbMiniTitle">
                          {deckPreviews[idx]?.heading || title}
                        </div>
                        {deckPreviews[idx]?.sub ? (
                          <div className="pptThumbMiniSub">{deckPreviews[idx].sub}</div>
                        ) : null}
                        {(deckPreviews[idx]?.bullets || []).slice(0, 2).map((bullet, bulletIdx) => (
                          <div className="pptThumbMiniLine" key={`${idx}-${bulletIdx}`}>
                            {bullet}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  <div className="pptThumbMiniPage">{idx + 1}</div>
                </div>
                <div className="pptThumbTitle">{title}</div>
              </button>
            ))}
          </div>

          <div className="pptStage">
            {hasDeck ? (
              <iframe
                ref={frameRef}
                className="pptFrame"
                src={deckUrl}
                title="ppt-deck"
                frameBorder="0"
                onLoad={() => sendDeckCommand("state")}
              />
            ) : (
              <div className="pptSlide">
                <div className="pptAccent" />
                <div className="pptContent">
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <ul>
                    {slide.bullets.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="pptControls">
              <button onClick={prev} disabled={currentIndex === 0}>
                {t("ppt.prev")}
              </button>
              <button onClick={next} disabled={currentIndex >= Math.max(0, deckTotal - 1)}>
                {t("ppt.next")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
