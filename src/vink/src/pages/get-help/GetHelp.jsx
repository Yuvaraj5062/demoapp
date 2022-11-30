import React from "react";
// import Footer from "../../components/footer/Footer";
import ServiceCard from "../../components/service-card/ServiceCard";
import StartNow from "../../components/start-now/StartNow";
import styles from "./gethelp.module.scss";
import {
  selfServiceImgData,
  selfServiceData,
  paymentCardData,
} from "../../data/data";

const GetHelp = () => {
  return (
    <>
      <div className={styles.getHelpContainer}>
        <StartNow />
        <div className={styles.bannerImage}>
          {/* <div className={styles.textContainer}> */}
          <p className={styles.selfServiceText}>
            Self-service banking at your fingertips
          </p>
          <p className={styles.secureRangeText}>
            Use our range of secure and safe self-service banking tools and stay
            in control of your money.
          </p>
          {/* </div> */}
        </div>
        {/* <div className={styles.selfServiceTitleText}> */}
        <p className={styles.selfServiceTitleText}>
          Self-service banking tools from anywhere, anytime.
        </p>
        {/* </div> */}
        {/* <div>Card here ...</div> */}
        <div className={styles.SelfServiceCardsSection}>
          {selfServiceImgData.map((selfServiceImgDataCard) => (
            <ServiceCard
              CustomClass={styles.FirstSelfServiceCard}
              CardData={selfServiceImgDataCard}
              key={selfServiceImgDataCard.id}
              customClassForContent={styles.customClassForContent}
            />
          ))}
          <div className={styles.SelfServiceCardsSubSection}>
            {selfServiceData.map((selfService) => (
              <ServiceCard
                CustomClass={styles.OtherSelfServiceCard}
                CardData={selfService}
                key={selfService.id}
              />
            ))}
          </div>
        </div>
        <p className={styles.PaymentSectionHeading}>What You Pay</p>
        <p className={styles.PaymentSectionParagraph}>
          belive in transparent rates and fess structure that are designed to
          sui
        </p>
        <div className={styles.PaymentCardsContainer}>
          {paymentCardData.map((paymentData, index) => (
            <ServiceCard
              CustomClass={styles.PaymentCard}
              CardData={paymentData}
              key={index}
            />
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};
export default GetHelp;
