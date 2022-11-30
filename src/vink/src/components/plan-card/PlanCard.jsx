import React from "react";
import Button from "../button/Button";
import { CorrectIcon } from "../svg-components";
import styles from "./planCard.module.scss";

const PlanCard = ({ customClass, item, active }) => {
  return (
    <>
      <div
        className={active ? styles.cardContainerActive : styles.cardContainer}
      >
        <p className={styles.mainTitle}>{item.title}</p>
        <p className={styles.priceText}>
          R{item.price}
          <span className={styles.monthText}>/ Month</span>
        </p>
        <p className={styles.getText}>What you Get</p>
        <div className={styles.detailContainer}>
          {item.dataContent.map((item1, index) => {
            return (
              <div key={index} className={styles.detailText}>
                <span>
                  <CorrectIcon
                    fillColor={active ? "#FFFFFF" : "#CCD2E3"}
                    className={styles.checkIcon}
                  />
                </span>
                <span className={styles.textContent}>{item1}</span>
              </div>
            );
          })}
        </div>
        <div className={[styles.btnContainer, customClass].join("")}>
          <Button
            title="Apply Now"
            customClass={styles.applyBtn}
            customClassForIcon={styles.btnIcon}
            customClassForText={styles.btnText}
          />
          <Button
            title="Tell me more"
            customClass={styles.moreBtn}
            customClassForIcon={styles.btnIcon}
            customClassForText={styles.btnText}
          />
        </div>
      </div>
    </>
  );
};

export default PlanCard;
