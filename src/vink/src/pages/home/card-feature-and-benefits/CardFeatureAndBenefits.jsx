import { useState } from "react";
import { CardFeature } from "../../../components/card-feature/CardFeature";
import { color } from "../../../constants/color";
import { cardFeatureAndBenefitsData } from "../../../data/data";
import styles from "./cardFeatureAndBenefits.module.scss";

const CardFeatureAndBenefits = () => {
  const [first, setfirst] = useState(false);

  return (
    <>
      <div className={styles.featureBenefitsContainer}>
        <div className={styles.featureBenefitsContainer}>
          <p className={styles.featureText}>Card Features and Benefits</p>
          <p className={styles.moreFeatureText}>More Features</p>
        </div>
        <div className={styles.cardContainer}>
          {cardFeatureAndBenefitsData.map((item, index) => {
            return (
              <CardFeature
                icon={
                  <item.icon
                    customClass={styles.iconStyle}
                    fillColor={index !== first ? color.blue3 : color.white1}
                    fillColor1={index !== first ? color.blue2 : color.white1}
                  />
                }
                feature={item.feature}
                description={item.description}
                key={index}
                mouseEnter={() => setfirst(index)}
                mouseLeave={() => setfirst(!first)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CardFeatureAndBenefits;
