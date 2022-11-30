import styles from "./addnewifas.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import TextField from "../../../component/text-field/TextField";
import Divider from "../../../component/divider/Divider";
import profileImage from "../../../assets/images/profileImage.png";
import { Upload, Paper } from "../../../component/svg-components";
import { colors } from "../../../constants/Colors";
import UploadFile from "../../../component/upload-file/UploadFile";
import { useState } from "react";
import RadioButton from "../../../component/radio-button/RadioButton";
import { useNavigate } from "react-router-dom";
const AddNewIFAs = () => {
  const [form, setForm] = useState(true);
  const handleSubmit = (e) => {
    setForm(false);
    e.preventDefault();
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
  };
  const navigate = useNavigate();
  const handleMonthlyClient = () => {
    navigate("monthlyreports");
  };
  return (
    <>
      <div className={styles.buttonContainer}>
        <div className={styles.btns}>
          <FilledButton
            customClass={styles.btnStyle}
            title="IFA AUM Report"
            handleClick={() => {
              navigate("/ifas/ifaaumreport");
            }}
          />
          <FilledButton
            customClass={styles.btnStyle}
            title="IFA Client List"
            handleClick={() => {
              navigate("/ifas/ifaclientlist");
            }}
          />
          <FilledButton
            customClass={styles.btnStyle}
            title="IFA Generate Monthly Commission Report"
            handleClick={() => {
              navigate("/ifas/monthlyreports");
            }}
          />
        </div>
        <div className={styles.generateIfaContainer}>
          <Paper fillColor={colors.white} />
          <FilledButton
            customClass={styles.printBtn}
            title="Generate IFA Invoice"
            handleClick={() => navigate("/ifas/addnewifas/generateifainvoice")}
            type="button"
          />
        </div>
      </div>

      <div className={styles.addNewIFAsContainer}>
        {form ? (
          <form className={styles.ifaForm} onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.IFAsPrimaryDetails}>
              <p className={styles.data1}>Personal Data1</p>
              <div className={styles.imgBtnGrp}>
                <img
                  src={profileImage}
                  alt="ProfilePhoto"
                  className={styles.profileImage}
                />
                <FilledButton
                  title="Upload"
                  customClass={styles.uploadBtn}
                  handleClick={() => {}}
                  type="button"
                />
                <FilledButton
                  title="Remove"
                  customClass={styles.removeBtn}
                  handleClick={() => {}}
                  type="button"
                />
                
                <Divider customClass={styles.verticalDivider} />
                <div className={styles.uploadContainer}>
                  <UploadFile
                    selectedFileText="Drop files to upload or Browse"
                    buttonStyle={styles.fileInputBtn}
                    browseContent={<Upload fillColor={colors.white} />}
                    type="button"
                  />

                  <FilledButton
                    title="Upload Documents"
                    customClass={styles.uploadBtn}
                    handleClick={() => {}}
                    type="button"
                  />
                </div>
              </div>

              <div className={styles.IFAsMoreDetails}>
              
              <div className={styles.IFAsType}>
                <TextField
                  type="text"
                  label="FSCA Registration no"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  placeholder="50813"
                />
                <TextField
                  type="text"
                  label="WCM IFA Practise no"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  placeholder="IFA001"
                />
                <TextField
                  type="text"
                  label="Responsible Person Title"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="First Name"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.IFAsType}>
                <TextField
                  type="text"
                  label="Surname"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="Position held"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="Date of Birth"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="Company Name"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.IFAsType1}>
                <TextField
                  type="text"
                  label="Comp. Reg.  Number"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="SARS Tax Number"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="VAT Number"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
              </div>
            </div>

            </div>

            <div className={styles.businessData}>
              <p className={styles.data1}>Business Data</p>
              <div className={styles.IFAsType}>
                <TextField
                  type="text"
                  label="Building Name"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="Floor and Office Number"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="Street Name"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="Suburb"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.IFAsType1}>
                <TextField
                  type="text"
                  label="City"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="Province"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="Postal code"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
              </div>

             
            </div>
                
            
            <div className={styles.businessData}>
            <p className={styles.data1}>Personal Data2</p>
            <div className={styles.IFAsDetails}>
                <div className={styles.chechboxContainer}>
                  <span className={styles.registrationText}>
                    Is Current FSCA Registration Active?
                  </span>
                  <div className={styles.isActiveText}>
                    <input type="radio" name="yes" />
                    <label className={styles.yesCheck}>Yes</label>
                    <input type="radio" name="yes" />
                    <label>No</label>
                  </div>
                </div>
                <TextField
                  type="text"
                  label="Last Date Checked"
                  customClass={styles.labelText}
                  customClassContainer={styles.divContainer}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="select"
                  label="Person Checked"
                  option1=""
                  option2="2"
                  option3="3"
                  option4="4"
                  customClass={styles.labelText}
                  customClassDropdown={styles.dropdownStyle}
                />
                <TextField
                  type="select"
                  label="Walt Cap. Consultant"
                  option1=""
                  option2="2"
                  option3="3"
                  option4="4"
                  customClass={styles.labelText}
                  customClassDropdown={styles.dropdownStyle}
                />
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.contactDetails}>
                <div className={styles.contactInfo}>
                  <TextField
                    type="text"
                    label="Mobile Number"
                    customClass={styles.labelText}
                    customClassInput={styles.inputType1}
                  />
                  <TextField
                    type="text"
                    label="Work Number"
                    customClass={styles.contactLabel}
                    customClassInput={styles.inputType1}
                  />
                  <TextField
                    type="text"
                    label="Email"
                    customClass={styles.contactLabel}
                    customClassInput={styles.inputType1}
                  />
                </div>
                <div className={styles.descriptionContainer}>
                  <label className={styles.label}>Notepad</label>
                  <TextField customClassInput={styles.inputData} />
                  {/* <textarea className={styles.description} /> */}
                </div>
              </div>
              

              <div className={styles.btnGrp}>
                <FilledButton
                  title="Continue"
                  customClass={styles.saveBtn}
                  handleClick={() => {}}
                  handleMouseEnter={()=>{}}
                  handleMouseLeave={()=>{}}
                />
                {/* <FilledButton
                  title="Edit"
                  customClass={styles.editBtn}
                  handleClick={() => {}}
                  handleMouseEnter={()=>{}}
                  handleMouseLeave={()=>{}}
                /> */}
                <FilledButton
                  title="Cancel"
                  customClass={styles.cancelBtn}
                  handleClick={() => {}}
                  type="button"
                  handleMouseEnter={()=>{}}
                  handleMouseLeave={()=>{}}
                />
                {/* <FilledButton
                  title="Delete Account"
                  customClass={styles.deleteBtn}
                  handleClick={() => {}}
                  type="button"
                  handleMouseEnter={()=>{}}
                  handleMouseLeave={()=>{}}
                /> */}
              </div>
            </div>
          </form>
        ) : (
          // Add new Ifa Step 2
          <form
            className={styles.form2Container}
            onSubmit={(e) => handleSubmit2(e)}
          >
            <div className={styles.fieldContainer}>
              <span className={styles.titleText}>Personal Data Continue</span>
              <div className={styles.inputFields}>
                <TextField
                  type="text"
                  label="Initial Fees"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  placeholder="Local Company"
                />
                <TextField
                  type="text"
                  label="Annual Advisor Fees"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="Performance Fee"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
                <TextField
                  type="text"
                  label="Other"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                />
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.checkContainer}>
                <div>
                  <span className={styles.questionText}>
                    Is VAT Applicable?
                  </span>
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
              </div>
              <div className={styles.btnGrp}>
                <FilledButton
                  title="Save"
                  customClass={styles.saveBtn}
                  // handleClick={() => {}}
                  handleClick={() => navigate('/ifas')}
                />
                <FilledButton
                  title="Cancel"
                  customClass={styles.cancelBtn}
                  handleClick={() => {}}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AddNewIFAs;
