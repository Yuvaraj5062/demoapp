import styles from './tradingportal.module.scss'
import Search from '../../component/search/Search'
import { Chart, Chart2,InfoIcon, Question, Round } from '../../component/svg-components';
import Divider from '../../component/divider/Divider';
import { TableHeader, TableRow } from '../../component/table/Table'
import TradingPortalTable from '../../component/table/trading-portal-table/TradingPortalTable';
import FilledButton from '../../component/filled-button/FilledButton';
import { costData, tradingBody, tradingHead, tradingPortalData } from '../../data/data';
const TradingPortal = () => {
    return (
        <div className={styles.tradingPortalContainer}>
            <div className={styles.tradingPortalHeader}>
                <div className={styles.tradingPortalHeaderLeft}>
                    <span className={styles.fxText}>FX</span>
                    <div className={styles.usDollar}>
                        <span className={styles.usdZarText}>USDZAR</span>
                        <span className={styles.usdSAText}>US Dollar/South African Rand</span>
                    </div>
                </div>
                <div className={styles.tradingPortalHeaderRight}>
                    <InfoIcon fillColor='#969BA0' customClass={styles.iconClass} />
                    <Chart fillColor='#969BA0' customClass={styles.iconClass} />
                    <Chart2 fillColor='#969BA0' customClass={styles.iconClass} />
                    <Search placeholder="Search" customClass={styles.search} inputCustomClass={styles.input} />
                </div>
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.tradingPortalContent}>
                <table className={styles.table} cellSpacing={0} >
                    <thead>
                        <TableHeader data={tradingHead} customClass={styles.tableHeadRow} customClassForTh={styles.customClassForTh} />
                    </thead>
                    <tbody>
                        {
                            tradingBody.map((item, index) => {
                                return (
                                    <TableRow tradingBody={item} key={index} customClass={styles.tableBodyRow} customClassForTd={styles.customClassForTd} />
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className={styles.realTimePriceContainer}>
                    <div className={styles.realTimePrice}>
                        <Chart fillColor='#2BC155' />
                        <span className={styles.realTimePriceText}>Realtime Prices</span>
                    </div >
                    <div className={styles.open}>
                        <Round fillColor=' #2BC155' customClass={styles.roundIcon} />
                        <span className={styles.openText}>Open</span>
                    </div>
                </div>
                <div className={styles.tableContainer}>
                    <TradingPortalTable data={tradingPortalData} />
                    <div className={styles.costTableContainer}>
                        <table className={styles.costTable}>
                            <tbody>
                                {
                                    costData.map((item,index)=>{
                                        return (
                                            <tr key={index} className={index === 0 ? styles.costTableRow1 : styles.costTableRow}>
                                                {/* <td>{item.title} { item.icon ?   <Question fillColor="#969BA0"/> : null } </td> */}
                                                <td className={index === 0 ? styles.costTableTd1 : styles.costTableTd}>{item.title} { index === 0 ?   null : <span className={styles.question}><Question fillColor="#969BA0"/></span>  } </td>
                                                <td className={index === 0 ? styles.costTableTd2 : styles.costTableTd}>{item.cost}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.addTakeProfit}>
                    Add Take profit / Stop loss
                </div>
                <FilledButton handleClick={()=>{}} handleMouseEnter={()=>{}} handleMouseLeave={()=>{}} title='Place Order' customClass={styles.orderButton}/>
            </div>
        </div>
    )
}

export default TradingPortal;