import { NavLink } from "react-router-dom";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import Pagination from "../../../component/pagination/Pagination";
import { useState } from "react";
import { TableHeader, TableRow } from "../../../component/table/Table";
import {
  offshoreClientListTableFooter,
  OffshoreClientListTableHead,
  OffshoreListTableData,
  runTradeStationTableData,
  ppmClientListHeader,
  ppmClientListTableData,
  ppmClientListSumData,
} from "../../../data/data";
import styles from "./offshoreclientlist.module.scss";
import OffshoreLinkBox from "../offshore-link-box/OffshoreLinkBox";
import Search from "../../../component/search/Search";
import Table from "../../../component/table/new-table/Table";
const OffshoreClientList = () => {
  const [items] = useState(OffshoreListTableData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  // const clientNames = OffshoreListTableData.map((item) => item.name);
  let varible = Math.ceil(OffshoreListTableData.length / itemsPerPage);
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
  const linkData = [
    "Trade Station - SA Clients",
    "Trade Station - CI Clients",
    "Interactive Brokers - SA Clients",
    "Interactive Brokers - CI Clients",
  ];
  const [value, setValue] = useState(0);
  return (
    <div className={styles.offshoreClientListMainContainer}>
      {/* <div className={styles.blocksContainer}>
        {
          linkData.map((item,index)=>{
              return (
                <OffshoreLinkBox title={item} key={index} handleClick = {()=> setValue(index)}  customClass={index === value ? styles.activeClass : null}/>
              )
          })
        }
      </div> */}
      <AlphabeticFilter title="Clients" customClass={styles.allClients} />
      <Search
        customClass={styles.search}
        inputCustomClass={styles.input}
        placeholder="Search Clients"
      />
      <p className={styles.title}> Offshore Client List</p>
      <Table
        tableheading={OffshoreClientListTableHead}
        tabledata={currentItems}
        // customClassTh={styles.customClassTh}
        // customClassTd={styles.customClassTd}
        // customClassTableRow={styles.customClassTableRow}
        tablefooter={ppmClientListSumData}
        customClassFooter={styles.customClassFooter}
        customClassFooterTd={styles.customClassFooterTd}
      />
      {/* <Table
        tableheading={OffshoreClientListTableHead}
        tabledata={currentItems}
        customClassTh={styles.customClassTh}
        customClassTd={styles.customClassTd}
        customClassTableRow={styles.customClassTableRow}
      /> */}
      {/* <table>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>Total Portfolios Value</td>
            <td>310,123.99</td>
            <td>ZAR</td>
          </tr>
        </tbody>
      </table> */}
      {/* <div className={styles.tableContent}>
        <table className={styles.table} cellSpacing={0}>
          <thead>
            <TableHeader
              data={OffshoreClientListTableHead}
              customClass={styles.tableHead}
              customClassForTh={styles.customClassForTh}
            />
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              return (
                <TableRow
                  customClass={styles.tableBodyRow}
                  OffshoreListTableData={item}
                  key={index}
                  id={item.id}
                  gotoButton={styles.gotoButton}
                  customClassForTd={styles.customClassForTd}
                />
              );
            })}
            <TableRow
              offshoreClientListTableFooter={offshoreClientListTableFooter}
              customClass={styles.tableFooter}
              customClassForTd1={styles.customClassForTd1}
              customClassForTd2={styles.customClassForTd2}
            />
          </tbody>
        </table>
        {/* <div className={styles.offshoreFooter}>
          <div className={styles.footer}>
            <p>Total Portfolios Value</p>
            <p className={styles.number}>310,123,99</p>
            <p>ZAR</p>
          </div>
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
  );
};
export default OffshoreClientList;
