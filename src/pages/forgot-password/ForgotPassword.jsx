import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import FilledButton from "../../component/filled-button/FilledButton";
import Search from "../../component/search/Search";
import TextField from "../../component/text-field/TextField";
import { forgotPassword } from "../../redux/features/login/loginSlice";
import styles from "./forgotpassword.module.scss";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serach = useLocation();
  const [Email, setEmail] = useState({ email: "", emailError: "" });
  const { msg } = useSelector((state) => state.login);

  const handlePassword = async (data) => {
    const isEmailValid = String(Email.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!isEmailValid) {
      setEmail((ov) => ({ ...ov, emailError: "Please Enter Valid Email" }));
    }

    isEmailValid &&
      Email.email &&
      dispatch(forgotPassword({ email: Email.email })).then((e) => {
        setEmail({ email: "", emailError: "" });
      });
  };

  const sendToLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    if (serach.state?.path !== "/") {
      navigate("/dashboard");
    }
  }, [Search]);

  return (
    <>
      <div className={styles.mainContainer}>
        {!msg ? (
          <div className={styles.forgotPasswordContainer}>
            <img src={logo} className={styles.logo} />
            <div className={styles.formContainer}>
              <span className={styles.passwordText}>Forgot Password?</span>
              <span className={styles.emailText}>
                Enter the email associated with your account and we'll send an
                email with instructions to reset your password.
              </span>
              <TextField
                customClassContainer={styles.textfieldContainer}
                customClass={styles.labelText}
                customClassInput={styles.inputType}
                type="text"
                label="Email ID"
                placeholder="Enter your email here"
                value={Email.email}
                error={Email.emailError}
                handleChange={(e) =>
                  setEmail({ ...Email, email: e.target.value })
                }
              />

              <FilledButton
                title="Send"
                customClass={styles.sendButton}
                handleClick={() => handlePassword()}
              />
              <div className={styles.backtoContainer}>
                <p className={styles.backText}>back to</p>
                <p className={styles.loginText} onClick={() => sendToLogin()}>
                  {" "}
                  Login
                </p>
              </div>
            </div>
          </div>
        ) : (
          <span className={styles.emailMessage}>{msg && msg}</span>
        )}
      </div>
    </>
  );
};
export default ForgotPassword;
