import { TableRow, TableHeader } from "../../../component/table/Table";
import styles from "./birthdayreport.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import {
  birthdayReportData,
  birthdayReportTableHead,
  TaskMeetingTableHead,
} from "../../../data/data";
import Pagination from "../../../component/pagination/Pagination";
import { TaskMeetingData } from "../../../data/data";
import Tab from "../../../component/tabs/Tabs";
import { useEffect, useState } from "react";
import { AlarmClock } from "../../../component/svg-components";
// import MeetingReminder from "../reminder-popup/MeetingReminder";
import Search from "../../../component/search/Search";
import Popup from "../../../component/popup/Popup";
import EmailCrmModal from "./email-crm-popup/EmailCrmModal";
import { useNavigate } from "react-router-dom";
import Table from "../../../component/table/new-table/Table";

import ButtonGroup1 from "../../../component/button-groups/button-group1/ButtonGroup1";
import ButtonGroup2 from "../../../component/button-groups/button-group2/ButtonGroup2";
const BirthdayReport = () => {
  const birthdateType = [
    "Birthday Today",
    "Upcoming Birthdays",
    "Task/Meetings",
  ];
  // const handleViewProfile = () => {
  //   navigate("/clients/1");
  // };
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [birthdayType, setBirthdayType] = useState("Birthday Today");

  // const buttonGroup1 = (
  //   <div className={styles.buttonGroup}>
  //     <FilledButton
  //       title="Send Email"
  //       customClass={styles.emailButton}
  //       handleClick={() => {
  //         handleEmail();
  //       }}
  //     />
  //     <FilledButton
  //       title="View Profile"
  //       customClass={styles.emailButton}
  //       handleClick={() => {
  //         handleViewProfile();
  //       }}
  //     />
  //   </div>
  // );

  // const buttonGroup2 = (
  //   <div className={styles.buttonGroup}>
  //     <FilledButton
  //       title="Send Email"
  //       customClass={styles.emailButton}
  //       handleClick={() => {
  //         handleEmail();
  //       }}
  //     />
  //     <FilledButton
  //       title="View Profile"
  //       customClass={styles.emailButton}
  //       handleClick={() => {
  //         handleViewProfile();
  //       }}
  //     />
  //     <FilledButton
  //       title="Done?"
  //       customClass={styles.emailButton}
  //       handleClick={() => {}}
  //     />
  //   </div>
  // );
  const [buttonGroup, setButtonGroup] = useState(
    <ButtonGroup1 title1="Send Email" title2="View Profile" />
  );
  const [items, setItems] = useState(birthdayReportData);
  const [firstColumn, setFirstColumn] = useState(styles.initial);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const [tableHead, setTableHead] = useState(birthdayReportTableHead);
  let varible = Math.ceil(items.length / itemsPerPage);
  // const index = currentItems.map((item) => item.id);
  // console.log("id>>>", index);

  // const handleViewProfile = (id = 1) => {
  //   id && navigate(`/clients/${id}`);
    
  // };
  const handleViewProfile = (data) => {
    data.id && 
    //navigate(`/clients/${id}` );
    navigate(`/clients/${data.id}`, {
      state: {
        id:data.id,
        name:data.name
      },
    });
  };
  useEffect(() => {
    setBirthdayType(birthdateType[value]);

    setValue(value);
    if (birthdateType[value] === "Birthday Today") {
      setItems(birthdayReportData);
      setTableHead(birthdayReportTableHead);
      setButtonGroup(
        <ButtonGroup1
          title1="Send Email"
          title2="View Profile"
          customClass={styles.emailButton}
          handleGoTo={(id) => handleViewProfile(id)}
        />
      );
      setFirstColumn(styles.initial);
    } else if (birthdateType[value] === "Upcoming Birthdays") {
      setItems(birthdayReportData);
      setTableHead(birthdayReportTableHead);
      setButtonGroup(
        <ButtonGroup1
          title1="Send Email"
          title2="View Profile"
          customClass={styles.emailButton}
          handleGoTo={(id) => handleViewProfile(id)}
        />
      );
      setFirstColumn(styles.initial);
    } else {
      setItems(TaskMeetingData);
      setTableHead(TaskMeetingTableHead);
      setButtonGroup(
        <ButtonGroup1
          title1="Send Email"
          title2="View Profile"
          title3="Done?"
          customClass={styles.emailButton}
          handleGoTo={(id) => handleViewProfile(id)}
        />
      );
      setFirstColumn(styles.checkbox);
    }
  }, [value]);

  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };
  const handleNext = () => {
    // setCurrentPage(currentPage + 1);
    currentPage !== varible
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };
  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal(!modal);
  };
  // const handleModal = () => {
  //   setModal(!modal);
  // };
  // const [crmModal, setCrmModal] = useState(false);
  // const handleEmailClose = () => {
  //   setCrmModal(!crmModal);
  // };
  // const handleEmail = () => {
  //   setCrmModal(!crmModal);
  // };

  return (
    <>
      {/* {/ {modal && <EditClient handleClick={() => handleModal()}/>} /} */}
      {/* {modal && (
        <Popup Children={MeetingReminder} handleClose={() => handleModal()} />
      )} */}
      {/* {/ {modal && <Popup handleClick={() => handleModal()} />} /} */}
      {/* {crmModal && (
        <Popup
          Children={EmailCrmModal}
          handleClose={() => handleEmailClose()}
        />
      )} */}
      <div className={styles.birthdayReportContainer}>
        <div className={styles.dropdownAndReminderContainer}>
          <div className={styles.dropdownContainer}>
            <Search
              placeholder="Search Client"
              dropdown="true"
              customClass={styles.search}
            />
            <FilledButton
              title="view"
              customClass={styles.viewButton}
              handleClick={() => {}}
            />
          </div>
          <div className={styles.reminder}>
            <span className={styles.reminderText}>
              Add a note for future notification / reminder
            </span>
            <div className={styles.alarmIcon} onClick={() => handleOpen()}>
              <AlarmClock fillColor="#ffffff" />
            </div>
          </div>
        </div>
        <div className={styles.birthdayReportTable}>
          <div>
            <Tab
              data={birthdateType}
              value={value}
              setValue={setValue}
              arrow={true}
            />
          </div>
          {/* <table className={styles.table} cellSpacing={0}>
            <thead>
              <TableHeader data={tableHead} customClass={styles.tableHead} />
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    firstColumn={firstColumn}
                    buttonGroup={buttonGroup}
                    data={item}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table> */}
          <Table
            tableheading={tableHead}
            tabledata={currentItems}
            customClassTableRow={styles.customClassTableRow}
            customClassTh={styles.customClassTh}
            customClassTd={styles.customClassTd1}
            ButtonGroup={buttonGroup}
          />

          <div className={styles.paginationContainer}>
            <div className={styles.showingDataText}>
              Showing {currentItems.length} from {items.length} data
            </div>
            <Pagination
              data={items}
              itemsPerPage={itemsPerPage}
              handlePaginate={(item) => handlePaginate(item)}
              active={currentPage}
              handlePrevious={() => handlePrevious()}
              handleNext={() => handleNext()}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default BirthdayReport;

// export const buttonGroup1 = (
//   <div className={styles.buttonGroup}>
//     <FilledButton
//       title="Send Email"
//       customClass={styles.emailButton}
//       handleClick={() => {
//         handleEmail();
//       }}
//     />
//     <FilledButton
//       title="View Profile"
//       customClass={styles.emailButton}
//       handleClick={() => {
//         handleViewProfile();
//       }}
//     />
//   </div>
// );
