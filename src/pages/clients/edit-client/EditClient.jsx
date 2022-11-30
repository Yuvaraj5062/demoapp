import styles from "./editclient.module.scss";
import profileImage from "../../../assets/images/profileImage.png";
import FilledButton from "../../../component/filled-button/FilledButton";
import Divider from "../../../component/divider/Divider";
import TextField from "../../../component/text-field/TextField";
import { useState } from "react";
import UploadProfilePhoto from "../../../component/modal/upload-Profile-Photo/UploadProfilePhoto";
import Popup from "../../../component/popup/Popup";
import RadioButton from "../../../component/radio-button/RadioButton";
import Toast from "../../../component/toast/Toast";
import { success } from "../../../data/data";
import { useNavigate } from "react-router-dom";

const EditClient = () => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(true);
  const [showToast, setShowToast] = useState(false);
  // const [click,setClick] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setModal(!modal);
  };
  const handleOpen = () => {
    setModal(!modal);
  };
  const handleSubmit = () => {
    setForm(false);
  };
  const handleToast = () => {
    setShowToast(true);
    handleClose();
    // setClick(true)
  };
  return (
    <div className={styles.newClientContainer}>
      {modal && (
        <Popup
          Children={UploadProfilePhoto}
          handleClose={() => handleClose()}
          handleToast={() => handleToast()}
        />
      )}
      {!modal && showToast ? (
        <Toast item={success} show={showToast} setShow={setShowToast} />
      ) : null}
      {form ? (
        <form className={styles.formContent} onSubmit={() => handleSubmit()}>
          <div className={styles.clientsPrimaryDetails}>
            <p className={styles.data1}>Personal Data</p>
            <div className={styles.imgBtnGrp}>
              <img
                src={profileImage}
                alt="ProfilePhoto"
                className={styles.profileImage}
              />
              <FilledButton
                title="Upload"
                customClass={styles.uploadBtn}
                handleClick={() => handleOpen()}
              />
              <FilledButton
                title="Remove"
                customClass={styles.removeBtn}
                handleClick={() => {}}
              />
            </div>

            <div className={styles.clientsMoreDetails}>
              <div className={styles.clientType}>
                <TextField
                  customClass={styles.labelText}
                  type="select"
                  label="Office"
                  option1="Pretoria"
                  option2="2"
                  option3="3"
                  option4="4"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Client Acc. No"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Responsible Person Title"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="First Name"
                />
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.clientType}>
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Lastname"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Position held"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Date of Birth"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Comp. reg.  number"
                />
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.clientType}>
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Mobile Number"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Work Number"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Email"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Comp. SARS Tax Number"
                />
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.clientType}>
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Country of Residence"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Street Number"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Home Name"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Street Name"
                />
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.clientType}>
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Suburb"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="City"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Province"
                />
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Postal code"
                />
              </div>
            </div>
          </div>
          <div className={styles.clientsMoreDetails2}>
            <p className={styles.data1}>Client Type</p>
            <div className={styles.clientType}>
              <TextField
                customClass={styles.labelText}
                type="select"
                label="Client Type"
                option1="Local Company"
                option2="2"
                option3="3"
                option4="4"
              />
              <TextField
                customClass={styles.labelText}
                type="select"
                label="Personality type"
                option1=""
                option2="2"
                option3="3"
                option4="4"
              />
              <TextField
                customClass={styles.labelText}
                type="select"
                label="Walt Cap. Consultant"
                option1=""
                option2="2"
                option3="3"
                option4="4"
              />
              <TextField
                customClass={styles.labelText}
                type="select"
                label="IFA"
                option1=""
                option2="2"
                option3="3"
                option4="4"
              />
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.clientStatus}>
              <div className={styles.maritalStatus}>
                <TextField
                  customClass={styles.labelText}
                  type="text"
                  label="Marital Status"
                />
                <TextField
                  type="text"
                  label="Spouse’s Name"
                  customClass={styles.spouseLabel}
                />
                <TextField
                  type="text"
                  label="Spouse’s DOB"
                  customClass={styles.spouseLabel}
                />
              </div>
              <div className={styles.descriptionContainer}>
                <label className={styles.label}>Notepad</label>
                <textarea className={styles.description} />
              </div>
            </div>

            <div className={styles.btnGrp}>
              <FilledButton
                title="Save & Continue"
                customClass={styles.saveBtn}
                handleClick={() => {}}
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
      ) : (
        // Form2 Add new clients
        <div className={styles.formDetails}>
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
            </div>
            <div className={styles.feeTypeContainer}>
              <TextField
                customClass={styles.labelText}
                type="text"
                label="Intial Fee"
              />
              <TextField
                customClass={styles.labelText}
                type="text"
                label="Annual Management Fee"
              />
              <TextField
                customClass={styles.labelText}
                type="text"
                label="Performance Fee"
              />
              <TextField
                customClass={styles.labelText}
                type="text"
                label="Minimum Brokerage	Rate"
              />
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.monthlyFeesContainer}>
              <TextField
                customClass={styles.labelText}
                type="text"
                label="Flat Brokerage Rate"
              />
              <TextField
                customClass={styles.labelText}
                type="text"
                label="Admin Monthly Fees"
              />
              <TextField
                customClass={styles.labelText}
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
        </div>
      )}
    </div>
  );
};

export default EditClient;
