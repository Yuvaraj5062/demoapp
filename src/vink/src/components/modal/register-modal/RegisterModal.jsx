import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../../hooks/useForm";
import {
  cancelError,
  getAccountType,
  getCategory,
  getCountries,
  getSubCategory,
  registerUser,
} from "../../../redux/auth/register/registerSlice";
import { closePopup, popup } from "../../../redux/popup/popupSlice";
import Button from "../../button/Button";
import Divider from "../../divider/Divider";
import LoadingScreen from "../../loading-screen/LoadingScreen";
import StatusModal from "../../status-modal/StatusModal";
import TextField from "../../text-field/TextField";
import Close from "../close/Close";
import styles from "./registerModal.module.scss";
import SavedApplication from "./saved-application/SavedApplication";

const RegisterModal = ({ handleClose }) => {
  const [hide, setHide] = useState(true);
  const [active, setactive] = useState(true);
  const [active1, setactive1] = useState(false);
  const [validationData, setValidationData] = useState();

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
  const handleRegister = (data) => {
    dispatch(registerUser(data));
  };
  const {
    handleChange,
    handleSubmit,
    data,
    errors,
    isSubmit,
    disable,
    setDisable,
  } = useForm({
    intialDisable: { subCategoryId: true, userAccountTypeId: true },
    initialValues: {
      address: ''
    },
    validations: {
      categoryId: {
        required: {
          value: true,
          message: "Please select category",
        },
      },
      subCategoryId: {
        required: {
          value: validationData?.categoryId ? true : false,
          message: "Please select sub-category",
        },
      },
      userAccountTypeId: {
        required: {
          value: validationData?.subCategoryId ? true : false,
          message: "Please select account type",
        },
      },
      countryID: {
        required: {
          value: true,
          message: "Please select country of birth",
        },
      },

      idNumber: {
        required: {
          value:
            validationData?.idNumber || validationData?.pasportNumber
              ? false
              : true,
          message: "Please enter your identity number",
        },
        pattern: {
          value: validationData?.idNumber && /^[a-zA-Z0-9]+$/,
          message: "Special characters are not allowed",
        },
      },
      pasportNumber: {
        required: {
          value:
            validationData?.idNumber || validationData?.pasportNumber
              ? false
              : true,
          message: "Please enter your passport number",
        },
        pattern: {
          value: validationData?.pasportNumber && /^[a-zA-Z0-9]+$/,
          message: "Special characters are not allowed",
        },
      },
      emailId: {
        required: {
          value: true,
          message: "Please enter your email address",
        },
        pattern: {
          value: /^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/,
          message: "Please enter valid email address",
        },
      },
      firstName: {
        required: {
          value: true,
          message: "Please enter first name",
        },
        pattern: {
          value: "^[A-Za-z]*$",
          message: "Numbers and special characters are not allowed",
        },
      },
      lastName: {
        required: {
          value: true,
          message: "Please enter last name",
        },
        pattern: {
          value: "^[A-Za-z]*$",
          message: "Numbers and special characters are not allowed",
        },
      },
      mobile: {
        required: {
          value: true,
          message: "Please enter cell number",
        },
        pattern: {
          value: /^[0-9]+$/,
          message: "Please enter numbers only",
        },
        custom: {
          isValid: (value) => (value && value.length === 10 ? true : false),
          message: "Cell number must be 10 digit",
        },
      },
      // address: {
      //   required: {
      //     value: true,
      //     message: "Please enter address",
      //   },
      // },
    },
    onSubmit: () => handleRegister(data),
  });

  const { category } = useSelector((state) => state.register);
  const { subCategory } = useSelector((state) => state.register);
  const { accountType } = useSelector((state) => state.register);
  const { countries } = useSelector((state) => state.register);
  const { error } = useSelector((state) => state.register);
  const { loading } = useSelector((state) => state.register);
  const { status } = useSelector((state) => state.register);
  const [dropdownData, setDropdownData] = useState(countries);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data.pasportNumber || data.idNumber || data.categoryId || data.subCategory) {
      setValidationData(data);
    }
    else {
      setValidationData(null)
    }
  }, [data.pasportNumber, data.idNumber, data.categoryId, data.subCategoryId]);

  // const handleChange1 = (e) => {
  //   let searchValue = e.target.value;
  //   // countries &&
  //   //   countries.length !== 0 &&
  //   let filterCountry = countries.filter((item) => {
  //     if (searchValue.length > 1) {
  //       if (
  //         item.countryName.substr(0, searchValue.length).toLowerCase() ==
  //         searchValue.toLowerCase()
  //       ) {
  //         return item;
  //       }
  //     } else if (!searchValue) {
  //       setDropdownData([]);
  //     }
  //   });
  //   setDropdownData(filterCountry);
  //   setSearch(filterCountry[0].countryName);
  // };

  useEffect(() => {
    dispatch(getCategory({}));
    dispatch(getCountries({}));
    setDropdownData(countries);
  }, []);

  useEffect(() => {
    data.categoryId && dispatch(getSubCategory(data.categoryId));
  }, [dispatch, data.categoryId]);

  useEffect(() => {
    data.subCategoryId && dispatch(getAccountType(data.subCategoryId));
  }, [data.subCategoryId]);

  useEffect(() => {
    data.subCategoryId = "";
  }, [data.categoryId]);

  useEffect(() => {
    data.userAccountTypeId = "";
  }, [data.subCategoryId]);

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
          <Close handleClose={() => dispatch(closePopup({ step: null }))} />
          <div className={styles.fieldContainer}>
            <p className={styles.registerText}>Register</p>
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
              <form onSubmit={handleSubmit}>
                <>
                  <p className={styles.accType}>Account types Selection</p>
                  <div className={styles.dropDownContainer}>
                    <TextField
                      type="select"
                      placeholder="Select Category"
                      // customClass={styles.inputField1}
                      handleChange={handleChange(
                        "categoryId",
                        null,
                        null,
                        { subCategoryId: true, userAccountTypeId: true },
                        { subCategoryId: false, userAccountTypeId: true }
                      )}
                      error={errors.categoryId}
                      dropDownData={category}
                      value={data?.categoryId}
                      name="categoryName"
                      id="id"
                      customClass={styles.inputFieldContainer}
                    />
                    {
                      <TextField
                        type="select"
                        placeholder="Select Sub Category"
                        // customClass={styles.inputField1}
                        handleChange={handleChange(
                          "subCategoryId",
                          null,
                          null,
                          { userAccountTypeId: true },
                          { userAccountTypeId: false }
                        )}
                        error={errors.subCategoryId}
                        dropDownData={subCategory}
                        name="subCategoryName"
                        value={disable.subCategoryId ? "" : data?.subCategoryId}
                        disable={!data?.categoryId}
                        id="id"
                        // className={styles.inputFieldContainer}
                        customClass={styles.inputFieldContainer}
                      />
                    }
                  </div>
                  {
                    <TextField
                      type="select"
                      placeholder="Select Account Type"
                      // customClass={styles.inputField1}
                      handleChange={handleChange("userAccountTypeId")}
                      error={errors.userAccountTypeId}
                      dropDownData={accountType}
                      name="accountTypeName"
                      id="id"
                      value={
                        disable.userAccountTypeId ? "" : data?.userAccountTypeId
                      }
                      disable={!data?.categoryId || !data?.subCategoryId}
                      // className={styles.inputFieldContainer}
                      customClass={styles.inputFieldContainer}
                    />
                  }

                  <Divider customClass={styles.divider} />
                  <p className={styles.personalInfo}>Personal Information</p>
                  <div className={styles.dropdwonTextField}>
                    <TextField
                      type="select"
                      placeholder="Country of Birth"
                      customClass={styles.inputField1}
                      handleChange={handleChange("countryID")}
                      error={errors.countryID}
                      dropDownData={countries}
                      value={data?.countryID}
                      name="countryName"
                      id="countryID"
                    // className={styles.inputFieldContainer}
                    />
                    <TextField
                      type="text"
                      placeholder="Your identity Number"
                      customClass={styles.inputField1}
                      handleChange={handleChange("idNumber")}
                      error={errors.idNumber}
                      value={data.idNumber?.trim()}
                    />
                  </div>
                  <div className={styles.dropdwonTextField}>
                    <TextField
                      type="text"
                      placeholder="Your Passport Number"
                      customClass={styles.inputField1}
                      value={data.pasportNumber?.trim()}
                      handleChange={handleChange("pasportNumber")}
                      error={errors.pasportNumber}
                    />
                    <TextField
                      type="text"
                      placeholder="Email"
                      value={data.emailId?.trim()}
                      customClass={styles.inputField1}
                      handleChange={handleChange("emailId")}
                      error={errors.emailId}
                    />
                  </div>
                  <div className={styles.dropdwonTextField}>
                    <TextField
                      type="text"
                      placeholder="First Name"
                      customClass={styles.inputField1}
                      handleChange={handleChange("firstName")}
                      error={errors.firstName}
                      value={data.firstName?.trim()}
                    />
                    <TextField
                      type="text"
                      placeholder="Last Name"
                      customClass={styles.inputField1}
                      handleChange={handleChange("lastName")}
                      error={errors.lastName}
                      value={data.lastName?.trim()}
                    />
                  </div>
                  <div className={styles.dropdwonTextField}>
                    <TextField
                      type="tel"
                      placeholder="Cell Number"
                      customClass={styles.inputField1}
                      handleChange={handleChange("mobile")}
                      error={errors.mobile}
                      value={data.mobile?.trim()}
                    />
                    <TextField
                      type="text"
                      placeholder="Your current residential address"
                      customClass={styles.inputField1}
                      handleChange={handleChange("address")}
                      error={errors.address}
                      value={data.address}
                    />
                  </div>
                  <Button
                    type="submit"
                    title="Let's Continue"
                    customClass={styles.continueBtn}
                    customClassForText={styles.btnText}
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
              <>
                <SavedApplication />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;
