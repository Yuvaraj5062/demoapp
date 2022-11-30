import styles from './counter.module.scss'
const Counter = ({ count }) => {
    return (
        <span className={styles.counterContainer}>
            <span className={styles.minus}>{"-"}</span>
            <span className={styles.count}>{count}</span>
            <span className={styles.plus}>{'+'}</span>
        </span>
    )
}

export default Counter