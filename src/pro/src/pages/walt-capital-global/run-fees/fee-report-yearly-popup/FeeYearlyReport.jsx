import { useEffect, useRef, useState } from "react";
import DropDown from "../../../../component/dropdown/DropDown";
import FilledButton from "../../../../component/filled-button/FilledButton";
import { Cross, DropdownIcon2 } from "../../../../component/svg-components";

import {
  feeData,
  monthNameData,
  monthdata,
  yearNumber,
} from "../../../../data/data";
import styles from "./feeyearlyreport.module.scss";
const FeeYearlyReport = ({ handleClose }) => {
  const [click, setClick] = useState(false);
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
  return (
    <>
      <div
        className={styles.yearReportContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.yearReportCross}>
          Walt Capital Global Fund Fee Report
          <span className={styles.crossIcon}>
            <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
          </span>
        </div>

        <div className={styles.popupContainer}>
          <div className={styles.tableData}>
            <div className={styles.yearTitle}>
              {yearNumber.map((item, index) => {
                return (
                  <span className={styles.title} key={index}>
                    {item}
                  </span>
                );
              })}
            </div>

            <div className={styles.mainData}>
              <div
                className={styles.dropdownContainer}
                onClick={() => setClick((prevState) => !prevState)}
                ref={ref}
              >
                <div className={styles.lastMonth}>
                  <span>Latest 3 Months</span>
                  <DropdownIcon2 fillColor="#0868AA" />
                </div>
                <div>
                  {click ? (
                    <DropDown
                      dropdownItems={monthdata}
                      customClassForContent={styles.dropdownListContent}
                      customClassForItems={styles.dropdownListItems}
                    />
                  ) : null}
                </div>
              </div>
              <FilledButton
                title="Search"
                customClass={styles.search}
                handleClick={() => {}}
              />
            </div>
          </div>
          <div className={styles.monthTitle}>
            {monthNameData.map((item, index) => {
              return (
                <span className={styles.title} key={index}>
                  {item}
                </span>
              );
            })}
          </div>

          <div className={styles.month}>
            <span> Last 12 Month </span>
          </div>
          <div className={styles.feeSummary}>
            <span> Fee Summary</span>
          </div>
          {feeData.map((item, index) => {
            return (
              <div className={styles.mapDetails} key={index}>
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
              <span> USD</span>
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
      </div>
    </>
  );
};
export default FeeYearlyReport;
