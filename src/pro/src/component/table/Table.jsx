import { useNavigate } from "react-router-dom";
import FilledButton from "../filled-button/FilledButton";
import styles from "./table.module.scss";
import { Cross, RightClick, UpDirection } from "../svg-components";
import DatePicker from "react-datepicker";
import "../../styles/libraries.css";
import { useState } from "react";
import ToggleSwitch from "../toggle-switch/ToggleSwitch";
import Range from "../range/Range";
import CheckBox from "../check-box/CheckBox";
const TableHeader = ({
  customClass,
  data,
  arrow,
  customarrowClass,
  customClassForTh,
  customClassForTh1,
  customClassForTh2,
  isToggled,
  customClassForThLast,
}) => {
  return (
    <tr className={customClass}>
      {arrow && (
        <div className={customarrowClass}>
          {/* <LeftArrow fillColor="#ffffff" /> */}
        </div>
      )}
      {data.map((item, index) => {
        return (
          <th
            key={index}
            className={[
              customClassForTh,
              index === 0
                ? customClassForTh1
                : index === data.length - 1
                ? customClassForThLast
                : customClassForTh2,
            ].join(" ")}
          >
            {item}
          </th>
        );
      })}
      {!isToggled ? null : <th>Investment Value </th>}
    </tr>
  );
};
const TableRow = ({
  customClass,
  buttonGroup,
  data,
  clientsdata,
  firstColumn,
  runfeesData,
  ifasData,
  fundbenchmarkData,
  gotoButton,
  id,
  taxfreeinvestmentData,
  taxfreeinvestmentData2,
  clientlistdata,
  activeDeactiveFundData,
  handleClose,
  clientDetailsTableDta,
  banchmarksTable,
  riskStatistics,
  ppmClientListTableData,
  ppmClientListSumData,
  tradestationTableData,
  interactiveBrokersTableData,
  portfolioManagerData,
  allenGrayClientListData,
  accountSummary,
  ifaClientListData,
  OffshoreListTableData,
  modelEquityPortfolioData,
  customClassForTd,
  saEquityBody,
  modelEquityPortfolioCash,
  modelEquityPortfolioFooter,
  isToggled,
  JSETaxFreeAccountData,
  waltCapitalClientTableData,
  aumSummaryTable,
  monthlyReportsdata,
  calcButton,
  datePicker,
  datePick,
  runfeesTotalData,
  ifaBreakDownPage,
  ifaBreakDownBody,
  attentionData,
  attentionData1,
  customClassforTotal,
  dailyTradeLogTableData,
  customClassForTd1,
  customClassForTd2,
  customClassForTd3,
  customClassForTdLast,
  clientListSumData,
  updirectionButtonStyle,
  offshoreClientListTableFooter,
  modelPortfolioTableData,
  riskStatisticTableData,
  topHoldingsTableData,
  monthlyPerformanceTable,
  IFAFeeReportTableData,
  runFeesPPMTableData,
  runFeesPPMEquityData,
  runTradeStationTableData,
  tradeStationTableSumData,
  tradeStationClientData,
  tradingBody,
  manageuserloginpasswordTableData,
}) => {
  const navigate = useNavigate();

  const handleGoTo = (index) => {
    id && navigate(`/clients/${index}`);
  };
  const handleGoToIfas = (index) => {
    id && navigate(`/ifas/${index}`);
  };
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const handleOnToggle1 = () => {
    setToggle1(!toggle1);
  };
  const handleOnToggle2 = () => {
    setToggle2(!toggle2);
  };

  const [startDate, setStartDate] = useState(new Date());

  if (data) {
    return (
      <tr className={customClass}>
        <td className={styles.initialColumn}>
          <span className={firstColumn}>{data.initial}</span>
        </td>
        <td className={styles.name}>{data.name}</td>
        <td className={styles.age}>{data.age}</td>
        <td className={styles.birthdayDate}>{data.birthdayDate}</td>
        <td className={styles.action}>{buttonGroup}</td>
      </tr>
    );
  } else if (clientsdata) {
    return (
      <tr
        className={customClass}
        onClick={() => {
          handleGoTo(1);
        }}
      >
        <td>
          <span className={firstColumn}>{clientsdata.account_no}</span>
        </td>
        <td>{clientsdata.name}</td>
        <td>{clientsdata.email}</td>
        <td>{clientsdata.phone}</td>
        <td>{clientsdata.birthday}</td>
        <td>{clientsdata.joindate}</td>

        {!isToggled ? null : <td>{clientsdata.investment_value}</td>}
      </tr>
    );
  } else if (runfeesData) {
    return (
      <tr className={customClass}>
        <td></td>
        <td className={customClassForTd1}>{runfeesData.fees}</td>
        <td className={customClassForTd2}>{runfeesData.lastRun}</td>
        <td className={customClassForTd2}>{runfeesData.lastAmount}</td>
        <td className={customClassForTd2}>
          <DatePicker
            wrapperClassName={datePicker}
            popperClassName={datePick}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            showMonthYearPicker
            showFourColumnMonthYearPicker
            showYearDropdown
            // placeholderText="2020-10-31"
          />
        </td>
        <td className={customClassForTd2}>
          <FilledButton
            title="Calc."
            customClass={calcButton}
            handleClick={() => {}}
          />{" "}
        </td>
        <td className={customClassForTd2}>{runfeesData.pendingAmount}</td>
        <td className={customClassForTd2}>{runfeesData.total}</td>
        <td className={customClassForTd2}>{runfeesData.vat}</td>
        <td className={customClassForTd2}>{runfeesData.totalvat}</td>
      </tr>
    );
  } else if (runfeesTotalData) {
    return (
      <tr className={customClass}>
        <td></td>
        <td></td>
        {/* <td></td> */}
        <td>{runfeesTotalData.lastrundate}</td>
        <td colSpan={3} className={styles.aumTotal}>
          {runfeesTotalData.lastaum}
        </td>
        {/* <td></td>
        <td></td> */}
        {/* <td></td> */}
        <td colSpan={5}>
          <FilledButton
            title="Go to IFA Fee Breakdown Page"
            customClass={ifaBreakDownPage}
            handleClick={() => navigate("ifafeesbreakdown")}
          />
        </td>
      </tr>
    );
  } else if (ifasData) {
    return (
      <tr
        className={customClass}
        onClick={() => {
          handleGoToIfas(1);
        }}
      >
        <td>{ifasData.wcmIfaNo}</td>
        <td>{ifasData.name}</td>
        <td>{ifasData.surname}</td>
        <td>{ifasData.phone}</td>
        <td>{ifasData.email}</td>
        {/* <td>
          <FilledButton
            title="GO TO"
            customClass={gotoButton}
            handleClick={() => {
              handleGoToIfas(id);
            }}
          />
        </td> */}
        <td>{ifasData.aum}</td>
      </tr>
    );
  } else if (fundbenchmarkData) {
    return (
      <tr className={customClass}>
        <td>{fundbenchmarkData.arrow}</td>
        <td>{fundbenchmarkData.benchmarkplan}</td>
        <td>{buttonGroup}</td>
      </tr>
    );
  } else if (taxfreeinvestmentData) {
    return (
      <tr className={customClass}>
        <td>{taxfreeinvestmentData.name}</td>
        <td>{taxfreeinvestmentData.code}</td>
        <td>{taxfreeinvestmentData.volume}</td>
        <td>{taxfreeinvestmentData.costPrice}</td>
        <td>{taxfreeinvestmentData.currentPrice}</td>
        <td>{taxfreeinvestmentData.change}</td>
        <td>{taxfreeinvestmentData.currentValue}</td>
        <td>{taxfreeinvestmentData.ofPortfolio}</td>
      </tr>
    );
  } else if (taxfreeinvestmentData2) {
    return (
      <tr className={customClass}>
        <td>{taxfreeinvestmentData2.name}</td>
        {/* <td>{taxfreeinvestmentData2.code}</td> */}
        <td>{taxfreeinvestmentData2.volume}</td>
        {/* <td>{taxfreeinvestmentData2.costPrice}</td> */}
        {/* <td>{taxfreeinvestmentData2.currentPrice}</td> */}
        <td>{taxfreeinvestmentData2.change}</td>
        <td>{taxfreeinvestmentData2.currentValue}</td>
        <td>{taxfreeinvestmentData2.ofPortfolio}</td>
      </tr>
    );
  } else if (clientlistdata) {
    return (
      <tr className={customClass}>
        <td className={styles.initialColumn}>
          <span className={firstColumn}>{clientlistdata.initial}</span>
        </td>
        <td className={styles.initialColumn}>{clientlistdata.name}</td>
        <td className={styles.initialColumn}>{clientlistdata.title}</td>
        <td className={styles.initialColumn}>{clientlistdata.accNumber}</td>
        <td className={styles.initialColumn}>{clientlistdata.units}</td>
        <td className={styles.initialColumn}>{clientlistdata.value}</td>
        <td className={styles.initialColumn}>{clientlistdata.costNav}</td>
        <td className={styles.initialColumn}>{clientlistdata.currentNav}</td>
        <td className={styles.initialColumn}>{clientlistdata.telNo}</td>
        <td className={styles.initialColumn}>{clientlistdata.mobileNo}</td>
        <td className={styles.initialColumn}>{clientlistdata.email}</td>
        <td className={styles.initialColumn}></td>
      </tr>
    );
  } else if (clientListSumData) {
    return (
      <tr className={customClass}>
        <td className={customClassforTotal}></td>
        <td className={customClassforTotal}></td>
        <td className={customClassforTotal}></td>
        <td className={customClassforTotal}>{clientListSumData.total}</td>
        <td className={customClassforTotal}>{clientListSumData.units_total}</td>
        <td className={customClassforTotal}>{clientListSumData.value_total}</td>
        <td className={customClassforTotal}></td>
        <td className={customClassforTotal}></td>
        <td className={customClassforTotal}></td>
        <td className={customClassforTotal}></td>
        {/* <td colSpan={4}>
          <FilledButton
            title="Go to IFA Fee Breakdown Page"
            customClass={ifaBreakDownPage}
            handleClick={() => navigate("ifafeesbreakdown")}
          />
        </td> */}
        <td className={customClassForTd}>
          <FilledButton
            icon={<UpDirection fillColor="#FFFFFF" />}
            customClass={updirectionButtonStyle}
          />
        </td>
      </tr>
    );
  } else if (activeDeactiveFundData) {
    return (
      <tr className={customClass}>
        <td>{activeDeactiveFundData.fund}</td>
        <td>{activeDeactiveFundData.status}</td>
        <td>
          <FilledButton
            title={activeDeactiveFundData.reverse}
            customClass={gotoButton}
            handleClick={() => handleClose()}
          />
        </td>
      </tr>
    );
  } else if (clientDetailsTableDta) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd1}>{clientDetailsTableDta.Funds}</td>
        <td className={customClassForTd2}>{clientDetailsTableDta.Nov2019}</td>
        <td className={customClassForTd2}>{clientDetailsTableDta.Dec2019}</td>
        <td className={customClassForTd2}>{clientDetailsTableDta.Jan2020}</td>
        <td
          className={
            clientDetailsTableDta.Feb2020 < 0
              ? customClassForTd
              : customClassForTd2
          }
        >
          {clientDetailsTableDta.Feb2020}%
        </td>
        <td
          className={
            clientDetailsTableDta.Mar2020 < 0
              ? customClassForTd
              : customClassForTd2
          }
        >
          {clientDetailsTableDta.Mar2020}%
        </td>
        <td
          className={
            clientDetailsTableDta.Apr2020 < 0
              ? customClassForTd
              : customClassForTd2
          }
        >
          {clientDetailsTableDta.Apr2020}%
        </td>
        <td
          className={
            clientDetailsTableDta.May2020 < 0
              ? customClassForTd
              : customClassForTd2
          }
        >
          {clientDetailsTableDta.May2020}%
        </td>
        <td
          className={
            clientDetailsTableDta.Jun2020 < 0
              ? customClassForTd
              : customClassForTd2
          }
        >
          {clientDetailsTableDta.Jun2020}%
        </td>
        <td
          className={
            clientDetailsTableDta.jul2020 < 0
              ? customClassForTd
              : customClassForTd2
          }
        >
          {clientDetailsTableDta.jul2020}%
        </td>
        <td
          className={
            clientDetailsTableDta.Aug2020 < 0
              ? customClassForTd
              : customClassForTd2
          }
        >
          {clientDetailsTableDta.Aug2020}%
        </td>
        <td
          className={
            clientDetailsTableDta.Sep2020 < 0
              ? customClassForTd
              : customClassForTd2
          }
        >
          {clientDetailsTableDta.Sep2020}%
        </td>
        <td className={customClassForTd2}>{clientDetailsTableDta.Oct2020}</td>
        <td
          className={
            clientDetailsTableDta.YTD < 0
              ? customClassForTd
              : customClassForTdLast
          }
        >
          {clientDetailsTableDta.YTD}%
        </td>
      </tr>
    );
  } else if (banchmarksTable) {
    return (
      <tr className={customClass}>
        <td className={styles.nameClass}>{banchmarksTable.name}</td>
        <td>{banchmarksTable.months}</td>
        <td>{banchmarksTable.year}</td>
        <td>{banchmarksTable.yearDate}</td>
        <td>{banchmarksTable.inception}</td>
      </tr>
    );
  } else if (riskStatistics) {
    return (
      <tr className={customClass}>
        <td>{riskStatistics.name}</td>
        <td>{riskStatistics.value}</td>
      </tr>
    );
  } else if (ppmClientListTableData) {
    return (
      <tr className={customClass}>
        <td>{ppmClientListTableData.surname}</td>
        <td>{ppmClientListTableData.name}</td>
        <td>{ppmClientListTableData.accountNo}</td>
        <td>{ppmClientListTableData.accValue}</td>
        <td>{ppmClientListTableData.currency}</td>
      </tr>
    );
  } else if (ppmClientListSumData) {
    return (
      <tr className={customClass}>
        <td>{ppmClientListSumData.surname}</td>
        <td>{ppmClientListSumData.name}</td>
        <td className={customClassForTd}>{ppmClientListSumData.accountNo}</td>
        <td className={customClassForTd}>{ppmClientListSumData.accValue}</td>
        <td className={customClassForTd}>{ppmClientListSumData.currency}</td>
      </tr>
    );
  } else if (tradestationTableData) {
    return (
      <tr className={customClass}>
        <td>{tradestationTableData.clientName}</td>
        <td>{tradestationTableData.acount}</td>
        <td>{tradestationTableData.portfolioValue}</td>
        <td>{tradestationTableData.email}</td>
        <td>{tradestationTableData.contactNumber}</td>
        <td>{tradestationTableData.portfolioManager}</td>
      </tr>
    );
  } else if (interactiveBrokersTableData) {
    return (
      <tr className={customClass}>
        <td>{interactiveBrokersTableData.accountNo}</td>
        <td>{interactiveBrokersTableData.waltCapNo}</td>
        <td>{interactiveBrokersTableData.name}</td>
        <td>{interactiveBrokersTableData.surname}</td>
        <td>{interactiveBrokersTableData.portfolioValue}</td>
        <td>{interactiveBrokersTableData.portfolioManager}</td>
      </tr>
    );
  } else if (portfolioManagerData) {
    return (
      <tr className={customClass}>
        {/* <td>{portfolioManagerData.symbol}</td> */}
        <td>{portfolioManagerData.name}</td>
        <td>{portfolioManagerData.localFee}</td>
        <td>{portfolioManagerData.offshoreFee}</td>
        <td>{portfolioManagerData.performanceFee}</td>
        <td>{portfolioManagerData.perfFeesOffshore}</td>
        <td>{portfolioManagerData.minFees}</td>
        <td>{portfolioManagerData.total}</td>
        <td>{portfolioManagerData.vat}</td>
      </tr>
    );
  } else if (allenGrayClientListData) {
    return (
      <tr className={customClass}>
        <td className={styles.nameColumn}>{allenGrayClientListData.name}</td>
        <td className={styles.idColumn}>{allenGrayClientListData.id}</td>
        <td className={styles.amountColumn}>
          {allenGrayClientListData.amount}
        </td>
      </tr>
    );
  } else if (accountSummary) {
    return (
      <tr className={customClass}>
        <td>{accountSummary.name}</td>
        <td>
          {accountSummary.value} {accountSummary.icon}
        </td>
      </tr>
    );
  } else if (ifaClientListData) {
    return (
      <tr className={customClass}>
        <td>{ifaClientListData.name}</td>
        <td>{ifaClientListData.surname}</td>
        <td>{ifaClientListData.clientID}</td>
        <td>{ifaClientListData.ifaID}</td>
      </tr>
    );
  } else if (OffshoreListTableData) {
    return (
      <tr
        className={customClass}
        onClick={() => {
          handleGoTo(id);
        }}
      >
        <td className={customClassForTd}>{OffshoreListTableData.surname}</td>
        <td className={customClassForTd}>{OffshoreListTableData.name}</td>
        <td className={customClassForTd}>{OffshoreListTableData.accountNo}</td>
        <td className={customClassForTd}>{OffshoreListTableData.accValue}</td>
        <td className={customClassForTd}>{OffshoreListTableData.currency}</td>
        {/* <td className={styles.buttonGroup}>
          <FilledButton
            title="GO TO"
            customClass={gotoButton}
            handleClick={() => {
              handleGoTo(id);
            }}
          />
        </td> */}
      </tr>
    );
  } else if (modelEquityPortfolioData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{modelEquityPortfolioData.name}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.code}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.volume}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.cost}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.current}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.change}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.value}</td>
        <td className={customClassForTd}>
          {modelEquityPortfolioData.portfolio}
        </td>
      </tr>
    );
  } else if (JSETaxFreeAccountData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{JSETaxFreeAccountData.surname}</td>
        <td className={customClassForTd}>{JSETaxFreeAccountData.name}</td>
        <td className={customClassForTd}>
          {JSETaxFreeAccountData.accountNumber}
        </td>
        <td className={customClassForTd}>
          {JSETaxFreeAccountData.accountValue}
        </td>
        <td className={customClassForTd}>{JSETaxFreeAccountData.currency}</td>
        <td className={customClassForTd}>
          <FilledButton
            title="GO TO"
            customClass={gotoButton}
            // handleClick={() => {
            //   handleGoToIfas(id);
            // }}
          />
        </td>
      </tr>
    );
  } else if (aumSummaryTable) {
    return (
      <tr className={customClass}>
        <td className={aumSummaryTable.product === "Total" ? firstColumn : ""}>
          {aumSummaryTable.product}
        </td>
        <td className={aumSummaryTable.product === "Total" ? firstColumn : ""}>
          {aumSummaryTable.fundCurrency}
        </td>
        <td className={aumSummaryTable.product === "Total" ? firstColumn : ""}>
          {aumSummaryTable.valueFundCurrency}
        </td>
      </tr>
    );
  } else if (modelEquityPortfolioData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{modelEquityPortfolioData.name}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.code}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.volume}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.cost}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.current}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.change}</td>
        <td className={customClassForTd}>{modelEquityPortfolioData.value}</td>
        <td className={customClassForTd}>
          {modelEquityPortfolioData.portfolio}
        </td>
      </tr>
    );
  } else if (modelEquityPortfolioCash) {
    return (
      <tr className={customClass}>
        <td>{modelEquityPortfolioCash.name}</td>
        <td>{modelEquityPortfolioCash.code}</td>
        <td>{modelEquityPortfolioCash.volume}</td>
        <td>{modelEquityPortfolioCash.cost}</td>
        <td>{modelEquityPortfolioCash.current}</td>
        <td className={customClassForTd}>{modelEquityPortfolioCash.change}</td>
        <td className={customClassForTd}>{modelEquityPortfolioCash.value}</td>
        <td className={customClassForTd}>
          {modelEquityPortfolioCash.portfolio}
        </td>
      </tr>
    );
  } else if (modelEquityPortfolioFooter) {
    return (
      <tr className={customClass}>
        <td colSpan={2} className={customClassForTd}>
          {modelEquityPortfolioFooter.name}
        </td>
        <td colSpan={2} className={customClassForTd}>
          {modelEquityPortfolioFooter.volume}
        </td>
        <td colSpan={2} className={customClassForTd}>
          {modelEquityPortfolioFooter.current}
        </td>
        <td className={customClassForTd}>{modelEquityPortfolioFooter.value}</td>
        <td className={customClassForTd}>
          {modelEquityPortfolioFooter.portfolio}
        </td>
      </tr>
    );
  } else if (saEquityBody) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{saEquityBody.accNo}</td>
        <td className={customClassForTd}>{saEquityBody.name}</td>
        <td className={customClassForTd}>{saEquityBody.email}</td>
        <td className={customClassForTd}>{saEquityBody.telNO}</td>
        <td className={customClassForTd}>{saEquityBody.birthday}</td>
        <td className={customClassForTd}>{saEquityBody.joindate}</td>
        <td className={customClassForTd}>{saEquityBody.investmentValue}</td>
        {/* <td className={customClassForTd}>{saEquityBody.telNO}</td>
        <td className={customClassForTd}>{saEquityBody.Mob}</td>
        <td className={customClassForTd}>{saEquityBody.email}</td> */}
      </tr>
    );
  } else if (waltCapitalClientTableData) {
    return (
      <tr className={customClass}>
        <td>{waltCapitalClientTableData.name}</td>
        <td>{waltCapitalClientTableData.title}</td>
        <td>{waltCapitalClientTableData.acount_no}</td>
        <td>{waltCapitalClientTableData.units}</td>
        <td>{waltCapitalClientTableData.value}</td>
        <td>{waltCapitalClientTableData.cost_nav}</td>
        <td>{waltCapitalClientTableData.current_nav}</td>
        <td>{waltCapitalClientTableData.tel}</td>
        <td>{waltCapitalClientTableData.mobile_no}</td>
        <td>{waltCapitalClientTableData.email}</td>
      </tr>
    );
  } else if (monthlyReportsdata) {
    return (
      <tr className={customClass}>
        <td>{monthlyReportsdata.name}</td>
        <td>{monthlyReportsdata.surname}</td>
        <td>{monthlyReportsdata.clientID}</td>
        <td>{monthlyReportsdata.ifaID}</td>
        <td>{monthlyReportsdata.transValue}</td>
        <td>{monthlyReportsdata.units}</td>
        <td>{monthlyReportsdata.date}</td>

        <td>
          {monthlyReportsdata.upfrontFee}{" "}
          <FilledButton
            title="Manage"
            customClass={gotoButton}
            handleClick={() => {}}
          />
        </td>
        <td>
          {monthlyReportsdata.annualFee}{" "}
          <FilledButton
            title="Manage"
            customClass={gotoButton}
            handleClick={() => {}}
          />
        </td>

        <td>{monthlyReportsdata.fund}</td>
      </tr>
    );
  } else if (ifaBreakDownBody) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{ifaBreakDownBody.arrow}</td>
        <td className={customClassForTd}>{ifaBreakDownBody.name}</td>
        <td className={customClassForTd}>{ifaBreakDownBody.surname}</td>
        <td className={customClassForTd}>{ifaBreakDownBody.tel}</td>
        <td className={customClassForTd}>{ifaBreakDownBody.email}</td>
        <td className={customClassForTd}>{ifaBreakDownBody.ifa}</td>
        <td className={customClassForTd}>{ifaBreakDownBody.aum}</td>
        <td className={customClassForTd}>{ifaBreakDownBody.zar}</td>
        <td className={customClassForTd}>{ifaBreakDownBody.vat}</td>
        <td className={customClassForTd}>{ifaBreakDownBody.total}</td>
        <td className={customClassForTd}>{ifaBreakDownBody.usd}</td>
      </tr>
    );
  } else if (attentionData1) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{attentionData1.total}</td>
        <td className={customClassForTd}>{attentionData1.value}</td>
      </tr>
    );
  } else if (attentionData) {
    return (
      <tr className={customClass}>
        <td>{attentionData.attention_fees}</td>
        <td>{attentionData.client}</td>
        <td>{attentionData.fund}</td>
        <td>{attentionData.date}</td>
        <td>{attentionData.amount_excl}</td>
        <td>{attentionData.amount_incl}</td>
      </tr>
    );
  } else if (dailyTradeLogTableData) {
    return (
      <tr className={customClass}>
        <td>
          <ToggleSwitch
            handleToggle={() => {
              handleOnToggle1();
            }}
            leftIcon="R"
            rightIcon="M"
            isToggled={toggle1}
          />
        </td>
        <td>
          {" "}
          <ToggleSwitch
            handleToggle={() => {
              handleOnToggle2();
            }}
            leftIcon={<RightClick fillColor="#ffffff" />}
            rightIcon={<Cross fillColor="#ffffff" />}
            isToggled={toggle2}
          />
        </td>
        <td>{dailyTradeLogTableData.name}</td>
        <td>{dailyTradeLogTableData.code}</td>
        <td>{dailyTradeLogTableData.quntity}</td>
        <td>{dailyTradeLogTableData.price}</td>
        <td>{dailyTradeLogTableData.accountNumber}</td>
        <td>{dailyTradeLogTableData.tradeNumber}</td>
        <td>{dailyTradeLogTableData.fee}</td>
        <td>{dailyTradeLogTableData.comment}</td>
      </tr>
    );
  } else if (offshoreClientListTableFooter) {
    return (
      <tr className={customClass}>
        {/* <td></td> */}
        <td></td>
        <td></td>
        <td className={customClassForTd1}>
          {offshoreClientListTableFooter.accNo}
        </td>
        <td className={customClassForTd2}>
          {offshoreClientListTableFooter.accVal}
        </td>
        <td className={customClassForTd2}>
          {offshoreClientListTableFooter.currency}
        </td>
      </tr>
    );
  } else if (modelPortfolioTableData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{modelPortfolioTableData.duration}</td>
        <td className={customClassForTd}>
          {modelPortfolioTableData.portfolio}
        </td>
        <td className={customClassForTd}>
          {modelPortfolioTableData.percentage}
        </td>
      </tr>
    );
  } else if (riskStatisticTableData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{riskStatisticTableData.duration}</td>
        <td className={customClassForTd}>{riskStatisticTableData.portfolio}</td>
        <td className={customClassForTd}>
          {riskStatisticTableData.percentage}
        </td>
      </tr>
    );
  } else if (topHoldingsTableData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd1}>
          {topHoldingsTableData.typeOfMoney}
        </td>
        <td className={customClassForTd2}>{topHoldingsTableData.percentage}</td>
      </tr>
    );
  } else if (monthlyPerformanceTable) {
    return (
      <>
        {/* <tr>
          <td className={customClassForTd1} rowSpan={2}>
            {monthlyPerformanceTable.year}
          </td>
        </tr> */}
        <tr className={customClass}>
          <td className={customClassForTd}>{monthlyPerformanceTable.type}</td>
          <td
            className={
              monthlyPerformanceTable.jan < 0
                ? customClassForTd2
                : customClassForTd1
            }
          >
            {monthlyPerformanceTable.jan === ""
              ? ""
              : `${monthlyPerformanceTable.jan}%`}
          </td>
          <td
            className={
              monthlyPerformanceTable.feb < 0
                ? customClassForTd2
                : customClassForTd1
            }
          >
            {monthlyPerformanceTable.feb === ""
              ? ""
              : `${monthlyPerformanceTable.feb}%`}
          </td>
          <td
            className={
              monthlyPerformanceTable.mar < 0
                ? customClassForTd2
                : customClassForTd1
            }
          >
            {monthlyPerformanceTable.mar === ""
              ? ""
              : `${monthlyPerformanceTable.mar}%`}
          </td>
          <td className={customClassForTd1}>
            {monthlyPerformanceTable.apr === ""
              ? ""
              : `${monthlyPerformanceTable.apr}%`}
          </td>
          <td className={customClassForTd1}>
            {monthlyPerformanceTable.may === ""
              ? ""
              : `${monthlyPerformanceTable.may}%`}
          </td>
          <td
            className={
              monthlyPerformanceTable.jun < 0
                ? customClassForTd2
                : customClassForTd1
            }
          >
            {monthlyPerformanceTable.jun === ""
              ? ""
              : `${monthlyPerformanceTable.jun}%`}
          </td>
          <td
            className={
              monthlyPerformanceTable.jul < 0
                ? customClassForTd2
                : customClassForTd1
            }
          >
            {monthlyPerformanceTable.jul === ""
              ? ""
              : `${monthlyPerformanceTable.jul}%`}
          </td>
          <td
            className={
              monthlyPerformanceTable.aug < 0
                ? customClassForTd2
                : customClassForTd1
            }
          >
            {monthlyPerformanceTable.aug === ""
              ? ""
              : `${monthlyPerformanceTable.aug}%`}
          </td>
          <td
            className={
              monthlyPerformanceTable.sep < 0
                ? customClassForTd2
                : customClassForTd1
            }
          >
            {monthlyPerformanceTable.sep === ""
              ? ""
              : `${monthlyPerformanceTable.sep}%`}
          </td>
          <td
            className={
              monthlyPerformanceTable.oct < 0
                ? customClassForTd2
                : customClassForTd1
            }
          >
            {monthlyPerformanceTable.oct === ""
              ? ""
              : `${monthlyPerformanceTable.oct}%`}
          </td>
          <td
            className={
              monthlyPerformanceTable.nov < 0
                ? customClassForTd2
                : customClassForTd1
            }
          >
            {monthlyPerformanceTable.nov === ""
              ? ""
              : `${monthlyPerformanceTable.nov}%`}
          </td>
          <td className={customClassForTd1}>
            {monthlyPerformanceTable.dec === ""
              ? ""
              : `${monthlyPerformanceTable.dec}%`}
          </td>
          <td
            className={
              monthlyPerformanceTable.YTD < 0
                ? customClassForTd3
                : customClassForTd
            }
          >
            {monthlyPerformanceTable.YTD}%
          </td>
        </tr>
      </>
    );
  } else if (IFAFeeReportTableData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{IFAFeeReportTableData.name}</td>
        <td className={customClassForTd}>{IFAFeeReportTableData.surname}</td>
        <td className={customClassForTd}>{IFAFeeReportTableData.telNo}</td>
        <td className={customClassForTd}>{IFAFeeReportTableData.email}</td>
        <td className={customClassForTd}>{IFAFeeReportTableData.ifaId}</td>
        <td className={customClassForTd}>{IFAFeeReportTableData.aum}</td>
        <td className={customClassForTd}>{IFAFeeReportTableData.ZARFee}</td>
        <td className={customClassForTd}>{IFAFeeReportTableData.VAT}</td>
        <td className={customClassForTd}>
          {IFAFeeReportTableData.totalZARFee}
        </td>
        <td className={customClassForTd}>{IFAFeeReportTableData.USDFee}</td>
      </tr>
    );
  } else if (runFeesPPMTableData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{runFeesPPMTableData.name}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.surname}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.accNo}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.endValue}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.feeEx}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.VAT}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.total}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.adminFee}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.VAT2}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.total2}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.ifaFee}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.vat3}</td>
        <td className={customClassForTd}>{runFeesPPMTableData.total3}</td>
      </tr>
    );
  } else if (runFeesPPMEquityData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{runFeesPPMEquityData.perFee}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.accNo}</td>
        <td
          className={
            runFeesPPMEquityData.start === "Fees ex vat"
              ? customClassForTd2
              : customClassForTd
          }
        >
          {runFeesPPMEquityData.start}
        </td>
        <td className={customClassForTd}>{runFeesPPMEquityData.dep1}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.dep2}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.endValue}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.pl}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.exVAT}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.exVAT2}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.totalVAT}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.exVAT3}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.totalIncVat}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.nuweWimerk}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.adminFee}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.adminFee}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.total}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.ifaFee}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.vat2}</td>
        <td className={customClassForTd}>{runFeesPPMEquityData.total2}</td>
      </tr>
    );
  } else if (runTradeStationTableData) {
    return (
      <tr className={customClass}>
        <td>{runTradeStationTableData.name}</td>
        <td>{runTradeStationTableData.accNo}</td>
        <td>{runTradeStationTableData.start}</td>
        <td>{runTradeStationTableData.on_dep1}</td>
        <td>{runTradeStationTableData.on_dep2}</td>
        <td>{runTradeStationTableData.end_value}</td>
        <td>{runTradeStationTableData.p_and_l}</td>
        <td>{runTradeStationTableData.fee_ex_vat}</td>
        <td>{runTradeStationTableData.fifteen_fee_ex_vat}</td>
        <td>{runTradeStationTableData.total_fee_ex_vat}</td>
        <td>{runTradeStationTableData.fee_ex_vat1}</td>
        <td>{runTradeStationTableData.total_incl_vat}</td>
        <td>{runTradeStationTableData.nuwe_w_merk}</td>
        <td>{runTradeStationTableData.ifa_fee}</td>
        <td>{runTradeStationTableData.vat}</td>
        <td>{runTradeStationTableData.total}</td>
      </tr>
    );
  } else if (tradeStationTableSumData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{tradeStationTableSumData.name1}</td>
        <td className={customClassForTd}>{tradeStationTableSumData.accNo1}</td>
        <td className={customClassForTd}>{tradeStationTableSumData.start1}</td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.on_dep1_1}
        </td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.on_dep2_1}
        </td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.end_value1}
        </td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.p_and_l_1}
        </td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.fee_ex_vat1}
        </td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.fifteen_fee_ex_vat1}
        </td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.total_fee_ex_vat1}
        </td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.fee_ex_vat1_1}
        </td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.total_incl_vat1}
        </td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.nuwe_w_merk1}
        </td>
        <td className={customClassForTd}>
          {tradeStationTableSumData.ifa_fee1}
        </td>
        <td className={customClassForTd}>{tradeStationTableSumData.vat1}</td>
        <td className={customClassForTd}>{tradeStationTableSumData.total1}</td>
      </tr>
    );
  } else if (tradeStationClientData) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{tradeStationClientData.name}</td>
        <td className={customClassForTd}>{tradeStationClientData.accNo}</td>
        <td className={customClassForTd}>{tradeStationClientData.start}</td>
        <td className={customClassForTd}>{tradeStationClientData.on_dep1}</td>
        <td className={customClassForTd}>{tradeStationClientData.on_dep2}</td>
        <td className={customClassForTd}>{tradeStationClientData.end_value}</td>
        <td className={customClassForTd}>{tradeStationClientData.p_and_l}</td>
        <td className={customClassForTd}>
          {tradeStationClientData.fee_ex_vat}
        </td>
        <td className={customClassForTd}>
          {tradeStationClientData.fifteen_fee_ex_vat}
        </td>
        <td className={customClassForTd}>
          {tradeStationClientData.total_fee_ex_vat}
        </td>
        <td className={customClassForTd}>
          {tradeStationClientData.fee_ex_vat1}
        </td>
        <td className={customClassForTd}>
          {tradeStationClientData.total_incl_vat}
        </td>
        <td className={customClassForTd}>
          {tradeStationClientData.new_high_w_mark}
        </td>
        <td className={customClassForTd}>{tradeStationClientData.ifa_fee}</td>
        <td className={customClassForTd}>{tradeStationClientData.vat}</td>
        <td className={customClassForTd}>{tradeStationClientData.total}</td>
      </tr>
    );
  } else if (tradingBody) {
    return (
      <tr className={customClass}>
        <td className={customClassForTd}>{tradingBody.bid}</td>
        <td className={customClassForTd}>{tradingBody.spread}</td>
        <td className={customClassForTd}>{tradingBody.ask}</td>
        <td className={customClassForTd}>
          <Range />
        </td>
      </tr>
    );
  } else if (manageuserloginpasswordTableData) {
    return (
      <tr className={customClass}>
        <td>{manageuserloginpasswordTableData.users}</td>
        <td>
          <CheckBox
            ischecked={manageuserloginpasswordTableData.login ? true : false}
          />
        </td>
        <td>
          <CheckBox
            ischecked={
              manageuserloginpasswordTableData.dashboard ? true : false
            }
          />
        </td>
        <td>
          <CheckBox
            ischecked={
              manageuserloginpasswordTableData.watchLists ? true : false
            }
          />
        </td>
        <td>
          <CheckBox
            ischecked={manageuserloginpasswordTableData.clients ? true : false}
          />
        </td>
        <td>
          <CheckBox
            ischecked={
              manageuserloginpasswordTableData.fund_administration
                ? true
                : false
            }
          />
        </td>
        <td>
          <CheckBox
            ischecked={manageuserloginpasswordTableData.crm ? true : false}
          />
        </td>
        <td>
          <CheckBox
            ischecked={manageuserloginpasswordTableData.ifas ? true : false}
          />
        </td>
        <td>
          <CheckBox
            ischecked={manageuserloginpasswordTableData.offshore ? true : false}
          />
        </td>
        <td>
          <CheckBox
            ischecked={manageuserloginpasswordTableData.reports ? true : false}
          />
        </td>
        <td>
          <CheckBox
            ischecked={
              manageuserloginpasswordTableData.maintenance_portal ? true : false
            }
          />
        </td>
        <td>
          <CheckBox
            ischecked={manageuserloginpasswordTableData.logout ? true : false}
          />
        </td>
      </tr>
    );
  } else {
    return <div>No Data Found</div>;
  }
};

export { TableHeader, TableRow };
