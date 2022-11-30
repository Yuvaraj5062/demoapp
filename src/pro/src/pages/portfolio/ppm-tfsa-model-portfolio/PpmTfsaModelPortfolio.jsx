import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import Pagination from "../../../component/pagination/Pagination";
import { TableHeader, TableRow } from "../../../component/table/Table";
import { useEffect, useRef, useState } from "react";
import {
  modelEquityTableBody,
  modelEquityTableHeader,
  JSETaxFreeAccountHeader,
  JSETaxFreeAccountData,
  modelEquityPortfolioCash,
  modelEquityPortfolioFooter,
  saEquityHead,
  saEquityBody,
} from "../../../data/data";
import styles from "./ppmtfsamodelportfolio.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import Search from "../../../component/search/Search";
import { executeScroll } from "../../../utils/utils";
import Table from "../../../component/table/new-table/Table";
const PpmTfsaModelPortfolio = () => {
  // const [items, setItems] = useState(JSETaxFreeAccountData);
  let items = saEquityBody;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  // const clientNames = JSETaxFreeAccountData.map((item) => item.name);
  let varible = Math.ceil(saEquityBody.length / itemsPerPage);
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };
  const handleNext = () => {
    // setCurrentPage(currentPage + 1);
    currentPage !== varible
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };
  //   const navigate = useNavigate();
  //   const handleNewClient = () => {
  //     navigate("/crm");
  //   };
  // const handleGoTo = (id) => {
  //   id && navigate(`/clients/${id}`);
  // };
  // useEffect(() => {
  //   setItems(JSETaxFreeAccountData);
  // }, []);
  const scrollRef = useRef();
  return (
    <div className={styles.modelEquityPortfolioContainer}>
      <FilledButton
        title="Show Clients"
        customClass={styles.showButton}
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
      />
      <AlphabeticFilter title="Clients" customClass={styles.filterContainer} />
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
export default PpmTfsaModelPortfolio;
