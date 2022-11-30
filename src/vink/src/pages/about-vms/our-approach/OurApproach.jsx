import React from 'react'
import ImageCard from '../../../components/image-card/ImageCard';
import { ourApproachData } from '../../../data/data';
import styles from "./ourApproach.module.scss";


const OurApproach = () => {
    return (
        <>
            <div className={styles.ourApproachContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.ourApproachText}>
                        Our Approach
                    </div>
                    <div className={styles.vmsBankText}>
                        VMS  Bank is built to serve businesses and their leaders across the Continent. Our depth of experience and expertise
                        along with our responsive service and commitment — enables us to help clients identify market opportunities,
                        make informed decisions and meet long-term objectives.

                    </div>
                </div>
                <ImageCard data={ourApproachData} />

            </div>
        </>
    )
}

export default OurApproach
