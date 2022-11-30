import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import { useLocation } from "react-router";
import Alert from '@material-ui/lab/Alert';
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import styles from './Css/clientqueryreply.module.scss'
import Moment from 'moment';


import { UserLogo } from '../../_metronic/_partials/controls/SVGIcon';
const useStyles = makeStyles((theme) => ({
  BoxContainer: {
    width: "100%",
    float: "left",
    padding: "10px 0px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "4% "
  },
  PromotionsTicketTab: {
    fontWeight: "500", fontSize: "18px", color: "#636363", cursor: "pointer"
  },
  PromotionsMainHeader: { backgroundColor: "#F5F5F5", padding: "10px 20px" },
  PromotionsHeader: { fontWeight: "600", fontSize: "18px", color: "#287CBC" },
  PromotionsSubHeader: { fontWeight: "400", fontSize: "13px" },
  input:{borderWidth: "0px"}

}))

export default function ClientQueryReplay() {
  let { id } = useParams();
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const queryId = location.pathname.split('/')
  const { auth, admin } = useSelector((state) => state);
  const [adminReply, setAdminReply] = useState([]);
  const [replyMsg, setReplyMsg] = useState({
    isError: false, value: "", msg: ""
  });

  const [valAlertStatus, setValAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });


  const headers = {
    Authorization: "Bearer " + auth.authToken,
    "Content-Type": "application/json",
  };

  const handleClose = () => {
    setReplyMsg({ isError: false, value: "", msg: "" });
    history.push(
      "/open-ticket"
    )
  };
  useEffect(() => {
    dispatch(actions.getAllHistory(queryId[3])).then((response) => {
    console.log("calling",response)
      if (response) {     
      setAdminReply(response)
      }
    })
    .catch((error) => {
      setValAlertStatus({
        active: true,
        variant: "error",
        msg: `${t(`Something went wrong`)}`,
      });

      setTimeout(function () {
        setValAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    });
    
  }, []);

  const onHandelReply = () => {
    let isOK = true;
    if (!replyMsg.value) {
      setValAlertStatus({
        status: true,
        message: `${t(`Please enter reply message`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setValAlertStatus({ status: false, message: "", type: "" });
      }, 3000); //5 Second delay

      return null;
    }
    if (isOK) {
      let body = {
        queryId: queryId[3],
        queryReply: replyMsg.value,
        replyOn: new Date(),
        replyBy: auth.user.userId

      };
      dispatch(actions.addReplyTicketIssue(body, headers))
        .then((response) => {
          if (response.responseCode === 200) {
            setReplyMsg({ isError: false, value: "", msg: "" });

            setValAlertStatus({
              status: true,
              message: `${t(`Reply sent successfully`)}`,
              type: "success",
            });

            setTimeout(function () {
              setValAlertStatus({ status: false, message: "", type: "" });
              handleClose();
            }, 5000); //5 Second delay


            return null;
          } else {
            setValAlertStatus({
              status: true,
              message: `${t(`Something went wrong`)}`,
              type: "error",
            });

            setTimeout(function () {
              setValAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay

            return null;
          }
        })
        .catch((error) => {
          setValAlertStatus({
            active: true,
            variant: "error",
            msg: `${t(`Something went wrong`)}`,
          });

          setTimeout(function () {
            setValAlertStatus({ status: false, message: "", type: "" });
          }, 5000); //5 Second delay

          return null;
        });
    }
  };
  const evaluateDate = (e) => {
    let options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };
  

  const handleClsoeTicket = () => {
    const headers = {
      Authorization: `Bearer ` + auth.authToken,
      "Content-Type": "application/json",
    };
    let body = {
      id: queryId[3]
    }

    if(queryId[4]==="open-ticket"){
    
      dispatch(actions.OpenTicket(body, headers))
        .then((response) => {
          setValAlertStatus({
            status: true,
            message: `${t(`Ticket Opened Successfully`)}`,
            type: "success",
          });
       setTimeout(() => {
                setValAlertStatus({
                  status: false,
                  message: "",
                  type: "",
                });
                handleClose()
              }, 5000)
  
        }).catch((error) => {
  
          setValAlertStatus({
            status: true,
            message: `${t(`Something went wrong`)}`,
            type: "error",
          });
         handleClose()
        });

    }
else{
    dispatch(actions.CloseTicket(body, headers))
      .then((response) => {
        setValAlertStatus({
          status: true,
          message: `${t(`Ticket Closed Successfully`)}`,
          type: "success",
        });
     setTimeout(() => {
              setValAlertStatus({
                status: false,
                message: "",
                type: "",
              });
              handleClose()
            }, 5000)

      }).catch((error) => {

        setValAlertStatus({
          status: true,
          message: `${t(`Something went wrong`)}`,
          type: "error",
        });
       handleClose()
      });
    }

  }

 console.log("adminReply",adminReply) 
  return (


    <div className={styles.MainContainer}>
      <div className={styles.Header}>
        <span className={styles.HeaderText}>{t(`Show History`)}</span>
        <div className={styles.buttonHeader}><button className={styles.HeaderButton1} onClick={()=>handleClose()}>{t(`Back`)}</button>
        <button className={styles.HeaderButton} onClick={() => { handleClsoeTicket() }}> {queryId[4]==="open-ticket"?"Open Ticket":"Close Ticket"}</button>
        </div>
      </div>
      <div className={styles.AlertStatus}>
                       {valAlertStatus.status && (
                         <Alert severity={valAlertStatus.type} >
                           {valAlertStatus.message}
                        </Alert>
                      )}
                    </div>

      <div className={styles.InformationMain}>
        <div className={styles.InformationLeft}>
          <span className={styles.TicketInfo}>{t(`Ticket Information`)}</span>
          <span className={styles.TicketnormalText}>{t(`Category`)}: {adminReply.categoryName}</span>
          <span className={styles.TicketnormalText}>{t(`Description`)}: {adminReply.query}</span>
        </div>
        <div className={styles.InformationRight}>
          <span className={styles.TicketnormalText}>{t(`Create Date`)}: {evaluateDate(adminReply.createdOn)}</span>
          <span className={styles.TicketnormalText}>{t(`Sub-category`)}: {adminReply.subCategoryName}</span></div>
      </div>
      {adminReply && adminReply.replyTicketList && adminReply.replyTicketList.length > 0 ?

        adminReply.replyTicketList.map((data, index) => {
          return (
            <>
            {data.replyBy === 3?<>
              <div className={styles.Chatbox1}>
                <UserLogo />
                <div className={styles.ChatboxLeft}>
                  <span className={styles.ChatboxLeftHeading}>{t(`Replied by admin`)}</span>
                  <span className={styles.ChatboxLeftText}>{data.reply}</span>
                </div>
              </div>
              <div className={styles.AdminDate}>
              <span >
              <span className={styles.DateField}>{evaluateDate(data.replyOn)}-{Moment(data.replyOn).format('HH:MM')}</span>
              </span>
              </div>
           </> :
           <>
              <div className={styles.Chatbox2}>
                <div className={styles.ChatboxLeft2}>
                  <p className={styles.ChatboxLeftHeading2}>{t(`Replied by user`)}</p>
                  <p className={styles.ChatboxLeftText2}>{data.reply}</p>
                </div>
                <UserLogo />
              </div>
              <div className={styles.ClientDate}>
              <span >
              <span className={styles.DateField}>{evaluateDate(data.replyOn)}-{Moment(data.replyOn).format('HH:MM')}</span>
              </span>
              </div>
              </>}
            </>)
        })
        : null}
        {queryId[4]==="close-ticket" &&
        <>
      <div className={styles.Footer}>
        <span className={styles.FooterHeading}>{t(`Post Reply`)}</span>
        <span className={styles.FooterText}>{t(`To best assist you, we request that you be specific and detailed`)} * </span>
        <div className={styles.FooterLine}></div>
        <div className={styles.FooterinputField}>
        <Form.Group controlId="formIssue">
          <Form.Control
            //as="text" 
            className={classes.input}
            placeholder={t(`Type your text here......................`)}
            value={replyMsg.value}
            onChange={(e) =>
              setReplyMsg({
                value: e.target.value.trimLeft(),
                isError: e.target.value === "",
                msg:
                  e.target.value === "" ? `${t(`This is required field!`)}` : "",
              })
            }
            isInvalid={replyMsg.isError}

          />
        </Form.Group>
        
        </div>
      </div>
      <div className={styles.ButtonGroup}>
        <button className={styles.FooterButton} onClick={() => {
          onHandelReply();
        }}> {t(`Post Reply`)}</button>
        <button className={styles.FooterButton1} onClick={()=>handleClose()}> {t(`Cancel`)}</button>
      </div>
</>}
    </div>
    
  );
}
