import React from "react";
import styles from "./button.module.scss";

const Button = ({
  icon,
  type,
  title,
  handleClick,
  customClass,
  customClassForIcon,
  customClassForText,
  disabled
}) => {
  return (
    <button
      className={[styles.button, customClass].join(" ")}
      onClick={() => (handleClick ? handleClick() : {})}
      type={type ? type : "button"}
      disabled={disabled}
    >{
      icon && <span className={[styles.icon, customClassForIcon].join(" ")}>
      {icon}
    </span>
    }
      <span className={[styles.text, customClassForText].join(" ")}>
        {title}
      </span>
    </button>
  );
};

export default Button;
