import FilledButton from "../../../component/filled-button/FilledButton";
import { AddSquare } from "../../../component/svg-components";
import Table from "../../../component/table/new-table/Table";
import styles from "./managerole.module.scss";
import { manageRoleHeadData } from "../../../data/data";
import Popup from "../../../component/popup/Popup";
import { useState } from "react";
import AddRolePopup from "./add-role-popup/AddRolePopup";
import Pagination from "../../../component/paginationTwo/pagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllIRole } from "../../../redux/features/managerole/manageroleSlice";
import NoRecordFound from "../../../component/notfound/NotFound";

const ManageRole = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { rolelist } = useSelector((state) => state.managerole);
  let lastpage = Math.ceil(rolelist?.totalCount / itemsPerPage);
  const dispatch = useDispatch();
  const [addRolePopup, setAddRolePopup] = useState(false);
  const [role, setRole] = useState({ type: "add", info: {} });

  const handleClose = () => {
    setAddRolePopup(!addRolePopup);
  };
  const handleOpen = () => {
    setCurrentPage(1);
    setAddRolePopup(!addRolePopup);
    setRole(false);
  };
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };
  const handleNext = () => {
    currentPage !== lastpage
      ? setCurrentPage(currentPage)
      : setCurrentPage(currentPage);
  };

  const ofData = () => {
    if (rolelist?.totalCount < itemsPerPage) {
      return rolelist.totalCount;
    }
    if (rolelist?.roleList?.length < itemsPerPage) {
      if (rolelist?.totalCount > itemsPerPage) {
        return rolelist.totalCount % 10 === 0
          ? itemsPerPage * currentPage
          : itemsPerPage * currentPage - (10 - (rolelist.totalCount % 10));
      }
      return rolelist?.roleList.length;
    }
    return itemsPerPage * currentPage;
  };

  const handleEdit = (popupData) => {
    setAddRolePopup(true);
    setRole(popupData);
  };

  useEffect(() => {
    dispatch(
      getAllIRole({
        status: false,
        pageNumber: currentPage || 1,
        pageSize: 10,
        orderby: false,
      })
    );
  }, [currentPage]);
  return (
    <>
      <div className={styles.mainContainer}>
        {addRolePopup && (
          <Popup
            Children={AddRolePopup}
            handleClose={() => handleClose()}
            popupData={role}
          />
        )}

        <FilledButton
          title="Add New Role"
          icon={<AddSquare fillColor="#FFFFFF" />}
          iconCustomClass={styles.iconCustomClass}
          titleCustomClass={styles.titleCustomClass}
          customClass={styles.addFieldButton}
          handleClick={() => handleOpen()}
        />
        <div className={styles.tableContainer}>
          {rolelist?.totalCount >= 1 && rolelist?.roleList.length > 0 ? (
            <Table
              customClassTd={styles.customClassTds}
              customClassTh={styles.customClassTableHead}
              customClassTableRow={styles.row}
              tableheading={manageRoleHeadData}
              tabledata={rolelist?.roleList}
              handleGoTo={() => {}}
              handleAction={(data) => handleEdit(data)}
            />
          ) : (
            <NoRecordFound customText={styles.text} />
          )}
        </div>

        {rolelist?.totalCount >= 1 && rolelist?.roleList.length > 0 && (
          <div className={styles.paginationContainer}>
            <div>
              Showing {ofData()} {""} of {rolelist?.totalCount} data
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
export default ManageRole;
