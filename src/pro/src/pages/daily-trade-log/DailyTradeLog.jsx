import FilledButton from "../../component/filled-button/FilledButton";
// import Navlink from "../../component/navlink/Navlink";
import styles from "./dailytradelog.module.scss";
import { TableHeader, TableRow } from "../../component/table/Table";
import {
  dailyTradeLogTableHead,
  dailyTradeLogTableData,
} from "../../data/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/libraries.css";
import { DateIcon } from "../../component/svg-components";
import { useRef, useState } from "react";
import Table from "../../component/table/new-table/Table";

const DailyTradeLog = () => {
  const [startDate, setStartDate] = useState(null);
  const calenderRef = useRef();
  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };

  return (
    <>
      {/* <Navlink /> */}
      <div className={styles.dailyTradeLogContainer}>
        <div className={styles.dateContainer}>
          <div className={styles.datePickerContainer}>
            <DatePicker
              wrapperClassName={styles.datePicker}
              popperClassName={styles.datePick}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd-MMMM-yyyy"
              showFourColumnMonthYearPicker
              placeholderText="31-March-2022"
            />
            <span className={styles.iconContainer} ref={calenderRef}>
              <DateIcon
                fillColor="#969BA0"
                handleClick={() => handleClickCalenderPop()}
              />
            </span>
            <FilledButton
              title="View"
              customClass={styles.viewButton}
              handleClick={() => {}}
              handleMouseEnter={() => {}}
              handleMouseLeave={() => {}}
            />
          </div>
          <div>
            <FilledButton
              title="Edit"
              customClass={styles.editButton}
              handleClick={() => {}}
              handleMouseEnter={() => {}}
              handleMouseLeave={() => {}}
            />
            <FilledButton
              title="Save"
              customClass={styles.saveButton}
              handleClick={() => {}}
              handleMouseEnter={() => {}}
              handleMouseLeave={() => {}}
            />
          </div>
        </div>
        <Table
          tableheading={dailyTradeLogTableHead}
          tabledata={dailyTradeLogTableData}
          customClassTableContainer={styles.customClassTableContainer}
          customClassTh={styles.customClassTh}
          customClassTd={styles.customClassTd}
        />
        {/* <div className={styles.tableContent}>
          <table className={styles.table} cellSpacing={0}>
            <thead>
              <TableHeader
                data={dailyTradeLogTableHead}
                customClass={styles.tableHead}
              />
            </thead>
            <tbody>
              {dailyTradeLogTableData.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    dailyTradeLogTableData={item}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table>
        </div> */}
      </div>
    </>
  );
};

export default DailyTradeLog;
