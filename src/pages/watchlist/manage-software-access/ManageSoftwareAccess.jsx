import FilledButton from "../../../component/filled-button/FilledButton";
import Search from "../../../component/search/Search";
import styles from "./managesoftwareaccess.module.scss";
import {
  AddGroupIcon,
  DeleteIcon,
  DropdownIcon2,
} from "../../../component/svg-components";
import { useCallback, useState } from "react";
import Divider from "../../../component/divider/Divider";
import Popup from "../../../component/popup/Popup";
import GroupDeletePopup from "../software-accessgroup-delete-popup/GroupDeletePopup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "../../../hooks/useSearch";
import {
  addErrorMsgs,
  addNewGroup,
  deleteExistingGroup,
  emptyListOfAccessCategory,
  emptyMsgs,
  getAllGroup,
  getAllPrivileges,
  getListOfAccessCategory,
  subParentPrivileges,
  updateGroupPrivileges,
} from "../../../redux/features/watchlist/watchListSlice";
import Toast from "../../../component/toast/Toast";
import { danger, success } from "../../../data/data";
const RecursiveComponent = ({
  id,
  accessCategory,
  allPrivileges,
  isSelected,
  parentId,
  expandOnLoad,
  type,
}) => {
  const [showChildren, setShowChildren] = useState(false);
  const [expand, setExpand] = useState(expandOnLoad);
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    setShowChildren(!showChildren);
    setExpand(!expand);
  }, [showChildren, setShowChildren]);
  /* 
  dyanamically showin privillege based on children click 
  */

  const handleEdit = (id, e, parentId) => {
    dispatch(
      subParentPrivileges({ id, isChecked: e.target.checked, parentId, type })
    );
  };

  let design = "";
  if (type === "parent") {
    design = styles.accessCategoryTextBold;
  }
  if (type === "subParent") {
    design = styles.accessCategoryTextSemibold;
  }
  if (type === "child") {
    design = styles.accessCategoryTextNormal;
  }

  return (
    <>
      <div className={styles.recuesiveMainContainer} onClick={handleClick}>
        <div className={styles.recursiveLeftContainer}>
          <input
            type="checkbox"
            onChange={(e) => handleEdit(id, e, parentId)}
            // checked={
            //   (allPrivileges.length >= 1 && isSelected) ||
            //   (type === "child" && isSelected) ||
            //   false
            // }
            checked={isSelected}
            className={styles.checkbox}
            onClick={(e) => e.stopPropagation()}
          ></input>
          {/* <span className={styles.accessCategoryText}>{accessCategory}</span> */}

          <span className={design}>{accessCategory}</span>
        </div>
        {allPrivileges.length > 0 && (
          <DropdownIcon2
            fillColor="#969BA0"
            width={15}
            height={12}
            customClass={showChildren ? styles.dropdownUp : styles.dropdownDown}
          />
        )}
      </div>

      {(showChildren || expandOnLoad) &&
        Array.isArray(allPrivileges) &&
        allPrivileges.map((node, index) => {
          return <div key={index}>{<RecursiveComponent {...node} />}</div>;
        })}
    </>
  );
};

const ManageSoftwareAccess = () => {
  const dispatch = useDispatch();
  const { allGroups, allPrivileges } = useSelector((state) => state.watchlist);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [group, setGroup] = useState(null);
  const { newData } = useSearch(allGroups, searchTerm);
  const { userInfo } = useSelector((state) => state.login);
  const { accessCategoryList, msg, error } = useSelector(
    (state) => state.watchlist
  );
  const popupData = { group, setGroup };

  const handleClose = () => {
    setShowPopup(!showPopup);
  };

  const handleOpen = (item) => {
    setShowPopup(!showPopup);
    setGroup(item);
  };

  const handleGroupClick = (item) => {
    const { id } = item;
    setGroup(item);
    dispatch(
      getAllPrivileges({
        typeId: 3,
        groupId: id,
      })
    ).then(() => dispatch(getListOfAccessCategory()));
  };

  const handleAddGroup = () => {
    userInfo?.userDetail?.id &&
      searchTerm?.trim() &&
      dispatch(
        addNewGroup({
          accessCategory: searchTerm,
          parentId: 0, //fix
          typeId: 2, // fix
          createdBy: userInfo?.userDetail?.id, // user loggedin id
        })
      ).then(() => setGroup(null));

    setSearchTerm("");
    setShowPopup(null);
  };

  const handleGroupDelete = () => {
    dispatch(deleteExistingGroup({ id: group.id }));
    setGroup(null);
    handleClose();
  };

  const handlePrivilegesUpdate = () => {
    if (!group) {
      dispatch(addErrorMsgs("Please select group!"));
      setTimeout(() => {
        dispatch(emptyMsgs());
      }, [3000]);
    }

    group?.id &&
      userInfo &&
      dispatch(
        updateGroupPrivileges({
          groupId: group?.id,
          updatedBy: userInfo?.userDetail?.id,
        })
      ).then(() => dispatch(getListOfAccessCategory()));
  };

  useEffect(() => {
    return () => dispatch(emptyMsgs());
  }, []);

  useEffect(() => {
    dispatch(getAllGroup({ typeId: 2 }));
    dispatch(
      getAllPrivileges({
        typeId: 3,
        groupId: 0,
      })
    );

    return () => dispatch(emptyListOfAccessCategory());
  }, []);


  return (
    <>
      <div className={styles.mainContainer}>
        {msg || error ? (
          <Toast item={msg ? success : danger} message={msg ? msg : error} />
        ) : null}
        {showPopup && (
          <Popup
            Children={GroupDeletePopup}
            handleClose={handleClose}
            handleDelete={handleGroupDelete}
            msg={`you are about to delete a user group.
            This will delete ${group?.accessCategory}.`}
          />
        )}
        <div className={styles.cardMainContainer}>
          <div className={styles.cardData1}>
            <span className={styles.registerText}>
              Registered Software Access Groups
            </span>
            <div className={styles.groupContainer}>
              <Search
                customClass={styles.search}
                inputCustomClass={styles.input}
                placeholder="Access Group's Name"
                searchString={searchTerm}
                setSearchString={setSearchTerm}
                // onChange={(e) => {
                //   setSearchTerm(e.target.value);
                // }}
              />
              <span>
                <AddGroupIcon
                  handleClick={() => handleAddGroup()}
                  customClass={styles.addGroupIcon}
                />
              </span>
            </div>
            <div className={styles.searchContainer}>
              {newData?.map((item, index) => {
                return (
                  <div
                    className={styles.searchData}
                    key={index}
                    onClick={() => {
                      handleGroupClick(item);
                    }}
                  >
                    <p
                      className={
                        group?.id === item.id
                          ? [styles.searchClick]
                          : [styles.searchTitle]
                      }
                      // onClick={() => {
                      //   handleGroupClick(item);
                      // }}
                    >
                      {item.accessCategory}
                    </p>
                    {group?.id === item.id && (
                      <span className={styles.deleteContainer}>
                        <DeleteIcon
                          customClass={styles.deleteIcon}
                          handleClick={() => handleOpen(item)}
                        />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.cardData2}>
            <span className={styles.registerText}>
              Manage the Privileges Associated with the Selected User Group
            </span>

            {/*start recursive component implementain  */}
            <div className={styles.checkBoxMainContainer}>
              {allPrivileges &&
                allPrivileges.map((allPre, index) => {
                  return (
                    <div key={index}>
                      <RecursiveComponent {...allPre} />
                      <Divider customClass={styles.divider} />
                    </div>
                  );
                })}
            </div>
            {/*  end recursive component implementain  */}
            <div className={styles.updateButtonContainer}>
              <FilledButton
                handleClick={() => handlePrivilegesUpdate()}
                title="Update"
                customClass={styles.updateButton}
              />
            </div>
          </div>

          <div className={styles.cardData3}>
            <span className={styles.registerText}>
              Software Privileges Associated with the Selected Software Access
              Group
            </span>
            {accessCategoryList.map((e, index) => {
              return (
                <p key={index} className={styles.selectedGroup}>
                  {e}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageSoftwareAccess;
