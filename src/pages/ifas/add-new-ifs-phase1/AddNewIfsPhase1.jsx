import styles from "./addNewIfsPhase1.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import TextField from "../../../component/text-field/TextField";
import Divider from "../../../component/divider/Divider";
import RadioButton from "../../../component/radio-button/RadioButton";
import { useLocation, useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { ifaPhase1FormValidation } from "../../../formValidators/ifaFormValidation";
import { useRef, useState } from "react";
import { clearIfsState, createNewIfaPhase2, getIfaByIfaId } from "../../../redux/features/ifa/ifaSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../component/toast/Toast";

import { danger, success } from "../../../data/data";
import { useEffect } from "react";


const AddNewIfsPhase1 = () => {
    const ref = useRef()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.login);
    const [isActive, setIsActive] = useState(false);
    const [showToast, setShowToast] = useState(true);
    const location = useLocation()
    const {
        loading,
        ifaStatus,
        ifaError,
        ifaByIdData
    } = useSelector((state) => state.ifa)

    const handleSubmit1 = (data) => {
        //  e.preventDefault();        
        dispatch(clearIfsState());
        const payload =
        {
            ...data,
            id: location.state?.id,
            isVatapplicable: data?.isVatapplicable === "true" ? true : false,
            createdBy: userInfo?.userDetail?.id,
            initialFee: data?.initialFees,
            annualAdvisorFees: data?.annualAdvisorFees,
            performanceFee: data?.performanceFees,
            other: data?.other,
            isActive:isActive
        }

        dispatch(createNewIfaPhase2(payload))
            .then((e) => {
                if (e.type === "ifa/createNewIfaPhase2/fulfilled" &&e.payload?.status) {
                    setData([])
                    dispatch(clearIfsState())
                    navigate("/ifas")
                }
            })

    };

    const { handleChange, handleSubmit, data, errors, setData, disable } =
        useForm({
            intialDisable: {},
            validations: ifaPhase1FormValidation,
            onSubmit: () => handleSubmit1(data),
        });

    useEffect(() => {
        if (location.state?.id) {

            dispatch(getIfaByIfaId({ id: location.state?.ifaId })).then(
                (res) => {
                    if (res.type === "ifa/getIfaByIfaId/fulfilled") {
                        dispatch(clearIfsState());
                        setIsActive(res.payload?.isActive);
                        setData({
                            ...data,
                            id: location.state?.id,
                            isVatapplicable: res.payload?.isVatapplicable,
                            createdBy: userInfo?.userDetail?.id,
                            initialFees: res.payload?.initialFee,
                            annualAdvisorFees: res.payload?.annualAdvisorFees,
                            performanceFees: res.payload?.performanceFee,
                            other: res.payload?.other,
                            

                        })
                    }
                })
        }
    }, [])

    return (
        <div className={styles.addNewIFAsContainer}>
            {ifaError ? (
                <Toast
                    item={ifaStatus === 200 ? success : danger}
                    show={showToast}
                    setShow={setShowToast}
                    message={ifaError}
                />
            ) : null}
            <form
                className={styles.form2Container}
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className={styles.fieldContainer}>
                    <span className={styles.titleText}>Personal Data Continue</span>
                    <div className={styles.inputFields}>
                        <TextField
                            type="text"
                            maxLength={50}
                            label="Initial Fees"
                            ref1={ref?.initialFees}
                            customClass={styles.labelText}
                            customClassInput={styles.inputType1}
                            // placeholder="Local Company"
                            value={data.initialFees ? data.initialFees : ""}
                            handleChange={handleChange("initialFees", true)}
                            error={errors.initialFees}
                        />
                        <TextField
                            type="text"
                            maxLength={50}

                            label="Annual Advisor Fees"
                            ref1={ref?.annualAdvisorFees}
                            customClass={styles.labelText}
                            customClassInput={styles.inputType1}
                            value={data.annualAdvisorFees ? data.annualAdvisorFees : ""}
                            handleChange={handleChange("annualAdvisorFees", true)}
                            error={errors.annualAdvisorFees}
                        />
                        <TextField
                            type="text"
                            maxLength={50}

                            label="Performance Fees"
                            ref1={ref?.performanceFees}
                            customClass={styles.labelText}
                            customClassInput={styles.inputType1}
                            value={data.performanceFees ? data.performanceFees : ""}
                            handleChange={handleChange("performanceFees", true)}
                            error={errors.performanceFees}
                        />
                        <TextField
                            type="text"

                            label="Other"
                            customClass={styles.labelText}
                            customClassInput={styles.inputType1}
                            value={data.other ? data.other : ""}
                            handleChange={handleChange("other")}
                            error={errors.other}
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
                                    name="isVatapplicable"
                                    label="Yes"
                                    customClass={styles.radioCustomClass}

                                    radioLabelClass={styles.radioButtonText}
                                    value={data.isVatapplicable ? data.isVatapplicable : ""}
                                    id="true"
                                    checked={data.isVatapplicable?.toString() === "true"}
                                    handleChange={handleChange("isVatapplicable")}

                                />
                                <RadioButton
                                    name="isVatapplicable"
                                    label="No"
                                    customClass={styles.radioCustomClass}
                                    radioLabelClass={styles.radioButtonText}
                                    value={data.isVatapplicable ? data.isVatapplicable : ""}
                                    id="false"
                                    checked={data.isVatapplicable?.toString() === "false"}
                                    handleChange={handleChange("isVatapplicable")}
                                />
                            </div>
                        </div>
                    </div>
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
                    </div>
                    <div className={styles.btnGrp}>
                        <FilledButton
                            title="Save"
                            type="Submit"
                            customClass={styles.saveBtn}
                            customClassLoader={styles.customClassLoader}
                            loader={loading}
                            disabled={loading}
                        // handleClick={() => {}}
                        />
                        <FilledButton
                            title="Cancel"
                            customClass={styles.cancelBtn}
                            handleClick={() => { navigate('/ifas') }}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddNewIfsPhase1