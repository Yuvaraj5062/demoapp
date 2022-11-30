import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  cardCall,
  legalLinks,
  ourSitesLinks,
  socialinksData,
  supportLinks,
  usefulLinks,
  whoWeAreLinks,
} from "../../data/data";
import Divider from "../divider/Divider";
import styles from "./footer.module.scss";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen ";
import DownloadApp from "../../assests/images/downloadApp.png";
import GooglePlay from "../../assests/images/googlePlay.png";
import { executeScroll } from "../../helpers/utils";
const Footer = ({ scrollRef }) => {
  const isMobile = useCheckMobileScreen();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.footerMainContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.footerContentLinks}>
            <div className={styles.socialContent}>
              <p style={{ marginTop: "0px" }}>Social</p>
              <div className={styles.Icons}>
                {socialinksData.map((item, index) => {
                  return (
                    <Link to="/" className={styles.LinkIcons} key={index}>
                      <item.icon
                        fillColor={index !== value ? "#422F87" : "#FFFFFF"}
                        handleEnter={() => setValue(index)}
                        handleLeave={() => setValue(!value)}
                      />
                    </Link>
                  );
                })}
              </div>
              <p>Useful Tools</p>
              {usefulLinks.map((item, index) => {
                return (
                  <p key={index} className={styles.socialContentLinks}>
                    {item}
                  </p>
                );
              })}
            </div>
            {isMobile && <Divider customClass={styles.divideLine} />}
            <div className={styles.howWeAreContent}>
              <p style={{ marginTop: "0px" }}>Who We Are</p>
              {whoWeAreLinks.map((item, index) => {
                return (
                  <p
                    key={index}
                    className={styles.howWeAreContentLinks}
                    onClick={() => {
                      item.navigate && navigate(item.navigate);
                      item.navigate && executeScroll(scrollRef);
                    }}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>
            {isMobile && <Divider customClass={styles.divideLine} />}
            <div className={styles.ourSiteContent}>
              <p style={{ marginTop: "0px" }}>Our Sites</p>
              {ourSitesLinks.map((item, index) => {
                return (
                  <p key={index} className={styles.ourSitesContentLinks} onClick={() => { item.navigate && navigate(item.navigate); item.navigate && executeScroll(scrollRef) }}>
                    {item.name}
                  </p>
                );
              })}
              <p>Legal</p>
              {legalLinks.map((item, index) => {
                return (
                  <p key={index} className={styles.ourSitesContentLinks}>
                    {item}
                  </p>
                );
              })}
            </div>
            {isMobile && <Divider customClass={styles.divideLine} />}
            <div className={styles.supportContent}>
              <p style={{ marginTop: "0px" }}>Support</p>
              {supportLinks.map((item, index) => {
                return (
                  <p
                    key={index}
                    className={styles.supportContentLinks}
                    onClick={() => {
                      item.navigate && navigate(item.navigate);
                      item.name === "Contact Us" && executeScroll(scrollRef);
                    }}
                  >
                    {item.name}
                  </p>
                );
              })}
              <p>Lost or stolen cards call</p>
              {cardCall.map((item, index) => {
                return (
                  <p key={index} className={styles.supportContentLinks}>
                    {item}
                  </p>
                );
              })}
            </div>
            <div className={styles.downloadApp}>
              <p className={styles.downloadAppText}>Download the App Now!</p>
              <p className={styles.creditScoreText}>
                Your credit score is a tool to help you meet your goals. Want to
                get better rates on loans and credit cards? Refi your student
                loans — or even your mortgage? Your credit score could make it
                happen.
              </p>
              <div className={styles.buttonContainer}>
                <img src={DownloadApp} className={styles.downloadAppBtn} />
                <img src={GooglePlay} className={styles.googlePlayBtn} />
              </div>
            </div>
          </div>
          <Divider customClass={styles.divideLine} />

          <p className={styles.footerContentInfoLinks}>
            For all information on COVID-19, visit the
            <Link to="/" className={styles.footerContentInfoLinks}>
              VMS COVID-19
            </Link>
            page or go to
            <Link to="/" className={styles.footerContentInfoLinks}>
              sacoronavirus.co.za
            </Link>
          </p>

          <p className={styles.footerContentAddressInfo}>
            VMS Head Office : State house Building, 8 Rose Street, Cape Town,
            South Africa
          </p>

          <div className={styles.footerContent}>
            <p className={styles.footerContentText}>
              Terms Of Use | Banking Regulations | Privacy Statement | Security
              Centre | Authorised Financial Services Provider and a registered
              credit provider (NCRCP)
            </p>
            <p className={styles.footerContentCopyRightText}>
              © Copyright. VMS Bank Limited. All Rights reserved | Registration
              number 2018/079316/07
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
