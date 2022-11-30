import styles from "./clientslist.module.scss";

const ClientsList = ({ clientListData }) => {
  return (
    <div className={styles.clientsListContainer}>
      {clientListData.map((item, index) => {
        return (
          <div className={styles.clientsListContent} key={index}>
            <div className={styles.clientsFirstLetterContainer}>
              <span className={styles.clientsFirstLetter}>{item.letter}</span>
              <span className={styles.clientName}>{item.name}</span>
            </div>
            <p className={styles.zarPrice}>ZAR: {item.amount}</p>
            <p className={styles.clientNumber}>
              Clients:
              <span className={styles.numberOfClients}>{item.number}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ClientsList;
