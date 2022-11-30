import styles from "./toggleswitch.module.scss";
import { useState } from "react";
const ToggleSwitch = ({ leftIcon, rightIcon, isToggled, handleToggle }) => {
  // const [isToggled, setisToggled] = useState(true);
  // const handleToggle = () => {
  //   setisToggled(!isToggled);
  // };
  return (
    <label className={styles.toggleContainer}>
      <input
        type="checkbox"
        checked
        // onChange={() => {
        //   handleToggle(isToggled);
        // }}
        onChange={() => {
          handleToggle();
        }}
        className={styles.checkbox}
      />
      <span className={isToggled ? styles.toggled : styles.notToggled}>
        <span className={styles.slider}></span>
        <span className={styles.icon}>{isToggled ? leftIcon : rightIcon}</span>
      </span>
    </label>
  );
};

export default ToggleSwitch;
