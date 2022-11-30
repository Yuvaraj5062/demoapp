import FilledButton from "../../../component/filled-button/FilledButton";
import Rating from "../../../component/rating/Rating";
import { Cross } from "../../../component/svg-components";
import TextField from "../../../component/text-field/TextField";
import styles from "./addfund.module.scss";

const AddFund = ({ handleClose }) => {

  return (
    <div className={styles.addFundContainer} onClick={(e) => { e.stopPropagation() }}>
      <div className={styles.addFundCross}>
        Create New Fund
        <span className={styles.crossIcon}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </span>
      </div>
     
      <div className={styles.fundData}>
      <div className={styles.textFieldFirst}>
        <div className={styles.textFieldTitle}>Fund Risk Rating:</div>
        <div className={styles.textFieldLeft}>

          <Rating customClass={styles.textFieldBox} value="1" />
          <Rating customClass={styles.textFieldBox} value="2" />
          <Rating customClass={styles.textFieldBox} value="3" />
          <Rating customClass={styles.textFieldBox} value="4" />
          <Rating customClass={styles.textFieldBox} value="5" />
        </div>
      </div>
      
        <TextField
          customClassContainer={styles.textFieldContainer}
          label="VAT Applicable?:"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Fund Name:"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
      
        <div className={styles.textAreaField}>
          <div className={styles.textAreaFieldTitle}>Fund Philosophy:</div>
          <div className={styles.textAreaFieldLeft}>
            <textarea className={styles.description} />
          </div>
        </div>
        <div className={styles.textAreaField}>
          <div className={styles.textAreaFieldTitle}>Pricing Inputs:</div>
            <textarea className={styles.description} />
        
        </div>

        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Inception Date:"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Unit Starting Price(R):"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Management Fee(%):"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Performance Fee(%):"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Pro Rata Audit Fee(R p.a.):"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Select Currency (R/ $):"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />

      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <FilledButton title="Add" customClass={styles.addButton} handleClick={() => { }} />
        </div>
      </div>
    </div>
  );
};
export default AddFund;
