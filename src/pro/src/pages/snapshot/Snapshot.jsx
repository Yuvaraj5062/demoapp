import { Bar, BarChart, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import Divider from '../../component/divider/Divider';
import { TableHeading, TableRow } from '../../component/table/tableV2/TableV2';
import { snapshotGraphData, statisticsTableData1, statisticsTableMainHeader1, statisticsTableHeader1, statisticsTableMainHeader2, statisticsTableHeader2, statisticsTableData2, allocationTableHeader1, allocationTableRow1Data, allocationTableRow2Data, allocationTableHeader2, allocationTableRow5Data, allocationTableRow3Data, allocationTableRow4Data, statisticsGraphData } from '../../data/data';
import styles from './snapshot.module.scss'
const Snapshot = () => {
    return (
        <div className={styles.snapshotContainer}>
            <div className={styles.snapshotHeader}>
                <span className={styles.title}>Snapshot</span>
                <span>Analysis period: December 30, 2021 - February 2, 2022</span>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.clientDetailsContainer}>
                    <div className={styles.clientDetails}>
                        <div>
                            <p className={styles.text}>Name</p>
                            <p className={styles.text}>Account</p>
                            <p className={styles.text}>Account Type</p>
                        </div>
                        <div>
                            <p>Caloite in brodha</p>
                            <p>U1202541</p>
                            <p>Advisor Client</p>
                        </div>
                    </div>
                    <div className={styles.measurementUnits}>
                        <p>PERFORMANCE MEASURE</p>
                        <p>WTC</p>
                        <p>BASE CURRENCY</p>
                        <p>USD</p>
                    </div>
                </div>
                <Divider />
                <div className={styles.graphTableContainer}>
                    <div className={styles.lineBarGraph}>
                        <div className={styles.textContainer}>
                            <span className={styles.netValueText}>Net Asset Value</span>
                            <span className={styles.cumulativeText}>Cumulative Return</span>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <ComposedChart barGap={-50} data={snapshotGraphData}>
                                {/* <BarChart barGap={-50} data={snapshotGraphData}> */}
                                    <XAxis dataKey="R" />
                                    {/* <ReferenceLine x="R6,1m" y={2000} stroke="#FFAB2D" /> */}
                                    <YAxis />
                                    <YAxis orientation="right" dataKey="R"/>
                                    <Bar dataKey="a" fill="#0868AA"></Bar>
                                    <Bar dataKey="b" fill="#0868AA"></Bar>
                                    <Bar dataKey="c" fill="#0868AA"></Bar>
                                    <Line dot={false} dataKey="uv" stroke="#82ca9d" />
                                    <Line dot={false} dataKey="pv" stroke="#FF2E2E" />
                                {/* </BarChart> */}
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className={styles.statisticsContainer}>
                        <span className={styles.statisticsText}>Key Statistics</span>
                        <div className={styles.data}>
                            <span>0.80%</span>
                            <span>-0.26%</span>
                            <span>0.80%</span>
                            <span>1.06%</span>
                            <span>-0.26%</span>
                        </div>
                        <div className={styles.type}>
                            <span>Cumulative Return</span>
                            <span>1 month Return</span>
                            <span>3months Return</span>
                            <span>Best Return</span>
                            <span>Worst Return</span>
                        </div>
                        <div className={styles.month}>
                            <span>Dec2021-Feb 2022</span>
                            <span>Feb 2022</span>
                            <span>Dec2021-Feb2022</span>
                            <span>Jan2022</span>
                            <span>Feb2022</span>
                        </div>
                        <div className={styles.snapshotTables}>
                            <table className={styles.topTable}>
                                <thead>
                                    {
                                        statisticsTableMainHeader1.map((item, index) => {
                                            return (
                                                <TableHeading colSpan="2" key={index} statisticsData={item} customClass={styles.navTableHeader} valueCustomClass={styles.tableValue} titleCustomClass={styles.tableTitle} />
                                            )
                                        })}
                                </thead>
                                <tbody>
                                    <tr>
                                        {
                                            statisticsTableHeader1.map((item, index) => {
                                                return (
                                                    <TableRow data={item} key={index} customClass={styles.topPerformerHeader} />
                                                )
                                            })
                                        }
                                    </tr>
                                    {
                                        statisticsTableData1.map((item, index) => {
                                            return (
                                                <TableRow statisticsData={item} tdCustomClass={styles.navTableValues} customClass={styles.navTableRow} key={index} />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <table className={styles.bottomTable}>
                                <thead>
                                    {
                                        statisticsTableMainHeader2.map((item, index) => {
                                            return (
                                                <TableHeading colSpan2="2" key={index} statisticsData={item} customClass={styles.navTableHeader} valueCustomClass={styles.tableValue} titleCustomClass={styles.tableTitle} />
                                            )
                                        })}
                                </thead>
                                <tbody>
                                    <tr>
                                        {
                                            statisticsTableHeader2.map((item, index) => {
                                                return (
                                                    <TableRow data={item} key={index} customClass={styles.topPerformerHeader} />
                                                )
                                            })
                                        }
                                    </tr>
                                    {
                                        statisticsTableData2.map((item, index) => {
                                            return (
                                                <TableRow statisticsData={item} tdCustomClass={styles.navTableValues} customClass={styles.navTableRow} key={index} />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={styles.returnsAllocationContainer}>
                    <div className={styles.returnsGraph}>
                        <span className={styles.returnsText}>Distriburtion of Returns</span>
                        <div style={{ width: '100%', height: 300 }} className={styles.chart}>
                            <ResponsiveContainer>
                                <BarChart data={statisticsGraphData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Bar dataKey="pv" fill="#FFAB2D" />
                                    <Bar dataKey="uv" fill="#0868AA" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className={styles.allocationContainer}>
                        <span className={styles.allocationText}>Allocation</span>
                        <div className={styles.allocationTables}>
                            <div>
                                <table className={styles.allocationTable}>
                                    <tbody>
                                        {
                                            allocationTableHeader1.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationHeader} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                        {
                                            allocationTableRow1Data.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationCash} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                        {
                                            allocationTableRow2Data.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationTotal} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <table className={styles.allocationTable}>
                                    <tbody>
                                        {
                                            allocationTableHeader2.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationHeader} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                        {
                                            allocationTableRow1Data.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationCash} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                        {
                                            allocationTableRow2Data.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationTotal} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table className={styles.allocationTable}>
                                    <tbody>
                                        {
                                            allocationTableHeader1.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationHeader} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                        {
                                            allocationTableRow3Data.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationOptions} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                        {
                                            allocationTableRow4Data.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationEquities} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <table className={styles.allocationTable}>
                                    <tbody>
                                        {
                                            allocationTableHeader2.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationHeader} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                        {
                                            allocationTableRow5Data.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationOptions} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                        {
                                            allocationTableRow4Data.map((item, index) => {
                                                return (
                                                    <TableRow allocationData={item} key={index} customClass={styles.allocationEquities} tdCustomClass={styles.allocationData} />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Snapshot;