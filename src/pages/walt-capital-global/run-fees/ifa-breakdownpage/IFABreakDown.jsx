import styles from "./ifabreakdown.module.scss";
import { TableHeader, TableRow } from "../../../../component/table/Table";
import { ifaBreakDownBody, ifaBreakDownHead } from "../../../../data/data";
import Table from "../../../../component/table/new-table/Table";
const IFABreakDownPage = () => {
  return (
    <div className={styles.ifaBreakDownPageContainer}>
      <div className={styles.month}>
        <span className={styles.monthText}>Month : 31 March 2021</span>
      </div>
      <Table
        tableheading={ifaBreakDownHead}
        tabledata={ifaBreakDownBody}
        customClassTh={styles.customClassTh}
      />
      {/* <table cellSpacing={0} className={styles.table}>
        <thead>
          <TableHeader
            data={ifaBreakDownHead}
            customClass={styles.tableHead}
            customClassForTh={styles.customClassForTh}
          />
        </thead>
        <tbody>
          {ifaBreakDownBody.map((item, index) => {
            return (
              <TableRow
                ifaBreakDownBody={item}
                key={index}
                customClass={styles.tableRow}
                customClassForTd={styles.customClassForTd}
              />
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
};

export default IFABreakDownPage;
