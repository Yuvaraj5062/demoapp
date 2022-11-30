import ExperienceCard from "../../../components/experience-card/ExperienceCard";
import { aboutusData } from "../../../data/data";
import styles from "./experience.module.scss";
import Title from "../../../components/title/Title";

const Experience = () => {
  return (
    <>
      <div className={styles.experienceContainer}>
        {/* <span className={styles.experienceText}>
          Experience and trust on your side
        </span> */}
        <Title title="Experience and trust on your side" />
        <div className={styles.bankInfoText}>
          VMS Bank builds long-term relationships that allow us to deliver
          financial solutions for our valued clients across the Africa
        </div>
        <div className={styles.AboutusCardContainer}>
          {/* {aboutusData.map((item, index) => (
            <ExperienceCard
              aboutusTitle={item.aboutusTitle}
              aboutusCount={item.aboutusCount}
              aboutustxt={item.aboutustxt}
              key={index}
            />
          ))} */}
          {aboutusData.map((aboutusCardData, index) => (
            <ExperienceCard ABoutusDetails={aboutusCardData} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Experience;
