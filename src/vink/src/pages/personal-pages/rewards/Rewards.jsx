import React from "react";
import { rewardData, titleContentData } from "../../../data/data";
import PlanCard from "../../../components/plan-card/PlanCard"
import styles from "./rewards.module.scss";

const Rewards = () => {
  return (
    <div className={styles.mainContainer}>
      {titleContentData.map((item, index) => {
        return (
          <>
            <p className={styles.titleText} key={index}>
              {item.title}
            </p>
            <p className={styles.subTitleText}>{item.subtitle}</p>
          </>
        );
      })}
      <div className={styles.cardDisplayRow}>
        {rewardData.map((item, index) => {
          return (
            <PlanCard
              item={item}
              key={index}
              active={index === 4 ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Rewards;
