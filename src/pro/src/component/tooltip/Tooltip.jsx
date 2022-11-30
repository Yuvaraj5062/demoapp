import styles from "./tooltip.module.scss";
const Tooltip = ({ title, customClass }) => {
  return (
    <>
      <div className={[styles.emailShow, customClass].join(" ")}>
        <span className={styles.emailText}>{title}</span>
      </div>
    </>
  );
};

export default Tooltip;
