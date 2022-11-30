import styles from './timer.module.scss'
const Timer = ({time}) => {
    return (
        <span className={styles.timeText}>{time} Sec left</span>
    )
}
export default  Timer;