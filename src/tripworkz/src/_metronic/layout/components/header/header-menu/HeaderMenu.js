/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import LanguageDropdown from "../../../../../app/components/languageDropdown/LanguageDropdown";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Dropdown from 'react-bootstrap/Dropdown';
const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  ar: { label: "العربية", dir: "rtl", active: false },
  hi: { label: "हिंदी", dir: "ltr", active: false },
  ch: { label: "中文 ", dir: "ltr", active: false },
};
export function HeaderMenu({ layoutProps }) {
  const { t } = useTranslation();
  const selected = localStorage.getItem("i18nextLng") || "en";
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [lang,setLang]=React.useState();
  React.useEffect(() => {
    document.body.dir = languageMap[selected].dir;
  }, [menuAnchor, selected]);
  const handleSelect = (e) => {
    setLang(e)
    if(e === "ar"){
      // document.body.dir="rtl"
      
    }
    else{
      document.body.dir= "ltr"
    }
    i18next.changeLanguage(e)

  }
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  
  if (window.location.path === "privacy-policy") {
    window.location =
      "example.zendesk.com/hc/en-us/articles/123456789-Privacy-Policies";
  }
  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      {/* {location.pathname=="/auth/login"?"": */}

      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        {/* <li className={`menu-item menu-item-rel ${getMenuItemActive('/home')}`}>
                <NavLink className="menu-link" to="/home">
                    <span className="menu-text">Home</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li> */}
        <li
          className={`menu-item menu-item-submenu menu-item-rel`}
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
        >
          <Link
            href="https://www.tripwerkz.com/"

            className="MenuLinkInformation"
          >
            <span className="menu-text-now">{t(`Hotel`)}</span>
            <i className="menu-arrow"></i>
          </Link>
        </li>
        {/*end::1 Level*/}

        {/*Classic submenu*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-submenu menu-item-rel`}
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
        >
          <Link
            href="https://flight.tripwerkz.com/crs.flight/www/flight.aspx?lan=en-US"

            className="MenuLinkInformation"
          >
            <span className="menu-text-now">{t(`Flights`)}</span>
            <i className="menu-arrow"></i>
          </Link>
        </li>
     
        <li
          className={`menu-item menu-item-submenu menu-item-rel`}
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
        >
          <Link
            href="https://www.tripwerkz.com/blogs/"

            className="MenuLinkInformation"
          >
            <span className="menu-text-now">{t(`Blogs`)}</span>
            <i className="menu-arrow"></i>
          </Link>
        </li>
        <li
          className={`menu-item menu-item-submenu menu-item-rel mr-4`}
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
        >
          <div
            className="MenuLinkInformation"
          >

            <Dropdown onSelect={handleSelect} className="p-0 pt-1">
              <Dropdown.Toggle variant="none" className="text-light p-0" >
                <span className="menu-text-now">{t(`Select language`)}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-25" >
                {Object.keys(languageMap).map((item, index) => (
                  <Dropdown.Item eventKey={item}>
                    {lang===item?<span style={{color:"#287CBC",fontSize:"16px",fontWeight:"500"}} >{languageMap[item].label}</span>:<span >{languageMap[item].label}</span>}</Dropdown.Item>
                ))}

              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* <LanguageDropdown /> */}


        </li>
        {/*begin::1 Level*/}
        
        {/*end::1 Level*/}
        {/* <li data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/user')}`}>
                <NavLink className="menu-link menu-toggle" to="/user">
                    <span className="svg-icon svg-icon-xl" style={{backgroundColor: 'white', padding: '6px', borderRadius: '50%'}}>
                        <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
                    </span>
                </NavLink>
            </li> */}
      </ul>

      {/*end::Header Nav*/}
    </div>
  );
}
