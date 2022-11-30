import FilledButton from "../../component/filled-button/FilledButton";
import { Cross, DateIcon } from "../../component/svg-components";
import UploadFile from "../../component/upload-file/UploadFile";
import styles from "./maintenanceportal.module.scss";
import { colors } from "../../constants/Colors";
import { fileList } from "../../data/data";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
const MaintenancePortal = () => {
  // const [modal, setModal] = useState(true);
  // const [open, setOpen] = useState(true);
  // const handleClose = () => {
  //   setModal(false);
  // };
  // const handleCloseModal = () => {
  //   setOpen(false);
  // };
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const refClient = useRef();
  const ref = useRef();

  const calenderRef = useRef();

  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click && refClient.current && !refClient.current.contains(e.target)) {
        setClick(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropdown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdown]);

  return (
    <div className={styles.maintenanceContainer}>
      {/* <p className={styles.maintenanceTitle}>Maintenance Portal</p> */}
      <div className={styles.maintenanceContent}>
        {/* {open && ( */}
        <div className={styles.uploadCSVContainer}>
          <div className={styles.headerContainer}>
            Upload CSV file
            <span className={styles.crossContainer}>
              {/* <Cross
                fillColor={colors.white}
                handleClose={() => handleCloseModal()}
              ></Cross> */}
            </span>
          </div>
          <div className={styles.uploadFileContent}>
            <p className={styles.fileNameText}>Filename:</p>
            <div className={styles.buttonContainer}>
              <UploadFile
                selectedFileText="No file selected"
                buttonStyle={styles.fileInputBtn}
                customClass={styles.uploadFileDiv}
                browseContent="Browse"
                className={styles.uploadContainer}
                browseFile={styles.btnStyle}
              />

              <div className={styles.datePickerContainer}>
                <DatePicker
                  wrapperClassName={styles.datePicker}
                  popperClassName={styles.datePick}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd-MMMM-yyyy"
                  showFourColumnMonthYearPicker
                />
                <span className={styles.iconContainer} ref={calenderRef}>
                  <DateIcon
                    fillColor="#969BA0"
                    handleClick={() => handleClickCalenderPop()}
                  />
                </span>
              </div>
              <div className={styles.uploadButtons}>
                <FilledButton
                  customClass={styles.uploadBtn}
                  title="Upload"
                  handleClick={() => {}}
                />
                <FilledButton
                  customClass={styles.uploadBtn}
                  title="Manage Uploads"
                  handleClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
        {/* <p className={styles.fileNameText}>Filename:</p>
        <div className={styles.uploadFileContainer}>
          <UploadFile
            selectedFileText="No file selected"
            buttonStyle={styles.fileInputBtn}
            browseContent="Browse"
            className={styles.uploadContainer}
            browseFile={styles.btnStyle}
          />
        </div>
        <div className={styles.buttonContainer}>
          <FilledButton
            title="Manage Uploads"
            customClass={styles.uploadBtn}
            handleClick={() => {}}
          />
        </div> */}
        {/* {modal && ( */}
        <div className={styles.filesContainer}>
          <div className={styles.headerContainer}>
            {/* <span className={styles.arrowIcon}>
                <LeftArrow fillColor={colors.white} />
              </span> */}
            Previously Uploads
            <span className={styles.crossContainer}>
              {/* <Cross
                fillColor={colors.white}
                handleClose={() => handleClose()}
              ></Cross> */}
            </span>
          </div>
          <div className={styles.fileListContainer}>
            {fileList.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
          <div className={styles.deleteText}>Delete</div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default MaintenancePortal;
