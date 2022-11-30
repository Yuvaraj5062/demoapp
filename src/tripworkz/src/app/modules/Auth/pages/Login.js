import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login, getUser, socialLogin,getCountry } from "../_redux/authCrud";
import { useTranslation } from "react-i18next";
// Custom Imports
import { Card, Button } from "@material-ui/core";
import MyTabs from "./MyTabs";
import * as EmailValidator from "email-validator";

// Cookie Details
import { useCookies } from "react-cookie";
// expire after 30 days
const COOKIE_EXPIRE_ON = 2592000;

// const initialValues = {
//   email: "admin@demo.com",
//   password: "demo",
// };

function Login(props) {
  const { intl } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [remember,setRemember] =React.useState(localStorage.getItem("rPass") ? true : false)
  const [email, setEmail] = useState({
    isError: false,
    value: "",
    msg: "",
    checking: false,
  });
  const [password, setPassword] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [customAlert, setCustomAlert] = useState({
    active: false,
    variant: "",
    msg: "",
  });
  const [countryDetail,setCountryDetail]= useState()

  // Cookie Setter
  const [cookies, setCookie] = useCookies(["tripwerkz-user"]);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  React.useEffect(() => {
    const val = localStorage.getItem("rUserName")
    const pass = localStorage.getItem("rPass")
    setEmail({
      isError: false,
      value: val?val:'',
      msg: "",
      checking: false,
    });
    setPassword({
      isError: false,
      value: pass ? pass : '',
      msg: "",
    });
    getCountry().then((res)=>{
      
      setCountryDetail(res.data)
    })

  }, []);



  const onSubmitHandler = () => {
    localStorage.removeItem("rUserName")
    localStorage.removeItem("rPass")
  
    if (remember) {
      localStorage.setItem("rUserName", email.value);
      localStorage.setItem("rPass", password.value);
    }
    setCustomAlert({ ...customAlert, active: false });
    enableLoading();
    let isOK = true;
    if (!email.value) {
      setEmail({ ...email, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }

    if (email.value && !EmailValidator.validate(email.value)) {
      setEmail({ ...email, isError: true, msg: `${t(`Invalid email`)}` });
      isOK = false;
    }

    if (!password.value) {
      setPassword({
        ...password,
        isError: true,
        msg: `${t(`This is required field!`)}`,
      });
      isOK = false;
    }

    if (isOK) {
      
      login(email.value, password.value,countryDetail.country_name,countryDetail.currency,countryDetail.currency_name)
        .then((res) => {
          disableLoading();
          localStorage.setItem("UserType", res.data.type);
          let data = res.data;
          if (res.status === 200) {
            if (remember) {
              localStorage.setItem("rUserName", email.value);
              localStorage.setItem("rPass", password.value);
            }
            else {
              localStorage.removeItem("rUserName")
              localStorage.removeItem("rPass")
            }
            let authKey = data.token;
            let header = {
              'Authorization': 'Bearer ' + authKey,
              // "Content-Type": "application/json",
            };
 
            getUser(email.value, header)
              .then((user) => {
                
                if (user.status === 200) {
              
                  setCustomAlert({
                    active: true,
                    variant: "success",
                    msg: `${t(`Success`)}`,
                  });
                  
                  setTimeout(function () {
                    setCustomAlert({ status: false, message: "", type: "" });
                  }, 3000);
                  setEmail({
                    isError: false,
                    value: "",
                    msg: "",
                    checking: false,
                  });
                  setPassword({ isError: false, value: "", msg: "" });
                  // set cookies
                  setCookie("tripwerkz-user", user.data, {
                    path: "/",
                    maxAge: COOKIE_EXPIRE_ON,
                    domain: "localhost:3000",
                  });
                  props.login({ authKey: authKey, user: user.data,countryDetail:data });
                } else {
                  setCustomAlert({
                    active: true,
                    variant: "error",
                    msg: user.dataException.err_code,
                  });
                  setTimeout(function () {
                    setCustomAlert({ status: false, message: "", type: "" });
                  }, 3000);
                  disableLoading();
                }
              })
              .catch((user_error) => {
               // console.log("Get user error", user_error);
                disableLoading();
              });
          } else {
            setCustomAlert({
              active: true,
              variant: "error",
              msg: data.dataException.err_msg,
            });
            // setTimeout(() => setCustomAlert({ active: false, variant: "", msg: "" }), 4000);
            disableLoading();
          }
        })
        .catch((error) => {
          //console.log("login error", error.response);
          if(error.response){
            // if(error.response.status === 400){
              setCustomAlert({
                active: true,
                variant: "error",
                msg: error.response.data,
              });
              setTimeout(function () {
                setCustomAlert({ status: false, message: "", type: "" });
              }, 3000);
            // }
          }else{
            setCustomAlert({
              active: true,
              variant: "error",
              msg: `${t(`Something went wrong`)}`,
            });
            setTimeout(function () {
              setCustomAlert({ status: false, message: "", type: "" });
            }, 3000); 
          }
          disableLoading();
        });
    } else {
      disableLoading();
      
    }
  };


  const googleResponse = (response) => {
    setLoading(true)
    if(response.error){
      setCustomAlert({
        active: true,
        variant: "error",
        msg: `${t(`Something went wrong`)}`,
      });
      setTimeout(function () {
        setCustomAlert({ status: false, message: "", type: "" });
      }, 3000);
      setLoading(false)
    }
    else{
      let User={
        "firstName": response.profileObj.givenName,
        "lastName": response.profileObj.familyName,
        "accessToken": response.tokenObj.access_token,
        "idToken": response.tokenObj.id_token,
        "emailId": response.profileObj.email,
        "contactNo": "",
        "acccountType": "Google",
        "referId": ""
      }
      socialLogin(User).then((res)=>{
        
        let authKey = res.data.token;
        localStorage.setItem("UserType", res.data.type);
        let header = {
          'Authorization': 'Bearer ' + res.data.token,
          // "Content-Type": "application/json",
        };
        getUser(res.data.emailId,header).then((user)=>{
          
          setCookie("tripwerkz-user", user.data, {
            path: "/",
            maxAge: COOKIE_EXPIRE_ON,
            domain: "localhost:3000",
          });
          props.login({ authKey: authKey, user: user.data });
        })
      })
    }
  }

  const facebookResponse = (response) => {
    setLoading(true)
    localStorage.setItem("UserType", "");
    if(response.status==="unknown"){
      // setCustomAlert({
      //   active: true,
      //   variant: "error",
      //   msg: `${t(`Something went wrong`)}`,
      // });
      setLoading(false)
    }
    else{
      if(response.email){
        let firstName=response.name.split(" ")[0]
      let lastName=response.name.split(" ")[1]
      let User={
        "firstName": firstName,
        "lastName": lastName,
        "accessToken": response.accessToken,
        "idToken": response.id,
        "emailId": response.email,
        "contactNo": "",
        "acccountType": "Facebook",
        "referId": ""
      }
      socialLogin(User).then((res)=>{
        let authKey = res.data.token;
        let header = {
          'Authorization': 'Bearer ' + res.data.token,
          // "Content-Type": "application/json",
        };
        getUser(res.data.emailId,header).then((user)=>{
          setCookie("tripwerkz-user", user.data, {
            path: "/",
            maxAge: COOKIE_EXPIRE_ON,
            domain: "localhost:3000",
          });
          props.login({ authKey: authKey, user: user.data });
        })
      })
      }
    }
}

  const emailHandler = (e) => {
    setEmail({
      value: e.target.value,
      isError: e.target.value === "",
      msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
      checking: false,
    });
  };

  return (
    <div className="mainHeading">
      <div className="col-md-12 text-center">
        <p className="mainHeadingFont">{t(`LOG IN`)}</p>
      </div>

      <div className="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-10 offset-xs-1">
        {/* <div className="col-md-4 offset-md-4"> */}
        <Card>
          <div className="card-body">
            <div className="container">
              <h3 style={{ fontWeight: "bold" }}>{t(`Log In`)}</h3>
              <p style={{ color: "#c2c2c2" }} className="mb-0">
                {t(`Logging in with an unregistered phone number`)} <br />
                {t(`or social account creates a new Tripwerkz account`)}
                .
              </p>
              <MyTabs
                title="Log In"
                formState="login"
                loading={loading}
                onSubmitHandler={onSubmitHandler}
                remember={remember}
                setRemember={setRemember}
                email={email}
                setEmail={emailHandler}
                password={password}
                setPassword={setPassword}
                customAlert={customAlert}
                googleFunc={googleResponse}
                facebookFunc={facebookResponse}
              />
            </div>
          </div>
          <div className="card-cstm-footer">
            <div className="container">
              <p className="footer-para">{t(`No account yet? Sign up now`)}!</p>
              <Link to="/auth/registration">
                <Button className="footer-btn">{t(`Sign up`)}</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
