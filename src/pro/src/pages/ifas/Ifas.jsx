import styles from "./ifas.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Search from "../../component/search/Search";
import FilledButton from "../../component/filled-button/FilledButton";
import { AddClient } from "../../component/svg-components";
import { IFAsTableHead, IFAsTableData } from "../../data/data";
import { TableHeader, TableRow } from "../../component/table/Table";
import AlphabeticFilter from "../../component/alphabetic-filter/AlphabeticFilter";
import Pagination from "../../component/pagination/Pagination";
import Table from "../../component/table/new-table/Table";

const Ifa = () => {
  const clientNames = IFAsTableData.map((item) => item.name);
  const ref = useRef();
  const [click, setClick] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState(IFAsTableData);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  let varible = Math.ceil(IFAsTableData.length / itemsPerPage);
  useEffect(() => {
    setItems(IFAsTableData);
  }, []);

  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };
  const handleNext = () => {
    // setCurrentPage(currentPage + 1);
    currentPage !== varible
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };

  const navigate = useNavigate();
  const handleNewIFAs = () => {
    navigate("/ifas/addnewifas");
  };
  // const handleGoTo = (id) => {
  //   id && navigate(`/ifas/${id}`);
  // };
  const handleGoTo = (data) => {
    data.id &&
      //navigate(`/clients/${id}` );
      navigate(`/ifas/${data.id}`, {
        state: {
          id: data.id,
          name: data.name
        },
      });
  };
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click && ref.current && !ref.current.contains(e.target)) {
        setClick(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click]);

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
        {/* <div className={styles.tableContainer}>
          <table className={styles.table} cellSpacing={0}>
            <thead>
              <TableHeader
                data={IFAsTableHead}
                customClass={styles.tableHead}
              />
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                return (
                  <TableRow
                    customClass={styles.tableBodyRow}
                    ifasData={item}
                    key={index}
                    id={item.id}
                  />
                );
              })}
            </tbody>
          </table>
        </div> */}
        <Table
          tableheading={IFAsTableHead}
          tabledata={currentItems}
          customClassTh={styles.customClassTh}
          customClassTd={styles.customClassTd}
          handleGoTo={(id) => handleGoTo(id)}
        />
        <div className={styles.paginationContainer}>
          <div>
            Showing {currentItems.length} from {items.length} data
          </div>
          <Pagination
            data={items}
            itemsPerPage={itemsPerPage}
            handlePaginate={(item) => handlePaginate(item)}
            active={currentPage}
            handlePrevious={() => handlePrevious()}
            handleNext={() => handleNext()}
          />
        </div>
      </div>
    </>
  );
};

export default Ifa;
