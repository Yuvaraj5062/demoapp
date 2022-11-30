import moment from "moment/moment";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import CheckBox from "../../check-box/CheckBox";
import FilledButton from "../../filled-button/FilledButton";
import { Cross, DeleteIcon, EditBlack, RightClick } from "../../svg-components";
import ToggleSwitch from "../../toggle-switch/ToggleSwitch";
import styles from "./table.module.scss";
const Table = ({
  tableheading,
  tabledata,
  tablefooter,
  customClassTable,
  customClassTableContainer,
  customClassTableHead,
  customClassTh,
  customClassTableRow,
  customClassTableRow1,
  customClassTd,
  customClassTd1,
  customClassFooterTd,
  customClassFooter,
  isToggled,
  handleClick,
  handleAction,
  ButtonGroup,
  handleGoTo,
  tablefooterData,
  iconsCustomClass,
}) => {
  const [toggle1, setToggle1] = useState(true);
  const [startDate, setStartDate] = useState(new Date());

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
              {tableheading?.map((item, index) => {
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
          <tbody>
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
                iconsCustomClass={iconsCustomClass}
              />
            ))}

            {tablefooter &&
              tablefooter.map((item1, index) => {
                return (
                  <TableFooter
                    item={item1}
                    key={index}
                    tablefooterData={tablefooterData}
                    customClassFooter={customClassFooter}
                    customClassFooterTd={customClassFooterTd}
                    tableheading={tableheading}
                    tablefooter={tablefooter}
                  />
                );
              })}
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
  ButtonGroup,
  tableheading,
  customClassTableRow,
  customClassTd,
  handleClick,
  handleAction,
  id,
  toggle1,
  iconsCustomClass,
}) => {
  const [startDate, setstartDate] = useState(new Date());
  const [isToggled, setisToggled] = useState(true);
  const [isToggled1, setisToggled1] = useState(true);
  const handleToggle = () => {
    setisToggled(!isToggled);
  };
  const handleToggle1 = () => {
    setisToggled1(!isToggled1);
  };
  return (
    <tr
      className={[customClassTableRow, styles.tableRow].join(" ")}
      onClick={() => (handleClick ? handleClick(id) : {})}
    >
      {tableheading.map((tableheadingitem, index) => {
        return (
          <td
            className={
              item[`${tableheadingitem.value}`] === "Fees ex vat" ||
                (`${tableheadingitem.color}` === "color" &&
                  item[`${tableheadingitem.value}`].slice(0, -1) < 0)
                ? styles.colorRed
                : [styles.tableRowData, customClassTd].join(" ")
            }
            key={index}
          >
            {`${tableheadingitem.value}` === "login" ||
              `${tableheadingitem.value}` === "dashboard" ||
              `${tableheadingitem.value}` === "watchLists" ||
              `${tableheadingitem.value}` === "clients" ||
              `${tableheadingitem.value}` === "fund_administration" ||
              `${tableheadingitem.value}` === "crm" ||
              `${tableheadingitem.value}` === "ifas" ||
              `${tableheadingitem.value}` === "offshore" ||
              `${tableheadingitem.value}` === "reports" ||
              `${tableheadingitem.value}` === "maintenance_portal" ||
              `${tableheadingitem.value}` === "logout" ? (
              <CheckBox
                ischecked={item[`${tableheadingitem.value}`] ? true : false}
              />
            ) : `${tableheadingitem.value}` === "action" ? (
              ButtonGroup
            ) : `${tableheadingitem.value}` === "tradedone" ? (
              <ToggleSwitch
                leftIcon="R"
                rightIcon="M"
                isToggled={isToggled}
                handleToggle={() => handleToggle()}
              />
            ) : `${tableheadingitem.value}` === "inmarket" ? (
              <ToggleSwitch
                leftIcon={<RightClick fillColor="#ffffff" />}
                rightIcon={<Cross fillColor="#ffffff" />}
                isToggled={isToggled1}
                handleToggle={() => handleToggle1()}
              />
            ) : `${tableheadingitem.value}` === "calcButton" ? (
              <FilledButton title="Calc" customClass={styles.buttonStyle} />
            ) : `${tableheadingitem.value}` === "datePicker" ? (
              <DatePicker
                wrapperClassName={styles.datePicker}
                popperClassName={styles.datePick}
                selected={startDate}
                onChange={(date) => setstartDate(date)}
                dateFormat="yyyy-MM-dd"
                showMonthYearPicker
                showFourColumnMonthYearPicker
              />
            ) : `${tableheadingitem.showIcons}` &&
              `${tableheadingitem.label}` === "Action" ? (
              <span className={[styles.actionIcons, iconsCustomClass].join(' ')}>
                {
                  tableheadingitem.isEditable &&
                  <p onClick={(e) => {
                    e.stopPropagation();
                    handleAction({ type: "edit", info: item })
                  }
                  }>
                    <EditBlack
                      fillColor="#0F0F0F"
                      width="18"
                      height="18"

                    />
                  </p>
                }
                {item.isDeleteIcon ? <DeleteIcon
                  customClass={styles.deleteIcon}
                  fillColor="#FF2E2E"
                  handleClick={() =>
                    handleAction({ type: "delete", info: item })
                  }
                /> : tableheadingitem.isInfo ?
                  null
                  :
                  <DeleteIcon
                    customClass={styles.deleteIcon}
                    fillColor="#FF2E2E"
                    handleClick={() =>
                      handleAction({ type: "delete", info: item })
                    }
                  />
                }
                {/* {tableheadingitem.isInfo ?
                  null
                  :
                  <DeleteIcon
                    customClass={styles.deleteIcon}
                    fillColor="#FF2E2E"
                    handleClick={() =>
                      handleAction({ type: "delete", info: item })
                    }
                  />
                } */}
              </span>
            ) : tableheadingitem.date ? (
              moment(item[`${tableheadingitem.value}`]).format("DD/MM/YYYY")
            ) : tableheadingitem.bigInt ? (
              Number(item[`${tableheadingitem.value}`]).toLocaleString(
                "fullwide",
                { useGrouping: false }
              )
            ) : !tableheadingitem.isString ? (
              item[`${tableheadingitem.value}`] === ' ' ? "None" : item[`${tableheadingitem.value}`]
            ) : (
              String(item[`${tableheadingitem.value}`])
            )}
          </td>
        );
      })}
    </tr>
  );
};

const TableFooter = ({
  customClassFooter,
  customClassFooterTd,
  item,
  tableheading,
  tablefooterData,
  tablefooter,
}) => {
  const navigate = useNavigate();
  return (
    <tr className={[styles.tableFooter, customClassFooter].join(" ")}>
      {tableheading.map((tableheadingitem, index) => {
        return (
          <td
            className={[styles.footerTd, customClassFooterTd].join(" ")}
            key={index}
            colSpan={`${tableheadingitem.value}` === "pendingAmount" ? 4 : null}
          >
            {`${tableheadingitem.value}` === "pendingAmount" ? (
              <FilledButton
                title="Go to IFA Fee Breakdown Page"
                customClass={styles.ifaButton}
                handleClick={() => navigate("ifafeesbreakdown")}
              />
            ) : tablefooterData ? (
              tablefooterData?.[item[`${tableheadingitem.value}`]]
            ) : (
              item[`${tableheadingitem.value}`]
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
