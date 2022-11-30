import React from "react";
import styles from './textfieldV2.module.scss'

const TextFieldV2 = ({
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
  label
}) => {
  return (
    <>
      {type === "select" ? (
        <div className={[styles.inputFieldContainer, customClass].join(" ")}>
          <label htmlFor={label} className={styles.label}>{label}</label>
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
            {dropDownData && dropDownData.length > 0 &&
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
      ) : type === "text" ? (
        <div className={[styles.inputFieldContainer, customClass].join(" ")}>
          <label htmlFor={label} className={styles.label}>{label}</label>
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
      ) : <div className={[styles.inputFieldContainer, customClass].join(" ")}>
        <label htmlFor={label} className={styles.label}>{label}</label>
        <textarea
          className={styles.textarea}
          type={type ? type : "textarea"}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          id={name}
          rows={8}
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
      </div>}
    </>
  );
};

export default TextFieldV2;
