import FilledButton from "../../../../component/filled-button/FilledButton";

import styles from "./successfundmodal.module.scss";
const SuccessFundModal = ({ handleClose }) => {
  return (
    <div
      className={styles.mainContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.statusHeading}>
        ABC Fund Status Changed Successfully
      </div>

      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <FilledButton
            title="OK"
            customClass={styles.okButton}
            handleClick={() => handleClose()}
          />
        </div>
      </div>
    </div>
  );
};
export default SuccessFundModal;
