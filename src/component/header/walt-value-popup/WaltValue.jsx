import Divider from "../../divider/Divider";
import styles from './waltvalue.module.scss'
import { Cross } from "../../svg-components";
const WaltValue = ({handleClose}) => {
    return (
        <div className={styles.waltValueContainer} onClick={(e)=>{e.stopPropagation()}}>
            <div className={styles.crossIcon}>
                <Cross fillColor='#000000' handleClose={() => handleClose()} />
            </div>
            <div className={styles.waltValueContent}>
            <div className={styles.waltSa}>
                <p className={styles.waltText}>Walt SA Valuation</p>
                <div className={styles.zarText}>ZAR: <span className={styles.amount}>10,199,500</span></div>
            <Divider customClass={styles.divider}/>
                <p className={styles.waltText}>Walt Off shore Valuation</p>
                <div className={styles.zarText}>USD: <span className={styles.amount}>1,325,541</span></div>
            </div>
            </div>
        </div>
    )
}

export default WaltValue;