import styles from "./sidebar.module.scss";
import logo from "../../assets/images/logo.png";
// import { ReactComponent as Hambergurmenu } from "../../assets/svg/hamburgerMenuIcon.svg";
import {
  Clients,
  CRM,
  Dashboard,
  Dropdown,
  DropdownIcon2,
  GlobalFund,
  Hambergurmenu,
  // Home,
  IFAs,
  Logout,
  Maintenance,
  Offshore,
  Reports,
  Right,
  WatchListIcon,
} from "../svg-components";
import { useNavigate, useParams } from "react-router-dom";
import DropDown from "../dropdown/DropDown";
import { useEffect, useState } from "react";
import { colors } from "../../constants/Colors";
import InsurancePortal from "../insurance-portal/InsurancePortal";
import { maintenanceDropdownData, reportsDropdownData } from "../../data/data";
import useRole from "../../hooks/useRole";
const Sidebar = ({ handleSidebar, showSidebar }) => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [dashboardColor, setDashboardColor] = useState(colors.green1);
  const [homeColor, setHomeColor] = useState(colors.grey1);
  const [clientsColor, setClientsColor] = useState(colors.grey1);
  const [globalColor, setGlobalColor] = useState(colors.grey1);
  // const [portfolioColor, setPortfolioColor] = useState(colors.grey1);
  const [IFAColor, setIFAColor] = useState(colors.grey1);
  const [reportsColor, setReportsColor] = useState(colors.grey1);
  const [maintenanceColor, setMaintenanceColor] = useState(colors.grey1);
  const [maintenanceClick, setMaintenanceClick] = useState(false);
  const [dropdownColor, setDropdownColor] = useState(colors.grey2);
  const [maintenanceDropdownColor, setMaintenanceDropdownColor] = useState(
    colors.grey2
  );
  const [offshoreColor, setOffshoreColor] = useState(colors.grey1);
  const [crmColor, setCrmColor] = useState(colors.grey1);
  const [logoutColor, setLogoutColor] = useState(colors.grey1);
  const [value, setValue] = useState(0);
  // const [portfolioValue, setPortfolioValue] = useState(0);
  const [reportValue, setReportValue] = useState(0);
  const [maintenanceValue, setMaintenanceValue] = useState(0);
  const activePage = Object.values(useParams())[0];
  const paramsArray = activePage.split("/");
  // const params = paramsArray[paramsArray.length-1];
  const [portalValue, setPortalValue] = useState(null)
  const [iconColor1,setIconColor1] = useState("#83B3D4");
  const [iconColor2,setIconColor2] = useState("#83B3D4");
  const id = paramsArray[1];
  const {role} = useRole();
  useEffect(() => {
    if (
      activePage === "dashboard" ||
      activePage === "dashboard/ppm-model-equity-portfolio" ||
      activePage === "dashboard/ppm-tfsa-model-portfolio" ||
      activePage === "dashboard/walt-capital-global-fund-investor" ||
      activePage === "dashboard/daily-trade-log"
    ) {
      setValue(0);
      setDashboardColor(colors.green1);
      setPortalValue(null);
      setIconColor1("#83B3D4");
      setIconColor2("#83B3D4");
      setClick(false)
    }
    //  else if (
    //   activePage === "portfolio/ppm-model-equity-portfolio" ||
    //   activePage === "portfolio/ppm-tfsa-model-portfolio" ||
    //   activePage === "portfolio/walt-capital-global-fund-investor" ||
    //   activePage === "daily-trade-log"
    // ) {
    //   setValue(-1);
    //   setDashboardColor(colors.grey1);
    // }
    else if(activePage=== 'tradingportal' || activePage === 'insurance-portal') {
      setValue(-1)
      setDashboardColor(colors.grey1);
    } else {
      setDashboardColor(colors.grey1);
    }
    if (activePage === "watchlist") {
      setValue(1);
      setHomeColor(colors.blue1);
      setPortalValue(null);
      setIconColor1("#83B3D4");
      setIconColor2("#83B3D4")
    } else {
      setHomeColor(colors.grey1);
    }
    if (
      activePage === "clients" ||
      activePage === `clients/${id}` ||
      activePage === `clients/${id}/waltcapital` ||
      activePage === `clients/${id}/taxfreeinvestment` ||
      activePage === `clients/${id}/allan-gray-ra`
    ) {
      setValue(2);
      setClientsColor(colors.green1);
      setPortalValue(null);
      setIconColor1("#83B3D4");
      setIconColor2("#83B3D4")
    } else {
      setClientsColor(colors.grey1);
    }
    if (
      activePage === "fund-administration" ||
      activePage === `fund-administration/${id}` ||
      activePage === `fund-administration/${id}/ifafeesbreakdown`
    ) {
      setValue(3);
      setGlobalColor(colors.green1);
      setClick(false);
      setPortalValue(null);
      setIconColor1("#83B3D4");
      setIconColor2("#83B3D4")
    } else {
      setGlobalColor(colors.grey1);
    }
    if (
      activePage === "crm" ||
      activePage === "crm/edit" ||
      activePage === "crm/brokergefees"
    ) {
      setValue(4);
      setCrmColor(colors.green1);
      setPortalValue(null);
      setIconColor1("#83B3D4");
      setIconColor2("#83B3D4")
    } else {
      setCrmColor(colors.grey1);
    }
    // if (activePage === `portfolios/${id}`) {
    //   setValue(4);
    //   setPortfolioValue(0);
    //   setPortfolioColor(colors.green1);
    //   setDropdownColor(colors.green1);
    // }
    // else {
    //   setPortfolioColor(colors.grey1);
    //   setDropdownColor(colors.grey2);
    // }
    if (
      activePage === "ifas" ||
      activePage === `ifas/${id}` ||
      activePage === "ifas/addnewifas/monthlyreports" ||
      activePage === "ifas/addnewifas/generateifainvoice" ||
      activePage === `ifas/${id}/generateifainvoice` ||
      activePage === `ifas/${id}/monthlyreports`
    ) {
      setValue(5);
      setIFAColor(colors.green1);
      setPortalValue(null);
      setIconColor1("#83B3D4");
      setIconColor2("#83B3D4")
    } else {
      setIFAColor(colors.grey1);
    }
    if (activePage === "offshore") {
      setValue(6);
      setOffshoreColor(colors.green1);
      setPortalValue(null);
      setIconColor1("#83B3D4");
      setIconColor2("#83B3D4")
    } else {
      setOffshoreColor(colors.grey1);
    }
    if (activePage === `reports` || activePage === `reports/${id}`) {
      setValue(7);
      // setReportValue(0);
      setReportsColor(colors.green1);
      setDropdownColor(colors.green1);
      setPortalValue(null);
      setIconColor1("#83B3D4");
      setIconColor2("#83B3D4")
    } else {
      setReportsColor(colors.grey1);
      setDropdownColor(colors.grey2);
    }
    if (
      activePage === "maintenanceportal" ||
      activePage === `maintenanceportal/${id}`
    ) {
      setValue(8);
      setMaintenanceColor(colors.green1);
      setMaintenanceDropdownColor(colors.green1);
      setPortalValue(null);
      setIconColor1("#83B3D4");
      setIconColor2("#83B3D4")
    } else {
      setMaintenanceColor(colors.grey1);
      setMaintenanceDropdownColor(colors.grey2);
    }
  }, [activePage, id]);
  const handleClick = () => {
    setClick(!click);
  };
  const handleCloseDropdown = () => {
    setClick(false);
  };
  const maintenanceHandleClick = () => {
    setMaintenanceClick(!maintenanceClick);
  };
  const maintenanceHandleCloseDropdown = () => {
    setMaintenanceClick(false);
  };

  const handleNavigate = (
    item,
    index,
    dropdownIndex,
    maintenanceDropdownValue
  ) => {
    setValue(index);
    // Kindly Check
    if (item === "maintenanceportal/system-access") {
      return null;
    }
    if (dropdownIndex === 7 && activePage === "reports/runfeesppm") {
      setReportValue(0);
    } else {
      setReportValue(dropdownIndex);
    }
    if (item === "fund-administration") {
      navigate("fund-administration");
    } else if (item === "portfolios") {
      navigate(`portfolios/jseequityportfolio`);
    } else if (item === "/") {
      handleLogout();
    } else {
      navigate(item);
    }
    if (
      maintenanceDropdownValue === "8" &&
      activePage === "maintenanceportal/runfeesppm"
    ) {
      setMaintenanceValue(0);
    } else {
      setMaintenanceValue(maintenanceDropdownValue);
    }
  };
  const sidebarData = [
    {
      title: "Dashboard",
      icon: <Dashboard fillColor={dashboardColor} />,
      navigate: "dashboard",
      role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
    },
    {
      title: "Watchlist",
      icon: <WatchListIcon fillColor={homeColor} />,
      navigate: "watchlist",
      role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
    },
    {
      title: "Clients",
      icon: <Clients fillColor={clientsColor} />,
      navigate: "clients",
      role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
    },
    {
      title: "Fund Administration",
      icon: <GlobalFund fillColor={globalColor} />,
      navigate: "fund-administration",
      role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
    },
    {
      title: "CRM",
      icon: <CRM fillColor={crmColor} />,
      navigate: "crm",
      role: ['Executive User', 'Compliance user', 'Portfolio Manager'],
    },
    {
      title: "IFAs",
      icon: <IFAs fillColor={IFAColor} />,
      navigate: "ifas",
      role: ['Super User','Executive User','Compliance user','Admin User'],
    },
    {
      title: "Offshore",
      icon: <Offshore fillColor={offshoreColor} />,
      navigate: "offshore",
      role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
    },
    {
      title: (
        <>
          Reports
          <span className={styles.dropdownIcon}>
            {value === 7 && click ? (
              <DropdownIcon2 fillColor={dropdownColor} />
            ) : (
              <Dropdown fillColor={dropdownColor} />
            )}
          </span>
        </>
      ),
      icon: <Reports fillColor={reportsColor} />,
      navigate: "reports/aum-summary",
      role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
    },
    {
      title: (
        <>
          Maintenance Portal
          <span className={styles.dropdownIcon}>
            {value === 8 && maintenanceClick ? (
              <DropdownIcon2 fillColor={maintenanceDropdownColor} />
            ) : (
              <Dropdown fillColor={maintenanceDropdownColor} />
            )}
          </span>
        </>
      ),
      icon: <Maintenance fillColor={maintenanceColor} />,
      navigate: "maintenanceportal/upload",
      role: ['Admin User','Portfolio Manager',''],
    },
    // {
    //   title: "Maintenance Portal",
    //   icon: <Maintenance fillColor={maintenanceColor} />,
    //   navigate: "maintenanceportal",
    // },
    {
      title: "Logout",
      icon: <Logout fillColor={logoutColor} />,
      navigate: "/",
      role:['Super User','Executive User','Compliance user','Admin User','Portfolio Manager','Client User']
    },
  ];
  const handleLogout = () => {
    let text = "Do you want to logout?";
    if (window.confirm(text) === true) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/");
    } else {
      navigate("/dashboard");
      setValue(0);
    }
  };
  const items = [
    {
      title:'Trading Portal', 
      icon:<Right fillColor={iconColor1} />
    },
    {
      title:'Insurance Portal',
      icon:<Right fillColor={iconColor2} />
    },
  ]
  const handleActive = (index,item)=> {
     setPortalValue(index);
     setClick(false);
     setMaintenanceClick(false)
    if (item === 'Trading Portal' /* && activePage === 'tradingportal' */){
    setIconColor1('#FFFFFF')
    setIconColor2('#83B3D4')
    navigate('/tradingportal')
    }
    else if ( item === "Insurance Portal" /* && activePage === 'insurance-portal' */){
      setIconColor2('#FFFFFF')
      setIconColor1('#83B3D4')
      navigate('/insurance-portal')
    }
    else {
      setIconColor1("#83B3D4")
      setIconColor2("#83B3D4")
    }
  }
  return (
    <div className={showSidebar ? styles.sidebarContainer : styles.hideSidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
        <span onClick={() => handleSidebar()}>
        <Hambergurmenu fillColor='#3E4954' />
        </span>
      </div>
      <ul className={styles.sidebarData}>
        {sidebarData.map((item, index) => {
          // console.log('role included??',item.role.includes(role))
          if(item.role.includes(role)){
            if (index === 7 ) {
              return (
                <div key="7">
                  <li
                    className={
                      index === value ? styles.activeLink : styles.sidebarItems
                    }
                    onClick={() => {
                      handleClick();
                      maintenanceHandleCloseDropdown();
                      handleNavigate("reports/aum-summary", 7, 0);
                    }}
                  >
                    <p
                      className={
                        index === value
                          ? styles.activeLinkBox
                          : styles.deactiveLinkBox
                      }
                    ></p>
                    <p className={styles.icon}>{item.icon}</p>
                    <p className={styles.sidebarItemReport}>{item.title}</p>
                  </li>
                  {click ? (
                    <DropDown
                      dropdownItems={reportsDropdownData}
                      customClassForContent={styles.dropdownContent}
                      customClassForItems={styles.dropdownItems}
                      customClassForActiveItems={styles.activeDropdownItem}
                      handleClick={handleNavigate}
                      value={reportValue}
                      Index={7}
                    />
                  ) : null}
                </div>
              );
            } else if (index === 8) {
              return (
                <div key="8">
                  <li
                    className={
                      index === value ? styles.activeLink : styles.sidebarItems
                    }
                    onClick={() => {
                      handleCloseDropdown();
                      maintenanceHandleClick();
                      handleNavigate("maintenanceportal/upload", 8, 0, 0);
                    }}
                  >
                    <p
                      className={
                        index === value
                          ? styles.activeLinkBox
                          : styles.deactiveLinkBox
                      }
                    ></p>
                    <p className={styles.icon}>{item.icon}</p>
                    <p className={styles.sidebarItemReport}>{item.title}</p>
                  </li>
                  {maintenanceClick ? (
                    <DropDown
                      dropdownItems={maintenanceDropdownData}
                      customClassForContent={styles.dropdownContent}
                      customClassForItems={styles.dropdownItems}
                      customClassForActiveItems={styles.activeDropdownItem}
                      handleClick={handleNavigate}
                      value={maintenanceValue}
                      Index={8}
                    />
                  ) : null}
                </div>
              );
            } else {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handleCloseDropdown();
                    maintenanceHandleCloseDropdown();
                    handleNavigate(item.navigate, index);
                  }}
                  className={
                    index === value ? styles.activeLink : styles.sidebarItems
                  }
                >
                  <p
                    className={
                      index === value
                        ? styles.activeLinkBox
                        : styles.deactiveLinkBox
                    }
                  ></p>
                  <p className={styles.icon}>{item.icon}</p>
                  <p className={styles.sidebarItemTitle}>{item.title}</p>
                </li>
              );
              // }
            }
          }
          return null
        })}
        {/* <li className={styles.logout} onClick={() => handleLogout()}>Log Out</li> */}
        <div className={styles.cardCopyRightsContainer}>
          <div className={styles.portalContainer}>
            {/* <InsurancePortal title="View Trading Portal" /> */}
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
export default Sidebar;
