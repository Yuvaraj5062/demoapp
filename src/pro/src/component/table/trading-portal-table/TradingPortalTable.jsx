import styles from './tradingportaltable.module.scss'

const TradingPortalTable = ({ data }) => {
    return (
        <div className={styles.tradingPortalTypeConainer}>
            <table className={styles.tradingPortalTable} cellSpacing={0} >
                <tbody>
                    {
                        data.map((item, index) => {
                            return (
                                <tr className={styles.row} key={index}>
                                    <td className={styles.column}>{item.label}</td>
                                    <td className={styles.column}>{item.component}</td>
                                </tr>
                            )   
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default TradingPortalTable