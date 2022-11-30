/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import { Link,useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import SVG from "react-inlinesvg";
import { useTranslation } from "react-i18next";
export function UserProfileDropdown() {
  const { user } = useSelector(state => state.main);
  const { t } = useTranslation();
  const { auth, main } = useSelector((state) => state);
  
  const location=useLocation()
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      light: objectPath.get(uiService.config, "extras.user.dropdown.style") === "light",
    };
  }, [uiService]);
  //console.log("data",user,auth.user.firstName)
  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={DropdownTopbarItemToggler}
        id="dropdown-toggle-user-profile"
      >
        <span className="svg-icon svg-icon-xl" style={{ backgroundColor: 'white', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}>
          <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
        </span>
        {/* </div> */}
      </Dropdown.Toggle>
      {
        auth.user && location.pathname!=="/auth/login"
        && location.pathname!=="/auth/registration" &&
        
        <Dropdown.Menu
          className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg p-0">
          <>
            {/** ClassName should be 'dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
            {layoutProps.light && (<>
              <div className="d-flex align-items-center p-8 rounded-top">

                <div className="symbol symbol-md bg-light-primary mr-3 flex-shrink-0">
                  <img src={toAbsoluteUrl("/media/users/default.jpg")} alt="" />
                </div>
                {
                   auth.user &&
                  <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">
                    {auth.user.firstName} {''} {auth.user.lastName}
                    {/* {! auth.user['firstName'] && ! auth.user[`lastName`] ? user['emaiL_ID'].split('@')[0] : `${user['firstName']} ${user['lastName']}`} */}
                     </div>
                }
              </div>
              <div className="separator separator-solid"></div>
            </>
            )}
          </>

          <div className="navi navi-spacer-x-0 pt-5">
            <div className="navi-footer px-8 py-5">
              <Link to="/logout" className="btn  font-weight-bold" style={{background:"#287CBC",color:"#ffffff"}}>
                {t(`Sign Out`)}
              </Link>
            </div>
          </div>
        </Dropdown.Menu>
       } 
    </Dropdown>
  );
}
