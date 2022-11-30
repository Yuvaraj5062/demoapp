import styles from "./radiobutton.module.scss";
const RadioButton = ({
  label,
  name,
  customClass,
  radioLabelClass,
  handleChange,
  error,
  customClassError,
  value,
  checked,
  id,
  ref1,
  customClassRadioButton,
  disabled,
}) => {
  return (
    <div className={[customClass].join(" ")}>
      <input
        type="radio"
        name={name}
        onChange={handleChange}
        value={value}
        checked={checked}
        className={[styles.radiobutton, customClassRadioButton].join(" ")}
        id={id}
        ref={ref1}
        disabled={disabled}
      ></input>
      <label className={[radioLabelClass].join(" ")}>{label}</label>
      <div className={customClassError}>{error}</div>
    </div>
  );
};

export default RadioButton;
