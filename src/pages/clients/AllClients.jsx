import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlphabeticFilter from "../../component/alphabetic-filter/AlphabeticFilter";
import FilledButton from "../../component/filled-button/FilledButton";
import NoRecordFound from "../../component/notfound/NotFound";
import Pagination from "../../component/paginationTwo/pagination";
import Search from "../../component/search/Search";
import { AddClient } from "../../component/svg-components";
import Table from "../../component/table/new-table/Table";
import ToggleSwitch from "../../component/toggle-switch/ToggleSwitch";
import {
  clientsTableHead,
  clientsTableHeadWithoutInvestmentValue
} from "../../data/data";
import { fetchAllClients } from "../../redux/features/clients/clientSlice";
import styles from "./allclients.module.scss";

const AllClients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const { clients } = useSelector((state) => state.client);
  const itemsPerPage = 10;
  const lastPage = Math.ceil(clients?.totalCount / itemsPerPage);
  const ref = useRef();
  const [click, setClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [alphabet, setAlphabet] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };

  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };

  const handleNext = (item) => {
    currentPage < lastPage
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };

  const handleNewClient = () => {
    navigate("/crm");
  };

  const handleGoTo = (data) => {
    data.userId &&
      navigate(`/clients/profile`, {
        state: {
          id: data.userId,
          name: data.name,
        },
      });
  };

  /* pagination of count */
  const ofData = () => {
    if (clients?.totalCount < itemsPerPage) {
      return clients.totalCount;
    }
    if (clients?.clientList?.length < itemsPerPage) {
      if (clients?.totalCount > itemsPerPage) {
        return clients.totalCount % 10 === 0
          ? itemsPerPage * currentPage
          : itemsPerPage * currentPage - (10 - (clients.totalCount % 10));
      }
      return clients?.clientList.length;
    }

    return itemsPerPage * currentPage;
  };

  //
  const handleActionNavigat = (item) => {
    if (item?.type === "edit") {
      item?.info?.userId &&
        navigate(`/crm`, {
          state: {
            userId: item?.info?.userId,
            name: item?.info?.name,
          },
        });
    }
  };

  const getAllClients = (page, letter, search) => {
    dispatch(
      fetchAllClients({
        pageNumber: page || 1,
        pageSize: 10,
        orderby: false,
        alphabet: letter || "",
        searchString: search || "",
      })
    );
  };

  useEffect(() => {
    setCurrentPage(1);
    alphabet && getAllClients(currentPage, alphabet, searchString);
  }, [alphabet]);

  useEffect(() => {
    searchString?.trim() && getAllClients(currentPage, alphabet, searchString);
  }, [searchString]);

  useEffect(() => {
    getAllClients(currentPage, alphabet, searchString);
  }, [currentPage]);

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
    <div className={styles.clientsContainer}>
      <AlphabeticFilter
        title="Clients"
        alphabet={alphabet}
        setAlphabet={setAlphabet}
        handleAll={getAllClients}
        setSearchString={setSearchString}
      />
      <div className={styles.searchWrapper}>
        <Search
          customClass={styles.search}
          inputCustomClass={styles.input}
          placeholder="Search Clients"
          searchString={searchString}
          setSearchString={setSearchString}
        />

        <div className={styles.addNewClient}>
          <div className={styles.investmentValueContainer}>
            <div className={styles.investmentValue}>Investment Value</div>
            <ToggleSwitch
              handleToggle={() => {}}
              isToggled={isToggled}
              setIsToggled={setIsToggled}
            />
          </div>

          <FilledButton
            title="Add New Client"
            customClass={styles.newClientButton}
            icon={<AddClient fillColor="#0868AA" />}
            handleClick={() => handleNewClient()}
          />
        </div>
      </div>

      {clients?.totalCount >= 1 && clients?.clientList.length > 0 ? (
        <Table
          tableheading={
            isToggled
              ? clientsTableHead
              : clientsTableHeadWithoutInvestmentValue
          }
          tabledata={clients?.clientList}
          isToggled={isToggled}
          handleGoTo={(id) => handleGoTo(id)}
          handleAction={(item) => handleActionNavigat(item)}
        />
      ) : (
        <NoRecordFound />
      )}

      {clients?.totalCount >= 1 && clients?.clientList.length > 0 && (
        <div className={styles.paginationContainer}>
          <div>
            Showing {ofData()} {""} of {clients?.totalCount} data
          </div>

          <Pagination
            handlePaginate={(item) => handlePaginate(item)}
            currentPage={currentPage}
            handlePrevious={() => handlePrevious()}
            handleNext={() => handleNext()}
            totalPages={lastPage}
          />
        </div>
      )}
    </div>
  );
};
export default AllClients;
