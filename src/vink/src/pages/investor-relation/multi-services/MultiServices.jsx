import styles from "./multiServices.module.scss";
import Title from "../../../components/title/Title";
import { valuesData } from "../../../data/data";
import { Dot } from "../../../components/svg-components";
import { color } from "../../../constants/color";
import { CompanyInfo } from "../../../components/company-info/CompanyInfo";

const MultiServices = () => {
  return (
    <>
      <div className={styles.multiServicesContainer}>
        <div className={styles.mainContainer}>
          <Title title="VALUES" customClass={styles.titleStyle} />
          <div className={styles.listContainer}>
            {valuesData.map((item, index) => {
              return (
                <div className={styles.list} key={index}>
                  <Dot fillColor={color.purple1} />
                  <span className={styles.listItem}>{item.listtxt}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.servicesContainer}>
            <div className={styles.servicesInfo}>
              <Title
                title="VINK MUILTI SERVICES PTY LTD"
                customClass={styles.titleStyle}
              />
              <div className={styles.paragraphOne}>
                Vink Muilti services PTY LTD, commonly known as VMS, will be
                listed on the Johannesburg stock exchange and Lusaka Securities
                Exchange, serves retail customers, large corporations,
                agri-business and public sector clients.
              </div>
              <div className={styles.paragraphTwo}>
                The Company has evolved into a leading financial institution in
                Southern Africa. With the aid of Arise B.V., a leading African
                Investment Company, VMS benefits from technical assistance,
                international networks and best practices in various areas of
                financial compliance.
              </div>
              <Title title="VISION" customClass={styles.titleVision} />
              <div className={styles.paragraphThree}>
                To be Africa’s leading, admired, preferred and innovative
                universal top transactional financial institution that provides
                the best in value solutions to clients while supporting
                financial inclusion
              </div>
              <Title title="MISSION" customClass={styles.titleVision} />
              <div className={styles.paragraphFour}>
                To be top universal, top transactional financial institution for
                all segments, while delivering excellent financial services
                efficiently, using the right client service model, and supported
                by an empowered and motivated staff.
              </div>
            </div>
            <CompanyInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiServices;
