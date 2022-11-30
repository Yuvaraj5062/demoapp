import Divider from '../../../../components/divider/Divider';
import styles from './sharepricecard.module.scss'
const SharePriceCard = ({ data }) => {
    const lengthOFdata = data.cardData.length;
    return (
        <div className={styles.mainCardContainer}>
            <p className={styles.mainCardTitle}>{data.cardSubject}</p>
            {data.cardData?.map((data, index) => {
                return (<>
                    <div className={styles.mainCardText}>
                        <p className={styles.mainCardTextName}>{data.title}</p>
                        <p className={styles.mainCardTextValue}>
                            <span className={styles.mainCardTextSubValue}>{data?.subValue}</span>
                            {data.value}
                        </p>
                    </div>
                    {index < lengthOFdata - 1 ? <Divider customClass={styles.dividerMarginBT} /> : null}

                </>)
            })}


        </div>
    )
}
export default SharePriceCard;