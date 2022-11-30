import styles from "./addnewclient.module.scss";
import profileImage from "../../../assets/images/profileImage.png";
import FilledButton from "../../../component/filled-button/FilledButton";
import Divider from "../../../component/divider/Divider";
import TextField from "../../../component/text-field/TextField";
import { useState } from "react";
import UploadProfilePhoto from "../../../component/modal/upload-Profile-Photo/UploadProfilePhoto";
import Popup from "../../../component/popup/Popup";
import Toast from "../../../component/toast/Toast";
import { danger, success } from "../../../data/data";
import { useLocation, useNavigate } from "react-router-dom";
import ClientLink from "../../../component/modal/Ifa-to-client-link/ClientLink";
import { useEffect } from "react";
import "react-phone-number-input/style.css";
import "../../../styles/libraries.css";
import {
  accountNumber,
  accountTypeDropdown,
  clearCityDetail,
  clearState,
  clientTypeDropdown,
  consultantDropdown,
  ifaDropdown,
  officeDropdown,
  personalityTypeDropdown,
  registerClient,
  selectedId,
  softwareGroupDropdown,
  updateRegisterClient,
} from "../../../redux/features/crm/crmSlice";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../../hooks/useForm";
import { clientFormValidators } from "../../../formValidators/clientFormValidators";
import {
  CityIcon,
  FlagIcon,
  InfoIcon,
  ManageOfficeIcon,
  StateIcon,
  Upload,
  ViewFileIcon,
} from "../../../component/svg-components";
import {
  cityDropdown,
  clearStateDetail,
  countryDropdown,
  stateDropdown,
} from "../../../redux/features/common/commonSlice";
import { maritalStatusData } from "../../../data/maritalStatusData";
import YearPickerV1 from "../../../component/year-picker/YearPickerV1";
import useReference from "../../../hooks/useReference";
import CountryPopup from "../add-new-client-popup/CountryPopup";
import IconContainer from "../../../component/icon-container/IconContainer";
import { genderData } from "../../../data/genderData";
import { getClientProfile } from "../../../redux/features/clientprofile/clientProfileSlice";
import moment from "moment/moment";
import Tooltip from "../../../component/tooltip/Tooltip";
import useScroll from '../../../hooks/useScroll'
import UploadFile from "../../../component/upload-file/UploadFile";
import { colors } from "../../../constants/Colors";
import { getBase64 } from "../../../utils/utils";
import { uploadDocs, clearAllDocs } from "../../../redux/features/crm/crmSlice";
import ClientDocumentList from "../client-documents/ClientDocumentList";
const AddNewClient = () => {

  const dispatch = useDispatch();
  let location = useLocation();
  const {
    officeDropdownData,
    consultantDropdownData,
    personalityTypeDropdownData,
    accountTypeDropdownData,
    ifaDropdownData,
    softwareGroupDropdownData,
    clientTypeDropdownData,
    status,
    error,
    loading,
    selId,
    isDeleted,
    docs,

  } = useSelector((state) => state.crm);
  const { countryDropdownData, stateDropdownData, cityDropdownData } =
    useSelector((state) => state.common);
  const { userInfo } = useSelector((state) => state.login);
  const [modal, setModal] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [linkPopup, setLinkPopup] = useState(false);
  const [image, setImage] = useState(null);
  const [dob, setDob] = useState();
  const [spouseDob, setSpouseDob] = useState();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [updatedOffice, setUpdatedOffice] = useState({ type: "", data: "" });
  const [officePopup, setOfficePopup] = useState(false);
  const [slectedState, setSlectedState] = useState({ name: "", type: "" });
  const [updateId, setUpdateId] = useState();
  const [isDueDiligence, setIsDueDeligiance] = useState(false);
  const [isProminentPolitical, setIsProminentPolitical] = useState(false);
  const [clientData, setClintData] = useState([]);
  const [viewDocs, setViewDocs] = useState(false);
  const [executeScroll, elRef] = useScroll();
  const [isAML, setIsAML] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showNumber1, setShowNumber1] = useState(false);
  const [showNumber2, setShowNumber2] = useState(false);
  const [fPhonVal, setFPhonVal] = useState("");
  const ref = useReference();
  const [countryIso, setCountryIso] = useState("");
  const [file, setFile] = useState(null);

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

  const handleClose = () => {
    setModal(false);
    setLinkPopup(false);
  };
  const handleOpen = () => {
    setModal(!modal);
  };

  const handleSubmitForm = (data) => {
    let payload = {
      profilePhoto: image,
      office: data.officeId.toString(),
      clientAccNo: data.clientAccNo,
      accessCategoryId: 2,
      responsiblePerson: data.responsiblePerson,
      firstName: data.firstName,
      lastName: data.lastName,
      positionHeld: data.positionHeld,
      dob: dob,
      trustRegNo: data.trustRegNo,
      mobileNo: fPhonVal,
      workNo: data.workNo,
      email: data.email,
      sarstaxNo: data.sarstaxNo,
      country: data.countryId.toString(),
      streetNo: data.streetNo,
      homeName: data.homeName,
      streetName: data.streetName,
      suburb: data.suburb,
      city: data.cityId.toString(),
      province: data.stateId.toString(),
      postalCode: data.postalCode,
      accountHolder: data.accountHolder,
      bank: data.bank,
      accountType: data.accountType,
      accountNo: data.accountNo,
      branchCode: data.branchCode,
      swiftCode: data.swiftCode,
      clientType: data.clientType,
      personalityType: data.personalityType,
      waltCapConsultant: data.waltCapConsultant,
      ifa: data.ifa,
      maritalStatus: data.maritalStatus,
      softwareAccessGroup: data.softwareAccessGroup?.toString().length>0?data.softwareAccessGroup:0,
      spouseName: data.spouseName,
      spouseDob: spouseDob,
      nickName: data.nickName,
      faserial: data.faserial,
      notes: data.notes,
      createdBy: userInfo.userDetail.id,
      salutation: data.salutation,
      middleName: data.middleName,
      isDueDiligence: isDueDiligence,
      isAML: isAML,
      isProminentPolitical: isProminentPolitical,
      clientDocuments: docs,
      vatno: data.vatno,
      idnumber: data.idnumber
    };
    if (updateId && dob && spouseDob && fPhonVal) {
      delete payload.createdBy;
      let updatedPayload = {
        ...payload,
        id: updateId,
        updatedBy: userInfo.userDetail.id,
      };
      console.log('first', updatedPayload)
      dispatch(updateRegisterClient(updatedPayload)).then((res) => {
        if (res.payload?.data?.userId) {
          setTimeout(() => {
            clearState();
            dispatch(clearAllDocs())
            navigate("brokergefees", {
              state: {
                userId: updateId,
                isUpdate: true,
              },
            });
          }, 1000);
        }
      });
    } else if (dob && spouseDob && fPhonVal) {

      dispatch(registerClient(payload)).then((res) => {
        if (res.payload?.data?.userId) {
          setTimeout(() => {
            clearState();
            dispatch(clearAllDocs())
            navigate("brokergefees", {
              state: {
                userId: res.payload?.data?.userId,
                isUpdate: false,
              },
            });
          }, 1000);
        }
      });
    }
  };

  const handleToast = () => {
    setShowToast(true);
    handleClose();
  };


  const { handleChange, handleSubmit, setErrors, data, errors, setData, disable } =
    useForm({
      ref: ref,
      validations: clientFormValidators,
      intialDisable: { stateId: true, cityId: true, officeId: true },
      isSubmit: isSubmit,
      setIsSubmit: setIsSubmit,
      onSubmit: () => handleSubmitForm(data),
    });

  const getDDValue = (value, list, key) => {
    return list.find(element => element.id === value)?.[key] ? value : ''
    // return ifaDropdownData.find(element => element.id===res.payload.waltCapConsultant)?.ifa?res.payload.waltCapConsultant:''
  }
  useEffect(() => {
    executeScroll();
    dispatch(ifaDropdown());
    dispatch(accountTypeDropdown());
    dispatch(consultantDropdown());
    dispatch(personalityTypeDropdown());
    dispatch(countryDropdown());
    dispatch(clientTypeDropdown());
    dispatch(softwareGroupDropdown({ typeId: 2 }));
    // location.state?.userId &&
    //   dispatch(getClientProfile({ userId: location.state?.userId })).then(
    //     (res) => {
    //       if (res.type === "clientProfile/getClientProfile/fulfilled") {
    //         setImage(res.payload.profilePhoto);
    //         setDob(moment(res.payload.dob).format("YYYY-MM-DD"));
    //         setSpouseDob(moment(res.payload.spouseDob).format("YYYY-MM-DD"));
    //         setUpdateId(res.payload.id);
    //         setIsDueDeligiance(res.payload.isDueDiligence);
    //         setIsAML(res.payload.isAml);
    //         setIsProminentPolitical(res.payload.isProminentPolitical)
    //         setClintData(res.payload)
    //         setData({
    //           ...data,
    //           officeId: res.payload.office,
    //           clientAccNo: res.payload.clientAccNo,
    //           accessCategoryId: res.payload.accessCategoryId,
    //           responsiblePerson: res.payload.responsiblePerson,
    //           firstName: res.payload.firstName,
    //           lastName: res.payload.lastName,
    //           positionHeld: res.payload.positionHeld,
    //           trustRegNo: res.payload.trustRegNo,
    //           mobileNo: res.payload.mobileNo,
    //           workNo: res.payload.workNo,
    //           email: res.payload.email,
    //           sarstaxNo: res.payload.sarstaxNo,
    //           countryId: res.payload.country,
    //           streetNo: res.payload.streetNo,
    //           homeName: res.payload.homeName,
    //           streetName: res.payload.streetName,
    //           suburb: res.payload.suburb,
    //           cityId: res.payload.city,
    //           stateId: res.payload.province,
    //           postalCode: res.payload.postalCode,
    //           accountHolder: res.payload.accountHolder,
    //           bank: res.payload.bank,
    //           accountType: res.payload.accountType,
    //           accountNo: res.payload.accountNo,
    //           branchCode: res.payload.branchCode,
    //           swiftCode: res.payload.swiftCode,
    //           clientType: res.payload.clientType,
    //           personalityType: res.payload.personalityType,
    //           waltCapConsultant: ifaDropdownData.find(element => element.id===res.payload.waltCapConsultant)?.ifa?res.payload.waltCapConsultant:'',
    //           ifa: ifaDropdownData.find(element => element.id===res.payload.ifa)?.ifa?res.payload.ifa:'',
    //           maritalStatus: res.payload.maritalStatus,
    //           softwareAccessGroup: res.payload.softwareAccessGroup,
    //           spouseName: res.payload.spouseName,
    //           nickName: res.payload.nickName,
    //           faserial: res.payload.faserial,
    //           notes: res.payload.notes,
    //           salutation: res.payload.salutation,
    //           middleName: res.payload.middleName,
    //           isDueDiligence: res.payload.isDueDiligence,
    //           isAML: res.payload.isDueDiligence,
    //           isProminentPolitical: isProminentPolitical,
    //         });

    //       }
    //     }
    //   );
  }, []);
  useEffect(() => {
    location.state?.userId &&
      dispatch(getClientProfile({ userId: location.state?.userId })).then(
        (res) => {
          if (res.type === "clientProfile/getClientProfile/fulfilled") {
            console.log('res for client', typeof (res?.payload?.mobileNo))
            setImage(res.payload.profilePhoto);
            setDob(moment(res.payload.dob).format("YYYY-MM-DD"));
            setSpouseDob(moment(res.payload.spouseDob).format("YYYY-MM-DD"));
            setUpdateId(res.payload.id);
            setIsDueDeligiance(res.payload.isDueDiligence);
            setIsAML(res.payload.isAml);
            setIsProminentPolitical(res.payload.isProminentPolitical)
            setClintData(res.payload)
            setFPhonVal(res.payload.mobileNo)
            setData({
              ...data,
              officeId: res.payload.office,
              clientAccNo: res.payload.clientAccNo,
              accessCategoryId: res.payload.accessCategoryId,
              responsiblePerson: res.payload.responsiblePerson,
              firstName: res.payload.firstName,
              lastName: res.payload.lastName,
              positionHeld: res.payload.positionHeld,
              trustRegNo: res.payload.trustRegNo,
              mobileNo: res.payload.mobileNo,
              workNo: res.payload.workNo,
              email: res.payload.email,
              sarstaxNo: res.payload.sarstaxNo,
              countryId: res.payload.country,
              streetNo: res.payload.streetNo,
              homeName: res.payload.homeName,
              streetName: res.payload.streetName,
              suburb: res.payload.suburb,
              cityId: res.payload.city,
              stateId: res.payload.province,
              postalCode: res.payload.postalCode,
              accountHolder: res.payload.accountHolder,
              bank: res.payload.bank,
              accountType: res.payload.accountType,
              accountNo: res.payload.accountNo,
              branchCode: res.payload.branchCode,
              swiftCode: res.payload.swiftCode,
              clientType: res.payload.clientType,
              personalityType: res.payload.personalityType,
              waltCapConsultant: getDDValue(res.payload.waltCapConsultant, ifaDropdownData, 'ifa'),
              ifa: getDDValue(res.payload.ifa, ifaDropdownData, 'ifa'),
              maritalStatus: res.payload.maritalStatus,
              softwareAccessGroup: getDDValue(res.payload.softwareAccessGroup, softwareGroupDropdownData, 'accessCategory'),
              spouseName: res.payload.spouseName,
              nickName: res.payload.nickName,
              faserial: res.payload.faserial,
              notes: res.payload.notes,
              salutation: res.payload.salutation,
              middleName: res.payload.middleName,
              isDueDiligence: res.payload.isDueDiligence,
              isAML: res.payload.isDueDiligence,
              isProminentPolitical: isProminentPolitical,
              idnumber: res.payload?.idnumber,
              vatno: res.payload?.vatno,

            });
            dispatch(
              uploadDocs({ isEdit: true, docs: res?.payload?.clientDocuments })
            );
          }
        }
      );
  }, [ifaDropdownData.length])

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
    } else {
      data.stateId = ''
      data.cityId = ''
      disable.cityId = true
      disable.stateId = true
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
  }, [selId, isDeleted])

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
        data.officeId = "";
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
        dispatch(
          accountNumber({
            countryId: data.countryId,
            stateId: data.stateId,
            cityId: data.cityId,
            officeId: data.officeId,
          })
        ).then((res) => {
          if (res.payload.statusCode === 200) {
            setData({
              ...data,
              clientAccNo: res.payload?.data?.generateAccountNo,
            });
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

  const handleReset = () => {
    setData({});
    setSpouseDob("");
    setDob("");
    setErrors({})
    setImage(null);
    setUpdateId();
    dispatch(clearAllDocs())
  };

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
  const handleNumberHover2 = () => {
    setShowNumber2(true);
  };

  const handleNumberMouseLeave2 = () => {
    setShowNumber2(false);
  };

  useEffect(() => {
    file &&
      getBase64(file).then((result) => {
        file["base64"] = result;
        dispatch(uploadDocs({ file: result, fileName: file?.name }));
      });
  }, [file]);

  const handleDocPopup = () => {
    docs?.length > 0 && setViewDocs(true);
  };
  const firstPhoneChange = (e) => {
    // setIsValidPhone(false);

    setFPhonVal(e);
    // handleChange("mobileNumber");
  };
  // console.log('country data', fPhonVal, isSubmit);

  useEffect(() => {
    if (data.countryId) {
      // console.log('mobile no', data.countryId);
      !location.state?.userId&& setFPhonVal('')
      const defaultCountry = countryDropdownData?.length > 0 && countryDropdownData.find((item) => {
        // console.log('item.id', data.countryId, item.countryId);
        let result = item.countryId === parseInt(data.countryId) ? item : null
        return result
      })
      // console.log('selected country is', defaultCountry);
      setCountryIso(defaultCountry?.iso2)
    }
    else{
      !location.state?.userId&& setFPhonVal('')
      setCountryIso('')
    }
  }, [data.countryId]);
  // console.log('errora', countryIso, fPhonVal);
  // console.log('country id',data.countryId);
  return (
    <div className={styles.newClientContainer} ref={elRef}>
      {linkPopup && (
        <Popup Children={ClientLink} handleClose={() => handleClose()} />
      )}

      {viewDocs && (
        <Popup
          Children={ClientDocumentList}
          handleClose={() => setViewDocs(false)}
        // handleToast={() => handleToast()}
        />
      )}

      {modal && (
        <Popup
          Children={UploadProfilePhoto}
          handleClose={() => handleClose()}
          handleToast={() => handleToast()}
          setPopupData={setImage}
          popupData={image}
        />
      )}
      {officePopup && (
        <Popup
          Children={CountryPopup}
          // popupData={data[slectedState.key] ? data[slectedState.key] : ""}
          setPopupData={slectedState.name}
          handleClose={() => handleOfficePopupClose()}
          msg={slectedState.type}
        />
      )}
      {error ? (
        <Toast
          item={status === 200 ? success : danger}
          show={showToast}
          setShow={setShowToast}
          message={error}
        />
      ) : null}
      {/* {form ? ( */}
      <form className={styles.formContent} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.clientsPrimaryDetails}>
          <p className={styles.data1}>Personal Data</p>
          <div className={styles.clientsPersonalData}>
            <div className={styles.imgBtnGrp}>
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
               // browseContent={<Upload fillColor={colors.white} />}
                type="button"
                text="Drop files to upload or Browse"
                browseFile={styles.browseFile}
                setFile={setFile}
                file={file}
                accept=".jpeg, .jpg, .png , .pdf, .docs, .doc"
              />

              {/* <UploadFile
                //title="Upload Documents"
                browseContent={" Upload Documents"}
                customClass={styles.uploadBtn1}
                accept=".jpeg, .jpg, .png , .pdf, .docs, .doc"
                setFile={setFile}
                browseFile={styles.h}
                file={file}
                type="button"
              /> */}

              <IconContainer
                customClass={styles.iconContainer}
                handleClick={() => { handleDocPopup() }}
                icon={
                  <ViewFileIcon
                    fillColor="white"
                  //  customClass={styles.manageOfficeIcon}
                  />
                }
              />
            </div>
            {/* <FilledButton
              title="Edit"
              type="button"
              customClass={styles.editBtn}
              handleClick={() => { }}
              handleMouseEnter={() => { }}
              handleMouseLeave={() => { }}
            /> */}
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
                    title={`Last checked on :  ${clientData.dueDiligenceUpdatedDate ? moment(clientData.dueDiligenceUpdatedDate).format("DD MMMM yyyy") : "-"}`}
                    subTitle={`Last checked by : ${clientData.isDueDiligenceName ? clientData.isDueDiligenceName : "-"}`}
                    customClass={styles.printTooltip}
                    customText={styles.text}
                  />
                ) : null}
                {location.state?.userId && <InfoIcon
                  fillColor="#B9B7BC"
                  customClass={styles.infoIcon}
                  onMouseOver={handleNumberHover1}
                  onMouseLeave={handleNumberMouseLeave1}
                />}
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
                    title={`Last checked on : ${clientData.amlupdatedDate ? moment(clientData.amlupdatedDate).format("DD MMMM yyyy") : "-"}`}
                    subTitle={`Last checked by : ${clientData.isAmlName ? clientData.isAmlName : "-"}`}
                    customClass={styles.printTooltip}
                    customText={styles.text}
                  />
                ) : null}
                {location.state?.userId && <InfoIcon
                  fillColor="#B9B7BC"
                  customClass={styles.infoIcon}
                  onMouseOver={handleNumberHover}
                  onMouseLeave={handleNumberMouseLeave}
                />}
              </div>

            </div>


            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="isProminentPolitical"
                className={styles.checkbox}
                value={isProminentPolitical}
                checked={isProminentPolitical}
                onChange={(e) => setIsProminentPolitical(e.target.checked)}
              />
              <p className={styles.accountText}>
                {" "}
                Is this person or entity a prominent political person or entity
              </p>
              <div className={styles.tooltipContainer}>
                {showNumber2 ? (
                  <Tooltip
                    title={`Last checked on : ${clientData.updatedDate ? moment(clientData.updatedDate).format("DD MMMM yyyy") : "-"}`}
                    subTitle={`Last checked by : ${clientData.isProminentPoliticalName ? clientData.isProminentPoliticalName : "-"}`}
                    customClass={styles.printTooltip}
                    customText={styles.text}
                  />
                ) : null}
                {location.state?.userId && <InfoIcon
                  fillColor="#B9B7BC"
                  customClass={styles.infoIcon}
                  onMouseOver={handleNumberHover2}
                  onMouseLeave={handleNumberMouseLeave2}
                />}
              </div>
            </div>
          </div>
          <Divider customClass={styles.divider} />
          <div className={styles.clientsMoreDetails}>
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
                      : ""
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
                  value={disable.stateId && !updateId ? "" : data?.stateId}
                  disable={disable.stateId}
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
                  value={disable.cityId && !updateId ? "" : data?.cityId}
                  disable={disable.cityId}
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
                  value={data.officeId ? data.officeId : ""}
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
                    data.cityId && !updateId ? handleStatePopup("Offices") : {}
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
            <div className={styles.clientType}>
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Client Acc. No"
                handleChange={handleChange("clientAccNo")}
                error={errors.clientAccNo}
                ref1={ref?.clientAccNo}
                inputerror={errors.clientAccNo}
                value={data.clientAccNo ? data.clientAccNo : ""}
                disable={true}
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Title"
                value={data.responsiblePerson ? data.responsiblePerson : ""}
                handleChange={handleChange("responsiblePerson")}
                error={errors.responsiblePerson}
                ref1={ref?.responsiblePerson}
              />
              {/* <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType}
                customClassDropdown={styles.dropdownStyle}
                type="select"
                label="Salutation"
                placeholder="Select Salutation"
                handleChange={handleChange("salutation")}
                error={errors.salutation}
                ref1={ref?.salutation}
                dropDownData={genderData}
                name="salutation"
                id="salutationId"
                value={data.salutation ? data.salutation : ""}
              /> */}

              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                maxLength={50}
                label="ID / Passport Number"
                value={data.idnumber ? data.idnumber : ""}
                handleChange={handleChange("idnumber")}
                error={errors.idnumber}
                ref1={ref?.idnumber}
              />

              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="First Name"
                value={data.firstName ? data.firstName : ""}
                handleChange={handleChange("firstName")}
                error={errors.firstName}
                ref1={ref?.firstName}
              />
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.clientType}>
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Middle Name"
                value={data.middleName ? data.middleName : ""}
                handleChange={handleChange("middleName")}
                error={errors.middleName}
                ref1={ref?.middleName}
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Last Name"
                value={data.lastName ? data.lastName : ""}
                handleChange={handleChange("lastName")}
                error={errors.lastName}
                ref1={ref?.lastName}
              />
              <TextField
                type="text"
                label="Nick Name"
                customClass={styles.labelText}
                customClassInput={styles.nickNameField}
                value={data.nickName ? data.nickName : ""}
                handleChange={handleChange("nickName")}
                error={errors.nickName}
                ref1={ref?.nickName}
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Position held"
                value={data.positionHeld ? data.positionHeld : ""}
                handleChange={handleChange("positionHeld")}
                error={errors.positionHeld}
                ref1={ref?.positionHeld}
              />
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.clientType}>
              <div className={styles.datePickerContainerMain}>
                <label className={styles.label}>Date of Birth</label>
                <YearPickerV1
                  customClass={
                    !dob && isSubmit
                      ? styles.datePickerContainerError
                      : styles.datePickerContainer
                  }
                  startDate={dob}
                  setStartDate={setDob}
                />
                {!dob && isSubmit && (
                  <span className={styles.error}>
                    Please Select Date Of Birth
                  </span>
                )}
              </div>
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Company / Trust Registration Number"
                value={data.trustRegNo ? data.trustRegNo : ""}
                handleChange={handleChange("trustRegNo")}
                error={errors.trustRegNo}
                ref1={ref?.trustRegNo}
              />
              {/* <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Mobile Number"
                value={data.mobileNo ? data.mobileNo : ""}
                handleChange={handleChange("mobileNo", true)}
                error={errors.mobileNo}
                ref1={ref.mobileNo}
                maxLength={20}
              /> */}
              <TextField
                type="tel"
                customClass={styles.labelText}
                label="Mobile Number"
                placeholder="Mobile Number"
                countryIso={countryIso}
                customclass={styles.firstNameInputField}
                customclassContainer={styles.customclassContainerDrodown}
                customclassInputType={
                  errors.mobileNumber ? styles.inputError : styles.input
                }
                name="mobileNumber"
                value={fPhonVal}
                handleChange={firstPhoneChange}
                error={
                  !fPhonVal && isSubmit
                    ? "Please enter Mobile number" : null
                }
              />

              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType1}
                type="text"
                label="Work Number"
                value={data.workNo ? data.workNo : ""}
                handleChange={handleChange("workNo")}
                error={errors.workNo}
                ref1={ref?.workNo}
                maxLength={20}
              />
            </div>
            <Divider customClass={styles.divider} />
            <div className={styles.clientType4}>
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType5}
                type="text"
                label="Email"
                value={data.email ? data.email : ""}
                handleChange={handleChange("email")}
                error={errors.email}
                ref1={ref?.email}
                disable={updateId ? true : false}
              />
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType6}
                type="text"
                label="Personal / Company / Trust Tax Number"
                value={data.sarstaxNo ? data.sarstaxNo : ""}
                handleChange={handleChange("sarstaxNo")}
                error={errors.sarstaxNo}
                ref1={ref?.sarstaxNo}
              />

              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType7}
                type="text"
                maxLength={50}
                label="Company / Trust VAT Number"
                value={data.vatno ? data.vatno : ""}
                handleChange={handleChange("vatno")}
                error={errors.vatno}
                ref1={ref?.vatno}
              />
            </div>
          </div>
        </div>
        <div className={styles.clientsMoreDetails3}>
          <p className={styles.data1}>Home Address</p>
          <div className={styles.clientType}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              customClassContainer={styles.customClassContainer}
              type="text"
              label="Street Number"
              value={data.streetNo ? data.streetNo : ""}
              handleChange={handleChange("streetNo")}
              error={errors.streetNo}
              ref1={ref?.streetNo}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Home Name"
              value={data.homeName ? data.homeName : ""}
              handleChange={handleChange("homeName")}
              error={errors.homeName}
              ref1={ref?.homeName}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Street Name"
              value={data.streetName ? data.streetName : ""}
              handleChange={handleChange("streetName")}
              error={errors.streetName}
              ref1={ref?.streetName}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Suburb"
              value={data.suburb ? data.suburb : ""}
              handleChange={handleChange("suburb")}
              error={errors.suburb}
              ref1={ref?.suburb}
            />
          </div>
          <Divider customClass={styles.divider} />
          <div className={styles.clientType1}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType2}
              type="text"
              label="Postal code"
              value={data.postalCode ? data.postalCode : ""}
              handleChange={handleChange("postalCode")}
              error={errors.postalCode}
              ref1={ref?.postalCode}
            />
          </div>
        </div>
        <div className={styles.clientsMoreDetails3}>
          <p className={styles.data1}>Bank Details</p>
          <div className={styles.clientType}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              customClassContainer={styles.customClassContainer}
              type="text"
              label="Name of Acc. Holder"
              value={data.accountHolder ? data.accountHolder : ""}
              handleChange={handleChange("accountHolder")}
              error={errors.accountHolder}
              ref1={ref?.accountHolder}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Bank"
              value={data.bank ? data.bank : ""}
              handleChange={handleChange("bank")}
              error={errors.bank}
              ref1={ref?.bank}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="select"
              label="Account Type"
              customClassDropdown={styles.dropdownStyle}
              placeholder="Select Account Type"
              handleChange={handleChange("accountType")}
              error={errors.accountType}
              ref1={ref?.accountType}
              dropDownData={accountTypeDropdownData}
              name="accountType"
              id="id"
              value={data.accountType ? data.accountType : ""}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="Account Number"
              value={data.accountNo ? data.accountNo : ""}
              handleChange={handleChange("accountNo")}
              error={errors.accountNo}
              ref1={ref?.accountNo}
            />
          </div>
          <Divider customClass={styles.divider} />
          <div className={styles.clientBankType}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              customClassContainer={styles.customClassContainer}
              type="text"
              label="Branch Code"
              value={data.branchCode ? data.branchCode : ""}
              handleChange={handleChange("branchCode")}
              error={errors.branchCode}
              ref1={ref?.branchCode}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType1}
              type="text"
              label="SWIFT Code"
              value={data.swiftCode ? data.swiftCode : ""}
              handleChange={handleChange("swiftCode")}
              error={errors.swiftCode}
              ref1={ref?.swiftCode}
            />
          </div>
        </div>

        <div className={styles.clientsMoreDetails2}>
          <p className={styles.data1}>Client Type</p>
          <div className={styles.clientType}>
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType}
              customClassDropdown={styles.dropdownStyle}
              type="select"
              label="Client Type"
              placeholder="Select Client Type"
              handleChange={handleChange("clientType")}
              error={errors.clientType}
              ref1={ref?.clientType}
              dropDownData={clientTypeDropdownData}
              name="clientType"
              id="id"
              value={data.clientType ? data.clientType : ""}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType}
              customClassDropdown={styles.dropdownStyle}
              type="select"
              label="Personality type"
              placeholder="Select Personality type"
              handleChange={handleChange("personalityType")}
              error={errors.personalityType}
              ref1={ref?.personalityType}
              dropDownData={personalityTypeDropdownData}
              name="personalityType"
              id="id"
              value={data.personalityType ? data.personalityType : ""}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType}
              customClassDropdown={styles.dropdownStyle}
              type="select"
              label="Walt Cap. Consultant"
              placeholder="Select Walt Cap. Consultant"
              handleChange={handleChange("waltCapConsultant")}
              error={errors.waltCapConsultant}
              ref1={ref?.waltCapConsultant}
              //consultantDropdownData
              dropDownData={ifaDropdownData}
              name="ifa"
              id="id"
              value={data.waltCapConsultant ? data.waltCapConsultant : ""}
            />
            <TextField
              customClass={styles.labelText}
              customClassInput={styles.inputType}
              customClassDropdown={styles.dropdownStyle}
              type="select"
              label="IFA"
              placeholder="Select IFA"
              handleChange={handleChange("ifa")}
              error={errors.ifa}
              ref1={ref?.ifa}
              dropDownData={ifaDropdownData}
              name="ifa"
              id="id"
              value={data.ifa ? data.ifa : ""}
            />
          </div>
          <Divider customClass={styles.divider} />
          <div className={styles.clientStatus}>
            <div className={styles.maritalStatus}>
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType}
                customClassDropdown={styles.dropdownStyle}
                type="select"
                label="Marital Status"
                placeholder="Select Marital Status"
                handleChange={handleChange("maritalStatus")}
                error={errors.maritalStatus}
                ref1={ref?.maritalStatus}
                dropDownData={maritalStatusData}
                name="maritalStatus"
                id="maritalStatusId"
                value={data.maritalStatus ? data.maritalStatus : ""}
              />
              <TextField
                type="text"
                label="Spouse’s Name"
                customClass={styles.spouseLabel}
                customClassInput={styles.inputType1}
                value={data.spouseName ? data.spouseName : ""}
                handleChange={handleChange("spouseName")}
                error={errors.spouseName}
                ref1={ref?.spouseName}
              />
              <div className={styles.datePickerContainerMain}>
                <label className={styles.label}>Spouse’s DOB</label>

                <YearPickerV1
                  customClass={
                    !dob && isSubmit
                      ? styles.datePickerContainerError
                      : styles.datePickerContainer
                  }
                  startDate={spouseDob}
                  setStartDate={setSpouseDob}
                />
                {!spouseDob && isSubmit && (
                  <span className={styles.error}>
                    Please Select Spouse's DOB
                  </span>
                )}
              </div>
            </div>
            <div className={styles.maritalStatus}>
              <TextField
                customClass={styles.labelText}
                customClassInput={styles.inputType}
                customClassDropdown={styles.dropdownStyle}
                customClassContainer={styles.container}
                type="select"
                label="Software Access Group"
                placeholder="Select Software Access Group"
                handleChange={handleChange("softwareAccessGroup")}
                error={errors.softwareAccessGroup}
                ref1={ref?.softwareAccessGroup}
                dropDownData={softwareGroupDropdownData}
                name="accessCategory"
                id="id"
                value={data.softwareAccessGroup ? data.softwareAccessGroup : ""}
              />
              <TextField
                type="text"
                label="2FA Serial"
                customClass={styles.spouseLabel}
                customClassContainer={styles.container}
                customClassInput={styles.inputType1}
                value={data.faserial ? data.faserial : ""}
                handleChange={handleChange("faserial")}
                error={errors.faserial}
                ref1={ref?.faserial}
              />
              {/* <TextField
                type="text"
                label="Nickname"
                customClass={styles.spouseLabel}
                customClassContainer={styles.container}
                customClassInput={styles.inputType1}
                value={data.nickName ? data.nickName : ""}
                handleChange={handleChange("nickName")}
                error={errors.nickName}
                ref1={ref?.nickName}
              /> */}
            </div>
            <div className={styles.descriptionContainer}>
              <label className={styles.label}>Note</label>
              <textarea
                className={styles.textArea}
                onChange={handleChange("notes")}
                value={data.notes ? data.notes : ""}
              ></textarea>
            </div>
          </div>
          <Divider customClass={styles.divider} />

          <div className={styles.btnGrp}>
            <FilledButton
              title="Save & Continue"
              customClass={styles.saveBtn}
              type="Submit"
              disabled={loading}
              loader={loading}
            />
            <FilledButton
              title="Cancel"
              customClass={styles.cancelBtn}
              type="button"
              handleClick={() => handleReset()}
              disabled={updateId}
            />
            <FilledButton
              title="Delete Account"
              type="button"
              customClass={styles.deleteBtn}
              handleClick={() => { }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewClient;
