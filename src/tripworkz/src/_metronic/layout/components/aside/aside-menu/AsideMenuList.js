/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { useTranslation } from "react-i18next";
export function AsideMenuList({ layoutProps }) {
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
          className={`menu-item ${location.pathname.split('/').includes("trip-information")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link"  to="/trip-information">
            {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
            <span className="menu-text">{t(`Trip Dashboard`)}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
        
        <li
          className={`menu-item ${location.pathname.split('/').includes("profile")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/profile">
            {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span> */}
            <span className="menu-text">{t(`My Profile`)}</span>
          </NavLink>
        </li>
      
        <li
          className={`menu-item ${location.pathname.split('/').includes("account-setting")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/account-setting">
            {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
            <span className="menu-text">{t(`Login & Account Settings`)}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${location.pathname.split('/').includes("refer-my-friend")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/refer-my-friend">
        {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
        <span className="menu-text">{t(`Refer-my-friend`)}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}

        <li
          className={`menu-item ${location.pathname.split('/').includes("my-werkz-credits")|| location.pathname.split('/').includes("werkz-credits")?"menu-item-active":''}`} 
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/my-werkz-credits">
        {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
        <span className="menu-text">{t(`My WerkzCredits`)}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
      
        <li
          className={`menu-item ${location.pathname.split('/').includes("my-vouchers-promo-codes")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/my-vouchers-promo-codes">
     
        <span className="menu-text">{t(`My Vouchers & Promo Codes`)}</span>
          </NavLink>
        </li>
        
        <li
          className={`menu-item ${location.pathname.split('/').includes("gift-vochers")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/gift-vochers">
       
        <span className="menu-text">{t(`Buy Tripwerkz Gift Vouchers`)}</span>
          </NavLink>
        </li>
      
      
        <li
          className={`menu-item ${location.pathname.split('/').includes("booking-purchase") || location.pathname.split('/').includes("booking")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/booking-purchase">
        {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
        <span className="menu-text">{t(`My Booking & Purchases`)}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
      
        <li
          className={`menu-item ${location.pathname.split('/').includes("my-reviews")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/my-reviews">
        {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
        <span className="menu-text">{t(`My Reviews`)}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
        

        <li
          className={`menu-item ${location.pathname.split('/').includes("manage-payment-methods") || location.pathname.split('/').includes("edit-card")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/manage-payment-methods">
        {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
        <span className="menu-text">{t(`Manage Payment Methods`)}</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${location.pathname.split('/').includes("which-list")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/which-list">
        {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
        <span className="menu-text">{t(`Wishlist`)}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        <li
          className={`menu-item ${location.pathname.split('/').includes("e-wallet")||location.pathname.split('/').includes("add-e-wallet-points") ?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-wallet">
        {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
        <span className="menu-text">{t(`E-Wallet`)}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        
        <li
          className={`menu-item ${location.pathname.split('/').includes("open-ticket") ||  location.pathname.split('/').includes("reply-query")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/open-ticket">
        {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
        <span className="menu-text">{t(`Open Ticket`)}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}


        <li
          className={`menu-item ${location.pathname.split('/').includes("blogs")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/blogs">
       
        <span className="menu-text">{t(`Blogs`)}</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${location.pathname.split('/').includes("settings")?"menu-item-active":''}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/settings">
        {/* <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span> */}
        <span className="menu-text"> {t(`Dashboard Configuration`)}</span>
          </NavLink>
        </li>


        




        
        <li
          className={`menu-item ${location.pathname.split('/').includes("add-e-wallet-points")?"menu-item-active":''}`}
          aria-haspopup="true"
        />

      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
