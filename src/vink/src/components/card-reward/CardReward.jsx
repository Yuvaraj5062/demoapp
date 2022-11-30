import styles from "./cardReward.module.scss";

const CardReward = ({ image, rewardName, points }) => {
  return (
    <>
      <div className={styles.cardRewardContainer}>
        <img src={image} className={styles.imageStyle} />
        <p className={styles.rewardText}>{rewardName}</p>
        <p className={styles.pointsText}>{points}</p>
        <p className={styles.detailsInfo}>Details Info</p>
      </div>
    </>
  );
};

export default CardReward;
