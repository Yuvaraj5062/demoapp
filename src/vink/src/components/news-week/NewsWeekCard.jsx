import React from 'react'
import styles from './newsWeekCard.module.scss'
import NewsWeekImg from '../../assests/images/Newsweek.png'
const NewsWeekCard = () => {
    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.cardText}>Newsweek and Statista asked 50,000 Africans to rate their trust in companies they know well as a customer, investor or employee, allowing them to choose from all publicly traded
                        U.S. companies with revenues over $500 million*. Based on the survey, Newsweek named the 400 most trusted companies in Africa, ranking firms across 22 industries. Within our industry, VMS Bank ranks first.
                    </div>
                    <img src={NewsWeekImg} alt='NewsWeek' />
                </div>
            </div>
        </>
    )
}

export default NewsWeekCard