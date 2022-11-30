import styles from "./event.module.scss";

const Event = ({
  icon,
  title,
  handleMouseEnter,
  handleMouseOut,
  customClass,
  handleClick
}) => {
  return (
    <div
      className={[styles.eventContainer, customClass].join(" ")}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseOut()}
      onClick={()=>handleClick()}
    >
      <div className={styles.event}>
        {icon}
        <span className={styles.eventName}>{title}</span>
      </div>
    </div>
  );
};

export default Event;
