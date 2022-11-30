import { useState } from "react";
import FilledButton from "../../../component/filled-button/FilledButton";
import Popup from "../../../component/popup/Popup";
import { TableHeader, TableRow } from "../../../component/table/Table";
import {
  activeDeactivateFundHead,
  activeDeactiveFundData,
} from "../../../data/data";
import styles from "./activatedeactivatefund.module.scss";
import AddFundStatus from "./success-fund-modal/SuccessFundModal";

const ActivateDeactivateFund = () => {
  const [successFundModal, setSuccessFundModal] = useState(false);
  const handleClose = () => {
    setSuccessFundModal(!successFundModal);
  };
  const handleOpen = () => {
    setSuccessFundModal(!successFundModal);
  };
  return (
    <div className={styles.fundContainer}>
      {successFundModal && (
        <Popup Children={AddFundStatus} handleClose={() => handleClose()} />
      )}
      <div className={styles.fundHeading}>Activate or Deactivate funds</div>
      <div className={styles.button}>
        <FilledButton
          title="Done"
          customClass={styles.doneButton}
          handleClick={() => {}}
        />
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <TableHeader
              data={activeDeactivateFundHead}
              customClass={styles.tableHead}
            />
          </thead>
          <tbody>
            {activeDeactiveFundData.map((item) => {
              return (
                <TableRow
                  customClass={styles.tableRow}
                  activeDeactiveFundData={item}
                  gotoButton={styles.deactiveButton}
                  handleClose={() => handleOpen()}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ActivateDeactivateFund;
