import React, { useEffect, useState } from 'react'
import { homPageData } from '../../../data/data';
import HomeSlider from '../home-slider/HomeSlider';
import styles from "./homeSliderMain.module.scss";


const HomeSliderMain = () => {
    const [slider, setSlider] = useState(0);

    useEffect(() => {
        if (slider < 3) {
            setTimeout(function () {
                setSlider(slider + 1);
            }, 1000 * 9); //9 Second delay
        } else {
            setSlider(0);
        }
    }, [slider]);
    return (
        <>
            {slider === 0 && <HomeSlider data={homPageData[0][0]} />}
            {slider === 1 && (
                <HomeSlider
                    data={homPageData[0][1]}
                    customBenefitClass={styles.benefitText}
                    customResultText={styles.resultText}
                />
            )}
            {slider === 2 && (
                <HomeSlider
                    data={homPageData[0][2]}
                    customBenefitClass={styles.benefitText1}
                    customResultText={styles.resultText1}
                />
            )}</>
    )
}

export default HomeSliderMain