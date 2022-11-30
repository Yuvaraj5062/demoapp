import FilledButton from "../../../../component/filled-button/FilledButton";
import styles from "./table.module.scss";
const Table = ({
  tableheading,
  tabledata,
  customClassTable,
  customClassTableContainer,
  customClassTableHead,
  customClassTh,
  customClassTableRow,
  customClassTableRow1,
  customClassTd,
  customClassTd1,
  handleAction,
  ButtonGroup,
  handleGoTo,
  setFactSheet,
  customTableBody
}) => {
  return (
    <>
      <div
        className={[styles.tableContainer, customClassTableContainer].join(" ")}
      >
        <table
          className={[styles.table, customClassTable].join(" ")}
          cellSpacing={0}
        >
          <thead>
            <tr className={customClassTableHead}>
              {tableheading.map((item, index) => {
                return (
                  <TableHeader
                    item={item}
                    key={index}
                    customClassTh={customClassTh}
                  />
                );
              })}
            </tr>
          </thead>
          <tbody className={[styles.tableBody, customTableBody].join(" ")}>
            {tabledata?.map((item, index) => (
              <TableRow
                item={item}
                tableheading={tableheading}
                key={index}
                customClassTableRow={customClassTableRow}
                customClassTableRow1={customClassTableRow1}
                customClassTd={customClassTd}
                handleAction={handleAction}
                handleClick={() => handleGoTo(item)}
                id={item.id}
                customClassTd1={customClassTd1}
                ButtonGroup={ButtonGroup}
                setFactSheet={setFactSheet}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const TableHeader = ({ item, customClassTh }) => (
  <th className={[customClassTh, styles.tableHead].join(" ")}>{item.label}</th>
);
const TableRow = ({
  item,
  tableheading,
  customClassTableRow,
  customClassTd,
  handleClick,
  id,
  setFactSheet
}) => {
  return (
    <tr
      className={[customClassTableRow, styles.tableRow].join(" ")}
      onClick={() => { }}
    >
      {tableheading.map((tableheadingitem, index) => {
        return (
          <td
            className={[styles.tableRowData, customClassTd].join(" ")}
            key={index}
          >
            {tableheadingitem.editAble ? (
              <FilledButton
                title={item.isFactSheetCreated ? "Edit" : "Add"}
                customClass={styles.addEditButton}
                handleClick={() => { setFactSheet({ shown: true, id: item }) }}
              />
            ) : tableheadingitem.isStatus ? (
              item.isActive ? (
                "Active"
              ) : (
                "Inactive"
              )
            ) : tableheadingitem.action ? (
              <FilledButton
                title={!item.isActive ? "Activate" : "Deactivate"}
                customClass={
                  !item.isFactSheetCreated
                    ? styles.buttonDisable
                    : !item.isActive
                      ? styles.buttonDeactive
                      : styles.buttonAcitve
                }
                handleClick={() =>
                  !item?.isFactSheetCreated ? {} : handleClick()
                }
              />
            ) : (
              item[tableheadingitem.value]
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
