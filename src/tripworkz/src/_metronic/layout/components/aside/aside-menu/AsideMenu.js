import React, {useMemo} from "react";
import {AsideMenuList} from "./AsideMenuList";
import {useHtmlClassService} from "../../../_core/MetronicLayout";
import { AdminAsideMenuList } from "./AdminAsideMenuList";

export function AsideMenu({disableScroll, userType}) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      asideMenuAttr: uiService.getAttributes("aside_menu"),
      ulClasses: uiService.getClasses("aside_menu_nav", true),
      asideClassesFromConfig: uiService.getClasses("aside_menu", true)
    };
  }, [uiService]);
  localStorage.getItem('url');

  
  if(window.location.href===localStorage.getItem('url')){

    console.log("localStorage.getItem('url');",localStorage.getItem('url'))
  }
  return (
    <>
      {/* begin::Menu Container */}
  
      <div
        id="kt_aside_menu"
        data-menu-vertical="1"
        className={window.location.href==="http://localhost:3000/#"+localStorage.getItem('url')
        ||window.location.href==="http://localhost:3000/#/booking-purchase"
        ?`aside-menu  min-h-lg-1000px ${layoutProps.asideClassesFromConfig}`
         :`aside-menu  min-h-lg-800px ${layoutProps.asideClassesFromConfig}`}
        {...layoutProps.asideMenuAttr}
      >
        {
          userType === "Admin" ? 
          <AdminAsideMenuList layoutProps={layoutProps}></AdminAsideMenuList>
          :
          <AsideMenuList layoutProps={layoutProps} />

        }
      </div>
      {/* end::Menu Container */}
    </>
  );
}
