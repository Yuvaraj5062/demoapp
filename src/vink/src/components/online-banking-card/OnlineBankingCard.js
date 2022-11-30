import React from "react";
import styles from "./onlineBankingCard.module.scss";
import Button from "../button/Button";

const OnlineBankingCard = ({ listData, title,buttonTitle,subTitle }) => {
  return (
    <div className={styles.OnlineBankingCard}>
      <p className={styles.OnlineBankingCardTitle}>
       {title}
      </p>
      <ul className={styles.OnlineBankingCardList}>
        {listData.map((data, index) => (
          <li className={styles.OnlineBankingCardListItem} key={index}>
            {data.listtxt}
          </li>
        ))}
      </ul>
      {
        subTitle &&  <p className={styles.OnlineBankingCardTxt}>
        {subTitle}
      </p>
      }
      <Button
        title={buttonTitle}
        customClass={styles.OnlineBankingCardBtn}
        customClassForText={styles.OnlineBankingCardBtnTxt}
      />
    </div>
  );
};

export default OnlineBankingCard;
