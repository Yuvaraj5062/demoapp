import styles from "./experienceCard.module.scss";

// const ExperienceCard = ({ aboutusTitle, aboutusCount, aboutustxt }) => {
const ExperienceCard = ({ ABoutusDetails }) => {
  return (
    <>
      <div className={styles.aboutusCard}>
        {/* <div className={styles.aboutusTitle}>{aboutusTitle}</div>
        <div className={styles.aboutusCount}>{aboutusCount}</div>
        <div className={styles.aboutustxt}>{aboutustxt}</div> */}
        <div className={styles.aboutusTitle}>{ABoutusDetails.aboutusTitle}</div>
        <div className={styles.aboutusCount}>{ABoutusDetails.aboutusCount}</div>
        <div className={styles.aboutustxt}>{ABoutusDetails.aboutustxt}</div>
      </div>
    </>
  );
};

export default ExperienceCard;
