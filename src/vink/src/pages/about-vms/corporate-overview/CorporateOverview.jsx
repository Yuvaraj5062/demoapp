import styles from "./corporateOverview.module.scss";
import corporateOverviewImage from "../../../assests/images/corporateOverviewImage.png";

const CorporateOverview = () => {
  return (
    <>
      <div className={styles.corporateOverviewContainer}>
        <div className={styles.mainContainer}>
          <p className={styles.overviewText}>Corporate Overview</p>
          <span className={styles.overviewInfo}>
            Bringing deep knowledge and experience to every conversation, we
            work collaboratively to anticipate opportunities and meet your needs
            as they evolve. Our personal approach and client-centric culture
            have enabled us to deliver exceptional value for our clients for
            more than five years – an achievement we’re proud to continue.
          </span>
        </div>
        <img
          src={corporateOverviewImage}
          alt="corporate_overview"
          className={styles.imageStyle}
        />
      </div>
    </>
  );
};

export default CorporateOverview;
