import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import * as actions from "../../components/_redux/mainActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  cardContainer: {
    width: "80%",
    margin: "auto",
  },
  textHead: {
    fontWeight:'600px',
    fontSize:"15px"
  },
  mainContainer: {
    borderRadius: 20,
  },
  MainHeader: { 
    backgroundColor: "#F5F5F5", 
    padding: "10px 20px", 
    display:'flex',
    justifyContent:"space-between",
    alignItems:'center',
    width:'100%'
  },
  MainTitle: {
    fontWeight: "600",
    fontSize: "18px",
    color: "#287CBC"
  },
  backButton:{
    marginRight: '11px',
    background: '#287CBC',
    border: '1px solid #287CBC',
    borderRadius: '30px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '400',
    padding: '9px 30px'
  }
});

const EditCards = () => {
  const { auth, main } = useSelector((state) => state);
  const { t } = useTranslation();
  let userId = auth.user.useR_ID
  let { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();

  const [expiryDate, setExpiryDate] = useState();
  const [cardName, setCardName] = useState({
    isError: false,
    value: "",
    msg: ""
  });
  const [cardNumber, setCardNumber] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    return [mnth, date.getFullYear(),].join("-");
  }
  const handlEexpiryDate = (date) => {
    setExpiryDate(convert(date));
  };

  useEffect(() => {
    if (id) {
      dispatch(actions.getCardById(id))
        .then((response) => {
          if(response.status===200){
         
              
             setCardName({
               isError: false,
               value: response.data.responseData.nameOnCard,
               msg: ""
             });
             setCardNumber({
               isError: false,
               value: response.data.responseData.cardNo,
               msg: "",
             });
             setExpiryDate( response.data.responseData.expiryDate);
             }
        })} 
  }, []);

  const onEditSubmit = () => {
    let isOK = true;
    if (!cardName.value) {
      setAlertStatus({
        status: true,
        message: `${t(`Card name is required`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }

    if (cardNumber.value.length !== 16) {
      setAlertStatus({
        status: true,
        message: `${t(`Card number must be 16 digit`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }

    const re = /^[0-9\b]+$/;
    if (!re.test(cardNumber.value)) {
      setAlertStatus({
        status: true,
        message: `${t(`Card number must be a type of number`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }


    if (!expiryDate) {
      setAlertStatus({
        status: true,
        message: `${t(`Expiry date is required`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }


    if (isOK) {

      let body = {
        id: parseInt(id),
        userId: userId,
        nameOnCard: cardName.value,
        cardNo: cardNumber.value,
        expiryDate:expiryDate
      }
      dispatch(actions.editCard(body))
        .then((response) => {
      
          if (response.responseCode === 200) {
           // dispatch(actions.getAllCardList(userId))
           setAlertStatus({
            status: true,
            message: response.responseMessage,
            type: "success",
          });
          setTimeout(function() {
            history.push("/manage-payment-methods");
            setAlertStatus({ status: false, message: "", type: "" });
          }, 5000); //5 Second delay
           
          } else {
            setAlertStatus({
              status: true,
              message:
                response.response !== undefined
                  ? response.response.data
                  : `${t(`Please enter fields correctly`)}`,
              type: "error",
            });
            setTimeout(function() {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay
            return null;
          }
        })
        .catch((error) => {
          setAlertStatus({
            status: true,
            message: error,
            type: "error",
          });
          setTimeout(function() {
            setAlertStatus({ status: false, message: "", type: "" });
          }, 5000); //5 Second delay
        });
    }
   };

  return (
    <div className={`card card-custom `}>
      {/* begin::Header */}
      <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`Manage Payment Methods`)}
            </span>
            <Link to="/manage-payment-methods">
            <button className={classes.backButton}>{t(`Back`)}</button>
            </Link>
          </div>
      {/* end::Header */}

      {/* begin::Body */}
      {alertStatus.status && (
            <div className="row mt-5 ml-8 mr-8 ">
              <div className="col-md-12">
                <Alert severity={alertStatus.type} >
                  {alertStatus.message}
                </Alert>
              </div>
            </div>
          )}
      <Paper className="ml-10 mr-10 mt-10 mb-20 mt-0 pl-5 rounded-lg" elevation={5}>
        <div className="card-header border-0 py-5 mt-5">
          <h3 className="card-title align-items-bi flex-column">
            <span className={("card-label", classes.textHead)}>
              {t(`Edit card details`)}
            </span>
          </h3>
        </div>
        <div className={("card-body py-0", classes.cardContainer)}>
          
          <div className="row mb-1 ">
            <div className="col-md-6">
              <Form.Group controlId="titleBasic">
                <Form.Label style={{ color: "#3f4254" }}>{t(`Card Name`)}</Form.Label>
                <Form.Control
                   type="text"
                   className="rounded-shape"
                   placeholder={t(`Card Name`)}
                   value={cardName.value}
                   onChange={(e) =>
                     setCardName({
                       value: e.target.value,
                       isError: e.target.value === "",
                       msg:
                         e.target.value === "" ? `${t(`"This is required field!"`)}` : "",
                     })
                   }
                   isInvalid={cardName.isError}
                 />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-md-6">
              <Form.Group controlId="detailsBasic">
                <Form.Label style={{ color: "#3f4254" }}>{t(`Card Number`)}</Form.Label>
                <Form.Control
                     type="text"
                     className="rounded-shape"
                     placeholder={t(`Card Number`)}
                     value={cardNumber.value}
                     onChange={(e) =>
                       setCardNumber({
                         value: e.target.value,
                         isError: e.target.value === "",
                         msg:
                           e.target.value === "" ? `${t(`"This is required field!"`)}` : "",
                       })
                     }
                     isInvalid={cardNumber.isError}

                   />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-md-6">
              <Form.Group controlId="detailsBasic">
              <Form.Label style={{ color: "#3f4254" ,display:"block"}}>{t(`Expiry Date`)}</Form.Label>
                <DatePicker
                        className="rounded-shape form-control pl-5 pr-25 w-100 p-2"
                        showMonthYearPicker
                        minDate={new Date()}
                        value={(expiryDate)}
                        dateFormat="MM/yyyy"
                        onChange={handlEexpiryDate}
                      />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-10 ">
            <div className="col-md-4">
              <button
                className="loginBtn"
                onClick={onEditSubmit}
              >
              {t(`Save`)}
              </button>
            </div>

            <div className="col-md-4">
              <Link to="/manage-payment-methods">
                <button className="loginBtn">{t(`Cancel`)}</button>
              </Link>
            </div>
          </div>
        </div>
      </Paper>
      {/* end::Body */}
    </div>
  );
};

export default EditCards;
