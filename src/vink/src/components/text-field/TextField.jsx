import React from "react";
import styles from "./textField.module.scss";

const TextField = ({
  type,
  placeholder,
  customClass,
  icon,
  value,
  handleChange,
  error,
  dropDownData,
  name,
  id,
  disable,
  passwordIcon,
  customClassForError,
}) => {
  return (
    <>
      {type === "select" ? (
        <div className={[styles.inputFieldContainer, customClass].join(" ")}>
          <select
            className={styles.inputFieldSelect}
            onChange={handleChange}
            // onBlur={(e) => handleBlur(e, "country")}
            // ref={ref.country}
            // value="select value"
            value={value}
            disabled={disable}
            // id={id}
          >
            <option value="">{placeholder}</option>
            {dropDownData &&
              dropDownData.map((item, index) => {
                return (
                  <>
                    <option value={item[id]} key={index}>
                      {/* {item[name] ? item[name]:item} */}
                      {item[name]}
                    </option>
                  </>
                );
              })}
          </select>
          {error && <div className={styles.errorText}>{error}</div>}
        </div>
      ) : (
        <div className={[styles.inputFieldContainer, customClass].join(" ")}>
          <input
            className={styles.inputField}
            type={type ? type : "text"}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            id={name}
          />
          {icon && passwordIcon}

          {/* if ({icon}) {<PasswordIcon fillColor={color.grey} />} */}
          {/* <span className={styles.passwordIcon}> */}
          {/* <PasswordIcon fillColor={color.grey} /> */}
          {/* </span> */}
          {error && (
            <div className={[styles.errorText, customClassForError].join(" ")}>
              {error}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TextField;
