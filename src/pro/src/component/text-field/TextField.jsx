import styles from "./textfield.module.scss";
const TextField = ({
  type,
  label,
  option1,
  option2,
  option3,
  option4,
  customClass,
  customClassContainer,
  customClassInput,
  icon,
  customClassIcon,
  customClassInputIcon,
  placeholder,
  customClassDropdown,
}) => {
  return (
    <div
      className={[styles.textFieldContainer, customClassContainer].join(" ")}
    >
      <label className={[styles.label, customClass].join(" ")}>{label}</label>
      {type === "select" ? (
        <select className={[styles.type, customClassDropdown].join(" ")}>
          <option>{option1}</option>
          <option>{option2}</option>
          <option>{option3}</option>
          <option>{option4}</option>
        </select>
      ) : icon ? (
        <div className={[customClassInputIcon]}>
          <input
            type="text"
            className={[styles.inputType, customClassInput].join(" ")}
            placeholder={placeholder}
          />
          <div className={[customClassIcon]}>
            <div className={styles.icon}>{icon}</div>
          </div>
        </div>
      ) : (
        <input
          type="text"
          className={[styles.inputType, customClassInput].join(" ")}
          placeholder={placeholder}
        />
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
