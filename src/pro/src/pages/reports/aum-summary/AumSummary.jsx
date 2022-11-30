import React from "react";

import { useEffect, useRef, useState } from "react";

import { TableHeader, TableRow } from "../../../component/table/Table";
import styles from "./aumsummary.module.scss";
import accLine2 from "../../../assets/images/accLine2.png";
import accLine1 from "../../../assets/images/accLine1.png";
import DatePicker from "react-datepicker";
import DropDown from "../../../component/dropdown/DropDown";
import { DateIcon, DropdownIcon2 } from "../../../component/svg-components";
import "react-datepicker/dist/react-datepicker.css";
import {
  aumSummaryHeader,
  aumSummaryTable,
  IFAsTableData,
} from "../../../data/data";
import FilledButton from "../../../component/filled-button/FilledButton";
import Search from "../../../component/search/Search";
import AmountCard from "../../../component/amount-card/AmountCard";
import Balance from "../../../component/balance/Balance";
import { colors } from "../../../constants/Colors";
import { balanceData } from "../../../data/data";
import { useNavigate } from "react-router-dom";

const AumSummary = () => {
  const ref = useRef();
  const ref1 = useRef();
  const refClient = useRef();
  const calenderRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };

  const clientNames = IFAsTableData.map((item) => item.name);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropdown && ref1.current && !ref1.current.contains(e.target)) {
        setDropdown(false);
      }
      if (click && refClient.current && !ref1.current.contains(e.target)) {
        setClick(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdown, click]);
  const handleBalanceNavigate = (item) => {
    item && navigate(`/dashboard/${item}`);
  };

  return (
    <div className={styles.aumContainer}>
      <div className={styles.dashboardHeaderContainer}>
        <div className={styles.datePickerContainer}>
          <DatePicker
            wrapperClassName={styles.datePicker}
            popperClassName={styles.datePick}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd-MMMM-yyyy"
            showMonthYearPicker
            showFourColumnMonthYearPicker
            showYearDropdown
          />
          <span className={styles.iconContainer} ref={calenderRef}>
            <DateIcon
              fillColor="#969BA0"
              handleClick={() => handleClickCalenderPop()}
            />
          </span>
        </div>

        <FilledButton
          title="View"
          customClass={styles.viewBtn}
          handleClick={() => {}}
          handleMouseEnter={() => {}}
          handleMouseLeave={() => {}}
        />
        {/* </div>

        <div className={styles.dropdowns}> */}

        <div
          className={styles.dropdownContainer}
          ref={refClient}
          onClick={() => setClick((prevState) => !prevState)}
        >
          <div className={styles.dropdownContainerItems}>
            <span className={styles.dropdownContent}>Pierre van der Walt</span>
            <DropdownIcon2 fillColor="#969BA0" />
          </div>
          <div>
            {click ? (
              <DropDown
                dropdownItems={clientNames}
                customClassForContent={styles.dropdownListContent}
                customClassForItems={styles.dropdownListItems}
              />
            ) : null}
          </div>
        </div>
        <div
          className={styles.dropdownContainer1}
          ref={ref}
          onClick={() => setDropdown((prevState) => !prevState)}
        >
          <div className={styles.dropdownContainerItems}>
            <span className={styles.dropdownContent}>Cap Town</span>
            <DropdownIcon2 fillColor="#969BA0" />
          </div>
          <div className={styles.dropdownMain}>
            {dropdown ? (
              <DropDown
                dropdownItems={clientNames}
                customClassForContent={styles.dropdownListContent1}
                customClassForItems={styles.dropdownListItems}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.searchBar}>
          <Search
            customClass={styles.search}
            inputCustomClass={styles.input}
            placeholder="Search IFAs"
          />
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.amountContainer}>
          <AmountCard
            amountType="Local Aum"
            amount="ZAR 16,141,599"
            clients="112"
            accLine={accLine2}
          />
          <div className={styles.amountContainer1}>
            <AmountCard
              amountType="Offshore Aum"
              amount="USD 5,325,145"
              clients="112"
              accLine={accLine1}
            />
          </div>
        </div>
      </div>
      <div className={styles.dataTable}>
        <div className={styles.balanceContainer}>
          {balanceData.map((item, index) => {
            return (
              <div className={styles.balanceContent} key={index}>
                <Balance
                  title={item.title}
                  handleBalanceClick={() => {
                    handleBalanceNavigate(item.navigate);
                  }}
                  value={item.value}
                  clients={item.clients}
                  percentage={item.percentage}
                  color={index <= 5 ? colors.grey4 : colors.brown}
                  customClass={
                    index <= 5
                      ? styles.border1CustomClass
                      : styles.border2CustomClass
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AumSummary;
