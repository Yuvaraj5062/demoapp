import styles from "./account.module.scss";

const Account = ({ amount, accountname, handleClick, customClass,subTitle }) => {
  return (
    <div className={styles.accountContainer}>
      <div className={styles.investmentAccount} onClick={() => handleClick()}>
        <div className={[styles.amountText, customClass].join(" ")}>
          {amount}
        </div>
        <span className={styles.accountName}>{accountname}({subTitle})</span>
      </div>
    </div>
  );
};

export default Account;
