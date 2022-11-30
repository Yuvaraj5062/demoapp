import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlphabeticFilter from "../../component/alphabetic-filter/AlphabeticFilter";
import NoRecordFound from "../../component/notfound/NotFound";
import Pagination from "../../component/paginationTwo/pagination";
import Search from "../../component/search/Search";
import Table from "../../component/table/new-table/Table";

import {
  clientsPortFolioTableHead
} from "../../data/data";
import { clearState, fetchPortfolioClients } from "../../redux/features/portfolio/portfolioSlice";

 import styles from "./allportfolioclient.module.scss";

const AllPortfolioClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { portfolioClientList } = useSelector((state) => state.portfolio);
  const itemsPerPage = 10;
  const lastPage = Math.ceil(portfolioClientList?.totalCount / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [showall,setShowAll]=useState(false)
  const [alphabet, setAlphabet] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };

  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };

  const handleNext = (item) => {
    currentPage < lastPage
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };

 

  const handleGoTo = (data) => {
    data.userId &&
      navigate(`/portfolio/${data.userId}`, {
        state: {
          id: data.userId,
          name: data.name,
        },
      });
  };

  /* pagination of count */
  const ofData = () => {
    if (portfolioClientList?.totalCount < itemsPerPage) {
      return portfolioClientList.totalCount;
    }
    if (portfolioClientList?.getPortfolioClientLists?.length < itemsPerPage) {
      if (portfolioClientList?.totalCount > itemsPerPage) {
        return portfolioClientList.totalCount % 10 === 0
          ? itemsPerPage * currentPage
          : itemsPerPage * currentPage - (10 - (portfolioClientList.totalCount % 10));
      }
      return portfolioClientList?.getPortfolioClientLists?.length;
    }

    return itemsPerPage * currentPage;
  };


  const getAllClients = (page, letter, search) => {
    !letter && alphabet && setAlphabet("");
    !search && searchString && setSearchString("");
    !showall && !search &&!letter && setShowAll(true)
    if(letter ||search || showall){
      
    dispatch(
      fetchPortfolioClients({
        porfolioUserId: 0,
        pageNumber: page || 1,
        pageSize: 10,
        orderby: false,
        alphabet: letter || "",
        searchString: search || "",
      })
    );
    }else{
      dispatch(clearState())
    }
  };



  useEffect(() => {
    alphabet && setCurrentPage(1)
    alphabet && getAllClients(currentPage, alphabet, '');
   
  }, [alphabet]);

  useEffect(() => {
    searchString&& setCurrentPage(1)
    searchString?.trim() ? getAllClients(currentPage,'', searchString):getAllClients(currentPage, alphabet, searchString);
   
  }, [searchString]);

  
  useEffect(() => {
    getAllClients(currentPage, alphabet, searchString);
   
  }, [currentPage]);
 
// console.log("portfolioClientList?.getPortfolioClientLists",portfolioClientList?.getPortfolioClientLists)
  return (
    <div className={styles.clientsContainer}>
      <AlphabeticFilter
        title="Clients"
        alphabet={alphabet}
        setAlphabet={setAlphabet}
        handleAll={getAllClients}
        setSearchString={setSearchString}
      />
      <div className={styles.searchWrapper}>
        <Search
          customClass={styles.search}
          inputCustomClass={styles.input}
          placeholder="Search Clients"
          searchString={searchString}
          setSearchString={setSearchString}
        />

      
      </div>

      {portfolioClientList?.totalCount >= 1 && portfolioClientList?.getPortfolioClientLists.length > 0 ? (
        <Table
          tableheading={ clientsPortFolioTableHead }
          tabledata={portfolioClientList?.getPortfolioClientLists}
          handleGoTo={(id) => handleGoTo(id)}
   
        />
      ) : (
         alphabet || searchString? <NoRecordFound />:null
      )}

      {portfolioClientList?.totalCount >= 1 && portfolioClientList?.getPortfolioClientLists?.length > 0 && (
        <div className={styles.paginationContainer}>
          <div>
            Showing {ofData()} {""} of {portfolioClientList?.totalCount} data
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
  );
};
export default AllPortfolioClient;
