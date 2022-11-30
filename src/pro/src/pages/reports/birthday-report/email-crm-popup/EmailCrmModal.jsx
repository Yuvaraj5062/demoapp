import { useState } from "react";
import AlphabeticFilter from "../../../../component/alphabetic-filter/AlphabeticFilter";
import FilledButton from "../../../../component/filled-button/FilledButton";
import RadioButton from "../../../../component/radio-button/RadioButton";
import { Cross, Upload } from "../../../../component/svg-components";
import TextField from "../../../../component/text-field/TextField";
import UploadFile from "../../../../component/upload-file/UploadFile";

import styles from "./emailcrm.module.scss";

const EmailCrmModal = ({ handleClose }) => {
  const [value, setValue] = useState(null);

  return (
    <div
      className={styles.emailCrmContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <AlphabeticFilter title="Clients" customClass={styles.allClients} />
      <div className={styles.emailCrmCross}>
        Form to Email and CRM
        <span className={styles.crossIcon}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </span>
      </div>

      <div className={styles.tableData}>
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="First Name*"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Last Name*"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <div className={styles.radioButtonContainer}>
          <div className={styles.genderText}> Gender* </div>
          <div className={styles.genderRadioButton}>
            <RadioButton
              label="Female"
              name="r1"
              customClass={styles.radioButtonStyle}
              radioLabelClass={styles.radioLabelClass}
            />
            <RadioButton
              label="Male"
              name="r1"
              customClass={styles.radioButtonStyle}
              radioLabelClass={styles.radioLabelClass}
            />
          </div>
        </div>

        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Email*"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Subject"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <div className={styles.upload}>
          <span className={styles.uploadTemplateText}>Upload Template</span>
          <div className={styles.uploadContainer}>
            <UploadFile
              customClass={styles.uploadArrow}
              browseFile={styles.file}
              selectedFileText="No template choosen"
              buttonStyle={styles.fileInputBtn}
              browseContent={<Upload fillColor="#EFEFEF" />}
            />
          </div>
        </div>

        <span className={styles.message}> Message* </span>
        <textarea className={styles.text} value={value}></textarea>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <FilledButton title="Send" customClass={styles.sendButton} />
        </div>
      </div>
    </div>
  );
};
export default EmailCrmModal;
