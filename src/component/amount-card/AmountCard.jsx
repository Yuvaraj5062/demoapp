import styles from './amountcard.module.scss'
const AmountCard = ({ amountType, amount, clients, accLine, customClass, imageCustomClass }) => {
    return (
        <div className={styles.amountContainer}>
            <div className={styles.amountContent}>
                <span className={styles.amountTypeText}>{amountType}</span>
                <div className={styles.amountText}>{amount}</div>
                <span className={styles.clients}>Clients: <span className={styles.clientsCount}>{clients}</span></span>
            </div>
            <img src={accLine} alt="accLine" className={[styles.accLineImage, imageCustomClass].join(" ")} />
        </div>
    )
}
export default AmountCard;