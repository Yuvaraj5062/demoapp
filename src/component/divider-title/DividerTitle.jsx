import styles from "./dividertitle.module.scss";
const DividerTitle = ({ title }) => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>{title}</span>
      </div>
    </>
  );
};
export default DividerTitle;
