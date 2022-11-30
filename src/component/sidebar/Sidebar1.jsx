import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { colors } from "../../constants/Colors";
import { sideBarData } from "../../data/sidebardata";
import useRole from "../../hooks/useRole";
import InsurancePortal from "../insurance-portal/InsurancePortal";
import {
  Dropdown,
  DropdownIcon2,
  Hambergurmenu,
  Right,
} from "../svg-components";
import styles from "./sidebar1.module.scss";
const Sidebar1 = ({ handleSidebar, showSidebar }) => {
  const navigate = useNavigate();
  const [click, setClick] = useState(true);
  const activePage = Object.values(useParams())[0];
  const [portalValue, setPortalValue] = useState(null);
  const [iconColor1, setIconColor1] = useState("#83B3D4");
  const [iconColor2, setIconColor2] = useState("#83B3D4");
  const { role } = useRole();
  const [value, setValue] = useState(activePage.split("/")[0]);
  const [flag, setFlag] = useState(activePage.split("/")[0]);
  const { userInfo } = useSelector((state) => state.login);
  const accessControl = [
    ...userInfo?.accessControl,
    "/Logout",
    "/Maintenance Portal/Manage Roles",
  ];

  const [childValue, setChildValue] = useState(
    activePage.split("/").length > 1
      ? activePage.split("/")[0] + "/" + activePage.split("/")[1]
      : activePage.split("/")[0]
  );

  // console.log(accessControl);

  // if child is slected and parent is not in array , below helper
  const modifiedAccessControl = [];
  for (let i = 0; i < 20; i++) {
    if (accessControl[i]) {
      const t = accessControl[i].split("/");
      if (t.length > 2 && modifiedAccessControl.indexOf(`/${t[1]}`) === -1) {
        modifiedAccessControl.push(`/${t[1]}`);
      } else {
        modifiedAccessControl.push(accessControl[i]);
      }
    } else {
      continue;
    }
  }


  useEffect(() => {
    setValue("/" + activePage.split("/")[0]);
  }, [activePage]);
  useEffect(() => {
     setChildValue("/"+activePage)
  }, []);

  const handleChildNavigate = (item) => {
    setChildValue(item);
    navigate(item);
  };

  const handleCloseDropdown = () => {
    setFlag("");
    setClick(false);
  };

  const handleOpen = (name) => {
    setFlag(name);
    setClick(true);
    navigate(name);
  };

  const handleNavigate = (item) => {
    setValue(item);
    if (item === "/reports") {
       navigate("/reports/aum-summary");
      setChildValue("/reports/aum-summary")
    } else if (item === "/maintenance-portal") {
      setChildValue("/maintenance-portal/upload-csv-data-files")
      // navigate("/maintenance-portal/upload-csv-data-files");
    } else {
      navigate(item);
    }
  };
  const items = [
    {
      title: "Trading Portal",
      icon: <Right fillColor={iconColor1} />,
    },
    {
      title: "Insurance Portal",
      icon: <Right fillColor={iconColor2} />,
    },
  ];

  const handleActive = (index, item) => {
    setPortalValue(index);
    setClick(false);
    if (item === "Trading Portal") {
      setIconColor1("#FFFFFF");
      setIconColor2("#83B3D4");
      navigate("/tradingportal");
    } else if (item === "Insurance Portal") {
      setIconColor2("#FFFFFF");
      setIconColor1("#83B3D4");
      navigate("/insurance-portal");
    } else {
      setIconColor1("#83B3D4");
      setIconColor2("#83B3D4");
    }
  };

   return (
    <div className={showSidebar ? styles.sidebarContainer : styles.hideSidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
        <span onClick={() => handleSidebar()}>
          <Hambergurmenu fillColor="#3E4954" />
        </span>
      </div>
      <ul className={styles.sidebarData}>
        {sideBarData.map((item, index) => {
          // if (item.role.includes(role)) {
          if (
            accessControl
              .map((e) => e.toLowerCase())
              .includes(item.location.replace(/-/g, " "))
          ) {
            return (
              <React.Fragment key={index}>
                <li
                  key={index}
                  onClick={() => {
                    flag == item.location
                      ? click
                        ? handleCloseDropdown()
                        : handleOpen(item.location)
                      : handleOpen(item.location);
                    handleNavigate(item.location);
                  }}
                  // parent active
                  className={
                    item.location === value
                      ? styles.activeLink
                      : styles.sidebarItems
                  }
                >
                  <p
                    className={
                      item.location === value
                        ? styles.activeLinkBox
                        : styles.deactiveLinkBox
                    }
                  ></p>
                  <p className={styles.icon}>
                    <item.icon
                      fillColor={
                        item.location === value ? colors.green1 : colors.grey1
                      }
                      width="20"
                      height="20"
                    />
                  </p>
                  <div className={styles.sidebarItemReport}>
                    <p className={styles.sidebarItemTitle}>{item.title}</p>
                    {item.dropdown && (
                      <span className={styles.dropdownIcon}>
                        {click && item.location === value ? (
                          <DropdownIcon2 fillColor={colors.green1} />
                        ) : (
                          <Dropdown fillColor={colors.grey1} />
                        )}
                      </span>
                    )}
                  </div>
                </li>
                {click && item.dropdown && item.location === value && (
                  <div className={styles.dropdownContent}>
                    {item.children.map((item, index) => {
                      // console.log('path name>>', item.location.replace(/-/g, " "));
                      if (
                        accessControl
                          .map((e) => e.toLowerCase())
                          .includes(item.location.replace(/-/g, " "))
                      ) {
                        return (
                          <div
                            key={item.title}
                            onClick={() => {
                              handleChildNavigate(item.location);
                            }}
                          >
                            <span
                              className={
                                item.location === childValue
                                  ? styles.activeDropdownItem
                                  : styles.dropdownItems
                              }
                            >
                              {item.title}
                            </span>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                )}
              </React.Fragment>
            );

            // }
          }
          return null;
        })}

        {/* <li className={styles.sidebarItems}>
          <p className={styles.deactiveLinkBox}></p>
          <div className={styles.sidebarItemReport}>
            <p className={styles.icon}>
              <Logout fillColor={colors.grey1} width="20" height="20" />
            </p>
            <p className={styles.sidebarItemTitle}>Logout</p>
          </div>
        </li> */}

        <div className={styles.cardCopyRightsContainer}>
          <div className={styles.portalContainer}>
            <InsurancePortal
              data={items}
              customClass={styles.insurancePortal}
              value={portalValue}
              handleClick={handleActive}
            />
          </div>
          <div className={styles.copyrights}>
            <p className={styles.waltCapitalText}>Walt Capital Management</p>
            <p className={styles.copyrightText}>
              &copy; 2022 All Rights Reserved
            </p>
          </div>
        </div>
      </ul>
    </div>
  );
};
export default Sidebar1;
