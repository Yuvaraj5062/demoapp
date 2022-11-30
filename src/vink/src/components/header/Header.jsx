import React, { useState } from "react";
import styles from "./header.module.scss";
import logoImage from "../../assests/images/logo.png";
import Divider from "../divider/Divider";
import { useSelector, useDispatch } from "react-redux";
import { headerData } from "../../data/data";
import Button from "../button/Button";
import { Popup } from "../popup/Popup";
import { useLocation, useNavigate } from "react-router-dom";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen ";
import { useEffect } from "react";
import { popup } from "../../redux/popup/popupSlice";
import {
  LoginIcon,
  MobileLoginIcon,
  MobileSearchIcon,
  SearchIcon,
  SidebarIcon,
} from "../svg-components";

const Header = ({ open, setOpen }) => {
  const isMobile = useCheckMobileScreen();
  const [modal, setmodal] = useState(false);
  const naviagate = useNavigate();
  const [value, setValue] = useState(-1);
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.step);
  const handleLogin = () => {
    dispatch(popup("LoginScreen"));
  };
  const handleClose = () => {
    setmodal(!modal);
  };
  const handleMobileMenuBar = () => {
    setOpen(!open);
  };
  const handleNavigate = (item) => {
    item && naviagate(item);
  };
  useEffect(() => {
    setValue(-1);
    headerData.map((item, index) => {
      if (item.active === path.split("/")[1]) {
        setValue(item.id);
      }
    });
  }, [path]);
  return (
    <>
      <div className={styles.headerContainer}>
        {steps.popup && (
          <Popup Children={steps.children} handleClose={() => handleClose()} />
        )}

        <div className={styles.headerContent}>
          <img
            src={logoImage}
            alt="logo"
            className={styles.logoStyle}
            onClick={() => {
              naviagate("/");
              setValue(-1);
            }}
          />
          {!isMobile ? <span className={styles.menuText}>Menu</span> : ""}
          {!isMobile ? <Divider customClass={styles.divider} /> : ""}
          {!isMobile
            ? headerData.map((item, index) => {
              return (
                <span
                  className={
                    index === value
                      ? styles.headerTextActive
                      : styles.headerText
                  }
                  key={index}
                  onClick={() => handleNavigate(item.navigate)}
                >
                  {!item.link ? item.name
                    : <a href={item.link} target='new'
                      className={
                        index === value
                          ? styles.marketplaceActive
                          : styles.marketplace
                      }
                    >{item.name} </a>}
                </span>

              );
            })
            : ""}
          {/* <a href="https://marketplacevink.archesoftronix.in/" target='new'
                    className={
                     
                   styles.headerText
               
                    }>Marketplace </a> */}

        </div>
        <div className={styles.loginSearch}>
          {!isMobile ? (
            <SearchIcon fillColor="#5735D4" customClass={styles.searchIcon} />
          ) : (
            <MobileSearchIcon customClass={styles.mobileSearchIcon} />
          )}
          {isMobile && <MobileLoginIcon customClass={styles.mobileLoginIcon} />}
          {isMobile && (
            <SidebarIcon
              customClass={styles.sidebarIcon}
              handleMenuClick={() => {
                handleMobileMenuBar();
              }}
            />
          )}

          {!isMobile ? (
            <Button
              title="Login"
              icon={<LoginIcon fillColor="#ffffff" />}
              customClass={styles.loginBtn}
              customClassForIcon={styles.icon}
              handleClick={() => handleLogin()}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
