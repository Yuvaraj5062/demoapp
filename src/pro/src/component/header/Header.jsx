import styles from "./header.module.scss";
import { DropdownIcon2, Hambergurmenu, Member } from "../svg-components";
import { useEffect, useState } from "react";
import FilledButton from "../filled-button/FilledButton";
import WaltValue from "./walt-value-popup/WaltValue";
import Popup from "../popup/Popup";
import UserProfilePhoto from "../../assets/images/user.png";
import { useLocation } from "react-router-dom";
import { routeData } from "../../app/routes/routeData";
import logo from '../../assets/images/logo.png'

const Header = ({ handleClick, handleSidebar , showSidebar }) => {
  const [Page, setPage] = useState(' ');
  const path = useLocation().pathname;
  useEffect(() => {

    routeData.map((item)=>{
      if(item.location === path){
        setPage(item.header)
      }
      if(item.children){
        item.children.map((childItem)=>{
          if(childItem.location === path){
            setPage(childItem.header);
          }
          return childItem.header
        })
      }
      return item.header
    })
  }, [path]);

  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };

  const handleWaltValue = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className={styles.headerContainer}>
        {modal && (
          <Popup Children={WaltValue} handleClose={() => handleClose()} />
        )}
          {
             !showSidebar ?  <div className={styles.logoContainer}>
             <img src={logo} alt="logo" className={styles.logo} />
             <span onClick={() => handleSidebar()}>
               <Hambergurmenu fillColor='#3E4954' />
             </span>
           </div> : null
          }
        <div className={styles.headerConent}>
          <span className={styles.dashboardText}>{Page}</span>
          {path === "/dashboard" ? (
            <div className={styles.waltValuation}>
              <FilledButton
                title="Walt Valuation"
                customClass={styles.waltValueButton}
                handleClick={() => handleWaltValue()}
              />
              <Member fillColor="#004472" />
              <span className={styles.date}>21 September 2022</span>
              <div
                className={styles.dropdownContainer}
                onClick={() => handleClick()}
              >
                <img
                  src={UserProfilePhoto}
                  alt="user"
                  className={styles.userImage}
                />
                <span className={styles.dropdownContent}>Client Name</span>
                <DropdownIcon2 fillColor="#969BA0" />
              </div>
            </div>
          ) : (
            <div className={styles.dropdownContainer}>
              <Member fillColor="#004472" />
              <span className={styles.date}>21 September 2022</span>
              <div
                className={styles.dropdownContainerItems}
                onClick={() => handleClick()}
              >
                <img
                  src={UserProfilePhoto}
                  alt="user"
                  className={styles.userImage}
                />
                <span className={styles.dropdownContent}>Client Name</span>
                <DropdownIcon2 fillColor="#969BA0" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
