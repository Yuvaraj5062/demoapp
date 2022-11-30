import FilledButton from "../../../../component/filled-button/FilledButton";
import { Cross, Calender } from "../../../../component/svg-components";
import styles from "./editfund.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../styles/libraries.css";
import { useRef, useState } from "react";

const EditFund = ({ handleClose }) => {
  const [value, setValue] = useState("This is comment.");
  const [startDate, setStartDate] = useState(new Date());
  const calenderRef = useRef();
  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };
  return (
    <div
      className={styles.editFundcontainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.editFundCross}>
        Edit Fund Details
        <span className={styles.crossIcon}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </span>
      </div>
      <div className={styles.tableContent}>
        <div className={styles.dateInput}>
          <span className={styles.dateInputLabel}>Date:</span>
          <div className={styles.datePickerContainer}>
            <DatePicker
              wrapperClassName={styles.datePicker}
              popperClassName={styles.datePick}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
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
        <span className={styles.comment}> Comment </span>

        <textarea className={styles.text} value={value}></textarea>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <FilledButton
            title="Add Comment"
            customClass={styles.addCommentButton}
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
export default EditFund;
