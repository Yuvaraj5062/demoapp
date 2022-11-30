import Loader from "../loader/Loader";
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
  loader,
  disabled,
  customClassLoader
}) => {
  return (
    <button
      disabled={disabled}
      className={[styles.button, customClass].join(" ")}
      onClick={() => handleClick ? handleClick() : {}}
      onMouseEnter={() => {
        handleMouseEnter && handleMouseEnter();
      }}
      onMouseLeave={() => {
        handleMouseLeave && handleMouseLeave();
      }}
      type={type}
    >
      {loader ? (
        <Loader customClass={customClassLoader} />
      ) : (
        <>
          <span className={iconCustomClass}>{icon}</span>
          <span className={titleCustomClass}>{title}</span>
        </>
      )}
    </button>
  );
};

export default FilledButton;
