import React from "react";
import ImageCard from "../../../components/image-card/ImageCard";
import Title from "../../../components/title/Title";
import { benefitsOfBankingData } from "../../../data/data";
import styles from "./benefit-of-banking.module.scss";

const BenefitsOfBanking = () => {
  return (
    <>
      <div className={styles.benefitContainer}>
        <div className={styles.mainContainer}>
          {/* <div className={styles.benefitTitleText}>
            Benefits of Banking with Us
          </div> */}
          <Title title="Benefits of Banking with Us" />
          <div className={styles.benefitSubtitleText}>
            Collaboratively-built. Relationship-driven. World-class service on a
            personal scale
          </div>
        </div>
        <ImageCard
          data={benefitsOfBankingData}
          customClassContainer={styles.customClassContainer}
          customClass={styles.imageCart}
          cardTitleClass={styles.cardTitle}
          cardSubTitleClass={styles.cardSubTitleText}
        />
      </div>
    </>
  );
};

export default BenefitsOfBanking;
