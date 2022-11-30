import styles from "./textfield2.module.scss";
const TextField2 = ({
  customclassContainer,
  customTextfieldContainer,
  label,
  placeholder,
  error,
  title,
  inputType,
  value,
  handleChange,
  name,
  type,
  disabled,
  percentage,
  maxLength
}) => {
  return (
    <>
      <div className={[styles.mainContainer, customclassContainer].join(" ")}>
        <label className={[styles.label, title].join(" ")}> {label} </label>{" "}
        <div
          className={[styles.textfieldContainer, customTextfieldContainer].join(
            " "
          )}
        >
          <input
            type={type ? type : "text"}
            className={[styles.inputField, inputType].join(" ")}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            name={name}
            id={name}
            disabled={disabled}
            maxLength={maxLength}
          />
          {error && <div className={styles.errorText}>{error}</div>}
          {percentage ? <span className={styles.percentage}>%</span> : null}
        </div>
      </div>
    </>
  );
};
export default TextField2;
