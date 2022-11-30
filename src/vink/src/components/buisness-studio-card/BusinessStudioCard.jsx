import styles from "./businessStudioCard.module.scss";
const BusinessStudioCard = ({ title, icon, desciption }) => {
  return (
    <>
      <div className={styles.businessStudioCardContainer}>
        <img src={icon} />
        <p className={styles.titleStyle}>{title}</p>
        <p className={styles.desciptionText}>{desciption}</p>
      </div>
    </>
  );
};

export default BusinessStudioCard;
