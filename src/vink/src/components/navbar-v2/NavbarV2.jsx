import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { color } from "../../constants/color";
import { DropDownIcon } from "../svg-components";
import styles from "./navbarV2.module.scss";

const NavbarV2 = ({ navbarData }) => {
  const [value, setValue] = useState(-1);
  const navigate = useNavigate();
  const handleMouseEnter = (index) => {
    setValue(index);
  };
  return (
    <>
      <div className={styles.navbarV2Container}>
        <div className={styles.navbarContent}>
          {navbarData.map((item, index) => {
            return (
              <>
                <span
                  key={index}
                  className={styles.navText}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => setValue(-1)}
                >
                  {item.title}
                  {item.dropdown && (
                    <DropDownIcon
                      customClass={styles.iconStyle}
                      fillColor={index !== value ? color.black1 : color.white1}
                    />
                  )}
                </span>
              </>
            );
          })}
        </div>
        <span className={styles.helpText} onClick={() => navigate("/gethelp")}>
          Get Help
        </span>
      </div>
    </>
  );
};

export default NavbarV2;
