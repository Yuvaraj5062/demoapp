import styles from "./loadingScreen.module.scss";

const LoadingScreen = () => {
  return (
    <>
      <div className={styles.dotWrap}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </>
  );
};

export default LoadingScreen;
