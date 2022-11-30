import React from "react";
import CharacterCommitmentCard from "../../../components/character-commitment-card/CharacterCommitmentCard";
import styles from "./characterCommitment.module.scss";
import { characterCommitmentData } from "../../../data/data";

const CharacterCommitment = () => {
  return (
    <>
      <div className={styles.characterMainContainer}>
        <div className={styles.characterCommitmentText}>
          Where our character & commitment meet
        </div>
        <div className={styles.characterCommitmentCardContainer}>
          {characterCommitmentData.map((item, index) => {
            return (
              <CharacterCommitmentCard
                key={index}
                characterCommitmentImg={item.characterCardImg}
                characterCommitmentTitle={item.characterCommitmentTitle}
                characterCommitmentInfo={item.characterCommitmentInfo}
                characterCommitmentBtn={item.characterCommitmentBtn}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CharacterCommitment;
