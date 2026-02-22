import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ToolBar } from "../../../utils/general";

export const Notepad = () => {
  const wnapp = useSelector((state) => state.apps.notepad);
  const { t } = useTranslation();

  return (
    <div
      className="notepad floatTab dpShad"
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
        name={t("notepad.title")}
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="flex text-xs py-2 topBar">
          <div className="mx-2">{t("notepad.file")}</div>
          <div className="mx-4">{t("notepad.edit")}</div>
          <div className="mx-4">{t("notepad.view")}</div>
        </div>
        <div className="restWindow h-full flex-grow">
          <div className="w-full h-full overflow-hidden">
            <textarea className="noteText win11Scroll" id="textpad" />
          </div>
        </div>
      </div>
    </div>
  );
};
