import styles from "./modal.module.scss";
import FilledButton from "../../component/filled-button/FilledButton";
import { Cross } from "../svg-components";
import Divider from "../divider/Divider";
import { useNavigate } from "react-router-dom";
const Modal = ({ handleClose }) => {
  const userBirthdayName = [
    "John Snow Turns 45 Today",
    "John Snow Turns 45 Today",
    "John Snow Turns 45 Today",
  ];
  const zoomMeetingName = [
    "Zoom Meeting - with Trade Station",
    "Zoom Meeting - with Trade Station",
    "Zoom Meeting - with Trade Station",
    "Zoom Meeting - with Trade Station",
  ];
  const birthDataData = [
    {
      born: "Born",
      date: "21 September 1971",
    },
    {
      born: "Born",
      date: "21 September 1971",
    },
    {
      born: "Born",
      date: "21 September 1971",
    },
  ];
  const meetingData = [
    "14h00 - 24 September 2022",
    "14h00 - 24 September 2022",
    "14h00 - 24 September 2022",
    "14h00 - 24 September 2022",
  ];
  let navigate = useNavigate();
  const navigateToReports = () => {
    handleClose();
    navigate("reports");
  };
  return (
    <div className={styles.landingPage} onClick={() => handleClose()}>
      <div
        className={styles.modalContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.modalTitle}>
          Birthday Report and daily events / Task
          <span className={styles.crossIcon}>
            <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
          </span>
          {/* </p> */}
        </div>
        <div className={styles.birthdayReport}>
          <div className={styles.birthdayToday}>
            <div className={styles.birthdayTodayTitle}>Birthdays Today :</div>
            <div className={styles.userBirthdayToday}>
              {userBirthdayName.map((item, index) => {
                return (
                  <p key={index} className={styles.userBirthdayTodayText}>
                    {item}
                  </p>
                );
              })}
            </div>
            <div className={styles.userBirthDate}>
              {birthDataData.map((item, index) => {
                return (
                  <p className={styles.birthDate} key={index}>
                    <span className={styles.userBornText}>{item.born}: </span>
                    <span className={styles.userBirthDateText}>
                      {item.date}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
          <Divider />
          <div className={styles.birthdayToday}>
            <div className={styles.birthdayTodayTitle}>
              Upcoming Birthdays This week :
            </div>
            <div className={styles.userBirthdayToday}>
              {userBirthdayName.map((item, index) => {
                return (
                  <p key={index} className={styles.userBirthdayTodayText}>
                    {item}
                  </p>
                );
              })}
            </div>
            <div className={styles.userBirthDate}>
              {birthDataData.map((item, index) => {
                return (
                  <p className={styles.birthDate} key={index}>
                    <span className={styles.userBornText}>{item.born}: </span>
                    <span className={styles.userBirthDateText}>
                      {item.date}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
          <Divider />
          <div className={styles.taskMeeting}>
            <div className={styles.birthdayTodayTitle}>Task/Meetings :</div>
            <div className={styles.userBirthdayToday}>
              {zoomMeetingName.map((item, index) => {
                return (
                  <p key={index} className={styles.userBirthdayTodayText1}>
                    {item}
                  </p>
                );
              })}
            </div>
            <div className={styles.userBirthDate}>
              {meetingData.map((item, index) => {
                return (
                  <p className={styles.birthDate} key={index}>
                    <span className={styles.userBirthDateText}>{item}</span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <FilledButton
            title="Go to this Report"
            handleClick={navigateToReports}
            customClass={styles.goToReportButton}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
