import FilledButton from "../../../../component/filled-button/FilledButton";
import { Cross } from "../../../../component/svg-components";
import styles from "./addPricing.module.scss";
import TextField from "../../../../component/text-field/TextField";
import { tableData } from "../../../../data/data";
const AddPricing = ({ handleClose }) => {
  return (
    <>
        <div className={styles.addPricingContainer} onClick={(e)=>{e.stopPropagation()}}>
          <div className={styles.addPricingCross}>
            Add Pricing
            <span className={styles.crossIcon}>
              <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
            </span>
          </div>

          <div className={styles.table}>
            {tableData.map((item, index) => {
              return (
                <TextField
                  key={index}
                  customClassContainer={styles.textFieldContainer}
                  label={item.title}
                  customClass={styles.title}
                  customClassInput={styles.customInput}
                />
              );
            })}
          </div>

          <div className={styles.buttonContainer}>
            <div className={styles.button}>
              <FilledButton
                title="Add"
                customClass={styles.priceButton}
              />
            </div>
          </div>
        </div>
    </>
  );
};

export default AddPricing;
