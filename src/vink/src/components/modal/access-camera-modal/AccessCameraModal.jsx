import React from "react";
import Button from "../../button/Button";
import Close from "../close/Close";
import styles from "./accessCameraModal.module.scss";
import cameraAccessImage from "../../../assests/images/cameraAccessImage.png";
import { useDispatch } from "react-redux";
import { closePopup, popup } from "../../../redux/popup/popupSlice";

const AccessCameraModal = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(popup("UploadProfileScreen"));
  };

  const handleClose = () => {
    dispatch(closePopup());
  };

  return (
    <>
      <div className={styles.accessCameraContainer}>
        {/* <Close handleClose={handleClose} /> */}
        <form className={styles.fieldContainer}>
          <p className={styles.signupText}>Register</p>
          <p className={styles.permissionText}>
            Permission to access your camera needed
          </p>
          <p className={styles.verificationText}>
            You can complete your application quickly and easily using your
            device's camera for facial verification.
          </p>
          <div className={styles.imageContainer}>
            <img
              src={cameraAccessImage}
              alt="camera-access"
              className={styles.cameraAccessImage}
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button
              title="Let’s Continue with facial verification"
              customClass={styles.continueBtn}
              customClassForText={styles.continueText}
              handleClick={() => dispatch(popup("CapturePhotoScreen"))}
            />
            <Button
              title="Without facial verification"
              customClass={styles.withoutVerificationBtn}
              customClassForText={styles.withoutVerificationText}
              handleClick={handleClick}
            />
          </div>
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

export default AccessCameraModal;
