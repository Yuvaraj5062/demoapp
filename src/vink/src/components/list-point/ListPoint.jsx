import styles from "./listPoint.module.scss";

const ListPoint = ({ title }) => {
  return (
    <>
      <ul className={styles.OnlineBankingCardList}>
        <li className={styles.OnlineBankingCardListItem}>{title}</li>
      </ul>
    </>
  );
};

export default ListPoint;
