import React from "react";
import styles from "./waltheader.module.scss";
import { useState, useEffect, useRef } from "react";
import DropDown from "../dropdown/DropDown";
import {
  Dollar,
  DropdownIcon2,
  MoreIcon,
} from "../../component/svg-components";
import FilledButton from "../filled-button/FilledButton";
import { tabledata } from "../../../src/data/data";
import AddFund from "../../pages/walt-capital-global/add-fund-popup/AddFund";
import Popup from "../popup/Popup";
import { useNavigate } from "react-router-dom";
import EditFund from "../../pages/walt-capital-global/active-deactivate-fund/edit-fund-modal/EditFund";
import DeleteFund from "../../pages/walt-capital-global/active-deactivate-fund/delete-fund-modal/DeleteFund";
import Menu from "../menu/Menu";
import { AddSquare, CloseRing, Edit } from "../svg-components";

const WaltHeader = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const ref2 = useRef();
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
  const tabledataName = tabledata.map((item) => item.name);

  const [addFundModal, setAddFundModal] = useState(false);
  const handleClose = () => {
    setAddFundModal(!addFundModal);
  };
  const handleOpen = () => {
    setAddFundModal(!addFundModal);
  };
  const handleView = () => {
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
    setEditFundModal(!editFundModal);
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
  const menuItems = [
    {
      icon: <AddSquare fillColor="#969BA0" />,
      title: (
        <span className={styles.item} onClick={() => handleView()}>
          Active / Deactivate Funds
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
  const [icon, setIcon] = useState("#0868AA");
  const changeIcon = () => {
    console.log("changeIcon");
    setIcon("#FFFFFF");
  };

  return (
    <div className={styles.waltHeaderMainContainer}>
      {editFundModal && (
        <Popup Children={EditFund} handleClose={() => handleEdit()} />
      )}
      {deleteFundModal && (
        <Popup Children={DeleteFund} handleClose={() => handleDelete()} />
      )}
      {addFundModal && (
        <Popup Children={AddFund} handleClose={() => handleClose()} />
      )}

      <div className={styles.waltHeaderContainer}>
        <div className={styles.waltHeaderContent} ref={ref}>
          <div
            className={styles.dropdownContainer}
            onClick={() => setClick((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainerItems}>
              <span className={styles.dropdownContent}>
                Walt Capital Global Fund
              </span>
              <span className={styles.dropdownIcon}>
                <DropdownIcon2 fillColor="#0868AA" />
              </span>
            </div>
            <div>
              {click ? (
                <DropDown
                  dropdownItems={tabledataName}
                  customClassForContent={styles.dropdownListContent}
                  customClassForItems={styles.dropdownListItems}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.buttonContent}>
          <FilledButton
            title="View"
            customClass={styles.viewButton}
            handleClick={() => {}}
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
          handleMouseLeave={() => setIcon("#0868AA")}
        />
        {menu && <Menu menuItems={menuItems} />}
      </div>
    </div>
  );
};

export default WaltHeader;
