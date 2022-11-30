import WaltValuation from "../walt-valuation/WaltValuation";
import styles from './totalamountcard.module.scss'
const TotalAmountCard = ({ title }) => {
    return (
        <div className={styles.totalAmountCardContainer}>
            <div className={styles.cardTitle}>{title}</div>
            <div className={styles.usdValue}>
                <WaltValuation waltValue="USD: 5,325,145" />
            </div>
            <div className={styles.zarValue}>
                <WaltValuation waltValue="ZAR: 36,141,599" />
            </div>
        </div>
    )
}

export default TotalAmountCard;