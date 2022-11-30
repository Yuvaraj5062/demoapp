import CharacterCommitmentCard from "../../../components/character-commitment-card/CharacterCommitmentCard";
import Title from "../../../components/title/Title";
import { stepOfWayData } from "../../../data/data";
import styles from "./stepOfWay.module.scss";

const StepOfWay = () => {
  return (
    <>
      <div className={styles.stepOfWayContainer}>
        {/* <span className={styles.titleText}>
          With you every step of the way.
        </span> */}
        <Title title="With you every step of the way." />
        <div className={styles.cardContainer}>
          {stepOfWayData.map((item, index) => {
            return (
              <CharacterCommitmentCard
                key={index}
                characterCommitmentImg={item.characterCardImg}
                characterCommitmentTitle={item.characterCommitmentTitle}
                characterCommitmentInfo={item.characterCommitmentInfo}
                characterCommitmentBtn={item.characterCommitmentBtn}
                customClass={styles.cardLayout}
                customClassForImg={styles.imgStyle}
                customClassForTitle={styles.customClassForTitle}
                customClassForButton={styles.customClassForButton}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StepOfWay;
