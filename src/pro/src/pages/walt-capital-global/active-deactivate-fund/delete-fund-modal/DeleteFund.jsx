import FilledButton from "../../../../component/filled-button/FilledButton";
import { Cross } from "../../../../component/svg-components";
import styles from "./deletefund.module.scss";

const DeleteFund = ({ handleClose }) => {
  return (
    <div
      className={styles.mainContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.crossContainer}>
        {/* <div className={styles.cross}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </div> */}
        <div className={styles.deleteHeading}>
          <p className={styles.paragraph}>
            Are you sure you want to delete this fund? And all its pricing data
            and history You have an option to deactivate the funds. This option
            still keeps all the data but it will not show in the funds list
          </p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <FilledButton
          title="You need a Executive level password to action DELETE FUND!"
          customClass={styles.deleteButton}
          handleClick={() => {}}
        />
        <FilledButton
          title="Proceed to delete"
          customClass={styles.okButton}
          // handleClick={() => {}}
          handleClick={() => handleClose()}
        />
      </div>
    </div>
  );
};
export default DeleteFund;
