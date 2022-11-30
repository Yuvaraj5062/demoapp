import styles from "./balance.module.scss";
import { colors } from "../../constants/Colors";

const Balance = ({
  title,
  value,
  subTitle,
  clients,
  percentage,
  color,
  customClass,
  handleBalanceClick,
}) => {
  return (
    <div
      style={{
        background: `linear-gradient(to right, ${color} ${percentage}%, ${colors.white1} 0%)`,
      }}
    >
      <div
        className={[styles.balanceContainer, customClass].join(" ")}
        onClick={() => handleBalanceClick()}
      >
        <span className={styles.title}>{title} ({subTitle})</span>
        <span className={styles.title}>{value}</span>
        <span className={styles.title}>Clients: {clients}</span>
        <span className={styles.title}>{percentage}%</span>
        {/* <span className={styles.gotoBtn} onClick={()=>navigate('/ppm-model-equity-portfolio')}>GoTo</span> */}
      </div>
    </div>
  );
};

export default Balance;
