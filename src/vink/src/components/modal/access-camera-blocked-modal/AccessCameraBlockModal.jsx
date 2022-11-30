import styles from "./accessCameraBlockModal.module.scss";
import Close from "../close/Close";
import Button from "../../button/Button";
import { useState } from "react";
import { CheckIcon, UncheckIcon } from "../../svg-components";
import { color } from "../../../constants/color";
import { useDispatch } from "react-redux";
import { popup } from "../../../redux/popup/popupSlice";

const AccessCameraBlockModal = () => {
  const dispatch = useDispatch();
  const [check1, setcheck1] = useState(false);
  const handleChange = () => {
    setcheck1(!check1);
  };
  return (
    <>
      <div className={styles.accessCameraBlockModalContainer}>
        {/* <Close /> */}
        <form className={styles.fieldContainer}>
          <p className={styles.signupText}>Register</p>
          <p className={styles.accessCameraBlock}>Access to camera blocked</p>
          <p className={styles.accessBlockedText}>
            Your Mobile camera access has been blocked, don't worry you can use
            the options below to apply.
          </p>
          <p className={styles.mobileCamera}>
            {/* <input type="radio" className={styles.input} checked /> */}
            <span
            // onClick={() => {
            //   handleChange();
            // }}
            >
              <UncheckIcon fillColor={color.grey1} />
              {/* {check ? <UncheckIcon fillColor={color.grey1} /> : <CheckIcon />} */}
            </span>
            <span className={styles.switchToMobile}>
              Switch to mobile: With your mobile device's camera, you can start
              a new application via your mobile browser then use the selfie mode
              to open your account faster without uploading multiple documents.
            </span>
          </p>
          <p className={styles.withoutVerification}>
            {/* <input type="checkbox" /> */}
            <span
              onClick={() => {
                handleChange();
              }}
            >
              <CheckIcon />
            </span>
            <span className={styles.uploadDocumentText}>
              Continue without facial verification: You will have to upload your
              documents so we can verify them - this process will take a couple
              of days to complete.
            </span>
          </p>
          <Button
            title="Let’s Continue"
            customClass={styles.btnText}
            handleClick={() => {
              dispatch(popup("UploadProfileScreen"));
            }}
          />
          <p className={styles.haveAccount}>
            Already have an account?{" "}
            <span
              className={styles.signIn}
              onClick={() => dispatch(popup("LoginScreen"))}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default AccessCameraBlockModal;
