import React, { useEffect, useRef, useState } from "react";
import styles from "./clientlist.module.scss";
// import DropDown from "../../../component/dropdown/DropDown";
// import { DropdownIcon2, UpDirection } from "../../../component/svg-components";
// import FilledButton from "../../../component/filled-button/FilledButton";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import Loader from "../../../component/loader/Loader";
import NoRecordFound from "../../../component/notfound/NotFound";
import Pagination from "../../../component/paginationTwo/pagination";
import Search from "../../../component/search/Search";
import Table from "../../../component/table/new-table/Table";
import { clientListTableHeader } from "../../../data/data";
import { fetchAllFundClients } from "../../../redux/features/fundadministrator/fund-clientList/fundClientListSlice";

const ClientList = () => {
  const {
    fundAdministrationClientList,
    totalCount,
    totalValueCount,
    totalUnitCount,
    isLoading,
    pageTotalUnitCount,
    pageTotalValueCount,
  } = useSelector((state) => state.fundClients?.fundClientsList);
  const dispatch = useDispatch();
  const fundId = useSelector(
    (state) => state.addFund?.currSelectedFund?.fundId
  );
  const ref = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [alphabet, setAlphabet] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const itemsPerPage = 10;
  const lastPage = Math.ceil(totalCount / itemsPerPage);
  const [click, setClick] = useState(false);

  const handlePaginate = useCallback(
    (item) => {
      setCurrentPage(item);
    },
    [currentPage]
  );

  const handlePrevious = useCallback(() => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  }, [currentPage]);

  const handleNext = () => {
    currentPage < lastPage
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(lastPage);
  };

  const getAllData = (page, letter, search) => {
    dispatch(
      fetchAllFundClients({
        pageNumber: page || 1,
        pageSize: 10,
        orderby: false,
        alphabet: letter || "",
        searchString: search || "",
        fundId: fundId,
      })
    );
  };

  const ofData = () => {
    if (totalCount < itemsPerPage) {
      return totalCount;
    }
    if (fundAdministrationClientList?.length < itemsPerPage) {
      if (totalCount > itemsPerPage) {
        return totalCount % 10 === 0
          ? itemsPerPage * currentPage
          : itemsPerPage * currentPage - (10 - (totalCount % 10));
      }
      return fundAdministrationClientList?.length;
    }

    return itemsPerPage * currentPage;
  };

  useEffect(() => {
    setCurrentPage(1);
    searchString && alphabet && setSearchString("");
    alphabet && getAllData(currentPage, alphabet, searchString);
  }, [alphabet]);

  useEffect(() => {
    setCurrentPage(1);
    alphabet && searchString && setAlphabet("");
    getAllData(currentPage, alphabet, searchString);
  }, [searchString]);

  useEffect(() => {
    getAllData(currentPage, alphabet, searchString);
  }, [currentPage, fundId]);

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

  const clientTableFooter = [
    {
      // initial: <input type="checkbox" />,
      name: "",
      title: "",
      accountNo: "Total :",
      unitsString: pageTotalUnitCount,
      valueString: pageTotalValueCount,
      costNav: "",
      currentNav: "",
      telNo: "",
      mobileNo: "",
      // email: <UpDirection fillColor="#FFFFFF" />,
    },
  ];

  return (
    <div className={styles.clientListMainContainer}>
      <AlphabeticFilter
        title="Clients"
        customClass={styles.allClients}
        alphabet={alphabet}
        setAlphabet={setAlphabet}
        setSearchString={setSearchString}
        handleAll={getAllData}
      />

      <div className={styles.clientListHeaderContainer}>
        <Search
          customClass={styles.search}
          inputCustomClass={styles.input}
          searchString={searchString}
          setSearchString={setSearchString}
          placeholder="Search Clients"
        />

        {totalCount && (
          <div className={styles.buttonContainer}>
            <span className={styles.totalButton}>Total:</span>
            <span className={styles.totalButton}>{totalUnitCount}</span>
            <span className={styles.totalButton}> {totalValueCount}</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {totalCount ? (
            <Table
              tableheading={clientListTableHeader}
              tabledata={fundAdministrationClientList}
              tablefooter={pageTotalValueCount && clientTableFooter}
              customClassTableContainer={styles.customClassTableContainer}
              customClassTh={styles.customClassTh}
              customClassTd={styles.customClassTd}
              customClassTableRow={styles.customClassTableRow}
              // customClassTableHead={styles.customClassTableHead}
              // customClassFooter={styles.customClassFooter}
              // customClassFooterTd={styles.customClassFooterTd}
              // customClassTableRow={styles.customClassTableRow}
            />
          ) : (
            <NoRecordFound />
          )}
          {totalCount && (
            <div className={styles.paginationContainer}>
              <div>
                Showing {ofData()} {""} of {totalCount} data
              </div>

              <Pagination
                handlePaginate={(item) => handlePaginate(item)}
                currentPage={currentPage}
                handlePrevious={() => handlePrevious()}
                handleNext={() => handleNext()}
                totalPages={lastPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientList;
