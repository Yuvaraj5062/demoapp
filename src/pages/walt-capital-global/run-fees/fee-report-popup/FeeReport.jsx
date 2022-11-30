import { useState, useRef, useEffect } from "react";
import DropDown from "../../../../component/dropdown/DropDown";
import FilledButton from "../../../../component/filled-button/FilledButton";
import { Cross, DropdownIcon2 } from "../../../../component/svg-components";
import styles from "./feereport.module.scss";
import { monthdata, feeData } from "../../../../data/data";
import FeeYearlyReport from "../fee-report-yearly-popup/FeeYearlyReport";
import Popup from "../../../../component/popup/Popup";
const RunFee = ({ handleClose }) => {
  const [click, setClick] = useState(false);
  const [selected, setSelected] = useState("ghjsdk");
  const [val, setVal] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click && ref.current && !ref.current.contains(e.target)) {
        setClick(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click]);

  useEffect(() => {}, [val]);
  return (
    <>
      <div
        className={styles.runFeeContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {val === "Last 12 Month" ? (
          <Popup Children={FeeYearlyReport} handleClose={() => handleClose()} />
        ) : (
          <>
            <div className={styles.feeReportCross}>
              Walt Capital Global Fund Fee Report
              <span className={styles.crossIcon}>
                <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
              </span>
            </div>

            <div className={styles.tableContent}>
              <div className={styles.date}>
                <span className={styles.dateDetails}> Date: </span>
                <div className={styles.detail}>
                  <span>2020-10-30</span>
                  <DropdownIcon2 fillColor="#0868AA" />
                </div>
              </div>

              <div
                className={styles.dropdownContainer}
                onClick={() => setClick((prevState) => !prevState)}
                ref={ref}
              >
                <div className={styles.lastMonth}>
                  <span>Latest Month</span>
                  <DropdownIcon2 fillColor="#0868AA" />
                </div>
                <div>
                  {click ? (
                    <DropDown
                      dropdownItems={monthdata}
                      customClassForContent={styles.dropdownListContent}
                      customClassForItems={styles.dropdownListItems}
                      setSelected={setVal}
                    />
                  ) : null}
                </div>
              </div>

              <div className={styles.dateRange}>
                <span className={styles.rangeDetails}> Date Range: </span>
                <div className={styles.rangeData}>
                  <span className={styles.dateText}>2020-10-30</span>
                  <DropdownIcon2 fillColor="#0868AA" />
                </div>
                <span className={styles.toText}> To </span>
                <div className={styles.rangeData}>
                  <span className={styles.dateText}>2020-12-01</span>
                  <DropdownIcon2 fillColor="#0868AA" />
                </div>
                <FilledButton
                  title="Search"
                  customClass={styles.search}
                  handleClick={() => {}}
                />
              </div>

              {/* <FilledButton
                title="Search"
                customClass={styles.search}
                handleClick={() => {}}
              /> */}
            </div>
            <div className={styles.popupContainer}>
              <div className={styles.fees}>
                <span> Fee Summary</span>
              </div>
              {feeData.map((item, index) => {
                return (
                  <div className={styles.mapData} key={index}>
                    <span className={styles.title}> {item.title}</span>

                    <div className={styles.mainContainer}>
                      <span className={styles.country}>{item.country}</span>

                      <span className={styles.price}>{item.price}</span>
                    </div>
                  </div>
                );
              })}
              <div className={styles.feesPeriod}>
                <span> Total fees for the period</span>
                <div className={styles.container}>
                  <span className={styles.USDText}> USD</span>
                  <span>138,140.23</span>
                </div>
              </div>
            </div>

            <div className={styles.pdfContainer}>
              <div className={styles.button}>
                <FilledButton
                  title="Print to PDF"
                  customClass={styles.pdfButton}
                  handleClick={() => {}}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RunFee;
