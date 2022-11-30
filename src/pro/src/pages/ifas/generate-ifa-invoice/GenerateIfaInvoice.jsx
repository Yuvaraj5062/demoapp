import { useEffect, useRef, useState } from "react";
import DropDown from "../../../component/dropdown/DropDown";
import {
  DateIcon,
  DropdownIcon2,
  Hambergurmenu,
  Print,
} from "../../../component/svg-components";
import styles from "./generateifainvoice.module.scss";
import {
  attentionTableContent,
  attentionTableData,
  attentionTableHead,
  IFAsTableData,
} from "../../../data/data";
import FilledButton from "../../../component/filled-button/FilledButton";
import Divider from "../../../component/divider/Divider";
import DatePicker from "react-datepicker";
import logo from "../../../assets/images/logo.png";
import { TableHeader, TableRow } from "../../../component/table/Table";
// import Navlink from "../../../component/navlink/Navlink";

const GenerateIfaInvoice = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const refClient = useRef();
  const ref = useRef();
  const calenderRef = useRef();
  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };
  const clientNames = IFAsTableData.map((item) => item.name);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click && refClient.current && !refClient.current.contains(e.target)) {
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
      if (dropdown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdown]);
  const handleView = () => {};
  const handleDateChange = (date) => {
    // initial change: start by setting the startDate
    if (!startDate && !endDate) {
      setStartDate(date);
      // startDate has been set, set the end date
    } else if (startDate && !endDate) {
      setEndDate(date);
    }

    // user is choosing another range => set the start date
    // and set the endDate back to null
    if (startDate && endDate) {
      setStartDate(date);
      setEndDate(null);
    }
  };
  return (
    <>
      {/* <Navlink /> */}
      <div className={styles.mainContainer}>
        <div className={styles.ifaHeaderContainer}>
          <div className={styles.textDropdown} ref={ref}>
            <p className={styles.ifaNameText}>IFA Name:</p>

            <div className={styles.dropdowns}>
              <div
                className={styles.dropdownContainer}
                ref={refClient}
                onClick={() => setClick((prevState) => !prevState)}
              >
                <div className={styles.dropdownContainerItems}>
                  <span className={styles.dropdownContent}>
                    3. Dewan van Wyk
                  </span>
                  <DropdownIcon2 fillColor="#0868AA" />
                </div>
                <div>
                  {click ? (
                    <DropDown
                      dropdownItems={clientNames}
                      customClassForContent={styles.dropdownListContent}
                      customClassForItems={styles.dropdownListItems}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <FilledButton
              title="View"
              customClass={styles.viewBtn}
              handleClick={() => handleView()}
            />
          </div>

          <div className={styles.InvestmentButton}>
            <FilledButton
              title="Investment Placed"
              customClass={styles.investmentPlacedButton}
            />
            <FilledButton
              title="Generate Invoice"
              customClass={styles.generateInvoiceButton}
            />
          </div>
        </div>
        <Divider customClass={styles.dividerBorder} />

        <div className={styles.dateContainer}>
          <div className={styles.dateTextContainer}>
            <p className={styles.dateText}>Date:</p>
            <div className={styles.datePickerContainer}>
              <DatePicker
                wrapperClassName={styles.datePicker}
                popperClassName={styles.datePick}
                onChange={(date) => handleDateChange(date)}
                endDate={endDate}
                selected={startDate}
                selectsStart
                dateFormat="dd-MMMM-yyyy"
                showFourColumnMonthYearPicker
                placeholderText="From: "
              />
              <span className={styles.iconContainer} ref={calenderRef}>
                <DateIcon
                  fillColor="#969BA0"
                  handleClick={() => handleClickCalenderPop()}
                />
              </span>
            </div>
            <div className={styles.datePickerContainer}>
              <DatePicker
                wrapperClassName={styles.datePicker}
                popperClassName={styles.datePick}
                selected={endDate}
                dateFormat="dd-MMMM-yyyy"
                placeholderText="To: "
                showFourColumnMonthYearPicker
                onChange={(date) => handleDateChange(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
              <span className={styles.iconContainer} ref={calenderRef}>
                <DateIcon
                  fillColor="#969BA0"
                  handleClick={() => handleClickCalenderPop()}
                />
              </span>
            </div>
            <FilledButton
              title="View"
              customClass={styles.viewBtn}
              handleClick={() => handleView()}
            />
          </div>
          {/* <FilledButton
            icon={<Print fillColor="#0868AA" />}
            title="Print PDF"
            customClass={styles.downloadPdfButton}
            iconCustomClass={styles.iconCustomClass}
            titleCustomClass={styles.titleCustomClass}
            handleClick={() => handleView()}
          /> */}
          <FilledButton
            title="Print PDF"
            customClass={styles.printButton}
            icon={<Print fillColor="#0868AA" handleClick={() => {}} />}
            iconCustomClass={styles.iconCustomClass}
            titleCustomClass={styles.titleCustomClass}
          />
        </div>

        <div className={styles.logoAddressContainer}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="logo" className={styles.logo} />
            <Hambergurmenu fillColor="#3E4954" />
          </div>
          <div className={styles.addressPhoneContainer}>
            <div className={styles.feeUserName1}>
              <p className={styles.feeText6}>
                The Cliffs Office Block 2 suite 610, Niagra Way Tyger Falls,
                7530,
              </p>
              <p className={styles.feeText6}>
                Tel: 086 111 7625, Fax: 021 914 9175
              </p>
            </div>
          </div>
        </div>
        <div className={styles.feesAttentionContainer}>
          <div className={styles.feeStatementContainer}>
            <div className={styles.feePeriodContainer}>
              <p className={styles.feeText1}>Fees Statement</p>
              <p className={styles.feeText2}>
                For the period 1 September 2022 to 1 October 2022
              </p>
              <div className={styles.feeUserName}>
                <p className={styles.feeText3}>To: Dewan van Wyk </p>
                <p className={styles.feeText3}>7 Dewan </p>
                <p className={styles.feeText3}>Korhaan </p>
                <p className={styles.feeText4}>Jacobsbaai </p>
                <p className={styles.feeText5}>7380</p>
              </div>
            </div>
            <div className={styles.feeDetailContainer}>
              <p className={styles.feeText1}>
                Company Registration Number: 2005/029147/07
              </p>
              <p className={styles.feeText2}>VAT No.:4780251411</p>
              <div className={styles.feeUserName1}>
                <p className={styles.feeText6}>Cell: 084 77 44 22 74 </p>
                <p className={styles.feeText6}>Tel: 0871117625 </p>
                <p className={styles.feeText6}>
                  Email: dewan@rockcapital.co.za
                </p>
                <p className={styles.feeText6}>VAT No: None</p>
                <p className={styles.feeText6}>IFA ID: 3</p>
              </div>
            </div>
          </div>
          <Divider customClass={styles.dividerBorder} />
          <div className={styles.AttentionContainer}>
            <p className={styles.attentionText}>ATTENTION: Dewan van Wyk</p>
            <div className={styles.tableContent}>
              <table className={styles.table} cellSpacing={0}>
                <thead>
                  <TableHeader
                    data={attentionTableHead}
                    customClass={styles.tableHead}
                  />
                </thead>
                <tbody>
                  {attentionTableContent.map((item, index) => {
                    return (
                      <TableRow
                        customClass={styles.tableBodyRow}
                        attentionData={item}
                        key={index}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.attentionSumTable}>
            <table cellSpacing={0}>
              {attentionTableData.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    attentionData1={item}
                    key={index}
                    customClassForTd={styles.customClassForTd}
                  />
                );
              })}
            </table>
          </div>
        </div>
        <div className={styles.noteText}>
          * Please note that these are provisional statements whilst our sytems
          are being tested.
        </div>
      </div>
    </>
  );
};

export default GenerateIfaInvoice;
