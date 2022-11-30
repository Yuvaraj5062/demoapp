import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./forgetPasswordModal.module.scss";
import Close from "../close/Close";
import { closePopup, popup } from "../../../redux/popup/popupSlice";
import TextField from "../../text-field/TextField";
import useForm from "../../../hooks/useForm";
import Button from "../../button/Button";
import {
  cancelError,
  closeSuccess,
  sendForgetPasswordLink,
} from "../../../redux/auth/forget-password/forgetPasswordSlice";
import StatusModal from "../../status-modal/StatusModal";
import LoadingScreen from "../../loading-screen/LoadingScreen";

export const ForgetPasswordModal = () => {
  const dispatch = useDispatch();
  const { error, loading, status } = useSelector(
    (state) => state.forgetPassword
  );
  const handelForgotPassword = (data) => {
    //api call

    dispatch(sendForgetPasswordLink(data));
  };

  const { handleChange, handleSubmit, data, errors } = useForm({
    // intialDisable: { subCategoryId: true, userAccountTypeId: true },
    validations: {
      emailId: {
        required: {
          value: true,
          message: "Please enter your email address",
        },
        pattern: {
          value: /^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/,
          message: "Please enter valid email address",
        },
      },
    },
    onSubmit: () => handelForgotPassword(data),
  });

  const handleCloseError = () => {
    closeSuccess();
    dispatch(popup("LoginScreen"));
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : status ? (
        <StatusModal
          status="Successful"
          statusDetail={status}
          buttonText="OK"
          action={() => handleCloseError()}
        />
      ) : error ? (
        <StatusModal
          status="Error!"
          statusDetail={error}
          buttonText="Retry"
          action={cancelError()}
        />
      ) : (
        <div
          className={styles.forgotPassContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Close handleClose={() => dispatch(closePopup({ step: null }))} />
          <form className={styles.fieldContainer} onSubmit={handleSubmit}>
            <p className={styles.forgotText}>Forgot Password?</p>
            <p className={styles.aboutText}>
              Enter the email associated with your account and we'll send an
              email with instructions to reset your password.
            </p>
            <TextField
              type="text"
              placeholder="Enter your Email"
              value={data.emailId?.trim()}
              customClass={styles.inputField1}
              handleChange={handleChange("emailId")}
              error={errors.emailId}
            />

            {/* <p className={styles.errorText}>{error && error}</p> */}

            <Button
              title="Send"
              type="submit"
              customClassForIcon={styles.continueButtonIcon}
              customClass={styles.continueBtn}
              customClassForText={styles.btnText}
            />

            <p className={styles.accountText}>
              Back to
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
