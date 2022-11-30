import React from "react";
import { useState, useRef } from "react";
import { TableHeader, TableRow } from "../../../component/table/Table";
import styles from "./ifaaumreport.module.scss";
import { DateIcon, Print } from "../../../component/svg-components";
import Pagination from "../../../component/pagination/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { aumSummaryHeader, aumSummaryTable } from "../../../data/data";
import FilledButton from "../../../component/filled-button/FilledButton";

const IfaAumReport = () => {
  const ref = useRef();
  const calenderRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const [click, setClick] = useState(false);
  const [items, setItems] = useState(aumSummaryTable);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  let varible = Math.ceil(aumSummaryTable.length / itemsPerPage);
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };
  const handleNext = () => {
    currentPage !== varible
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };
  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };

  return (
    <div className={styles.aumContainer}>
      <div className={styles.titleContainer}>
        <span className={styles.text}>Total AUM By Product</span>
        <div className={styles.aumHeaderContainer}>
          <div className={styles.aumHeaderContainerLeft}>
            <span className={styles.freezeTitle}> Freeze date</span>
            <div className={styles.freezeDataContainer}>
              <DatePicker
                wrapperClassName={styles.datePicker}
                popperClassName={styles.datePick}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd-MM-yyyy"
                showFourColumnMonthYearPicker
                onChangeRaw={(e) => e.preventDefault()}
              />
              <span className={styles.iconContainer} ref={calenderRef}>
                <DateIcon
                  fillColor="#969BA0"
                  handleClick={() => handleClickCalenderPop()}
                />
              </span>
            </div>
          </div>

          <div className={styles.aumHeaderContainerLeft}>
            <span className={styles.unFreezeTitle}> Unfreeze date</span>
            <div className={styles.freezeDataContainer}>
              <DatePicker
                wrapperClassName={styles.datePicker}
                popperClassName={styles.datePick}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd-MM-yyyy"
                showFourColumnMonthYearPicker
                onChangeRaw={(e) => e.preventDefault()}
              />
              <span className={styles.iconContainer} ref={calenderRef}>
                <DateIcon
                  fillColor="#969BA0"
                  handleClick={() => handleClickCalenderPop()}
                />
              </span>
            </div>
          </div>

          <div className={styles.printContainer}>
            <span className={styles.printIcon}>
              <Print fillColor="#0868AA" />
            </span>
            <FilledButton
              title="Print PDF"
              customClass={styles.buttonText}
              handleClick={() => {}}
            />
          </div>
        </div>
      </div>

      <table className={styles.table} cellSpacing={0}>
        <thead>
          <TableHeader data={aumSummaryHeader} customClass={styles.tableHead} />
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
            return (
              <TableRow
                customClass={styles.tableBodyRow}
                aumSummaryTable={item}
                key={index}
                firstColumn={styles.total}
              />
            );
          })}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <div className={styles.paginationHeader}>
          Showing {currentItems.length} of {items.length} data
        </div>
        <Pagination
          data={items}
          itemsPerPage={itemsPerPage}
          handlePaginate={(item) => handlePaginate(item)}
          active={currentPage}
          handlePrevious={() => handlePrevious()}
          handleNext={() => handleNext()}
        />
      </div>
    </div>
  );
};

export default IfaAumReport;
