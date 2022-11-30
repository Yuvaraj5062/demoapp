import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../../component/dropdown/DropDown";
import FilledButton from "../../../component/filled-button/FilledButton";
import Rating from "../../../component/rating/Rating";
import {
  AddSquare,
  Cross,
  DeleteBlockIcon,
  DropdownIcon2
} from "../../../component/svg-components";
import TextField from "../../../component/text-field/TextField";
import TextField2 from "../../../component/text-field2/TextField2";
import TextArea from "../../../component/textarea/TextArea";
import YearPickerV2 from "../../../component/year-picker/yearPickerV2";
import {
  Selectcurrencydata,
  Vatapplicabledata,
  VatapplicabledataWithoutYes
} from "../../../data/data";
import {
  addFundInitalPayload,
  addFundInitalPayloadErrors
} from "../../../helpers/addFundInitPayload";
import {
  addFund,
  updateFund
} from "../../../redux/features/fundadministrator/addFunSlice";
import {
  changeToNum,
  isDuplicateKeyExists,
  isWordInArray,
  postiveNumber
} from "../../../utils/utils";
import styles from "./addfund.module.scss";

const AddFund = ({ handleClose, popupData }) => {
  const dispatch = useDispatch();
  const ref3 = useRef();
  const [click, setClick] = useState(false);
  const [extraFields, setExtraFields] = useState([]);
  const [dob, setDob] = useState();
  const [spouseDob, setSpouseDob] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({ ...addFundInitalPayload });
  const [formError, setFormError] = useState({});
  const [openCurrency, setOpenCurrency] = useState(false);
  const { fundDetail, loading } = useSelector((state) => state.addFund);
  const ref = useRef();
  const ref1 = useRef();

  const addExtraField = () => {
    const newId = String(Date.now()).slice(5, 10);
    const t = { rowId: newId, label: "", value: "" };

    setExtraFields([...extraFields, { ...t }]);
  };

  const handleDelete = (item) => {
    const newFields = extraFields.filter((field) => field.rowId !== item.rowId);
    setExtraFields(newFields);
  };

  const handleEditLabelValue = ({ e, item, method }) => {
    const newFields = extraFields.map((field) => {
      if (field.rowId === item.rowId) {
        if (method === "label") {
          field = {
            ...field,
            label: e.target.value.trimLeft(),
          };
        }
        if (method === "fieldValue") {
          field = {
            ...field,
            value: e.target.value.trimLeft(),
          };
        }
      }

      return field;
    });

    setExtraFields(newFields);
  };

  const handleChange = (e, isPer) => {
    // handeling NON_HTML fields
    if (!e.target) {
      const { key, value } = e;

      if (key === "isVatapplicable") {
        setFormData({ ...formData, [key]: value });
        formData[key] = value; // check this later

        if (value === "YES") {
          delete formError["vat"];
          setFormData({ ...formData, vat: postiveNumber(15) });
        } else {
          setFormData({ ...formData, vat: 0 });
        }

        return;
      }

      if (key === "currency" && value === "USD" && !fundDetail?.id) {
        setFormData({
          ...addFundInitalPayload,
          [key]: "USD",
          isVatapplicable: "NO",
        });

        return;
      }

      setFormData({ ...formData, [key]: value });
    }

    // handlling default HTML fields
    if (e.target) {
      const key = e.target.id || e.target.name;
      const value = e.target.value;
      const type = e.target.type;

      if (key === "vat") {
        const newValue = value > 100 ? formData[key] : value;
        setFormData({
          ...formData,
          vat: postiveNumber(newValue),
        });

        return;
      }

      if (isPer) {
        const newValue = value > 100 ? formData[key] : value;
        setFormData({
          ...formData,
          [key]: type === "number" ? postiveNumber(newValue) : newValue,
        });

        return;
      }

      setFormData({
        ...formData,
        [key]: type === "number" ? postiveNumber(value) : value.trimLeft(),
      });
    }
  };

  const handleSubmit = ({ method }) => {
    const errors = {};

    // check static field errors
    for (var i in formData) {
      if (!formData[i] && formData[i] !== 0) {
        if (i === "vat") {
          formData["isVatapplicable"] === "NO" && delete formError["vat"];
        } else {
          errors[i] = addFundInitalPayloadErrors[i];
        }
      }

      if (formData[i] < 1 && i === "unitStartingPrice") {
        errors[i] = `Unit starting price should be grater than 1`;
      }
    }

    // check dynamic fields errors
    for (var i of extraFields) {
      const { rowId, label, value } = i;

      const t = isDuplicateKeyExists(extraFields, label);

      if (t) {
        errors[`${t}label`] = `duplicate field`;
      }

      if (!value) {
        errors[`${rowId}value`] = "Please provide valid value";
      }
      if (rowId && !label) {
        errors[`${rowId}label`] = "Please provide valid label";
      }
    }

    const newObj = changeToNum({ ...formData });
    const dataToSend = {
      ...newObj,
      fundDynamicField: [...extraFields],
    };

    setFormError(errors);

    // case method is add
    Object.keys(errors).length === 0 &&
      method === "add" &&
      dispatch(addFund({ ...dataToSend })).then((e) => {
        if (e.type === "addFund/addFund/fulfilled") {
          handleClose();
          popupData?.setFactSheet({ shown: true, id: e.payload });
        }
      });

    //  case method is edit
    Object.keys(errors).length === 0 &&
      method === "edit" &&
      dispatch(updateFund({ ...dataToSend })).then((e) => {
        if (e.type === "addFund/updateFund/fulfilled") {
          // dispatch(getFundById({ fundId: e.payload.fundId }));
          handleClose();
          popupData?.setFactSheet({ shown: true, id: e.payload });
        }
      });
  };

  const handleReset = () => {
    setFormData({ ...addFundInitalPayload });
    setExtraFields([]);
    setFormError({});
  };

  useEffect(() => {
    // setting formData of fund being edited
    Object.entries(fundDetail).length > 0 &&
      fundDetail?.id &&
      setFormData({
        ...fundDetail,
        isVatapplicable: fundDetail.isVatapplicable ? "YES" : "NO",
        vat: fundDetail.isVatapplicable ? fundDetail.vat : 0,
        fundId: fundDetail.id,
      });

    // extrafields while editing fund
    setExtraFields([...fundDetail?.fundDynamicField]);

    return () => handleReset();
  }, [fundDetail]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click && ref.current && !ref.current.contains(e.target)) {
        setClick(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (openCurrency && ref1.current && !ref1.current.contains(e.target)) {
        setOpenCurrency(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openCurrency]);

  return (
    <div
      id="dropwodnclose"
      className={styles.addFundContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.addFundCross}>
        {fundDetail?.id ? `Edit Fund` : ` Create New Fund`}
        <span className={styles.crossIcon}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </span>
      </div>

      <div className={styles.fundData}>
        <div className={styles.textFieldFirst}>
          <div className={styles.textFieldTitle}>Fund Risk Rating:</div>

          <div className={styles.ratingContainer}>
            <div className={styles.textFieldLeft}>
              {[1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <Rating
                    key={item}
                    customClass={styles.textFieldBox}
                    value={item}
                    fundRating={formData?.fundRiskRating}
                    handleChange={(e) => handleChange(e)}
                  />
                );
              })}
            </div>
            <span className={styles.error}>
              {formError && formError?.fundRiskRating}
            </span>
          </div>
        </div>

        <div className={styles.selectFieldContainer1}>
          <p className={styles.label}> Select Currency ( R/ $ ): </p>
          <div
            className={styles.selectlistContent}
            ref={ref1}
            onClick={() =>
              !fundDetail?.id && setOpenCurrency((prevState) => !prevState)
            }
          >
            <div className={styles.dropdownContainer}>
              <div className={styles.dropdownContainerItems}>
                <span className={styles.dropdownContent}>
                  {formData.currency}
                </span>

                {/*  dynamically hide this container on edit fund */}
                <div className={styles.dropdownIconContainer}>
                  <div className={styles.dropdownIcon}>
                    {<DropdownIcon2 fillColor="#FFFFFF" />}
                  </div>
                </div>
              </div>
              <div>
                {openCurrency ? (
                  <DropDown
                    dropdownItems={
                      formData?.fundId
                        ? [
                            {
                              title: formData.currency,
                            },
                          ]
                        : Selectcurrencydata
                    }
                    customClassForActiveItems={styles.dropdownText}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                    setSelected={(item, e) =>
                      handleChange({ key: "currency", value: item.title })
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.selectFieldContainer}>
          <p className={styles.label}>VAT Applicable? </p>
          <div className={styles.selectist}>
            <div
              className={styles.selectlistContent}
              ref={ref}
              onClick={() => setClick((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContainerItems}>
                  <span className={styles.dropdownContent}>
                    {formData.isVatapplicable || "Select"}
                  </span>
                  <div className={styles.dropdownIconContainer}>
                    <div className={styles.dropdownIcon}>
                      <DropdownIcon2 fillColor="#FFFFFF" />
                    </div>
                  </div>
                </div>
                <div>
                  {click ? (
                    <DropDown
                      dropdownItems={
                        formData.currency === "USD"
                          ? VatapplicabledataWithoutYes
                          : Vatapplicabledata
                      }
                      customClassForActiveItems={styles.dropdownText}
                      customClassForContent={styles.dropdownListContent}
                      customClassForItems={styles.dropdownListItems}
                      setSelected={(item) =>
                        handleChange({
                          key: "isVatapplicable",
                          value: item.title,
                        })
                      }
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <span className={styles.error}>
              {formError && formError?.isVatapplicable}
            </span>
          </div>
        </div>
        {formData.isVatapplicable === "YES" && (
          <div className={styles.managementFeeContainer}>
            <TextField2
              label="VAT %"
              name="vat"
              // max={100}
              isPercentage={true}
              type="number"
              value={formData?.vat}
              // customclassContainer={styles.mainContainer}
              inputType={styles.inputType}
              handleChange={(e) => handleChange(e, "percentageField")}
            />

            {formData.vat ? (
              <div>
                <span className={styles.percentage}> % </span>
              </div>
            ) : null}

            <span className={styles.error}>{formError && formError?.VAT} </span>
          </div>
        )}
        <TextArea
          label="Fund Name:"
          name="fundName"
          value={formData?.fundName || ""}
          handleChange={(e) => handleChange(e)}
          inputType={styles.input}
          customTextAreaContainer={styles.textArea}
          error={formError && formError.fundName}
        />

        <TextArea
          label="Fund Philosophy:"
          name="fundPhilosophy"
          value={formData?.fundPhilosophy || ""}
          handleChange={(e) => handleChange(e)}
          inputType={styles.input}
          customTextAreaContainer={styles.textArea}
          error={formError && formError.fundPhilosophy}
        />

        <TextArea
          label="Pricing Inputs:"
          error={formError && formError?.pricingInputs}
          disabled={formData?.fundId && true}
          inputType={styles.input}
          customTextAreaContainer={styles.textArea}
          name="pricingInputs"
          placeholder={"Bank, Stock, Cash Account"}
          value={formData?.pricingInputs}
          handleChange={(e) => handleChange(e)}
        />
        <div className={styles.datePickerContainerMain}>
          <label className={styles.title}> Inception Date:</label>
          <div className={styles.datePick}>
            <YearPickerV2
              customClass={
                !dob && isSubmit
                  ? styles.datePickerContainerError
                  : styles.datePickerContainer
              }
              name="inceptionDate"
              startDate={formData?.inceptionDate}
              disabled={formData?.fundId && true}
              handleChange={(e) => handleChange(e)}
            />

            {!spouseDob && isSubmit && (
              <span className={styles.error}>Please Select Spouse's DOB</span>
            )}
            <span className={styles.error}>
              {formError && formError?.inceptionDate}
            </span>
          </div>
        </div>

        <TextField2
          type={"number"}
          label="Unit Starting Price(R):"
          name="unitStartingPrice"
          value={formData?.unitStartingPrice}
          error={formError && formError?.unitStartingPrice}
          disabled={formData?.fundId && true}
          customclassContainer={styles.mainContainer}
          inputType={styles.inputType}
          handleChange={(e) => handleChange(e)}
        />

        {/* new fields start here */}

        <div className={styles.managementFeeContainer}>
          <TextField2
            type={"number"}
            label="Management Fee[Unit A](%)"
            name="managementFeeA"
            max={100}
            value={formData.managementFeeA}
            error={formError && formError?.managementFeeA}
            inputType={styles.inputType}
            handleChange={(e) => handleChange(e, "percentageField")}
          />
          {formData.managementFeeA ? (
            <span className={styles.percentage}> % </span>
          ) : null}
        </div>

        <div className={styles.managementFeeContainer}>
          <TextField2
            label="Performance Fee[Unit A](%)"
            type={"number"}
            name="performanceFeeA"
            value={formData?.performanceFeeA}
            max={100}
            error={formError && formError?.performanceFeeA}
            handleChange={(e) => handleChange(e, "percentageField")}
            // customclassContainer={styles.mainContainer}
            inputType={styles.inputType}
          />
          {formData.performanceFeeA ? (
            <div>
              <span className={styles.percentage}> % </span>
            </div>
          ) : null}
        </div>

        <div className={styles.managementFeeContainer}>
          <TextField2
            type={"number"}
            label="Management Fee[Unit B](%)"
            name="managementFeeB"
            max={100}
            value={formData.managementFeeB}
            error={formError && formError?.managementFeeB}
            inputType={styles.inputType}
            handleChange={(e) => handleChange(e, "percentageField")}
          />
          {formData.managementFeeB ? (
            <span className={styles.percentage}> % </span>
          ) : null}
        </div>

        {/* <div className={styles.managementFeeContainer}>
          <TextField2
            type={"number"}
            label="Management Fee[Unit C](%)"
            name="managementFeeC"
            max={100}
            value={formData.managementFeeC}
            error={formError && formError?.managementFeeC}
            inputType={styles.inputType}
            handleChange={(e) => handleChange(e, "percentageField")}
          />
          {formData.managementFeeC ? (
            <span className={styles.percentage}> % </span>
          ) : null}
        </div> */}

        {/* new fields end */}

        <div className={styles.managementFeeContainer}>
          <TextField2
            label="Performance Fee[Unit B](%)"
            type={"number"}
            name="performanceFeeB"
            value={formData?.performanceFeeB}
            max={100}
            error={formError && formError?.performanceFeeB}
            handleChange={(e) => handleChange(e, "percentageField")}
            // customclassContainer={styles.mainContainer}
            inputType={styles.inputType}
          />
          {formData.performanceFeeB ? (
            <div>
              <span className={styles.percentage}> % </span>
            </div>
          ) : null}
        </div>

        {/* <div className={styles.managementFeeContainer}>
          <TextField2
            label="Performance Fee[Unit C](%)"
            type={"number"}
            name="performanceFeeC"
            value={formData?.performanceFeeC}
            max={100}
            error={formError && formError?.performanceFeeC}
            handleChange={(e) => handleChange(e, "percentageField")}
            // customclassContainer={styles.mainContainer}
            inputType={styles.inputType}
          />
          {formData.performanceFeeC ? (
            <div>
              <span className={styles.percentage}> % </span>
            </div>
          ) : null}
        </div> */}

        <TextField2
          label="Compliance Fee:"
          type={"number"}
          name="complianceFee"
          value={formData.complianceFee}
          error={formError && formError?.complianceFee}
          handleChange={(e) => handleChange(e)}
          customclassContainer={styles.mainContainer}
          inputType={styles.inputType}
        />

        <TextField2
          label="Trustees Fee"
          type={"number"}
          name="trusteesFee"
          value={formData?.trusteesFee}
          error={formError && formError?.trusteesFee}
          handleChange={(e) => handleChange(e)}
          customclassContainer={styles.mainContainer}
          inputType={styles.inputType}
        />

        <TextField2
          label="Pro Rata Audit Fee (R p.a.):"
          customClass={styles.title}
          type={"number"}
          name="auditFee"
          value={formData?.auditFee}
          handleChange={(e) => handleChange(e)}
          error={formError && formError?.auditFee}
          customclassContainer={styles.mainContainer}
          inputType={styles.inputType}
        />

        {/* extraFields while adding/editing new fund */}
        {extraFields.map((item, index) => {
          const { rowId, label, value } = item;
          return (
            <div className={styles.blockContainer} key={rowId}>
              <TextField
                value={label}
                placeholder={"LabelName"}
                customClassInput={styles.newBlockInput}
                error={formError && formError[`${rowId}label`]}
                handleChange={(e) => {
                  handleEditLabelValue({ e, item, method: "label" });
                }}
              />
              <div className={styles.iconContainer}>
                <TextField
                  value={
                    isWordInArray({ label }) ? postiveNumber(value) : value
                  }
                  type={isWordInArray({ label }) ? "number" : "text"}
                  placeholder={isWordInArray({ label }) ? "numeric value" : ""}
                  customClassInput={styles.customInput}
                  error={formError && formError[`${rowId}value`]}
                  handleChange={(e) => {
                    handleEditLabelValue({ e, item, method: "fieldValue" });
                  }}
                />
                <span className={styles.iconData}>
                  <DeleteBlockIcon
                    customClass={styles.icon}
                    handleClick={() => handleDelete(item)}
                  />
                </span>
              </div>
            </div>
          );
        })}

        <FilledButton
          title="Add Block"
          icon={<AddSquare fillColor="#000000" />}
          iconCustomClass={styles.iconCustomClass}
          titleCustomClass={styles.titleCustomClass}
          customClass={styles.addFieldButton}
          handleClick={() => {
            addExtraField();
          }}
        />
      </div>

      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <FilledButton
            title="Reset"
            customClass={styles.addButton}
            handleClick={() => {
              handleReset();
            }}
          />

          {popupData?.currFund?.fundId ? (
            <FilledButton
              title="Update"
              customClass={styles.addButton}
              handleClick={() => {
                handleSubmit({ method: "edit" });
              }}
            />
          ) : (
            <FilledButton
              title="Create Fund"
              customClass={styles.addButton}
              handleClick={() => {
                handleSubmit({ method: "add" });
              }}
              loader={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default AddFund;
