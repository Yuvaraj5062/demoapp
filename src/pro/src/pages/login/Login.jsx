import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { login } from "../../data/data";
import {useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "test" && password === "test123") {
      localStorage.setItem('token','jwttoken@123daw131')
      localStorage.setItem('role','Super User')
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
        <form className={styles.userInput} onSubmit={handleSubmit}>
          <label className={styles.userLabel}>User Name</label>
          <input
            type="text"
            className={styles.userInputField}
            placeholder="Enter user name here"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className={styles.passwordLabel}>Password</label>
          <input
            type="password"
            className={styles.userPasswordField}
            placeholder="Enter password here"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
        <p className={styles.forgotPassword}>Forgot password?</p>
      </div>
      <p className={styles.disclaimerText}>{login}</p>
    </div>
  );
};
export default Login;
