import React, { useState } from "react";
import styles from "./ppmclientlisttfsa.module.scss";
import {
  ppmClientListHeader,
  ppmClientListTableData,
  ppmClientListSumData,
} from "../../../data/data";
import Pagination from "../../../component/pagination/Pagination";
import { TableHeader, TableRow } from "../../../component/table/Table";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import Search from "../../../component/search/Search";
import Table from "../../../component/table/new-table/Table";

const PpmClientListTfsa = () => {
  const [items, setItems] = useState(ppmClientListTableData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  let varible = Math.ceil(ppmClientListTableData.length / itemsPerPage);
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
  return (
    <div className={styles.ppmTfsaMainContainer}>
      <AlphabeticFilter title="Clients" customClass={styles.abcFilter} />
      <div className={styles.searchFilter}>
        <Search
          placeholder="Search Clients"
          customClass={styles.search}
          inputCustomClass={styles.input}
        />
      </div>
      <p className={styles.ppmTfsaHeader}>JSE Tax Free Account(TFSA)</p>
      {/* <div className={styles.tableContainer}> */}
      <Table
        tableheading={ppmClientListHeader}
        tabledata={ppmClientListTableData}
        customClassTh={styles.customClassTh}
        customClassTd={styles.customClassTd}
        // customClassTableRow={styles.customClassTableRow}
        tablefooter={ppmClientListSumData}
        customClassFooter={styles.customClassFooter}
        customClassFooterTd={styles.customClassFooterTd}
      />
      {/* <table className={styles.table} cellSpacing={0}>
          <thead>
            <TableHeader
              data={ppmClientListHeader}
              customClass={styles.tableHead}
            />
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              return (
                <TableRow
                  customClass={styles.tableBodyRow}
                  gotoButton={styles.gotoButton}
                  ppmClientListTableData={item}
                  key={index}
                  id={item.id}
                />
              );
            })}
            <TableRow
              customClass={styles.totalAmount}
              ppmClientListSumData={ppmClientListSumData}
              customClassForTd={styles.customClassForTd}
            />
          </tbody>
        </table> */}
      {/* </div> */}
      {/* <div className={styles.ppmTfsafooter}>
        <div className={styles.footer}>
          <p>Total Portfolios Value</p>
          <p>310,123,99</p>
          <p>ZAR</p>
        </div>
      </div> */}
      <div className={styles.paginationContainer}>
        <div className={styles.paginationText}>
          Showing {currentItems.length} from {items.length} data
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

export default PpmClientListTfsa;
