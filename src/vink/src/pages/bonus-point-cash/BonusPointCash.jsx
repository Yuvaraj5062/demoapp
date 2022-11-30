import styles from "./bonusPointCash.module.scss";
import Divider from "../../components/divider/Divider";
import { bonusPointData } from "../../data/data";
import BonusPointCard from "../../components/bonus-point-card/BonusPointCard";
import { color } from "../../constants/color";

const BonusPointCash = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.bonusPointCash}>
          <p className={styles.infoText}>
            Whether you're looking for side-by-side comparisons, info around
            rewards versus points or you're ready to apply, we've gathered
            everything you need in one easy place.
          </p>
          <p className={styles.businessText}>
            Power your business potential and earn 80,000 bonus points or $300
            bonus cash back.
          </p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.cardContainer}>
            {bonusPointData.map((item, index) => {
              return (
                <BonusPointCard
                  key={index}
                  icon={<item.icon fillColor={color.blue2} />}
                  points={item.points}
                  pointTitle={item.pointTitle}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default BonusPointCash;
