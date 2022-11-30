import React from "react";
import styles from "./monthlyreports.module.scss";
import Pagination from "../../../component/pagination/Pagination";
import { useState, useEffect, useRef } from "react";
import DropDown from "../../../component/dropdown/DropDown";
import FilledButton from "../../../component/filled-button/FilledButton";
import {
  PeparIcon,
  DropdownIcon2,
  MoreIcon,
} from "../../../component/svg-components";
import Menu from "../../../component/menu/Menu";
import { TableHeader, TableRow } from "../../../component/table/Table";
import { AddSquare, CloseRing, Edit } from "../../../component/svg-components";
import {
  monthlyReportsHeader,
  tabledata,
  monthlyReportsdata,
} from "../../../data/data";
const MonthlyReports = () => {
  const ref = useRef();
  const ref1 = useRef();

  const [menu, setMenu] = useState(false);
  const [editFundModal, setEditFundModal] = useState(false);
  const [deleteFundModal, setDeleteFundModal] = useState(false);
  const [click, setClick] = useState(false);
  const [items, setItems] = useState(monthlyReportsdata);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  let varible = Math.ceil(monthlyReportsdata.length / itemsPerPage);
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
  const handleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click && ref.current && !ref.current.contains(e.target)) {
        setClick(false);
      }
      if (menu && ref1.current && !ref1.current.contains(e.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click, menu]);
  const dropdownItems = tabledata.map((item) => item.name);

  const [addFundModal, setAddFundModal] = useState(false);

  const handleOpen = () => {
    setAddFundModal(!addFundModal);
  };
  const handleView = () => {
    setMenu(false);
  };

  const handleEditOpen = () => {
    setEditFundModal(!editFundModal);
  };

  const handleDeleteOpen = () => {
    setDeleteFundModal(!deleteFundModal);
  };

  const menuItems = [
    {
      icon: <AddSquare fillColor="#969BA0" />,
      title: (
        <span className={styles.item} onClick={() => handleView()}>
          Active / Deactivate Funds
        </span>
      ),
    },
    {
      icon: <Edit fillColor="#969BA0" height="15" width="20" />,
      title: (
        <span className={styles.item} onClick={() => handleEditOpen()}>
          Edit Fund
        </span>
      ),
    },
    {
      icon: <CloseRing fillColor="#969BA0" />,
      title: (
        <span className={styles.item} onClick={() => handleDeleteOpen()}>
          Delete Fund
        </span>
      ),
    },
  ];
  const [icon, setIcon] = useState("#0868AA");
  const changeIcon = () => {
    console.log("changeIcon");
    setIcon("#FFFFFF");
  };
  return (
    <div className={styles.monthlyContainer}>
      <div className={styles.monthlyHeaderContainer}>
        <div className={styles.monthlyHeaderLeft}>
          <div className={styles.dropdownMainContainer} ref={ref}>
            <div
              className={styles.dropdownContainer}
              onClick={() => setClick((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainerItems}>
                <span className={styles.dropdownContent}>Select IFA:</span>
                <span className={styles.dropdownIcon}>
                  <DropdownIcon2 fillColor="#0868AA" />
                </span>
              </div>
              <div>
                {click ? (
                  <DropDown
                    dropdownItems={dropdownItems}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.buttonContent}>
            <FilledButton
              title="View"
              customClass={styles.viewButton}
              handleClick={() => {}}
            />
          </div>
        </div>
        <div className={styles.monthlyHeaderRight}>
          <div>
            <FilledButton
              title="Investments Placed"
              customClass={styles.createInvestmentButton}
            />
          </div>
          <div>
            <FilledButton
              title="Generate Invoice"
              customClass={styles.createNewFundButton}
              icon={<PeparIcon fillColor="#ffffff" />}
              iconCustomClass={styles.iconCustomClass}
              handleClick={() => handleOpen()}
            />
          </div>
          <div ref={ref1}>
            <FilledButton
              title={<MoreIcon fillColor={icon} />}
              handleClick={() => handleMenu()}
              handleMouseEnter={() => changeIcon()}
              handleMouseLeave={() => setIcon("#0868AA")}
              customClass={styles.moreIcon}
            />
            {/* {menu && <Menu onClick={() => setMenu((prevState) => !prevState)}
                        handleClick={() => handleView()} customClass={styles.customMenuClass}
                         handleEditFund={() => handleEditOpen()} handleDelete={() => handleDeleteOpen()} />} */}
            {/* {menu && <Menu menuItems={menuItems}/>} */}
          </div>
        </div>
      </div>

      <table className={styles.table} cellSpacing={0}>
        <thead>
          <TableHeader
            data={monthlyReportsHeader}
            customClass={styles.tableHead}
          />
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
            return (
              <TableRow
                customClass={styles.tableBodyRow}
                monthlyReportsdata={item}
                gotoButton={styles.manageButton}
                key={index}
                id={item.id}
              />
            );
          })}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <div className={styles.paginationHeader}>
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

export default MonthlyReports;
