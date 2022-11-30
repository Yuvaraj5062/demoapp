import styles from "./watchlist.module.scss";
import { Area, AreaChart } from "recharts";
import { useState, useEffect, useRef } from "react";
import { XAxis } from "recharts";
import { YAxis } from "recharts";
import { Tooltip, CartesianGrid } from "recharts";
import FilledButton from "../../component/filled-button/FilledButton";
import DropDown from "../../component/dropdown/DropDown";
import {
  DateRange,
  Download,
  IcCheck,
  Refresh,
  DropdownIcon2,
} from "../../component/svg-components";
import {
  tabledata,
  GraphData,
  watchListHeader,
  watchListData,
} from "../../data/data";
import Table from "../../component/table/new-table/Table";

const Watchlist = () => {
  const ref = useRef();
  const [click, setClick] = useState(false);

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

  const tabledataName = tabledata.map((item) => item.name);
  const dateRange = ["1D", "5D", "1M", "3M", "6M", "YTD", "1Y", "5Y", "ALL"];

  return (
    <div className={styles.homeContainer}>
      {/* <p className={styles.homePageTitle}>Home</p> */}
      {/* <p className={styles.title}>My Watchlist – Data feed delayed</p> */}
      <div className={styles.tableContent}>
        <div className={styles.tableContainer}>
          <p className={styles.title}>My Watchlist – Data feed delayed</p>
          <div className={styles.watchlistContent} ref={ref}>
            <FilledButton
              title="SYMBOL"
              customClass={styles.symbolButton}
              handleClick={() => {}}
            />
            <div
              className={styles.dropdownContainer}
              onClick={() => setClick((prevState) => !prevState)}
            >
              <div className={styles.dropdownContainerItems}>
                <span className={styles.dropdownContent}>Watch List</span>
                <span className={styles.dropdownIcon}>
                  <DropdownIcon2 fillColor="#0868AA" />
                </span>
              </div>
              <div className={styles.dropdownMain}>
                {click ? (
                  <DropDown
                    dropdownItems={tabledataName}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
            </div>
          </div>
          {/* <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.serialNumberHeading}>
                  <IcCheck fillColor="#ffffff" />
                </th>
                <th className={styles.tableHeading}>SYMBOL</th>
                <th className={styles.tableHeading}>LAST</th>
                <th className={styles.tableHeading}>NET CHG</th>
                <th className={styles.tableHeading}>NET %CHG</th>
              </tr>
            </thead>
            <tbody>
              {tabledata.map((item, index) => {
                return (
                  <tr className={styles.tableRow} key={index}>
                    <td className={styles.serialNumber}>
                      <div className={styles.crossIconContainer}>
                        {item.cross}
                      </div>
                    </td>

                    <td className={styles.symbol}>{item.name}</td>

                    <td
                      className={
                        item.status ? styles.tableColumn : styles.tableColumn1
                      }
                    >
                      {item.last}
                    </td>
                    <td
                      className={
                        item.status ? styles.tableColumn : styles.tableColumn1
                      }
                    >
                      {item.netchg}
                    </td>
                    <td
                      className={
                        item.status ? styles.tableColumn : styles.tableColumn1
                      }
                    >
                      {item.perchg}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
          <div>
            <Table
              tableheading={watchListHeader}
              tabledata={watchListData}
              customClassTableContainer={styles.customClassTableContainer}
              customClassTh={styles.customClassTh}
              customClassTd={styles.customClassTd}
              customClassTd1={styles.customClassTd1}
              customClassTableRow={styles.customClassTableRow}
            />
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.lineChart}>
            <div className={styles.chartContainer}>
              <span className={styles.chartTitle}>
                iPath Series B S&P 500 VIX Short-Term Futures ETN - 15 - Arca -
                TradingView
              </span>
            </div>
            <div className={styles.rangeContainer}>
              <div className={styles.dataContainer}>
                <span className={styles.rangeOne}>21.95</span>
                <span className={styles.rangeZero}> 0. </span>

                <span className={styles.rangeTwo}>01</span>
                <span className={styles.rangeThree}>21.96</span>
              </div>
              <div className={styles.iconContainer}>
                <Download fillColor="#0868AA" />

                <span className={styles.refreshIconButton}>
                  <Refresh fillColor="#0868AA" />
                </span>
              </div>
            </div>
            <AreaChart
              width={628}
              height={188}
              data={GraphData}
              margin={{ top: 10, right: 0, left: 35, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0868AA" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis dataKey="value" />
              <YAxis orientation="right" width="55" />
              <CartesianGrid horizontal={true} vertical={false} opacity={0.5} />
              <Tooltip />
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
          </div>

          <div className={styles.dateRangeContainer}>
            {dateRange.map((item, index) => {
              return (
                <span className={styles.dateRangeItem} key={index}>
                  {item}
                </span>
              );
            })}
            <span className={styles.dateRangeIcon}>
              <DateRange fillColor="#0B6AAB" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
