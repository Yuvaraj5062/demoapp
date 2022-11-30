import styles from './buttonV2.module.scss'
const ButtonV2 = ({ title, customClass }) => {
    return (
        <button className={[styles.button, customClass].join(' ')}>
            <span className={styles.title}>{title}</span>
        </button>
    )
}
export default ButtonV2