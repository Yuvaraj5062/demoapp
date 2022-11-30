import React, { useState } from 'react'
import Modal from "@material-ui/core/Modal";
import { Backdrop, Fade, makeStyles } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import * as EmailValidator from "email-validator";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../../../app/components/_redux/mainActions";
import Alert from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: "#F7F6F8",
        border: "1px solid #287CBC",
        boxShadow: 5,
        padding: 10,
        borderRadius: 20,
        width: "600px"
      },
});


export const UseVoucherModal= (props) =>  {
    const classes = useStyles();
    const {auth} = useSelector((state) => state)
    const dispatch = useDispatch()
    const [voucherUseType, setVoucherUseType] = useState('')
    const [loader, setLoader] = useState(false)
    const { t } = useTranslation();
    const [customAlert, setCustomAlert] = useState({
        show:false,
        variant:'',
        msg:''
    })
    const [email, setEmail] = useState({
        value: '',
        isError: false,
        msg:'',
      })
      const headers = {
        Authorization:`Bearer `+ auth.authToken,
        "Content-Type": "application/json",
      };
    const resetCustomAlert = () => {
        setTimeout(() => {
            setCustomAlert({show:false,variant:'',msg:''})
        },2000)
    }
    const handleVoucherUse = () => {
        setLoader(true)
        let isOK=true
        
        if(voucherUseType === "gift"){
            if (email.value === '') {
                setEmail({ ...email, isError: true, msg: `${t(`Invalid email`)}` });
                setCustomAlert({show:true, variant:'error', msg:`${t(`Please provide an valid email`)}`})
                setLoader(false)
                isOK = false;
                setTimeout(() => {
                    setCustomAlert({show:false,variant:'',msg:''})
                },2000)
            }
            if (email.value && !EmailValidator.validate(email.value)) {
                setEmail({ ...email, isError: true, msg: `${t(`Please provide an valid email`)}` });
                setCustomAlert({show:true, variant:'error', msg:`${t(`Please provide an valid email`)}`})
                setLoader(false)
                isOK = false;
                setTimeout(() => {
                    setCustomAlert({show:false,variant:'',msg:''})
                },2000)
            }
        }
        if(isOK) {
            
            if(voucherUseType === "redeem"){  
                console.log("props",props)    
                let payload={
                    "userId": auth.user.userId,
                    "voucherId": props.voucher.id
                }
                dispatch(actions.redeemVoucher(headers,payload)).then((res) => {
                    if(res.status === 200){
                        setVoucherUseType('')
                        setCustomAlert({show:true, variant:'success', msg:`${t(`Please check email to redeem voucher`)}`})
                        resetCustomAlert()
                        setTimeout(() => {
                            props.closeModal()
                        },2000)
                        setLoader(false)
                    }else{
                        setCustomAlert({show:true, variant:'error', msg:res.response.data})
                        resetCustomAlert()
                        setTimeout(() => {
                            props.closeModal()
                        },2000)
                        setLoader(false)
                    }
                }).catch((err) => {
                    setCustomAlert({show:true, variant:'error', msg:`${t(`Something went wrong`)}`})
                    setLoader(false)
                })

            }else if(voucherUseType === "gift"){
                let payload={
                    "useR_ID": auth.user.userId,
                    "voucheR_ID": props.voucher.id,
                    "emaiL_ID": email.value
                }
                dispatch(actions.giftVoucher(headers,payload)).then((res) => {
                    if(res.status === 200){
                        setVoucherUseType('')
                        setCustomAlert({show:true, variant:'success', msg:res.data})
                        resetCustomAlert()
                        setTimeout(() => {
                            props.closeModal()
                        },2000)
                        setLoader(false)
                    }else{
                        setCustomAlert({show:true, variant:'error', msg:res.response.data})
                        resetCustomAlert()
                        setTimeout(() => {
                            props.closeModal()
                        },2000)
                        setLoader(false)
                    }
                }).catch((err) => {
                    setCustomAlert({show:true, variant:'error', msg:`${t(`Something went wrong`)}`})
                    setLoader(false)
                })
            }

        }
    }
    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.openModal}
            // onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
            <Fade in={props.openModal}>
              <div className={classes.paper}>
                <h2 className="m-5" id="transition-modal-title ">
                   {t(`Use Voucher to`)}:
                </h2>
                <div className="col-md-12">
                    {
                        customAlert.show ?
                        <Alert severity={customAlert.variant} className="mb-3">{customAlert.msg}</Alert>
                        :null
                    }
                    <div className="custom-block">
                        <input type="radio" name="payment_method" value="redeem" onChange={(e) => {
                            setVoucherUseType(e.target.value)
                            setEmail({value: '',isError: false,msg:''})
                            }} ></input>
                        <label className="font-weight-bold ml-3">{t(`Redeem`)}</label>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="custom-block mt-5">
                        <input type="radio" name="payment_method" value="gift" onChange={(e) => {
                            setVoucherUseType(e.target.value)
                            setEmail({value: '',isError: false,msg:''})
                        }}></input>
                        <label className="font-weight-bold ml-3">{t(`Gift to friend`)}</label>
                        {
                            voucherUseType === 'gift'?
                                <Form.Group controlId="formBasicEmail">
                                    {/* <Form.Label>Points</Form.Label> */}
                                    <Form.Control
                                        type="text"
                                        className="rounded-shape"
                                        placeholder="Email"
                                        value={email.value}
                                        onChange={(e) =>
                                        setEmail({
                                            value: e.target.value,
                                            isError: e.target.value === "",
                                            msg: e.target.value === "" ? `${t(`"This is required field!"`)}` : "",
                                        })
                                        }
                                        isInvalid={email.isError}
                                    />
                                </Form.Group>
                                :null
                        }
                    </div>
                </div>
                <div className="text-center m-5">
                  <button
                    className="btn btn-outline-primary btn-md m-5 w-25"
                    disabled={voucherUseType === '' ? true : false}
                    style={{background: "#287CBC",
                        color: "#ffffff",
                        fontSize: "13px",
                        fontWeight: "400"}}
                    onClick={() => handleVoucherUse()}
                  >
                     {t(`Use`)}{"  "}
                    {loader && (
                        <span className="ml-3 spinner spinner-white"></span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                        props.closeModal()
                        setVoucherUseType('')
                    }}
                    disabled={loader}
                    className="btn  w-25 btn-md m-2"
                    style={{background: "#287CBC",
                        color: "#ffffff",
                        fontSize: "13px",
                        fontWeight: "400"}}
                  >
                    {t(`Cancel`)}
                  </button>
                </div>
              </div>
            </Fade>

        </Modal>
    )
}