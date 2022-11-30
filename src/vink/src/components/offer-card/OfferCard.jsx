import Button from "../button/Button";
import styles from "./offerCard.module.scss";

const OfferCard = ({ creditCardTitle, rewardTitle, cardImage, cardInfo }) => {
  return (
    <>
      <div className={styles.offerCardContainer}>
        <p className={styles.rewardCredit}>{creditCardTitle}</p>
        <p className={styles.pointsText}>{rewardTitle}</p>
        <img src={cardImage} className={styles.imageStyle} />
        <p className={styles.infoDetails}>{cardInfo}</p>
        <Button
          title="Apply Now"
          customClass={styles.applyBtn}
          customClassForText={styles.applyBtnText}
        />
      </div>
    </>
  );
};

export default OfferCard;
