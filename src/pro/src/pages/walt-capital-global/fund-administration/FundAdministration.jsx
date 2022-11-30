import styles from "./fundadministration.module.scss";
import { Legend, ResponsiveContainer, XAxis } from "recharts";
import { YAxis } from "recharts";
import { Area, AreaChart } from "recharts";
import { Tooltip, CartesianGrid } from "recharts";
import {
  CapitalGainGraphData,
  ClientTransactionTableHeading,
  ClientTransactionTableRow,
  FundStatsData,
  FundSuitsStatsHeading,
  FundSuitsStatsRow,
  ReturnsData,
  topHoldingsTableHead,
  topHoldingsTableData,
  FundSuitStatsHead,
  FundSuitStatsData,
  ReturnsDataHead,
  FundStatsHead,
} from "../../../data/data";
import {
  TableHeading,
  TableRow,
} from "../../../component/table/tableV2/TableV2";
import Table from "../../../component/table/new-table/Table";
const ClientTransaction = () => {
  return (
    <div className={styles.clientTransactionContainer}>
      <div className={styles.capitalGainContainer}>
        <div className={styles.chart}>
          <p className={styles.capitalGainTitle}>
            Fund Philosophy : Capital Gain
          </p>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={CapitalGainGraphData}
                margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0868AA" stopOpacity={0.2} />
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

        <Table
          tableheading={ClientTransactionTableHeading}
          tabledata={ClientTransactionTableRow}
          customClassTableContainer={styles.customClassTableContainer}
          customClassTableHead={styles.customClassTableHeadDate}
          customClassTh={styles.customClassThDate}
          customClassTableRow={styles.customClassTableRowDate}
          customClassTd={styles.customClassTdDate}
        />

        {/* <table className={styles.table}>
          <thead>
            <tr>
              {ClientTransactionTableHeading.map((item, index) => {
                return (
                  <th key={index} className={styles.yearHeading}>
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {ClientTransactionTableRow.map((item, index) => {
                return (
                  <td key={index} className={styles.yearRow}>
                    {item}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table> */}
        <p className={styles.latestCommentoryText}>
          Latest Commentory (Oct 2015): Long Equity Growth
        </p>
        <span className={styles.tableHeadMainThree}>Fund Suits Stats</span>
        <Table
          tableheading={FundSuitStatsHead}
          tabledata={FundSuitStatsData}
          customClassTableHead={styles.customClassTableHead}
          customClassTableRow={styles.customClassTableRow}
        />
        {/* <table className={styles.fundSuitsStatsTable}>
          <thead>
            <tr>
              <th colSpan="3" className={styles.tableText}>
                Fund Suits Stats
              </th>
            </tr>
            <tr className={styles.thead}>
              {FundSuitsStatsHeading.map((item, index) => {
                return (
                  <TableHeading
                    key={index}
                    data={item}
                    customClass={styles.tableHeading}
                  />
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tbody}>
              {FundSuitsStatsRow.map((item, index) => {
                return <TableRow data={item} key={index} />;
              })}
            </tr>
          </tbody>
        </table> */}
      </div>
      <div className={styles.returnsContainer}>
        <span className={styles.tableHeadMainThree}>Returns</span>
        <Table
          tableheading={ReturnsDataHead}
          tabledata={ReturnsData}
          customClassTableHead={styles.customClassTableHead}
          customClassTableRow={styles.customClassTableRow}
        />
        {/* <table className={styles.returnsTable}>
          <thead>
            <tr>
              <th colSpan="3" className={styles.tableText}>
                Returns
              </th>
            </tr>
          </thead>
          <tbody>
            {ReturnsData.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  returnsData={item}
                  customClass={styles.tableRow}
                />
              );
            })}
          </tbody>
        </table> */}

        <span className={styles.tableHeadMainThree}>Returns</span>
        <Table
          tableheading={FundStatsHead}
          tabledata={FundStatsData}
          customClassTableHead={styles.customClassTableHead}
          customClassTableRow={styles.customClassTableRow}
        />

        {/* <table className={styles.fundStatsTable}>
          <thead>
            <tr>
              <th colSpan="3" className={styles.fundStatsText}>
                Fund Stats
              </th>
            </tr>
          </thead>
          <tbody>
            {FundStatsData.map((item, index) => {
              return (
                <TableRow
                  tdCustomClass={styles.tableData}
                  key={index}
                  returnsData={item}
                  customClass={styles.tableRow}
                />
              );
            })}
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default ClientTransaction;
