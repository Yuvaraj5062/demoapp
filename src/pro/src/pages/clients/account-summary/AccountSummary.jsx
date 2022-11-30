import React from "react";
import styles from "./accountsummary.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import { Print, MoreIcon } from "../../../component/svg-components";
import { accountSummary } from "../../../data/data";
import { TableHeader, TableRow } from "../../../component/table/Table";
import { ResponsiveContainer, XAxis } from "recharts";
import { YAxis } from "recharts";
import { Area, AreaChart } from "recharts";
import { Tooltip, CartesianGrid } from "recharts";
import { AccountSummaryGainGraphData } from "../../../data/data";
import Divider from "../../../component/divider/Divider";
// import Navlink from "../../../component/navlink/Navlink";
const AccountSummary = () => {
  return (
    <>
      {/* <Navlink /> */}
      <div className={styles.accountMainContainer}>
        <div className={styles.accountContainer}>
          <div className={styles.accountHeader}>
            <p className={styles.headerText}> Account Summary</p>
          </div>
          <div className={styles.accountCard}>
            <div className={styles.accountCardLeft}>
              <p className={styles.accountCardLeftHeader}>As at 15 Mar 2022</p>
              <div className={styles.accountCardFooter}>
                <div className={styles.accountNo}>
                  Account No.
                  <span className={styles.cardText}>AGRA454873</span>
                </div>

                <div className={styles.accountName}>
                  Account Name
                  <span className={styles.cardText}>
                    retirement Annuity Fund
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.accountCardRight}>
              <div className={styles.accountCardRightHeader}>
                <span className={styles.cardText}>Total Value </span>
                R558 940.27
              </div>
              <div className={styles.accountCardRightFooter}>
                <div className={styles.accountinception}>
                  Inception Date
                  <span className={styles.cardText}>AGRA454873</span>
                </div>

                <div className={styles.accountValue}>
                  Value
                  <span className={styles.cardText}>R 558 940.27</span>
                </div>
                <div className={styles.button}>
                  <FilledButton
                    title="Print PDF"
                    customClass={styles.printButton}
                    icon={<Print fillColor="#0868AA" handleClick={() => {}} />}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.accountBody}>
            <div className={styles.accountBodyLeft}>
              <div className={styles.accountBodyLeftHeader}>
                <div className={styles.accountBodyLeftStart}>
                  Investment Performance
                </div>
                <div className={styles.accountBodyLeftEnd}>Performance</div>
              </div>

              <div className={styles.accountBodyGraphHeader}>
                <div className={styles.accountBodyGraphHeaderText}>
                  Investment value for period : 16 Mar 2021 to 15 Mar 2022
                </div>
                <div className={styles.accountBodyGraphHeaderIcon}>
                  <MoreIcon fillColor="#2E2E2E" />
                </div>
              </div>

              <div className={styles.chartContainer}>
                <div className={styles.chart}>
                  <div style={{ width: "100%", height: 250 }}>
                    <ResponsiveContainer>
                      <AreaChart
                        data={AccountSummaryGainGraphData}
                        margin={{ top: 10, right: 10, left: 40, bottom: 10 }}
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
                              offset="3%"
                              stopColor="#0868AA"
                              stopOpacity={0.2}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dy={10}
                          //dx={-10}
                          dataKey="value"
                          axisLine={false}
                          tickLine={false}
                        />
                        {/* <YAxis axisLine={false} tickLine={false}  />  */}
                        <YAxis
                          dx={-20}
                          domain={[377784]}
                          dataKey="uv"
                          allowDataOverflow={true}
                          axisLine={false}
                          tickLine={false}
                        />

                        <CartesianGrid
                          horizontal={true}
                          vertical={false}
                          opacity={0.5}
                        />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="uv"
                          stroke="#FFAB2D"
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
                <Divider customClass={styles.divider} />
                <table className={styles.table} cellSpacing={0}>
                  <thead>
                    <tr>
                      <th>
                        <span className={styles.heading}>
                          Internal rate of return
                        </span>
                      </th>
                      <th>
                        <span className={styles.heading1}>Since inception</span>
                      </th>
                      <th>
                        <span className={styles.heading}>Selected Period</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className={styles.boxColumn}>
                          <div className={styles.box1}> </div>
                          <span className={styles.rowText1}>
                            Selected investment
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className={styles.rowText}>3.59%</span>
                      </td>
                      <td>
                        <span className={styles.rowText}>1.80%</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className={styles.boxColumn}>
                          <div className={styles.box2}> </div>
                          <span className={styles.rowText1}>
                            Inflation -south Africa
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className={styles.rowText}>4.75%</span>
                      </td>
                      <td>
                        <span className={styles.rowText}>5.68%</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.accountBodyRight}>
              <div className={styles.accountBodyRightHeader}>
                <div className={styles.accountBodyRightStart}>Activity</div>
                <div className={styles.accountBodyRightEnd}>
                  Scheduled Transactions
                  <span className={styles.verticalLine}>|</span> All
                  Transactions
                </div>
              </div>
              <div className={styles.accountBodyRightTableHeader}>
                <div className={styles.headerText}>
                  16 Mar 2021 to 15 Mar 2022
                </div>
              </div>
              <table className={styles.table} cellSpacing={0}>
                <tbody>
                  {accountSummary.map((item, index) => {
                    return (
                      <TableRow
                        customClass={styles.tableBodyRow}
                        accountSummary={item}
                        key={index}
                      />
                    );
                  })}
                </tbody>
              </table>
              <div className={styles.accountBodyAsset}>
                <div className={styles.assetLeft}>Asset Allocation</div>
                <div className={styles.assetRight}>All Assets</div>
              </div>
              <div className={styles.accountBodyRightTableHeader}>
                <div className={styles.headerText}>As at 15 Mar 2022</div>
              </div>
              <div className={styles.accountProgressContainer}>
                <span className={styles.accountProgressTitle}>
                  Total Local / offshore split
                </span>
                <div className={styles.accountProgressbar}></div>
                <div className={styles.accountProgressbarFooter}>
                  <div className={styles.left}>
                    <div className={styles.box1}></div>
                    <span className={styles.text}>Local </span> 100.00%
                  </div>
                  <div className={styles.right}>
                    <div className={styles.box1}></div>
                    <span className={styles.text}>Offshore </span> 0.00%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSummary;
