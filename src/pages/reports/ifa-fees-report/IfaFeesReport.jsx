import styles from "./ifafeesreport.module.scss";
import { useNavigate } from "react-router-dom";
import Search from "../../../component/search/Search";
import FilledButton from "../../../component/filled-button/FilledButton";
import { AddClient } from "../../../component/svg-components";
import { IFAFeeReportHead, IFAFeeReportTableData } from "../../../data/data";
import { TableHeader, TableRow } from "../../../component/table/Table";
import AlphabeticFilter from "../../../component/alphabetic-filter/AlphabeticFilter";
import Table from "../../../component/table/new-table/Table";

const IfaFeesReport = () => {
  const navigate = useNavigate();
  const handleNewIFAs = () => {
    navigate("/ifas/addnewifas");
  };

  return (
    <>
      <div className={styles.ifaContainer}>
        <AlphabeticFilter title="IFAs" customClass={styles.abcFilter} />
        <div className={styles.searchFilterContainer}>
          <div className={styles.searchFilter}>
            <Search
              placeholder="Search IFAs"
              customClass={styles.search}
              inputCustomClass={styles.input}
            />
          </div>

          <div className={styles.filterContainer}>
            <div className={styles.totalAssets}>
              <p className={styles.totalAssetsText}>Total IFA Assets</p>
              <p className={styles.totalAssetsText1}>R 123,446,156.20</p>
            </div>
            <FilledButton
              title="Add New IFAs"
              customClass={styles.newIFAsButton}
              iconCustomClass={styles.iconClass}
              icon={<AddClient fillColor="#0868AA" />}
              handleClick={() => handleNewIFAs()}
            />
          </div>
        </div>
        <p className={styles.monthText}>Month : 31 March 2021</p>
        {/* <div className={styles.tableContainer}>
          <table className={styles.table} cellSpacing={0}>
            <thead>
              <TableHeader
                data={IFAFeeReportHead}
                customClass={styles.tableHead}
              />
            </thead>
            <tbody>
              {IFAFeeReportTableData.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    IFAFeeReportTableData={item}
                    key={index}
                    id={item.id}
                  />
                );
              })}
            </tbody>
          </table>
        </div> */}

        <Table
          tableheading={IFAFeeReportHead}
          tabledata={IFAFeeReportTableData}
          customClassTh={styles.customClassTh}
          customClassTd={styles.customClassTd}
        />
      </div>
    </>
  );
};

export default IfaFeesReport;
