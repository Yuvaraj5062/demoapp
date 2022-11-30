import DropDown from "../../../component/dropdown/DropDown";
import FilledButton from "../../../component/filled-button/FilledButton";
import { DropdownIcon2, DateIcon } from "../../../component/svg-components";
import { TableV3Row } from "../../../component/table/tableV3/TableV3";
import { TableV4Header } from "../../../component/table/tableV4/TableV4";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import "../../styles/libraries.css";
import {
  dateData,
  pricingTabelHeader,
  pricingTableData,
} from "../../../data/data";
import styles from "./pricing.module.scss";
import { useState, useEffect, useRef } from "react";
import AddPricing from "./add-pricing/Addpricing";
import Popup from "../../../component/popup/Popup";
import EditPricing from "./edit-pricing/EditPricing";

const Pricing = () => {
  const [startDate, setStartDate] = useState(new Date());
  const calenderRef = useRef();

  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };

  const [addPricingModal, setAddPricingModal] = useState(false);
  const handleAddPricing = () => {
    setAddPricingModal(!addPricingModal);
  };
  const handleAddClose = () => {
    setAddPricingModal(!addPricingModal);
  };

  const [editPricingModal, setEditPricingModal] = useState(false);
  const handleEditClose = () => {
    setEditPricingModal(!editPricingModal);
  };
  const handleEditPricing = () => {
    setEditPricingModal(!editPricingModal);
  };
  return (
    <div className={styles.pricingContainer}>
      {addPricingModal && (
        <Popup Children={AddPricing} handleClose={() => handleAddClose()} />
      )}
      {editPricingModal && (
        <Popup Children={EditPricing} handleClose={() => handleEditClose()} />
      )}
      <div className={styles.dropdownBtnContainer}>
        <div className={styles.datePickerContainer}>
          <DatePicker
            wrapperClassName={styles.datePicker}
            popperClassName={styles.datePick}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM-yyyy"
            showMonthYearPicker
            showFourColumnMonthYearPicker
            showYearDropdown
            onChangeRaw={(e) => e.preventDefault()}
          />
          <span className={styles.iconContainer} ref={calenderRef}>
            <DateIcon
              fillColor="#969BA0"
              handleClick={() => handleClickCalenderPop()}
            />
          </span>
        </div>
        <FilledButton title="View" customClass={styles.viewBtn} />
        <FilledButton
          handleClick={() => handleAddPricing()}
          title="Add Pricing"
          customClass={styles.addPricingBtn}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <TableV4Header
            data={pricingTabelHeader}
            customClass={styles.pricingTableHeader}
            customClassHeader={styles.headerData}
          />
        </thead>
        <tbody>
          {pricingTableData.map((item, index) => {
            return (
              <TableV3Row
                key={index}
                data={item}
                handleEdit={() => handleEditPricing()}
                customClass={styles.pricingTableRow}
                customClassRow={styles.rowData}
                customEditBtn={styles.editBtn}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Pricing;
