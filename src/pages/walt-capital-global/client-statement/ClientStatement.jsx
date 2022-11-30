import React from "react";
import styles from "./clientstatement.module.scss";
import { tabledata } from "../../../data/data";
import { useState, useRef, useEffect } from "react";
import DropDown from "../../../component/dropdown/DropDown";
import {
  DropdownIcon2,
  Print,
  DateIcon,
} from "../../../component/svg-components";
import FilledButton from "../../../component/filled-button/FilledButton";
import Divider from "../../../component/divider/Divider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  clientDetailsTableHeader,
  clientDetailsTableDta,
} from "../../../data/data";
import { TableHeader, TableRow } from "../../../component/table/Table";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import "../../../styles/daterange.css";
import Search from "../../../component/search/Search";
import Table from "../../../component/table/new-table/Table";
const ClientStatement = () => {
  const ref = useRef();
  const ref1 = useRef();
  const [click, setClick] = useState(false);

  const [investment, setInvestmentOpen] = useState(false);
  const [fund, setFundOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const calenderRef = useRef();

  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };

  function handleDateChange(date) {
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
  }

  const findDropdownData = [
    {
      name: "Investment Report latest quarter",
    },
    {
      name: "Transaction List",
    },
  ];

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click) {
        if (click && ref1.current && !ref1.current.contains(e.target)) {
          setClick(false);
        }
      } else if (investment) {
        if (investment && ref1.current && !ref1.current.contains(e.target)) {
          setInvestmentOpen(false);
        }
      } else {
        if (fund && ref.current && !ref.current.contains(e.target)) {
          setFundOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click, investment, fund]);

  const dropdownItems = tabledata.map((item) => item.name);
  const data = findDropdownData.map((item) => item.name);
  return (
    <div className={styles.clientDetailsContainer}>
      <AlphabeticFilter title="Clients" customClass={styles.filter} />
      <div className={styles.searchWrapper}>
        <Search
          customClass={styles.search}
          inputCustomClass={styles.input}
          placeholder="Search Clients"
        />
        <FilledButton
          title="Print PDF"
          customClass={styles.printButton}
          icon={<Print fillColor="#0868AA" handleClick={() => {}} />}
          iconCustomClass={styles.iconCustomClass}
          titleCustomClass={styles.titleCustomClass}
        />
      </div>

      <div className={styles.clientStatementHeader}>
        <div className={styles.dropdownMainContainer} ref={ref}>
          Report Type:
          <div
            className={styles.dropdownContainer}
            onClick={() => setClick((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainerItems}>
              <span className={styles.dropdownContent}></span>
              <span className={styles.dropdownIcon}>
                <DropdownIcon2 fillColor="#969BA0" />
              </span>
            </div>
            <div>
              {click ? (
                <DropDown
                  dropdownItems={dropdownItems}
                  customClassForContent={styles.dropdownListContent}
                  customClassForItems={styles.dropdownListItems}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.dropdownMainContainer1} ref={ref}>
          Client:
          <div
            className={styles.dropdownContainer}
            onClick={() => setInvestmentOpen((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainerItems}>
              <span className={styles.dropdownContent}></span>
              <span className={styles.dropdownIcon}>
                <DropdownIcon2 fillColor="#969BA0" />
              </span>
            </div>
            <div>
              {investment ? (
                <DropDown
                  dropdownItems={dropdownItems}
                  customClassForContent={styles.dropdownListContent1}
                  customClassForItems={styles.dropdownListItems}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className={styles.dropdownMainContainer2} ref={ref}>
          Fund Name:
          <div
            className={styles.dropdownContainer}
            onClick={() => setFundOpen((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainerItems}>
              <span className={styles.dropdownContent}>
                Investment Statement Snapshot
                {/* Snapshot */}
              </span>
              <span className={styles.dropdownIcon}>
                <DropdownIcon2 fillColor="#969BA0" />
              </span>
            </div>
            <div>
              {fund ? (
                <DropDown
                  dropdownItems={data}
                  customClassForContent={styles.dropdownListContent2}
                  customClassForItems={styles.dropdownListItems}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className={styles.dateHeader}>
          <div className="date-header">
            <span className={styles.dateHeaderText}>Date</span>
            <div className={styles.dateFileds}>
              <div className={styles.datePickerContainer}>
                <span className={styles.iconContainer} ref={calenderRef}>
                  <DateIcon
                    fillColor="#969BA0"
                    handleClick={() => handleClickCalenderPop()}
                    height="15"
                    width="18"
                  />
                </span>
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
              </div>
              <span className={styles.datePickerText}>to</span>
              <div className={styles.datePickerContainer}>
                <DatePicker
                  wrapperClassName={styles.datePicker}
                  popperClassName={styles.datePick}
                  selected={endDate}
                  dateFormat="dd-MMMM-yyyy"
                  showFourColumnMonthYearPicker
                  onChange={(date) => handleDateChange(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <FilledButton title="View" customClass={styles.viewButton} />
        </div>
      </div>

      <div className={styles.pageTitle}>
        <p className={styles.title}>Client Statement Snapshot</p>
        <p className={styles.title}>Walt Capital Global Fund</p>
        <p className={styles.title}>For: 25 Oct 2022</p>
      </div>
      <div className={styles.clientDetailsCardContainer}>
        <div className={styles.cardTopContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.textContainer}>
              <p className={styles.text}>
                Mr John Snow <br />
                <span className={styles.mutedText}>Investor number:100010</span>
              </p>
            </div>
            <div className={styles.textContainer}>
              <p className={styles.text}>Account Summary</p>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.textContainer}>
              <p className={styles.text}>
                <span className={styles.mutedText}>Advised by </span>
                <br />
                <span>Steve Hughes </span>
              </p>
            </div>
            <div className={styles.textContainer}>
              <p className={styles.text}>
                <span className={styles.mutedText}>Hughes Consultants</span>{" "}
                <br />
                <span>Contact no 082 456 1221</span>
              </p>
            </div>
          </div>
        </div>
        <Divider customClass={styles.divider} />
        <div className={styles.cardBottomContainer}>
          <div className={styles.leftContainer}>
            <span>Deposit</span>
            <span>Capital growth bonus growth since inception</span>
            <span>Transaction in progress</span>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.innerLeft}>
              <span>USD</span>
              <span>USD</span>
              <span>USD</span>
            </div>
            <div className={styles.innerRight}>
              <span>1,456,440,23</span>
              <span>456,440,23</span>
              <span>-1,000.00</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.middleHeaderContainer}>
        <div className={styles.middleHeaderLeft}>
          <span>Closing balance including transactions in progress</span>
          <span>Closing balance priced in gold(grams)</span>
        </div>
        <div className={styles.middleHeaderRight}>
          <span> USD 1,456,440,23</span>
          <span>1,785 grams(45.20z)</span>
        </div>
      </div>
      <div className={styles.mainTableHeader}>
        <p>Last 12 Months</p>
      </div>
      <Table
        tableheading={clientDetailsTableHeader}
        tabledata={clientDetailsTableDta}
        customClassTh={styles.customClassTh}
        customClassTableRow={styles.customClassTableRow}
        customClassTd={styles.customClassTd}
      />
      {/* <table className={styles.table} cellSpacing={0}>
        <thead>
          <TableHeader
            data={clientDetailsTableHeader}
            customClass={styles.tableHead}
            customClassForTh1={styles.customClassForTh1}
            customClassForTh2={styles.customClassForTh2}
            customClassForThLast={styles.customClassForThLast}
          />
        </thead>

        <tbody>
          {clientDetailsTableDta.map((item, index) => {
            return (
              <TableRow
                customClass={styles.tableBodyRow}
                clientDetailsTableDta={item}
                key={index}
                id={item.id}
                customClassForTd1={styles.customClassForTd1}
                customClassForTd2={styles.customClassForTd2}
                customClassForTdLast={styles.customClassForTdLast}
                customClassForTd={styles.customClassForTd}
              />
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
};

export default ClientStatement;
