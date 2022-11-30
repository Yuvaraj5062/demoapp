import React from "react";
import styles from "./tradestation.module.scss";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import Search from "../../../component/search/Search";
import { TableHeader, TableRow } from "../../../component/table/Table";
import { tradestationHeader, tradestationTableData } from "../../../data/data";
import Table from "../../../component/table/new-table/Table";
const TradeStation = () => {
  return (
    <div className={styles.tradeStationMainContainer}>
      {/* <div className={styles.navlink}>
        <p className={styles.reportsLink}>Reports</p> {"/"}
        <p className={styles.pagename}>Tradstation Client List</p>
      </div> */}
      <AlphabeticFilter title="Clients" customClass={styles.filter} />
      <div className={styles.searchFilter}>
        <Search
          placeholder="Search Clients"
          customClass={styles.search}
          inputCustomClass={styles.input}
        />
      </div>
      {/* <div className={styles.tableContainer}>
        <table className={styles.table} cellSpacing={0}>
          <thead>
            <TableHeader
              data={tradestationHeader}
              customClass={styles.tableHead}
            />
          </thead>
          <tbody>
            {tradestationTableData.map((item, index) => {
              return (
                <TableRow
                  customClass={styles.tableBodyRow}
                  tradestationTableData={item}
                  key={index}
                  id={item.id}
                />
              );
            })}
          </tbody>
        </table>
      </div> */}
      <Table
        tableheading={tradestationHeader}
        tabledata={tradestationTableData}
        customClassTh={styles.customClassTh}
        customClassTd={styles.customClassTd}
      />
    </div>
  );
};

export default TradeStation;
