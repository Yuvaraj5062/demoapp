import styles from "./runfees.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import { TableHeader, TableRow } from "../../../component/table/Table";
import {
  runfeesTableHead,
  runfeesTableData,
  runfeesTableFooter,
  runfeesTotalData,
} from "../../../data/data";
import FeeReport from "./fee-report-popup/FeeReport";
import { useState } from "react";
import Popup from "../../../component/popup/Popup";
import "../../../styles/libraries.css";
import Table from "../../../component/table/new-table/Table";
const RunFees = () => {
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };
  const handleOpen = () => {
    setModal(!modal);
  };

  // const calcButton = () => {
  //   <FilledButton title="Calc" />;
  // };

  return (
    <div className={styles.mainContainer}>
      {modal && (
        <Popup Children={FeeReport} handleClose={() => handleClose()} />
      )}
      <FilledButton
        title="Fee Report"
        customClass={styles.feeReportButton}
        handleClick={() => handleOpen()}
      />
      {/* <div className={styles.tableContent}> */}
      <Table
        tableheading={runfeesTableHead}
        tabledata={runfeesTableData}
        tablefooter={runfeesTableFooter}
        customClassTh={styles.customClassTh}
        customClassTableHead={styles.customClassTableHead}
        customClassTableRow={styles.customClassTableRow}
        customClassTd={styles.customClassTd}
        customClassFooter={styles.customClassFooter}
        customClassFooterTd={styles.customClassFooterTd}
        // ButtonGroup={calcButton}
      />
      {/* <table className={styles.table} cellSpacing={0}>
          <thead>
            <TableHeader
              data={runfeesTableHead}
              customClass={styles.tableHead}
              customClassForTh1={styles.customClassForTh1}
              customClassForTh2={styles.customClassForTh2}
              customClassForThLast={styles.customClassForThLast}
              arrow={true}
              customarrowClass={styles.customarrowClass}
            />
          </thead>
          <tbody>
            {runfeesTableData.map((item, index) => {
              return (
                <TableRow
                  customClass={styles.tableBodyRow}
                  runfeesData={item}
                  key={index}
                  datePicker={styles.datePicker}
                  calcButton={styles.calcButton}
                  customClassForTd1={styles.customClassForTd1}
                  customClassForTd2={styles.customClassForTd2}
                />
              );
            })}
          
            <TableRow customClass={styles.totalAmount}  ifaBreakDownPage={styles.ifaBreakDownPage} runfeesTotalData={runfeesTotalData}/>
          </tbody>
        </table> */}
      {/* </div> */}
    </div>
  );
};

export default RunFees;
