import styles from "./questionCard.module.scss";

const QuestionCard = ({ image, question }) => {
  return (
    <>
      <div className={styles.questionCardContainer}>
        <img src={image} alt="SpecialCardImg" className={styles.imageStyle} />
        <p className={styles.questionText}>{question}</p>
      </div>
    </>
  );
};

export default QuestionCard;
