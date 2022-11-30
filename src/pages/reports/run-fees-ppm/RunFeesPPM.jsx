import UploadFile from "../../../component/upload-file/UploadFile";
import styles from "./runfeesppm.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import { useState, useRef, useEffect } from "react";
import {
  Print,
  DateIcon,
  DropdownIcon2,
} from "../../../component/svg-components";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/libraries.css";
import Search from "../../../component/search/Search";
import DropDown from "../../../component/dropdown/DropDown";
import {
  tabledata,
  runFeesPPMTableData,
  runFeesPPMHead,
  runFeesPPMEquityData,
  runFeesPPMEquityHead,
  runFeesPPMEquityDataTwo,
} from "../../../data/data";
import { TableHeader, TableRow } from "../../../component/table/Table";
import Table from "../../../component/table/new-table/Table";
const RunFeesPPM = () => {
  const [startDate, setStartDate] = useState(new Date());
  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);
  const [click4, setClick4] = useState(false);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click && ref2.current && !ref2.current.contains(e.target)) {
        setClick(false);
      } else if (click2 && ref3.current && !ref3.current.contains(e.target)) {
        setClick2(false);
      } else if (click3 && ref2.current && !ref2.current.contains(e.target)) {
        setClick3(false);
      } else if (click4 && ref3.current && !ref3.current.contains(e.target)) {
        setClick4(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click, click2, click3, click4]);
  const tabledataName = tabledata.map((item) => item.name);
  return (
    <div className={styles.runfeesPPMStyle}>
      <div className={styles.runfeesPPMContainer}>
        <div className={styles.titleButtonContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.titleText}>
              PPM (TFSA) fee run report for end March 2022
            </p>
            <p className={styles.endDate}>End Mar 2022</p>
          </div>
          {/* <div className={styles.printContainer}>
            <span>
              <Print fillColor="#0868AA" />
            </span>
            <FilledButton
              title="Print PDF"
              customClass={styles.buttonText}
              handleClick={() => {}}
            />
          </div> */}
          <div className={styles.printContainer}>
            <FilledButton
              title="Print PDF"
              customClass={styles.printButton}
              icon={<Print fillColor="#0868AA" handleClick={() => {}} />}
              iconCustomClass={styles.iconCustomClass}
              titleCustomClass={styles.titleCustomClass}
            />
          </div>
        </div>
        <AlphabeticFilter title="IFAs" customClass={styles.abcFilter} />
        <div className={styles.buttonDropdownContainer}>
          <div className={styles.datePickerContainer}>
            <DatePicker
              wrapperClassName={styles.datePicker}
              popperClassName={styles.datePick}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd-MMMM-yyyy"
              showFourColumnMonthYearPicker
            />
            <span className={styles.iconContainer}>
              <DateIcon
                fillColor="#969BA0"
                // handleClick={() => handleClickCalenderPop()}
              />
            </span>
          </div>
          <FilledButton title="View" customClass={styles.viewBtn} />

          <div
            className={styles.dropdownButtonContainer}
            ref={ref1}
            onClick={() => setClick((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainerItems}>
              <div>
                {click ? (
                  <DropDown
                    dropdownItems={tabledataName}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
              <span className={styles.dropdownContent}>
                Pierre van der Walt
              </span>
              <span className={styles.dropdownIcon}>
                <DropdownIcon2 fillColor="#969BA0" />
              </span>
            </div>
          </div>
          <div
            className={styles.dropdownButtonContainer}
            ref={ref}
            onClick={() => setClick2((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainerItems1}>
              <div>
                {click2 ? (
                  <DropDown
                    dropdownItems={tabledataName}
                    customClassForContent={styles.dropdownListContent1}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
              <span className={styles.dropdownContent}>Cap Town</span>
              <span className={styles.dropdownIcon}>
                <DropdownIcon2 fillColor="#969BA0" />
              </span>
            </div>
          </div>
          <div className={styles.searchFilter}>
            <Search
              placeholder="Search IFAs"
              customClass={styles.search}
              inputCustomClass={styles.input}
            />
          </div>
        </div>
        <Table
          tableheading={runFeesPPMHead}
          tabledata={runFeesPPMTableData}
          customClassTh={styles.customClassTh}
          customClassTd={styles.customClassTd}
          customClassTableRow={styles.customClassTableRow}
          customClassTableContainer={styles.customClassTableContainerOne}
          customClassTable={styles.customClassTable}
        />
        {/* <div className={styles.tableContainer}>
          <table className={styles.table} cellSpacing={0}>
            <thead>
              <TableHeader
                data={runFeesPPMHead}
                customClass={styles.tableHead}
              />
            </thead>
            <tbody>
              {runFeesPPMTableData.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    // customClassForTd1={styles.customClassForTd1}
                    runFeesPPMTableData={item}
                    key={index}
                    id={item.id}
                  />
                );
              })}
            </tbody>
          </table>
        </div> */}
      </div>

      <div className={styles.runfeesPPMContainer}>
        <div className={styles.titleButtonContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.titleText}>
              PPM (Equity Portfolio) fee run report for end March 2022
            </p>
            <p className={styles.endDate}>End Mar 2022</p>
          </div>
          {/* <div className={styles.printContainer}>
            <span>
              <Print fillColor="#0868AA" />
            </span>
            <FilledButton
              title="Print PDF"
              customClass={styles.buttonText}
              handleClick={() => {}}
            />
          </div> */}
          <div className={styles.printContainer}>
            <FilledButton
              title="Print PDF"
              customClass={styles.printButton}
              icon={<Print fillColor="#0868AA" handleClick={() => {}} />}
              iconCustomClass={styles.iconCustomClass}
              titleCustomClass={styles.titleCustomClass}
            />
          </div>
        </div>
        <AlphabeticFilter title="IFAs" customClass={styles.abcFilter} />
        <div className={styles.buttonDropdownContainer}>
          <div className={styles.datePickerContainer}>
            <DatePicker
              wrapperClassName={styles.datePicker}
              popperClassName={styles.datePick}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd-MMMM-yyyy"
              showFourColumnMonthYearPicker
            />
            <span className={styles.iconContainer}>
              <DateIcon
                fillColor="#969BA0"
                // handleClick={() => handleClickCalenderPop()}
              />
            </span>
          </div>
          <FilledButton title="View" customClass={styles.viewBtn} />

          <div
            className={styles.dropdownButtonContainer}
            ref={ref1}
            onClick={() => setClick3((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainerItems}>
              <div>
                {click3 ? (
                  <DropDown
                    dropdownItems={tabledataName}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
              <span className={styles.dropdownContent}>
                Pierre van der Walt
              </span>
              <span className={styles.dropdownIcon}>
                <DropdownIcon2 fillColor="#969BA0" />
              </span>
            </div>
          </div>
          <div
            className={styles.dropdownButtonContainer}
            ref={ref}
            onClick={() => setClick4((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainerItems}>
              <div>
                {click4 ? (
                  <DropDown
                    dropdownItems={tabledataName}
                    customClassForContent={styles.dropdownListContent4}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
              <span className={styles.dropdownContent}>Cap Town</span>
              <span className={styles.dropdownIcon}>
                <DropdownIcon2 fillColor="#969BA0" />
              </span>
            </div>
          </div>
          <div className={styles.searchFilter}>
            <Search
              placeholder="Search IFAs"
              customClass={styles.search}
              inputCustomClass={styles.input}
            />
          </div>
        </div>
        <Table
          tableheading={runFeesPPMEquityHead}
          tabledata={runFeesPPMEquityData}
          customClassTh={styles.customClassTh}
          customClassTd={styles.customClassTd}
          customClassTableContainer={styles.customClassTableContainerTwo}
        />
        {/* <div className={styles.tableContainerTwo}>
          <table className={styles.table} cellSpacing={0}>
            <thead>
              <TableHeader
                data={runFeesPPMEquityHead}
                customClass={styles.tableHead}
              />
            </thead>
            <tbody>
              {runFeesPPMEquityData.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    runFeesPPMEquityData={item}
                    key={index}
                    id={item.id}
                  />
                );
              })}
              {runFeesPPMEquityDataTwo.map((item, index) => {
                return (
                  <TableRow
                    // customClass={styles.tableBodyRow}
                    customClassForTd={styles.customClassForTd}
                    customClassForTd2={styles.customClassForTd2}
                    runFeesPPMEquityData={item}
                    key={index}
                    id={item.id}
                  />
                );
              })}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default RunFeesPPM;
