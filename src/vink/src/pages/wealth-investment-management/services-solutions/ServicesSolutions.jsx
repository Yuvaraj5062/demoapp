import styles from "./servicesSolutions.module.scss";
import servicesSolutions from "../../../assests/images/servicesSolutions.png";

const ServicesSolutions = () => {
  return (
    <>
      <div className={styles.servicesSolutionsContainer}>
        <div className={styles.mainContainer}>
          <p className={styles.servicesSolutionsText}>Services & Solutions</p>
          <span className={styles.servicesSolutionsInfo}>
            Planning for a strong financial future may not be simple, but it
            should be straightforward — from strategic estate and financial
            planning and investing to trust and estate administration and
            personal banking solutions.
          </span>
        </div>
        <img
          src={servicesSolutions}
          alt="corporate_overview"
          className={styles.imageStyle}
        />
      </div>
    </>
  );
};

export default ServicesSolutions;
