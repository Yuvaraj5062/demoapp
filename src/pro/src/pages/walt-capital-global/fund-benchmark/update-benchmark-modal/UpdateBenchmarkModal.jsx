import FilledButton from "../../../../component/filled-button/FilledButton";
import { Calender, Cross } from "../../../../component/svg-components";
import TextField from "../../../../component/text-field/TextField";
import styles from "./updatebenchmarkmodal.module.scss";
import { DateIcon } from "../../../../component/svg-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../styles/libraries.css";
import { useRef, useState } from "react";
const UpdateBenchmarkModal = ({ handleClose }) => {
  const [startDate, setStartDate] = useState(null);
  const calenderRef = useRef();
  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };
  return (
    <div
      className={styles.modalMainContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.modalTitle}>
        Update Benchmark
        <span className={styles.crossIcon}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </span>
      </div>
      <div className={styles.tableContent}>
        {/* <TextField
            customClassContainer={styles.textfieldContainer}
            label="Date"
            customClass={styles.labelName}
            customClassInput={styles.datainputfield}
          /> */}
        <div className={styles.dateInput}>
          <span className={styles.dateInputLabel}>Date</span>
          <div className={styles.datePickerContainer}>
            <DatePicker
              wrapperClassName={styles.datePicker}
              popperClassName={styles.datePick}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="2 October 2020"
              // showMonthYearPicker
              // showFourColumnMonthYearPicker
              // showYearDropdown
            />
            <span className={styles.iconContainer} ref={calenderRef}>
              <Calender
                fillColor="#ffffff"
                handleClick={() => handleClickCalenderPop()}
              />
            </span>
          </div>
          {/* <span>
              <input type="date" className={styles.dateInputField} />
            </span> */}
        </div>
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Mi-Plan IP Global Macro Fund in USD"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="JSE Top 40 in USD"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="S&P 500"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Dow Jones Industrial Average"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Gold Price in USD"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
      </div>
      <div className={styles.modalFooter}>
        {/* <FilledButton
          title="Edit"
          customClass={styles.editButton}
          handleClick={() => {}}
        /> */}
        <FilledButton
          title="Update"
          customClass={styles.addBenchmarkButton}
          handleClick={() => {}}
        />
      </div>
    </div>
  );
};

export default UpdateBenchmarkModal;
