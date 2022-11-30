import React from "react";
import Button from "../../../components/button/Button";
import styles from "./homeslider.module.scss";
import {
  CreditCardIcon,
  LearnMoreIcon,
} from "../../../components/svg-components";

const HomeSlider = ({
  data,
  customClass,
  customBenefitClass,
  customResultText,
}) => {
  return (
    <>
      {data.map((data, index) => {
        return (
          <div className={[styles.aboutContainer, customClass].join(" ")} key={index}>
            <div className={styles.aboutContent}>
              <div className={styles.aboutTextContainer}>
                <p
                  className={[styles.benefitsText, customBenefitClass].join(
                    " "
                  )}
                >
                  {data?.title}
                </p>
                <p className={[styles.resultText, customResultText].join(" ")}>
                  {data?.subtitle}
                </p>
                <Button
                  title="Learn more"
                  customClass={styles.btnStyle}
                  customClassForIcon={styles.learnBtnIcon}
                  icon={<LearnMoreIcon />}
                />
              </div>
              <img
                src={data?.image}
                alt="phone_card_shopping"
                className={styles.imageContainer}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default HomeSlider;
