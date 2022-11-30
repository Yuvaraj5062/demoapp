import React from "react";
import styles from "./clientlist.module.scss";
import { useState, useEffect, useRef } from "react";
// import DropDown from "../../../component/dropdown/DropDown";
// import { DropdownIcon2, UpDirection } from "../../../component/svg-components";
// import FilledButton from "../../../component/filled-button/FilledButton";
import {
  ClientListData,
  // tabledata,
  clientListTableHeader,
  clientListSumData,
  ClientListFooter,
} from "../../../data/data";
import { TableHeader, TableRow } from "../../../component/table/Table";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import Search from "../../../component/search/Search";
import Table from "../../../component/table/new-table/Table";
// import TableFooter from "../../../component/table/table-footer/TableFooter";

const ClientList = () => {
  const ref = useRef();
  const [click, setClick] = useState(false);

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
  // const dropdownItems = tabledata.map((item) => item.name);
  return (
    <div className={styles.clientListMainContainer}>
      <AlphabeticFilter title="Clients" customClass={styles.allClients} />
      <div className={styles.clientListHeaderContainer}>
        {/* <div className={styles.dropdownMainContainer} ref={ref}>
          <div
            className={styles.dropdownContainer}
            onClick={() => setClick((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainerItems}>
              <span className={styles.dropdownContent}>Name:</span>
              <span className={styles.dropdownIcon}>
                <DropdownIcon2 fillColor="#0868AA" />
              </span>
            </div>
            <div className={styles.dropdownMain}>
              {click ? (
                <DropDown
                  dropdownItems={dropdownItems}
                  customClassForContent={styles.dropdownListContent}
                  customClassForItems={styles.dropdownListItems}
                />
              ) : null}
            </div>
          </div>
        </div> */}
        <Search
          customClass={styles.search}
          inputCustomClass={styles.input}
          placeholder="Search Clients"
        />
        {/* <div className={styles.buttonContent}>
          <FilledButton
            title="Search"
            customClass={styles.pricingButton}
            handleClick={() => {}}
          />
        </div> */}
        <div className={styles.buttonContainer}>
          <span className={styles.totalButton}>Total:</span>
          <span className={styles.totalButton}>1,663,533.58</span>
          <span className={styles.totalButton}> $11,000,028</span>
        </div>
      </div>
      <Table
        tableheading={clientListTableHeader}
        tabledata={ClientListData}
        customClassTableHead={styles.customClassTableHead}
        tablefooter={ClientListFooter}
        customClassFooter={styles.customClassFooter}
        customClassFooterTd={styles.customClassFooterTd}
        // customClassTableRow={styles.customClassTableRow}
      />
      {/* <Table */}
      {/* <TableFooter
        tableheading={clientListTableHeader}
        tablefooter={ClientListFooter}
      /> */}
      {/* <div className={styles.tableContainer}>
        <table className={styles.table} cellSpacing={0}>
          <thead>
            <TableHeader
              data={clientListTableHeader}
              customClass={styles.tableHeaderCustomClass}
            />
          </thead>
          <tbody>
            {ClientListData.map((item, index) => {
              return (
                <TableRow
                  customClass={styles.tableBodyRow}
                  initialColumn={styles.initialColumn}
                  clientlistdata={item}
                  key={index}
                />
              );
            })}
            <TableRow
              customClass={styles.tableFooterData}
              clientListSumData={clientListSumData}
              customClassforTotal={styles.customClassforTotal}
              updirectionButtonStyle={styles.updirectionButtonStyle}
              customClassForTd={styles.customClassForTd}
            />
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default ClientList;
