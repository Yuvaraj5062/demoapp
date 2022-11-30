import {
  TableHeading,
  TableRow,
} from "../../../../component/table/tableV2/TableV2";
import styles from "./incometable.module.scss";

const IncomeTable = ({ data, title, tableFooterData, customClass }) => {
  return (
    <div className={[styles.incomePPM, customClass].join(" ")}>
      <table className={styles.table} cellSpacing={0}>
        <thead>
          <tr>
            <TableHeading
              data={title}
              dataCustomClass={styles.incomeHeading}
              colSpan={2}
            />
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <TableRow
                returnsData={item}
                key={index}
                tdCustomClass={styles.tdCustomClass}
                customClass={styles.tableRow}
                tdCustomClass2={styles.tdCustomClass2}
              />
            );
          })}
          <TableRow
            returnsData={tableFooterData}
            tdCustomClass={styles.totalData}
            tdCustomClass2={styles.tdCustomClassFooter}
          />
        </tbody>
      </table>
    </div>
  );
};

export default IncomeTable;
