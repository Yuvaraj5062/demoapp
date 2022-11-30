import styles from "./pricetype.module.scss";

const PriceType = ({ type, price }) => {
  return (
    <div className={styles.priceTypeMainContainer}>
      <span className={styles.priceType}>{type}</span>
      <div>
        <span className={styles.price}>{price}</span>
      </div>
    </div>
  );
};

export default PriceType;
