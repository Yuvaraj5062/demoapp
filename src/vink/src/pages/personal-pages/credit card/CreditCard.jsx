import React from "react";
import { creditCardData, titleContentData } from "../../../data/data";
import PlanCard from "../../../components/plan-card/PlanCard"
import styles from "./creditCard.module.scss";

const CreditCard = () => {
  return (
    <>
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
          {creditCardData.map((item, index) => {
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
    </>
  );
};

export default CreditCard;
