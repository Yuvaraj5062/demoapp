import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import Alert from "@material-ui/lab/Alert";
import './Css/refermyfriend.css'
import { useTranslation } from "react-i18next";
import { FacebookMessengerShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'
const useStyles = makeStyles((theme) => ({

    UserLinksInformer: { position: 'relative', },
    CopyLinked: { position: 'absolute', top: '0px', right: '0px', paddingLeft: '1px' },
    CopyBtnCreater: { backgroundColor: '#287CBC', border: 'none', padding: '10px 20px', color: '#fff', borderRadius: '25px', },
    FaceBookInformer: { width: '100%', float: 'left', padding: '9px 15px', backgroundColor: '#39579a', color: '#fff', border: 'none', borderRadius: '25px' },
    Messenger: { width: '100%', float: 'left', padding: '9px 15px', backgroundColor: '#0087ff', color: '#fff', border: 'none', borderRadius: '25px' },
    Twitter: { width: '100%', float: 'left', padding: '12px 15px', backgroundColor: '#059ff5', color: '#fff', border: 'none', borderRadius: '25px' },
    SendMessagerInform: { width: '100%', backgroundColor: '#287CBC', border: 'none', padding: '10px 25px', color: '#fff', borderRadius: '25px', },
    SendMailInform: { width: '100%', backgroundColor: '#287CBC', border: 'none', padding: '10px 35px', color: '#fff', borderRadius: '25px', },

    inputLabel: { fontWeight: "500", fontSize: "14px", marginTop: "3px", marginLeft: "1px", marginBottom: "2px" }
}))
export const ReferMyFriend = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state);
    const [referLink, setReferLink] = useState(null)
    const { t } = useTranslation();
    const [loader, setloader] = useState(false)
    const [alertStatus, setAlertStatus] = useState({
        message: '',
        type: '',
        status: false
    })
    const [sendReferEmail, setSendReferEmail] = useState()

    const headers = {
        Authorization: 'Bearer ' + auth.authToken,
        "Content-Type": "application/json",
    };

    const copyLink = () => {
        setloader(true)
        navigator.clipboard.writeText(referLink);
        setAlertStatus({
            message: `${t(`Copied to clipboard`)}`,
            type: "success",
            status:'true'
        })
        setloader(false)
        setTimeout(function () {
            setAlertStatus({ message: "", type: "",status:false })
        }, 5000);//5 Second delay   
    }

    const emailChange = (e) => {
        setSendReferEmail(e.target.value)
    }
    const sendMail = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(sendReferEmail)) {
            setAlertStatus((prev) => {
                return { ...prev, status: true }
            })
            dispatch(actions.sendReferEmail(referLink, sendReferEmail, headers)).then((res) => {
                setSendReferEmail(null)
                setAlertStatus({
                    message: `${t(`Success`)}`,
                    type: "success",
                    status: false
                })
              
                setTimeout(function () {
                    
                    setAlertStatus({ message: "", type: "", status: false })
                }, 5000);//5 Second delay   
            }).catch((error) => {
                setAlertStatus({
                    message: `${t(`Something went wrong`)}`,
                    type: "error",
                    status: false
                })
                setTimeout(function () {
                    setAlertStatus({ message: "", type:"", status: false })
                }, 5000);//5 Second delay   
            })
        }
        else {
            setAlertStatus({
                message: `${t(`Please provide an valid email`)}`,
                type: "error",
                status: false
            })
            setTimeout(function () {
                setAlertStatus({ message: "", type: "", status: false })
            }, 5000);//5 Second delay   
        }
    }

    useEffect(() => {
        if (auth.user) {
            dispatch(actions.getUserReferLink(auth.user.emailId, headers)).then((res) => {
                setReferLink(res)
            })
        }
    }, [])
    let subStr
    if (referLink) {
        subStr = referLink.substr(0, 90) + '....'
    }
    const classes = useStyles();
    useEffect(()=>{
        setSendReferEmail('')
    },[alertStatus])
    return (
        <div className={`card card-custom card-stretch`}>
            <div className="referMyFriendHeader">
                <span className="referMyFriendHeaderText">
                    {t(`Refer-my-friend`)}
                </span>
                <span>{t(`Earn rewards when you invite your friends.`)}</span>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <div className={'pt-5 pl-6 pr-10'}>
                            {/* <h3 style={{fontSize:'16px'}}>{t(`Invite Your friends to Tripwerkz`)}</h3> */}
                           
                        </div>

                        <div className={' pl-6 pr-10'}>
                            {alertStatus.message !== '' && <Alert severity={alertStatus.type} className="mb-3">
                                {alertStatus.message}
                            </Alert> }

                            <span className={classes.inputLabel}>{t(`Invite with link`)}</span>
                            <div className={classes.UserLinksInformer}>
                                <input placeholder={t(`Userlink`)} type="text" id="fuserlink" className="rounded-shape form-control mt-2 mb-4" value={subStr} disabled />
                                <div className={classes.CopyLinked}>
                                    <button onClick={copyLink} className={classes.CopyBtnCreater}>{t(`Copy Link`)}</button>
                                </div>
                            </div>
                            <span className={classes.inputLabel}>{t(`Share Via`)}</span>

                            <div className="row pt-3 pb-3">
                                <div className="col-md-4 col-sm-4 col-lg-4 col-6">
                                    <FacebookShareButton url={referLink} quote={referLink} style={{ width: 'inherit' }} children={<button className={classes.FaceBookInformer}><i class="fab fa-facebook-square p-2" style={{ color: '#fff' }}></i>{t(`Facebook`)}</button>}></FacebookShareButton>
                                </div>
                                <div className="col-md-4 col-sm-4 col-lg-4 col-6">
                                    {/* //829848837709229 */}
                                    <FacebookMessengerShareButton appId="359126849373894" url={referLink} style={{ width: 'inherit' }}
                                        children={
                                            <button className={classes.Messenger}><i class="fab fa-facebook-messenger p-2" style={{ color: '#fff', }}></i>{t(`Messenger`)} </button>
                                        }></FacebookMessengerShareButton>
                                </div>
                                <div className="col-md-4 col-sm-4 col-lg-4 col-6">
                                    <TwitterShareButton url={referLink} style={{ width: 'inherit' }} children={
                                        <button className={classes.Twitter}><i class="fab fa-twitter pl-2 pr-2 pt-1 pb-1" style={{ color: '#fff', }}></i>{t(`Twitter`)} </button>
                                    }></TwitterShareButton>
                                </div>
                            </div>


                            <span className={classes.inputLabel}>{t(`Invite with email`)}</span>
                            <div className={classes.UserLinksInformer}>
                                <input placeholder={t(`Please enter email address to refer`)} type="email" id="fuserlink" class="rounded-shape form-control mt-3" onChange={emailChange} value={sendReferEmail} />
                                <div className={classes.CopyLinked}>
                                    <button className={classes.SendMailInform} onClick={sendMail}>{loader ? <span className="mr-5 spinner spinner-white" /> : `${t(`Send`)}`}</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};
