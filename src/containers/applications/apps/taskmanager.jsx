import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ToolBar } from "../../../utils/general";
import { Icon } from "../../../utils/general";
import "./assets/taskmanager.scss";

import apps from "../../../utils/apps";

let appList = [];

apps.map((e) => {
  appList.push(e.name);
});

export const Taskmanager = () => {
  const wnapp = useSelector((state) => state.apps.taskmanager);
  const { t } = useTranslation();

  const [tab, setTab] = useState("Processes");
  const [nav, setNav] = useState("open");

  const tabNames = [
    { title: "Processes", icon: "faTableCellsLarge", label: t("taskmgr.processes") },
    { title: "Performance", icon: "faWaveSquare", label: t("taskmgr.performance") },
    { title: "App history", icon: "faClockRotateLeft", label: t("taskmgr.appHistory") },
    { title: "Startup apps", icon: "faGaugeHigh", label: t("taskmgr.startupApps") },
    { title: "Users", icon: "faUser", label: t("taskmgr.users") },
    { title: "Details", icon: "faList", label: t("taskmgr.details") },
    { title: "Services", icon: "faPuzzlePiece", label: t("taskmgr.services") },
    { title: "Settings", icon: "faGear", label: t("taskmgr.settings") },
  ];

  const powerUsage = [
    t("taskmgr.power.veryLow"),
    t("taskmgr.power.low"),
    t("taskmgr.power.moderate"),
    t("taskmgr.power.high"),
    t("taskmgr.power.veryHigh"),
  ];

  return (
    <div
      className="taskmanagerApp floatTab dpShad"
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
        name={t("taskmgr.appName")}
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
          <nav className={nav}>
            {tabNames.map((t, i) => {
              return (
                <div
                  key={i}
                  className={`navLink ${t.title === tab ? "selected" : ""}`}
                  onClick={() => setTab(t.title)}
                >
                  <Icon className="mx-2" fafa={t.icon} />
                  <span className="tabName">{t.label}</span>
                </div>
              );
            })}
            <div className="marker"></div>
          </nav>
          <main className="win11Scroll">
            <h3>
              {tabNames.find((x) => x.title === tab)?.label || tab}
            </h3>
            {(() => {
              switch (tab) {
                case "Processes":
                  return (
                    <div className="Processes">
                      <table>
                        <thead>
                          <tr>
                            <th>{t("taskmgr.name")}</th>
                            <th>CPU</th>
                            <th>{t("taskmgr.memory")}</th>
                            <th>{t("taskmgr.disk")}</th>
                            <th>{t("taskmgr.network")}</th>
                            <th>GPU</th>
                            <th>{t("taskmgr.powerUsage")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appList.map((e, i) => {
                            return (
                              <tr key={i}>
                                <td className="name">{e}</td>
                                <td>{(Math.random() * 10).toFixed(2)}%</td>
                                <td>{(Math.random() * 100).toFixed(2)} MB</td>
                                <td>{(Math.random() * 50).toFixed(2)} MB/s</td>
                                <td>{(Math.random() * 50).toFixed(2)} MBps</td>
                                <td>{(Math.random() * 10).toFixed(2)}%</td>
                                <td>
                                  {
                                    powerUsage[
                                      Math.floor(
                                        Math.random() * powerUsage.length,
                                      )
                                    ]
                                  }
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                default:
                  return;
              }
            })()}
          </main>
          <div className="navMenuBtn" onClick={() => setNav(nav ? "" : "open")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 48 48"
              width={24}
              height={24}
            >
              <path d="M5.5 9a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
