import { useEffect, useRef, useState } from "react";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import FilledButton from "../../../component/filled-button/FilledButton";
// import Pagination from "../../../component/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loader from "../../../component/loader/Loader";
import NoRecordFound from "../../../component/notfound/NotFound";
import Pagination from "../../../component/paginationTwo/pagination";
import Search from "../../../component/search/Search";
import Table from "../../../component/table/new-table/Table";
import {
  modelEquityPortfolioFooter,
  modelEquityTableHeader,
  saEquityBody,
  saEquityHead
} from "../../../data/data";
import {
  fetchAllClientsByServiceProvider,
  fetchAllPortfolioCsvData
} from "../../../redux/features/portfolio/portfolioSlice";
import { executeScroll } from "../../../utils/utils";
import styles from "./ppmmodelequityportfolio.module.scss";
const ModelEquityPortfolio = () => {
  // const [items, setItems] = useState(saEquityBody);
  let items = saEquityBody;
  const location = useLocation();
  const dispatch = useDispatch();
  const { clientsList, portfolioCsvData, isLoading, isLoadingServiceProvider } =
    useSelector((state) => state.portfolio);
  const itemsPerPage = 10;
  const lastPage = Math.ceil(clientsList?.totalCount / itemsPerPage);
  const lastPageCsv = Math.ceil(portfolioCsvData?.totalCSVCount / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCsv, setCurrentPageCsv] = useState(1);
  const [alphabet, setAlphabet] = useState(null);
  const [stockString, setStockString] = useState("");
  // serach clients functionality yet to be cleared
  const [searchStringClient, setSearchStringClient] = useState(null);
  const scrollRef = useRef();
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

  const handlePaginateCsv = (item) => {
    setCurrentPageCsv(item);
  };
  const handlePreviousCsv = () => {
    currentPageCsv !== 1
      ? setCurrentPageCsv(currentPageCsv - 1)
      : setCurrentPageCsv(1);
  };

  const handleNextCsv = () => {
    currentPageCsv < lastPageCsv
      ? setCurrentPageCsv(currentPageCsv + 1)
      : setCurrentPageCsv(currentPageCsv);
  };

  const getAllClients = (page, letter, search, stockValue) => {
    !letter && alphabet && setAlphabet("");
    !search && searchStringClient && setSearchStringClient("");
    !stockValue && stockString && setStockString("");
    dispatch(
      fetchAllClientsByServiceProvider({
        serviceProviderId: location.state?.id,
        serviceProviderTypeId:location.state?.typeId,
        pageNumber: page || 1,
        pageSize: 10,
        orderby: false,
        alphabet: letter || "",
        searchClientString: search || "",
        searchStockString: stockValue || "",
      })
    );
  };

  useEffect(() => {
    alphabet && getAllClients(currentPage, alphabet, "", "");
  }, [alphabet]);

  useEffect(() => {
    searchStringClient?.trim() &&
      getAllClients(currentPage, "", searchStringClient, "");
  }, [searchStringClient]);

  useEffect(() => {
    stockString?.trim() && getAllClients(currentPage, "", "", stockString);
  }, [stockString]);

  useEffect(() => {
    getAllClients(currentPage, alphabet, searchStringClient, stockString);
  }, [currentPage]);

  useEffect(() => {
    dispatch(
      fetchAllPortfolioCsvData({
        serviceProviderId: location.state?.id,
        serviceProviderTypeId:location.state?.typeId,
        pageNumber: currentPageCsv || 1,
        pageSize: 0,
        orderby: true,
        alphabet: "",
        searchString: "",
      })
    );
  }, [currentPageCsv]);

  /* pagination of count */
  const ofData = () => {
    if (clientsList?.totalCount < itemsPerPage) {
      return clientsList.totalCount;
    }
    if (clientsList?.clientList?.length < itemsPerPage) {
      if (clientsList?.totalCount > itemsPerPage) {
        return clientsList.totalCount % 10 === 0
          ? itemsPerPage * currentPage
          : itemsPerPage * currentPage - (10 - (clientsList.totalCount % 10));
      }
      return clientsList?.clientList.length;
    }

    return itemsPerPage * currentPage;
  };
  //csv
  const ofDataCsv = () => {
    if (portfolioCsvData?.totalCSVCount < itemsPerPage) {
      return portfolioCsvData?.totalCSVCount;
    }
    if (portfolioCsvData?.totalCSVCount?.length < itemsPerPage) {
      if (portfolioCsvData?.totalCSVCount > itemsPerPage) {
        return portfolioCsvData?.totalCSVCount % 10 === 0
          ? itemsPerPage * currentPageCsv
          : itemsPerPage * currentPageCsv -
              (10 - (portfolioCsvData?.totalCSVCount % 10));
      }
      return portfolioCsvData?.getPortfolioCSVDataList.length;
    }
    if(itemsPerPage * currentPageCsv >portfolioCsvData?.totalCSVCount){
      return portfolioCsvData?.totalCSVCount
    }else{
    return itemsPerPage * currentPageCsv;
    }
  };
  

  

  return (
    <div className={styles.modelEquityPortfolioContainer}>
      <FilledButton
        title="Show Clients"
        customClass={styles.showClientButton}
        handleClick={() => executeScroll(scrollRef)}
        handleMouseEnter={() => {}}
        handleMouseLeave={() => {}}
      />
      {isLoading ? (
        <Loader/>
      ) : (
        <>
          {portfolioCsvData?.getPortfolioCSVDataList?.length > 0 ? (
            <Table
              tableheading={modelEquityTableHeader}
              // tabledata={modelEquityTableBody}
              tabledata={portfolioCsvData?.getPortfolioCSVDataList}
              customClassTableContainer={styles.customClassTableContainer1}
              customClassTd={styles.customClassTd}
              customClassTableRow={styles.customClassTableRow}
              tablefooter={modelEquityPortfolioFooter}
              tablefooterData={portfolioCsvData?.getPortfolioCSVDataTotal}
            />
          ) : (
            <NoRecordFound />
          )}

          {portfolioCsvData?.totalCSVCount >= 1 &&
          portfolioCsvData?.getPortfolioCSVDataList?.length > 0 ? (
            <div className={styles.paginationContainer}>
              <div>
                Showing {ofDataCsv()} {""} of {portfolioCsvData?.totalCSVCount}{" "}
                data
              </div>
              <Pagination
                handlePaginate={(item) => handlePaginateCsv(item)}
                currentPage={currentPageCsv}
                handlePrevious={() => handlePreviousCsv()}
                handleNext={() => handleNextCsv()}
                totalPages={lastPageCsv}
              />
            </div>
          ) : (
            <div style={{ paddingLeft: "40%", paddingTop: "40px" }}></div>
          )}
        </>
      )}
      <AlphabeticFilter
        title="Clients"
        alphabet={alphabet}
        setAlphabet={setAlphabet}
        handleAll={getAllClients}
        setSearchString={setSearchStringClient}
        // customClass={styles.alphabeticFilter}
      />
      <div className={styles.searchContainer}>
        <Search
          customClass={styles.search}
          inputCustomClass={styles.input}
          placeholder="Search Clients"
          searchString={searchStringClient}
          setSearchString={setSearchStringClient}
        />
        <Search
          customClass={styles.search}
          inputCustomClass={styles.input}
          placeholder="Search by Stocks"
          searchString={stockString}
          setSearchString={setStockString}
        />
      </div>

      <div>
        {isLoadingServiceProvider ? (
          <Loader />
        ) : (
          <>
            <div className={styles.jseTaxFreeAccountTFSA} ref={scrollRef}>
              {clientsList?.getPortfolioClientDataList?.length > 0 ? (
                <Table
                  tableheading={saEquityHead}
                  tabledata={clientsList.getPortfolioClientDataList}
                />
              ) : (
                <NoRecordFound />
              )}
            </div>

            <div>
              {clientsList?.totalCount >= 1 &&
                clientsList?.getPortfolioClientDataList.length > 0 && (
                  <div className={styles.paginationContainer}>
                    <div>
                      Showing {ofData()} {""} of {clientsList?.totalCount} data
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
          </>
        )}
      </div>
    </div>
  );
};
export default ModelEquityPortfolio;
