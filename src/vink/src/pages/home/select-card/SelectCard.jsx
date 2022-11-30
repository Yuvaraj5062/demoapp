import styles from "./selectCard.module.scss";
import Button from "../../../components/button/Button";
import CardReward from "../../../components/card-reward/CardReward";
import CashCard from "../../../assests/images/cashCard.png";
import { rewardCardData } from "../../../data/data";

const SelectCard = () => {
  return (
    <>
      <div className={styles.selectCardContainer}>
        <div className={styles.cardInfo}>
          <p className={styles.selectCardText}>Choose your Perfect Card</p>
          <p className={styles.offerText}>
            Customized offers fast and easy. Tell us who you are and what you
            like, to see what offers are available to you. It will only take a
            minute and won’t impact your credit score.
          </p>
          <Button
            title="Click for more offers"
            customClass={styles.startBtn}
            customClassForIcon={styles.startBtnIcon}
            customClassForText={styles.btnText}
          />
        </div>
        <div className={styles.cardContainer}>
          {rewardCardData.map((item, index) => {
            return (
              <CardReward
                key={index}
                image={item.image}
                rewardName={item.rewardName}
                points={item.points}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SelectCard;
