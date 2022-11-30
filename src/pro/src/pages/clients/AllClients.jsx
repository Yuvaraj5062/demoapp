import styles from "./allclients.module.scss";
import { clientTableData, clientsTableHead, clientsTableHeadWithoutInvestmentValue } from "../../data/data";
import FilledButton from "../../component/filled-button/FilledButton";
import { AddClient, Cross, RightClick } from "../../component/svg-components";
import Pagination from "../../component/pagination/Pagination";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../component/search/Search";
import Dropdown from "../../component/dropdown/DropDown";
import ToggleSwitch from "../../component/toggle-switch/ToggleSwitch";

import AlphabeticFilter from "../../component/alphabetic-filter/AlphabeticFilter";
import Table from "../../component/table/new-table/Table";
const AllClients = () => {
  const [isToggled, setIsToggled] = useState(false);
  console.log(clientsTableHead[6].value);

  const handleOnToggle = () => {
    setIsToggled(!isToggled);
    // alert("kfjnvkfnj");
    // clientsTableHead[6].value === investment_value
    //   ? (customClassTd = `${styles.customClassTd}`)
    //   : null;
  };

  const [items, setItems] = useState(clientTableData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const clientNames = clientTableData.map((item) => item.name);
  let varible = Math.ceil(clientTableData.length / itemsPerPage);
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
  const handleNewClient = () => {
    navigate("/crm");
  };
  // const handleGoTo = (id) => {
  //   id && navigate(`/clients/${id}`);
  // };
  const handleGoTo = (data) => {
    console.log('called...??', data);
    data.id &&
      //navigate(`/clients/${id}` );
      navigate(`/clients/${data.id}`, {
        state: {
          id: data.id,
          name: data.name
        },
      });
  };
  useEffect(() => {
    setItems(clientTableData);
  }, []);

  const ref = useRef();
  const [click, setClick] = useState(false);

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

  // const handleGoTo = (id) => {
  //   id && navigate(`/clients/${id}`);
  // };
  return (
    <div className={styles.clientsContainer}>
      <AlphabeticFilter title="Clients" />
      <div className={styles.searchWrapper}>
        <Search
          customClass={styles.search}
          inputCustomClass={styles.input}
          placeholder="Search Clients"
        />
        <div className={styles.addNewClient}>
          <div className={styles.investmentValueContainer}>
            <div className={styles.investmentValue}>Investment Value</div>
            <ToggleSwitch
              handleToggle={() => {
                handleOnToggle();
              }}
              isToggled={isToggled}
            // leftIcon={<RightClick  fillColor='#ffffff'/>}
            // rightIcon={<Cross fillColor='#ffffff' />}
            />
          </div>
          <FilledButton
            title="Add New Client"
            customClass={styles.newClientButton}
            icon={<AddClient fillColor="#0868AA" />}
            handleClick={() => handleNewClient()}
          />
          {/* <div
            className={styles.dropdownContainer}
            ref={ref}
            onClick={() => setClick((prevState) => !prevState)}
          > */}
          {/* <div className={styles.dropdownContainerItems}>
              <Filter fillColor="#A5A5A5" />
              <span className={styles.dropdownContent}>Filter</span>
              <DropdownIcon2 fillColor="#D3D6E4" />
            </div> */}
          {/* <div>
              {click ? (
                <Dropdown
                  dropdownItems={clientNames}
                  customClassForContent={styles.dropdownListContent}
                />
              ) : null}
            </div>
          </div> */}
        </div>
      </div>
      <Table
        tableheading={
          isToggled
            ? clientsTableHead
            : clientsTableHeadWithoutInvestmentValue
        }
        tabledata={currentItems}
        isToggled={isToggled}
        handleGoTo={(id) => handleGoTo(id)}
      />
      {/* <table className={styles.table} cellSpacing={0}>
        <thead>
          <TableHeader
            data={clientsTableHead}
            customClass={styles.tableHead}
            isToggled={isToggled}
          />
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
            return (
              <TableRow
                customClass={styles.tableBodyRow}
                clientsdata={item}
                key={index}
                id={item.id}
                isToggled={isToggled}
              />
            );
          })}
        </tbody>
      </table> */}

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
  );
};
export default AllClients;
