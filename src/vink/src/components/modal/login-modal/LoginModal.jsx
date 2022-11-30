import React, { useState } from "react";
import useForm from "../../../hooks/useForm";
import Button from "../../button/Button";
import { Popup } from "../../popup/Popup";
import TextField from "../../text-field/TextField";
import Close from "../close/Close";
import RegisterModal from "../register-modal/RegisterModal";
import styles from "./loginModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, popup, register } from "../../../redux/popup/popupSlice";
import { redirectTo } from "../../../helpers/redirectToSavedSteps";
import {
  cancelError,
  loginRequest,
} from "../../../redux/auth/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { PasswordIcon, ShowPasswordIcon } from "../../svg-components";
import { color } from "../../../constants/color";

export const LoginModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    dispatch(popup("CapturePhotoScreen"));
  };

  const handleLogin = (data) => {
    dispatch(loginRequest(data)).then((e) => {
      if (e.type === "auth/loginRequest/fulfilled") {
        navigate("/comingsoon");
      }
    });
  };

  const handleShow = () => {
    setShow(!show);
    setShowPassword(!showPassword);
  };

  const { handleChange, handleSubmit, data, errors } = useForm({
    // validations: {
    //   username: {
    //     required: {
    //       value: true,
    //       message: "Please enter username",
    //     },
    //     custom: {
    //       isValid: (value) =>
    //         value && value.length >= 3 && value.length <= 25 ? true : false,
    //       message: "Username must be between 3 to 25 characters",
    //     },
    //   },
    //   password: {
    //     required: {
    //       value: true,
    //       message: "Please enter password",
    //     },
    //     custom: {
    //       isValid: (value) =>
    //         value && value.length >= 8 && value.length <= 16 ? true : false,
    //       message: "password must be between 8 to 16 characters",
    //     },
    //   },
    // },
    onSubmit: () => handleLogin(data),
  });

  return (
    <>
      <div
        className={styles.loginContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Close
          handleClose={() => {
            dispatch(cancelError());
            dispatch(closePopup({ step: null }));
          }}
        />
        <form className={styles.fieldContainer} onSubmit={handleSubmit}>
          <p className={styles.loginText}>Login</p>
          <TextField
            placeholder="Username"
            value={data.username?.trim()}
            handleChange={handleChange("username")}
            error={errors.username}
          />
          {/* <div className={styles.passwordContainer}> */}
          <TextField
            placeholder="Password"
            type={show ? "text" : "password"}
            icon
            passwordIcon={
              !showPassword ? (
                <PasswordIcon
                  fillColor={color.grey}
                  customClass={styles.customClass}
                  handleShow={handleShow}
                />
              ) : (
                <ShowPasswordIcon
                  fillColor={color.grey}
                  customClass={styles.customClass}
                  handleShow={handleShow}
                />
              )
            }
            customClass={styles.passwordContainer}
            value={data.password?.trim()}
            handleChange={handleChange("password")}
            error={errors.password}
            handleShow={() => handleShow()}
          />
          <p className={styles.errorText}>{error && error}</p>

          <p className={styles.forgetText}>
            Forgot your{" "}
            <span
              className={styles.passwordText}
            // onClick={() => {
            //   dispatch(popup("ForgetPasswordScreen"));
            // }}
            >
              &nbsp;password?
            </span>
          </p>
          <Button
            title="Let's Continue"
            disabled={!data.username || !data.password}
            type="submit"
            customClassForIcon={styles.continueButtonIcon}
            customClass={styles.continueBtn}
            customClassForText={styles.btnText}
          />

          <p className={styles.accountText}>
            Don't have an Account?{" "}
            <span
              className={styles.registerText}
              onClick={() => handleRegister()}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </>
  );
};
