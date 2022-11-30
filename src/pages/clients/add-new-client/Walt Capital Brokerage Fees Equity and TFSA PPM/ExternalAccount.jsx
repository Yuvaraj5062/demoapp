import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Divider from "../../../../component/divider/Divider";
import FilledButton from "../../../../component/filled-button/FilledButton";
import TextField from "../../../../component/text-field/TextField";
import { externalAccountValidations } from "../../../../formValidators/externalAccountValidations";
import useForm from "../../../../hooks/useForm";
import {
  addExternalAccount,
  clearState,
  deleteExternalAccount,
  editExternalAccount,
  externalAccount,
  serviceProviderDropdown,
  typeDropdown,
} from "../../../../redux/features/crm/crmSlice";
import styles from "./externalaccount.module.scss";
import Table from "../../../../component/table/new-table/Table";
import { providerTableHeader } from "../../../../data/data";
import { DeleteIcon } from "../../../../component/svg-components";
import { useState } from "react";
const ExternalAccount = ({ id }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const { serviceProviderDropdownData, typeDropdownData, externalAccountData } =
    useSelector((state) => state.crm);
  const [actionButtonValue, setActionButtonValue] = useState({
    type: "",
    info: "",
  });

  const { handleChange, handleSubmit, data, errors, setData } = useForm({
    validations: externalAccountValidations,
    // isSubmit: isSubmit,
    // setIsSubmit: setIsSubmit,
    onSubmit: () => handleSubmitForm(data),
  });

  const handleSubmitForm = (data) => {
    if (actionButtonValue.type === "edit") {
      const payload = {
        id: actionButtonValue.info.id,
        serviceProvider: data.serviceProvider,
        type: data.serviceProviderType,
        accountCode: data.accountCode,
        updatedBy: userInfo.userDetail.id,
      };
      dispatch(editExternalAccount(payload)).then((res) => {
        dispatch(externalAccount({ clientId: id }));
      });
      setActionButtonValue({
        type: "",
        info: "",
      });
    } else {
      const payload = {
        serviceProvider: data.serviceProvider,
        type: data.serviceProviderType,
        accountCode: data.accountCode,
        clientId: id,
        createdBy: userInfo.userDetail.id,
      };
      dispatch(addExternalAccount(payload));
      setData({});
    }
  };
  const handleReset = () => {
    setData({});
  };
  useEffect(() => {
    dispatch(serviceProviderDropdown());
    dispatch(typeDropdown());
    id && dispatch(externalAccount({ clientId: id }));
  }, []);
  useEffect(() => {
    if (actionButtonValue.type === "delete") {
      dispatch(
        deleteExternalAccount({
          externalAccountId: actionButtonValue.info.id,
          deletedBy: id,
        })
      ).then((res) => {
        dispatch(externalAccount({ clientId: id }));
        setTimeout(() => {
          dispatch(clearState());
        }, 1000);
      });
    } else if (actionButtonValue.type === "edit") {
      data.serviceProvider = actionButtonValue.info.serviceProvider;
      data.serviceProviderType = actionButtonValue.info.serviceProviderType;
      data.accountCode = actionButtonValue.info.accountCode;
      // handleSubmit()
    }
  }, [actionButtonValue]);
  
  return (
    <form className={styles.formContainer1} onSubmit={(e) => handleSubmit(e)}>
      <p className={styles.formTitle}>Link to External Account</p>
      <div className={styles.clientType}>
        <TextField
          customClass={styles.labelText}
          customClassInput={styles.inputType1}
          customClassDropdown={styles.dropdownStyle}
          customClassContainer={styles.customClassContainer}
          type="select"
          label="Service Provider"
          placeholder="Select Service Provider"
          handleChange={handleChange("serviceProvider")}
          error={errors.serviceProvider}
          dropDownData={serviceProviderDropdownData}
          name="serviceProvider"
          value={data.serviceProvider ? data.serviceProvider : ""}
          id="id"
        />

        <TextField
          customClass={styles.labelText}
          customClassInput={styles.inputType1}
          customClassDropdown={styles.dropdownStyle}
          customClassContainer={styles.customClassContainer}
          type="select"
          label="Type"
          placeholder="Select Type"
          handleChange={handleChange("serviceProviderType")}
          error={errors.serviceProviderType}
          dropDownData={typeDropdownData}
          name="serviceProviderType"
          value={data.serviceProviderType ? data.serviceProviderType : ""}
          id="id"
        />

        <TextField
          customClass={styles.labelText}
          customClassInput={styles.inputType1}
          type="text"
          label="Account code"
          value={data.accountCode ? data.accountCode : ""}
          handleChange={handleChange("accountCode")}
          error={errors.accountCode}
        />
      </div>
      <Divider customClass={styles.divider} />
      <div className={styles.buttonContainer}>
        <FilledButton
          title="New Linked Account"
          customClass={styles.accountButton}
          type="button"
          handleClick={() => handleReset()}
        />
        <FilledButton
          title="Link Account to Profile"
          customClass={styles.profileButton}
        // type="button"
        />
      </div>

      {/* <textarea className={styles.textArea}></textarea> serviceProvider*/}
      <div className={styles.box}>
        {externalAccountData.length > 0 && (
          <Table
            tableheading={providerTableHeader}
            tabledata={externalAccountData}
            customClassTh={styles.customClassTh}
            customClassTableRow={styles.customClassTableRow}
            ButtonGroup={<DeleteIcon customClass={styles.deleteIcon} />}
            handleAction={setActionButtonValue}
          // handleGoTo={(id) => handleGoTo(id)}
          />
        )}
      </div>

      <FilledButton
        type="button"
        title="Remove the Selected Linked Account from this Profile"
        customClass={styles.removeButton}
      />
    </form>
  );
};

export default memo(ExternalAccount);
