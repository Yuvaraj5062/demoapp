import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import FilledButton from "../../component/filled-button/FilledButton";
import { ViewHideIcon, ViewIcon } from "../../component/svg-components";
import TextField from "../../component/text-field/TextField";
import { loginFormValidators } from "../../formValidators/loginFormValidators";
import { resetFormValidations } from "../../formValidators/resetFormValidation";
import useForm from "../../hooks/useForm";
import {
  passwordLinkCheck,
  resetPassword,
} from "../../redux/features/login/loginSlice";
import styles from "./resetpassword.module.scss";

const ResetPassword = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const dispatch = useDispatch();
  const { msg, isPasswordResetDone } = useSelector((state) => state.login);
  const [showPassOne, setShowPassOne] = useState(false);
  const [showPassTwo, setShowPassTwo] = useState(false);
  const [error, setError] = useState("");

  const { errors, handleChange, handleSubmit, data } = useForm({
    validations: resetFormValidations,
    onSubmit: () => handlePasswordReset(data),
  });

  const handleClick = (item) => {
    if (item.type === "one") {
      setShowPassOne(!showPassOne);
    }
    if (item.type === "two") {
      setShowPassTwo(!showPassTwo);
    }
  };

  const handleMouseLeave = () => {
    setShowPassOne(false);
    setShowPassTwo(false);
  };

  const handlePasswordReset = () => {
    if (data.passOne === data.passTwo) {
      const payload = { userId: query.get("q"), newPassword: data.passTwo };
      dispatch(resetPassword(payload)).then(() => setError(""));
    } else {
      setError("Passwords does not match");
    }
  };

  useEffect(() => {
    const payload = {
      id: query.get("q"),
      link: window.location.href,
      securityCode: query.get("d"),
    };
    dispatch(passwordLinkCheck(payload));
  }, []);

  if (isPasswordResetDone) {
    return <div className={styles.doneMessage}>{isPasswordResetDone}</div>;
  }

  return (
    <>
      {msg ? (
        <div className={styles.mainContainer}>
          <div className={styles.resetPasswordContainer}>
            <img src={logo} className={styles.logo} />
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <span className={styles.passwordText}>Set new password</span>
              <span className={styles.emailText}>
                Your new password must be different to previously used
                passwords.
              </span>
              <div className={styles.container}>
                <div className={styles.textfieldContainer}>
                  <label className={styles.labelText}> New Password</label>
                  <input
                    type={showPassOne ? "text" : "password"}
                    onChange={handleChange("passOne")}
                    placeholder="Enter New Password here"
                    className={
                      errors && errors.passOne
                        ? styles.inputType1
                        : styles.inputType
                    }
                  />
                  <span className={styles.error}>
                    {errors && errors.passOne}
                  </span>
                </div>
                <ViewHideIcon
                  customClass={styles.viewIcon}
                  handleClick={() => handleClick({ type: "one" })}
                  onMouseLeave={() => handleMouseLeave()}
                />
              </div>

              <div className={styles.container}>
                <div className={styles.textfieldContainer}>
                  <label className={styles.labelText}>Confirm Password </label>
                  <input
                    type={showPassTwo ? "text" : "password"}
                    onChange={handleChange("passTwo")}
                    placeholder="Enter New Password here"
                    className={
                      errors && errors.passTwo
                        ? styles.inputType1
                        : styles.inputType
                    }
                  />
                  <span className={styles.error}>
                    {errors && errors.passTwo}
                  </span>
                </div>
                <ViewHideIcon
                  customClass={styles.viewIcon}
                  handleClick={() => handleClick({ type: "two" })}
                  onMouseLeave={() => handleMouseLeave()}
                />
              </div>

              {error && <span className={styles.error}>{error}</span>}

              {/* <FilledButton
                title="Reset Password"
                handleClick={handlePasswordReset}
                customClass={styles.sendButton}
              /> */}
              <button type="submit" className={styles.sendButton}>
                Reset Password
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.linkExpiredError}>Link expired</div>
      )}
    </>
  );
};
export default ResetPassword;
