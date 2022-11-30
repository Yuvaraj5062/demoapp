import React from "react";
import Button from "../button/Button";
import styles from "./paragraphCard.module.scss";

const ParagraphCard = ({
  data,
  customClass,
  customClassForTitle,
  customClassForInfo,
  customClassFormain,
}) => {
  return (
    <div className={[styles.paragraphContainer, customClass].join(" ")}>
      <div className={[styles.mainContainer, customClassFormain].join(" ")}>
        <p className={[styles.cardTitle, customClassForTitle].join(" ")}>
          {data.cardTitle}{" "}
        </p>
        <p className={[styles.cardInfo, customClassForInfo].join(" ")}>
          {data.cardInfo}
        </p>

        {data.cardInfo1 && <p className={styles.cardInfo1}>
          {data.cardInfo1}
        </p>}

        {data.buttonText && <Button title={data.buttonText} customClass={styles.btnStyle} />}
      </div>
    </div>
  );
};
export default ParagraphCard;
