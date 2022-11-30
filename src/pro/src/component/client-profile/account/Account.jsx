import styles from "./account.module.scss";

const Account = ({ amount, accountname, handleClick, customClass }) => {
  return (
    <div className={styles.accountContainer}>
      <div className={styles.investmentAccount} onClick={() => handleClick()}>
        <div className={[styles.amountText, customClass].join(" ")}>
          {amount}
        </div>
        <span className={styles.accountName}>{accountname}</span>
      </div>
    </div>
  );
};

export default Account;
