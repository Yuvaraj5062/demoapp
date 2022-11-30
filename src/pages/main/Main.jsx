import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DropDown from "../../component/dropdown/DropDown";
import Header from "../../component/header/Header";
import Sidebar1 from "../../component/sidebar/Sidebar1";
import { Balance, Logout, Profile } from "../../component/svg-components";
import styles from "./main.module.scss";
const Main = ({ children }) => {
  // const [modal, setModal] = useState(true);
  const path = Object.values(useParams());
  const location = useLocation().pathname;
  // const title = location[location.length - 1];
  const navigate = useNavigate();
  // useEffect(() => {
  //   path[0] === "dashboard" ? setModal(true) : setModal(false);
  // }, []);
  // const handleModal = () => {
  //   setModal(false);
  // };
  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  const handleLogout = () => {
    setDropdown(false);
    navigate("/Logout");
    // let text = "Do you want to logout?";
    // if (window.confirm(text) === true) {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("role");
    //   navigate("/");
    // }
  };
  const dropdownData = [
    {
      span: (
        <span className={styles.dropdownItems}>
          <span className={styles.dropdownText}>Welcome Client</span>
        </span>
      ),
    },
    {
      span: (
        <span className={styles.dropdownItems}>
          <Profile fillColor="#969BA0" />
          <span
            className={styles.dropdownText}
            onClick={() => {
              setDropdown(false);
              navigate("/clients/1");
            }}
          >
            My Profile
          </span>
        </span>
      ),
    },
    {
      span: (
        <span className={styles.dropdownItems}>
          <Balance fillColor="#969BA0" />
          <span className={styles.dropdownText}>Balance :</span>
          <span className={styles.balanceValue}>Z5,325,154</span>
        </span>
      ),
    },
    {
      span: (
        <span className={styles.dropdownItems} onClick={() => handleLogout()}>
          <Logout fillColor="#969BA0" />
          <span className={styles.dropdownText}>Logout</span>
        </span>
      ),
    },
  ];
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropdown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdown]);

  const [showSidebar, setShowSidebar] = useState(true);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
      <div
        className={
          showSidebar
            ? styles.mainContainerShowSidebar
            : styles.mainContainerHideSidebar
        }
      >
        <Sidebar1 handleSidebar={handleSidebar} showSidebar={showSidebar} />
        <div className={styles.mainContent}>
          <Header
            handleSidebar={handleSidebar}
            showSidebar={showSidebar}
            handleClick={() => handleDropdown()}
          />
          <div className={styles.children}>
            <div className={styles.headerMenu} ref={ref}>
              {dropdown && (
                <DropDown
                  dropdownItems={dropdownData}
                  customClassForContent={styles.dropdownListContent}
                  customClassForItems={styles.dropdownListItems}
                  keyName={"span"}
                />
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
