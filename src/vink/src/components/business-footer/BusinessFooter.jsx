import React from "react";
// import { Link } from "react-router-dom";
import { businessFooterContentData } from "../../data/data";
import Button from "../button/Button";
import styles from "./businessfooter.module.scss";
import Footer from "../footer/Footer";
const BusinessFooter = () => {
  return (
    <>
      <div className={styles.footerMainContainer}>
        <div className={styles.titleTextConatiner}>
          {businessFooterContentData.map((item, index) => {
            return (
              <>
                <p className={styles.titleText} key={index}>
                  {item.title}
                </p>
                <p className={styles.subTitleText}>{item.subtitle}</p>
                <p className={styles.noteText}>{item.note}</p>
              </>
            );
          })}
          <Button
            title="Continue an Application"
            customClass={styles.continueApplicationBtn}
            customClassForText={styles.btnText}
          />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default BusinessFooter;
