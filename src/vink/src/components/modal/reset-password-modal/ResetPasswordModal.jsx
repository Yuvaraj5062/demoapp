import styles from "./resetPasswordModal.module.scss";
import { closePopup, popup } from "../../../redux/popup/popupSlice";
import Button from "../../button/Button";
import TextField from "../../text-field/TextField";
import Close from "../close/Close";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginRequest } from "../../../redux/auth/login/loginSlice";
import useForm from "../../../hooks/useForm";
import { PasswordIcon, ShowPasswordIcon } from "../../svg-components";
import { color } from "../../../constants/color";
import { resetPassword } from "../../../redux/auth/forget-password/forgetPasswordCrud";
import {
  cancelError,
  closeSuccess,
  sendResetPassword,
} from "../../../redux/auth/forget-password/forgetPasswordSlice";
import LoadingScreen from "../../loading-screen/LoadingScreen";
import StatusModal from "../../status-modal/StatusModal";

const ResetPasswordModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(false);
  const [validate, setValidate] = useState("");
  const { error, loading, status } = useSelector(
    (state) => state.forgetPassword
  );

  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  const handleResetPassword = (data) => {
    setValidate(null);
    let isOk = true;
    if (data && !data.confirmPassword) {
      setValidate("Please enter confirm password");
      isOk = false;
    }
    if (data.newPassword !== data.confirmPassword) {
      setValidate("New Password and Confirm Password does not match");
      isOk = false;
    }
    // const queryParams = new URLSearchParams(window.location.search);
    const userId = query.get("q");
    let body = {
      userId: userId,
      newPassword: data.newPassword,
    };
    isOk && dispatch(sendResetPassword(body));
  };

  const handleNewPassword = () => {
    setNewPassword(!newPassword);
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
    setConfirmPasswordIcon(!confirmPasswordIcon);
  };

  const handleClose = () => {
    dispatch(closePopup({ step: null }));
    navigate("/");
  };

  const { handleChange, handleSubmit, data, errors } = useForm({
    // validations: {
    //   newPassword: {
    //     required: {
    //       value: true,
    //       message: "Please enter new password",
    //     },
    //     custom: {
    //       isValid: (value) =>
    //         value && value.length >= 8 && value.length <= 16 ? true : false,
    //       message: "password must be between 8 to 16 characters",
    //     },
    //   },
    //   confirmPassword: {
    //     required: {
    //       value: true,
    //       message: "Please enter confirm password",
    //     },
    //     custom: {
    //       isValid: (value) =>
    //         value && value.length >= 8 && value.length <= 16 ? true : false,
    //       message: "password must be between 8 to 16 characters",
    //     },
    //   },
    // },
    onSubmit: () => handleResetPassword(data),
  });

  const handleCloseError = () => {
    closeSuccess();
    dispatch(popup("LoginScreen"));
    navigate("/");
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
          className={styles.resetPasswordContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Close handleClose={() => handleClose()} />
          <form className={styles.fieldContainer} onSubmit={handleSubmit}>
            <p className={styles.setPassword}>Set new password</p>
            <p className={styles.passwordInfo}>
              Your new password must be different to previously used passwords.
            </p>
            <TextField
              placeholder="New Password"
              type={newPassword ? "text" : "password"}
              icon
              passwordIcon={
                !showPassword ? (
                  <PasswordIcon
                    fillColor={color.grey}
                    customClass={styles.customClass}
                    handleShow={handleNewPassword}
                  />
                ) : (
                  <ShowPasswordIcon
                    fillColor={color.grey}
                    customClass={styles.customClass}
                    handleShow={handleNewPassword}
                  />
                )
              }
              error={errors.newPassword}
              customClass={styles.newPassword}
              value={data.newPassword?.trim()}
              handleShow={() => handleNewPassword()}
              handleChange={handleChange("newPassword")}
            />
            <TextField
              placeholder="Confirm Password"
              type={confirmPassword ? "text" : "password"}
              icon
              passwordIcon={
                !confirmPasswordIcon ? (
                  <PasswordIcon
                    fillColor={color.grey}
                    customClass={styles.customClass}
                    handleShow={handleConfirmPassword}
                  />
                ) : (
                  <ShowPasswordIcon
                    fillColor={color.grey}
                    customClass={styles.customClass}
                    handleShow={handleConfirmPassword}
                  />
                )
              }
              error={errors.confirmPassword || validate}
              customClass={styles.confirmPassword}
              value={data.password?.trim()}
              customClassForError={styles.customClassForError}
              handleShow={() => handleConfirmPassword()}
              handleChange={handleChange("confirmPassword")}
            />
            <Button
              title="Reset Password"
              type="submit"
              customClassForIcon={styles.resetPasswordButtonIcon}
              customClass={styles.resetPasswordBtn}
              customClassForText={styles.btnText}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPasswordModal;
