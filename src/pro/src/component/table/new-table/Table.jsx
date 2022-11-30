import styles from "./table.module.scss";
import { useNavigate } from "react-router-dom";
import FilledButton from "../../filled-button/FilledButton";
import CheckBox from "../../check-box/CheckBox";
import { useState } from "react";
import ToggleSwitch from "../../toggle-switch/ToggleSwitch";
import { RightClick, Cross } from "../../svg-components";
// import buttonGroup1 from "../../../pages/reports/birthday-report/BirthdayReport";
import DatePicker from "react-datepicker";
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
  ButtonGroup,
  handleGoTo,
  // handleToggle,
}) => {
  // const navigate = useNavigate();

  // const handleGoTo = (id) => {
  //   id && navigate(`/clients/${id}`);
  // };
  const [toggle1, setToggle1] = useState(true);
  // const [toggle2, setToggle2] = useState(true);
  const [startDate, setStartDate] = useState(new Date());

  // const handleToggle = () => {
  //   setToggle1(false);
  // };
  // const handleOnToggle2 = () => {
  //   setToggle2(!toggle2);
  // };
  // const [isToggled, setisToggled] = useState(true);
  // const handleToggle = () => {
  //   setisToggled(!isToggled);
  // };

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
                {
                  /* console.log("heading>>>", item.label); */
                }
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
            {tabledata.map((item, index) => (
              <TableRow
                item={item}
                tableheading={tableheading}
                key={index}
                customClassTableRow={customClassTableRow}
                customClassTableRow1={customClassTableRow1}
                customClassTd={customClassTd}
                handleClick={() => handleGoTo(item)}
                // handleToggle={() => {
                //   handleOnToggle1();
                // }}
                // handleToggle={() => handleToggle()}
                id={item.id}
                customClassTd1={customClassTd1}
                ButtonGroup={ButtonGroup}
              // icon={<CheckBox ischecked={true} />}
              />
            ))}
            {tablefooter &&
              tablefooter.map((item1, index) => (
                <TableFooter
                  item={item1}
                  key={index}
                  customClassFooter={customClassFooter}
                  customClassFooterTd={customClassFooterTd}
                  tableheading={tableheading}
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
  ButtonGroup,
  tableheading,
  customClassTableRow,
  customClassTd,
  handleClick,
  id,
  toggle1,
  // handleToggle,
  // icon,
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
      onClick={() => handleClick(id)}
    >
      {tableheading.map((tableheadingitem, index) => {
        {
          /* console.log("item>>", item); */
        }

        {
          /* console.log(tabsleheading); */
        }
        {
          console.log(`${tableheadingitem.value}`);
        }
        console.log("item1>>>", item[`${tableheadingitem.value}`]);
        //   console.log("item2>>>", `${item}.${tableheadingitem.value}`);
        console.log("dashs", item[`${tableheadingitem.value}`] === "-");
        // console.log(ischecked);
        // console.log(item);
        // console.log(`${tableheadingitem.value}`);
        // console.log("item1>>>", item[`${tableheadingitem.value}`]);
        console.log(
          "dashboard >>>",
          `${tableheadingitem.value}` === "dashboard"
        );
        // console.log(`${tableheadingitem.value}` === "action");
        return (
          <td
            className={
              item[`${tableheadingitem.value}`] === "Fees ex vat" ||
                // (`${tableheadingitem.value}` === "status" &&
                //   item[`${tableheadingitem.value}`] === true) ||
                // ? `${tableheadingitem.value}` !== "-"
                //   ? item[`${tableheadingitem.value}`].slice(0, -1) < 0
                //   : null
                // : null)
                (`${tableheadingitem.color}` === "color" &&
                  // `${tableheadingitem.value}` !== "-" &&
                  item[`${tableheadingitem.value}`].slice(0, -1) < 0)
                ? // `${tableheadingitem.color}` === "color1"
                // `${tableheadingitem.value}` !== "-" &&
                // item[`${tableheadingitem.value}`].slice(0, -1) < 0)
                styles.colorRed
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
              // showYearDropdown
              />
            ) : (
              /* <FilledButton title="Calc" customClass={styles.buttonStyle} /> */

              item[`${tableheadingitem.value}`]
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
