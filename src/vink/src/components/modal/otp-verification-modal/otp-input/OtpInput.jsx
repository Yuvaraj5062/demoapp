import React, { useState } from "react";
import styles from "./otpInput.module.scss";

const OtpInput = ({ customClass, otp, setOtp }) => {
  const [digit, setdigit] = useState([]);
  const [focus, setFocus] = useState(false);
  const handleChange = (e, index) => {
    if (e.key !== "Backspace") {
      let temp = [...digit];
      temp[index] = e.target.value;
      setdigit(temp)
      setOtp(temp)
      if (e.target.nextSibling && focus) {
        e.target.nextSibling.focus();
      }
    } else {
    }
  };

  const handleDelete = (e, i) => {
    if (e.key === "Backspace" && e.target.previousSibling) {
      e.target.previousSibling.value = "";
      let temp = [...digit];
      temp.splice(i, 1);
      setdigit(temp);
      setTimeout(() => {
        e.target.previousSibling.focus();
      }, 1);
      return;
    }
    if (e.key === "Backspace" && i === 0) {
      setFocus(false);
    } else {
      setFocus(true);
    }
  };
  return (
    <>
      <div className={[styles.otpInputContainer, customClass].join(" ")}>
        {new Array(4).fill().map((data, index) => {
          return (
            <input
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={digit[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleDelete(e, index)}
              onFocus={index === 0 ? true : false}
              required
            />
          );
        })}
      </div>
    </>
  );
};

export default OtpInput;
