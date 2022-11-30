import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link , useLocation} from "react-router-dom";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { register, emailExists, socialLogin, getUser, phoneExists } from "../_redux/authCrud";
// Custom Imports
import { Card, Button } from '@material-ui/core';
import MyTabs from './MyTabs';
import * as EmailValidator from 'email-validator';
// Cookie Details
import { useCookies } from "react-cookie";
// expire after 30 days
const COOKIE_EXPIRE_ON = 2592000;


function Registration(props) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({ isError: false, value: "", msg: "", checking: false });
  const [emailFocus, setEmailFocus] = useState(false);
  const [phone, setPhone] = useState({isError: false, value: null, msg: "", country: 'us', code: '1', number:'' });
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [customAlert, setCustomAlert] = useState({ active: false, variant: "", msg: "" });
  const[referLink,setReferLink]=useState()
  // const [promotion, setPromotion] = useState(false);

  // Cookie Setter
  const [cookies, setCookie] = useCookies(["tripwerkz-user"]);
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const signupHandler = () => {
    setCustomAlert({ ...customAlert, active: false });
    enableLoading();
    let isOK = true;
    if (!email.value) {
      setEmail({ ...email, isError: true, msg: "This is required field!" });
      isOK = false;
    }

    if (!EmailValidator.validate(email.value)) {
      setEmail({ ...email, isError: true, msg: "Invalid email" });
      isOK = false;
    }

    if (!phone.value || phone.value === phone.code) {
      setPhone({ ...phone, isError: true, msg: "This is required field!" });
      isOK = false;
    }

    if (isOK) {
      register(email.value, phone.number,parseInt(phone.code),referLink)
        .then(res => {
          disableLoading();
          if (res.status === 200) {
            setCustomAlert({ active: true, variant: "success", msg: "Please verify email to sign in." })
            setPhone({ isError: false, value: null, msg: "", country: 'us', code: '1' });
            setEmail({ isError: false, value: "", msg: "", checking: false });
            setTimeout(function () {
              setCustomAlert({ status: false, message: "", type: "" });
            }, 3000);
          } else {
            setCustomAlert({ active: true, variant: "error", msg: res.data })
            setTimeout(function () {
              setCustomAlert({ status: false, message: "", type: "" });
            }, 3000);
            disableLoading();
          }
        })
        .catch(error => {
          // console.log('signup error', error)
          disableLoading();
        });
    } else {
      disableLoading();
      console.log('not all good', email.value, phone.value);
    }
  }
  useEffect(()=>{
    let getidfromlocation = location.search;
    getidfromlocation = getidfromlocation.replace("?rb=", "");
    if(getidfromlocation){
      setReferLink(getidfromlocation)
    }
  },[])

  let getidfromlocation = location.search;
  getidfromlocation = getidfromlocation.replace("?rb=", "")
  const googleResponse = (response) => {
    setLoading(true)
    if(response.error){
      // setCustomAlert({
      //   active: true,
      //   variant: "error",
      //   msg: "Something went wrong",
      // });
      setLoading(false)
    }
    else{
      let User={
        "firstName": response.profileObj.givenName,
        "lastName": response.profileObj.familyName,
        "accessToken": response.Zb.access_token,
        "idToken": response.Zb.id_token,
        "emailId": response.profileObj.email,
        "contactNo": "",
        "acccountType": "Google",
        "referId": getidfromlocation
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

  const facebookResponse = (response) => {
    setLoading(true)
    if(response.status==="unknown"){
      // setCustomAlert({
      //   active: true,
      //   variant: "error",
      //   msg: "Something went wrong",
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
        "referId": getidfromlocation
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


  const onEmailChangeHandler = (e) => {
    let value = e.target.value;
    if (!value) {
      setEmail({ value: value, isError: true, msg: "This is required field!" })
    } 
    else if (!EmailValidator.validate(value)) {
      setEmail({ isError: false, msg: "Waiting for valid email...", value: value })
    } 
    else {
      setEmail({ value: value, checking: false, msg: 'checking...' });
      emailExists(value).then(res => {
        setEmailFocus(true);
        let data = res.data
        if (res.status === 200) {
          setEmail({ value: value, isError: false, msg: data, checking: false })
        } 
        else {
          setEmail({ value: value, isError: true, msg: data, checking: false })
        }
      }).catch(error => {
        setEmail({ value: value, isError: true, msg: error.response.data, checking: false })
      });
    }
  }

  const onPhoneChangeHandler = (data, country) => {
    let countryCode = country.dialCode
    let value = data.slice(country.dialCode.length)
    if (!value) {
      setPhone({code:countryCode,number: value, value: countryCode + value, isError: true, msg: "This is required field!" })
    }
    else {
      setPhone({ code:countryCode, value: countryCode + value, checking: true, msg: 'checking...' });
      phoneExists(countryCode,value).then(res => {
        setPhoneFocus(true);
        let data = res.data
        if (res.status === 200) {
          setPhone({code:countryCode, number: value , value: countryCode + value, isError: false, msg: "Phone available", checking: true })
        } 
        else {
          setPhone({code:countryCode, number: value, value: countryCode + value, isError: true, msg: data, checking: true })
        }
      }).catch(error => {
        setPhone({code:countryCode, number: value, value: countryCode + value, isError: true, msg: error.response.data, checking: false })
      });
    }
  } 

  return (
    <div className="mainHeading">
      <div className="col-md-12 text-center">
        <p className="mainHeadingFont">SIGN UP</p>
      </div>

      {/* <div className="col-md-4 offset-md-4 col-sm-8 offset-sm-2 col-xs-10 offset-xs-1"> */}
      <div className="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-10 offset-xs-1">
        <Card>
          <div className="card-body">
            <div className="container">
              <h3 style={{ fontWeight: 'bold' }}>Sign Up</h3>
              <p style={{ color: '#c2c2c2' }} className="mb-0">Logging in with an unregistered phone number <br />or social account creates a new Tripwerkz account.</p>
              <MyTabs
                title="Sign Up"
                formState="signup"
                onSubmitHandler={signupHandler}
                loading={loading}
                email={email}
                setEmail={onEmailChangeHandler}
                password={phone}
                setPassword={onPhoneChangeHandler}
                customAlert={customAlert}
                emailFocus={emailFocus}
                googleFunc={googleResponse}
                facebookFunc={facebookResponse}
              />

            </div>
          </div>
          <div className="card-cstm-footer">
            <div className="container">
              <p className="footer-para">Already have a Tripwerkz account?</p>
              <Link to="/auth/login"><Button className="footer-btn">Log In</Button></Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
