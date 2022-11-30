import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Dollar,
  DropdownIcon2,
  MoreIcon
} from "../../component/svg-components";
import { danger, success } from "../../data/data";
import FactSheetFormPopup from "../../pages/factsheet-form-popup/FactSheetFormPopup";
import DeleteFund from "../../pages/walt-capital-global/active-deactivate-fund/delete-fund-modal/DeleteFund";
import AddFund from "../../pages/walt-capital-global/add-fund-popup/AddFund";
import {
  emptyErrors,
  emptyFundDetails,
  getFundById,
  setSelectedCurrFund
} from "../../redux/features/fundadministrator/addFunSlice";
import DropDown from "../dropdown/DropDown";
import FilledButton from "../filled-button/FilledButton";
import Menu from "../menu/Menu";
import Popup from "../popup/Popup";
import { AddSquare, CloseRing, Edit } from "../svg-components";
import Toast from "../toast/Toast";
import styles from "./waltheader.module.scss";
const WaltHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();
  const ref2 = useRef();
  const [click, setClick] = useState(false);
  const [icon, setIcon] = useState("#0868AA");
  const [addFundModal, setAddFundModal] = useState(false);
  const [currFund, setCurrFund] = useState("");
  const [factSheet, setFactSheet] = useState({ shown: false, id: "" });
  const { fundList, msg, error } = useSelector((state) => state.addFund);

  const handleClose = () => {
    setCurrFund(fundList[0]);
    dispatch(setSelectedCurrFund(fundList[0]));
    setAddFundModal(!addFundModal);
  };

  const handleOpen = () => {
    // empty the redux state also inmportant
    setCurrFund("");
    dispatch(emptyFundDetails());
    setAddFundModal(!addFundModal);
  };

  const handleView = () => {
    navigate("/fund-administration");
    setMenu(false);
  };
  const handleActivateDeactivate = () => {
    navigate("/fund-administration/activatedeactivatefund");
    setMenu(false);
  };
  const handleMenu = () => {
    setMenu(!menu);
  };
  const [menu, setMenu] = useState(false);
  const [editFundModal, setEditFundModal] = useState(false);
  const [deleteFundModal, setDeleteFundModal] = useState(false);

  const handleEdit = () => {
    setEditFundModal(!editFundModal);
  };

  const handleEditOpen = () => {
    currFund?.fundId && setEditFundModal(!editFundModal);
    setMenu(false);
  };

  const handleDelete = () => {
    setDeleteFundModal(!deleteFundModal);
  };

  const handleDeleteOpen = () => {
    setDeleteFundModal(!deleteFundModal);
    setMenu(false);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (menu && ref2.current && !ref2.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [menu]);

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

  const menuItems = [
    {
      icon: <AddSquare fillColor="#969BA0" />,
      title: (
        <span
          className={styles.item}
          onClick={() => handleActivateDeactivate()}
        >
          Activate / Deactivate Fund
        </span>
      ),
    },
    {
      icon: <Edit fillColor="#969BA0" height="15" width="20" />,
      title: (
        <span className={styles.item} onClick={() => handleEditOpen()}>
          Edit Fund
        </span>
      ),
    },
    {
      icon: <CloseRing fillColor="#969BA0" />,
      title: (
        <span className={styles.item} onClick={() => handleDeleteOpen()}>
          Delete Fund
        </span>
      ),
    },
  ];

  const changeIcon = () => {
    // console.log("changeIcon");
  };

  /* handeling edit fund in below use effect */
  useEffect(() => {
    currFund?.fundId && dispatch(getFundById({ fundId: currFund?.fundId }));
    setCurrFund(currFund);
    dispatch(setSelectedCurrFund(currFund));
  }, [currFund, editFundModal]);

  useEffect(() => {
    return () => dispatch(emptyErrors());
  }, []);

  useEffect(() => {
    // if (!currFund) {
    setCurrFund(fundList[0]);
    dispatch(setSelectedCurrFund(fundList[0]));
    // }
  }, [fundList]);

  // console.log(currFund, 'is curr fund')
  // console.log(fundList, 's fundlist')

  return (
    <div className={styles.waltHeaderMainContainer}>
      {editFundModal && currFund?.fundId && (
        <Popup
          Children={AddFund}
          popupData={{ currFund, setCurrFund, setFactSheet }}
          handleClose={() => handleEdit()}
        />
      )}
      {deleteFundModal && currFund?.fundId && (
        <Popup
          popupData={{ currFund, setCurrFund }}
          Children={DeleteFund}
          handleClose={() => handleDelete()}
        />
      )}
      {addFundModal && (
        <Popup
          Children={AddFund}
          popupData={{ currFund, setCurrFund, setFactSheet }}
          handleClose={() => handleClose()}
        />
      )}

      {factSheet.shown && (
        <Popup
          Children={FactSheetFormPopup}
          popupData={{ factSheet, setFactSheet }}
        />
      )}

      <div className={styles.waltHeaderContainer}>
        {msg || error ? (
          <Toast item={msg ? success : danger} message={msg ? msg : error} />
        ) : null}
        <div className={styles.waltHeaderContent} ref={ref}>
          <div
            className={styles.dropdownContainer}
            onClick={() => setClick((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainerItems}>
              <span className={styles.dropdownContent}>
                {currFund ? currFund?.fundName : "Select Fund"}
              </span>
              <span className={styles.dropdownIcon}>
                <DropdownIcon2 fillColor="#0868AA" />
              </span>
            </div>
            <div>
              {click && fundList.length > 0 ? (
                <DropDown
                  dropdownItems={fundList}
                  customClassForContent={styles.dropdownListContent}
                  customClassForItems={styles.dropdownListItems}
                  keyName={"fundName"}
                  setSelected={(item) => {
                    setCurrFund(item);
                    dispatch(setSelectedCurrFund(item));
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.buttonContent}>
          <FilledButton
            title="View"
            customClass={styles.viewButton}
            handleClick={() => {
              handleView();
            }}
          />
        </div>
      </div>
      <div className={styles.waltHeaderLeft} ref={ref2}>
        <FilledButton
          title="Create New Fund"
          customClass={styles.createNewFundButton}
          icon={<Dollar fillColor="#ffffff" height="18" width="12" />}
          iconCustomClass={styles.iconCustomClass}
          handleClick={() => handleOpen()}
        />
        <FilledButton
          title={<MoreIcon fillColor={icon} />}
          customClass={styles.moreIcon}
          handleClick={() => handleMenu()}
          handleMouseEnter={() => changeIcon()}
        // handleMouseLeave={() => setIcon("#0868AA")}
        />
        {menu && <Menu menuItems={menuItems} customClass={styles.menuItem} />}
      </div>
    </div>
  );
};

export default WaltHeader;
