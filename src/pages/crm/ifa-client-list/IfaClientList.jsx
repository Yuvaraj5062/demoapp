import React, { useEffect, useState } from "react";
import styles from "./ifaclientlist.module.scss";
import { ifaClientListHeader, ifaClientListData } from "../../../data/data";
import Pagination from "../../../component/paginationTwo/pagination";
import Table from "../../../component/table/new-table/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllIfaclients,
  getAllIfalists,
} from "../../../redux/features/ifa/ifaSlice";
import NoRecordFound from "../../../component/notfound/NotFound";
import Loader from "../../../component/loader/Loader";
import { useLocation, useParams } from "react-router-dom";
const IfaClientList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  const itemsPerPage = 10;
  const { ifaclientlist, ifalist } = useSelector((state) => state.ifa);
  const dispatch = useDispatch();
  const lastPage = Math.ceil(ifaclientlist?.totalCount / itemsPerPage);
  const id = location?.state?.id;
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };
  const handleNext = (item) => {
    currentPage !== lastPage
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };
  /* pagination of count */

  const ofData = () => {
    if (ifaclientlist?.totalCount < itemsPerPage) {
      return ifaclientlist.totalCount;
    }
    if (ifaclientlist?.ifaClientList?.length < itemsPerPage) {
      if (ifaclientlist?.totalCount > itemsPerPage) {
        return ifaclientlist.totalCount % 10 === 0
          ? itemsPerPage * currentPage
          : itemsPerPage * currentPage - (10 - (ifaclientlist.totalCount % 10));
      }
      return ifaclientlist?.ifaClientList.length;
    }

    return itemsPerPage * currentPage;
  };

  useEffect(() => {
    dispatch(
      getAllIfaclients({
        ifaId: id,
        orderby: false,
        pageSize: 10,
        pageNumber: currentPage,
      })
    );
  }, [currentPage]);

  return (
    <div className={styles.ifaMainContainer}>
      <div className={styles.tableContainer}>
        {ifaclientlist?.totalCount >= 1 &&
        ifaclientlist?.ifaClientList.length > 0 ? (
          <Table
            tableheading={ifaClientListHeader}
            tabledata={ifaclientlist?.ifaClientList}
          />
        ) : (
          <NoRecordFound />
        )}
      </div>

      {ifaclientlist?.totalCount >= 1 &&
        ifaclientlist?.ifaClientList.length > 0 && (
          <div className={styles.paginationContainer}>
            <div>
              Showing {ofData()} {""} of {ifaclientlist?.totalCount} data
            </div>

            <Pagination
              handlePaginate={(item) => handlePaginate(item)}
              currentPage={currentPage}
              handlePrevious={() => handlePrevious()}
              handleNext={(item) => handleNext(item)}
              totalPages={lastPage}
            />
          </div>
        )}
    </div>
  );
};

export default IfaClientList;
