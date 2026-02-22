import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Icon, Image, ToolBar } from "../../../utils/general";
import { dispatchAction, handleFileOpen } from "../../../actions";
import "./assets/fileexpo.scss";

const EXPLORER_LABEL_KEYS = {
  backup: "explorer.label.backup",
  config: "explorer.label.config",
  "Program Files": "explorer.label.programFiles",
  temp: "explorer.label.temp",
  Users: "explorer.label.users",
  Public: "explorer.label.public",
  "Public Documents": "explorer.label.publicDocuments",
  "Public Downloads": "explorer.label.publicDownloads",
  "Public Music": "explorer.label.publicMusic",
  "Public Pictures": "explorer.label.publicPictures",
  "Public Videos": "explorer.label.publicVideos",
  Desktop: "explorer.label.desktopFolder",
  Documents: "explorer.label.documentsFolder",
  Downloads: "explorer.label.downloadsFolder",
  Music: "explorer.label.musicFolder",
  Pictures: "explorer.label.picturesFolder",
  Videos: "explorer.label.videosFolder",
  OneDrive: "explorer.label.oneDriveFolder",
  Contacts: "explorer.label.contacts",
  Favorites: "explorer.label.favorites",
  Programs: "explorer.label.programs",
  "New Folder": "explorer.label.newFolder",
  Windows: "explorer.label.windows",
  Github: "explorer.label.githubFolder",
  Blue: "explorer.label.blueUser",
  "Material Docente": "explorer.label.materialDocente",
  "01-FT-06-SIM-MC": "explorer.label.subject01",
  "02-LTI-05A-458-PMSBD-MC": "explorer.label.subject02",
  "03-PP-07-HCI-ASC": "explorer.label.subject03",
  "04-GA-GEA-F-10-ED-MC": "explorer.label.subject04",
  "05-LTI-05A-300-SGBD-ASC": "explorer.label.subject05",
  "06-LTI-05A-INS-IS-ASC": "explorer.label.subject06",
  "07-PP-08-AIPTI": "explorer.label.subject07",
  "Material de clase": "explorer.label.classMaterial",
  Practica: "explorer.label.practice",
  Tarea: "explorer.label.homework",
};

const getExplorerLabel = (t, label) => {
  const weekMatch = /^Semana\s+(\d{2})$/i.exec(label);
  if (weekMatch) {
    return t("explorer.weekLabel", { num: weekMatch[1] });
  }
  const key = EXPLORER_LABEL_KEYS[label];
  return key ? t(key) : label;
};

const NavTitle = (props) => {
  var src = props.icon || "folder";

  return (
    <div
      className="navtitle flex prtclk"
      data-action={props.action}
      data-payload={props.payload}
      onClick={dispatchAction}
    >
      <Icon
        className="mr-1"
        src={"win/" + src + "-sm"}
        width={props.isize || 16}
      />
      <span>{props.title}</span>
    </div>
  );
};

const FolderDrop = ({ dir }) => {
  const { t } = useTranslation();
  const files = useSelector((state) => state.files);
  const folder = files.data.getId(dir);

  return (
    <>
      {folder.data &&
        folder.data.map((item, i) => {
          if (item.type == "folder") {
            return (
              <Dropdown
                key={i}
                icon={item.info && item.info.icon}
                title={getExplorerLabel(t, item.name)}
                notoggle={item.data.length == 0}
                dir={item.id}
              />
            );
          }
        })}
    </>
  );
};

const Dropdown = (props) => {
  const [open, setOpen] = useState(props.isDropped != null);
  const special = useSelector((state) => state.files.data.special);
  const [fid, setFID] = useState(() => {
    if (props.spid) return special[props.spid];
    else return props.dir;
  });
  const toggle = () => setOpen(!open);

  return (
    <div className="dropdownmenu">
      <div className="droptitle">
        {!props.notoggle ? (
          <Icon
            className="arrUi"
            fafa={open ? "faChevronDown" : "faChevronRight"}
            width={10}
            onClick={toggle}
            pr
          />
        ) : (
          <Icon className="arrUi opacity-0" fafa="faCircle" width={10} />
        )}
        <NavTitle
          icon={props.icon}
          title={props.title}
          isize={props.isize}
          action={props.action != "" ? props.action || "FILEDIR" : null}
          payload={fid}
        />
        {props.pinned != null ? (
          <Icon className="pinUi" src="win/pinned" width={16} />
        ) : null}
      </div>
      {!props.notoggle ? (
        <div className="dropcontent">
          {open ? props.children : null}
          {open && fid != null ? <FolderDrop dir={fid} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export const Explorer = () => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.explorer);
  const files = useSelector((state) => state.files);
  const fdata = files.data.getId(files.cdir);
  const [cpath, setPath] = useState(files.cpath);
  const [searchtxt, setShText] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChange = (e) => setPath(e.target.value);
  const handleSearchChange = (e) => setShText(e.target.value);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      dispatch({ type: "FILEPATH", payload: cpath });
    }
  };

  const DirCont = () => {
    var arr = [],
      curr = fdata,
      index = 0;

    while (curr) {
      arr.push(
        <div key={index++} className="dirCont flex items-center">
          <div
            className="dncont"
            onClick={dispatchAction}
            tabIndex="-1"
            data-action="FILEDIR"
            data-payload={curr.id}
          >
            {getExplorerLabel(t, curr.name)}
          </div>
          <Icon className="dirchev" fafa="faChevronRight" width={8} />
        </div>,
      );

      curr = curr.host;
    }

    arr.push(
      <div key={index++} className="dirCont flex items-center">
        <div className="dncont" tabIndex="-1">
          {t("explorer.thisPc")}
        </div>
        <Icon className="dirchev" fafa="faChevronRight" width={8} />
      </div>,
    );

    arr.push(
      <div key={index++} className="dirCont flex items-center">
        <Icon
          className="pr-1 pb-px"
          src={"win/" + fdata.info.icon + "-sm"}
          width={16}
        />
        <Icon className="dirchev" fafa="faChevronRight" width={8} />
      </div>,
    );

    return (
      <div key={index++} className="dirfbox h-full flex">
        {arr.reverse()}
      </div>
    );
  };

  useEffect(() => {
    setPath(files.cpath);
    setShText("");
  }, [files.cpath]);

  useEffect(() => {
    if (wnapp.dir != null) {
      dispatch({ type: "FILEDIR", payload: wnapp.dir });
      dispatch({ type: "OPENDIR", payload: null });
    }
  }, [wnapp.dir, dispatch]);

  return (
    <div
      className="msfiles floatTab dpShad"
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
        name={t("explorer.appName")}
      />
      <div className="windowScreen flex flex-col">
        <Ribbon />
        <div className="restWindow flex-grow flex flex-col">
          <div className="sec1">
            <Icon
              className={
                "navIcon hvtheme" + (files.hid == 0 ? " disableIt" : "")
              }
              fafa="faArrowLeft"
              width={14}
              click="FILEPREV"
              pr
            />
            <Icon
              className={
                "navIcon hvtheme" +
                (files.hid + 1 == files.hist.length ? " disableIt" : "")
              }
              fafa="faArrowRight"
              width={14}
              click="FILENEXT"
              pr
            />
            <Icon
              className="navIcon hvtheme"
              fafa="faArrowUp"
              width={14}
              click="FILEBACK"
              pr
            />
            <div className="path-bar noscroll" tabIndex="-1">
              <input
                className="path-field"
                type="text"
                value={cpath}
                onChange={handleChange}
                onKeyDown={handleEnter}
              />
              <DirCont />
            </div>
            <div className="srchbar">
              <Icon className="searchIcon" src="search" width={12} />
              <input
                type="text"
                onChange={handleSearchChange}
                value={searchtxt}
                placeholder={t("explorer.search")}
              />
            </div>
          </div>
          <div className="sec2">
            <NavPane />
            <ContentArea searchtxt={searchtxt} />
          </div>
          <div className="sec3">
            <div className="item-count text-xs">
              {t("explorer.itemsCount", { count: fdata.data.length })}
            </div>
            <div className="view-opts flex">
              <Icon
                className="viewicon hvtheme p-1"
                click="FILEVIEW"
                payload="5"
                open={files.view == 5}
                src="win/viewinfo"
                width={16}
              />
              <Icon
                className="viewicon hvtheme p-1"
                click="FILEVIEW"
                payload="1"
                open={files.view == 1}
                src="win/viewlarge"
                width={16}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentArea = ({ searchtxt }) => {
  const { t } = useTranslation();
  const files = useSelector((state) => state.files);
  const special = useSelector((state) => state.files.data.special);
  const [selected, setSelect] = useState(null);
  const fdata = files.data.getId(files.cdir);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    setSelect(e.target.dataset.id);
  };

  const handleDouble = (e) => {
    e.stopPropagation();
    handleFileOpen(e.target.dataset.id);
  };

  const emptyClick = (e) => {
    setSelect(null);
  };

  const handleKey = (e) => {
    if (e.key == "Backspace") {
      dispatch({ type: "FILEPREV" });
    }
  };

  return (
    <div
      className="contentarea"
      onClick={emptyClick}
      onKeyDown={handleKey}
      tabIndex="-1"
    >
      <div className="contentwrap win11Scroll">
        <div className="gridshow" data-size="lg">
          {fdata.data.map((item, i) => {
            const displayName = getExplorerLabel(t, item.name);
            const query = searchtxt.trim().toLowerCase();
            const matches =
              !query ||
              item.name.toLowerCase().includes(query) ||
              displayName.toLowerCase().includes(query);
            return (
              matches && (
                <div
                  key={i}
                  className="conticon hvtheme flex flex-col items-center prtclk"
                  data-id={item.id}
                  data-focus={selected == item.id}
                  onClick={handleClick}
                  onDoubleClick={handleDouble}
                >
                  <Image src={`icon/win/${item.info.icon}`} />
                  <span>{displayName}</span>
                </div>
              )
            );
          })}
        </div>
        {fdata.data.length == 0 ? (
          <span className="text-xs mx-auto">{t("explorer.emptyFolder")}</span>
        ) : null}
      </div>
    </div>
  );
};

const NavPane = ({}) => {
  const { t } = useTranslation();
  const files = useSelector((state) => state.files);
  const special = useSelector((state) => state.files.data.special);

  return (
    <div className="navpane win11Scroll">
      <div className="extcont">
        <Dropdown icon="star" title={t("explorer.quickAccess")} action="" isDropped>
          <Dropdown
            icon="down"
            title={t("explorer.downloads")}
            spid="%downloads%"
            notoggle
            pinned
          />
          <Dropdown
            icon="user"
            title={t("explorer.user")}
            spid="%user%"
            notoggle
            pinned
          />
          <Dropdown
            icon="docs"
            title={t("explorer.documents")}
            spid="%documents%"
            notoggle
            pinned
          />
          <Dropdown title={t("explorer.github")} spid="%github%" notoggle />
          <Dropdown
            icon="pics"
            title={t("explorer.pictures")}
            spid="%pictures%"
            notoggle
          />
        </Dropdown>
        <Dropdown
          icon="onedrive"
          title={t("explorer.oneDrive")}
          spid="%onedrive%"
        />
        <Dropdown
          icon="docs"
          title={t("explorer.materialDocente")}
          spid="%material_docente%"
        />
        <Dropdown icon="thispc" title={t("explorer.thisPc")} action="" isDropped>
          <Dropdown icon="desk" title={t("explorer.desktop")} spid="%desktop%" />
          <Dropdown icon="docs" title={t("explorer.documents")} spid="%documents%" />
          <Dropdown icon="down" title={t("explorer.downloads")} spid="%downloads%" />
          <Dropdown icon="music" title={t("explorer.music")} spid="%music%" />
          <Dropdown icon="pics" title={t("explorer.pictures")} spid="%pictures%" />
          <Dropdown icon="vid" title={t("explorer.videos")} spid="%videos%" />
          <Dropdown icon="disc" title={t("explorer.osDrive")} spid="%cdrive%" />
          <Dropdown
            icon="disk"
            title={t("explorer.dataDrive")}
            spid="%ddrive%"
          />
        </Dropdown>
      </div>
    </div>
  );
};

const Ribbon = ({}) => {
  const { t } = useTranslation();
  return (
    <div className="msribbon flex">
      <div className="ribsec">
        <div className="drdwcont flex">
          <Icon src="new" ui width={18} margin="0 6px" />
          <span>{t("explorer.new")}</span>
        </div>
      </div>
      <div className="ribsec">
        <Icon src="cut" ui width={18} margin="0 6px" />
        <Icon src="copy" ui width={18} margin="0 6px" />
        <Icon src="paste" ui width={18} margin="0 6px" />
        <Icon src="rename" ui width={18} margin="0 6px" />
        <Icon src="share" ui width={18} margin="0 6px" />
      </div>
      <div className="ribsec">
        <div className="drdwcont flex">
          <Icon src="sort" ui width={18} margin="0 6px" />
          <span>{t("explorer.sort")}</span>
        </div>
        <div className="drdwcont flex">
          <Icon src="view" ui width={18} margin="0 6px" />
          <span>{t("explorer.view")}</span>
        </div>
      </div>
    </div>
  );
};
