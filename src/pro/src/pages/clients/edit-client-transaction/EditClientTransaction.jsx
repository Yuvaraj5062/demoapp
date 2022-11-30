import { useState } from "react";
import FilledButton from "../../../component/filled-button/FilledButton";
import { Cross, DropdownIcon2 } from "../../../component/svg-components";
import TextField from "../../../component/text-field/TextField";
import styles from "./editclienttransaction.module.scss";

const EditClientTransaction = ({ handleClose }) => {
  const [value, setValue] = useState(null);
  return (
    <div
      className={styles.transactionContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.transactionCross}>
        Edit Client Transaction
        <span className={styles.crossIcon}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </span>
      </div>
      <div className={styles.tableInformation}>
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Fund name"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Inception"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Unit Start Price:"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Management Fee:"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Performance Fee:"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />

        <div className={styles.textareaContainer}>
          <label className={styles.message}> Fund Philosophy:</label>
          <textarea className={styles.text} value={value}></textarea>
        </div>
        <div className={styles.textareaContainer}>
          <label className={styles.message}> Fund Strategy:</label>
          <textarea className={styles.text} value={value}></textarea>
        </div>
        <div className={styles.textareaContainer}>
          <label className={styles.message}>
            Top holdings (Seprate entries by comma):
          </label>
          <textarea className={styles.text} value={value}></textarea>
        </div>

        <div className={styles.dropdown}>
          <span className={styles.risk}>Risk Profile: </span>

          <div className={styles.dropdownArrow}>
            <div className={styles.arrow}>
              <DropdownIcon2 fillColor="#FFFFFF" />
            </div>
          </div>
        </div>

        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Portfolio Manager:"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <div className={styles.textareaContainer}>
          <label className={styles.message}>Sector:</label>
          <textarea className={styles.text} value={value}></textarea>
        </div>
        <div className={styles.textareaContainer}>
          <label className={styles.message}>Target:</label>
          <textarea className={styles.text} value={value}></textarea>
        </div>
        <div className={styles.textareaContainer}>
          <label className={styles.message}>Minimum Investment:</label>
          <textarea className={styles.text} value={value}></textarea>
        </div>
        <div className={styles.textareaContainer}>
          <label className={styles.message}>Recommended Investment:</label>
          <textarea className={styles.text} value={value}></textarea>
        </div>
        <div className={styles.textareaContainer}>
          <label className={styles.message}>RCM initial fee:</label>
          <textarea className={styles.text} value={value}></textarea>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <FilledButton title="Edit" customClass={styles.priceButton} />
        </div>
      </div>
    </div>
  );
};
export default EditClientTransaction;
