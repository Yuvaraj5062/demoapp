import Button from "../button/Button";
import { CreditCardIcon, StartNowIcon } from "../svg-components";
import styles from "./startNow.module.scss";

const StartNow = () => {
  return (
    <>
      <div className={styles.startNowContainer}>
        <div className={styles.textContent}>
          <p className={styles.textData}>
            Let us find the card that suits you best.
          </p>
          <p className={styles.text}>
            Personalize your results in a few simple steps.
          </p>
        </div>
        <Button
          title="Start Now"
          customClass={styles.startBtn}
          customClassForIcon={styles.startBtnIcon}
          icon={<StartNowIcon fillColor="#ffffff" />}
        />
      </div>
    </>
  );
};

export default StartNow;
