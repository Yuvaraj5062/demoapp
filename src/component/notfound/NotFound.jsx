import styles from "./notfound.module.scss";
const NoRecordFound = ({ customText, customContainer }) => {
  return (
    <div className={[styles.norecordFoundContainer, customContainer].join(" ")}>
      <span className={[styles.norecordFoundText, customText].join(" ")}>
        No Records Found
      </span>
    </div>
  );
};
export default NoRecordFound;
