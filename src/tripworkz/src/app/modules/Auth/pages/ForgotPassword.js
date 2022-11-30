import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { requestPassword } from "../_redux/authCrud";
import { Card, Button, TextField } from '@material-ui/core';
import * as EmailValidator from 'email-validator';
import Alert from '@material-ui/lab/Alert';
// import FP1 from "./FP1";
// import FP2 from "./FP2";

function ForgotPassword(props) {
  const history = useHistory();
  const { intl } = props;
  // const [recoveryCode, setRecoveryCode] = useState('');
  // const [newPass, setNewPass] = useState('');
  // const [confirmNewPass, setConfirmNewPass] = useState('');
  // const [screenViewFlag, setScreenViewFlag] = useState({ enterEmail: true, sendCode: false, changePass: false });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({ isError: false, value: "", msg: "" });
  const [customAlert, setCustomAlert] = useState({ active: false, variant: "", msg: "" });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const onClickHandler = () => {
    setCustomAlert({ ...customAlert, active: false });
    enableLoading();
    let isOK = true;
    if (!email.value) {
      setEmail({ ...email, isError: true, msg: "This is required field!" });
      isOK = false;
    }

    if (email.value && !EmailValidator.validate(email.value)) {
      setEmail({ ...email, isError: true, msg: "Invalid email" });
      isOK = false;
    }

    if (isOK) {
      requestPassword(email.value)
        .then(res => {
          // props.register(accessToken);
          disableLoading();
          // let data = res.data.dataException;
          // console.log('data', data)
          if (res.status === 200) {
            setCustomAlert({ active: true, variant: "success", msg: res.data });
            setEmail({ isError: false, value: "", msg: "" });
            setTimeout(() => setCustomAlert({ active: false, variant: "", msg: "" }),5000);
          } else {
            setCustomAlert({ active: true, variant: "error", msg: "Something went wrong" })
             setTimeout(() => setCustomAlert({ active: false, variant: "", msg: "" }), 5000);
            disableLoading();
          }
        })
        .catch(error => {
          // console.log('set password error', error)
          disableLoading();
        });
    } else {
      disableLoading();
      // console.log('not all good', email.value);
    }
  }

  // const sendRecoveryHandler = () => {
  //   setScreenViewFlag({ enterEmail: false, sendCode: true, changePass: false });
  //   console.log('yes sending code on...', emailOrPhone);
  // }

  // const submitRecoveryHandler = () => {
  //   setScreenViewFlag({ enterEmail: false, sendCode: false, changePass: true });
  //   console.log('yes submitting code...', recoveryCode);
  // }

  // const submitNewPasswordHandler = () => {
  //   setScreenViewFlag({ enterEmail: true, sendCode: false, changePass: false });
  //   console.log('yes submitting New Password...', recoveryCode);
  // }

  return (
    <div className="mainHeading">
      <div className="col-md-12 text-center">
        <p className="mainHeadingFont">ACCOUNT RECOVERY</p>
      </div>
      {/* <div className="col-md-4 offset-md-4 col-sm-8 offset-sm-2 col-xs-10 offset-xs-1"> */}
      <div className="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-10 offset-xs-1">
        <Card>
          <div className="card-body">
            <div className="container">
              <p style={{ color: '#c2c2c2' }}>Recover your password. Please enter your registered Email Address or Phone Number Below to continue.</p>
              
              {customAlert.active && <Alert severity={customAlert.variant} className="mb-3">{customAlert.msg}</Alert>}

              <TextField
                color="secondary"
                label="Email Address"
                id="outlined-margin-dense"
                margin="dense"
                fullWidth
                variant="outlined"
                className="roundedTextBox"
                value={email.value}
                onChange={e => setEmail({ value: e.target.value, isError: e.target.value === "", msg: e.target.value === "" ? "This is required field!" : "" })}
                helperText={email.msg}
                error={email.isError}
              />
              <button className="loginBtn" onClick={onClickHandler} disabled={loading}>Send Recovery Email {loading && <span className="ml-3 spinner spinner-white"></span>}</button>
            </div>
            {/* {
                  screenViewFlag.enterEmail &&
                  <FP1
                    title="Recover your password. Please enter your registered Email Address or Phone Number Below to continue."
                    label="Email Address or Phone Number"
                    btnText="Send Recovery Code"
                    onClickHandler={sendRecoveryHandler}
                    fieldValue={emailOrPhone}
                    setFieldValue={setEmailOrPhone}
                  />
                }

                {
                  screenViewFlag.sendCode &&
                  <FP1
                    title="We've sent a recovery code to your registered Email. Pleaes enter the code you seen on your email to continue."
                    label="Recovery Code"
                    btnText="Confirm"
                    onClickHandler={submitRecoveryHandler}
                    fieldValue={recoveryCode}
                    setFieldValue={setRecoveryCode}
                  />
                }

                {
                  screenViewFlag.changePass &&
                  <FP2
                    title="Change your Password"
                    label1="New Password"
                    label2="Confirm New Password"
                    btnText="Confirm"
                    onClickHandler={submitNewPasswordHandler}
                    fieldValue1={newPass}
                    setFieldValue1={setNewPass}
                    fieldValue2={confirmNewPass}
                    setFieldValue2={setConfirmNewPass}
                  />
                } */}

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

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
