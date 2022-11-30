import React from "react";
import { ClearAccessAccountData, titleContentData } from "../../../data/data";
import PlanCard from "../../../components/plan-card/PlanCard";
import styles from "./account.module.scss";

const Account = () => {
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
          {ClearAccessAccountData.map((item, index) => {
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

export default Account;
