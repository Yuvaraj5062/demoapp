import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelError,
  closeSuccess,
  verifyOTP,
  resendOTP,
} from "../../../redux/auth/register/registerSlice";
import { closePopup, popup } from "../../../redux/popup/popupSlice";
import Button from "../../button/Button";
import LoadingScreen from "../../loading-screen/LoadingScreen";
import StatusModal from "../../status-modal/StatusModal";
import Timer from "../../timer/Timer";
import Close from "../close/Close";
import OtpInput from "./otp-input/OtpInput";
import styles from "./otpVerificationModal.module.scss";

const OtpVerificationModal = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState([]);
  const { userInfo, error, loading, status, otpAttempt } = useSelector(
    (state) => state.register
  );
  const [counter, setCounter] = useState(userInfo?.data?.otpExpiryMinutes * 60);
  const [resendCount, setResetCount] = useState(0);
  const [showResendButton, setShowResendButton] = useState(true);

  const handleClick = () => {
    otp.length === 4 &&
      dispatch(
        verifyOTP({ userId: userInfo?.data?.userId, otp: otp.join("") })
      );
  };

  const handleResend = () => {
    // setCounter(10);
    setShowResendButton(false);
    setResetCount(resendCount + 1);
    setCounter(userInfo?.data?.otpExpiryMinutes * 60);
    dispatch(resendOTP({ userId: userInfo?.data?.userId }));
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    setCounter(userInfo?.data?.otpExpiryMinutes * 60);
  }, [userInfo?.data?.otpExpiryMinutes]);

  /* 
  allow user to resend otp only 3 time in one open window 
  */
  useEffect(() => {
    setTimeout(() => {
      if (resendCount < 3) {
        setShowResendButton(true);
      }
    }, 3 * 60 * 1000);
  }, [resendCount]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : status ? (
        <StatusModal
          status="Successful"
          statusDetail={status}
          buttonText="OK"
          action={closeSuccess()}
        />
      ) : error ? (
        <StatusModal
          status="Error!"
          statusDetail={error}
          buttonText="Retry"
          action={cancelError()}
        />
      ) : (
        <div className={styles.verificationContainer}>
          {/* <Close handleClose={() => dispatch(closePopup({ step: null }))} /> */}
          <form>
            <div className={styles.fieldContainer}>
              <p className={styles.verificationText}>Phone Verification</p>
              <p className={styles.enterCode}>Enter Verification Code</p>
            </div>
            <div className={styles.otpTextContainer}>
              <p className={styles.otpText}>OTP Verification</p>
              <p className={styles.codeText}>
                An authentication code has been sent to
              </p>
              <p className={styles.phoneNumber}>
                ({userInfo?.data?.dialCode}) {userInfo?.data?.mobile}
              </p>
            </div>
            <div className={styles.otpContainer}>
              <OtpInput otp={otp} setOtp={setOtp} />
            </div>
            {resendCount < 3 && showResendButton && (
              <p className={styles.resendCode}>
                I didn't receive code.{" "}
                <span
                  className={styles.resendCodeText}
                  onClick={() => handleResend()}
                  // className={counter>0 ? styles.resendCodeTextDeactive  : styles.resendCodeText}
                  // onClick={() => counter<=0 ? handleResend(): {}}
                >
                  Resend Code
                </span>
              </p>
            )}
            {counter > 0 && (
              <p className={styles.attempt}>
                {otpAttempt} / 3 attempts -
                {/* <span className={styles.timeText}>{counter} Sec left</span> */}
                <Timer time={counter} />
              </p>
            )}

            <p className={styles.warningText}>
              Warning{" "}
              <span className={styles.warning}>
                : After{" "}
                <span className={styles.consecutive}>3 consecutive</span>{" "}
                unsuccessful login attempts, your account will be locked.
              </span>
            </p>

            {/*
        <p className={styles.accountLock}>
          Your Account has been locked due to 3 failed attempts. It will be
          unlocked after 24 hours.
        </p> */}
            <Button
              handleClick={handleClick}
              title="Verify Now"
              customClass={styles.continueBtn}
              customClassForText={styles.btnText}
            />
            <p className={styles.alreadyHaveAcc}>
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

export default OtpVerificationModal;
