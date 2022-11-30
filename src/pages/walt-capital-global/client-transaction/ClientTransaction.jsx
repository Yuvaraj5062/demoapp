import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "../../../component/delete-popup/DeletePopup";
import Loader from "../../../component/loader/Loader";
import NoRecordFound from "../../../component/notfound/NotFound";
import Pagination from "../../../component/paginationTwo/pagination";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/new-table/Table";
import { clientTransactionHead } from "../../../data/data";
import {
  clearState,
  deleteClientTransactionById,
  fetchAllClientTransaction,
} from "../../../redux/features/clienttransaction/clientTransactionSlice";
import styles from "./clienttransaction.module.scss";
import EditClientTransaction from "./edit-client-transaction/EditClientTransaction";
const ClientTransaction = () => {
  const [editModal, setEditModal] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [transactionToHandle, setTransactionToHandle] = useState({
    type: "add",
    info: {},
  });
  const { userInfo } = useSelector((state) => state.login);

  const handleEditClose = () => {
    setEditModal(!editModal);
  };
  const handleEditClient = () => {
    setEditModal(!editModal);
  };
  const { currSelectedFund } = useSelector((state) => state.addFund);
  const { isLoading, transactions, msg, error } = useSelector(
    (state) => state.clientTransaction
  );

  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const lastPage = Math.ceil(transactions?.totalCount / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
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
  /// pagination of count /
  const ofData = () => {
    if (transactions?.totalCount < itemsPerPage) {
      return transactions?.totalCount;
    }
    if (transactions?.clientTransactionList.length < itemsPerPage) {
      if (transactions?.totalCount > itemsPerPage) {
        return transactions.totalCount % 10 === 0
          ? itemsPerPage * currentPage
          : itemsPerPage * currentPage - (10 - (transactions?.totalCount % 10));
      }
      return transactions?.clientTransactionList.length;
    }

    return itemsPerPage * currentPage;
  };
  useEffect(() => {
    if (!editModal) {
      dispatch(
        fetchAllClientTransaction({
          pageNumber: currentPage || 1,
          pageSize: 10,
          orderby: false,
          fundId: currSelectedFund?.fundId,
        })
      );
    }
  }, [currentPage, currSelectedFund, editModal]);

  useEffect(() => {
    return () => {
      dispatch(clearState({ isClear: true }));
    };
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [currSelectedFund?.fundId]);
  const handleEditDelete = (data) => {
    setTransactionToHandle(data);
    if (data.type === "edit") {
      setEditModal(true);
    } else if (data.type === "delete") {
      setDeleteModal(true);
    } else {
      setEditModal(false);
      setDeleteModal(true);
    }
  };
  // useEffect(() => {
  //   return () => {
  //     dispatch(clearState());
  //   };
  // }, []);
  const handleClose = () => {

  }
  const deleteTransaction = () => {
    dispatch(
      deleteClientTransactionById({
        id: transactionToHandle.info.transactionNo,
        updatedBy: userInfo?.userDetail?.id,
      })
    ).then((e) => {
      if (
        e.type === "clienttransaction/deleteClientTransactionById/fulfilled"
      ) {
        setTimeout(() => {
          setDeleteModal(false);
          setCurrentPage(1);
          dispatch(
            fetchAllClientTransaction({
              pageNumber: 1,
              pageSize: 10,
              orderby: false,
              fundId: currSelectedFund?.fundId,
            })
          );
        }, 3000);
      }
    });
  };
  return (
    <div className={styles.clientTransactionContainer}>
      {deleteModal && (
        <Popup
          Children={DeletePopup}
          handleClose={() => { setDeleteModal(false) }}
          msg="Are you sure you want to delete?"
          popupData={transactionToHandle}
          handleDelete={() => deleteTransaction()}
        />
      )}
      {editModal && currSelectedFund ? (
        <Popup
          Children={EditClientTransaction}
          handleClose={() => handleEditClose()}
          popupData={transactionToHandle}
        />
      ) : isLoading ? (
        <Loader />
      ) : transactions?.clientTransactionList?.length === 0 ? (
        <NoRecordFound />
      ) : (
        <Table
          tableheading={clientTransactionHead}
          tabledata={transactions?.clientTransactionList}
          customClassTableContainer={styles.customClassTableContainer}
          customClassTh={styles.customClassTh}
          customClassTd={styles.customClassTd}
          customClassTableRow={styles.customClassTableRow}
          handleGoTo={() => { }}
          handleAction={(data) => {
            handleEditDelete(data);
          }}
          iconsCustomClass={styles.actionIcons}
        />
      )}
      {!editModal &&
        transactions?.totalCount !== 0 &&
        transactions?.clientTransactionList.length !== 0 &&
        !isLoading && (
          <div className={styles.paginationContainer}>
            <div>
              Showing {ofData()} {""} of {transactions.totalCount} data
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

export default ClientTransaction;
