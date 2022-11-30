import { companyInfomation } from "../../data/data";
import { CompanyDetails } from "../company-details/CompanyDetails";
import styles from "./companyInfo.module.scss";

export const CompanyInfo = () => {
  return (
    <>
      <div className={styles.CompanyDetailsContainer}>
        <p className={styles.infoHeading}>COMPANY INFORMATION</p>
        {companyInfomation.map((companyinfo, index) => (
          <CompanyDetails infoData={companyinfo} key={index} />
        ))}
      </div>
    </>
  );
};
