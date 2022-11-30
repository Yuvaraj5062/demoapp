import React from "react";
import styles from "./popup.module.scss";

export const Popup = ({ handleClose, setModal, Children, customClass }) => {
  return (
    <div
      className={[styles.popup, customClass].join(" ")}
      /* onClick={() => handleClose()} */
    >
      <Children handleClose={() => handleClose()} setModal={setModal} />
    </div>
  );
};
