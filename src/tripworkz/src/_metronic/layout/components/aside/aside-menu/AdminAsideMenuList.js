/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { useTranslation } from "react-i18next";
export function AdminAsideMenuList({ layoutProps }) {
  const location = useLocation();
  const { t } = useTranslation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/admin/profile",
            false
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/admin/profile">
            {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
            <span className="menu-text">{t(`Profile`)}</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${location.pathname.split('/').includes("vouchers")?"menu-item-active":''}`} 
          aria-haspopup="true">
          <NavLink className="menu-link" to="/admin/vouchers/list">
            {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
            <span className="menu-text">{t(`Vouchers`)}</span>
          </NavLink>
        </li>
        {/* Karan changes starts here */}
        <li
          className={`menu-item ${getMenuItemActive(
            "/admin/werkcreditz",
            true
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/admin/werkcreditz">
            <span className="menu-text">{t(`Werkcreditz`)}</span>
          </NavLink>
        </li>

        {/* <li
          className={`menu-item ${getMenuItemActive(
            "/admin/werkcreditz-expiry",
            false
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/admin/werkcreditz-expiry">
            <span className="menu-text">Werkcreditz Expiry</span>
          </NavLink>
        </li> */}

        <li
          className={`menu-item ${getMenuItemActive("/admin/blogs", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/admin/blogs">
            <span className="menu-text">{t(`Blogs`)}</span>
          </NavLink>
        </li>

        <li
          className={`menu-item ${getMenuItemActive("/admin/reviews", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/admin/reviews">
            <span className="menu-text">{t(`Reviews`)}</span>
          </NavLink>
        </li>

       <li className={`menu-item ${location.pathname.split('/').includes("promocodes")?"menu-item-active":''}`} 
          aria-haspopup="true">
          <NavLink className="menu-link" to="/admin/promocodes/list">
            <span className="menu-text">{t(`Promocodes`)}</span>
          </NavLink>
        </li>

        {/* Karan changes ends here */}
        <li
          className={`menu-item ${location.pathname.split('/').includes("open-ticket")|| location.pathname.split('/').includes("reply-query")?"menu-item-active":''}`} 
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/admin/open-ticket">
            <span className="menu-text">{t(`Open Ticket`)}</span>
          </NavLink>
        </li>
      </ul>

     
      {/* end::Menu Nav */}
    </>
  );
}
