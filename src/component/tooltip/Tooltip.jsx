import styles from "./tooltip.module.scss";
const Tooltip = ({ title, subTitle, customClass, customText }) => {
  return (
    <>
      <div className={[styles.emailShow, customClass].join(" ")}>
        <div className={[styles.emailText, customText].join(" ")}>
          {title}
          <div>{subTitle}</div>

        </div>
      </div>
    </>
  );
};

export default Tooltip;
