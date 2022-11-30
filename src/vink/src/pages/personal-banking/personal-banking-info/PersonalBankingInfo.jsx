import styles from "./personalBankingInfo.module.scss";
import personalBankingImage from "../../../assests/images/personalBankingImage.png";

const PersonalBankingInfo = () => {
  return (
    <>
      <div className={styles.personalBankingInfoContainer}>
        <img
          src={personalBankingImage}
          alt="personalBankingImage"
          className={styles.imageStyle}
        />
        <div className={styles.infoContainer}>
          <div className={styles.bankingTitle}>
            Personal banking that’s actually personal
          </div>
          <div className={styles.bankingInfoText}>
            Banking with us means you’re more than just an account number. We
            work with you to build a relationship, so you can build your future.
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalBankingInfo;
