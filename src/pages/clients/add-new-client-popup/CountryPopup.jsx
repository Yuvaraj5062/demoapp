import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "../../../component/delete-popup/DeletePopup";
import Divider from "../../../component/divider/Divider";
import FilledButton from "../../../component/filled-button/FilledButton";
import Popup from "../../../component/popup/Popup";
import RadioButton from "../../../component/radio-button/RadioButton";
import { Cross, DeleteIcon, EditIcon } from "../../../component/svg-components";
import TextField from "../../../component/text-field/TextField";
import Toast from "../../../component/toast/Toast";
import { danger } from "../../../data/data";
import useForm from "../../../hooks/useForm";
import {
  addNewCity,
  addNewCountry,
  addNewOffice,
  addNewState,
  deleteCity,
  deleteCountry,
  deleteOffice,
  deleteState,
  updateCity,
  updateCountry,
  updateOffice,
  updateState
} from "../../../redux/features/crm/crmSlice";
import styles from "./countrypopup.module.scss";

const CountryPopup = ({ handleClose, setPopupData, msg, id }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const [officeId, setOfficeId] = useState();
  const [editId, setEditId] = useState();
  const [deletepopup, setDeletePopup] = useState(false);
  const [slectedState, setSlectedState] = useState({ id: "", key: "" });
  const [slectedArray, setSlectedArray] = useState([]);
  const [buttonText, setButtonText] = useState("Save");
  const [showToast, setShowToast] = useState(true);
  const [officeError, setOfficeError] = useState(false);

  const { officeDropdownData, cityDetail, selId } = useSelector(
    (state) => state.crm
  );
  const {
    countryDropdownData,
    stateDropdownData,
    cityDropdownData,
    countryDetail,
    stateDetail,
  } = useSelector((state) => state.common);
  const { handleChange, handleSubmit, data, errors, setData } = useForm({
    onSubmit: () => handleSubmitForm(data),
  });
  const handleClosePopup = () => {
    setDeletePopup(false);
  };
  const handleOpen = (item) => {
    setEditId(item[slectedState.id]);
    //  if (id?.toString() !== item[slectedState.id]?.toString()) {
    setDeletePopup(true);
    // }
    // else {
    //   setOfficeError(true)
    //   setTimeout(() => {
    //     setOfficeError(false)
    //   }, 2000);
    // }
  };

  const handleSubmitForm = (data) => {
    handleClose();
    let payload;
    if (data.officeName) {
      if (msg === "Country") {
        if (editId) {
          payload = {
            countryId: editId ? Number(editId) : 0,
            countryName: data.officeName,
            updatedBy: userInfo.userDetail.id,
          };
          dispatch(updateCountry(payload));
        } else {
          if (data.officeName) {
            payload = {
              countryName: data.officeName,
              createdBy: userInfo.userDetail.id,
            };
            dispatch(addNewCountry(payload));
            setTimeout(() => {
              setPopupData({ type: msg, data: 0 });
            }, [1000]);
            // setPopupData({type:msg,data:''})
          }
        }
      } else if (msg === "Province") {
        if (editId) {
          payload = {
            stateId: editId ? Number(editId) : 0,
            countryId: countryDetail?.countryId,
            stateName: data.officeName,
            updatedBy: userInfo.userDetail.id,
          };
          dispatch(updateState(payload));
        } else {
          payload = {
            countryId: countryDetail?.countryId,
            stateName: data.officeName,
            createdBy: userInfo.userDetail.id,
          };
          dispatch(addNewState(payload));
          setTimeout(() => {
            setPopupData({ type: msg, data: 0 });
          }, [1000]);
          // setPopupData({type:msg,data:(Number(slectedArray[slectedArray.length - 1][slectedState.id]) + 1)})
          handleClose();
        }
      } else if (msg === "City") {
        if (editId) {
          payload = {
            stateId: stateDetail?.stateId,
            cityId: editId ? Number(editId) : 0,
            cityName: data.officeName,
            createdBy: userInfo.userDetail.id,
          };
          dispatch(updateCity(payload));
        } else {
          payload = {
            stateId: stateDetail?.stateId,
            cityName: data.officeName,
            createdBy: userInfo.userDetail.id,
          };
          dispatch(addNewCity(payload));
          setTimeout(() => {
            setPopupData({ type: msg, data: 0 });
          }, [1000]);

          // setPopupData({type:msg,data:(Number(slectedArray[slectedArray.length - 1][slectedState.id]) + 1)})
          handleClose();
        }
      } else if (msg === "Offices") {
        payload = {
          id: editId ? Number(editId) : 0,
          office: data.officeName,
          cityId: cityDetail?.cityId,
          userId: userInfo.userDetail.id,
        };
        if (editId) {
          dispatch(updateOffice(payload));
        } else {
          dispatch(addNewOffice(payload));
          setTimeout(() => {
            setPopupData({ type: msg, data: 0 });
          }, [1000]);
          //  setPopupData({type:msg,data:(Number(slectedArray[slectedArray.length - 1][slectedState.id]) + 1)})
        }
      }
      setEditId("");
    }
  };
  useEffect(() => {
    if (msg === "Country") {
      setSlectedState({ id: "countryId", key: "countryName" });
      setSlectedArray(countryDropdownData);
      setData({ selectedOffice: selId, selectedName: "" });
    } else if (msg === "Province") {
      setSlectedState({ id: "stateId", key: "stateName" });
      setSlectedArray(stateDropdownData);
      setData({
        selectedOffice: selId,
        selectedName: countryDetail?.countryName,
      });
    } else if (msg === "City") {
      setSlectedState({ id: "cityId", key: "cityName" });
      setSlectedArray(cityDropdownData);
      setData({ selectedOffice: selId, selectedName: stateDetail?.stateName });
    } else {
      // setOfficeId(popupData)
      setData({ selectedOffice: selId, selectedName: cityDetail?.cityName });
      setSlectedState({ id: "officeId", key: "officeName" });
      setSlectedArray(officeDropdownData);
    }
  }, []);

  const handleDelete = () => {
    let payload;
    if (msg === "Country") {
      payload = { id: Number(editId) };
      dispatch(deleteCountry(payload)).then((res) => {
        if (res.payload?.statusCode === 200) {
          setPopupData({
            type: "Country",
            data:
              data.selectedOffice === editId
                ? data.selectedOffice === editId
                : selId,
          });
        }
        // else {
        //   setPopupData({ type: "Country", data: selId });
        // }
      });
    } else if (msg === "Province") {
      payload = {
        id: Number(editId),
        countryId: countryDetail?.countryId,
      };
      setPopupData({ type: "Province", data: "" });
      dispatch(deleteState(payload)).then((res) => {
        if (res.payload?.statusCode === 200) {
          setPopupData({
            type: "Province",
            data:
              data.selectedOffice === editId
                ? data.selectedOffice === editId
                : selId,
          });
        } else {
          setPopupData({ type: "Province", data: selId });
        }
      });
    } else if (msg === "City") {
      payload = {
        cityId: Number(editId),
        stateId: stateDetail?.stateId,
      };
      dispatch(deleteCity(payload)).then((res) => {
        if (res.payload?.statusCode === 200) {
          setPopupData({
            type: "City",
            data:
              data.selectedOffice === editId
                ? data.selectedOffice === editId
                : selId,
          });
        } else {
          setPopupData({ type: "City", data: selId });
        }
      });
    } else {
      payload = {
        id: Number(editId),
        userId: userInfo.userDetail.id,
        cityId: cityDetail.cityId,
      };
      setPopupData({ type: "Offices", data: data.selectedOffice === editId });
      dispatch(deleteOffice(payload));
    }

    handleClosePopup();
    handleClose();
  };
  const handleAction = (item) => {
    setButtonText("Update");
    data.officeName = item[slectedState.key];
    data.selectedOffice = item[slectedState.id];
    setEditId(item[slectedState.id]);
  };
  useEffect(() => {
    if (data.selectedOffice !== undefined) {
      setOfficeId(null);
      setPopupData({ type: msg, data: data.selectedOffice });
    }
  }, [data.selectedOffice]);

  return (
    <>
      <div
        className={styles.mainContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* {officeError ? (
          <Toast
            item={danger}
            show={showToast}
            setShow={setShowToast}
            message={"Unable to delete selected  office "}
          />
        ) : null} */}

        {deletepopup && (
          <Popup
            Children={DeletePopup}
            handleClose={() => handleClosePopup()}
            handleDelete={handleDelete}
            // msg="Are you sure you want to delete ?"
            msg={`Are you sure you want to delete ${msg} ?`}
          />
        )}

        <div className={styles.modalTitle}>
          Manage {msg}
          <span className={styles.crossIcon}>
            <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
          </span>
        </div>
        <div className={styles.tableContent}>
          <span className={styles.cityName}>{data.selectedName}</span>
          <TextField
            customClassContainer={styles.textfieldContainer}
            label={`Add New ${msg}`}
            customClass={styles.labelName}
            customClassInput={styles.datainputfield}
            value={data.officeName ? data.officeName : ""}
            handleChange={handleChange("officeName")}
            error={errors.officeName}
          />
          <Divider customClass={styles.divider} />
          <div className={styles.mainTable}>
            {slectedArray.length > 0 &&
              slectedArray.map((item, index) => {
                return (
                  <>
                    <div
                      className={styles.tabelRow}
                      key={`${item[slectedState.id]}`}
                    >
                      <RadioButton
                        name="selectedOffice"
                        value={data.selectedOffice ? data.selectedOffice : ""}
                        id={`${item[slectedState.id]}`}
                        checked={
                          Number(data.selectedOffice) === item[slectedState.id]
                            ? true
                            : item[slectedState.id] === Number(officeId)
                              ? true
                              : false
                        }
                        label={`${item[slectedState.key]}`}
                        radioLabelClass={styles.radioButtonText}
                        handleChange={handleChange("selectedOffice")}
                        customClassError={styles.errorText}
                      />
                      <div className={styles.iconContainer}>
                        <EditIcon
                          fillColor="#0B6AAB"
                          width="18"
                          height="18"
                          handleClick={() => handleAction(item)}
                        />
                        <DeleteIcon

                          customClass={styles.deleteIcon}
                          handleClick={() =>
                            //  handleDelete(item.officeId)
                            handleOpen(item)
                          }
                        />
                      </div>
                    </div>
                    <Divider customClass={styles.divider2} />
                  </>
                );
              })}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <FilledButton
            disabled={data.officeName || data.selectedOffice ? false : true}
            title={buttonText}
            customClass={styles.saveButton}
            handleClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </div>
    </>
  );
};
export default CountryPopup;
