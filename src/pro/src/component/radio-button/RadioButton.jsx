const RadioButton = ({ label, name, customClass, radioLabelClass }) => {
  return (
    <div className={[customClass].join(" ")}>
      <input type="radio" name={name}></input>
      <label className={[radioLabelClass].join(" ")}>{label}</label>
    </div>
  );
};

export default RadioButton;
