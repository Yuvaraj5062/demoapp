import styles from "./uploadcsvdata.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import { DateIcon } from "../../../component/svg-components";
import UploadFile from "../../../component/upload-file/UploadFile";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../component/table/new-table/Table";
import {
  danger,
  ppmTableData,
  ppmTableHead,
  success,
} from "../../../data/data";
import Pagination from "../../../component/paginationTwo/pagination";
import { useEffect } from "react";
import {
  emptyMsgs,
  getPaginatedData,
  uploadCsvDocument,
} from "../../../redux/features/watchlist/watchListSlice";
import Toast from "../../../component/toast/Toast";
import Loader from "../../../component/loader/Loader";
import NoRecordFound from "../../../component/notfound/NotFound";

const UploadCsvData = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const calenderRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [file, setFile] = useState(null);
  const { userInfo } = useSelector((state) => state.login);
  const { csvdata, isCsvUploaded, error, pending } = useSelector(
    (state) => state.watchlist
  );
  const lastPage = Math.ceil(csvdata?.totalCount / itemsPerPage);

  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };

  const handlePaginate = (item) => {
    // currentPage < lastPage
    //   ? setCurrentPage(currentPage + 1)
    //   : setCurrentPage(currentPage);

    setCurrentPage(item);
  };

  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };

  const handleNext = () => {
    currentPage < lastPage
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };

  const getData = () => {
    currentPage &&
      dispatch(
        getPaginatedData({
          pageNumber: currentPage || 1,
          pageSize: itemsPerPage,
          orderby: true,
        })
      );
  };

  const handleUploadXlsx = () => {
    const data = new FormData();
    data.append("UserId", userInfo?.userDetail?.id);
    data.append("File", file);
    file &&
      userInfo &&
      dispatch(uploadCsvDocument(data)).then((e) => {
        getData();
        setFile(null);
        setTimeout(() => {
          dispatch(emptyMsgs());
        }, [3000]);
      });
  };

  useEffect(() => {
    getData();
    return () => {
      dispatch(emptyMsgs());
      setFile(null);
    };
  }, [currentPage]);

  return (
    <>
      <div className={styles.uploadCSVContainer}>
        {isCsvUploaded || error ? (
          <Toast
            item={isCsvUploaded ? success : danger}
            message={isCsvUploaded ? isCsvUploaded : error}
          />
        ) : null}

        <div className={styles.headerContainer}>
          Upload CSV file
          <span className={styles.crossContainer}></span>
        </div>
        <div className={styles.uploadFileContent}>
          <p className={styles.fileNameText}>Filename:{file?.name}</p>
          <div className={styles.buttonContainer}>
            <UploadFile
              selectedFileText="No file selected"
              buttonStyle={styles.fileInputBtn}
              customClass={styles.uploadFileDiv}
              browseContent="Browse"
              className={styles.uploadContainer}
              browseFile={styles.btnStyle}
              setFile={setFile}
              file={file}
            />

            <div className={styles.uploadButtons}>
              <FilledButton
                customClass={styles.uploadBtn}
                title={
                  pending ? <Loader customClass={styles.loader} /> : "Upload"
                }
                handleClick={() => {
                  handleUploadXlsx();
                }}
              />
              <FilledButton
                customClass={styles.uploadBtn}
                title="Manage Uploads"
                handleClick={() => {}}
              />
            </div>
          </div>
        </div>
        <div className={styles.tableContainer}>
          {csvdata?.totalCount >= 1 ? (
            <Table
              tableheading={ppmTableHead}
              tabledata={csvdata && csvdata?.csvDocumentList}
            />
          ) : (
            <NoRecordFound />
          )}
        </div>
        {csvdata?.totalCount >= 1 && csvdata?.csvDocumentList.length > 0 && (
          <div className={styles.paginationContainer}>
            <div>
              Showing{" "}
              {csvdata?.totalCount < itemsPerPage * currentPage
                ? csvdata?.totalCount
                : itemsPerPage * currentPage}{" "}
              of {csvdata?.totalCount} Entries
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
  );
};
export default UploadCsvData;
