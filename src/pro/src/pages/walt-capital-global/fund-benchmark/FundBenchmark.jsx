import { useState } from "react";
import FilledButton from "../../../component/filled-button/FilledButton";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/new-table/Table";
import { TableHeader, TableRow } from "../../../component/table/Table";
import {
  fundbenchmarkTableData,
  fundbenchmarkTableHead,
} from "../../../data/data";
import NewBenchmark from "./add-new-benchmark-modal/NewBenchmark";
import styles from "./fundbenchmark.module.scss";
import UpdateBenchmarkModal from "./update-benchmark-modal/UpdateBenchmarkModal";
import ButtonGroup1 from "../../../component/button-groups/button-group1/ButtonGroup1";
import ButtonGroup2 from "../../../component/button-groups/button-group2/ButtonGroup2";
const FundBenchmark = () => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  // const [buttonGroup, setButtonGroup] = useState(
  //   <ButtonGroup1 title1="Send Email" title2="View Profile" />
  // );
  const handleOpen = () => {
    setModal(!modal);
  };
  const handleModal = () => {
    setModal(!modal);
  };
  const handleOpen1 = () => {
    setUpdateModal(!updateModal);
  };
  const handleModal1 = () => {
    setUpdateModal(!updateModal);
  };
  const buttonGroup = (
    <ButtonGroup2
      title1="Add"
      title2="Remove"
      customClass={styles.emailButton}
    />
  );
  // <div className={styles.buttonGroup}>
  //   <FilledButton
  //     title="Add"
  //     customClass={styles.addButton}
  //     handleClick={() => {}}
  //   />
  //   <FilledButton
  //     title="Remove"
  //     customClass={styles.removeButton}
  //     handleClick={() => {}}
  //   />
  // </div>

  return (
    <>
      {modal && (
        <Popup Children={NewBenchmark} handleClose={() => handleModal()} />
      )}
      {updateModal && (
        <Popup
          Children={UpdateBenchmarkModal}
          handleClose={() => handleModal1()}
        />
      )}
      <div className={styles.mainContainer}>
        <div className={styles.benchmarkButton}>
          <FilledButton
            title="Add New Benchmark"
            customClass={styles.addNewBenchmarkButton}
            handleClick={() => handleOpen()}
          />
          <FilledButton
            title="Update Benchmarks"
            customClass={styles.updateBenchmarkButton}
            handleClick={() => handleOpen1()}
          />
        </div>
        <div className={styles.tableContent}>
          <Table
            tableheading={fundbenchmarkTableHead}
            tabledata={fundbenchmarkTableData}
            customClassTh={styles.customClassTh}
            customClassTd={styles.customClassTd}
            ButtonGroup={buttonGroup}
            customClassTableRow={styles.customClassTableRow}
          />
          {/* <table className={styles.table} cellSpacing={0}>
            <thead>
              <TableHeader
                data={fundbenchmarkTableHead}
                customClass={styles.tableHead}
              />
            </thead>
            <tbody>
              {fundbenchmarkTableData.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    buttonGroup={buttonGroup}
                    fundbenchmarkData={item}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table> */}
        </div>
      </div>
    </>
  );
};

export default FundBenchmark;
