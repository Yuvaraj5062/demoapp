import styles from "./creditScoreCard.module.scss";

const CreditScoreCard = ({ icon, customClass }) => {
  return (
    <>
      <div className={[styles.mainContainer, customClass].join(" ")}>
        {icon}
        <p className={styles.cardInfo}>
          Get your FREE Credit Score and Credit Report
        </p>
      </div>
    </>
  );
};

export default CreditScoreCard;
