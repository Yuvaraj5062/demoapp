import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import DropDown from "../../../component/dropdown/DropDown";
import FilledButton from "../../../component/filled-button/FilledButton";
import { DropdownIcon2 } from "../../../component/svg-components";
import styles from "./allengrayclientlist.module.scss";
import { useState, useRef, useEffect } from "react";
import {
  allenGrayClientListHeader,
  tabledata,
  allenGrayClientListData,
} from "../../../data/data";
import ToggleSwitch from "../../../component/toggle-switch/ToggleSwitch";
import { TableHeader, TableRow } from "../../../component/table/Table";
import Search from "../../../component/search/Search";
import Table from "../../../component/table/new-table/Table";

const AllenGrayClientList = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isToggled1, setIsToggled1] = useState(false);
  const [isToggled2, setIsToggled2] = useState(false);

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
  const tabledataName = tabledata.map((item) => item.name);
  const handleShowAccountToggle = () => {
    setIsToggled(!isToggled);
  };
  const handleShowZeroBalanceToggle = () => {
    setIsToggled1(!isToggled1);
  };
  const handleInvestmentValueToggle = () => {
    setIsToggled2(!isToggled2);
  };
  return (
    <>
      <div className={styles.allenGrayClientContainer}>
        <div className={styles.dropdownButtonContainer}>
          <div className={styles.dropdownContainerItems}>
            <div ref={ref}>
              {click ? (
                <DropDown
                  dropdownItems={tabledataName}
                  customClassForContent={styles.dropdownListContent}
                  customClassForItems={styles.dropdownListItems}
                />
              ) : null}
            </div>
            <span className={styles.dropdownContent}>
              100031 Mrs. Vasti Botma
            </span>
            <span
              className={styles.dropdownIcon}
              onClick={() => setClick((prevState) => !prevState)}
            >
              <DropdownIcon2 fillColor="#0868AA" />
            </span>
          </div>
          <FilledButton
            customClass={styles.viewButton}
            title="View"
            handleClick={() => {}}
          />
          <FilledButton
            customClass={styles.printButton}
            title="Print to PDF"
            handleClick={() => {}}
          />
        </div>
        <AlphabeticFilter title="Clients" customClass={styles.filter} />
        <div className={styles.searchFilter}>
          <Search
            placeholder="Search Clients"
            customClass={styles.search}
            inputCustomClass={styles.input}
          />
        </div>
        <div className={styles.toggleContainer}>
          <p className={styles.clientText}>5 Clients</p>
          <div className={styles.toggleSwitchContent}>
            <p className={styles.toggleText}>
              <span className={styles.spanText}>Show Accounts</span>
              <ToggleSwitch
                handleToggle={() => {
                  handleShowAccountToggle();
                }}
                isToggled={isToggled}
              />
            </p>
            <p className={styles.toggleText}>
              <span className={styles.spanText}>Show Zero Balance</span>
              <ToggleSwitch
                handleToggle={() => {
                  handleShowZeroBalanceToggle();
                }}
                isToggled={isToggled1}
              />
            </p>
            <p className={styles.toggleText}>
              <span className={styles.spanText}>Show Investment Value</span>
              <ToggleSwitch
                handleToggle={() => {
                  handleInvestmentValueToggle();
                }}
                isToggled={isToggled2}
              />
            </p>
          </div>
        </div>
        {/* <div className={styles.tableContent}>
          <table className={styles.table} cellSpacing={0}>
            <thead>
              <TableHeader
                data={allenGrayClientListHeader}
                customClass={styles.tableHead}
              />
            </thead>
            <tbody>
              {allenGrayClientListData.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    allenGrayClientListData={item}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table>
        </div> */}
        <Table
          tableheading={allenGrayClientListHeader}
          tabledata={allenGrayClientListData}
          customClassTh={styles.customClassTh}
          customClassTd={styles.customClassTd}
        />
      </div>
    </>
  );
};

export default AllenGrayClientList;
