import axios from "axios";
import { isArray } from "lodash";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import logo from "../../../assets/images/logo.png";
import DropDown from "../../../component/dropdown/DropDown";
import FilledButton from "../../../component/filled-button/FilledButton";
import Loader from "../../../component/loader/Loader";
import NoRecordFound from "../../../component/notfound/NotFound";
import Rating from "../../../component/rating/Rating";
import { DropdownIcon2, Print } from "../../../component/svg-components";
import Table from "../../../component/table/new-table/Table";
import { feesAndCalculationsDropdown } from "../../../data/data";
import { encrypt } from "../../../helpers/cyptoAES";
import {
  fetchModelPortfolioComparison,
  fetchMonthlyPerformance,
  fetchMonthlyPortfolio,
  fetchPortfolioPerformance,
  fetchRiskStatistics,
  fetchTopHoldings,
  getFactsheetFieldsUnit,
  getUnitTypeByFundId,
} from "../../../redux/features/factsheet/factSheetSlice";
import { numberWithCommas, savePDF } from "../../../utils/utils";
import styles from "./factsheets.module.scss";

const FactSheets = () => {
  const {
    monthlyPortfolioData,
    portfolioComparisonData,
    riskStatisticsData,
    topHoldingsData,
    portFolioPerformanceData,
    monthlyPerformanceData,
    unit,
    unitTypeList,
  } = useSelector((state) => state.factSheet);
  const { currSelectedFund } = useSelector((state) => state.addFund);
  const dispatch = useDispatch();
  const [unit1, setUnit] = useState("select unit");

  useEffect(() => {
    setUnit("select unit");
    dispatch(fetchMonthlyPortfolio({ fundId: currSelectedFund?.fundId }));
    dispatch(
      fetchModelPortfolioComparison({ fundId: currSelectedFund?.fundId })
    );
    dispatch(fetchRiskStatistics({ fundId: currSelectedFund?.fundId }));
    dispatch(fetchTopHoldings({ fundId: currSelectedFund?.fundId }));
    dispatch(fetchPortfolioPerformance({ fundId: currSelectedFund?.fundId }));
    dispatch(fetchMonthlyPerformance({ fundId: currSelectedFund?.fundId }));
    dispatch(getUnitTypeByFundId({ fundId: currSelectedFund?.fundId, }));
  }, [currSelectedFund?.fundId]);

  const ref = useRef();
  const ref1 = useRef();
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);

  const handleChange = (item) => {

    setUnit(item);
  };

  useEffect(() => {
    dispatch(
      getFactsheetFieldsUnit({
        unit: unit1,
        fundId: currSelectedFund?.fundId,
      })
    );
  }, [unit1]);


  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click && ref1.current && !ref1.current.contains(e.target)) {
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
      <div className={styles.factsheetContainer}>
        <div className={styles.buttonContainer}>
          <div className={styles.printContainer}>
            {!loading && <Print fillColor="#0868AA" />}
            <FilledButton
              loader={loading}
              title="Print PDF"
              customClass={styles.buttonText}
              handleClick={() => savePDF(ref, setLoading)}
            />
          </div>
        </div>
        <div ref={ref}>
          <div className={styles.headContainer}>
            <div className={styles.imageDataContainer}>
              <img src={logo} alt="logo" className={styles.imageClass} />
              <span className={styles.textContent}>
                Walt Capital Management Private Portfolio (
                {monthlyPortfolioData.currency})
              </span>
            </div>
            <div className={styles.blockContainer}>
              <span className={styles.spanText}>Risk Profile</span>
              <div className={styles.textFieldLeft}>
                {[1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <Rating
                      key={item}
                      value={item}
                      fundRating={monthlyPortfolioData?.fundRiskRating}
                      customClass={
                        monthlyPortfolioData?.fundRiskRating === item
                          ? styles.textFieldBoxSelected
                          : styles.textFieldBox
                      }
                      customClassActive={styles.textFieldBoxSelected}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.mainDataContainer}>
            <div className={styles.dataContainer}>
              <div className={styles.infoOne}>
                <div className={styles.titleDate}>
                  <span className={styles.titleText}>
                    Monthly Portfolio Fact Sheet
                  </span>
                  <span className={styles.dateText}>
                    As at{" "}
                    {monthlyPortfolioData &&
                      moment(monthlyPortfolioData.currentDate).format(
                        "DD MMMM yyyy"
                      )}
                  </span>
                </div>
                <div className={styles.investmentPara}>
                  <span className={styles.titleOne}>Investment Objective</span>
                  <span className={styles.paraText}>
                    {monthlyPortfolioData &&
                      monthlyPortfolioData.investmentObjective}
                  </span>
                </div>
                <div className={styles.keyDataContainer}>
                  <span className={styles.keyDataTitle}>Key Facts</span>
                  <span className={styles.keyText}>
                    Portfolio Manager :
                    <span className={styles.valueText}>
                      {" "}
                      {monthlyPortfolioData &&
                        monthlyPortfolioData.portfolioManager}
                    </span>
                  </span>
                  <span className={styles.keyText}>
                    Email :
                    <span className={styles.valueText}>
                      {" "}
                      {monthlyPortfolioData && monthlyPortfolioData.email}
                    </span>
                  </span>
                  <span className={styles.keyText}>
                    Walt capital Management FSP Number :
                    <span className={styles.valueText}>
                      {" "}
                      {monthlyPortfolioData && monthlyPortfolioData.fsp}{" "}
                    </span>
                  </span>
                  <span className={styles.keyText}>
                    Tel :
                    <span className={styles.valueText}>
                      {" "}
                      +27{" "}
                      {monthlyPortfolioData &&
                        monthlyPortfolioData.telephone}{" "}
                    </span>
                  </span>
                  <span className={styles.keyText}>
                    Inception Date :{" "}
                    <span className={styles.valueText}>
                      {monthlyPortfolioData &&
                        moment(monthlyPortfolioData.inceptionDate).format(
                          "DD MMMM yyyy"
                        )}
                    </span>
                  </span>
                  <span className={styles.keyText}>
                    Sector :
                    <span className={styles.valueText}>
                      {" "}
                      {monthlyPortfolioData && monthlyPortfolioData.sector}
                    </span>
                  </span>
                  <span className={styles.keyText}>
                    Target Returns :
                    <span className={styles.valueText}>
                      {" "}
                      {monthlyPortfolioData && monthlyPortfolioData.target}
                    </span>
                  </span>
                  <span className={styles.keyText}>
                    Possible participatory structures :
                  </span>
                  <div className={styles.listContainer}>
                    <span className={styles.spanTextTwo}>
                      Investors may invest in{" "}
                      {monthlyPortfolioData &&
                        monthlyPortfolioData.participatoryStructure}
                    </span>
                    {/* <ol className={styles.listData}>
                      {monthlyPortfolioData &&
                        monthlyPortfolioData.participatoryStructure}
                    </ol> */}
                  </div>
                  <span className={styles.keyText}>
                    Minimum Investment : Min :
                    <span className={styles.valueText}>
                      {" "}
                      {monthlyPortfolioData && (
                        <>
                          {monthlyPortfolioData.currency}{" "}
                          {numberWithCommas(monthlyPortfolioData.minInvestment)}
                        </>
                      )}{" "}
                    </span>{" "}
                  </span>
                  <span className={styles.keyText}>
                    Recommend :{" "}
                    <span className={styles.valueText}>
                      {monthlyPortfolioData.currency}{" "}
                      {monthlyPortfolioData?.recommended}
                    </span>
                  </span>
                </div>
                <div className={styles.feeCalculationContainer}>
                  <div className={styles.flexContainer}>
                    <span className={styles.feeTitle}>
                      Fee and Calculations{" "}
                    </span>

                    <div className={styles.dropdownMainContainer} ref={ref1}>
                      <div
                        className={styles.dropdownContainer}
                        onClick={() => setClick((prevState) => !prevState)}
                      >
                        <div className={styles.dropdownContainerItems}>
                          <span className={styles.dropdownContent}>
                            {unit1}
                          </span>
                          <span className={styles.dropdownIcon}>
                            <DropdownIcon2
                              fillColor="#969BA0"
                              customClass={styles.icon}
                            />
                          </span>
                        </div>
                        <div>
                          {click ? (
                            <DropDown
                              dropdownItems={unitTypeList?.unitType}
                              // keyName="name"
                              customClassForContent={styles.dropdownListContent}
                              customClassForItems={styles.dropdownListItems}
                              setSelected={(item) => handleChange(item)}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <span className={styles.keyText}>
                    Performance Fee Benchmark :
                    <span className={styles.valueText}>
                      {" "}
                      {monthlyPortfolioData && monthlyPortfolioData.annual}
                    </span>
                  </span> */}
                  <span className={styles.keyText}>
                    Base Fee :
                    <span className={styles.valueText}>
                      {" "}
                      {/* {monthlyPortfolioData && (
                        <>
                          {monthlyPortfolioData.currency}{" "}
                          {monthlyPortfolioData.baseFee / 100}%
                        </>
                      )} */}
                      {unit && unit.annual}
                    </span>
                  </span>
                  <span className={styles.keyText}>
                    Fee Hurdle :
                    <span className={styles.valueText}>
                      {" "}
                      {monthlyPortfolioData && monthlyPortfolioData.feeHurdle}
                    </span>
                  </span>
                  <span className={styles.keyText}>
                    Sharing Ratio:
                    <span className={styles.valueText}>
                      {" "}
                      {unit && unit.performance}
                    </span>
                  </span>
                  <span className={styles.keyText}>
                    Fee Example :
                    <span className={styles.valueText}>
                      {" "}
                      {monthlyPortfolioData && monthlyPortfolioData.feeExample}
                    </span>
                  </span>

                  <span className={styles.keyText}>
                    Method of calculating :
                    <span className={styles.valueText}>
                      {" "}
                      {monthlyPortfolioData && monthlyPortfolioData.method}
                    </span>
                  </span>
                </div>
              </div>
              <div className={styles.infoTwo}>
                <span className={styles.titleTextTwo}>Short Commentary</span>
                <span className={styles.paraInfo}>
                  {monthlyPortfolioData?.shortCommentary}
                </span>
              </div>
            </div>
            <div className={styles.graphTableContainer}>
              <div className={styles.graphData}>
                <div className={styles.chart}>
                  <p className={styles.graphTitle}>Portfolio Performance</p>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <AreaChart
                        data={portFolioPerformanceData?.graphDataModelValueList}
                        margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorPv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#0868AA"
                              stopOpacity={0.2}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="value" />
                        <YAxis />

                        <CartesianGrid
                          horizontal={true}
                          vertical={false}
                          opacity={0.5}
                        />

                        <Tooltip />

                        <Area
                          type="monotone"
                          dataKey="uv"
                          stroke="#000000"
                          strokeWidth="3px"
                          fillOpacity={0.4}
                          fill="url(#ffffff)"
                          activeDot={{ r: 10 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="pv"
                          stroke="#0868AA"
                          strokeWidth="3px"
                          fillOpacity={0.4}
                          fill="url(#colorPv)"
                          activeDot={{ r: 10 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <span className={styles.tableHeadMain}>
                Model Portfolio Comparison
              </span>
              <Table
                tableheading={portfolioComparisonData.headerList}
                tabledata={portfolioComparisonData.tableDataList}
                customClassTh={styles.customClassTh}
                customClassTableRow={styles.customClassTableRow}
                customClassTd={styles.customClassTd}
              />

              <span className={styles.tableHeadMainTwo}>Risk Statistics</span>
              <Table
                tableheading={riskStatisticsData.headerValueList}
                tabledata={riskStatisticsData.tableDataList}
                customClassTh={styles.customClassTh}
                customClassTableRow={styles.customClassTableRow}
                customClassTd={styles.customClassTd}
              />
              <span className={styles.tableHeadMainThree}>Top Holdings</span>
              <Table
                tableheading={topHoldingsData.headerValuemodel}
                tabledata={topHoldingsData.tableDatamodelList}
                customClassTd={styles.customClassTds}
                customClassTableHead={styles.customClassTableHead}
              />
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : isArray(monthlyPerformanceData) &&
            monthlyPerformanceData.length === 0 ? (
            <NoRecordFound />
          ) : (
            <div className={styles.tableContainer}>
              <span className={styles.performanceTableTitle}>
                Monthly Performance
              </span>
              <div className={styles.tableContent}>
                <div>
                  <p className={styles.yearData1}>Year</p>
                  {monthlyPerformanceData?.yearList?.map((item, index) => {
                    return (
                      <p className={styles.yearData} key={index}>
                        {item.year}
                      </p>
                    );
                  })}
                </div>
                <Table
                  tableheading={monthlyPerformanceData?.monthlyPerformanceHead}
                  tabledata={
                    monthlyPerformanceData?.monthlyPerformanceTableData
                  }
                  customClassTableRow={styles.customClassTableRow}
                  customClassTd={styles.customClassTd1}
                />
              </div>
            </div>
          )}
          {/* <div className={styles.tableContainer}>
            <span className={styles.performanceTableTitle}>
              Monthly Performance
            </span>
            <div className={styles.tableContent}>
              <div>
                <p className={styles.yearData1}>Year</p>
                {monthlyPerformanceData?.yearList?.map((item, index) => {
                  return (
                    <p className={styles.yearData} key={index}>
                      {item.year}
                    </p>
                  );
                })}
              </div>
              <Table
                tableheading={monthlyPerformanceData?.monthlyPerformanceHead}
                tabledata={monthlyPerformanceData?.monthlyPerformanceTableData}
                customClassTableRow={styles.customClassTableRow}
                customClassTd={styles.customClassTd1}
              />
            </div>
          </div> */}
          <div className={styles.disclaimerContainer}>
            <span className={styles.disclaimerTitle}>
              Disclaimer and Risk Disclosure:
            </span>
            <span className={styles.disclaimerPara}>
              {monthlyPortfolioData.disclaimer}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FactSheets;
