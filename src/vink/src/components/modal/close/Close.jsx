import React from "react";
import styles from "./close.module.scss";
import { CloseIcon } from "../../svg-components";

const Close = ({ handleClose, customClass }) => {
  return (
    <div
      className={[styles.closeContainer, customClass].join(" ")}
      onClick={() => handleClose()}
    >
      <CloseIcon fillColor="#262B2E" />
    </div>
  );
};

export default Close;
