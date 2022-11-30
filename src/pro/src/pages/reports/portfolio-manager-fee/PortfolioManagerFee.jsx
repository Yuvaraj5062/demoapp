import FilledButton from "../../../component/filled-button/FilledButton";
// import { TableHeader, TableRow } from "../../../component/table/Table";
import styles from "./portfoliomanagerfee.module.scss";
import {
  portfolioTableHead,
  portfolioManagerFeeTable,
} from "../../../data/data";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { DateIcon } from "../../../component/svg-components";
import Table from "../../../component/table/new-table/Table";
const PortfolioManagerFee = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const refClient = useRef();
  const ref = useRef();

  const calenderRef = useRef();

  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };

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

  return (
    <>
      <div className={styles.portfoliofeeContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.dateContainer}>
            <div className={styles.endDatetext}>End Date</div>
            <div className={styles.datePickerContainer}>
              <DatePicker
                wrapperClassName={styles.datePicker}
                popperClassName={styles.datePick}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd- MMMM-yyyy"
                showFourColumnMonthYearPicker
                placeholderText="31-March-2022"
              />
              <span className={styles.iconContainer} ref={calenderRef}>
                <DateIcon
                  fillColor="#969BA0"
                  handleClick={() => handleClickCalenderPop()}
                />
              </span>
            </div>
          </div>
          <FilledButton
            title="View"
            customClass={styles.viewBtn}
            handleClick={() => {}}
            handleMouseEnter={() => {}}
            handleMouseLeave={() => {}}
          />
        </div>
        {/* <div className={styles.tableContent}>
          <table className={styles.table} cellSpacing={0}>
            <thead>
              <TableHeader
                data={portfolioTableHead}
                customClass={styles.tableHead}
              />
            </thead>
            <tbody>
              {portfolioManagerFeeTable.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    portfolioManagerData={item}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table>
        </div> */}
        <Table
          tableheading={portfolioTableHead}
          tabledata={portfolioManagerFeeTable}
          customClassTableContainer={styles.customClassTableContainer}
          customClassTh={styles.customClassTh}
          customClassTd={styles.customClassTd}
        />
      </div>
    </>
  );
};

export default PortfolioManagerFee;
