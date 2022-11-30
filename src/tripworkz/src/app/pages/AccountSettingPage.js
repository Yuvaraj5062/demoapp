import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import Alert from "@material-ui/lab/Alert";
import { action } from "popmotion";
import { useTranslation } from "react-i18next";
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  mainCard:{flex:"unset"}
}))
export const AccountSettingPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const { auth, main } = useSelector((state) => state);
  let passwordRegex=new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")

  const [currentPassword, setCurrentPassword] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [newPass, setNewPass] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [cNewPass, setCNewPass] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [alertStatus,setAlertStatus]=useState(false)
  const [notificationAlert, setNotificationAlert] = useState(false)
  const [notificationSetting, setNotificationSettings] = useState(null)
  const headers = {
    Authorization:`Bearer `+ auth.authToken,
    "Content-Type": "application/json",
  };
  const updatePasswordHandler = () => {
    setCNewPass({ ...cNewPass, isError: false, msg: "" });
    setNewPass({ ...newPass, isError: false, msg: "" });
    let isOK = true;
    if (!currentPassword.value) {
      setCurrentPassword({
        ...currentPassword,
        isError: true,
        msg: `${t(`This is required field!`)}`,
      });
      isOK = false;
    }

    if (!newPass.value) {
      setNewPass({ ...newPass, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }

    if (!cNewPass.value) {
      setCNewPass({
        ...cNewPass,
        isError: true,
        msg: `${t(`This is required field!`)}`,
      });
      isOK = false;
    }

    if (newPass.value && cNewPass.value && newPass.value !== cNewPass.value) {
      setCNewPass({ ...cNewPass, isError: true, msg: `${t(`Password_not_matched`)}` });
      setNewPass({ ...newPass, isError: true, msg: `${t(`Password_not_matched`)}` });
      isOK = false;
    }
    if(!passwordRegex.test(newPass.value)){
      setCNewPass({...cNewPass, isError: true, msg:`${t(`Password should contain minimum 8 characters with  atleast 1 number, 1 letter and 1 special symbol`)}`});
      isOK = false;
    }
   
    if (isOK) {
      let body = {
        "emailId": auth.user["emailId"],
        "oldPassword": currentPassword.value,
        "newPassword": cNewPass.value,
      };

      dispatch(actions.updateUserPassword(body, headers)).then((res)=>{
        setAlertStatus(true)
        setTimeout(function () {
          setAlertStatus(false)
      }, 5000);//5 Second delay 
      });
    }
  };
  const updateNotifications = () => {
    dispatch(actions.updateNotificationSettings(notificationSetting,headers)).then((res) => {
      setNotificationAlert(true)
      setTimeout(function () {
        setNotificationAlert(false)
      }, 5000);
    })
  }

  useEffect(() => {
    if(auth.user){
      dispatch(actions.getNotificationSettings({userId:auth.user.userId},headers))
    }
  },[])
  useEffect(() => {
    if(main.notifications !== null){
      setNotificationSettings(main.notifications)
    }
      
  }, [main])

  return (
    <div className={`card card-custom card-stretch`}>
      {/* begin::Header */}
      {/* <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
             {t(`Manage login methods`)}
          </span>
          <span className="mt-2 font-weight-light font-size-sm">    
            {t(`Manage how you log in to your Tripwerkz account. You can use your
            email address or phone number.`)}
          </span>
        </h3>
      </div> */}
      <div style={{ backgroundColor: "#F5F5F5", padding: "10px 20px" }}>
        <span style={{
          fontWeight: "600",
          fontSize: "18px",
          color: "#287CBC"
        }}>
         {t(`Login & Account Settings`)}
        </span><br />
        <span style={{
          fontWeight: "400",
          fontSize: "13px",
          marginTop:"1px"
        }}>{t(`Manage how you log in to your Tripwerkz account. You can use your email address or phone number.`)}</span>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className={["card-body", classes.mainCard].join(' ')}>
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-column align-items-cente py-2 w-75">
              <p className="text-dark-75 font-weight-bold font-size-lg mb-1">
                 {t(`Email & phone number`)}
              </p>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="custom-block">
                  <div class="float-left">
                    <p className="font-weight-bold mb-0">{t(`Email Address`)}</p>
                    <p className="text-muted mt-0 mb-0">
                      {auth.user!==null?auth.user.emailId:""}
                    </p>
                  </div>
                
                </div>
              </div>
              <div className="col-md-6">
                <div className="custom-block">
                  <div class="float-left">
                    <p className="font-weight-bold mb-0"> {t(`Phone Number`)}</p>
                    <p className="text-muted mt-0 mb-0">
                      {auth.user!==null?auth.user.contactNo:""}
                    </p>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>

     
      </div>
      {/* end::Body */}

      {/* begin::Header */}
      {localStorage.getItem("UserType") === "ManualLogin" && (
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            {t(`Change Password`)}
          </span>
          <span className="mt-2 font-weight-light font-size-sm">
            
            {t(`Try changing your password regularly to make your account safer.`)}
          </span>
        </h3>
      </div>
      )}
      {/* end::Header */}

      {/* begin::Body */}
      {localStorage.getItem("UserType") === "ManualLogin" && (
      <div className="card-body py-0">
        <div className="row">
          <div className="col-md-7">
            {main.updatePasswordStat && alertStatus && (
              <Alert severity={main.updatePasswordStat.status} className="mb-3">
                {main.updatePasswordStat.msg}
              </Alert>
            )}
            {cNewPass.isError && cNewPass.msg === "Password not matched!" && (
              <Alert severity="error" className="mb-3">
                {cNewPass.msg}
              </Alert>
            )}
            {cNewPass.isError && <Alert severity="error" className="mb-3">
                {cNewPass.msg}
              </Alert>}
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="password"
                placeholder={t(`Enter current password`)}
                className="rounded-shape"
                value={currentPassword.value}
                onChange={(e) =>
                  setCurrentPassword({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg:
                      e.target.value === ""
                        ? `${t(`Please enter your existing password`)}`
                        : "",
                  })
                }
                isInvalid={currentPassword.isError}
              />
              
              <span style={{ color: "red", fontSize: 10, marginLeft: 5 }}>
                {currentPassword.msg}
              </span>
            </Form.Group>
          </div>
        </div>
        <p>
          {t(` New Password (Minimum 8 characters with at least 1 letter, 1 number and 1 special symbol)`)}
         
        </p>
        <div className="row mb-0">
          <div className="col-md-7">
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="password"
                placeholder={t(`Password`)}
                className="rounded-shape"
                value={newPass.value}
                onChange={(e) =>
                  setNewPass({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={newPass.isError}
              />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="password"
                placeholder= {t(`Confirm Password`)}
                className="rounded-shape"
                value={cNewPass.value}
                onChange={(e) =>
                  setCNewPass({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={cNewPass.isError}
              />
            </Form.Group>
          </div>
        </div>
        <div className="row mb-1 pb-5">
          <div className="col-md-2">
            <button
              className="loginBtn"
              onClick={updatePasswordHandler}
              disabled={main.updatePasswordLoader}
            >
              {t(`Save`)}
              {main.updatePasswordLoader && (
                <span className="ml-3 spinner spinner-white"></span>
              )}
            </button>
          </div>
        </div>
      </div>
      )}
      {/* end::Body */}

      {/* begin::Header */}
      <div className="card-header border-0 ">
        <h3 className="card-title align-items-start flex-column">
          {
            notificationAlert && main.notificationStatus !== null?
            <Alert severity={main.notificationStatus.status} className="mb-3">{main.notificationStatus.msg}</Alert>
            :null
          }
          <span className="card-label font-weight-bolder text-dark">
            {t(`Notification settings`)}
          </span>
          <span className="mt-2 font-weight-light font-size-sm">
            {t(`What notifications do you want to see?`)}
          </span>
        </h3>
      </div>
      
      {/* end::Header */}

    {/* begin::Body */}
      <div className="card-body py-0">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-column align-items-cente py-2 w-75">
              <p className="text-dark-75 font-weight-bold font-size-lg mb-1">
                {t(`Updates and promotions`)}
              </p>
              <span className="text-muted font-weight-bold">
              {t(`Be first to know about our latest campaigns, promo codes,  discounts and new features`)}
                
               
              </span>
            </div>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check inline type="checkbox" 
              checked={notificationSetting !== null ? notificationSetting.updatenpramotionEmail: false}
              onChange={(e) => setNotificationSettings((prev) => {
                return {...prev, updatenpramotionEmail: !prev.updatenpramotionEmail}
              })}
              label={t(`Email`)} />
              <Form.Check
                inline
                type="checkbox"
                label="SMS"
                className="ml-20"
                checked={notificationSetting !== null ? notificationSetting.updatenpromotionSMS: false}
                onChange={(e) => setNotificationSettings((prev) => {
                  return {...prev, updatenpromotionSMS: !prev.updatenpromotionSMS}
                })}
              />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-column align-items-cente py-2 w-75">
              <p className="text-dark-75 font-weight-bold font-size-lg mb-1">
                {t(`Reminders`)}
              </p>
              <span className="text-muted font-weight-bold">
              {t(`Get reminders about your cart, payments, review and referring friends`)}
                
              </span>
            </div>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check inline type="checkbox" 
              checked={notificationSetting !== null ? notificationSetting.reminderEmail: false}
              onChange={(e) => setNotificationSettings((prev) => {
                return {...prev, reminderEmail: !prev.reminderEmail}
              })}
              label={t(`Email`)} />
              <Form.Check
                inline
                type="checkbox"
                label={t(`SMS`)}
                checked={notificationSetting !== null ? notificationSetting.reminderSMS: false} 
                onChange={(e) => setNotificationSettings((prev) => {
                  return {...prev, reminderSMS: !prev.reminderSMS}
                })}
                className="ml-20"
              />
            </Form.Group>
          </div>
        </div>

        <div className="row mb-1">
          <div className="col-md-12">
            <div className="d-flex flex-column align-items-cente py-2 w-75">
              <p className="text-dark-75 font-weight-bold font-size-lg mb-1">
                {t(`Account Notifications`)}
              </p>
              <span className="text-muted font-weight-bold">
              {t(`For important notifications on booking summaries, vouchers and cancellations`)}
                
              </span>
            </div>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check inline type="checkbox"
              checked={notificationSetting !== null ? notificationSetting.accountnotificationEmail: false}  
              onChange={(e) => setNotificationSettings((prev) => {
                return {...prev, accountnotificationEmail: !prev.accountnotificationEmail}
              })}
              label= {t(`Email`)} />
              <Form.Check
                inline
                type="checkbox"
                label={t(`SMS`)}
                className="ml-20"
                checked={notificationSetting !== null ? notificationSetting.accountnotificationSMS: false}  
                onChange={(e) => {
                  setNotificationSettings((prev) => {
                    return {...prev, accountnotificationSMS : !prev.accountnotificationSMS}
                })}
              }
              />
            </Form.Group>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-2">
            <button className="loginBtn" onClick={() => updateNotifications()}>
               {t(`Update`)}
              {main.updateNotificationLoader ?
                <span className="ml-3 spinner spinner-white"></span>
                :null
              }</button>
          </div>
        </div>
      </div>
      
      {/* end::Body */}

      {/* begin::Header */}
      {/* <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Delete account
          </span>
          <span className="mt-2 font-weight-light font-size-sm">
            If you want to delete account and any personal data on Tripwerkz
          </span>
        </h3>
      </div>
       */}
      {/* end::Header */}
    
    </div>
  );
};
