import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navbarData } from "../../data/data";
import styles from "./navbar.module.scss";

const Navbar = ({ navbarData }) => {
  const [value, setValue] = useState(-1);
  const navigate = useNavigate();
  const handleNavigate = (link, index) => {
    link && navigate(link);
    // setValue(index);
  };
  const path = useLocation().pathname;
  useEffect(() => {
    navbarData.map((item, index) => {
      if (item.link === path.split("/")[2]) {
        setValue(item.id);
      }
    });
  }, [path]);
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarContent}>
        {navbarData.map((item, index) => {
          return (
            <span
              key={index}
              className={index !== value ? styles.navText : styles.navText1}
              onClick={() => handleNavigate(item.link, index)}
            >
              {item.name}
            </span>
          );
        })}
      </div>
      <span className={styles.helpText} onClick={()=>navigate('/gethelp')}>Get Help</span>
    </div>
  );
};

export default Navbar;
