import styles from './waltvaluation.module.scss';

const WaltValuation = ({ waltValue, customClass }) => {
    return (
        <div className={[styles.waltValuationContainer, customClass].join(" ")}>
            {waltValue}
        </div>
    )
}

export default WaltValuation