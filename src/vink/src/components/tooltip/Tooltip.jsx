import Button from '../button/Button';
import styles from './tooltip.module.scss'
const Tooltip = ({ content,customClass }) => {
    return (
        <div className={[styles.tooltipMainContainer,customClass].join(' ')}>
                <span className={styles.title}>{content?.title}</span>
                <div className={styles.description}>{content?.description}</div>
                <Button title={content?.buttonText} customClass={styles.button} />
        </div>
    )
}
export default Tooltip;