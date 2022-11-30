import { useState } from "react";
import { feedbackTabData } from "../../data/data";
import Tab from "../tab/Tab";
import TextFieldV2 from "../text-field/text-fieldV2/TextFieldV2";
// import TextField from '../text-field/TextField';
import styles from "./feedbackus.module.scss";
import captch from "../../assests/images/captch.png";
import audio from "../../assests/images/audio.png";
import Button from "../button/Button";
const Feedback = () => {
  const [FormType, setFormType] = useState("Personal Banking");
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.mainContent}>
          <p className={styles.spotOnText}>Spot on or dropped the ball?</p>
          <p className={styles.giveFeedbackText}>
            You are giving feedback for:
          </p>
          <Tab
            tabData={feedbackTabData}
            setFormType={setFormType}
            FormType={FormType}
          />
        </div>
        <form className={styles.feedbackForm}>
          <div className={styles.sendMsgText}>Send a Message:</div>
          <TextFieldV2
            type="select"
            placeholder="I have a complaint about vink"
            label="Please choose a topic"
            // customClass={styles.inputField1}
            dropDownData={[]}
            // customClass={styles.inputFieldContainer}
          />
          <TextFieldV2
            type="textarea"
            // placeholder="I have a complaint about Absa"
            label="Message"
            // customClass={styles.inputField1}
            dropDownData={[]}
            // customClass={styles.inputFieldContainer}
          />
          <div className={styles.nameSurnameContainer}>
            <TextFieldV2
              type="text"
              // placeholder="I have a complaint about Absa"
              label="Name"
              // customClass={styles.inputField1}
              dropDownData={[]}
              customClass={styles.inputFieldContainerName}
            />
            <TextFieldV2
              type="text"
              // placeholder="I have a complaint about Absa"
              label="Surname"
              // customClass={styles.inputField1}
              dropDownData={[]}
              customClass={styles.inputFieldContainerSurname}
            />
          </div>
          <TextFieldV2
            type="text"
            // placeholder="I have a complaint about Absa"
            label="Email address *"
            // customClass={styles.inputField1}
            dropDownData={[]}
            // customClass={styles.inputFieldContainerSurname}
          />
          <TextFieldV2
            type="text"
            // placeholder="I have a complaint about Absa"
            label="Phone number (optional)"
            // customClass={styles.inputField1}
            dropDownData={[]}
            // customClass={styles.inputFieldContainerSurname}
          />
          <div className={styles.captchaAudioContainer}>
            <img src={captch} alt="" className={styles.captchImage} />
            <img src={audio} alt="" className={styles.audioImage} />
          </div>
          <TextFieldV2
            type="text"
            // placeholder="I have a complaint about Absa"
            label="Capt"
            // customClass={styles.inputField1}
            dropDownData={[]}
            // customClass={styles.inputFieldContainerSurname}
          />
          <Button
            title="Send Message"
            customClass={styles.btnStyle}
            customClassForText={styles.btnText}
          />
        </form>
      </div>
    </>
  );
};
export default Feedback;
