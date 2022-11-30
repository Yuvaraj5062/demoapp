import Button from '../../../../components/button/Button';
import Divider from '../../../../components/divider/Divider';
import { Polygone } from '../../../../components/svg-components';
import { color } from '../../../../constants/color';
import styles from './shareQuoteCard.module.scss'
const ShareQuoteCard = () => {
    return (
        <div className={styles.mainCardContainer}>
            <p className={styles.mainCardTitle}>SHARE QUOTE</p>
            <p className={styles.sharePriceTag}>CHA</p>
            <p className={styles.sharePrice}>2.60</p>
            <Divider customClass={styles.dividerMarginBT} />
            <div className={styles.mainCardChange}>
                <p className={styles.mainCardChangeName}>YEAR TO DATE	</p>
                <p className={styles.mainCardChangeValue}>
                    <span className={styles.mainCardChangeIcon}><Polygone fillColor={color.green2} /></span>
                    0.01/0.39%
                </p>
            </div>
            <div className={styles.mainCardChange}>
                <p className={styles.mainCardChangeName}>52 WEEK CHANGE</p>
                <p className={styles.mainCardChangeValue}>
                    <span className={styles.mainCardChangeIcon}><Polygone fillColor={color.green2} /></span>
                    205.88%
                </p>
            </div>
            <Divider customClass={styles.dividerMarginBT} />

            <div className={styles.mainCardHighLow}>
                <p className={styles.mainCardHighLowTitle}>52 WEEK LOW</p>
                <p className={styles.mainCardHighLowTitle}>52 WEEK HIGH</p>
            </div>
            <div className={styles.mainCardHighLow}>
                <p className={styles.mainCardHighLowValue}>0.95</p>
                <p className={styles.mainCardHighLowValue}>2.75</p>
            </div>
            <Button title="Company alerts available" customClass={styles.shareQuoteCardBTN} />
        </div>
    )
}
export default ShareQuoteCard;