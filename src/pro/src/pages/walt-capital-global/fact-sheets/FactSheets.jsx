import styles from "./factsheets.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import Rating from "../../../component/rating/Rating";
import {
  portfolioPerformanceGraphData,
  modelPortfolioHead,
  modelPortfolioTableData,
  riskStatisticTableData,
  topHoldingsTableData,
  monthlyPerformanceHead,
  monthlyPerformanceTable,
  riskStatisticHead,
  topHoldingsTableHead,
} from "../../../data/data";
import { TableHeader, TableRow } from "../../../component/table/Table";
import logo from "../../../assets/images/logo.png";
import { ResponsiveContainer, XAxis } from "recharts";
import { YAxis } from "recharts";
import { Area, AreaChart } from "recharts";
import { Tooltip, CartesianGrid } from "recharts";
import { Print } from "../../../component/svg-components";
import Table from "../../../component/table/new-table/Table";

const FactSheets = () => {
  // console.log(monthlyPerformanceHead);
  return (
    <>
      <div className={styles.factsheetContainer}>
        <div className={styles.buttonContainer}>
          {/* <FilledButton
            title="Print PDF"
            customClass={styles.printButton}
            icon={<Print fillColor="#0868AA" handleClick={() => {}} />}
          /> */}
          <div className={styles.printContainer}>
            <Print fillColor="#0868AA" />
            <FilledButton
              title="Print PDF"
              customClass={styles.buttonText}
              handleClick={() => {}}
            />
          </div>
        </div>
        <div className={styles.headContainer}>
          <div className={styles.imageDataContainer}>
            <img src={logo} alt="logo" className={styles.imageClass} />
            <span className={styles.textContent}>
              Walt Capital Management Private Portfolio (USD)
            </span>
          </div>
          <div className={styles.blockContainer}>
            <span className={styles.spanText}>Risk Profile</span>
            <div className={styles.textFieldLeft}>
              <Rating customClass={styles.textFieldBox} value="1." />
              <Rating customClass={styles.textFieldBox} value="2." />
              <Rating customClass={styles.textFieldBox} value="3." />
              <Rating customClass={styles.textFieldBox} value="4." />
              <Rating customClass={styles.textFieldBox} value="5." />
            </div>
          </div>
        </div>
        <div className={styles.mainDataContainer}>
          <div className={styles.dataContainer}>
            <div className={styles.infoOne}>
              <div className={styles.titleDate}>
                <sapn className={styles.titleText}>
                  Monthly Portfolio Fact Sheet
                </sapn>
                <span className={styles.dateText}>As at 31 March 2022</span>
              </div>
              <div className={styles.investmentPara}>
                <span className={styles.titleOne}>Investment Objective</span>
                <span className={styles.paraText}>
                  The Walt Capital Global Portfolio is a moderate risk flexible
                  portfolio. The objective of this portfolio is to achieve
                  capital appreciation over the medium to long term
                </span>
              </div>
              <div className={styles.keyDataContainer}>
                <span className={styles.keyDataTitle}>Key Facts</span>
                <span className={styles.keyText}>
                  Portfolio Manager :
                  <span className={styles.valueText}> Pierre van der Walt</span>
                </span>
                <span className={styles.keyText}>
                  Email :
                  <span className={styles.valueText}>
                    pierre@waltcapital.co.za
                  </span>
                </span>
                <span className={styles.keyText}>
                  Walt capital Management FSP Number :
                  <span className={styles.valueText}>50218 </span>
                </span>
                <span className={styles.keyText}>
                  Tel :<span className={styles.valueText}> 8 22 55 44 03 </span>
                </span>
                <span className={styles.keyText}>
                  Inception Date :{" "}
                  <span className={styles.valueText}>1 February 2020</span>
                </span>
                <span className={styles.keyText}>
                  Sector :
                  <span className={styles.valueText}> Worldwide Flexible</span>
                </span>
                <span className={styles.keyText}>
                  Target Returns :
                  <span className={styles.valueText}>
                    {" "}
                    Rolling 12-15% plus per annum
                  </span>
                </span>
                <span className={styles.keyText}>
                  Possible participatory structures :
                </span>
                {/* <span className={styles.pText}>
                  Investors may invest in 1. Own Name
                </span> */}

                <div className={styles.listContainer}>
                  <span className={styles.spanTextTwo}>
                    Investors may invest in{" "}
                  </span>
                  <ol className={styles.listData}>
                    <li>Own Name</li>
                    <li>
                      Offshore Trust or Private Foundation (could be unitised
                      for families)
                    </li>
                    <li>Offshore Company LLC (private or collective)</li>
                  </ol>
                  {/* <p className={styles.pText}>
                    2. Offshore Trust or Private Foundation (could be unitised
                    for families)
                  </p>
                  <p className={styles.pText}>
                    3. Offshore Company LLC (private or collective)
                  </p> */}
                </div>
                <span className={styles.keyText}>
                  Minimum Investment : Min :
                  <span className={styles.valueText}>USD 20,000 </span>{" "}
                  Recommend : USD 50,000+
                </span>
              </div>
              <div className={styles.feeCalculationContainer}>
                <span className={styles.feeTitle}>Fee and Calculations </span>
                {/* <div className={styles.keysContainer}> */}
                <span className={styles.keyText}>
                  Performance Fee Benchmark :
                  <span className={styles.valueText}>
                    Zero-apply HWM principle
                  </span>
                </span>
                <span className={styles.keyText}>
                  Base Fee :
                  <span className={styles.valueText}> 1.20% p.a.</span>
                </span>
                <span className={styles.keyText}>
                  Fee Hurdle :<span className={styles.valueText}> Zero</span>
                </span>
                <span className={styles.keyText}>
                  Sharing Ratio :<span className={styles.valueText}> 15%</span>
                </span>
                <span className={styles.keyText}>
                  Fee Example :
                  <span className={styles.valueText}>
                    Any positive performance of portfolio on a high watermark
                    basis. The high watermark is the highest level of relative
                    outperformance of the fund over the Fee Hurdle since
                    inception of the portfolio, thus stepping only higher.
                  </span>
                </span>
                <span className={styles.keyText}>
                  Method of calculating :
                  <span className={styles.valueText}>
                    {" "}
                    If the portfolio underperforms the Fee Hurdle, then only the
                    minimum fee is accrued until the high watermark is again
                    reached.
                  </span>
                </span>
                <li className={styles.listText}>
                  Management fee are calculated daily but levied monthly, and
                  performance fees using the high watermark principle.
                </li>
              </div>
            </div>
            <div className={styles.infoTwo}>
              <span className={styles.titleTextTwo}>Short Commentary</span>
              <span className={styles.subTitle}>
                S&P500 Loses 5% (While We Gain 6,4%)for Q1 2022
              </span>
              <span className={styles.paraInfo}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Malesuada a rhoncus lorem est aliquet pellentesque. Auctor
                tempor sagittis interdum tempor adipiscing massa scelerisque
                mattis. Praesent massa eu, a et. A hac tincidunt viverra mattis
                adipiscing at tincidunt sed risus.
              </span>
              <span className={styles.paraInfo}>
                In ullamcorper ut ullamcorper leo, tincidunt ac at. Odio fames
                nunc, duis tortor.
              </span>
              <span className={styles.paraInfo}>
                Arcu vel tellus at nulla fames diam. Purus et id commodo elit,
                augue condimentum semper risus eleifend. Consequat lobortis nunc
                suscipit vestibulum vel gravida. Quis scelerisque vel quis massa
                lorem nec.
              </span>
              <span className={styles.paraInfo}>
                Vulputate malesuada quis scelerisque quam. Tortor, vel etiam mi
                ultrices mi tristique elit elit nunc. Arcu, in malesuada aliquet
                felis tortor cursus ipsum erat. Quisque ipsum tortor ullamcorper
                et, viverra. Faucibus eu senectus eget sed porttitor. Id
                senectus id commodo cursus cursus aliquam suscipit eu.
              </span>
              <span className={styles.paraInfo}>
                Tortor at mi duis viverra viverra diam. Netus turpis quis tellus
                volutpat posuere. Phasellus eu parturient praesent dignissim
                pellentesque. Molestie in nunc blandit morbi sit quam est
                facilisi egestas. Id netus hendrerit egestas ut dui, diam quam
                scelerisque. Mi in nisi, tortor quis habitant cum nisi sit.
                Suspendisse turpis feugiat auctor ut nunc, phasellus proin.
                Magna arcu at a ac phasellus commodo egestas ultrices.
              </span>
              <span className={styles.paraInfo}>
                Tortor at mi duis viverra viverra diam. Netus turpis quis tellus
                volutpat posuere. Phasellus eu parturient praesent dignissim
                pellentesque. Molestie in nunc blandit morbi sit quam est
                facilisi egestas. Id netus hendrerit egestas ut dui, diam quam
                scelerisque. Vulputate malesuada quis scelerisque quam. Tortor,
                vel etiam mi ultrices mi tristique elit elit nunc. Arcu, in
                malesuada aliquet felis tortor cursus ipsum erat. Quisque ipsum
                tortor ullamcorper et, viverra. Faucibus eu senectus eget sed
                porttitor. Id senectus id commodo cursus cursus aliquam suscipit
                eu.
              </span>
              <span className={styles.paraInfo}>
                In ullamcorper ut ullamcorper leo, tincidunt ac at. Odio fames
                nunc, duis tortor.
              </span>
            </div>
          </div>
          <div className={styles.graphTableContainer}>
            <div className={styles.graphData}>
              {/* <span>Portfolio Performance</span> */}
              <div className={styles.chart}>
                <p className={styles.graphTitle}>Portfolio Performance</p>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={portfolioPerformanceGraphData}
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
            {/* <div className={styles.tableOne}> */}
            <span className={styles.tableHeadMain}>
              Model Portfolio Comparison
            </span>
            <Table
              tableheading={modelPortfolioHead}
              tabledata={modelPortfolioTableData}
              customClassTh={styles.customClassTh}
              customClassTableRow={styles.customClassTableRow}
            />
            {/* <table className={styles.tableOne} cellSpacing={0}>
              <thead>
                <TableHeader
                  data={modelPortfolioHead}
                  customClass={styles.tableHead}
                  customClassForTh={styles.customClassForTh}
                />
              </thead>
              <tbody>
                {modelPortfolioTableData.map((item, index) => {
                  return (
                    <TableRow
                      customClass={styles.tableBodyRow}
                      customClassForTd={styles.customClassForTd}
                      modelPortfolioTableData={item}
                      key={index}
                      id={item.id}
                    />
                  );
                })}
              </tbody>
            </table> */}
            <span className={styles.tableHeadMainTwo}>Risk Statistics</span>
            <Table
              tableheading={riskStatisticHead}
              tabledata={riskStatisticTableData}
              customClassTh={styles.customClassTh}
              customClassTableRow={styles.customClassTableRow}
            />
            {/* <table className={styles.tableTwo} cellSpacing={0}>
              <thead>
                <TableHeader
                  data={modelPortfolioHead}
                  customClass={styles.tableHead}
                  customClassForTh={styles.customClassForTh}
                />
              </thead>
              <tbody>
                {riskStatisticTableData.map((item, index) => {
                  return (
                    <TableRow
                      customClass={styles.tableBodyRow}
                      customClassForTd={styles.customClassForTd}
                      riskStatisticTableData={item}
                      key={index}
                      id={item.id}
                    />
                  );
                })}
              </tbody>
            </table> */}
            {/* </div> */}
            <span className={styles.tableHeadMainThree}>Top Holdings</span>
            <Table
              tableheading={topHoldingsTableHead}
              tabledata={topHoldingsTableData}
              customClassTableHead={styles.customClassTableHead}
              customClassTd={styles.customClassTd}
              // customClassTh={styles.customClassTh}
              // customClassTableRow={styles.customClassTableRow}
            />
            {/* <table className={styles.tableThree} cellSpacing={0}>
              <tbody>
                {topHoldingsTableData.map((item, index) => {
                  return (
                    <TableRow
                      customClass={styles.tableBodyRow}
                      customClassForTd1={styles.customClassForTd1}
                      customClassForTd2={styles.customClassForTd2}
                      topHoldingsTableData={item}
                      key={index}
                      id={item.id}
                    />
                  );
                })}
              </tbody>
            </table> */}
          </div>
        </div>
        <div className={styles.tableContainer}>
          <span className={styles.performanceTableTitle}>
            Monthly Performance
          </span>
          <div className={styles.tableContent}>
            <div>
              <p className={styles.yearData1}>Year</p>
              <p className={styles.yearData}>2020</p>
              <p className={styles.yearData}>2021</p>
              <p className={styles.yearData}>2022</p>
            </div>
            <Table
              tableheading={monthlyPerformanceHead}
              tabledata={monthlyPerformanceTable}
              customClassTableRow={styles.customClassTableRow}
            />
            {/* <table className={styles.tableFour} cellSpacing={0}>
              <thead>
                <TableHeader
                  data={monthlyPerformanceHead}
                  customClass={styles.tableHead}
                  customClassForTh={styles.customClassForTh}
                />
              </thead>

              
              <tbody>
                {monthlyPerformanceTable.map((item, index) => {
                  return (
                    <TableRow
                      customClass={styles.tableBodyRow}
                      customClassForTd={styles.customClassForTd}
                      customClassForTd1={styles.customClassForTd1}
                      customClassForTd2={styles.customClassForTd2}
                      customClassForTd3={styles.customClassForTd3}
                      monthlyPerformanceTable={item}
                      key={index}
                      id={item.id}
                    />
                  );
                })}
              </tbody>
            </table> */}
          </div>
        </div>
        <div className={styles.disclaimerContainer}>
          <span className={styles.disclaimerTitle}>
            Disclaimer and Risk Disclosure:
          </span>
          <span className={styles.disclaimerPara}>
            This publication has been issued by Walt Capital management (Pty)
            LTD. It is for the information of clients only. It shall not be
            reproduced in whole or in part without our permission. The
            information contained herein has been obtained from sources and
            persons whom we believe to be reliable but is not guaranteed for
            accuracy, completeness or otherwise. All opinions expressed and
            recommendations made are subject to change without notice. No
            information contained herein, no opinion expressed and no
            recommendation made constitute a representation by us or a
            solicitation for business or transactions in any product or
            securities mentioned herein and we have no responsibility whatsoever
            arising here involve a higher degree of risk and more volatility
            than the securities of more established companies. The recipient of
            this communication and/or report must make his/her own independent
            decisions regarding any securities or financial instruments. Past
            performance is not indicative of future results, and investors may
            get back less than they invested. The inventories of Walt Capital
            Management (Pty) Ltd may from time to time include securities
            mentioned herein. Walt Capital Management (Pty) Ltd makes use of the
            services of PSG stockbrokers, PPM securities, DWT securities, Allan
            Gray, and Trade Station (US) in the course of operations. Walt
            Capital Management (Pty) Ltd is a category 2 authorised financial
            services provider. FSP number 50218.
          </span>
        </div>
      </div>
    </>
  );
};

export default FactSheets;
