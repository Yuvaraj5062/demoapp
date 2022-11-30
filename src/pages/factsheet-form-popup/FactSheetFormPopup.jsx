import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DividerTitle from "../../component/divider-title/DividerTitle";
import DropDown from "../../component/dropdown/DropDown";
import FilledButton from "../../component/filled-button/FilledButton";
import Loader from "../../component/loader/Loader";
import { Cross, DropdownIcon2 } from "../../component/svg-components";
import TextField2 from "../../component/text-field2/TextField2";
import TextArea from "../../component/textarea/TextArea";
import Toast from "../../component/toast/Toast";
import YearPickerV2 from "../../component/year-picker/yearPickerV2";
import {
  danger,
  possibleParticipatoryStructures,
  success
} from "../../data/data";
import { factsheetFormValidator } from "../../formValidators/factsheetFormValidator";
import useForm from "../../hooks/useForm";
import {
  clearState,
  createFactsheet,
  getFactSheetByFundId,
  updateFactSheet
} from "../../redux/features/factsheet/factSheetSlice";
import {
  emptyFundDetails,
  getAllFunds,
  getFundById
} from "../../redux/features/fundadministrator/addFunSlice";
import styles from "./factsheetformpopup.module.scss";

const FactSheetFormPopup = ({ handleClose, popupData }) => {
  const { userInfo } = useSelector((state) => state.login);
  // const [click, setClick] = useState(false);
  const [inceptionDate, setInceptionDate] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  // const [participatory, setParticipatory] = useState({
  //   id: null,
  //   title: "Select participatory structures",
  // });

  // console.log('popdate...??', popupData);

  const dispatch = useDispatch();

  // factsheet state
  const { loading, error, msg, factsheet } = useSelector(
    (state) => state.factSheet
  );

  // console.log('factsheet...??', Object.keys(factsheet).length, factsheet);

  // useform
  const { handleChange, handleSubmit, data, errors, setErrors, setData } =
    useForm({
      validations: factsheetFormValidator,
      // initialValues: Object.keys(factsheet).length > 0 ? factsheet : { fsp: 1, telephone: 1, minInvestment: 1 },
      onSubmit: () => handleFactsheet(data),
      isSubmit: isSubmit,
      setIsSubmit: setIsSubmit,
    });

  // add factsheet
  // console.log('data is', data)
  const handleFactsheet = (formData) => {
    setIsSubmit(true);
    if (popupData?.factSheet?.id?.isFactSheetCreated) {
      const payload = {
        ...data,
        id: factsheet?.id,
        fundId: popupData?.factSheet?.id?.fundId,
        updatedBy: userInfo?.userDetail?.id,
        inceptionDate: inceptionDate,
      };
      if (inceptionDate && !loading) {
        dispatch(updateFactSheet(payload)).then((e) => {
          if (e.type === "factsheet/updateFactSheet/fulfilled") {
            setData({});
            setTimeout(() => {
              popupData?.setFactSheet({ shown: false, id: "" });
            }, 3000);
            dispatch(
              getAllFunds({ data: { isActive: false }, method: "allTypeFund" })
            );
          }
        });
      }
    } else {
      const payload = {
        ...data,
        fundId: popupData?.factSheet?.id?.fundId,
        createdBy: userInfo?.userDetail?.id,
        inceptionDate: inceptionDate,
      };
      if (inceptionDate && !loading) {
        dispatch(createFactsheet(payload)).then((e) => {
          if (e.type === "factsheet/createFactsheet/fulfilled") {
            setData({});
            setTimeout(() => {
              popupData?.setFactSheet({ shown: false, id: "" });
            }, 3000);
            dispatch(
              getAllFunds({ data: { isActive: false }, method: "allTypeFund" })
            );
          }
        });
      }
    }
  };

  // reset form
  const handleReset = () => {
    setErrors({});
    setIsSubmit(false);
    setData({});
    // setParticipatory({
    //   id: null,
    //   title: "Select participatory structures",
    // });
  };

  // getfund details by id
  useEffect(() => {
    dispatch(
      getFundById({
        fundId: popupData?.factSheet?.id?.fundId,
      })
    ).then((e) => {
      if (e.type === "addFund/getFundById/fulfilled") {
        setInceptionDate(e?.payload?.inceptionDate);
      }
    });
    return () => {
      dispatch(emptyFundDetails());
      dispatch(clearState());
    };
  }, []);

  // getfactsheet by fund id
  useEffect(() => {
    if (popupData?.factSheet?.id?.isFactSheetCreated) {
      dispatch(
        getFactSheetByFundId({ fundId: popupData?.factSheet?.id?.fundId })
      );
    }
  }, [popupData?.factSheet?.id?.isFactSheetCreated]);

  // set data & dropdown init value

  useEffect(() => {
    setData(factsheet)
    // factsheet && Object.keys(factsheet).length > 0 ? setData(factsheet) : setData({ fsp: "0", telephone: "0", minInvestment: "0" })
    console.log('data', data)
    // if (factsheet?.participatoryStructure) {
    //   setParticipatory({
    //     id: 1,
    //     title: factsheet?.participatoryStructure,
    //   });
    // } else {
    //   setParticipatory({
    //     id: null,
    //     title: "Select participatory structures",
    //   });
    // }
  }, [factsheet]);
  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     if (click && ref.current && !ref.current.contains(e.target)) {
  //       setClick(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", checkIfClickedOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //   };
  // }, [click]);
  return (
    <>
      {msg || error ? (
        <Toast item={msg ? success : danger} message={msg ? msg : error} />
      ) : null}
      <form
        className={styles.factsheetContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
      >
        <div className={styles.addFundCross}>
          {popupData?.factSheet?.id?.isFactSheetCreated
            ? "Edit Fact Sheet"
            : "Create New Factsheet"}
          <span className={styles.crossIcon}>
            <Cross
              fillColor="#FFFFFF"
              handleClose={() =>
                popupData?.setFactSheet({ shown: false, id: "" })
              }
            />
          </span>
        </div>
        <div className={styles.formData}>
          <DividerTitle title="Investment objective:" />
          <TextArea
            label="Investment objective:"
            customTextAreaContainer={styles.textAreaContainer}
            errorContainer={styles.errorContainer}
            inputType={styles.input}
            handleChange={handleChange("investmentObjective")}
            value={data.investmentObjective ? data.investmentObjective : ''}
            error={errors?.investmentObjective}
          />
          <DividerTitle title="Key Facts" />
          <TextField2
            type="text"
            label="Portfolio manager:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name="portfolioManager"
            handleChange={handleChange("portfolioManager")}
            value={data.portfolioManager ? data.portfolioManager : ''}
            error={errors?.portfolioManager}
          />
          <TextField2
            type="text"
            label="Email:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("email")}
            value={data.email ? data.email : ''}
            error={errors?.email}
          />
          <TextField2
            type="text"
            label="FSP Number:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("fsp", true)}
            // value={data.fsp ? data.fsp : "0"}
            value={data.fsp ? data.fsp : ''}
            error={errors?.fsp}
          />
          <TextField2
            type="text"
            label="Tel:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("telephone")}
            value={data.telephone ? data.telephone : ''}
            error={errors?.telephone}
          />
          <div className={styles.datePickerContainerMain}>
            <label className={styles.title}> Inception Date:</label>
            <div className={styles.datePick}>
              <YearPickerV2
                customClass={
                  !inceptionDate && isSubmit
                    ? styles.datePickerContainerError
                    : styles.datePickerContainer
                }
                name="inceptionDate"
                startDate={inceptionDate}
                // handleChange={(e) => { setInceptionDate(e.target.value) }}
                readOnly={true}
              />

              {!inceptionDate && isSubmit && (
                <span className={styles.error}>
                  Please Select Inception Date
                </span>
              )}
            </div>
          </div>
          <TextField2
            type="text"
            label="Sector:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("sector")}
            value={data.sector ? data.sector : ''}
            error={errors?.sector}
          />
          <TextField2
            type="text"
            label="Target returns:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("target")}
            value={data.target ? data.target : ''}
            error={errors?.target}
          />
          <TextField2
            type="text"
            label="Possible participatory
            structures:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("participatoryStructure")}
            value={data.participatoryStructure ? data.participatoryStructure : ''}
            error={errors?.participatoryStructure}
          />
          {/* <div className={styles.selectFieldContainer}>
            <p className={styles.label}>Possible participatory structures:</p>
            <div
              className={styles.selectlistContent}
              ref={ref3}
              onClick={() => setClick((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContainerItems}>
                  <span className={styles.dropdownContent}>
                    {" "}
                    {participatory.title}
                  </span>
                  <div className={styles.dropdownIconContainer}>
                    <div className={styles.dropdownIcon}>
                      <DropdownIcon2 fillColor="#FFFFFF" />
                    </div>
                  </div>
                </div>
                {click ? (
                  <DropDown
                    dropdownItems={possibleParticipatoryStructures}
                    customClassForActiveItems={styles.dropdownText}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                    setSelected={setParticipatory}
                  />
                ) : null}
                {!participatory.id && isSubmit && (
                  <span className={styles.error}>
                    Please select possible participatory structure
                  </span>
                )}
              </div>
            </div>
          </div> */}
          <TextField2
            type="text"
            label="Minimum investment:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("minInvestment", true)}
            value={data.minInvestment ? data.minInvestment : ''}
            error={errors?.minInvestment}
          />
          <TextField2
            type="text"
            label="Recommended Investment:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("recommended")}
            value={data.recommended ? data.recommended : ""}
            error={errors?.recommended}
          />
          <DividerTitle title="Fees and calculations" />
          <TextField2
            type="text"
            label="Base Fees:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("baseFee", true)}
            value={data.baseFee ? data.baseFee : ''}
            error={errors?.baseFee}
          />
          <TextField2
            type="text"
            label="Annual Fees[Unit A](%)"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("annualFeesUnitA", true)}
            value={data.annualFeesUnitA ? data.annualFeesUnitA : ''}
            error={errors?.annualFeesUnitA}
            percentage={data.annualFeesUnitA ? true : false}
          />
          <TextField2
            type="text"
            label="Annual Fees[Unit B](%)"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("annualFeesUnitB", true)}
            value={data.annualFeesUnitB ? data.annualFeesUnitB : ''}
            error={errors?.annualFeesUnitB}
            percentage={data.annualFeesUnitB ? true : false}

          />
          {/* <TextField2
            type="text"
            label="Annual Fees[Unit C](%)"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("annualFeesUnitC", true)}
            value={data.annualFeesUnitC ? data.annualFeesUnitC : ''}
            error={errors?.annualFeesUnitC}
            percentage={data.annualFeesUnitC ? true : false}

          /> */}
          {/* <TextField2
            type="text"
            label="Performance Fee Benchmark:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("performanceFee")}
            value={data?.performanceFee}
            error={errors?.performanceFee}
          /> */}
          <TextArea
            label="Fee hurdle:"
            customTextAreaContainer={styles.textAreaContainer}
            errorContainer={styles.errorContainer}
            inputType={styles.input}
            handleChange={handleChange("feeHurdle")}
            value={data.feeHurdle ? data.feeHurdle : ''}
            error={errors?.feeHurdle}
          />
          <TextField2
            type="text"
            label="Performance Fees [Unit A](%)"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("performanceFeesUnitA", true)}
            value={data.performanceFeesUnitA ? data?.performanceFeesUnitA : ""}
            error={errors?.performanceFeesUnitA}
            percentage={data.performanceFeesUnitA ? true : false}

          />
          <TextField2
            type="text"
            label="Performance Fees [Unit B](%)"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("performanceFeesUnitB", true)}
            value={data.performanceFeesUnitB ? data.performanceFeesUnitB : ""}
            error={errors?.performanceFeesUnitB}
            percentage={data.performanceFeesUnitB ? true : false}

          />
          {/* <TextField2
            type="text"
            label="Performance Fees [Unit C](%)"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            handleChange={handleChange("performanceFeesUnitC", true)}
            value={data.performanceFeesUnitC ? data.performanceFeesUnitC : ""}
            error={errors?.performanceFeesUnitC}
            percentage={data.performanceFeesUnitC ? true : false}

          /> */}
          {/* <TextArea
            label="Sharing ratio:"
            customTextAreaContainer={styles.textAreaContainer}
            errorContainer={styles.errorContainer}
            inputType={styles.input}
            handleChange={handleChange("sharingRatio")}
            value={data?.sharingRatio}
            error={errors?.sharingRatio}
          /> */}
          <TextArea
            label="Fee example:"
            customTextAreaContainer={styles.textAreaContainer}
            errorContainer={styles.errorContainer}
            inputType={styles.input}
            handleChange={handleChange("feeExample")}
            value={data.feeExample ? data.feeExample : ""}
            error={errors?.feeExample}
          />
          <TextArea
            label="Method of calculating: "
            customTextAreaContainer={styles.textAreaContainer}
            errorContainer={styles.errorContainer}
            inputType={styles.input}
            handleChange={handleChange("method")}
            value={data.method ? data.method : ''}
            error={errors?.method}
          />
          <DividerTitle title="Short Commentary" />
          <TextArea
            label="Short Commentary:"
            customTextAreaContainer={styles.textAreaContainer}
            errorContainer={styles.errorContainer}
            inputType={styles.input}
            handleChange={handleChange("shortCommentary")}
            value={data.shortCommentary ? data.shortCommentary : ''}
            error={errors?.shortCommentary}
          />
          <TextArea
            label="Disclaimer and Risk Disclosure:"
            customTextAreaContainer={styles.textAreaContainer}
            errorContainer={styles.errorContainer}
            inputType={styles.input}
            handleChange={handleChange("disclaimer")}
            value={data.disclaimer ? data.disclaimer : ''}
            error={errors?.disclaimer}
          />
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <FilledButton
              title="Reset"
              type="button"
              customClass={styles.addButton}
              handleClick={() => {
                handleReset();
              }}
            />
            <FilledButton
              title={loading ? <Loader /> : popupData?.factSheet?.id?.isFactSheetCreated
                ? "Update"
                : "Create New Factsheet"}
              type="submit"
              customClass={styles.addButton}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default FactSheetFormPopup;
