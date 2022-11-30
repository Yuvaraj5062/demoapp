import React from "react";
import styles from "./businessaccount.module.scss";
import Button from "../../../components/button/Button";
import PlanCard from "../../../components/plan-card/PlanCard";
import { accountBusinessData, titleContentData } from "../../../data/data";
const BusinessAccount = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.titleTextConatiner}>
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
          <Button
            title="Help Me Decide"
            customClass={styles.helpMeDecideBtn}
            customClassForText={styles.btnText}
          />
        </div>

        <div className={styles.cardDisplayRow}>
          {accountBusinessData.map((item, index) => {
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

export default BusinessAccount;
