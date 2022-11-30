import React from "react";
import styles from "./imageCard.module.scss";

const ImageCard = ({
  data,
  customClassContainer,
  customClass,
  cardSubTitleClass,
  cardTitleClass,
  imageContainerClass,
}) => {
  return (
    <div className={[styles.cardContainer, customClassContainer].join(" ")}>
      {data?.map((data, index) => {
        return (
          <div
            className={[styles.imageCard, customClass].join(" ")}
            key={index}
          >
            <div
              className={[styles.imageContainer, imageContainerClass].join(" ")}
            >
              <img src={data.image} alt="logos" />
            </div>
            <p className={[styles.cardTitle, cardTitleClass].join(" ")}>
              {data.title}
            </p>
            <p className={[styles.cardText, cardSubTitleClass].join(" ")}>
              {data.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default ImageCard;
