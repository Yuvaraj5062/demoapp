import styles from "./textarea.module.scss";
const TextArea = ({
  label,
  customTextAreaContainer,
  labelTitle,
  inputType,
  placeholder,
  handleChange,
  value,
  error,
  errorContainer,
  name,
  disabled,
  rows,
  cols,
}) => {
  return (
    <div
      className={[styles.textareaContainer, customTextAreaContainer].join(" ")}
    >
      <label className={[styles.title, labelTitle].join(" ")}> {label}</label>
      <div
        className={[styles.textareaErrorContainer, errorContainer].join(" ")}
      >
        <textarea
          className={[styles.textarea, inputType].join(" ")}
          value={value ? value : ""}
          onChange={handleChange}
          name={name}
          disabled={disabled}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
        >
          {placeholder}
        </textarea>
        {error && <div className={styles.errorText}>{error}</div>}
      </div>
    </div>
  );
};
export default TextArea;
