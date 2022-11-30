import React from "react";
import styles from "./meetingreminder.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import { Calender, Cross, Time } from "../../../component/svg-components";
import TextField from "../../../component/text-field/TextField";
const MeetingReminder = ({ handleClose }) => {
  const mettingData = [
    {
      title: "Meeting, Notification, Reminder, Date:",
    },
    {
      title: "Meeting, Notification, Reminder, Time:",
    },
    {
      title: "Venue:",
    },
    {
      title: "Attendees:",
    },
    {
      title: "Client Action (to do list):",
    },
    {
      title: "Walt Capital Actions (to do list): ",
    },
    {
      title: "Discussion Items and Notes",
    },
  ];
  return (
    <div
      className={styles.modalMainContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.modalTitle}>
        Add a note for a new notification, meeting or reminder
        <span className={styles.crossIcon}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </span>
      </div>

      <div className={styles.table}>
        {mettingData.map((item, index) => {
          return (
            <>
              <TextField
                key={index}
                customClassContainer={styles.textFieldContainer}
                label={item.title}
                customClass={styles.title}
                customClassInput={
                  (index === 0 && styles.customInput1) ||
                  (index === 1 && styles.customInput1) ||
                  (index === 2 && styles.customInput1) ||
                  (index >= 3 && styles.customInput2)
                }
                icon={
                  (index === 0 && <Calender fillColor="#ffffff" />) ||
                  (index === 1 && <Time fillColor="#ffffff" />)
                }
                customClassIcon={index <= 1 && styles.icon}
                customClassInputIcon={styles.customClassInputIcon}
              />
            </>
          );
        })}
      </div>

      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <FilledButton title="Save" customClass={styles.priceButton} />
        </div>
      </div>
    </div>
  );
};

export default MeetingReminder;
