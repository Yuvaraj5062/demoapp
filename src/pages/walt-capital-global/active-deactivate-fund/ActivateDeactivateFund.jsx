import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../component/loader/Loader";
import NoRecordFound from "../../../component/notfound/NotFound";
import Popup from "../../../component/popup/Popup";
import { activeDeactivateFundHead } from "../../../data/data";
import {
  getAllFunds,
  updateFundStatus
} from "../../../redux/features/fundadministrator/addFunSlice";
import FactSheetFormPopup from "../../factsheet-form-popup/FactSheetFormPopup";
import styles from "./activatedeactivatefund.module.scss";
import AddFundStatus from "./success-fund-modal/SuccessFundModal";
import Table from "./table/Table";

const ActivateDeactivateFund = () => {
  const [successFundModal, setSuccessFundModal] = useState(false);
  const [factSheet, setFactSheet] = useState({ shown: false, id: "" });
  const [updatedFund, setUpdatedFund] = useState({});
  const handleClose = () => {
    setSuccessFundModal(false);
  };
  const handleOpen = () => {
    setSuccessFundModal(!successFundModal);
  };
  const dispatch = useDispatch();
  const { loading, allTypeFundList } = useSelector((state) => state.addFund);
  useEffect(() => {
    // dispatch(getAllFundList({ data: '' }))
    dispatch(getAllFunds({ data: { isActive: false }, method: "allTypeFund" }));
  }, [dispatch]);

  const updateFundById = (fund) => {
    dispatch(
      updateFundStatus({
        fundId: fund?.fundId,
        isActive: !fund?.isActive,
      })
    ).then((e) => {
      if (e.type === "addFund/updateFundStatus/fulfilled") {
        setSuccessFundModal(true);
        setUpdatedFund(fund);

        dispatch(getAllFunds({ isActive: false }));
      } else {
        setSuccessFundModal(false);
        setUpdatedFund({});
      }
    });
  };
  return (
    <div className={styles.fundContainer}>
      {successFundModal && (
        <Popup
          Children={AddFundStatus}
          handleClose={() => handleClose()}
          popupData={updatedFund}
        />
      )}
      {factSheet.shown && (
        <Popup
          Children={FactSheetFormPopup}
          popupData={{ factSheet, setFactSheet }}
        />
      )}
      <div className={styles.fundHeading}>Activate or Deactivate funds</div>
      {/* <div className={styles.button}>
        <FilledButton
          title="Done"
          customClass={styles.doneButton}
          handleClick={() => {}}
        />
      </div> */}
      {loading ? (
        <Loader />
      ) : allTypeFundList && allTypeFundList.length === 0 ? (
        <NoRecordFound />
      ) : (
        <div className={styles.tableContainer}>
          <Table
            tabledata={allTypeFundList}
            tableheading={activeDeactivateFundHead}
            handleGoTo={(fund) => updateFundById(fund)}
            setFactSheet={setFactSheet}
            customClassTh={styles.heading}
            customTableBody={styles.body}
          />
        </div>
      )}
    </div>
  );
};
export default ActivateDeactivateFund;
