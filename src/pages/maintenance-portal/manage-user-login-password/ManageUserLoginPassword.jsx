import {
  manageuserloginpasswordHeaderData,
  manageuserloginpasswordTableData,
} from "../../../data/data";
import styles from "./manageuserloginpassword.module.scss";
import Table from "../../../component/table/new-table/Table";
const ManageUserLoginPassword = () => {
  return (
    <div className={styles.mainContainer}>
      <Table
        tableheading={manageuserloginpasswordHeaderData}
        tabledata={manageuserloginpasswordTableData}
        customClassTableContainer={styles.customClassTableContainer}
        customClassTh={styles.customClassTh}
        customClassTd={styles.customClassTd}
      />
    </div>
  );
};

export default ManageUserLoginPassword;
