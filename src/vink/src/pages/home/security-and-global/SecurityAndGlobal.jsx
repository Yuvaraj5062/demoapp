import React from "react";
import styles from "./securityAndGlobal.module.scss";
import securityImage from "../../../assests/images/securityImage.png";
import map from "../../../assests/images/mapImage.png";

import Button from "../../../components/button/Button";

const SecurityAndGlobal = () => {
  return (
    <>
      <div className={styles.securityContainer}>
        <div className={styles.mainContainer}>
          {/* <div className={styles.aboutContainer}> */}
          <div className={styles.protectedContent}>
            <img
              src={securityImage}
              alt="securityImage"
              className={styles.imageContainer}
            />
            <div className={styles.protectedTextContainer}>
              <p className={styles.protectedText}>Your Day is Protected</p>
              <p className={styles.creditIntrestText}>
                In contrast, credit cards allow the consumers a continuing
                balance of debt, subject to interest being charged.
              </p>

              <p className={styles.creditCardBuyText}>
                A credit card also differs from a cash card, which can be used
                like currency by the owner of the card. A credit card differs
                from a charge card also in that a credit card typically involves
                a third-party entity that pays the seller and is reimbursed by
                the buyer, whereas a charge card.
              </p>
              <Button
                title="Learn more"
                customClass={styles.btnStyle}
                customClassForText={styles.btnText}
              />
            </div>
          </div>
        </div>

        <div className={styles.mapMainContainer}>
          {/* <div className={styles.aboutContainer}> */}
          <div className={styles.mapContent}>
            <div className={styles.mapTextContainer}>
              <p className={styles.everywhereText}>We are Almost Everywhere</p>
              <p className={styles.cardPaymentText}>
                A credit card is a payment card issued to users (cardholders) to
                enable the cardholder to pay a merchant for goods and services.
              </p>

              <p className={styles.cardIssueText}>
                The card issuer (usually a bank) creates a revolving account and
                grants a line of credit to the cardholder, from which the
                cardholder can borrow money for payment to a merchant or as a
                cash advance.
              </p>
              <Button
                title="Click for Details"
                customClass={styles.detailBtnStyle}
                customClassForText={styles.detailBtnText}
              />
            </div>
            <img src={map} alt="map" className={styles.mapContainer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityAndGlobal;
