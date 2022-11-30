import React from "react";
import styles from "./companyDetails.module.scss";
import Divider from "../divider/Divider";

export const CompanyDetails = ({ infoData }) => {
  return (
    <>
      <div className={styles.InfoContainer}>
        <div className={styles.InfoSection}>
          <p className={styles.Filedname}>{infoData.filedname}</p>
          <p className={styles.FiledAns}>{infoData.filedans}</p>
        </div>
        <Divider customClass={styles.divider} />
      </div>
    </>
  );
};
