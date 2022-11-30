import moment from "moment";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import Tooltip from "../../component/tooltip/Tooltip";

import { InfoIcon } from "../svg-components";
import styles from "./textfield.module.scss";
const TextField = ({
  type,
  label,
  customClass,
  customClassContainer,
  customClassInput,
  icon,
  customClassIcon,
  customClassInputIcon,
  placeholder,
  customClassDropdown,
  handleChange,
  error,
  dropDownData,
  name,
  id,
  value,
  disable,
  ref1,
  min,
  max,
  info,
  tooltipText,
  maxLength,
  countryIso
}) => {
  const [showNumber, setShowNumber] = useState(false);

  return (
    <div
      className={[styles.textFieldContainer, customClassContainer].join(" ")}
    >

      <label className={[styles.label, customClass].join(" ")}>{label} {info &&
        <div className={styles.tooltipContainer}>
          {showNumber ? (
            <Tooltip
              title={tooltipText}
              customClass={styles.printTooltip}
              customText={styles.text}
            />
          ) : null}

          <InfoIcon
            fillColor="#B9B7BC"
            customClass={styles.infoIcon}
            onMouseOver={() => { setShowNumber(true) }}
            onMouseLeave={() => { setShowNumber(false) }}
          />

        </div>}</label>
      {type === "select" ? (
        <>
          <select
            className={[
              error ? styles.typeError : styles.type,
              customClassDropdown,
            ].join(" ")}
            onChange={handleChange}
            value={value}
            disabled={disable}
            ref={ref1}
          >
            <option value="">{placeholder}</option>
            {dropDownData &&
              dropDownData.map((item, index) => {
                return (
                  <option value={item[id]} key={index}>
                    {/* {item[name] ? item[name]:item} */}
                    {item[name]}
                  </option>
                );
              })}
          </select>

          {error && <div className={styles.errorText}>{error}</div>}
        </>
      ) : icon ? (
        <div className={[customClassInputIcon]}>
          <input
            type="text"
            disabled={disable}
            className={[
              error ? styles.inputTypeError : styles.inputType,
              customClassInput,
            ].join(" ")}
            placeholder={placeholder}
            value={value ? value : ""}
            onChange={handleChange}
            id={name}
            ref={ref1}
            maxLength={maxLength}
          />
          <div className={[customClassIcon]}>
            <div className={styles.icon}>{icon}</div>
          </div>
        </div>
      ) : type === "tel" ?
        <>
          <PhoneInput
            className={styles.checkinput}
            international
            defaultCountry={countryIso ? countryIso : "ZA"}
            countryCallingCodeEditable={false}
            placeholder={placeholder}
            value={value}
            onChange={(e) => { handleChange(e) }}
          />
          {error && <div className={styles.errorText}>{error}</div>}
        </> : (
          <>
            <input
              type={type ? type : "text"}
              disabled={disable}
              className={[
                error ? styles.inputTypeError : styles.inputType,
                customClassInput,
              ].join(" ")}
              placeholder={placeholder}
              value={value ? value : ""}
              onChange={handleChange}
              id={name}
              ref={ref1}
              // max={type === "date" ? max : ''}
              max={type === "date" ? max ? max : moment(253402214400000).format("yyyy-MM-DD") : ""}
              maxLength={maxLength}

            />
            {error && <div className={styles.errorText}>{error}</div>}
          </>
        )}
    </div>
  );
};

export default TextField;

{
  /* <div className={[customClassInputIcon]}>
        <input
          type="text"
          className={[styles.inputType, customClassInput].join(" ")}
        />
        <div className={[customClassIcon]}>{icon}</div>
        </div> */
}
