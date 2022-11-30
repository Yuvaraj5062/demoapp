import styles from "./taxfreeinvestment.module.scss";
import { useState, useRef, useEffect } from "react";
import {
  taxFreeInvestmentTableData,
  taxFreeInvestmentTableHead,
  taxFreeInvestmentTableData2,
} from "../../../data/data";
import { TableHeader, TableRow } from "../../../component/table/Table";
import Pagination from "../../../component/pagination/Pagination";
import Table from "../../../component/table/new-table/Table";

const TaxFreeInvestment = () => {
  const ref = useRef();
  const [click, setClick] = useState(false);
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState(taxFreeInvestmentTableData);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setItems(taxFreeInvestmentTableData);
  }, []);

  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click && ref.current && !ref.current.contains(e.target)) {
        setClick(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click]);

  return (
    <div className={styles.taxFreeContainer}>
      {/* <div className={styles.navLink}>
        <p className={styles.ifaLink}>Clients /</p>
        <p className={styles.addIfaLink}>
          Drago Mijatović / JSE Tax Free Investment Account at PPM Securities
        </p>
      </div> */}
      <div className={styles.investmentContainer}>
        <p className={styles.accountNumber}>
          Acc. no: 111708 | Drago Mijatović
        </p>
        <Table
          tableheading={taxFreeInvestmentTableHead}
          tabledata={currentItems}
          customClassTableContainer={styles.customClassTableContainer}
          // customClassTableRow={styles.customClassTableRow}
          tablefooter={taxFreeInvestmentTableData2}
          customClassFooterTd={styles.customClassFooterTd}
        />
        {/* <div className={styles.tableContainer}>
          <table className={styles.table} cellSpacing={0}>
            <tbody>
              <tr className={styles.tableRow}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Cash</td>
                <td>R 1,869.23</td>
                <td>2.3%</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>Total Portfolio Value Open</td>
                <td></td>
                <td>255,739.29</td>
                <td></td>
                <td></td>
                <td>Total Portfolio value Now</td>
                <td>R 310,123.99</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        {/* <div className={styles.tableContainer}>
          <table className={styles.table} cellSpacing={0}>
            <thead>
              <TableHeader
                data={taxFreeInvestmentTableHead}
                customClass={styles.tableHead}
              />
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    taxfreeinvestmentData={item}
                    key={index}
                    id={item.id}
                  />
                );
              })}

              {taxFreeInvestmentTableData2.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow2}
                    taxfreeinvestmentData={item}
                    key={index}
                    id={item.id}
                  />
                );
              })}
            </tbody>
          </table>
        </div> */}
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
    </div>
  );
};

export default TaxFreeInvestment;
