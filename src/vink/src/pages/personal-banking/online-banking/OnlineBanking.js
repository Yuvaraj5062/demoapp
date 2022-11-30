import React from "react";
import styles from "./onlineBanking.module.scss";
import OnlineMobileBanking from "../../../assests/images/onlineMobileBanking.png";
import OnlineBankingCard from "../../../components/online-banking-card/OnlineBankingCard";
import { onlineBankingListData } from "../../../data/data";

const OnlineBanking = () => {
  return (
    <div className={styles.OnlineBankingContainer}>
      <div className={styles.OnlineBankingSection}>
        <OnlineBankingCard
          listData={onlineBankingListData}
          buttonTitle="View Our Online Banking Guide"
          title="The ease of online banking meets the quality of in-person service."
          subTitle="All from your phone or tablet"
        />
        <img
          className={styles.OnlineBankingImg}
          src={OnlineMobileBanking}
          alt="OnlineMobileBanking"
        />
      </div>
    </div>
    // </div>
  );
};

export default OnlineBanking;
