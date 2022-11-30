import React from "react";
import styles from "./rating.module.scss";
const Rating = ({ customClass, customClassActive, value, handleChange, fundRating }) => {
  return (
    <div
      className={fundRating === value ? [styles.active, customClassActive].join(' ') : [customClass]}
      // className={[customClass]}
      onClick={() => handleChange({ key: "fundRiskRating", value })}
    >
      {value}
    </div>
  );
};

export default Rating;
