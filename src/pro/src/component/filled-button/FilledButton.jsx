import styles from "./filledbutton.module.scss";
const FilledButton = ({
  icon,
  title,
  customClass,
  handleClick,
  iconCustomClass,
  titleCustomClass,
  type,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <button
      className={[styles.button, customClass].join(" ")}
      onClick={() => handleClick()}
      onMouseEnter={() => {
        handleMouseEnter && handleMouseEnter();
      }}
      onMouseLeave={() => {
        handleMouseLeave && handleMouseLeave();
      }}
      type={type}
    >
      <span className={iconCustomClass}>{icon}</span>
      <span className={titleCustomClass}>{title}</span>
    </button>
  );
};

export default FilledButton;
