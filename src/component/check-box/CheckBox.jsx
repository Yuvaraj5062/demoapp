import { useState } from "react";
import { CheckRound, InactiveCheckRound } from "../svg-components";
import styles from "./checkbox.module.scss";

const CheckBox = ({ ischecked }) => {
  const [value, setValue] = useState(ischecked);
  const handleChange = () => {
    setValue(!value);
  };

  return (
    <label className={styles.checkboxContainer}>
      <span
        className={styles.icon}
        onClick={() => {
          handleChange();
        }}
      >
        {value ? (
          <CheckRound
            fillColor="#0868AA"
            width="18"
            height="18"
            customclass={styles.checkRoundStyle}
          />
        ) : (
          <InactiveCheckRound
            fillColor="#969BA0"
            width="18"
            height="18"
            customclass={styles.inactiveCheckRoundStyle}
          />
        )}
      </span>
    </label>
  );
};

export default CheckBox;
