import styles from "./signupModal.module.scss";
import Close from "../close/Close";
import Button from "../../button/Button";
import congratulationImage from "../../../assests/images/congratulationImage.png";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, popup } from "../../../redux/popup/popupSlice";
import axios from "axios";
import { encrypt } from "../../../helpers/cyptoAES";
import { useEffect } from "react";
import { baseURL } from "../../../config/baseUrl";

const SignupModal = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.register);

  const handelPopUpClose = () => {
    dispatch(popup("LoginScreen"));
  };

  useEffect(() => {
    axios.post(`${baseURL}/User/ActivateUser`, {
      data: encrypt({
        userId: userInfo?.data?.userId,
        updatedBy: userInfo?.data?.userId,
      }),
    });
  }, []);

  const handleClose = () => {
    dispatch(closePopup());
  };

  return (
    <>
      <div className={styles.signupContainer}>
        {/* <Close handleClose={handleClose} /> */}
        <form className={styles.fieldContainer}>
          <p className={styles.signUp}>Register</p>
          <p className={styles.congratulationText}>Congratulations</p>
          <p className={styles.welcome}>
            Welcome to VMS,{" "}
            <span className={styles.nameText}>{userInfo?.data?.firstName}</span>
          </p>
          <p className={styles.notCloseWindow}>
            This could take up to 2 minutes. Please do not close the window.
          </p>
          <img
            src={congratulationImage}
            alt="congratulations_text"
            className={styles.imageStyle}
          />
          <Button
            title="Ok"
            customClass={styles.btnStyle}
            customClassForText={styles.okText}
            handleClick={handelPopUpClose}
          />
          <p className={styles.accText}>
            Already have an account?
            <span
              className={styles.signIn}
              onClick={() => {
                handelPopUpClose();
              }}
            >
              {" "}
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignupModal;
