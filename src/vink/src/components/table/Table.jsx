import styles from "./table.module.scss";
const Table = ({
    customClassTableContainer,
    customClassTable,
    tableheading,
    customClassTh,
    tabledata,
    customClassTd,
    customClassTableRow,
    customClassTableHead,
    ButtonGroup,
    customClassLastTd,
}) => {
    return (
        <div
            className={[styles.tableContainer, customClassTableContainer].join(" ")}
        >
            <table
                className={[styles.table, customClassTable].join(" ")}
                cellSpacing={0}
            >
                <thead>
                    <tr className={[styles.tableHeadRow, customClassTableHead].join(" ")}>
                        {tableheading &&
                            tableheading.map((item, index) => (
                                <TableHead
                                    item={item}
                                    key={index}
                                    customClassTh={customClassTh}
                                />
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {tabledata &&
                        tabledata.map((item, index) => (
                            <TableRow
                                item={item}
                                tableheading={tableheading}
                                key={index}
                                customClassTableRow={customClassTableRow}
                                customClassTd={customClassTd}
                                id={item.requestId}
                                customClassLastTd={customClassLastTd}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
};
export default Table;
export const TableHead = ({ item, customClassTh, dataStatus }) => {
    return (
        <>
            <th className={[styles.tableHead, customClassTh].join(" ")}>
                {item.label}
            </th>
        </>
    );
};

export const TableRow = ({
    item,
    tableheading,
    customClassTableRow,
    customClassTd,
    customClassLastTd,
}) => {
    return (
        <>
            <tr className={[customClassTableRow, styles.tableRow].join(" ")}>
                {tableheading.map((thItem, index) => {
                    return (
                        <td
                            className={[styles.tableRowData, customClassTd].join(" ")}
                            key={index}
                        >
                            {item[thItem.value]}
                        </td>
                    );
                })}
            </tr>
        </>
    );
};
