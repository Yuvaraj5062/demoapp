import React from "react";
import styles from "./clientdetails.module.scss";
import { tabledata } from "../../../data/data";
import { useState, useRef, useEffect } from "react";
import DropDown from "../../../component/dropdown/DropDown";
import {
  DateIcon,
  DropdownIcon2,
  Print,
} from "../../../component/svg-components";
import FilledButton from "../../../component/filled-button/FilledButton";
import Divider from "../../../component/divider/Divider";
import {
  clientDetailsTableHeader,
  clientDetailsTableDta,
} from "../../../data/data";
import { TableHeader, TableRow } from "../../../component/table/Table";
import DatePicker from "react-datepicker";
import "../../../styles/libraries.css";
import Table from "../../../component/table/new-table/Table";
// import Navlink from "../../../component/navlink/Navlink";
const ClientDetails = () => {
  const ref = useRef();
  const ref1 = useRef();
  const [click, setClick] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [investment, setInvestmentOpen] = useState(false);
  const calenderRef = useRef();

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

  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click) {
        if (click && ref.current && !ref1.current.contains(e.target)) {
          setClick(false);
        }
      } else {
        if (investment && ref.current && !ref.current.contains(e.target)) {
          setInvestmentOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click, investment]);

  const dropdownItems = tabledata.map((item) => item.name);
  return (
    <>
      {/* <Navlink /> */}
      <div className={styles.clientDetailsContainer}>
        <div className={styles.clientDetailsHeaderLeft}>
          <div className={styles.clientDetailsDropdownContainer}>
            <div
              className={styles.dropdownMainContainer}
              ref={ref}
              onClick={() => setClick((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContainerItems}>
                  <span className={styles.dropdownContent}>
                    Drago Mijatović
                  </span>
                  <span className={styles.dropdownIcon}>
                    <DropdownIcon2 fillColor="#969BA0" />
                  </span>
                </div>
                <div className={styles.dropdownMain}>
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
          </div>
          <div className={styles.clientDetailsDropdownContainer}>
            <div
              className={styles.dropdownMainContainer1}
              ref={ref}
              onClick={() => setInvestmentOpen((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContainerItems}>
                  <span className={styles.dropdownContent}>
                  Investment Statement
                  </span>
                  <span className={styles.dropdownIcon}>
                    <DropdownIcon2 fillColor="#969BA0" />
                  </span>
                </div>
                <div className={styles.dropdownMain}>
                  {investment ? (
                    <DropDown
                      dropdownItems={dropdownItems}
                      customClassForContent={styles.dropdownListContent}
                      customClassForItems={styles.dropdownListItems}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.datePickerContainer} ref={calenderRef}>
            <DatePicker
              wrapperClassName={styles.datePicker}
              popperClassName={styles.datePick}
              onChange={(date) => handleDateChange(date)}
              endDate={endDate}
              selected={startDate}
              selectsStart
              dateFormat="dd-MMMM-yyyy"
              showFourColumnMonthYearPicker
              placeholderText="15-March-2022"
            />
            <span className={styles.iconContainer}>
              <DateIcon
                fillColor="#969BA0"
                handleClick={() => handleClickCalenderPop()}
              />
            </span>
          </div>
          <div className={styles.datePickerContainer} ref={calenderRef}>
            <DatePicker
              wrapperClassName={styles.datePicker}
              popperClassName={styles.datePick}
              selected={endDate}
              dateFormat="dd-MMMM-yyyy"
              placeholderText="08-April-2022 "
              showFourColumnMonthYearPicker
              onChange={(date) => handleDateChange(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
            <span className={styles.iconContainer}>
              <DateIcon
                fillColor="#969BA0"
                handleClick={() => handleClickCalenderPop()}
              />
            </span>
          </div>
          <FilledButton
            title="Print PDF"
            customClass={styles.printButton}
            icon={<Print fillColor="#0868AA" handleClick={() => {}} />}
            iconCustomClass={styles.iconCustomClass}
            titleCustomClass={styles.titleCustomClass}
          />
        </div>

        <div className={styles.pageTitle}>
          <p className={styles.title}>Walt Capital Global Fund</p>
        </div>
        <div className={styles.clientDetailsCardContainer}>
          <div className={styles.cardTopContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.textContainer}>
                <p className={styles.text}>
                  Mr John Snow <br />
                  <span className={styles.mutedText}>
                    Investor  number:100001
                  </span>
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
                  <span>Contact no: 082 456 1221</span>
                </p>
              </div>
            </div>
          </div>
          <Divider customClass={styles.divider} />
          <div className={styles.cardBottomContainer}>
            <div className={styles.leftContainer}>
              <span>Initial capital loan</span>
              <span>Total internal bonus growth since inception</span>
              <span>Transactions in progress</span>
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.innerLeft}>
                <span>USD</span>
                <span>USD</span>
                <span>USD</span>
              </div>
              <div className={styles.innerRight}>
                <span>1,456,440.23</span>
                <span>456,440.23</span>
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

<Table
          tableheading={clientDetailsTableHeader}
          tabledata={clientDetailsTableDta}
          customClassTh={styles.customClassForTh1}
          customClassTd={styles.customClassForTd1}
          // handleGoTo={(id) => handleGoTo(id)}
        />


      </div>
    </>
  );
};

export default ClientDetails;
