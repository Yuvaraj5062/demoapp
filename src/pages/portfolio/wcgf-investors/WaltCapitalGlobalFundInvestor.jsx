import { useState } from "react";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import Navlink from "../../../component/navlink/Navlink";
import Pagination from "../../../component/pagination/Pagination";
import Search from "../../../component/search/Search";
import Table from "../../../component/table/new-table/Table";
import { TableHeader, TableRow } from "../../../component/table/Table";
import {
  waltCapitalClientTableData,
  waltCapitalClientTableHead,
} from "../../../data/data";
import styles from "./waltcapitalglobalfundinvestor.module.scss";
const WaltCapitalGlobalFundInvestor = () => {
  let items = waltCapitalClientTableData;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  let variable = Math.ceil(waltCapitalClientTableData.length / itemsPerPage);
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };
  const handleNext = () => {
    currentPage !== variable
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };
  return (
    <div className={styles.mainContainer}>
      {/* <Navlink /> */}
      <AlphabeticFilter title="Clients" customClass={styles.alphabeticFilter} />
      <Search
        customClass={styles.search}
        inputCustomClass={styles.input}
        placeholder="Search Client"
      />
      <div className={styles.tableContainer}>
        <p className={styles.tableTitle}>Client List</p>
        {/* <table className={styles.table} cellSpacing={0}>
          <thead>
            <TableHeader
              data={waltCapitalClientTableHead}
              customClass={styles.tableHead}
            />
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              return (
                <TableRow
                  customClass={styles.tableBodyRow}
                  waltCapitalClientTableData={item}
                  key={index}
                />
              );
            })}
          </tbody>
        </table> */}
        <Table
          tableheading={waltCapitalClientTableHead}
          tabledata={currentItems}
        />
      </div>
      <div className={styles.paginationContainer}>
        <div className={styles.showPaginationDataNumber}>
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

export default WaltCapitalGlobalFundInvestor;
