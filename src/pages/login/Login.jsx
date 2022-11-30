import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Loader from "../../component/loader/Loader";
import Toast from "../../component/toast/Toast";
import { danger, login } from "../../data/data";
import { loginFormValidators } from "../../formValidators/loginFormValidators";
import useForm from "../../hooks/useForm";
import { setToDefault, userLogin } from "../../redux/features/login/loginSlice";
import AllowAccess from "./allow-access/AllowAccessPopup";
import styles from "./login.module.scss";
const Login = () => {
  const [hasAnyPermission, setHasAnyPermissiion] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, isMobileAuthPending, userInfo } = useSelector(
    (state) => state.login
  );

  const accessControl = userInfo?.accessControl;

  const handleLogin = async (data) => {
    localStorage.setItem("role", "Super User");
    dispatch(setToDefault());

    dispatch(userLogin({ userName: data.accNO, password: data.password }))
      .then((e) => {
        if (e.type === "Login/login/rejected") {
          navigate("/");
        } else {
          // if (accessControl.length === 0) {
          //   setHasAnyPermissiion(false);
          //   return;
          // }

          navigate("/disclaimer");
        }
      })
      .catch((e) => console.log(e));
  };

  const handleSend = () => {
    navigate("/forgot-password", { state: { path: "/" } });
  };

  const { errors, handleChange, handleSubmit, data } = useForm({
    validations: loginFormValidators,

    onSubmit: () => handleLogin(data),
  });

  useEffect(() => {
    userInfo?.userDetail?.id && navigate("/dashboard");
  }, [navigate]);

  if (!error && isMobileAuthPending) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.loginContainer}>
          <AllowAccess />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      {/* {!hasAnyPermission && (
        <Toast
          item={danger}
          message="You dont have any permission, Ask administrator for permissions"
        />
      )} */}

      {error ? <Toast item={danger} message={error} /> : null}

      <div className={styles.loginContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
        <form className={styles.userInput} onSubmit={handleSubmit}>
          <label className={styles.userLabel}>Account Number</label>
          <input
            type="text"
            className={styles.userInputField}
            placeholder="Enter account number here"
            onChange={handleChange("accNO")}
          />
          <span style={{ color: "red" }}>{errors && errors.accNO}</span>
          <label className={styles.passwordLabel}>Password</label>
          <input
            type="password"
            className={styles.userPasswordField}
            placeholder="Enter password here"
            onChange={handleChange("password")}
          />
          <span style={{ color: "red" }}>{errors && errors.password}</span>
          {/* {error && (
            <div
              style={{
                color: "red",
                fontSize: "14px",
                fontWeight: "400",
                marginTop: "20px",
              }}
            >
              {error}
            </div>
          )} */}

          <button type="submit" className={styles.submitButton}>
            {isLoading ? <Loader /> : "Submit"}
          </button>
        </form>
        <p className={styles.forgotPassword} onClick={() => handleSend()}>
          Forgot password?
        </p>
      </div>
      <p className={styles.disclaimerText}>{login}</p>
    </div>
  );
};
export default Login;
