import styles from "./addnewclient.module.scss";
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
// import { Link } from "../../../component/svg-components";
import ClientLink from "../../../component/modal/Ifa-to-client-link/ClientLink";
// import Navlink from "../../../component/navlink/Navlink";

const AddNewClient = () => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [linkPopup, setLinkPopup] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setModal(false);
    setLinkPopup(false);
  };
  const handleOpen = () => {
    setModal(!modal);
  };
  const handleSubmit = (e) => {
    setForm(false);
    e.preventDefault();
  };
  const handleToast = () => {
    setShowToast(true);
    handleClose();
    // setClick(true)
  };
  const handleClientLink = () => {
    setLinkPopup(!linkPopup);
  };
  return (
    <div className={styles.newClientContainer}>
      {linkPopup && (
        <Popup Children={ClientLink} handleClose={() => handleClose()} />
      )}
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
      {/* {form ? ( */}
      <form className={styles.formContent} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.clientsPrimaryDetails}>
          <p className={styles.data1}>Personal Data</p>
          <div className={styles.clientsPersonalData}>
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
                type="button"
              />
              <FilledButton
                title="Remove"
                customClass={styles.removeBtn}
                handleClick={() => {}}
                type="button"
              />
            </div>
            <FilledButton
                  title="Edit"
                  customClass={styles.editBtn}
                  handleClick={() => {}}
                  handleMouseEnter={()=>{}}
                  handleMouseLeave={()=>{}}
                />
          </div>

          <div className={styles.clientsMoreDetails}>
            <div className={styles.clientType}>
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                customClassDropdown={styles.dropdownStyle}
                customClassContainer={styles.customClassContainer}
                type="select"
                label="Office"
                option1="Pretoria"
                option2="2"
                option3="3"
                option4="4"
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Client Acc. No"
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Responsible Person Title"
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="First Name"
              />
            </div>
            <Divider customClass={styles.divider} />

            <div className={styles.clientType}>
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Lastname"
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Position held"
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Date of Birth"
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Com. / Trust Reg. Number"
              />
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.clientType}>
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Mobile Number"
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Work Number"
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Email"
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Comp. SARS Tax Number"
              />
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.clientTypeCountryResidence}>
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Country of Residence"
              />
            </div>
          </div>
        </div>
        <div className={styles.clientsMoreDetails3}>
          <p className={styles.data1}>Home Address</p>
          <div className={styles.clientType}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              customClassContainer={styles.customClassContainer}
              type="text"
              label="Street Number"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Home Name"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Street Name"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Suburb"
            />
          </div>

          <Divider customClass={styles.divider} />

          <div className={styles.clientType1}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              customClassContainer={styles.customClassContainer}
              type="text"
              label="City"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              customClassDropdown={styles.dropdownStyle}
              type="select"
              label="Province"
              option1=""
              option2="2"
              option3="3"
              option4="4"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Postal code"
            />
          </div>
        </div>

        <div className={styles.clientsMoreDetails3}>
          <p className={styles.data1}>Bank Details</p>
          <div className={styles.clientType}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              customClassContainer={styles.customClassContainer}
              type="text"
              label="Name of Acc. Holder"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Bank"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="select"
              label="Account Type"
              customClassDropdown={styles.dropdownStyle}
              option1=""
              option2="Current"
              option3="Savings"
              option4="Salary"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Account Number"
            />
          </div>

          <Divider customClass={styles.divider} />

          <div className={styles.clientBankType}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              customClassContainer={styles.customClassContainer}
              type="text"
              label="Branch Code"
            />

            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="SWIFT Code"
            />
          </div>
        </div>

        <div className={styles.clientsMoreDetails2}>
          <p className={styles.data1}>Client Type</p>
          <div className={styles.clientType}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType}
              customClassDropdown={styles.dropdownStyle}
              customClassContainer={styles.customClassContainer}
              type="select"
              label="Client Type"
              option1="Local Company"
              option2="2"
              option3="3"
              option4="4"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType}
              customClassDropdown={styles.dropdownStyle}
              type="select"
              label="Personality type"
              option1=""
              option2="2"
              option3="3"
              option4="4"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType}
              customClassDropdown={styles.dropdownStyle}
              type="select"
              label="Walt Cap. Consultant"
              option1=""
              option2="2"
              option3="3"
              option4="4"
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType}
              customClassDropdown={styles.dropdownStyle}
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
                customClassInput={styles.inputType1}
                customClassContainer={styles.customClassContainer}
                type="text"
                label="Marital Status"
              />
              <TextField
                type="text"
                label="Spouse’s Name"
                customClass={styles.spouseLabel}
                customClassInput={styles.inputType1}
              />
              <TextField
                type="text"
                label="Spouse’s DOB"
                customClass={styles.spouseLabel}
                customClassInput={styles.inputType1}
              />
            </div>
            <div className={styles.descriptionContainer}>
              <label className={styles.label}>Notepad</label>
              <TextField customClassInput={styles.inputData} />
            </div>
          </div>

          <div className={styles.btnGrp}>
            <FilledButton
              title="Save & Continue"
              customClass={styles.saveBtn}
              handleClick={() => navigate("brokergefees")}
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
      {/* // ) : ( // Form2 Add new clients */}
      {/* <form className={styles.formDetails}>
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
              type="text"
              label="Initial Fee"
              placeholder="Local Company"
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
              placeholder="Local Company"
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
      </form> */}
    </div>
  );
};

export default AddNewClient;
