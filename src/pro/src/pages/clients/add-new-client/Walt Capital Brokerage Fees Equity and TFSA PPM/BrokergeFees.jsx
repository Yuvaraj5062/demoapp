import { useNavigate } from "react-router-dom";
import Divider from "../../../../component/divider/Divider";
import FilledButton from "../../../../component/filled-button/FilledButton";
import RadioButton from "../../../../component/radio-button/RadioButton";
import TextField from "../../../../component/text-field/TextField";
import styles from "./brokergefees.module.scss";

const BrokergeFees = () => {
  const navigate = useNavigate();
  return (
    // <div className={styles.mainContainer}>
    <form className={styles.formDetails}>
      <div className={styles.formContainer}>
        <p className={styles.formTitle}>
          Walt Capital Brokerage Fees Equity and TFSA PPM:
        </p>
        <div className={styles.radioButtonContainer}>
          <RadioButton
            name="PPM"
            label="Equity (PPM)"
            radioLabelClass={styles.radioButtonText}
          />
          <RadioButton
            name="PPM"
            label="TFSA (PPM)"
            radioLabelClass={styles.radioButtonText}
          />
          <div className={styles.dscMcsRadiobutton}>
            <RadioButton
              name="dcs"
              label="DCS"
              radioLabelClass={styles.radioButtonText}
            />
            <RadioButton
              name="dcs"
              label="MCS"
              radioLabelClass={styles.radioButtonText}
            />
          </div>
        </div>
        <div className={styles.feeTypeContainer}>
          <TextField
            customClass={styles.labelText}
            customClassInput={styles.inputType1}
            type="text"
            label="Initial Fee"
            placeholder="Local Company"
          />
          <TextField
            customClass={styles.labelText}
            customClassInput={styles.inputType1}
            type="text"
            label="Annual Management Fee"
          />
          <TextField
            customClass={styles.labelText}
            customClassInput={styles.inputType1}
            type="text"
            label="Performance Fee"
          />
          <TextField
            customClass={styles.labelText}
            customClassInput={styles.inputType1}
            type="text"
            label="Minimum Brokerage	Rate"
          />
        </div>
        <Divider customClass={styles.divider} />
        <div className={styles.monthlyFeesContainer}>
          <TextField
            customClass={styles.labelText}
            customClassInput={styles.inputType1}
            type="text"
            label="Flat Brokerage Rate"
            placeholder="Local Company"
          />
          <TextField
            customClass={styles.labelText}
            customClassInput={styles.inputType1}
            type="text"
            label="Admin Monthly Fees"
          />
          <TextField
            customClass={styles.labelText}
            customClassInput={styles.inputType1}
            type="text"
            label="Other"
          />
        </div>
        <Divider customClass={styles.divider} />
        <div className={styles.checkContainer}>
          <div>
            <span className={styles.questionText}>Is VAT Applicable?</span>
            <div className={styles.radioContainer}>
              <RadioButton
                name="VAT"
                label="YES"
                radioLabelClass={styles.radioButtonText}
              />
              <RadioButton
                name="VAT"
                label="NO"
                radioLabelClass={styles.radioButtonText}
              />
            </div>
          </div>
          <Divider customClass={styles.verticalDivider} />
          <div>
            <div>
              <span className={styles.questionText}>
                Load default Walt Cap Fees
              </span>
              <div className={styles.radioContainer}>
                <RadioButton
                  name="Fees"
                  label="YES"
                  radioLabelClass={styles.radioButtonText}
                />
                <RadioButton
                  name="Fees"
                  label="NO"
                  radioLabelClass={styles.radioButtonText}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.btnGrp}>
          <FilledButton
            title="Edit Default Fee Template"
            customClass={styles.editBtn}
            handleClick={() => navigate("/clients")}
          />
          <FilledButton
            title="Save"
            customClass={styles.saveBtn}
            handleClick={() => navigate("/clients")}
          />
          <FilledButton
            title="Cancel"
            customClass={styles.cancelBtn}
            handleClick={() => {}}
          />
          <FilledButton
            title="Delete Account"
            customClass={styles.deleteBtn}
            handleClick={() => {}}
          />
        </div>
      </div>
    </form>
    // </div>
  );
};
export default BrokergeFees;
