import styles from "./newbenchmark.module.scss";
import { Cross } from "../../../../component/svg-components";
import FilledButton from "../../../../component/filled-button/FilledButton";
import TextField from "../../../../component/text-field/TextField";

const NewBenchmark = ({ handleClose }) => {
  return (
    <div
      className={styles.modalMainContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.modalTitle}>
        Add New Benchmark
        <span className={styles.crossIcon}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </span>
      </div>
      <div className={styles.tableContent}>
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Benchmark Name"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Date"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
        <TextField
          customClassContainer={styles.textfieldContainer}
          label="Value"
          customClass={styles.labelName}
          customClassInput={styles.datainputfield}
        />
      </div>
      <div className={styles.modalFooter}>
        <FilledButton
          title="Add"
          customClass={styles.addBenchmarkButton}
          handleClick={() => {}}
        />
      </div>
    </div>
  );
};

export default NewBenchmark;
