import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Divider from "../../../../component/divider/Divider";
import FilledButton from "../../../../component/filled-button/FilledButton";
import RadioButton from "../../../../component/radio-button/RadioButton";
import TextField from "../../../../component/text-field/TextField";
import Toast from "../../../../component/toast/Toast";
import { danger, success } from "../../../../data/data";
import { clientFormValidators2 } from "../../../../formValidators/clientFormValidators2";
import useForm from "../../../../hooks/useForm";
import useScroll from "../../../../hooks/useScroll";
import { getClientProfile } from "../../../../redux/features/clientprofile/clientProfileSlice";
import {
  registerClientPage2,
  clearState,
} from "../../../../redux/features/crm/crmSlice";
import useBrokerReference from "./broker-fees-ref/brokerRef";

import styles from "./brokergefees.module.scss";
import ExternalAccount from "./ExternalAccount";

const BrokergeFees = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const { status, error, loading } = useSelector((state) => state.crm);
  const { userInfo } = useSelector((state) => state.login);
  const [showToast, setShowToast] = useState(true);
  const [isActive, setIsActive] = useState(false);
  // const [isDueDiligence, setIsDueDeligiance] = useState(false);
  // const [isAML, setIsAML] = useState(false);
  const ref = useBrokerReference();
  const [executeScroll, elRef] = useScroll();
  const { handleChange, handleSubmit, data, errors, setData } = useForm({
    ref: ref,
    validations: clientFormValidators2,
    // isSubmit: isSubmit,
    // setIsSubmit: setIsSubmit,
    onSubmit: () => handleSubmitForm(data),
  });
  useEffect(() => {
    dispatch(clearState());
    executeScroll();
    if (!location.state) {
      navigate("/crm");
    } else if (location.state?.isUpdate) {
      location.state?.userId &&
        dispatch(getClientProfile({ userId: location.state?.userId })).then(
          (res) => {
            if (res.type === "clientProfile/getClientProfile/fulfilled") {
              setIsActive(res.payload.isActive);
              // setIsDueDeligiance(res.payload.isDueDiligence);
              // setIsAML(res.payload.isAml);
              console.log("update 2", res.payload);
              setData({
                ...data,
                initialFee: res.payload.initialFee,
                annualManagementFee: res.payload.annualManagementFee,
                performanceFee: res.payload.performanceFee,
                brokerageRate: res.payload.brokerageRate,
                flatBrokerageRate: res.payload.flatBrokerageRate,
                adminMonthlyFee: res.payload.adminMonthlyFee,
                other: res.payload.other,
                dcs: res.payload.dcs ? "dcs" : res.payload.mcs ? "mcs" : "",
                PPM: res.payload.equity
                  ? "ppm"
                  : res.payload.tfsa
                    ? "tfsa"
                    : "",
                //  mcs:res.payload.mcs?"mcs":'',
                // equity:res.payload.equity?"ppm":'',
                // tfsa:res.payload.tfsa?"tfsa":'',
                isVatapplicable: res.payload.isVatapplicable
                  ? "yes"
                  : res.payload.isVatapplicable === false
                    ? "no"
                    : "",
                loadWithoutFee: res.payload.loadWithoutFee
                  ? "yes"
                  : res.payload.loadWithoutFee === false
                    ? "no"
                    : "",
              });
            }
          }
        );
    }
  }, []);

  const handleSubmitForm = (data) => {
    const payload = {
      id: location.state && location.state.userId,
      equity: data.PPM === "ppm" ? true : false,
      tfsa: data.PPM === "ppm" ? false : true,
      dcs: data.dcs === "dcs" ? true : false,
      mcs: data.dcs === "dcs" ? false : true,
      initialFee: data.initialFee,
      annualManagementFee: data.annualManagementFee,
      performanceFee: data.performanceFee,
      brokerageRate: data.brokerageRate,
      flatBrokerageRate: data.flatBrokerageRate,
      adminMonthlyFee: data.adminMonthlyFee,
      other: data.other,
      isVatapplicable: data.isVatapplicable === "yes" ? true : false,
      loadWithoutFee: data.loadWithoutFee === "yes" ? true : false,
      isActive: isActive,
      createdBy: userInfo.userDetail.id,
      // isDueDiligence: isDueDiligence,
      // isAML: isAML,
    };

    dispatch(registerClientPage2(payload)).then((res) => {
      if (res.payload?.statusCode === 200) {
        navigate("/clients");
        setData({});
      }
    });
  };

  useEffect(() => {
    if (error || status) {
      if (status === 200) {
        // setData({});
      }
      setTimeout(() => {
        dispatch(clearState());
      }, 1000);
    }
  }, [error]);
  return (
    <React.Fragment>
      {error && showToast ? (
        <Toast
          item={status === 200 ? success : danger}
          show={showToast}
          setShow={setShowToast}
          message={error}
        />
      ) : null}
      {/* <form className={styles.formDetails} onSubmit={(e) => handleSubmit(e)}> */}
      <div className={styles.formDetails} ref={elRef}>
        <div className={styles.formContainer}>
          <p className={styles.formTitle}>
            Walt Capital Brokerage Fees Equity and TFSA PPM:
          </p>
          <div className={styles.radioButtonContainer}>
            <RadioButton
              name="PPM"
              value={data.PPM ? data.PPM : ""}
              id="ppm"
              label="Equity (PPM)"
              checked={data.PPM === "ppm"}
              radioLabelClass={styles.radioButtonText}
              handleChange={handleChange("PPM")}
              error={errors.PPM}
              ref1={ref?.PPM}
              customClassError={styles.errorText}
            />
            <RadioButton
              name="PPM"
              value={data.PPM ? data.PPM : ""}
              id="tfsa"
              checked={data.PPM === "tfsa"}
              label="TFSA (PPM)"
              radioLabelClass={styles.radioButtonText}
              handleChange={handleChange("PPM")}
            />
            <div className={styles.dscMcsRadiobutton}>
              <RadioButton
                name="dcs"
                label="DCS"
                value={data.dcs ? data.dcs : ""}
                id="dcs"
                checked={data.dcs === "dcs"}
                radioLabelClass={styles.radioButtonText}
                handleChange={handleChange("dcs")}
                error={errors.dcs}
                ref1={ref?.dcs}
                customClassError={styles.errorText}
              />
              <RadioButton
                name="dcs"
                label="MCS"
                checked={data.dcs === "mcs"}
                value={data.dcs ? data.dcs : ""}
                id="mcs"
                radioLabelClass={styles.radioButtonText}
                handleChange={handleChange("dcs")}
                customClassError={styles.errorText}
              />
            </div>
          </div>
          <div className={styles.feeTypeContainer}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Initial Fee"
              placeholder="Initial Fee"
              value={data.initialFee ? data.initialFee : ""}
              handleChange={handleChange("initialFee")}
              error={errors.initialFee}
              ref1={ref?.initialFee}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Annual Management Fee"
              value={data.annualManagementFee ? data.annualManagementFee : ""}
              handleChange={handleChange("annualManagementFee")}
              error={errors.annualManagementFee}
              ref1={ref?.annualManagementFee}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Performance Fee"
              value={data.performanceFee ? data.performanceFee : ""}
              handleChange={handleChange("performanceFee")}
              error={errors.performanceFee}
              ref1={ref?.performanceFee}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Minimum Brokerage	Rate"
              value={data.brokerageRate ? data.brokerageRate : ""}
              handleChange={handleChange("brokerageRate")}
              error={errors.brokerageRate}
              ref1={ref?.brokerageRate}
            />
          </div>
          <Divider customClass={styles.divider} />
          <div className={styles.monthlyFeesContainer}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Flat Brokerage Rate"
              placeholder="Flat Brokerage Rate"
              value={data.flatBrokerageRate ? data.flatBrokerageRate : ""}
              handleChange={handleChange("flatBrokerageRate")}
              error={errors.flatBrokerageRate}
              ref1={ref?.flatBrokerageRate}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Admin Monthly Fees"
              value={data.adminMonthlyFee ? data.adminMonthlyFee : ""}
              handleChange={handleChange("adminMonthlyFee")}
              error={errors.adminMonthlyFee}
              ref1={ref?.adminMonthlyFee}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Other"
              value={data.other ? data.other : ""}
              handleChange={handleChange("other")}
              error={errors.other}
              ref1={ref?.other}
            />
          </div>
          <Divider customClass={styles.divider} />
          <div className={styles.checkContainer}>
            <div>
              <span className={styles.questionText}>Is VAT Applicable?</span>
              <div className={styles.radioContainer}>
                <RadioButton
                  name="isVatapplicable"
                  label="YES"
                  value={data.isVatapplicable ? data.isVatapplicable : ""}
                  checked={data.isVatapplicable === "yes"}
                  id="yes"
                  radioLabelClass={styles.radioButtonText}
                  handleChange={handleChange("isVatapplicable")}
                  customClassError={styles.errorText}
                />
                <RadioButton
                  name="isVatapplicable"
                  label="NO"
                  checked={data.isVatapplicable === "no"}
                  value={data.isVatapplicable ? data.isVatapplicable : ""}
                  id="no"
                  radioLabelClass={styles.radioButtonText}
                  handleChange={handleChange("isVatapplicable")}
                  customClassError={styles.errorText}
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
                    name="loadWithoutFee"
                    label="YES"
                    checked={data.loadWithoutFee === "yes"}
                    value={data.loadWithoutFee ? data.loadWithoutFee : ""}
                    id="yes"
                    radioLabelClass={styles.radioButtonText}
                    handleChange={handleChange("loadWithoutFee")}
                    customClassError={styles.errorText}
                  />
                  <RadioButton
                    name="loadWithoutFee"
                    label="NO"
                    checked={data.loadWithoutFee === "no"}
                    value={data.loadWithoutFee ? data.loadWithoutFee : ""}
                    id="no"
                    radioLabelClass={styles.radioButtonText}
                    handleChange={handleChange("loadWithoutFee")}
                    customClassError={styles.errorText}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ExternalAccount id={location.state && location.state.userId} />
        <div className={styles.formContainer1}>
          <Divider customClass={styles.divider} />
          <div className={styles.checkboxMainContainer}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="isChecked"
                className={styles.checkbox}
                value={isActive}
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <p className={styles.accountText}>This Account is Active</p>
            </div>
            {/* <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="isDueDiligence"
                className={styles.checkbox}
                value={isDueDiligence}
                checked={isDueDiligence}
                onChange={(e) => setIsDueDeligiance(e.target.checked)}
              />
              <p className={styles.accountText}>Due deligiance</p>
            </div>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="isAML"
                className={styles.checkbox}
                value={isAML}
                checked={isAML}
                onChange={(e) => setIsAML(e.target.checked)}
              />
              <p className={styles.accountText}>AML</p>
            </div>*/}
          </div>
          <div className={styles.btnGrp}>
            <div>
              <FilledButton
                title="Edit Default Fee Template"
                customClass={styles.editBtn}
              />
            </div>
            <div className={styles.buttonContainer1}>
              <FilledButton
                title="Save"
                customClass={styles.saveBtn}
                loader={loading}
                handleClick={() => {
                  handleSubmit();
                }}
              />
              <FilledButton
                title="Cancel"
                customClass={styles.cancelBtn}
                handleClick={() => navigate("/crm")}
              />
              <FilledButton
                title="Delete Account"
                customClass={styles.deleteBtn}
                handleClick={() => { }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* </form> */}
    </React.Fragment>
  );
};
export default BrokergeFees;
