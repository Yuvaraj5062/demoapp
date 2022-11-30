import React from 'react'
import styles from "./investorNewsData.module.scss";

const investorNewsData = ({
    investorDate,
    investorMonth,
    investorYear,
    investorHeading,
    investorInfo
}) => {
    return (
        <>
            <div className={styles.investorMain}>
                <div className={styles.investorInfoLeft}>
                    <p className={styles.investorDate}>{investorDate}</p>
                    <span className={styles.investorMonth}>{investorMonth}</span>,<span className={styles.investorYear}>{investorYear}</span>
                </div>
                <div className={styles.investorInfoRight}>
                    <p className={styles.investorHeading}>{investorHeading}</p>
                    <p className={styles.investorInfo}>{investorInfo}</p>
                </div>
            </div>
        </>
    )
}

export default investorNewsData
