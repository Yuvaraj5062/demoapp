import { UpArrow } from '../../../components/svg-components';
import { color } from '../../../constants/color';
import styles from './performanceTypeCard.module.scss'
const PerformanceTypeCard = ({ item }) => {
    return (
        <div className={styles.investorRelationsCard} >
            <p className={styles.investorRelationsCardTitle}>
                {item.title}
            </p>
            <hr className={styles.investorRelationsCardDivider} />
            <div className={styles.investorRelationsCardTxtSectionOne}>
                <div className={styles.changeContainer}>
                    <UpArrow fillColor={color.blue4} />
                    <div className={styles.changeContainerRight}>
                        <p className={styles.investorRelationsCardTxtSectionOneTxtOne}>
                            {item.change}
                        </p>
                        <p className={styles.investorRelationsCardTxtSectionOneTxtTwo}>
                            {item.changePrice}
                        </p>
                        <p className={styles.investorRelationsCardTxtSectionOneTxtThree}>
                            {item.totalPrice}
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.investorRelationsCardTxtSectionTwo}>
                <div className={styles.investorRelationsCardYear}>
                    <p className={styles.investorRelationsCardYearTxt}>
                        {item.fYear1}
                    </p>
                    <p className={styles.investorRelationsCardYearTxt}>
                        {item.fYear2}
                    </p>
                </div>
                <div className={styles.investorRelationsCardAmount}>
                    <p className={styles.investorRelationsCardAmountTxt}>
                        {item.fYear1Price}
                    </p>
                    <p className={styles.investorRelationsCardAmountTxt}>
                        {item.fYear2Price}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default PerformanceTypeCard;