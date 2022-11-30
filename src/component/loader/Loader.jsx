import styles from './loader.module.scss'
const Loader = ({customClass}) => {
    return (
        <div className={[styles.loader,customClass].join(' ')}>
            <div className={styles.spinner}>
            </div>
        </div>
    )
}
export default Loader;