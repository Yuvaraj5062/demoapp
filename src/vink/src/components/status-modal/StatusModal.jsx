import styles from "./statusModal.module.scss";
import Close from "../modal/close/Close";
import Button from "../button/Button";
import { ErrorIcon, SuccessIcon } from "../svg-components";
import { useDispatch } from "react-redux";

const StatusModal = ({ status, statusDetail, buttonText, action }) => {
  const dispatch = useDispatch();
  const handleRetry = () => {
    action && dispatch(action);
  }
  return (
    <>
      <div className={styles.statusModalContainer}>
        <Close handleClose={() => handleRetry()} />
        <div className={styles.statusContainer}>
          <div className={styles.iconContainer}>
            {status === "Successful" ? <SuccessIcon /> : <ErrorIcon />}
          </div>
          <p
            className={
              status === "Successful"
                ? styles.statusSuccess
                : styles.statusError
            }
          >
            {status}
          </p>
          <p className={styles.statusText}>{statusDetail}</p>
          <Button
            title={buttonText}
            customClass={styles.btnStyle}
            customClassForText={styles.btnTextStyle}
            handleClick={() => handleRetry()}
          />
        </div>
      </div>
    </>
  );
};

export default StatusModal;
