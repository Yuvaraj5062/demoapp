import styles from "./tablev2.module.scss";
export const TableHeading = ({
  data,
  colSpan,
  colSpan2,
  statisticsData,
  customClass,
  titleCustomClass,
  valueCustomClass,
  dataCustomClass,
}) => {
  if (data) {
    return (
      <th
        className={[styles.tableContent, dataCustomClass].join(" ")}
        colSpan={colSpan}
      >
        {data}
      </th>
    );
  } else if (statisticsData) {
    return (
      <>
        <tr className={customClass}>
          <th className={titleCustomClass} colSpan={colSpan}>
            {statisticsData.title}
          </th>
          <th className={valueCustomClass} colSpan={colSpan2}>
            {statisticsData.value}
          </th>
        </tr>
      </>
    );
  }
};

export const TableRow = ({
  customClass,
  data,
  returnsData,
  allocationData,
  tdCustomClass,
  statisticsData,
  tdCustomClass2,
}) => {
  if (data) {
    return (
      <td className={[styles.tableContent, customClass].join(" ")}>{data}</td>
    );
  } else if (returnsData)
    return (
      <tr className={customClass}>
        <td className={[styles.duration, tdCustomClass].join(" ")}>
          {returnsData.title}
        </td>
        <td className={[styles.value, tdCustomClass].join(" ")}>
          {" "}
          <span className={tdCustomClass2}>{returnsData.value}</span>{" "}
        </td>
      </tr>
    );
  else if (statisticsData)
    return (
      <tr className={customClass}>
        <td className={tdCustomClass}>{statisticsData.performer}</td>
        <td className={tdCustomClass}>{statisticsData.value}</td>
        <td className={tdCustomClass}>{statisticsData.ctr}</td>
      </tr>
    );
  else if (allocationData)
    return (
      <tr className={customClass}>
        <td className={tdCustomClass}>{allocationData.cash}</td>
        <td className={tdCustomClass}>{allocationData.long}</td>
        <td className={tdCustomClass}>{allocationData.per}</td>
      </tr>
    );
};
