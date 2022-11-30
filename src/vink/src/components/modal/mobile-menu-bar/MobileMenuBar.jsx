import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mobileHeaderData } from "../../../data/data";
import Divider from "../../divider/Divider";
import DropDownV2 from "../../drop-down-V2/DropDownV2";
import { DropDownIcon, DropDownOpenIcon } from "../../svg-components";
import Close from "../close/Close";
import styles from "./mobilemenubar.module.scss";
const MobileMenuBar = ({ open, setOpen }) => {
  const [value, setValue] = useState(-1);
  const [childValue, setChildValue] = useState(-1);
  const [openDropDown, setOpenDropDown] = useState(false);
  const navigate = useNavigate();

  const path = useLocation().pathname;
  useEffect(() => {
    mobileHeaderData.map((item, index) => {
      if (item.active === path.split("/")[1]) {
        setValue(item.id);
      }
      if (item.dropdown) {
        item.children.map((item, index) => {
          if (item.link === path) {
            setChildValue(item.id);
          }
        });
      }
    });
  }, [path]);
  const handleOpenDropDown = (item) => {
    setOpenDropDown(true);
    setValue(item.id);
    navigate(item.navigate);
  };
  const handleCloseDropDown = () => {
    setOpenDropDown(false);
    setValue(-1);
  };
  const handleCloseMenu = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <Close
          customClass={styles.closeBtn}
          handleClose={() => handleCloseMenu()}
        />
        <div className={styles.menuItemContainer}>
          {mobileHeaderData.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className={
                    index === value ? styles.menuItemActive : styles.menuItem
                  }
                  onClick={() =>
                    openDropDown && index === value
                      ? handleCloseDropDown()
                      : handleOpenDropDown(item)
                  }
                >
                  <span className={styles.menuText}>
                    {!item.link ? item.name
                      : <a href={item.link} target='new'
                        className={
                          index === value ? styles.marketplaceActive : styles.marketplace
                        }
                      >{item.name} </a>}
                  </span>
                  {item.dropdown && <DropDownIcon fillColor="#474973" />}
                </div>
                {openDropDown && index === value && item.dropdown && (
                  <DropDownV2 data={item.children} value={childValue} />
                )}

                <Divider customClass={styles.divideLine} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileMenuBar;
