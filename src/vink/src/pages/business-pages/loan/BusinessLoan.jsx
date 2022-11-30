import React from "react";
import { loanBusinessData, titleContentData } from "../../../data/data";
import styles from "./businessloan.module.scss";
import Button from "../../../components/button/Button";
import PlanCard from "../../../components/plan-card/PlanCard";

const BusinessLoan = () => {
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
          {loanBusinessData.map((item, index) => {
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

export default BusinessLoan;
