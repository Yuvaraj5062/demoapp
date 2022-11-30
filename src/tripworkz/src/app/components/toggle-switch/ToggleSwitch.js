import styles from "./toggleswitch.module.scss";
import React from 'react'
const ToggleSwitch = ({ isToggled, handleToggle, leftIcon, rightIcon }) => {
  
  return (
    <label className={styles.toggleContainer}>
      <input
        type="checkbox"
        checked
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
