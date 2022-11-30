import { IconArrow, IconParenthe } from "../svg-components";
import styles from "./serviceCard.module.scss";

const ServiceCard = ({ CustomClass, CardData, customClassForContent }) => {
  return (
    <>
      <div className={[styles.serviceCardContainer, CustomClass].join(" ")}>
        {CardData.ShowCardContent ? (
          <img
            className={styles.SelfServiceCardImg}
            src={CardData.CardImg}
            alt="cardimg"
          />
        ) : (
          ""
        )}
        <div
          className={[styles.contentContainer, customClassForContent].join(" ")}
        >
          <p className={styles.SelfServiceCardHeading}>
            {CardData.CardHeading}
          </p>
          <p className={styles.SelfServiceCardTxt}>{CardData.CardParagraph}</p>
          <p className={styles.SelfServiceCardBtn}>
            {CardData.CardButton}
            <IconArrow customClass={styles.arrowIcon}/>
            {/* {CardData.ShowIcon ? (
              <IconParenthe customClass={styles.iconStyle} />
            ) : (
            
            )} */}
          </p>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
