import React from "react";
import Button from "../button/Button";
import styles from "./characterCommitmentCard.module.scss";

const CharacterCommitmentCard = ({
  characterCommitmentImg,
  characterCommitmentTitle,
  characterCommitmentInfo,
  characterCommitmentBtn,
  customClass,
  customClassForImg,
  customClassForTitle,
  customClassForButton,
  customClassForInfo,
}) => {
  return (
    <>
      <div
        className={[styles.CharacterCommitmentContainer, customClass].join(" ")}
      >
        <img
          src={characterCommitmentImg}
          className={[styles.characterCommitmentImg, customClassForImg].join(
            " "
          )}
        />
        <div className={styles.CharacterCommitmentContent}>
          <p
            className={[
              styles.characterCommitmentTitle,
              customClassForTitle,
            ].join(" ")}
          >
            {characterCommitmentTitle}
          </p>
          <p className={[styles.characterCommitmentInfo, customClassForInfo].join(' ')}>
            {characterCommitmentInfo}
          </p>
          <Button
            title={characterCommitmentBtn}
            customClass={[styles.commitmentBtn, customClassForButton].join(" ")}
            customClassForText={styles.CommitmentBtnText}
          />
        </div>
      </div>
    </>
  );
};

export default CharacterCommitmentCard;
