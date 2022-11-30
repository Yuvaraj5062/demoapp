import styles from "./popup.module.scss";

const Popup = ({
  Children,
  handleClose,
  handleToast,
  setModal,
  setPopupData,
  popupData,
  handleDelete,
  msg,
  submitButton,
  id,
  customClassText
}) => {
  return (
    <div className={styles.popup} onClick={() => handleClose && handleClose()}>
      <Children
        handleClose={() => handleClose()}
        handleToast={() => handleToast()}
        setModal={setModal}
        setPopupData={setPopupData}
        popupData={popupData}
        handleDelete={handleDelete}
        msg={msg}
        id={id}
        submitButton={submitButton}
        customClassText={customClassText}
      />
    </div>
  );
};

export default Popup;
