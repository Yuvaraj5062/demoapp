
import FilledButton from "../../../component/filled-button/FilledButton";
import { DateIcon, DropdownIcon2 } from "../../../component/svg-components";

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
import { useDispatch } from "react-redux";
import { fetchAddPricingDetail, fetchPricingData, fetchUnitByFundId } from "../../../redux/features/pricing/pricingSlice";
import { useSelector } from "react-redux";
import TableV5 from "../../../component/table/tableV5.js/TableV5";
import NoRecordFound from "../../../component/notfound/NotFound";
import YearPickerV2 from "../../../component/year-picker/yearPickerV2";
import DropDown from "../../../component/dropdown/DropDown";
import moment from "moment/moment";

const Pricing = () => {
  const [startDate, setStartDate] = useState(new Date()); //DD-MMM-YYYY
  const { pricingData,unitType ,pricingInputValidataions,pricingInputField} = useSelector((state) => state.pricing)
  const { currSelectedFund } = useSelector(state => state.addFund)
  const [editableValue,setEditableValue]=useState()
  const calenderRef = useRef();
  const [allocateOpen, setAllocateOpen] = useState(false);
  const [selUnitType, setSelUnitType] = useState('All');
  const ref = useRef();
  const dispatch = useDispatch()
  const handleClickCalenderPop = () => {
    // calenderRef.current.click();
    calenderRef.current.setOpen(true);
  };

  const [addPricingModal, setAddPricingModal] = useState(false);
  const handleAddPricing = () => {
    dispatch(fetchAddPricingDetail({fundId: currSelectedFund?.fundId}))
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

  useEffect(() => {
    dispatch(fetchPricingData({ 
      fundId: currSelectedFund?.fundId, 
      transactionDate:moment(startDate).format("DD/MMM/YYYY"),
      feeUnit: selUnitType,
      pageNumber: 0,
      pageSize: 0,
      orderby: true
      
    }
      ))
    dispatch(fetchUnitByFundId({ fundId: currSelectedFund?.fundId }))
  }, [currSelectedFund?.fundId])


const handleView=()=>{
  dispatch(fetchPricingData({ 
    fundId: currSelectedFund?.fundId, 
    transactionDate:moment(startDate).format("DD/MMM/YYYY"),
    feeUnit: selUnitType,
    pageNumber: 0,
    pageSize: 0,
    orderby: true
    
  }
    ))
}



  useEffect(() => {
    const checkIfClickedOutside = (e) => {
        if (allocateOpen && ref.current && !ref.current.contains(e.target)) {
          setAllocateOpen(false);    
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [ allocateOpen]);

  

  return (
    <div className={styles.pricingContainer}>
      {addPricingModal && (
        <Popup Children={AddPricing}  handleClose={() => handleAddClose()} />
      )}
      {editPricingModal && (
        <Popup Children={EditPricing} handleClose={() => handleEditClose()} />
      )}
      <div className={styles.dropdownBtnContainer}>
        {/* <div className={styles.datePickerContainer}>
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
            ref={calenderRef}
          />
          <span className={styles.iconContainer} >
            <DateIcon
              fillColor="#969BA0"
              handleClick={() => handleClickCalenderPop()}
            />
          </span>
        </div> */}
         <div className={styles.datePickerContainer}>
              <YearPickerV2
                customClass={ styles.datePick }
                name="startDate"
                startDate={startDate}
                  handleChange={(e) => { setStartDate(e.target.value) }}
          
              />
            </div> 
            <div className={styles.selectFieldContainer}>
            {/* <div className={styles.label}>Allocate to: </div> */}
            <div
              className={styles.selectlistContent}
              ref={ref}
              onClick={() => setAllocateOpen((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContainerItems}>
                  <span className={styles.dropdownContent}>{selUnitType?selUnitType:'All'}</span>
                  <div className={styles.dropdownIconContainer}>
                    <div className={styles.dropdownIcon}>
                      <DropdownIcon2 fillColor="#FFFFFF" />
                    </div>
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  {allocateOpen ? (
                    <DropDown
                      // dropdownItems={fund ? fund?.allocatedLists : []}
                      dropdownItems={unitType?.length>0?unitType:[]}
                      customClassForContent={styles.dropdownListContent1}
                      customClassForItems={styles.dropdownListItems}
                      setSelected={setSelUnitType}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        <FilledButton title="View" handleClick={()=>handleView()} customClass={styles.viewBtn} />
        <FilledButton
          handleClick={() => handleAddPricing()}
          title="Add Pricing"
          customClass={styles.addPricingBtn}
        />
      </div>
      {pricingData?.tableDataList?.length > 0 ?
        <TableV5
          tableHeader={pricingData?.headerList}
           tableData={pricingData?.tableDataList}
          // tableData={tem}
          handleAction={setEditableValue}
        />
        :
        <NoRecordFound />
      }
    </div>
  );
};

export default Pricing;
