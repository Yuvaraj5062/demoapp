import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersById,
  updateUserById,
} from "../../../redux/auth/register/registerSlice";
import { closePopup, popup } from "../../../redux/popup/popupSlice";
import Button from "../../button/Button";
import Divider from "../../divider/Divider";
import DropDown from "../../dropDown/DropDown";
import TextField from "../../text-field/TextField";
import Close from "../close/Close";
import SavedApplication from "../register-modal/saved-application/SavedApplication";
import styles from "./registerModalReadOnly.module.scss";
import LoadingScreen from "../../loading-screen/LoadingScreen";
import StatusModal from "../../status-modal/StatusModal";
import { cancelError } from "../../../redux/auth/register/registerSlice";

const RegisterModalReadOnly = ({ handleClose }) => {
  const { userInfo, error, loading } = useSelector((state) => state.register);
  const [hide, setHide] = useState(true);
  const [active, setactive] = useState(true);
  const [active1, setactive1] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   userInfo?.data?.userId && dispatch(getUsersById(userInfo?.data?.userId));
  // }, [userInfo?.data?.userId]);

  const handleSavedApplication = () => {
    setactive1(true);
    setactive(false);
    setHide(false);
  };

  const handleNewApplication = () => {
    setactive(true);
    setactive1(false);
    setHide(true);
  };

  const handleUserUpdate = () => {
    dispatch(updateUserById({}));
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <StatusModal
          status="Error!"
          statusDetail={error}
          buttonText="Retry"
          action={cancelError()}
        />
      ) : (
        <div
          className={styles.registerContainer}
          onClick={(e) => e.stopPropagation()}
        >
          {/* <Close handleClose={() => dispatch(closePopup({ step: null }))} /> */}
          <div className={styles.fieldContainer}>
            <p className={styles.registerText}>Confirmation</p>
            <p className={styles.aboutText}>
              Help us to securely find out about you
            </p>
            <div className={styles.buttonContainer}>
              <Button
                title="New Application"
                customClass={
                  active ? styles.savedApplication : styles.newApplication
                }
                customClassForText={
                  active
                    ? styles.savedApplicationText
                    : styles.newApplicationText
                }
                handleClick={() => handleNewApplication()}
              />
              <Button
                title="Saved Application"
                customClass={
                  active1 ? styles.savedApplication : styles.newApplication
                }
                customClassForText={
                  active1
                    ? styles.savedApplicationText
                    : styles.newApplicationText
                }
                handleClick={() => handleSavedApplication()}
              />
            </div>
            <Divider customClass={styles.divider} />
            {hide ? (
              <form>
                <>
                  <p className={styles.accType}>Account types Selection</p>
                  <div className={styles.dropDownContainer}>
                    <DropDown
                      customClass={styles.accountType}
                      // dropDownData={category}
                      name="categoryName"
                      dispatchAction="category"
                      // setdropdown={setdropdown}
                      dropdown={userInfo?.data?.categoryName}
                      // errorMsg={
                      //   dropdown.categoryName === "Select Category" &&
                      //   isSubmit &&
                      //   "Please Select Category"
                      // }
                      readOnly={true}
                    />
                    <DropDown
                      customClass={styles.accountName}
                      // dropDownData={subCategory}
                      name="subCategoryName"
                      dispatchAction="subCategory"
                      // setdropdown={setdropdown1}
                      dropdown={userInfo?.data?.subCategoryName}
                      // errorMsg={
                      //   dropdown1.subCategoryName === "Select Sub Category" &&
                      //   isSubmit &&
                      //   "Please Select Sub-Category"
                      // }
                      readOnly={true}
                    />
                  </div>
                  <DropDown
                    customClass={styles.accessAccountData}
                    // dropDownData={accountType}
                    name="accountTypeName"
                    dropdown={userInfo?.data?.userAccountTypeName}
                    readOnly={true}
                  />
                  <Divider customClass={styles.divider} />
                  <p className={styles.personalInfo}>Personal Information</p>
                  <div className={styles.dropdwonTextField}>
                    <DropDown
                      customClass={styles.countryOfBirth}
                      customClassForDropDownValue={styles.dropdownValue}
                      // setdropdown={setdropdown3}
                      name="countryName"
                      dropdown={userInfo?.data?.countryName}
                      readOnly={true}
                      // className={styles.dropdownFieldContainer}
                    />
                    <TextField
                      type="text"
                      placeholder="Your identity Number"
                      customClass={styles.inputField1}
                      // handleChange={handleChange("idNumber")}
                      // error={errors.idNumber}
                      readOnly={true}
                      value={userInfo?.data?.idNumber}
                      // className={styles.inputFieldContainer}
                    />
                  </div>
                  <div className={styles.dropdwonTextField}>
                    <TextField
                      type="text"
                      placeholder="Your Passport Number"
                      customClass={styles.inputField}
                      // value={data.passportnumber}
                      // value={(e) =>setvalue(e.targe)}
                      // value={value}
                      // handleChange={(e) => setvalue(e.target.value)}
                      // handleChange={handleChange("pasportNumber")}
                      // error={errors.pasportNumber}
                      value={userInfo?.data?.pasportNumber}
                      readOnly={true}
                    />
                    <TextField
                      type="email"
                      placeholder="Email"
                      value={userInfo?.data?.emailId}
                      customClass={styles.inputField1}
                      // handleChange={handleChange("emailId")}
                      // error={errors.emailId}

                      readOnly={true}
                    />
                  </div>
                  <div className={styles.dropdwonTextField}>
                    <TextField
                      type="text"
                      placeholder="First Name"
                      customClass={styles.inputField}
                      // handleChange={handleChange("firstName")}
                      // error={errors.firstName}
                      value={userInfo?.data?.firstName}
                      readOnly={true}
                    />
                    <TextField
                      type="text"
                      placeholder="Last Name"
                      customClass={styles.inputField1}
                      // handleChange={handleChange("lastName")}
                      value={userInfo?.data?.lastName}
                      // error={errors.lastName}
                      readOnly={true}
                    />
                  </div>
                  <div className={styles.dropdwonTextField}>
                    <TextField
                      type="tel"
                      placeholder="Cell Number"
                      customClass={styles.inputField}
                      // handleChange={handleChange("mobile")}
                      value={userInfo?.data?.mobile}
                      // error={errors.mobile}

                      readOnly={true}
                    />
                    <TextField
                      type="text"
                      placeholder="Your current residential address"
                      customClass={styles.inputField1}
                      // handleChange={handleChange("address")}
                      value={userInfo?.data?.address}
                      readOnly={true}
                    />
                  </div>

                  <Button
                    title="Let's Continue"
                    customClass={styles.continueBtn}
                    customClassForText={styles.btnText}
                    handleClick={() => {
                      handleUserUpdate();
                    }}
                  />
                  <p className={styles.accText}>
                    Already have an account?
                    <span
                      className={styles.signIn}
                      onClick={() => dispatch(popup("LoginScreen"))}
                    >
                      {" "}
                      Login
                    </span>
                  </p>
                </>
              </form>
            ) : (
              <SavedApplication setHide={setHide} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModalReadOnly;
