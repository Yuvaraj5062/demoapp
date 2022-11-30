import styles from "./addnewifas.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import TextField from "../../../component/text-field/TextField";
import Divider from "../../../component/divider/Divider";
import profileImage from "../../../assets/images/profileImage.png";
import {
  Upload,
  Paper,
  InfoIcon,
  FlagIcon,
  StateIcon,
  CityIcon,
  ManageOfficeIcon,
  ViewFileIcon,
} from "../../../component/svg-components";
import { colors } from "../../../constants/Colors";
import UploadFile from "../../../component/upload-file/UploadFile";
import { useLocation, useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { ifaFormValidation } from "../../../formValidators/ifaFormValidation";
import RadioButton from "../../../component/radio-button/RadioButton";
import { useState } from "react";
import Popup from "../../../component/popup/Popup";
import UploadProfilePhoto from "../../../component/modal/upload-Profile-Photo/UploadProfilePhoto";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "../../../component/delete-popup/DeletePopup";
import {
  createNewIfa,
  uploadDocs,
  clearIfsState,
  getIfaByIfaId,
  updateIfasPhase1,
  ifaAccNumber,
  clearAllDocs,
  getRoles,
  getSoftAccessGroup,
} from "../../../redux/features/ifa/ifaSlice";

import {
  clearCityDetail,
  clearState,
  officeDropdown,
  selectedId,
} from "../../../redux/features/crm/crmSlice";
import {
  cityDropdown,
  clearStateDetail,
  countryDropdown,
  stateDropdown,
} from "../../../redux/features/common/commonSlice";

import Tooltip from "../../../component/tooltip/Tooltip";
import moment from "moment";
import IconContainer from "../../../component/icon-container/IconContainer";
import { useRef } from "react";
import CountryPopup from "../../clients/add-new-client-popup/CountryPopup";
import Toast from "../../../component/toast/Toast";
import { danger, ResponsiblePersonTitles, success } from "../../../data/data";
import { getBase64 } from "../../../utils/utils";
import IfaDocumentList from "../ifa-documents/IfaDocumentList";
import useScroll from '../../../hooks/useScroll'
import useReference from "../../../hooks/useReference";

const AddNewIFAs = () => {
  const [executeScroll, elRef] = useScroll();
  const [image, setImage] = useState(null);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [showNumber, setShowNumber] = useState(false);
  const [showNumber1, setShowNumber1] = useState(false);
  const [isDueDiligence, setIsDueDeligiance] = useState(false);
  const [isAML, setIsAML] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const ref = useReference()
  const [updateId, setUpdateId] = useState();
  const [viewDocs, setViewDocs] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);
  const [updatedOffice, setUpdatedOffice] = useState({ type: "", data: "" });
  const [officePopup, setOfficePopup] = useState(false);
  const [slectedState, setSlectedState] = useState({ name: "", type: "" });
  const [showToast, setShowToast] = useState(true);

  const navigate = useNavigate();



  const location = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const {
    docs,
    loading,
    ifaStatus,
    ifaError,
    ifaByIdData,
    ifaId,
    softAccessGroupList,
    roleList } =
    useSelector((state) => state.ifa);

  const { status, error, officeDropdownData, selId, isDeleted } = useSelector(
    (state) => state.crm
  );

  const { countryDropdownData, stateDropdownData, cityDropdownData } =
    useSelector((state) => state.common);


  const handleSubmitForm = (data) => {
    let payload = {
      ...data,
      country: data.countryId?.toString(),
      city: data.cityId?.toString(),
      province: data.stateId?.toString(),
      office: data.officeId?.toString(),
      profilePhoto: image,
      ifaDocuments: docs,
      createdBy: userInfo?.userDetail?.id,
      isDueDiligence: isDueDiligence,
      isAml: isAML,
      updatedBy: userInfo?.userDetail?.id,
      ifaPractice: data?.clientAccNo,
      responsiblePerson: data?.responsiblePersonTitle,
      responsiblePersonTitle: data?.title,
      firstName: data?.firstName,
      surname: data?.lastName,
      positionHeld: data?.positionHeld,
      dob: data?.dob,
      companyName: data?.companyName,
      compRegNumber: data?.compRegNumber,
      sarstaxNo: data?.sarstaxNo,
      vatno: data?.vatno,
      buildingName: data?.buildingName,
      floorandOfficeNo: data?.floorandOfficeNo,
      streetName: data.streetName,
      suburb: data?.suburb,
      postalCode: data?.postalCode,
      isFscaactive: data?.isFscaactive === "true" ? true : false,
      lastDateChecked: data?.lastDateChecked,
      personChecked: "string",
      waltCapConsultant: 0,
      fsca: data?.registrationNo,
      mobileNo: data?.mobileNo,
      workNo: data?.workNo,
      email: data?.email,
      notes: data?.notes,
      softwareAccessGroup: data?.accessCategory,
      role: data?.role,
    
    };
    if (location.state?.id) {
      dispatch(clearIfsState());
      const updateIfaPayload = { ...payload, id: location.state?.id };
      dispatch(updateIfasPhase1(updateIfaPayload)).then((e) => {
        if (e.type === "ifa/updateIfasPhase1/fulfilled") {
          dispatch(clearIfsState());
          dispatch(clearAllDocs())
          navigate("/ifas/addnewifas/addnewifaspersonaldata", {
            state: {
              id: e?.payload?.data?.id,
              ifaId: location.state?.id,
            },
          });
        }
      });
    } else {
      dispatch(createNewIfa(payload)).then((e) => {
        if (e.type === "ifa/createNewIfa/fulfilled") {
          dispatch(clearIfsState());
          dispatch(clearAllDocs())
          navigate("/ifas/addnewifas/addnewifaspersonaldata", {
            state: {
              id: e?.payload?.data?.id,
              ifaId: location.state?.id,
            },
          });
        }
        setTimeout(() => {
          dispatch(clearIfsState());
        }, 2000);
      });
    }
  };

  const handelClearForm = () => {
    setData([]);
    setIsAML(false);
    setIsDueDeligiance(false);
    dispatch(clearIfsState());
    setImage("");
    dispatch(clearAllDocs())
    setErrors({})
  };

  useEffect(() => {
    file &&
      getBase64(file).then((result) => {
        file["base64"] = result;
        dispatch(uploadDocs({ file: result, fileName: file?.name }));
      });
  }, [file]);

  const { handleChange, handleSubmit, data, errors, setErrors, setData, disable } =
    useForm({
      ref: ref,
      intialDisable: {
        stateId: true,
        cityId: true,
        officeId: true,
        isFscaactive: true,
      },
      validations: ifaFormValidation,
      isSubmit: isSubmit,
      setIsSubmit: setIsSubmit,
      onSubmit: () => handleSubmitForm(data),
    });

  useEffect(() => {
    executeScroll();
    dispatch(getRoles({status:true}))
    dispatch(clearIfsState());
    dispatch(getSoftAccessGroup({ typeId: 2 }))

    dispatch(countryDropdown());
    if (location.state?.id) {
      dispatch(getIfaByIfaId({ id: location.state?.id })).then((res) => {
        if (res.type === "ifa/getIfaByIfaId/fulfilled") {
          dispatch(clearIfsState());
          setData({
            ...data,
            countryId: res?.payload?.country,
            cityId: res?.payload?.city,
            stateId: res?.payload?.province,
            officeId: res?.payload?.office,
            clientAccNo: res?.payload?.ifaPractice,
            //  registrationNo: res?.payload?.fsca,
            responsiblePersonTitle: res?.payload?.responsiblePerson,
            title: res?.payload?.responsiblePersonTitle,
            firstName: res?.payload?.firstName,
            lastName: res?.payload?.surname,
            positionHeld: res?.payload?.positionHeld,
            dob: moment(res?.payload?.dob).format("YYYY-MM-DD"),
            companyName: res?.payload?.companyName,
            compRegNumber: res?.payload?.compRegNumber,
            sarstaxNo: res?.payload?.sarstaxNo,
            vatno: res?.payload?.vatno,
            buildingName: res?.payload?.buildingName,
            floorandOfficeNo: res?.payload?.floorandOfficeNo,
            streetName: res?.payload.streetName,
            suburb: res?.payload?.suburb,
            postalCode: res?.payload?.postalCode,
            isFscaactive: res?.payload?.isFscaactive,
            lastDateChecked: moment(res?.payload?.lastDateChecked).format(
              "YYYY-MM-DD"
            ),
            personChecked: "string",
            waltCapConsultant: 0,
            registrationNo: res?.payload?.fsca,
            mobileNo: res?.payload?.mobileNo,
            workNo: res?.payload?.workNo,
            email: res?.payload?.email,
            notes: res?.payload?.notes,
            isAmlName: res?.payload?.isAmlName,
            amlupdatedDate: res?.payload?.amlupdatedDate,
            dueDiligenceUpdatedDate: res?.payload?.dueDiligenceUpdatedDate,
            isDueDiligenceName: res?.payload?.isDueDiligenceName,
            accessCategory: res?.payload?.softwareAccessGroup,
            role: res?.payload?.role,
            
          });
          dispatch(
            uploadDocs({ isEdit: true, docs: res?.payload?.ifaDocuments })
          );
          dispatch(countryDropdown());
          setUpdateId(res?.payload?.id);
          setIsAML(res?.payload?.isAml);
          setImage(res?.payload?.profilePhoto);
          setIsDueDeligiance(res?.payload?.isDueDiligence);
        }
      });
    }
    else {
      dispatch(clearAllDocs())
    }
  }, []);

  const handleClose = () => {
    setModal(false);
    //setLinkPopup(false);
  };
  const handleOpen = () => {
    setModal(!modal);
  };

  const handleToast = () => {
    handleClose();
    setShowToast(true);
  };

  const handleNumberHover = () => {
    setShowNumber(true);
  };

  const handleNumberMouseLeave = () => {
    setShowNumber(false);
  };
  const handleNumberHover1 = () => {
    setShowNumber1(true);
  };

  const handleNumberMouseLeave1 = () => {
    setShowNumber1(false);
  };
  ////

  const handleOfficePopupClose = () => {
    setOfficePopup(!officePopup);
  };
  const handleStatePopup = (seldata) => {
    setOfficePopup(!officePopup);
    if (seldata === "Country") {
      setSlectedState({ name: setUpdatedOffice, type: seldata });
      dispatch(selectedId(data.countryId));
    } else if (seldata === "Province") {
      setSlectedState({ name: setUpdatedOffice, type: seldata });
      dispatch(selectedId(data.stateId));
    } else if (seldata === "City") {
      setSlectedState({ name: setUpdatedOffice, type: seldata });
      dispatch(selectedId(data.cityId));
    } else {
      setSlectedState({ name: setUpdatedOffice, type: seldata });
      dispatch(selectedId(data.officeId));
    }
  };

  useEffect(() => {
    if (!updateId) {
      setData({
        ...data,
        clientAccNo: "",
        officeId: "",
        stateId: "",
        cityId: "",
      });
    }
    if (data.countryId) {
      // !updateId && disable.cityId=true
      if (!updateId) {
        disable.cityId = true;
      }

      dispatch(stateDropdown({ countryId: data.countryId })); //4030
    }
  }, [data.countryId]);

  useEffect(() => {
    if (!location.state?.id && isDeleted) {
      setData({
        ...data,
        clientAccNo: "",
        officeId: "",
      });
    }
  }, [selId])

  useEffect(() => {

    setData({
      ...data,
      clientAccNo: "",
      officeId: "",
      stateId: "",
      cityId: "",
    });


  }, [data.countryId]);

  useEffect(() => {
    if (!updateId) {
      setData({
        ...data,
        clientAccNo: "",
        officeId: "",
        cityId: "",
      });
    }
    if (data.stateId) {
      dispatch(cityDropdown({ stateId: data.stateId })); //4030
    } else {
      dispatch(clearStateDetail());
    }
  }, [data.stateId]);

  useEffect(() => {
    if (!updateId) {
      {
        // data.officeId = "";
      }
      // data.officeId = "";
      setData({
        ...data,
        clientAccNo: "",
      });
    }
    if (!data.cityId) {
      dispatch(clearCityDetail());
    }
  }, [data.cityId]);

  useEffect(() => {
    if (data.cityId && data.officeId) {
      if (!updateId) {
        dispatch(ifaAccNumber()).then((res) => {
          if (res.payload.statusCode === 200) {
            if (!location.state?.id) {
              setData({
                ...data,
                clientAccNo: res.payload?.data?.accountNo,
              });
            }
            else {
              setData({
                ...data,

              });
            }
          }
        });
      }
    }
    if (data.cityId) {
      dispatch(officeDropdown({ cityId: data.cityId }));
    }
    if (!data.officeId && !updateId) {
      setData({
        ...data,
        clientAccNo: "",

      });
    }
  }, [data.cityId, data.officeId]);



  useEffect(() => {
    if (error || status) {
      setTimeout(() => {
        dispatch(clearState());
      }, 2000);
    }
  }, [error, status]);

  useEffect(() => {
    if (disable.stateId) {
      data.stateId = "";
    }
  }, [disable.stateId]);

  useEffect(() => {
    if (disable.cityId) {
      data.cityId = "";
    }
  }, [disable.cityId]);

  useEffect(() => {
    if (updatedOffice.data === 0) {
      setUpdatedOffice({ ...updatedOffice, data: selId });
    }
    if (updatedOffice.type === "Offices") {
      // updatedOffice.data && setData({ ...data, officeId: updatedOffice.data });
      if (typeof updatedOffice.data !== "boolean") {
        setData({ ...data, officeId: updatedOffice.data });
      }
    } else if (updatedOffice.type === "Country") {
      setData({ ...data, countryId: updatedOffice.data });
      disable.stateId =
        updatedOffice.data === true || !updatedOffice.data ? true : false;
    } else if (updatedOffice.type === "Province") {
      disable.cityId =
        updatedOffice.data === true || !updatedOffice.data ? true : false;
      setData({ ...data, stateId: updatedOffice.data });
    } else if (updatedOffice.type === "City") {
      disable.officeId =
        updatedOffice.data === true || !updatedOffice.data ? true : false;
      setData({ ...data, cityId: updatedOffice.data });
    }
  }, [updatedOffice.type, updatedOffice.data]);

  useEffect(() => {
    if (error || status) {
      setTimeout(() => {
        dispatch(clearState());
      }, 2000);
    }
  }, [error, status]);

  useEffect(() => {
    data.isFscaactive === "false" && setIsSuspend(true);
  }, [data.isFscaactive]);

  const handelCancel = () => {
    setIsSuspend(false);
    setData({
      ...data,
      isFscaactive: "false",
    });
  };

  const handelOk = () => {
    setIsSuspend(false);
    setData({
      ...data,
      isFscaactive: "",
    });
  };

  const handleDocPopup = () => {
    setViewDocs(true);
  };

  return (
    <>
      <div className={styles.addNewIFAsContainer} ref={elRef}>
        {modal && (
          <Popup
            Children={UploadProfilePhoto}
            handleClose={() => handleClose()}
            handleToast={() => handleToast()}
            setPopupData={setImage}
            popupData={image}
          />
        )}

        {viewDocs && (
          <Popup
            Children={IfaDocumentList}
            handleClose={() => setViewDocs(false)}
          // handleToast={() => handleToast()}
          />
        )}
        {isSuspend && (
          <Popup
            //  popupData={{ currFund, setCurrFund }}
            msg="Suspend this IFA until his registration is reinstated by the FSCA and his suspention lifted"
            Children={DeletePopup}
            customClassText={styles.customClassText}
            submitButton="Suspend"
            handleClose={() => handelCancel()}
            handleDelete={() => handelOk()}
          />
        )}

        {officePopup && (
          <Popup
            Children={CountryPopup}
            id={data?.officeId}
            popupData={data[slectedState.key] ? data[slectedState.key] : ""}
            setPopupData={slectedState.name}
            handleClose={() => handleOfficePopupClose()}
            msg={slectedState.type}
          />
        )}
        {ifaError ? (
          <Toast
            item={ifaStatus === 200 ? success : danger}
            show={showToast}
            setShow={setShowToast}
            message={ifaError}
          />
        ) : null}
        {error ? (
          <Toast
            item={status === 200 ? success : danger}
            show={showToast}
            setShow={setShowToast}
            message={error}
          />
        ) : null}
        <form className={styles.ifaForm} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.IFAsPrimaryDetails}>
            <p className={styles.data1}>Personal Data1</p>
            <div className={styles.imgBtnGrp}>
              <div className={styles.imageUploadContainer}>

                {image ? (

                  <img
                    src={image}
                    //  src={URL.createObjectURL(image)}
                    alt="ProfilePhoto"
                    className={styles.profileImage}
                  />
                ) : (
                  <img
                    src={profileImage}
                    alt="ProfilePhoto"
                    className={styles.profileImage}
                  />
                )}
                <FilledButton
                  title="Upload"
                  customClass={styles.uploadBtn}
                  handleClick={() => handleOpen()}
                  type="button"
                />
                <FilledButton
                  title="Remove"
                  customClass={styles.removeBtn}
                  handleClick={() => {
                    setImage("");
                  }}
                  type="button"
                />
              </div>
              <Divider customClass={styles.verticalDivider} />
              <div className={styles.uploadContainer}>
                <UploadFile
                  selectedFileText="Drop files to upload or Browse"
                  buttonStyle={styles.fileInputBtn}
                  browseContent={<Upload fillColor={colors.white} />}
                  type="button"
                  setFile={setFile}
                  file={file}
                  accept=".jpeg, .jpg, .png , .pdf, .docs, .doc"
                />

                <UploadFile
                  //title="Upload Documents"
                  browseContent={" Upload Documents"}
                  customClass={styles.uploadBtn1}
                  accept=".jpeg, .jpg, .png , .pdf, .docs, .doc"
                  setFile={setFile}
                  file={file}
                  type="button"
                />

                <IconContainer
                  customClass={styles.iconContainer}
                  handleClick={() => (docs?.length > 0 ? handleDocPopup() : "")}
                  icon={
                    <ViewFileIcon
                      fillColor="white"
                    //  customClass={styles.manageOfficeIcon}
                    />
                  }
                />
              </div>
            </div>

            <Divider customClass={styles.divider} />

            <div className={styles.checkboxMainContainer}>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="isDueDiligence"
                  className={styles.checkbox}
                  value={isDueDiligence}
                  checked={isDueDiligence}
                  onChange={(e) => setIsDueDeligiance(e.target.checked)}
                />
                <p className={styles.accountText}>Due diligence</p>

                <div className={styles.tooltipContainer}>
                  {showNumber1 ? (
                    <Tooltip
                      title={`Last checked on :  ${data.dueDiligenceUpdatedDate
                        ? moment(data.dueDiligenceUpdatedDate).format(
                          "DD MMMM yyyy"
                        )
                        : "-"
                        }`}
                      subTitle={`Last checked by : ${data.isDueDiligenceName ? data.isDueDiligenceName : "-"
                        }`}
                      customClass={styles.printTooltip}
                      customText={styles.text}
                    />
                  ) : null}
                  {location.state?.id && (
                    <InfoIcon
                      fillColor="#B9B7BC"
                      customClass={styles.infoIcon}
                      onMouseOver={handleNumberHover1}
                      onMouseLeave={handleNumberMouseLeave1}
                    />
                  )}
                </div>
              </div>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="isAML"
                  className={styles.checkbox}
                  value={isAML}
                  checked={isAML}
                  onChange={(e) => setIsAML(e.target.checked)}
                />
                <p className={styles.accountText}>AML</p>
                <div className={styles.tooltipContainer}>
                  {showNumber ? (
                    <Tooltip
                      title={`Last checked on : ${data.amlupdatedDate
                        ? moment(data.amlupdatedDate).format("DD MMMM yyyy")
                        : "-"
                        }`}
                      subTitle={`Last checked by : ${data.isAmlName ? data.isAmlName : "-"
                        }`}
                      customClass={styles.printTooltip}
                      customText={styles.text}
                    />
                  ) : null}
                  {location.state?.id && (
                    <InfoIcon
                      fillColor="#B9B7BC"
                      customClass={styles.infoIcon}
                      onMouseOver={handleNumberHover}
                      onMouseLeave={handleNumberMouseLeave}
                    />
                  )}
                </div>
              </div>
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.IFAsMoreDetails}>
              <div className={styles.clientTypeWithIcon}>
                <div className={styles.textWithIcon}>
                  <TextField
                    customClass={styles.labelText}
                    customClassInput={styles.inputType1}
                    customClassDropdown={styles.dropdownStyle}
                    customClassContainer={styles.customClassContainer}
                    type="select"
                    label="Country of Residence"
                    placeholder="Select Country "
                    handleChange={handleChange(
                      "countryId",
                      null,
                      null,
                      { stateId: true, cityId: true, officeId: true },
                      { stateId: false, cityId: true, officeId: true }
                    )}
                    error={errors.countryId}
                    ref1={ref?.countryId}
                    autoFocus={ref?.countryId?.current ? true : false}
                    dropDownData={countryDropdownData}
                    name="countryName"
                    id="countryId"
                    disable={updateId ? true : false}
                    value={data.countryId ? data.countryId : ""}
                  />
                  <IconContainer
                    customClass={
                      errors.countryId ||
                        errors.cityId ||
                        errors.stateId ||
                        errors.officeId
                        ? styles.officeIconContainerCustom
                        : ''
                    }
                    handleClick={() =>
                      updateId ? {} : handleStatePopup("Country")
                    }
                    icon={
                      <FlagIcon
                        fillColor="white"
                        customClass={styles.manageOfficeIcon}
                      />
                    }
                  />
                </div>
                <div className={styles.textWithIcon}>
                  <TextField
                    customClass={styles.labelText}
                    customClassInput={styles.inputType1}
                    customClassDropdown={styles.dropdownStyle}
                    customClassContainer={styles.customClassContainer}
                    type="select"
                    label="Province"
                    placeholder="Select Province"
                    handleChange={handleChange(
                      "stateId",
                      null,
                      null,
                      { cityId: true, officeId: true },
                      { cityId: false, officeId: true }
                    )}
                    error={data.countryId ? errors.stateId : ""}
                    ref1={ref?.stateId}
                    dropDownData={stateDropdownData}
                    name="stateName"
                    id="stateId"
                    value={data?.stateId ?? ""}
                    disable={disable.stateId || !data?.countryId}
                    autoFocus={ref?.stateId?.current ? true : false}
                  />
                  <IconContainer
                    customClass={
                      errors.countryId ||
                        errors.cityId ||
                        errors.stateId ||
                        errors.officeId
                        ? styles.officeIconContainerCustom
                        : ""
                    }
                    handleClick={() =>
                      data.countryId && !updateId
                        ? handleStatePopup("Province")
                        : {}
                    }
                    icon={
                      <StateIcon
                        fillColor="white"
                        customClass={styles.manageOfficeIcon}
                      />
                    }
                  />
                </div>
                <div className={styles.textWithIcon}>
                  <TextField
                    customClass={styles.labelText}
                    customClassInput={styles.inputType1}
                    customClassDropdown={styles.dropdownStyle}
                    customClassContainer={styles.customClassContainer}
                    type="select"
                    label="City"
                    placeholder="Select City"
                    handleChange={handleChange(
                      "cityId",
                      null,
                      null,
                      { officeId: true },
                      { officeId: false }
                    )}
                    error={data.stateId ? errors.cityId : ""}
                    ref1={ref?.cityId}
                    dropDownData={cityDropdownData}
                    name="cityName"
                    id="cityId"
                    value={data?.cityId ?? ""}
                    disable={disable.cityId || !data?.stateId}
                  />
                  <IconContainer
                    customClass={
                      errors.countryId ||
                        errors.cityId ||
                        errors.stateId ||
                        errors.officeId
                        ? styles.officeIconContainerCustom
                        : ""
                    }
                    handleClick={() =>
                      data.stateId && !updateId ? handleStatePopup("City") : {}
                    }
                    icon={
                      <CityIcon
                        fillColor="white"
                        customClass={styles.manageOfficeIcon}
                      />
                    }
                  />
                </div>
                <div className={styles.textWithIcon}>
                  <TextField
                    customClass={styles.labelText}
                    customClassInput={styles.inputType1}
                    customClassDropdown={styles.dropdownStyle}
                    customClassContainer={styles.customClassContainer}
                    type="select"
                    label="Office"
                    placeholder="Select Office"
                    handleChange={handleChange("officeId")}
                    error={data.cityId ? errors.officeId : ""}
                    ref1={ref?.officeId}
                    dropDownData={officeDropdownData ? officeDropdownData : []}
                    name="officeName"
                    id="officeId"
                    value={data.officeId ?? ""}
                    disable={disable.officeId || !data?.cityId}
                  />
                  <IconContainer
                    customClass={
                      errors.countryId ||
                        errors.cityId ||
                        errors.stateId ||
                        errors.officeId
                        ? styles.officeIconContainerCustom
                        : ""
                    }
                    handleClick={() =>
                      data.cityId && !updateId
                        ? handleStatePopup("Offices")
                        : {}
                    }
                    icon={
                      <ManageOfficeIcon
                        fillColor="white"
                        customClass={styles.manageOfficeIcon}
                      />
                    }
                  />
                </div>
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.IFAsType}>
                <TextField
                  type="text"
                  label="FSCA Registration No "
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  placeholder="Enter FSCA Registration No"
                  ref1={ref?.registrationNo}
                  autoFocus={ref?.registrationNo?.current ? true : false}
                  disable={location.state?.id}
                  value={data.registrationNo ? data.registrationNo : ""}
                  handleChange={handleChange("registrationNo")}
                  error={errors.registrationNo}
                  maxLength={50}
                />
                <TextField
                  type="text"
                  label="WCM IFA Practise No"
                  customClass={styles.labelText}
                  disable={true}
                  customClassInput={styles.inputType1}
                  placeholder="IFA001"
                  info={true}
                  tooltipText='This number will be auto generated, if seen empty than it will populated automatically after data submit. '
                  value={data.clientAccNo ? data.clientAccNo : ""}
                  handleChange={handleChange("clientAccNo")}
                  error={errors.clientAccNo}
                  maxLength={50}

                />
                <TextField
                  maxLength={50}

                  ref1={ref?.responsiblePersonTitle}
                  autoFocus={ref?.responsiblePersonTitle?.current ? true : false}
                  type="text"
                  label="Key Individual – Responsible Person"
                  customClass={styles.labelText}
                  disable={location.state?.id}
                  customClassInput={styles.inputType1}
                  value={
                    data.responsiblePersonTitle
                      ? data.responsiblePersonTitle
                      : ""
                  }

                  handleChange={handleChange("responsiblePersonTitle")}
                  error={errors.responsiblePersonTitle}
                />
                <TextField
                  maxLength={50}

                  customClass={styles.labelText}
                  customClassDropdown={styles.dropdownStyle}
                  type="select"
                  label="Responsible Person Title"
                  placeholder="Select title"
                  handleChange={handleChange("title")}
                  error={errors.title ? errors.title : ""}
                  ref1={ref?.title}
                  autoFocus={ref?.title?.current ? true : false}
                  dropDownData={
                    ResponsiblePersonTitles ? ResponsiblePersonTitles : []
                  }
                  name="title"
                  id="title"
                  value={data.title ? data.title : ""}
                />

                {/* kkk */}
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.IFAsType}>
                <TextField
                  type="text"
                  maxLength={20}

                  label="First Name"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  disable={location.state?.id}
                  value={data.firstName ? data.firstName : ""}
                  handleChange={handleChange("firstName")}
                  error={errors.firstName}
                />
                <TextField
                  type="text"
                  maxLength={20}

                  label="Surname"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  value={data.lastName ? data.lastName : ""}
                  handleChange={handleChange("lastName")}
                  error={errors.lastName}
                />
                <TextField
                  type="text"
                  maxLength={50}

                  label="Position held"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  value={data.positionHeld ? data.positionHeld : ""}
                  handleChange={handleChange("positionHeld")}
                  error={errors.positionHeld}
                />

                <TextField
                  type="date"
                  maxLength={50}

                  label="Date of Birth"
                  max={moment(new Date()).format("YYYY-MM-DD")}
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  value={data.dob ? data.dob : ""}
                  handleChange={handleChange("dob")}
                  error={errors.dob}
                />
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.IFAsType}>
                <TextField
                  type="text"
                  maxLength={50}

                  label="Company Name"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  value={data.companyName ? data.companyName : ""}
                  handleChange={handleChange("companyName")}
                  error={errors.companyName}
                />
                <TextField
                  type="text"
                  maxLength={50}

                  label="Comp. Reg.  Number"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  value={data.compRegNumber ? data.compRegNumber : ""}
                  handleChange={handleChange("compRegNumber")}
                  error={errors.compRegNumber}
                />
                <TextField
                  type="text"
                  maxLength={50}

                  label="SARS Tax Number"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  value={data.sarstaxNo ? data.sarstaxNo : ""}
                  handleChange={handleChange("sarstaxNo")}
                  error={errors.sarstaxNo}
                />
                <TextField
                  type="text"
                  maxLength={50}

                  label="VAT Number"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  value={data.vatno ? data.vatno : ""}
                  handleChange={handleChange("vatno")}
                  error={errors.vatno}
                />
              </div>
            </div>
          </div>

          <div className={styles.businessData}>
            <p className={styles.data1}>Business Data</p>
            <div className={styles.IFAsType}>
              <TextField
                type="text"
                maxLength={50}

                label="Building Name"
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                value={data.buildingName ? data.buildingName : ""}
                handleChange={handleChange("buildingName")}
                error={errors.buildingName}
              />
              <TextField
                type="text"
                label="Floor And Office Number"
                maxLength={50}

                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                value={data.floorandOfficeNo ? data.floorandOfficeNo : ""}
                handleChange={handleChange("floorandOfficeNo", true)}
                error={errors.floorandOfficeNo}
              />
              <TextField
                type="text"
                label="Street Name"
                maxLength={50}

                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                value={data.streetName ? data.streetName : ""}
                handleChange={handleChange("streetName")}
                error={errors.streetName}
              />
              <TextField
                type="text"
                label="Suburb"
                maxLength={50}

                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                value={data.suburb ? data.suburb : ""}
                handleChange={handleChange("suburb")}
                error={errors.suburb}
              />
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.IFAsType1}>
              {/* <TextField
                type="text"
                label="City"
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                value={data.city ? data.city : ""}
                handleChange={handleChange("city")}
                error={errors.city}
              />
              <TextField
                type="text"
                label="Province"
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                value={data.province ? data.province : ""}
                handleChange={handleChange("province")}
                error={errors.province}
              /> */}
              <TextField
                type="text"
                label="Postal code"
                maxLength={50}

                customClass={styles.labelText}
                customClassInput={styles.inputTypePostal}
                value={data.postalCode ? data.postalCode : ""}
                handleChange={handleChange("postalCode")}
                error={errors.postalCode}
              />
            </div>
          </div>

          <div className={styles.businessData}>
            {/* <p className={styles.data1}>Personal Data2</p> */}
            <div className={styles.IFAsDetails}>
              {/* <div className={styles.chechboxContainer}>
                <span className={styles.registrationText}>
                  Is Current FSCA registrationNo Active?
                </span>
                <div className={styles.isActiveText}>
                  <input type="radio" name="yes" />
                  <label className={styles.yesCheck}>Yes</label>
                  <input type="radio" name="yes" />
                  <label>No</label>
                </div>
              </div> */}
              <div className={styles.checkContainer}>
                <div>
                  <span className={styles.questionText}>
                    Is Current FSCA registrationNo Active?
                  </span>
                  <div className={styles.radioContainer}>
                    <RadioButton
                      name="isFscaactive"
                      label="Yes"
                      customClass={styles.radioCustomClass}
                      radioLabelClass={styles.radioButtonText}
                      value={data.isFscaactive ? data.isFscaactive : ""}
                      id="true"
                      checked={data.isFscaactive?.toString() === "true"}
                      handleChange={handleChange("isFscaactive")}
                    />
                    <RadioButton
                      name="isFscaactive"
                      label="No"
                      customClass={styles.radioCustomClass}
                      radioLabelClass={styles.radioButtonText}
                      value={data.isFscaactive ? data.isFscaactive : ""}
                      id="false"
                      checked={data.isFscaactive?.toString() === "false"}
                      handleChange={handleChange("isFscaactive")}
                    />
                  </div>
                </div>
              </div>
              <TextField
                type="date"
                maxLength={50}

                label="Last Date Checked"
                customClass={styles.labelText}
                lastDateChecked
                customClassContainer={styles.divContainer}
                customClassInput={styles.inputType1}
                value={data.lastDateChecked ? data.lastDateChecked : ""}
                handleChange={handleChange("lastDateChecked")}
                error={errors.lastDateChecked}
              />
              <TextField
                type="select"
                label="Person Checked"
                option1=""
                option2="2"
                option3="3"
                option4="4"
                maxLength={50}

                placeholder="Select Person Checked"

                customClass={styles.labelText}
                customClassDropdown={styles.dropdownStyle}
              />
              <TextField
                maxLength={50}

                type="select"
                label="Walt Cap. Consultant"
                option1=""
                option2="2"
                option3="3"
                option4="4"
                placeholder='Select Walt Cap. Consultant'
                customClassDropdown={styles.dropdownStyle}
              />
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.IfaRoleType}>
              <TextField
                customClass={styles.labelText}
                customClassDropdown={styles.dropdownStyle}
                type="select"
                label="Software Access Group"
                placeholder="Select Software Access Group "
                handleChange={handleChange("accessCategory")}
                error={errors.accessCategory ? errors.accessCategory : ""}
                dropDownData={
                  softAccessGroupList ? softAccessGroupList : []
                }
                name='accessCategory'
                id='id'
                value={data.accessCategory ? data.accessCategory : ""}
              />
              <TextField
                customClass={styles.labelText}
                customClassDropdown={styles.dropdownStyle}
                type="select"
                label="Role"
                placeholder="Select Role "
                handleChange={handleChange("role")}
                error={errors.role ? errors.role : ""}
                dropDownData={
                  roleList ? roleList : []
                }
                name="roleName"
                id="id"
                value={data.role ? data.role : ""}
              />
            </div>
            <Divider customClass={styles.divider} />

            <div className={styles.contactDetails}>
              <div className={styles.contactInfo}>
                <TextField
                  type="text"


                  label="Mobile Number"
                  customClass={styles.labelText}
                  customClassInput={styles.inputType1}
                  value={data.mobileNo ? data.mobileNo : ""}
                  handleChange={handleChange("mobileNo", true)}
                  error={errors.mobileNo}
                  maxLength={20}
                />
                <TextField
                  type="text"

                  label="Work Number"
                  customClass={styles.contactLabel}
                  customClassInput={styles.inputType1}
                  value={data.workNo ? data.workNo : ""}
                  handleChange={handleChange("workNo", true)}
                  error={errors.workNo}
                  maxLength={20}
                />
                <TextField
                  type="text"
                  label="Email"
                  customClass={styles.contactLabel}
                  customClassInput={styles.inputType1}
                  value={data.email ? data.email : ""}
                  handleChange={handleChange("email")}
                  error={errors.email}
                />
              </div>


              <div className={styles.descriptionContainer}>
                <label className={styles.label}>Note</label>
                <textarea
                  className={styles.textArea}
                  onChange={handleChange("notes")}
                  value={data.notes ? data.notes : ""}
                // error={errors.notes}
                ></textarea>
              </div>

            </div>

            <div className={styles.btnGrp}>
              <FilledButton
                title="Continue"
                type='submit'
                customClassLoader={styles.customClassLoader}
                customClass={styles.saveBtn}
                handleClick={() => { }}
                handleMouseEnter={() => { }}
                handleMouseLeave={() => { }}
                loader={loading}
                disabled={loading}

              />
              {/* <FilledButton
                  title="Edit"
                  customClass={styles.editBtn}
                  handleClick={() => {}}
                  handleMouseEnter={()=>{}}
                  handleMouseLeave={()=>{}}
                /> */}
              <FilledButton
                title="Cancel"
                customClass={styles.cancelBtn}
                handleClick={() => {
                  handelClearForm();
                }}
                disabled={location?.state?.id}
                type="button"
                handleMouseEnter={() => { }}
                handleMouseLeave={() => { }}
              />
              {/* <FilledButton
                  title="Delete Account"
                  customClass={styles.deleteBtn}
                  handleClick={() => {}}
                  type="button"
                  handleMouseEnter={()=>{}}
                  handleMouseLeave={()=>{}}
                /> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewIFAs;
