import FilledButton from "../../../../component/filled-button/FilledButton";

import styles from "./successfundmodal.module.scss";
const SuccessFundModal = ({ handleClose, popupData }) => {
  return (
    <div
      className={styles.mainContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.statusHeading}>
        {popupData?.fundName} Status Changed Successfully
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
