import { useEffect, useState } from "react";
import styles from "./toast.module.scss";
import { Cross } from "../../component/svg-components/index";
const Toast = ({ item, message }) => {
  const [list, setList] = useState(item);
  const [toast, setToast] = useState(true);

  useEffect(() => {
    setList(item);
  }, [item, list]);

  const handleToast = () => {
    setToast(!toast);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={toast ? styles.notificationShow : styles.notificationHide}>
      <div className={styles.notification}>
        <div
          className={styles.notificationHeader}
          style={{ backgroundColor: item.backgroundColor }}
        >
          <div className={styles.title}>
            <span className={styles.image}>{item.icon}</span>
            <p className={styles.notificationTitle}>
              {/* {item.title} */}
              {message}
            </p>
          </div>
          <Cross fillColor="#000000" handleClose={() => handleToast()} />
        </div>
      </div>
    </div>
  );
};
export default Toast;
