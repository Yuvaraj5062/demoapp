import FilledButton from "../../filled-button/FilledButton";

import styles from "./buttongroup2.module.scss";
const ButtonGroup2 = ({ customClass, title1, title2 }) => {
  return (
    <>
      <div className={styles.buttonGroup}>
        <FilledButton
          title={title1}
          customClass={[styles.emailButton, customClass].join(" ")}
          handleClick={() => {}}
        />
        <FilledButton
          title={title2}
          customClass={[styles.emailButton, customClass].join(" ")}
          handleClick={() => {}}
        />
      </div>
    </>
  );
};

export default ButtonGroup2;
