import React from "react";
import styles from "./interactivebrokers.module.scss";
import { TableHeader, TableRow } from "../../../component/table/Table";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import Search from "../../../component/search/Search";
import {
  interactiveBrokersHeader,
  interactiveBrokersTableData,
} from "../../../data/data";
import Table from "../../../component/table/new-table/Table";
const InteractiveBrokers = () => {
  return (
    <div className={styles.interactiveMainContainer}>
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
              data={interactiveBrokersHeader}
              customClass={styles.tableHead}
            />
          </thead>
          <tbody>
            {interactiveBrokersTableData.map((item, index) => {
              return (
                <TableRow
                  customClass={styles.tableBodyRow}
                  interactiveBrokersTableData={item}
                  key={index}
                  id={item.id}
                />
              );
            })}
          </tbody>
        </table>
      </div> */}
      <Table
        tableheading={interactiveBrokersHeader}
        tabledata={interactiveBrokersTableData}
        customClassTh={styles.customClassTh}
        customClassTd={styles.customClassTd}
        customClassTableContainer={styles.customClassTableContainer}
      />
    </div>
  );
};

export default InteractiveBrokers;
