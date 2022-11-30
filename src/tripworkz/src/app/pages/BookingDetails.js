import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch, useSelector } from "react-redux";
import { AccountBalanceWallet } from "@material-ui/icons";
import { useHistory, useParams } from "react-router";
import * as actions from "../components/_redux/mainActions";
import Alert from "@material-ui/lab/Alert";
import { PAYMENT } from "../constants";
import SecureLS from "secure-ls";
import { applyVoucher, bookingPayApi } from "../components/_redux/mainCrud";
import { Button } from "react-bootstrap";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker";
import { PartnerDetails } from './PartnerDetails'
import Moment from 'moment';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


const useStyles = makeStyles({

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",  
  },
  paper: {
    backgroundColor: "#fff",
    border: "1px solid #287CBC",
    boxShadow: 5,
    borderRadius: 20,
  },
  MainHeader: {     backgroundColor: "#F5F5F5", 
  padding: "10px 20px", 
  display:'flex',
  justifyContent:"space-between",
  alignItems:'center',
  width:'100%' },
  backButton:{

    marginRight: '11px',
    background: '#287CBC',
    border: '1px solid #287CBC',
    borderRadius: '30px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '400',
    padding: '9px 30px'
  },
  MainTitle: {
    fontWeight: "600",
    fontSize: "18px",
    color: "#287CBC"
  },
  SubTitle: {
    fontWeight: "400",
    fontSize: "13px",
    marginTop: "1px"
  },
  heading:{
    fontWeight: "500",
    fontSize: "16px",
  }


});




const ls = new SecureLS({ encodingType: "aes" });

const BookingDetails = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { auth, main } = useSelector((state) => state);
  const { t } = useTranslation();
  const params = useParams();
  const [paymentType, setPaymentType] = useState("");
  const [promocode, setPromocode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);

  const [bookingDetails, setBookingDetails] = useState(null);
  const [countryValue, setCountryValue] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [currencyValue, setCurrencyValue] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [providerValue, setProviderValue] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [providers, setProviders] = useState([]);
  const [countryKey, setCountryKey] = useState(0);
  const [currencyKey, setCurrencyKey] = useState(0);
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const [bookingReferenceNo, setBookingReferenceNo] = useState()
  const [customAlert, setCustomAlert] = useState({
    active: false,
    variant: "",
    msg: "",
  });
  const [bookingDetail, setBookingDetail] = useState({
    paymentamount: "",
    invoiceid: "",
  });

  const headers = {
    Authorization: `Bearer ` + auth.authToken,
    "Content-Type": "application/json",
  };

  const evaluateDate = (e) => {
    let options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };
  const countryChangeHandler = (e) => {
    let key = e.length === 0 ? [] : e[0].id;
    setCountryKey(key);
    let countryObj = [];
    if (key.length !== 0) {
      main.middlewareCountries.map((data) => {
        if (key === data["country-iso"]) {
          let selected = {
            id: data["country-iso"],
            name: data["country-name"],
          };
          countryObj.push(selected);
        }
      });
    }

    setCurrencyValue({ value: [], msg: "" });
    setProviderValue({ value: [], msg: "" });

    setCountryValue({
      value: countryObj,
      isError: key.length === 0,
      msg: key.length === 0 ? `${t(`This is required field!`)}` : "",
    });
  };

  const currencyChangeHandler = (e) => {
    let key = e.length === 0 ? [] : e[0].id;
    setCurrencyKey(key);
    let currencyObj = [];
    if (key.length !== 0) {
      main.middlewareCurrencies.map((data) => {
        if (key === data["currency-code"]) {
          let selected = {
            id: data["currency-code"],
            name: data["currency-name"] + " - " + data["currency-code"],
          };
          currencyObj.push(selected);
        }
      });
    }
    setCurrencyValue({
      value: currencyObj,
      isError: key.length === 0,
      msg: key.length === 0 ? `${t(`This is required field!`)}` : "",
    });

    if (key.length !== 0) {
      let body = {
        countrycode: countryKey,
        currencycode: key,
      };
      dispatch(actions.getMyMiddlewareProvider(body)).then((data) => {
        let options = [];
        if (data.status === 200) {
          data.data.map((provider) =>
            options.push({
              id: provider["pay-vendor-key"],
              name: provider["pay-vendor-name"],
            })
          );
        }

        setProviders(options);
      });
    }
  };

  const providerChangeHandler = (e) => {
    let key = e.length === 0 ? [] : e[0].id;
    let providerObj = [];
    if (key.length !== 0) {
      main.middlewareProviders.map((data) => {
        if (key === data["pay-vendor-key"]) {
          let selected = {
            id: data["pay-vendor-key"],
            name: data["pay-vendor-name"],
          };
          providerObj.push(selected);
        }
      });
    }

    setProviderValue({
      value: providerObj,
      isError: key.length === 0,
      msg: key.length === 0 ? `${t(`This is required field!`)}` : "",
    });
  };

  useEffect(() => {
    if (main.middlewareCountries) {
      let options = [];
      main.middlewareCountries.map((country) =>
        options.push({
          id: country["country-iso"],
          name: country["country-name"],
        })
      );
      setCountries(options);
    }
    if (main.middlewareCurrencies) {
      let options = [];
      main.middlewareCurrencies.map((currency) =>
        options.push({
          id: currency["currency-code"],
          name: currency["currency-name"] + " - " + currency["currency-code"],
        })
      );
      setCurrencies(options);
    }
  }, [main.middlewareCountries, main.middlewareCurrencies]);

  useEffect(() => {
    let param = {
      invoiceid: params.id,
    };
    dispatch(actions.getBookingById(param))
      .then((response) => {
        setBookingDetails(response);
        setBookingDetail({
          paymentamount: response.invoicedetail.totalnetamount,
          invoiceid: response.bookingdetail[0].invoiceid,
        });
        setBookingReferenceNo(response.bookingdetail[0].bookingreferenceno)
      })
      .catch((err) => {
      });
  }, []);

  const BookingPayment = () => {
    let isOK = true;

    setLoader(true);
    if (paymentType === "") {
      setCustomAlert({
        active: true,
        variant: "error",
        msg: `${t(`Please select payment method`)}`,
      });
      setTimeout(() => {
        setCustomAlert({ active: false, variant: "", msg: "" });
      }, 5000);
      isOK = false;
      setLoader(false);
    } else if (paymentType === "Cash") {
      if (countryValue.value.length === 0) {
        setCustomAlert({
          active: true,
          variant: "error",
          msg: `${t(`Please fill all fields`)}`,
        });
        setTimeout(() => {
          setCustomAlert({ active: false, variant: "", msg: "" });
        }, 5000);
        setCountryValue({
          ...countryValue,
          isError: true,
          msg: `${t(`This is required field!`)}`,
        });
        isOK = false;
        setLoader(false);
      }
      if (currencyValue.value.length === 0) {
        setCustomAlert({
          active: true,
          variant: "error",
          msg: `${t(`Please fill all fields`)}`,
        });
        setTimeout(() => {
          setCustomAlert({ active: false, variant: "", msg: "" });
        }, 5000);
        setCurrencyValue({
          ...currencyValue,
          isError: true,
          msg: `${t(`This is required field!`)}`,
        });
        isOK = false;
        setLoader(false);
      }
      if (providerValue.value.length === 0) {
        setProviderValue({
          ...providerValue,
          isError: true,
          msg: `${t(`Please fill all fields`)}`,
        });
        isOK = false;
        setLoader(false);
      }
      if (isOK) {
        let body = {
          paymentcurrency: currencyValue.value[0].id,
          paymentdesc: PAYMENT.BOOKING_DESC,
          paymentamount:
            discountedAmount !== null && discountedAmount !== 0
              ? discountedAmount
              : bookingDetail.paymentamount,
          payvendorkey: providerValue.value[0].id,
          success_url: window.location.href,
          cancelurl: window.location.href,
          userid: main.user.useR_ID,
          voucherid: bookingDetail.invoiceid,
        };
        dispatch(actions.createMiddlewarePayment(body))
          .then((response) => {
            if (response.status === 200) {
              ls.set("paymentRef", {
                paymentrefnumber: response.data["payment-ref-number"],
                voucherId: params.id,
              });
              window.location.href = response.data["vendor-process-url"];
              setLoader(false);
            } else {
              setCustomAlert({
                active: true,
                variant: "error",
                msg: `${t(`Something went wrong`)}`,
              });
              setTimeout(() => {
                setCustomAlert({ active: false, variant: "", msg: "" });
              }, 5000);
              setLoader(false);
            }
          })
          .catch((error) => {
            setCustomAlert({
              active: true,
              variant: "error",
              msg: `${t(`Something went wrong`)}`,
            });
            setTimeout(() => {
              setCustomAlert({ active: false, variant: "", msg: "" });
            }, 5000);
            setLoader(false);
          });
      }
    } else {
      if (isOK) {
        let data = {
          userid: main.user.useR_ID,
          voucherid: bookingDetail.invoiceid,
          //   expirydate: voucherDetail.expiron,
          paymenttype: paymentType,
        };
        // props.history.push('/my-vouchers-promo-codes')
        bookingPayApi(headers, data)
          .then((res) => {
            setCustomAlert({
              active: true,
              variant: "success",
              msg: `${t(`Payment was successfull`)}`,
            });
            dispatch(actions.getUserDetails(auth.user["emaiL_ID"], headers));
            setTimeout(() => {
              setCustomAlert({ active: false, variant: "", msg: "" });
              props.history.push("/booking-purchase");
            }, 2000);
            setLoader(false);
          })
          .catch((err) => {
            setCustomAlert({
              active: true,
              variant: "error",
              msg:
                err.response !== undefined
                  ? err.response.data
                  : `${t(`Something went wrong`)}`,
            });
            setTimeout(() => {
              setCustomAlert({ active: false, variant: "", msg: "" });
            }, 5000);
            setLoader(false);
          });
      }
    }
  };

  const applyDiscount = () => {
    setLoader(true);
    let body = {
      pricetoApplyCode: bookingDetail.paymentamount,
      authCode: promocode,
      userId: main.user.userId,
    };
    applyVoucher(body)
      .then((response) => {
        if (response.status === 200) {
          setLoader(false);
          setDiscountedAmount(response.data.finalamount);
          setCustomAlert({
            active: true,
            variant: "success",
            msg: `${t(`Redeemed successfully`)}`,
          });
          setLoader(false);
          setTimeout(() => {
            setCustomAlert({
              active: false,
              variant: "",
              msg: "",
            });
          }, 4000);
        }
      })
      .catch((err) => {
        if (err) {
          setCustomAlert({
            active: true,
            variant: "error",
            msg: err.response.data,
          });
          setLoader(false);
          setTimeout(() => {
            setCustomAlert({
              active: false,
              variant: "",
              msg: "",
            });
            if(err.response.data==="Your account is locked, Please check your email"){
            history.push("/logout");
            }
          }, 6000);
        }
      });
  };

  const checkPaymentStatus = () => {
    setPaymentType("Cash");
    setLoader(true);
    let payload = {
      paymentrefnumber: ls.get("paymentRef").paymentrefnumber,
    };
    actions
      .getPaymentStatus(payload)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.dataException.err_msg === "payment pending") {
            setCustomAlert({
              active: true,
              variant: "error",
              msg: res.data.dataException.err_msg,
            });
            setTimeout(() => {
              setCustomAlert({ active: false, variant: "", msg: "" });
            }, 5000);
          } else {
            setCustomAlert({
              active: true,
              variant: "success",
              msg: res.data.dataException.err_msg,
            });
            setTimeout(() => {
              setCustomAlert({ active: false, variant: "", msg: "" });
            }, 5000);
          }
          ls.removeAll();
          setTimeout(() => {
            setLoader(false);
            props.history.push("/booking-purchase");
          }, [2000]);
          setLoader(false);
        } else {
          setLoader(false);
          setCustomAlert({
            active: true,
            variant: "error",
            msg: `${t(`Something went wrong`)}`,
          });
          setTimeout(() => {
            setCustomAlert({ active: false, variant: "", msg: "" });
          }, 5000);
        }
      })
      .catch((err) => {
        ls.removeAll();
        setLoader(false);
        if (err.data !== undefined) {
          setCustomAlert({
            active: true,
            variant: "error",
            msg: err.data.dataException.err_msg,
          });
          setTimeout(() => {
            setCustomAlert({ active: false, variant: "", msg: "" });
          }, 5000);
        } else {
          setCustomAlert({
            active: true,
            variant: "error",
            msg: `${t(`Something went wrong`)}`,
          });
          setTimeout(() => {
            setCustomAlert({ active: false, variant: "", msg: "" });
          }, 5000);
        }
      });
  };

  useEffect(() => {
    let payRef = ls.get("paymentRef");
    if (payRef !== "" && payRef.voucherId === params.id) {
      checkPaymentStatus();
    }
  }, []);




  //for add partner details 

  //-----------------------------START-----------------------------------------------------

  const [name, setName] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [passportNo, setPassportNo] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [dateOfBirth, setDateOfBirth] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [email, setEmail] = useState({
    isError: false, value: "", msg: ""
  });
  const [gender, setGender] = useState({
    isError: false,
    value: "",
    msg: "",
  });

  const [contactNo, setContactNo] = useState({
    isError: false,
    value: "",
    msg: "",
  });

  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [successAlert, setSuccessAlert] = useState({
    status: false,
    message: "",
    type: "",
  });


  const [open, setOpen] = useState(false);
  const handleOpen = (item) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setName({ isError: false, value: "", msg: "" });
    setPassportNo({ isError: false, value: "", msg: "" });
    setDateOfBirth({ isError: false, value: "", msg: "" });
    setEmail({ isError: false, value: "", msg: "" });
    setGender({ isError: false, value: "", msg: "" });
    setContactNo({ isError: false, value: "", msg: "" })
  };


  const onAddPartner = () => {
    let isOK = true;

    if (!name.value) {
      setAlertStatus({
        status: true,
        message: `${t(`Name is required`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }




    if (!dateOfBirth.value) {
      setAlertStatus({
        status: true,
        message: `${t(`Date of birth is required`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }
    if (dateOfBirth.value > Moment(new Date()).format('YYYY-MM-DD')) {
      setAlertStatus({
        status: true,
        message: `${t(`Date of birth should not future date`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }


    if (!email.value) {
      setAlertStatus({
        status: true,
        message: `${t(`Date of birth should not future date`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }


    if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
      setAlertStatus({
        status: true,
        message: `${t(`Please enter valid email`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;


    }

    if (!gender.value) {
      setAlertStatus({
        status: true,
        message: `${t(`Gender is required`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }

    if (contactNo.value.length !== 10) {
      setAlertStatus({
        status: true,
        message: `${t(`Contact number must be 10 digit`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }

    const re = /^[0-9\b]+$/;
    if (!re.test(contactNo.value)) {
      setAlertStatus({
        status: true,
        message: `${t(`Contact number must be a type of number`)}`,
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
        bookingRefNumber: bookingReferenceNo,
        name: name.value,
        //  passportNo: passportNo.value,
        dob: dateOfBirth.value,
        emailId: email.value,
        gender: gender.value,
        phoneNumber: contactNo.value
      }

      //Add Partner Details
      dispatch(actions.addPartnerDetails(body))
        .then((response) => {
          if (response === "Success") {
            dispatch(actions.getPartnersDetails(bookingReferenceNo))
            handleClose()
            setSuccessAlert({
              status: true,
              message: `${t(`Partner details added successfully`)}`,
              type: "success",
            });

            setTimeout(function () {
              setSuccessAlert({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay

            return null;
          }
          else {
            setAlertStatus({
              status: true,
              message: `${t(`Something went wrong`)}`,
              type: "error",
            });

            setTimeout(function () {
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
          setTimeout(function () {
            setAlertStatus({ status: false, message: "", type: "" });
          }, 5000); //5 Second delay

        });

    }
  }

  // ------------------------------------------------END--------------------------------------------



  return (
    <div className={`card card-custom card-stretch`}>


 <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`View Branch`)}
            </span>
            <Link to="/booking-purchase">
            <button className={classes.backButton}>{t(`Back`)}</button>
            </Link>
            {/* <span classes={classes.SubTitle}>{t(`Use your credits for your future purchases`)}</span> */}
          </div>


      <div className="container">
        <div className="row">
          <div className="col-md-7 col-xs-12">
            <div className={"pt-10 pl-5 pr-10"}>
              <span className={classes.heading}>{t(`Booking Details`)}</span>
            </div>
          </div>
          <div className="col-md-5 col-xs-12">
            <div className={"pt-10 pl-5 pr-10"}>
            <span className={classes.heading}>
                {t(`Reference Number`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].bookingreferenceno}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-xs-12">
            <div className={"pt-5 pl-5 pr-5"}>
              <p>
                {t(`Booking Title`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].productname}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Booking Type`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].producttype}{" "}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Net Amount`)}:
                <strong>
                  {" "}
                  {bookingDetails !== null &&
                    bookingDetails.invoicedetail.bookingcurrency}{" "}
                  {bookingDetails !== null &&
                    bookingDetails.invoicedetail.totalnetamount}{" "}
                </strong>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Room Type`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.itemdetail[0].itemname}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Qty`)} :{" "}
                {bookingDetails !== null &&
                  bookingDetails.itemdetail[0].allottedquantity}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Booking Status`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].bookingstatus}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Address`)}:{" "}
                {`${bookingDetails !== null &&
                  bookingDetails.bookingdetail[0]
                    .productaddress}, ${bookingDetails !== null &&
                    bookingDetails.bookingdetail[0]
                      .productcity}, ${bookingDetails !== null &&
                      bookingDetails.bookingdetail[0]
                        .productstate}, ${bookingDetails !== null &&
                        bookingDetails.bookingdetail[0]
                          .productcountry}, ${bookingDetails !== null &&
                          bookingDetails.bookingdetail[0].productpostalcode} `}{" "}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Contact Number`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].productofficephone}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`E-mail`)} :{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].productemail}{" "}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`E-Amenities`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.aminiesdetail[0].ammenitydesc}{" "}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Members`)} :{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].paxadult}{" "}
                {t(`Adult(s)`)}&{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].paxchild}{" "}
                {t(`Children(s)`)}{" "}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Check In`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].checkintime}{" "}
                -
                {evaluateDate(
                  bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].checkindate
                )}{" "}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Check Out`)} :{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].checkouttime}{" "}
                -
                {evaluateDate(
                  bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].checkoutdate
                )}{" "}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Comments`)} :{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].bookingcomments}{" "}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Extra Amenity`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.bookingdetail[0].ratecomments}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <div className={"pt-5 pl-5 pr-10"}>
            <span className={classes.heading}>{t(`Customer Details`)}</span>
            </div>
          </div>
          <div className="col-md-4 col-xs-4">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Name`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.paxdetails[0].firstname}{" "}
                {bookingDetails !== null &&
                  bookingDetails.paxdetails[0].lastname}
              </p>
            </div>
          </div>
          <div className="col-md-4 col-xs-4">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Age`)}:{" "}
                {bookingDetails !== null && bookingDetails.paxdetails[0].age}
              </p>
            </div>
          </div>
          <div className="col-md-4 col-xs-4">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Nationality`)}:{" "}
                {bookingDetails !== null &&
                  bookingDetails.paxdetails[0].nationality}
              </p>
            </div>
          </div>
          <div className="col-md-4 col-xs-4">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Contact`)}:{" "}
                {bookingDetails !== null && bookingDetails.paxdetails[0].mobile}
              </p>
            </div>
          </div>
          <div className="col-md-4 col-xs-4">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`email`)}:{" "}
                {bookingDetails !== null && bookingDetails.paxdetails[0].email}
              </p>
            </div>
          </div>
          <div className="col-md-4 col-xs-4">
            <div className={"pt-2 pl-5 pr-2"}>
              <p>
                {t(`Address`)} :{" "}
                {bookingDetails !== null &&
                  bookingDetails.paxdetails[0].address}
              </p>
            </div>
          </div>
        </div>



        {/* END */}

        {bookingDetails !== null &&
          bookingDetails.bookingdetail[0].bookingstatus === "Confirmed" ? (
          <>
            {/* Add Partner Details popup open  */}

            <button className="loginBtn w-25 mb-5"
              onClick={() => handleOpen()}
            >{t(`Add Partner Details`)}
            </button>

            {/* END */}

            <div className="row  ">
              <div className="col-md-12">
                {successAlert.status && (
                  <Alert severity={successAlert.type} >
                    {successAlert.message}
                  </Alert>
                )}
              </div>
            </div>

            {/* List of Partners */}

            <PartnerDetails bookingReferenceNo={bookingReferenceNo} />

            <div className="col-md-12 col-xs-12 ">
              <div className={"pt-5 pl-5 text-success text-center"}>
                {/* <h2>{t(`Payment done successfully`)}!</h2> */}
              </div>
            </div>




            {/* <div className=" text-center">
              <button
                className="loginBtn w-25"
                onClick={() => history.push("/booking-purchase")}
              >
                {t(`Back`)} {" "}
              </button>
            </div> */}
          </>
        ) : (
          <>
            {customAlert.active && (
              <Alert severity={customAlert.variant} className="mb-3 ml-5">
                {customAlert.msg}
              </Alert>
            )}

            <div className="row mt-5 p-5">
              <div className="d-flex custom-block align-content-center">
                <div className="col-md-6 ">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="font-weight-bold ml-3 mb-5">
                      {t(`Enter promocode`)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="rounded-shape"
                      value={promocode}
                      onChange={(e) => setPromocode(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6 p-5">
                  <button
                    className="loginBtn w-50"
                    onClick={applyDiscount}
                    disabled={loader}
                  >
                    {t(`Apply promocode`)}
                    {" "}
                    {/* {loader && (
                      <span className="ml-3 spinner spinner-white"></span>
                    )} */}
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                <div className="custom-block">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentType === "Cash" ? true : false}
                    value="Cash"
                    onChange={(e) => setPaymentType(e.target.value)}
                  ></input>
                  <label className="font-weight-bold ml-3">
                    {t(`Purchase with Credit/Debit Card`)}
                  </label>
                  {paymentType === "Cash" ? (
                    <div className="row mt-5">
                      <div className="col-md-4">
                        <Form.Group controlId="discountTypeBasic">
                          <Form.Label style={{ color: "#287CBC" }}>
                            {t(`Country`)}
                          </Form.Label>
                          <Typeahead
                            className="rounded-shape"
                            id="basic-typeahead-single"
                            labelKey="name"
                            onChange={countryChangeHandler}
                            isInvalid={countryValue.isError}
                            options={countries}
                            placeholder="Choose a country"
                            selected={countryValue.value}
                          />
                        </Form.Group>
                      </div>

                      <div className="col-md-4">
                        <Form.Group controlId="discountTypeBasic">
                          <Form.Label style={{ color: "#287CBC" }}>
                            {t(`Currency`)}
                          </Form.Label>
                          <Typeahead
                            className="rounded-shape"
                            id="basic-typeahead-single"
                            labelKey="name"
                            onChange={currencyChangeHandler}
                            isInvalid={currencyValue.isError}
                            options={currencies}
                            placeholder="Choose a currency"
                            selected={currencyValue.value}
                          />
                        </Form.Group>
                      </div>

                      <div className="col-md-4">
                        <Form.Group controlId="discountTypeBasic">
                          <Form.Label style={{ color: "#287CBC" }}>
                            {t(`Provider`)}
                          </Form.Label>
                          <Typeahead
                            className="rounded-shape"
                            id="basic-typeahead-single"
                            labelKey="name"
                            onChange={providerChangeHandler}
                            isInvalid={providerValue.isError}
                            options={providers}
                            placeholder="Choose a provider"
                            selected={providerValue.value}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-25">
              <div className="col-md-4">
              <span className={classes.heading}>
                  {t(`Total`)}:{" "}
                  {discountedAmount !== null && discountedAmount !== 0
                    ? `${bookingDetails.invoicedetail.bookingcurrency} ${discountedAmount}`
                    : bookingDetails !== null &&
                    `${bookingDetails.invoicedetail.bookingcurrency}
                    ${bookingDetail.paymentamount}`}
                </span>
                <button
                  className="loginBtn"
                  onClick={BookingPayment}
                  disabled={loader}
                >
                  {t(`Proceed to pay`)}{" "}
                  {/* {loader && (
                    <span className="ml-3 spinner spinner-white"></span>
                  )} */}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>

        <Fade in={open}>
          <div className={classes.paper} >
           
            <div className={("card-body   px-20 py-3")}>
              
              <div className="row ">
                <div className="col-md-12">
                  {alertStatus.status && (
                    <Alert severity={alertStatus.type} >
                      {alertStatus.message}
                    </Alert>
                  )}
                </div>
                <div style={{color:'#287CBC',fontSize:'16px',fontWeight:'400',margin:"20px 10px"}}>{t(`Add partner details`)}</div>
              </div>
              <div className="row mb-1 ">
             
                <div className="col-md-6">
                  <Form.Group controlId="nameBasic">
                    <Form.Label style={{ color: "#287CBC" }}>{t(`Full Name`)} </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      className="rounded-shape"
                      value={name.value}
                      onChange={(e) =>
                        setName({
                          value: e.target.value,
                          isError: e.target.value === "",
                          msg:
                            e.target.value === "" ? `${t(`This is required field!`)}` : "",
                        })
                      }
                      isInvalid={name.isError}
                    />
                  </Form.Group>
                </div>



                <div className="col-md-6">
                  <Form.Group controlId="dobBasic">
                    <Form.Label style={{ color: "#287CBC" }}>{t(`Date of Birth`)}</Form.Label>
                    <Form.Control
                      type="date"
                      className="rounded-shape"
                      placeholder="Date of Birth"
                      value={dateOfBirth.value}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {

                        setDateOfBirth({
                          value: e.target.value,
                          isError: e.target.value === "",
                          msg:
                            e.target.value === "" ? `${t(`This is required field!`)}` : "",
                        });

                      }}
                      isInvalid={dateOfBirth.isError}
                    />
                  </Form.Group>
                </div>




              </div>


              <div className="row mb-1 ">



                <div className="col-md-6">
                  <Form.Group controlId="emailBasic">
                    <Form.Label style={{ color: "#287CBC" }}>{t(`Email Address`)}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t(`Email Address`)}
                      className="rounded-shape"
                      value={email.value}
                      onChange={(e) =>
                        setEmail({
                          value: e.target.value,
                          isError: e.target.value === "",
                          msg:
                            e.target.value === "" ? `${t(`This is required field!`)}` : "",
                        })
                      }
                      isInvalid={email.isError}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="gender">
                    <Form.Label style={{ color: "#287CBC" }}>{t(`Gender`)}</Form.Label>
                    <Form.Control
                      as="select"
                      className="rounded-shape"
                      value={gender.value}
                      onChange={(e) =>
                        setGender({
                          value: e.target.value,
                          isError: e.target.value === "",
                          msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                        })
                      }
                      isInvalid={gender.isError}
                    // isValid={!title.isError}
                    >
                      <option value="">{t(`Gender`)}</option>
                      <option value="Male">{t(`Male`)}</option>
                      <option value="Female">{t(`Female`)}</option>
                      <option value="Other">{t(`Other`)}</option>
                    </Form.Control>
                  </Form.Group>
                </div>


              </div>

              <div className="row mb-1 ">


                <div className="col-md-6">
                  <Form.Group controlId="contactBasic">
                    <Form.Label style={{ color: "#287CBC" }}>{t(`Contact No`)}</Form.Label>
                    <Form.Control
                      placeholder="Contact No"
                      className="rounded-shape"
                      value={contactNo.value}
                      onChange={(e) =>
                        setContactNo({
                          value: e.target.value,
                          isError: e.target.value === "",
                          msg:
                            e.target.value === "" ? `${t(`This is required field!`)}` : "",
                        })
                      }
                      isInvalid={contactNo.isError}
                    />
                  </Form.Group>
                </div>
              </div>


              <div className="mt-5  ">
                <Button
                  className="btn rounded-pill btn-md m-2 w-25"
                  style={{background:"#287CBC",color:"#ffffff"}}
                  onClick={() => { onAddPartner() }}>

                  {t(`Submit`)}
                </Button>
                <Button
                  onClick={handleClose}
                  className="btn btn-outline w-25 rounded-pill ml-10"
                  style={{background:"#287CBC",color:"#ffffff"}}>
                  
                  {t(`Cancel`)}
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default BookingDetails;
