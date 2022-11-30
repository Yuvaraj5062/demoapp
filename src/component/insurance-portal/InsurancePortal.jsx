import { Dotted } from "../svg-components";
import styles from "./insuranceportal.module.scss";

const InsurancePortal = ({ customClass, data , value , handleClick }) => {
  return (
    <>
      <div className={[styles.insurancePortalContainer, customClass].join(" ")}>
        {
          data.map((item, index) => {
            return (
              <div className={index === value ? styles.insurancePortalHeadingActive : styles.insurancePortalHeadingDeactive } key={index}>
                  {item.icon}
                <span className={styles.title} onClick={()=>handleClick(index,item.title)} >{item.title}</span>
              </div>
            )
          })
        }
        <div className={styles.icon}>
          <Dotted fillColor="#ffffff" />
        </div>
      </div>
    </>
  );
};

export default InsurancePortal;
