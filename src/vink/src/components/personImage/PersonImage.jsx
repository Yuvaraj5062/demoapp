import styles from "./personImage.module.scss";

const PersonImage = ({ img, name }) => {
  return (
    <>
      <div className={styles.imageContainer}>
        <img src={img} className={styles.imageStyle} />
        <div className={styles.nameText}>{name}</div>
      </div>
    </>
  );
};

export default PersonImage;
