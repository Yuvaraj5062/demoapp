import React from 'react'
import Button from '../../../components/button/Button';
import styles from "./aboutVmsInfo.module.scss";



export const AboutVmsInfo = ({ title, subtitle, buttonText, image, alt, customClass, customClassForText, customClassForImage }) => {
    return (
        <>
            <div className={styles.aboutVmsContainer}>
                <div className={styles.mainContainer}>
                    {/* <div className={styles.aboutContainer}> */}
                    <div className={[styles.investContent, customClass].join(" ")}>

                        <div className={[styles.investTextContainer, customClassForText].join(" ")}>
                            <p className={styles.investingBankerText}>
                                {title}</p>
                            <p className={styles.subTitleText}>
                                {subtitle}
                            </p>


                            <Button
                                title={buttonText}
                                customClass={styles.btnStyle}
                                customClassForText={styles.btnText}
                            />
                        </div>
                        <img
                            src={image}
                            alt={alt}
                            className={[styles.imageContainer, customClassForImage].join(" ")}
                        />
                    </div>
                </div></div>
        </>
    )
}
export default AboutVmsInfo