import React from "react";
import i18next from "i18next";

function LangSwitch() {
  return (
    <div className="langSwitcher">
      <select
        value={i18next.language}
        onChange={(e) => i18next.changeLanguage(e.target.value)}
      >
        <option value="da">Dansk</option>
        <option value="de">Deutsch</option>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="hi">हिन्दी</option>
        <option value="hu">Magyar</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
        <option value="nl">Nederlands</option>
        <option value="ru">Русский</option>
        <option value="tr">Türkçe</option>
        <option value="zh">中文</option>
        <option value="si">Sinhala</option>
      </select>
    </div>
  );
}

export default LangSwitch;
