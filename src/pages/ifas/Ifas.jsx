import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlphabeticFilter from "../../component/alphabetic-filter/AlphabeticFilter";
import FilledButton from "../../component/filled-button/FilledButton";
import NoRecordFound from "../../component/notfound/NotFound";
import Pagination from "../../component/paginationTwo/pagination";
import Search from "../../component/search/Search";
import { AddClient } from "../../component/svg-components";
import Table from "../../component/table/new-table/Table";
import { IFAsTableHead } from "../../data/data";
import {
  clearIfsState,
  getAllIfalists
} from "../../redux/features/ifa/ifaSlice";
//import { clearIfsState, getAllIfalists } from "../../redux/features/ifa/ifaSlice";
import styles from "./ifas.module.scss";
const Ifa = () => {
  const ref = useRef();
  const [click, setClick] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [alphabet, setAlphabet] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const [showall, setShowAll] = useState(false);
  const { ifalist } = useSelector((state) => state.ifa);
  let lastpage = Math.ceil(ifalist?.totalCount / itemsPerPage);
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
  const navigate = useNavigate();
  const handleNewIFAs = () => {
    dispatch(clearIfsState());
    navigate("/ifas/addnewifas");
  };

  const handleGoTo = (data) => {
    data.id &&
      navigate(`/ifas/addnewifas`, {
        state: {
          id: data.id,
        },
      });
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
  const ofData = () => {
    if (ifalist?.totalCount < itemsPerPage) {
      return ifalist.totalCount;
    }
    if (ifalist?.ifaAssetList?.length < itemsPerPage) {
      if (ifalist?.totalCount > itemsPerPage) {
        return ifalist.totalCount % 10 === 0
          ? itemsPerPage * currentPage
          : itemsPerPage * currentPage - (10 - (ifalist.totalCount % 10));
      }
      return ifalist?.ifaAssetList.length;
    }
    return itemsPerPage * currentPage;
  };
  const getAllClients = (page, letter, search) => {
    // !letter && alphabet && setAlphabet("");
    // !search && searchString && setSearchString("");
    !showall && !search && !letter && setShowAll(true);
    if (search || letter || setShowAll) {
      dispatch(
        getAllIfalists({
          pageNumber: page || 1,
          pageSize: 10,
          orderby: false,
          alphabet: letter || "",
          searchString: search || "",
        })
      );
    } else {
      dispatch(clearIfsState());
    }
  };

  useEffect(() => {
    setCurrentPage(1)
    alphabet && getAllClients(currentPage, alphabet, "");
    alphabet?.trim() && setCurrentPage(1);
    alphabet?.trim() && setSearchString("");
  }, [alphabet]);

  useEffect(() => {
    searchString?.trim() && setCurrentPage(1);
    searchString?.trim() && setAlphabet("");
    searchString?.trim()
      ? getAllClients(currentPage, "", searchString)
      : getAllClients(currentPage, alphabet, searchString);
  }, [searchString]);

  useEffect(() => {
    getAllClients(currentPage, alphabet, searchString);
  }, [currentPage]);


  return (
    <>
      <div className={styles.ifaContainer}>
        <AlphabeticFilter
          title="IFAs"
          customClass={styles.abcFilter}
          alphabet={alphabet}
          setAlphabet={setAlphabet}
          handleAll={getAllClients}
          setSearchString={setSearchString}
        />
        <div className={styles.searchFilterContainer}>
          <div className={styles.searchFilter}>
            <Search
              placeholder="Search IFAs"
              customClass={styles.search}
              inputCustomClass={styles.input}
              searchString={searchString}
              setSearchString={setSearchString}
            />
          </div>

          <div className={styles.filterContainer}>
            <div className={styles.totalAssets}>
              <p className={styles.totalAssetsText}>Total IFA Assets</p>
              <p className={styles.totalAssetsText1}>
                {ifalist && ifalist.totalIFACount}
              </p>
            </div>
            <FilledButton
              title="Add New IFAs"
              customClass={styles.newIFAsButton}
              iconCustomClass={styles.iconClass}
              icon={<AddClient fillColor="#0868AA" />}
              handleClick={() => handleNewIFAs()}
            />
          </div>
        </div>
        {ifalist?.totalCount >= 1 && ifalist?.ifaAssetList.length > 0 ? (
          <Table
            tableheading={IFAsTableHead}
            tabledata={ifalist?.ifaAssetList}
            handleGoTo={(id) => handleGoTo(id)}
          />
        ) : (
          <NoRecordFound />
        )}

        {ifalist?.totalCount >= 1 && ifalist?.ifaAssetList.length > 0 && (
          <div className={styles.paginationContainer}>
            <div>
              Showing {ofData()} {""} of {ifalist?.totalCount} data
            </div>

            <Pagination
              handlePaginate={(item) => handlePaginate(item)}
              currentPage={currentPage}
              handlePrevious={() => handlePrevious()}
              handleNext={() => handleNext()}
              totalPages={lastpage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Ifa;
