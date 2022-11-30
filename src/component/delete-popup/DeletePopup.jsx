import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { danger, success } from "../../data/data";
import { clearState } from "../../redux/features/clienttransaction/clientTransactionSlice";
import FilledButton from "../filled-button/FilledButton";
import Toast from "../toast/Toast";
import styles from "./deletepopup.module.scss";

const DeletePopup = ({
  handleClose,
  msg,
  handleDelete,
  submitButton,
  customClassText,
}) => {
  const state = useSelector((state) => state.clientTransaction);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearState({ isClear: false }));
    };
  }, []);

  //   const handleDelete = () => {
  //     setPopupData(true)
  //     handleClose();
  //   };

  return (
    <>
      {state.msg || state.error ? (
        <Toast
          item={state?.msg ? success : danger}
          message={state?.msg ? state.msg : state.error}
        />
      ) : null}
      <div
        className={styles.mainContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ display: state.msg ? "none" : 'block' }}
      >
        <div className={styles.deleteHeading}>
          <p className={[styles.paragraph, customClassText].join(" ")}>
            {/* You are about to delete a group */}
            {msg}
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <FilledButton
            title="Cancel"
            customClass={styles.cancelButton}
            handleClick={() => handleClose()}
          />
          <FilledButton
            title={submitButton ? submitButton : "Delete"}
            customClass={styles.deleteButton}
            loader={state.isLoading}
            handleClick={() => state.isLoading ? {} : handleDelete()}
          />
        </div>
      </div>
    </>
  );
};
export default DeletePopup;
