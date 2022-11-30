import { useRef, useState } from "react";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import FilledButton from "../../../component/filled-button/FilledButton";
import Pagination from "../../../component/pagination/Pagination";
import Search from "../../../component/search/Search";
import { TableHeader, TableRow } from "../../../component/table/Table";
import Table from "../../../component/table/new-table/Table";
import {
  saEquityHead,
  modelEquityTableBody,
  modelEquityTableHeader,
  saEquityBody,
  modelEquityPortfolioCash,
  modelEquityPortfolioFooter,
} from "../../../data/data";
import { executeScroll } from "../../../utils/utils";
import styles from "./ppmmodelequityportfolio.module.scss";
const ModelEquityPortfolio = () => {
  // const [items, setItems] = useState(saEquityBody);
  let items = saEquityBody;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  let varible = Math.ceil(saEquityBody.length / itemsPerPage);
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
  const scrollRef = useRef();
  return (
    <div className={styles.modelEquityPortfolioContainer}>
      <FilledButton
        title="Show Clients"
        customClass={styles.showClientButton}
        handleClick={() => executeScroll(scrollRef)}
        handleMouseEnter={() => {}}
        handleMouseLeave={() => {}}
      />
      {/* <table className={styles.table} cellSpacing={0}>
        <thead>
          <TableHeader
            data={modelEquityTableHeader}
            customClass={styles.tableHeaderCustomClass}
            customClassForTh={styles.customClassForTh}
          />
        </thead>
        <tbody>
          {modelEquityTableBody.map((item, index) => {
            return (
              <TableRow
                customClass={styles.tableBodyRow}
                modelEquityPortfolioData={item}
                key={index}
                customClassForTd={styles.customClassForTd}
              />
            );
          })}
          <TableRow
            customClass={styles.tableCash}
            modelEquityPortfolioCash={modelEquityPortfolioCash}
            customClassForTd={styles.tableCashTd}
          />
          <TableRow
            customClass={styles.tableBodyFooter}
            modelEquityPortfolioFooter={modelEquityPortfolioFooter}
            customClassForTd={styles.tableCashTd}
          />
        </tbody>
      </table> */}

      <Table
        tableheading={modelEquityTableHeader}
        tabledata={modelEquityTableBody}
        customClassTableContainer={styles.customClassTableContainer1}
        customClassTd={styles.customClassTd}
        customClassTableRow={styles.customClassTableRow}
        tablefooter={modelEquityPortfolioFooter}
        // customClassFooterTd={styles.customClassFooterTd}
      />

      <AlphabeticFilter title="Clients" customClass={styles.alphabeticFilter} />
      <Search
        customClass={styles.search}
        inputCustomClass={styles.input}
        placeholder="Search Clients"
      />
      <div className={styles.jseTaxFreeAccountTFSA} ref={scrollRef}>
        {/* <table className={styles.jseTaxFreeAccountTFSATable} cellSpacing={0}>
          <thead>
            <TableHeader
              data={saEquityHead}
              customClass={styles.tableHeaderCustomClass}
              customClassForTh={styles.customClassForTh}
            />
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              return (
                <TableRow
                  customClass={styles.tableBodyRow}
                  saEquityBody={item}
                  key={index}
                  customClassForTd={styles.customClassForTd}
                />
              );
            })}
          </tbody>
        </table> */}
        <Table tableheading={saEquityHead} tabledata={currentItems} />
      </div>
      <div className={styles.paginationContainer}>
        <div>
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
export default ModelEquityPortfolio;
