import styles from './insuranceportal.module.scss'

const InsurancePortal = () => {
  return (
    <>
      <div className={styles.insurancePortalContainer}>
        <p className={styles.textContent}>
          “We are feverish working to bring you the best{' '}
          <span className={styles.spanText}>insurance product</span> available,
          we are not finished with the development but do check back regularly!”
        </p>
      </div>
    </>
  )
}

export default InsurancePortal
