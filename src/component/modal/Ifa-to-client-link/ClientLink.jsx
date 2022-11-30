import { clientData } from "../../../data/data";
import FilledButton from "../../filled-button/FilledButton";
import { Cross, DropdownIcon2 } from "../../svg-components";
import styles from "./clientlink.module.scss";

const ClientLink = ({ handleClose }) => {
  return (
    <div
      className={styles.clientLinkMainContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.clientLinkCross}>
        IFA to Client Link
        <span className={styles.crossIcon}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </span>
      </div>
      <div className={styles.clientData}>
        The following clients are linked to IFA001 (Lize-Marie Van der Spuy)
      </div>
      <div className={styles.dropdownContainer}>
        <div className={styles.lastMonth}>
          <span className={styles.dropdownHeading}>John Snow</span>
          <DropdownIcon2 fillColor="#0868AA" />
        </div>
        <FilledButton
          title="Search"
          customClass={styles.search}
          handleClick={() => {}}
        />
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableData}>
          <span className={styles.globalNumber}>
            Walt Capital Client Number
          </span>
          <span className={styles.link}>Linked?</span>
        </div>

        {clientData.map((item, index) => {
          return (
            <div className={styles.mainTableData} key={index}>
              <span className={styles.title}> {item.title}</span>
              <span className={styles.linkData}> {item.icon}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ClientLink;
