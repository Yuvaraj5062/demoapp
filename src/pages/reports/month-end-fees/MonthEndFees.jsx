import styles from "./monthendfees.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import { TableRow } from "../../../component/table/tableV2/TableV2";
import {
  expenseBrokersData,
  expensePPMData,
  incomBrokersData,
  incomePPMdata,
  incomeTradeStation,
} from "../../../data/data";
import IncomeTable from "./income-table/IncomeTable";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/libraries.css";
import { DateIcon } from "../../../component/svg-components";
const MonthEndFees = () => {
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

  const data = [
    "Month End Management & Performance Fees Report Template (PPM and Trade Station)",
    "Report Completion Date : 31 March 2022",
  ];
  const incomePPMFooter = {
    title: "Income",
    value: "R 68,942.29",
  };
  const incomBrokersFooter = {
    title: "Expenses",
    value: "-$ 68,942.29",
  };
  const incomBrokersFooter1 = {
    title: "Income",
    value: "$ 68,942.29",
  };
  const expensesPPMFooter = {
    title: "Expenses",
    value: "-R 68,942.29",
  };

  const incomePPMTotal = {
    title: "Total Income",
    value: "R 57,660.13",
  };
  const incomeBrokerTotal = {
    title: "Total Income",
    value: "$ 13,783.46",
  };

  return (
    <div className={styles.monthendfeesContainer}>
      <div className={styles.monthEndManagement}>
        <div className={styles.monthendfessTab}>
          {data.map((item, index) => {
            return (
              <span key={index} className={styles.monthEndManagementItem}>
                {item}
              </span>
            );
          })}
        </div>
        <div className={styles.addButtonDatepickerContainer}>
        <div className={styles.dataViewContainer}>
            <div className={styles.datePickerContainer}>
              <DatePicker
                wrapperClassName={styles.datePicker}
                popperClassName={styles.datePick}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM-yyyy"
                showMonthYearPicker
                showFourColumnMonthYearPicker
                showYearDropdown
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
              handleClick={() => {}}
              handleMouseEnter={() => { }} handleMouseLeave={() => { }}
            />
          </div>
          <div className={styles.addButton}>
            <FilledButton
              title="Edit"
              customClass={styles.addButtonText}
              handleClick={() => {}}
            />
            <FilledButton
              title="Add"
              customClass={styles.addButtonText}
              handleClick={() => {}}
            />
          </div>
        </div>
        <div className={styles.incomeExpenseContainer}>
          <div className={styles.incomeExpenseLeft}>
            <IncomeTable
              data={incomePPMdata}
              title="Income PPM"
              tableFooterData={incomePPMFooter}
            />
            <IncomeTable
              data={expensePPMData}
              title="Expenses"
              tableFooterData={expensesPPMFooter}
              customClass={styles.expensePPM}
            />
            <table className={styles.totalTable} cellSpacing={0}>
              <tbody>
                <TableRow
                  returnsData={incomePPMTotal}
                  tdCustomClass={styles.incomeTotal}
                />
              </tbody>
            </table>
          </div>
          <div className={styles.incomeExpenseRight}>
            <IncomeTable
              data={incomBrokersData}
              title="Income(Interactive Brokers)"
              tableFooterData={incomBrokersFooter1}
            />
            <IncomeTable
              data={incomeTradeStation}
              title="Income (Trade Station)"
              tableFooterData={incomBrokersFooter1}
              customClass={styles.incomeTradeStation}
            />
            <IncomeTable
              data={expenseBrokersData}
              title="Expenses"
              tableFooterData={incomBrokersFooter}
              customClass={styles.expenseBrokers}
            />
            <table className={styles.totalTable} cellSpacing={0}>
              <tbody>
                <TableRow
                  returnsData={incomeBrokerTotal}
                  tdCustomClass={styles.incomeTotal}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.noteText}>
        This template must be completed by the Super User for the data as of the
        last day of every month. This is one part of data that will be used to
        calculate the enterprise value on the Dashboard.
      </div>
    </div>
  );
};

export default MonthEndFees;
