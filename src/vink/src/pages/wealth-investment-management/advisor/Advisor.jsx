import styles from "./advisor.module.scss";
import { adviceType } from "../../../data/data";

const Advisor = () => {
  return (
    <>
      <div className={styles.adviceMain}>
        <div className={styles.adviceContent}>
          <p className={styles.adviceHeading}>
            Achieving big goals with Private Wealth Advisors
          </p>
          <p className={styles.adviceTxt}>
            We believe we’ve created something truly unique at Texas Capital
            Bank Private Wealth Advisors: a team large enough to provide you
            with the breadth of service and depth of expertise you require, but
            small enough to get to know you and your goals firsthand.
          </p>
          <div className={styles.adviceType}>
            {adviceType.map((item, index) => {
              return (
                <span className={styles.adviceList} key={index}>
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Advisor;
