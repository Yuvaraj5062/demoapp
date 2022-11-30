import { useEffect, useState, useRef } from "react";
import styles from "./editclienttransaction.module.scss";
import FilledButton from "../../../../component/filled-button/FilledButton";
import { Cross, DropdownIcon2 } from "../../../../component/svg-components";
import DropDown from "../../../../component/dropdown/DropDown";
import {
  tabledata,
  buySell,
  clientsDropdown,
  ifaDropDown,
  allocateToDropdown,
  success,
  danger,
  unitType,
} from "../../../../data/data";
import RadioButton from "../../../../component/radio-button/RadioButton";
import TextField2 from "../../../../component/text-field2/TextField2";
import useForm from "../../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { clientTransationValidator, clientTransationValidator1, clientTransationValidator2 } from "../../../../formValidators/clientTransactionValidator";
import {
  clearState,
  createClientTransaction,
  fetchClientList,
  fetchFundForClientTransaction,
  fetchIfaByClientID,
  getClientTransactionDetailByClientID,
} from "../../../../redux/features/clienttransaction/clientTransactionSlice";
import Toast from "../../../../component/toast/Toast";
import YearPickerV2 from "../../../../component/year-picker/yearPickerV2";

const EditClientTransaction = ({ handleClose, popupData }) => {
  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const dispatch = useDispatch();
  const { clientList, fund, msg, error, isLoading, ifa, clientTransactionDetails } = useSelector(
    (state) => state.clientTransaction
  );
  const [click, setClick] = useState(false);
  const [ifaOpen, setIfaOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [allocateOpen, setAllocateOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  // const { ifaDropdownData } = useSelector((state) => state.crm);
  const [ifas, setIfas] = useState({});
  const [allocateTo, setAllocateTo] = useState(fund?.allocatedLists[0] || "");
  const [transactionType, setTransationType] = useState(buySell[0].title);

  const { currSelectedFund } = useSelector((state) => state.addFund);
  const { userInfo } = useSelector((state) => state.login);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [client, setClients] = useState({});
  useEffect(() => {
    if (clientList.length > 0) {
      setClients(clientList[0]);
    }
  }, [clientList]);
  useEffect(() => {
    if (ifa.length > 0) {
      setIfas(ifa[0]);
    }
  }, [ifa]);
  useEffect(() => {
    dispatch(fetchClientList());
  }, []);
  useEffect(() => {
    client &&
      client.userId &&
      dispatch(
        fetchIfaByClientID({
          clientId: client.userId,
        })
      );
    dispatch(
      getClientTransactionDetailByClientID({
        clientId: client.userId,
        fundId: currSelectedFund?.fundId
      })
    );

  }, [client, client.userId]);

  useEffect(() => {
    if (currSelectedFund) {
      dispatch(
        fetchFundForClientTransaction({
          fundId: currSelectedFund?.fundId,
        })
      ).then((e) => {
        if (
          e.type === "clienttransaction/fetchFundForClientTransaction/fulfilled"
        ) {
          setData({ ...data, currency: e.payload.currency });
          setAllocateTo(e?.payload?.allocatedLists[0]);
        }
      });
    }
  }, [currSelectedFund]);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click) {
        if (click && ref3.current && !ref3.current.contains(e.target)) {
          setClick(false);
        }
      } else if (ifaOpen) {
        if (ifaOpen && ref1.current && !ref1.current.contains(e.target)) {
          setIfaOpen(false);
        }
      } else if (buyOpen) {
        if (buyOpen && ref2.current && !ref2.current.contains(e.target)) {
          setBuyOpen(false);
        }
      } else {
        if (allocateOpen && ref.current && !ref.current.contains(e.target)) {
          setAllocateOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click, ifaOpen, allocateOpen, buyOpen]);
  // console.log('fund is ...', fund);
  const handleClientTransation = () => {
    const payload = {
      ...data,
      fund: currSelectedFund?.fundId,
      // fundName: currSelectedFund?.fundName,
      client: client?.userId,
      ifa: ifas?.id || 0,
      transactionType: transactionType,
      transactionDate: transactionDate,
      unitPrice: fund?.unitStartingPrice || 0,
      allocateTo: allocateTo,
      createdBy: userInfo?.userDetail?.id,
    };
    if (!isLoading) {
      dispatch(createClientTransaction(payload)).then((e) => {
        if (e.type === "clienttransaction/createClientTransaction/fulfilled") {
          setData({});
          setTimeout(() => {
            handleClose();
          }, 3000);
        }
      });
    } else {
      return;
    }
  };
  const {
    handleChange,
    handleSubmit,
    data,
    errors,
    setErrors,
    setData,
    change,
    setChange,
  } = useForm({
    validations: transactionType === "Buy" ? clientTransationValidator2 : clientTransationValidator1,
    initialValues: { currency: fund?.currency ? fund?.currency : "" },
    onSubmit: () => handleClientTransation(data),
    isSubmit: isSubmit,
    setIsSubmit: setIsSubmit,
    compareValue: { value1: clientTransactionDetails?.noOfUnit, value2: fund?.unitStartingPrice },
  });
  useEffect(() => {
    return () => {
      dispatch(clearState({ isClear: false }));
    };
  }, []);
  useEffect(() => {
    if (data.currency && fund?.unitStartingPrice) {
      if (data.currency && data.currency === "Units") {
        data.numberOfUnits
          ? setData({
            ...data,
            transactionAmount: (
              data.numberOfUnits * fund.unitStartingPrice
            ),
            // transactionAmount: (
            //   data.numberOfUnits * fund.unitStartingPrice
            // ).toLocaleString("fullwide", { useGrouping: false }),
          })
          : setData({ ...data, transactionAmount: "" });
      } else {
        data.transactionAmount
          ? setData({
            ...data,
            numberOfUnits: (
              data.transactionAmount / fund.unitStartingPrice
            ),
          })
          : setData({ ...data, numberOfUnits: "" });
      }
    }
  }, [
    data.currency,
    data.numberOfUnits,
    data.transactionAmount,
    fund?.unitStartingPrice,
  ]);
  useEffect(() => {
    ifas?.ifa === "None" &&
      setData({ ...data, ifaupFrontFee: "0", ifaAnnualFee: "0" });
  }, [ifas]);
  useEffect(() => {
    if (change) {
      setData({ ...data, numberOfUnits: "", transactionAmount: "" });
    }
  }, [change])

  useEffect(() => {
    if (transactionType === "Buy") {
      setData({ ...data, currency: fund?.currency || '' })
    }
  }, [transactionType]);


  useEffect(() => {
    if (clientTransactionDetails?.isFirstTransaction) {
      setTransationType("Buy")
    }
  }, [clientTransactionDetails?.isFirstTransaction])

  useEffect(() => {
    if (data.currency === "Units") {
      setData({ ...data, numberOfUnits: clientTransactionDetails?.noOfUnit })
    }
  }, [data.currency]);


  return (
    <>
      {msg || error ? (
        <Toast item={msg ? success : danger} message={msg ? msg : error} />
      ) : null}
      <form
        className={styles.modalMainContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
      >
        <div className={styles.modalTitle}>
          <span>
            {popupData?.type === "edit"
              ? "Edit Client Transaction"
              : "Create Client Transaction"}
          </span>
          <span className={styles.crossIcon}>
            <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
          </span>
        </div>

        <div className={styles.table}>
          <TextField2
            type="text"
            label="Fund name:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name="fundName"
            disabled={true}
            // handleChange={handleChange("portfolioManager")}
            value={currSelectedFund?.fundName}
          // error={errors?.portfolioManager}
          />
          <div className={styles.selectFieldContainer}>
            <p className={styles.label}>Client: </p>
            <div
              className={styles.selectlistContent}
              ref={ref3}
              onClick={() => setClick((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContainerItems}>
                  <span className={styles.dropdownContent}>
                    {clientList.length === 0
                      ? "Select Client"
                      : `${client?.clientAccNo}.  ${client?.name}`}
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
                      dropdownItems={clientList}
                      customClassForContent={styles.dropdownListContentBuy}
                      customClassForItems={styles.dropdownListItems}
                      setSelected={setClients}
                      keyName="name"
                      key2="clientAccNo"
                    />
                  ) : null}
                  {/* {!client.id && isSubmit && (
                  <span className={styles.error}>
                    Please select client
                  </span>
                )} */}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.selectFieldContainer}>
            <div className={styles.label}>IFA: </div>
            <div
              className={styles.selectlistContent}
              onClick={() => setIfaOpen((prevState) => !prevState)}
              ref={ref1}
            >
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContainerItems}>
                  <span className={styles.dropdownContent}>
                    {ifa.length === 0 ? "Select IFA" : ifas.ifa}
                  </span>
                  <div className={styles.dropdownIconContainer}>
                    <div className={styles.dropdownIcon}>
                      <DropdownIcon2 fillColor="#FFFFFF" />
                    </div>
                  </div>
                </div>
                <div>
                  {ifaOpen ? (
                    <DropDown
                      dropdownItems={ifa}
                      customClassForContent={styles.dropdownListContentBuy}
                      customClassForItems={styles.dropdownListItems}
                      setSelected={setIfas}
                      keyName="ifa"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <TextField2
            type="text"
            label="IFA upfront fee(%):"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name="ifaUpfrontfee"
            handleChange={handleChange("ifaupFrontFee", true)}
            value={data?.ifaupFrontFee}
            error={errors?.ifaupFrontFee}
            percentage={data.ifaupFrontFee}
            disabled={ifas.ifa === "None" ? true : false}
          />
          <TextField2
            type="text"
            label="IFA annual fee(% p.a):"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name="ifaAnnualFee"
            handleChange={handleChange("ifaAnnualFee", true)}
            value={data?.ifaAnnualFee}
            error={errors?.ifaAnnualFee}
            percentage={data.ifaAnnualFee}
            disabled={ifas.ifa === "None" ? true : false}
          />

          <div className={styles.selectFieldContainer}>
            <div className={styles.label}>Buy / Sell: </div>
            <div
              className={styles.selectlistContent}
              ref={ref2}
              onClick={() => setBuyOpen((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContainerItems}>
                  <span className={styles.dropdownContent}>
                    {transactionType}
                  </span>
                  <div className={styles.dropdownIconContainer}>
                    <div className={styles.dropdownIcon}>
                      <DropdownIcon2 fillColor="#FFFFFF" />
                    </div>
                  </div>
                </div>
                <div>
                  {buyOpen ? (
                    <DropDown
                      dropdownItems={clientTransactionDetails?.isFirstTransaction ? [] : buySell}
                      customClassForContent={styles.dropdownListContentBuy}
                      customClassForItems={styles.dropdownListItems}
                      handleClick={(item) => setTransationType(item)}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.datePickerContainerMain}>
            <label className={styles.title}> Transaction date:</label>
            <div className={styles.datePick}>
              <YearPickerV2
                customClass={
                  !transactionDate && isSubmit
                    ? styles.datePickerContainerError
                    : styles.datePickerContainer
                }
                name="transactionDate"
                startDate={transactionDate}
                handleChange={(e) => {
                  setTransactionDate(e.target.value);
                }}
              // readOnly={true}
              />

              {!transactionDate && isSubmit && (
                <span className={styles.error}>
                  Please Select Transaction Date
                </span>
              )}
            </div>
          </div>
          {transactionType !== "Buy" && (
            <div className={styles.selectFieldContainer}>
              <div className={styles.label}></div>
              <div className={styles.radionButton}>
                <div className={styles.radionButtonGroup}>
                  <RadioButton
                    label={fund?.currency}
                    value={data.currency ? data.currency : ""}
                    name="currency"
                    id={fund?.currency}
                    checked={data.currency !== "Units"}
                    handleChange={handleChange(
                      "currency",
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      true
                    )}
                    error={errors.currency}
                    customClass={styles.unitTypeRadioButton}
                    customClassRadioButton={styles.radioButton}
                  />
                  <RadioButton
                    label="Units"
                    value={data.currency ? data.currency : ""}
                    name="currency"
                    id="Units"
                    checked={data.currency === "Units"}
                    handleChange={handleChange(
                      "currency",
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      true
                    )}
                    error={errors.currency}
                    customClass={styles.unitTypeRadioButton}
                    customClassRadioButton={styles.radioButton}
                  />
                </div>
              </div>
            </div>
          )}

          <TextField2
            type="text"
            label="Transaction amount:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name="transactionAmount"
            handleChange={handleChange("transactionAmount", true)}
            value={data?.transactionAmount}
            // error={data.currency === "Units" ? null : errors?.transactionAmount}
            error={errors?.transactionAmount}
            disabled={
              transactionType === "Buy"
                ? false
                : data.currency === "Units"
                  ? true
                  : false
            }
          // maxLength={10}
          />
          {
            fund?.unitType.length !== 0 && <div className={styles.selectFieldContainer}>
              <div className={styles.label}>Unit Type:</div>
              <div className={styles.inputRadioWithError}>
                <div className={styles.selectRadioContent}>
                  {
                    fund?.unitType.map((item, index) => {
                      return (
                        <RadioButton
                          label={item}
                          value={data.unitType ? data.unitType : ""}
                          name={item}
                          id={item}
                          checked={data.unitType === item}
                          handleChange={handleChange("unitType")}
                          // error={errors.unitType}
                          key={item}
                          customClass={styles.unitTypeRadioButton}
                          customClassRadioButton={styles.radioButton}
                        />
                      )
                    })
                  }
                </div>
                {errors.unitType && <div className={styles.error}>{errors.unitType}</div>}
              </div>
            </div>
          }

          <TextField2
            type="text"
            label="Number of units:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name="numberOfUnits"
            handleChange={handleChange("numberOfUnits", true)}
            value={data?.numberOfUnits}
            // error={data.currency === "Units" ? errors?.numberOfUnits : null}
            error={errors?.numberOfUnits}
            // disabled={
            //   transactionType === "Buy"
            //     ? true
            //     : data.currency === "Units"
            //       ? false
            //       : true
            // }
            disabled={true}
          // maxLength={10}
          />
          <TextField2
            type="text"
            label={`Unit Price (${fund?.currency}):`}
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name="unitPrice"
            // handleChange={handleChange("unitPrice", true)}
            value={fund?.unitStartingPrice}
            // error={errors?.unitPrice}
            disabled={true}
          />
          <div className={styles.selectFieldContainer}>
            <div className={styles.label}>Allocate to: </div>
            <div
              className={styles.selectlistContent}
              ref={ref}
              onClick={() => setAllocateOpen((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContainerItems}>
                  <span className={styles.dropdownContent}>{allocateTo}</span>
                  <div className={styles.dropdownIconContainer}>
                    <div className={styles.dropdownIcon}>
                      <DropdownIcon2 fillColor="#FFFFFF" />
                    </div>
                  </div>
                </div>
                {/* <div >
                {allocateOpen ? (
                  <DropDown
                    dropdownItems={allocateToDropdown}
                    customClassForContent={styles.dropdownListContent1}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div> */}
                <div style={{ position: "relative" }}>
                  {allocateOpen ? (
                    <DropDown
                      dropdownItems={fund ? fund?.allocatedLists : []}
                      customClassForContent={styles.dropdownListContent1}
                      customClassForItems={styles.dropdownListItems}
                      setSelected={setAllocateTo}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <div className={styles.modalFooterButton}>
            <FilledButton
              type="submit"
              title={popupData?.type === "edit" ? "Update" : "Execute"}
              loader={isLoading}
              customClass={styles.saveButton}
              handleClick={() => { }}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default EditClientTransaction;
