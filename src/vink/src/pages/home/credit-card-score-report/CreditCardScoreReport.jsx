import CreditScoreCard from "../../../components/creditscore-card/CreditScoreCard";
import {
  CreditReportIcon,
  CreditScoreIcon,
} from "../../../components/svg-components";
import styles from "./creditCardScoreReport.module.scss";

const CreditCardScoreReport = () => {
  return (
    <>
      <div className={styles.creditScoreContainer}>
        <p className={styles.applyText}>
          Know where you stand even before you apply.
        </p>
        <div className={styles.cardContainer}>
          <CreditScoreCard
            customClass={styles.cardReport}
            icon={<CreditReportIcon />}
          />
          <CreditScoreCard
            customClass={styles.cardScore}
            icon={<CreditScoreIcon />}
          />
        </div>
      </div>
    </>
  );
};

export default CreditCardScoreReport;
