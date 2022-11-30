import styles from "./capturePhotoModal.module.scss";
import Button from "../../button/Button";
import { useEffect } from "react";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, popup } from "../../../redux/popup/popupSlice";
import {
  cancelError,
  uploadUserImage,
} from "../../../redux/auth/register/userImageSlice";
import { dataURLtoFile } from "../../../helpers/datUrlToFiles";
import LoadingScreen from "../../loading-screen/LoadingScreen";
import StatusModal from "../../status-modal/StatusModal";
import { CameraIcon } from "../../svg-components";

const CapturePhotoModal = () => {
const [hasCamera,setHasCamera]=useState()
 
useEffect(() => {
   function detectWebcam(callback) {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) return callback(false);
    md.enumerateDevices().then(devices => {
      callback(devices.some(device => 'videoinput' === device.kind));
    })

  }
  
  detectWebcam(function(hasWebcam) {
    setHasCamera(hasWebcam)
  })
  }, [])
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrcs] = useState("");
  const { userInfo } = useSelector((state) => state.register);
  const { error, loading, status } = useSelector((state) => state.userImage);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrcs(imageSrc);
  }, [webcamRef, setImgSrcs]);

  const uploadPicture = () => {
    const file = dataURLtoFile(imgSrc);
    const fromData = new FormData();
    fromData.append("UserId", userInfo?.data?.userId);
    fromData.append("Files", file);
    userInfo?.data?.userId && file && dispatch(uploadUserImage(fromData));
  };

  const handelRetake = () => {
    setImgSrcs("");
  };

  const handleContinue = () => {
    dispatch(uploadPicture());
    //
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <StatusModal
          status="Error!"
          statusDetail={error}
          buttonText="Retry"
          action={cancelError()}
        />
      ) : (
        <div className={styles.capturePhotoContainer}>
          {/* <Close handleClose={() => dispatch(closePopup({ step: null }))} /> */}
          <form className={styles.fieldContainer}>
            <p className={styles.register}>Register</p>
            <p className={styles.permissionText}>
              Permission to access your camera needed
            </p>
            <p className={styles.deviceCamera}>
              You can complete your application quickly and easily using your
              device's camera for facial verification.
            </p>
          
            <div className={styles.pictureContainer}>
            {hasCamera?
              <>
              {!imgSrc ? (
                <>
                  {
                    <Webcam
                      className={styles.videoContainer}
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat={"image/jpeg"}
                      screenshotQuality={0.92}
                    />
                  }
                </>
              ) : (
                <img src={imgSrc} />
              )}
              </>
               :<div className={styles.defaultCam}>
                <CameraIcon /></div>}
            </div>
           
            <div className={styles.btnContainer}>
              {!imgSrc ? (
                <>
                  <Button
                    handleClick={capture}
                    title="Take Picture"
                    customClass={styles.takePicBtn}
                    customClassForText={styles.takePicText}
                  />

                  <Button
                    title="Back"
                    handleClick={() => {
                      dispatch(popup("CameraAccessScreen"));
                    }}
                    customClass={styles.retakeBtn}
                    customClassForText={styles.retakeText}
                  />
                </>
              ) : (
                <>
                  <Button
                    title="Retake"
                    handleClick={handelRetake}
                    customClass={styles.retakeBtn}
                    customClassForText={styles.retakeText}
                  />
                  <Button
                    handleClick={handleContinue}
                    title="Let’s Continue"
                    customClass={styles.continueBtn}
                    customClassForText={styles.continueText}
                  />
                </>
              )}
              {/* <Button
                handleClick={capture}
                title="Take Picture"
                customClass={styles.retakeBtn}
                customClassForText={styles.retakeText}
              />
              <Button
                title="Retake"
                handleClick={handelRetake}
                customClass={styles.retakeBtn}
                customClassForText={styles.retakeText}
              />
              <Button
                handleClick={handleContinue}
                title="Let’s Continue"
                customClass={styles.continueBtn}
                customClassForText={styles.continueText}
              /> */}
            </div>
            <p className={styles.accText}>
              Already have an account?
              <span
                className={styles.signIn}
                onClick={() => dispatch(popup("LoginScreen"))}
              >
                {" "}
                Login
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default CapturePhotoModal;
