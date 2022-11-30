import QuestionCard from "../../../components/question-card/QuestionCard";
import { instituteImageData, questionData } from "../../../data/data";
import styles from "./needHelp.module.scss";

const NeedHelp = () => {
  return (
    <>
      <div className={styles.needHelpContainer}>
        <p className={styles.helpText}>Have a Special Need? We Can Help.</p>
        <div className={styles.cardContainer}>
          {questionData.map((item, index) => {
            return (
              <QuestionCard
                image={item.image}
                question={item.question}
                key={index}
              />
            );
          })}
        </div>
        <p className={styles.findCardText}>
          Find a Card from your Favorite Financial Institution
        </p>
        <div className={styles.imageContainer}>
          {instituteImageData.map((item, index) => {
            return (
              <img
                key={index}
                src={item}
                alt="instituteImage"
                className={styles.imageStyle}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NeedHelp;
