import React from 'react'
import ImageCard from '../../../components/image-card/ImageCard';
import { strategyAndSolutionData } from '../../../data/data';
import styles from "./strategyAndSolutions.module.scss";

const StrategyAndSolutions = () => {
    return (
        <>
            <div className={styles.strategyAndSolutionsContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.strategyAndSolutionsText}>
                        The strategy and solutions to address every phase of life
                    </div>
                    <div className={styles.subTitleText}>
                        As a wealth management client of VMS Bank, you’ll enjoy access to one integrated team focused on your long- term wealth and estate planning. With a consultative approach, we work with you to provide the insights and resources to help bridge the gap between today’s complex financial picture and your vision for the future.

                    </div>
                </div>
                <ImageCard
                    data={strategyAndSolutionData}
                    customClass={styles.imageCart}
                    customClassContainer={styles.customClassContainer}
                    imageContainerClass={styles.imageContainer}
                    cardTitleClass={styles.cardTitle}
                    cardSubTitleClass={styles.cardSubTitleText}
                />

            </div>
        </>
    )
}

export default StrategyAndSolutions



