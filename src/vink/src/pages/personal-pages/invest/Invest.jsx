import React from "react";
import { investData, titleContentData } from "../../../data/data";
import PlanCard from "../../../components/plan-card/PlanCard"
import styles from "./invest.module.scss";
const Invest = () => {
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
        {investData.map((item, index) => {
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

export default Invest;
