import React from "react";
import PlanCard from "../../../components/plan-card/PlanCard";
import { creditcardCorporateData, titleContentData } from "../../../data/data";
import styles from "./corporatecreditcard.module.scss";

const CorporateCreditCard = () => {
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
          {creditcardCorporateData.map((item, index) => {
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

export default CorporateCreditCard;
