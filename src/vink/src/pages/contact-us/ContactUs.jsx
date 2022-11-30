import StartNow from "../../components/start-now/StartNow";
import styles from "./contactUs.module.scss";
import Tab from "../../components/tab/Tab";
import { contactUsData } from "../../data/data";
// import ConnectUs from "../../components/connect-us/ConnectUs";
// import Footer from "../../components/footer/Footer";
import { useEffect, useRef, useState } from "react";
import { executeScroll } from "../../helpers/utils";

const ContactUs = ({ children }) => {
  return (
    <>
      <div className={styles.contactUsContainer}>
        <StartNow />
        <div className={styles.bannerImage}>
          <p className={styles.benefitsText}>
            All the benefits of Card, on your phone
          </p>
        </div>
        <Tab tabData={contactUsData} />
        {children}
        {/* <ConnectUs/> */}
        {/* <Footer scrollRef={scrollRef}/> */}
      </div>
    </>
  );
};

export default ContactUs;
