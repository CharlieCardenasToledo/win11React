import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Icon, ToolBar } from "../../../utils/general";
import "./assets/powerpoint.scss";

export const PowerPointReader = () => {
  const wnapp = useSelector((state) => state.apps.powerpoint);
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

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

  const prev = () => setActiveSlide((v) => Math.max(0, v - 1));
  const next = () =>
    setActiveSlide((v) => Math.min(slides.length - 1, v + 1));

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
            <span className="text-xs font-semibold">{t("ppt.readOnly")}</span>
          </div>
          <div className="text-xs">
            {t("ppt.slideCounter", { current: activeSlide + 1, total: slides.length })}
          </div>
        </div>

        <div className="restWindow flex-grow flex">
          <div className="pptThumbs win11Scroll">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                className="pptThumb"
                data-active={idx === activeSlide}
                onClick={() => setActiveSlide(idx)}
              >
                <div className="pptThumbNum">{idx + 1}</div>
                <div className="pptThumbTitle">{s.title}</div>
              </button>
            ))}
          </div>

          <div className="pptStage">
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

            <div className="pptControls">
              <button onClick={prev} disabled={activeSlide === 0}>
                {t("ppt.prev")}
              </button>
              <button onClick={next} disabled={activeSlide === slides.length - 1}>
                {t("ppt.next")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
