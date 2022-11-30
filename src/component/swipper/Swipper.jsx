import styles from './swipper.module.scss'
const Swipper = ({title}) => {
    return (
        <span className={styles.swipperContainer}>
            <span className={styles.leftArrow}>{"<"}</span>
            <span className={styles.title}>{title}</span>
            <span className={styles.rightArrow}>{'>'}</span>
        </span>
    )
}

export default Swipper