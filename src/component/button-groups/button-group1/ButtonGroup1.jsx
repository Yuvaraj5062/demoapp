import EmailCrmModal from "../../../pages/reports/birthday-report/email-crm-popup/EmailCrmModal";
import FilledButton from "../../filled-button/FilledButton";
import Popup from "../../popup/Popup";
import styles from "./buttongroup1.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ButtonGroup1 = ({ customClass, handleGoTo, title1, title2 }) => {
  const [crmModal, setCrmModal] = useState(false);
  const handleEmailClose = () => {
    setCrmModal(!crmModal);
  };
  const handleEmail = () => {
    setCrmModal(!crmModal);
    console.log("helloooo");
  };

  return (
    <>
      {crmModal && (
        <Popup
          Children={EmailCrmModal}
          handleClose={() => handleEmailClose()}
        />
      )}
      <div className={styles.buttonGroup}>
        <FilledButton
          title={title1}
          customClass={[styles.emailButton, customClass].join(" ")}
          handleClick={() => {
            handleEmail();
          }}
        />
        <FilledButton
          title={title2}
          customClass={[styles.emailButton, customClass].join(" ")}
          handleClick={(id) => handleGoTo(id)}
        />
      </div>
    </>
  );
};

export default ButtonGroup1;
