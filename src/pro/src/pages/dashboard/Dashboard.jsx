import styles from "./dashboard.module.scss";
import { balanceData } from "../../data/data";
import accLine1 from "../../assets/images/accLine1.png";
import accLine2 from "../../assets/images/accLine2.png";
import AmountCard from "../../component/amount-card/AmountCard";
import MonthlyFees from "../../component/monthly-fees/MonthlyFees";
import GlobalFundCard from "../../component/global-fund-card/GlobalFundCard";
import { monthlyFeesSAData } from "../../data/data";
import { monthlyFeesCookData } from "../../data/data";
import FilledButton from "../../component/filled-button/FilledButton";
import { IFAsTableData } from "../../data/data";
import DropDown from "../../component/dropdown/DropDown";
import { DateIcon, DropdownIcon2 } from "../../component/svg-components";
import { useEffect, useRef, useState } from "react";
import Balance from "../../component/balance/Balance";
import { colors } from "../../constants/Colors";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/libraries.css";
import { useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
const Dashboard = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const refClient = useRef();
  const ref = useRef();

  const calenderRef = useRef();

  const handleClickCalenderPop = () => {
    calenderRef.current.click();
  };

  const clientNames = IFAsTableData.map((item) => item.name);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click && refClient.current && !refClient.current.contains(e.target)) {
        setClick(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropdown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdown]);
  const handleView = () => { };

  const handleBalanceNavigate = (item) => {
  item && navigate(item);
  };
 
  const {role} = useRole();

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardHeaderContainer}>
          <div className={styles.dataViewContainer}>
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
              handleClick={() => handleView()}
              handleMouseEnter={() => { }} handleMouseLeave={() => { }}
            />
          </div>
          <div className={styles.dropdowns}>
            <FilledButton
              title="Daily Trade Log"
              customClass={styles.dailyTradeLogButton}   
              handleClick={() => navigate('daily-trade-log')}
              handleMouseEnter={() => { }} handleMouseLeave={() => { }}
            />
            <div
              className={styles.dropdownContainer}
              ref={refClient}
              onClick={() => setClick((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainerItems}>
                <span className={styles.dropdownContent}>
                  Pierre van der Walt
                </span>
                <DropdownIcon2 fill          Color="#969BA0" />
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
              className={styles.dropdownContainer}
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
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.amountContainer}>
            <AmountCard
              amountType="Local Aum"
              amount="ZAR 36,141,599"
              clients="112"
              accLine={accLine2}
            />
            <AmountCard
              amountType="Offshore Aum"
              amount="USD 5,325,145"
              clients="112"
              accLine={accLine1}
            />
          </div>
          <div className={styles.monthlyFeesContainer}>
            <MonthlyFees
              monthlyFeesTitle="Walt Capital SA monthly fees"
              totalAmount="ZAR: 291,426"
              feesData={monthlyFeesSAData}
              role={role}
            />
            <MonthlyFees
              monthlyFeesTitle="Walt Capital Offshore monthly fees"
              totalAmount="USD: 117,818"
              feesData={monthlyFeesCookData}
              role={role}
            />
          </div>
          {
          <GlobalFundCard title="Global Portfolio?" />
          }
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
    </>
  );
};

export default Dashboard;
