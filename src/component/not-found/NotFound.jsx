import { useNavigate } from "react-router-dom";
import styles from "./notfound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/logout");
  };

  return (
    <div className={styles.notFoundContaiener}>
      Not permitted
      <button
        onClick={() => {
          handleGoBack();
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
