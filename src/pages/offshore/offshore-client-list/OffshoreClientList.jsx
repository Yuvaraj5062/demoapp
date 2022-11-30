import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import Pagination from "../../../component/paginationTwo/pagination";
import { useEffect, useState } from "react";

import {
  OffshoreClientListTableHead,
  OffshoreListTableData,
  ppmClientListSumData,
} from "../../../data/data";

import styles from "./offshoreclientlist.module.scss";
import Search from "../../../component/search/Search";
import Table from "../../../component/table/new-table/Table";
import { useDispatch, useSelector } from "react-redux";
import NoRecordFound from "../../../component/notfound/NotFound";
import { useRef } from "react";
import { clearState, getOffshoreCurrency, getOffshoreList } from "../../../redux/features/offshore/offShoreSlice";
import { DropdownIcon2 } from "../../../component/svg-components";
import DropDown from '../../../component/dropdown/DropDown'



const OffshoreClientList = () => {
  const ref = useRef();
  const [click, setClick] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [alphabet, setAlphabet] = useState("");
  const [searchString, setSearchString] = useState("");
  const [showall, setShowAll] = useState(false);
  const { offshoreList, offshoreCurrencyList } = useSelector((state) => state.offShore)
  const [selectedCurrency, setSelectedCurrency] = useState('');
  let lastpage = Math.ceil(offshoreList?.totalCount / itemsPerPage);
  const dispatch = useDispatch();
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };

  const handleNext = () => {
    // setCurrentPage(currentPage + 1);
    currentPage !== lastpage
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };


  //dropdown
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


  const ofData = () => {
    if (offshoreList?.totalCount < itemsPerPage) {
      return offshoreList.totalCount;
    }
    if (offshoreList?.offShoreClientLists?.length < itemsPerPage) {
      if (offshoreList?.totalCount > itemsPerPage) {
        return offshoreList.totalCount % 10 === 0
          ? itemsPerPage * currentPage
          : itemsPerPage * currentPage - (10 - (offshoreList.totalCount % 10));
      }
      return offshoreList?.offShoreClientLists.length;
    }
    return itemsPerPage * currentPage;
  };


  const getAllOffshoreList = (page, letter, search) => {
    !showall && !search && !letter && setShowAll(true);
    if (search || letter || setShowAll) {
      dispatch(
        getOffshoreList({
          currency: selectedCurrency,
          pageNumber: page || 1,
          pageSize: 10,
          orderby: false,
          alphabet: letter || "",
          searchString: search || "",
        })
      );
    } else {
      dispatch(clearState());
    }
  };

  useEffect(() => {
    setCurrentPage(1)
    alphabet && getAllOffshoreList(currentPage, alphabet, "");
    alphabet?.trim() && setCurrentPage(1);
    alphabet?.trim() && setSearchString("");
  }, [alphabet]);

  useEffect(() => {
    searchString?.trim() && setCurrentPage(1);
    searchString?.trim() && setAlphabet("");
    searchString?.trim()
      ? getAllOffshoreList(currentPage, "", searchString)
      : getAllOffshoreList(currentPage, alphabet, searchString);
  }, [searchString]);

  useEffect(() => {
    getAllOffshoreList(currentPage, alphabet, searchString);
  }, [currentPage]);




  useEffect(() => {
    dispatch(getOffshoreCurrency()).then((e) => {
      if (e.type === "offShore/getOffshoreCurrency/fulfilled") {
        // setSelectedCurrency(e.payload.find(i => i.currencyName === "ZAR").currencyName ?? e.payload[0]?.currencyName)
        setSelectedCurrency(e.payload[0]?.currencyName)
      }
    })
  }, [])


  useEffect(() => {
    setCurrentPage(1)
    selectedCurrency && getAllOffshoreList(currentPage, '', "");
    setSearchString("");
    setAlphabet("");
  }, [selectedCurrency]);

  return (
    <div className={styles.offshoreClientListMainContainer}>
      <AlphabeticFilter
        title="OffShore Clients"
        customClass={styles.allClients}
        alphabet={alphabet}
        setAlphabet={setAlphabet}
        setSearchString={setSearchString}
        handleAll={getAllOffshoreList}
      />

      <div className={styles.searchFilterContainer}>
        <div className={styles.searchFilter}>
          <Search
            placeholder="Search Clients"
            customClass={styles.search}
            inputCustomClass={styles.input}
            searchString={searchString}
            setSearchString={setSearchString}
          />
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.offShoreDropDown} ref={ref}>
            <div
              className={styles.dropdownContainer}
              onClick={() => setClick((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainerItems}>
                <span className={styles.dropdownContent}>
                  {selectedCurrency ? selectedCurrency : "Select Currency"}
                </span>
                <span className={styles.dropdownIcon}>
                  <DropdownIcon2 fillColor="#969BA0" />
                </span>
              </div>
              <div>
                {click && offshoreCurrencyList.length > 0 ? (
                  <DropDown
                    dropdownItems={offshoreCurrencyList}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                    keyName="currencyName"
                    setSelected={(item) => {
                      setSelectedCurrency(item.currencyName)
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>


      {offshoreList?.totalCount >= 1 && offshoreList?.offShoreClientLists.length > 0
        ? <>
          <p className={styles.title}> Offshore Client List</p>
          <Table
            tableheading={OffshoreClientListTableHead}
            tabledata={offshoreList?.offShoreClientLists}
            tablefooter={[offshoreList?.offShoreClient
            ]}
            customClassTh={styles.customClassTh}
            customClassTd={styles.customClassTd1}
            customClassFooter={styles.customClassFooter}
            customClassFooterTd={styles.customClassFooterTd}
          />
        </> : <NoRecordFound />}
      {offshoreList?.totalCount >= 1 && offshoreList?.offShoreClientLists.length > 0 && (
        <div className={styles.paginationContainer}>
          <div>
            Showing {ofData()} {""} of {offshoreList?.totalCount} data
          </div>
          <Pagination
            handlePaginate={(item) => handlePaginate(item)}
            currentPage={currentPage}
            handlePrevious={() => handlePrevious()}
            handleNext={() => handleNext()}
            totalPages={lastpage}
          />
        </div>)}
    </div>
  );
};
export default OffshoreClientList;
