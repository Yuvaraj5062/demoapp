import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import "react-phone-input-2/lib/high-res.css";
import Alert from "@material-ui/lab/Alert";
import { Typeahead } from "react-bootstrap-typeahead";
import { useLocation, useParams } from "react-router";
import { buyGiftVoucher, getVoucherById } from "../components/_redux/mainCrud";
import { AccountBalanceWallet } from "@material-ui/icons";
import { PAYMENT } from "../constants";
import Moment from 'moment';
import SecureLS from "secure-ls";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const ls = new SecureLS({ encodingType: "aes" });
const useStyles = makeStyles((theme) => ({
  customBlock: { minHeight: "100px", height: "auto" },
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
  mainContainer:{
    padding:'25px'
  },
  pleaseWait:{
    fontSize:'20px',
    color:'#287CBC',
    fontWeight:'500',
    marginTop:'25px'
  },
}));
export const BuyGiftVoucher = (props) => {
  const location = useLocation();
  const { t } = useTranslation();
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

  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth, main } = useSelector((state) => state);
  const params = useParams();
  const headers = {
    Authorization: `Bearer ` + auth.authToken,
    "Content-Type": "application/json",
  };
  const [voucherDetail, setVoucherDetail] = useState(null);
  const [paymentType, setPaymentType] = useState("");
  const [customAlert, setCustomAlert] = useState({
    active: false,
    variant: "",
    msg: "",
  });


  const [loader, setLoader] = useState(false);
  const evaluateDate = (e) => {
    let options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };

  const [eWalletCreditPoints, setEwalletCreditPoints] = useState();

  //let userId = auth.user.userId
  useEffect(() => {
    dispatch(actions.getEwalletCreditPoints(auth.user.userId))
      .then((response) => {
        setEwalletCreditPoints(response)
      })
  }, []);





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
      id: params.id,
    };
    setLoader(true)
    getVoucherById(headers, param)
      .then((res) => {
        setVoucherDetail(res.data);
        const nextMonth =  Moment(new Date()).add(1, "month").startOf("month").format('MMMM');
        const currentMonth=Moment(new Date()).format('MMMM')
        const dateValue=Moment(res.data.expiron).format('MMMM')
      
        if(dateValue===currentMonth ||dateValue===nextMonth){
          console.log("dateValue",dateValue,"currentMonth",currentMonth,"nextMonth",nextMonth)
        }else{    
          props.history.push("/gift-vochers");
        }
        setLoader(false)
      })
      .catch((err) => {
      });
  }, []);

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
          } else {
            setCustomAlert({
              active: true,
              variant: "success",
              msg: res.data.dataException.err_msg,
            });
          }
          ls.removeAll();
          setTimeout(() => {
            setLoader(false);
            props.history.push("/my-vouchers-promo-codes");
          }, [2000]);
          setLoader(false);
        } else {
          setLoader(false);
          setCustomAlert({
            active: true,
            variant: "error",
            msg: `${t(`Something Went Wrong`)}`,
          });
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
        } else {
          setCustomAlert({
            active: true,
            variant: "error",
            msg: `${t(`Something Went Wrong`)}`,
          });
        }
      });
  };

  useEffect(() => {
    let payRef = ls.get("paymentRef");
    if (payRef !== "" && payRef.voucherId === params.id) {
      checkPaymentStatus();
    }
  }, []);

  const purchaseVoucher = () => {
    let isOK = true;

    if (paymentType === "") {
      setCustomAlert({
        active: true,
        variant: "error",
        msg: `${t(`Please select payment method`)}`,
      });
      setTimeout(() => {
        setCustomAlert({ active: false, variant: "", msg: "" });
      }, 2000);
      isOK = false;
      setLoader(false);
    } else if (paymentType === "Cash") {
      if (countryValue.value.length === 0) {
        console.log("1")
        setCustomAlert({
          active: true,
          variant: "error",
          msg: `${t(`Please fill all fields`)}`,
        });
        setTimeout(() => {
          setCustomAlert({ active: false, variant: "", msg: "" });
        }, 2000);
        setCountryValue({
          ...countryValue,
          isError: true,
          msg: `${t(`This is required field!`)}`,
        });
        isOK = false;
        setLoader(false);
      }
      if (currencyValue.value.length === 0) {
        console.log("3")
        setCustomAlert({
          active: true,
          variant: "error",
          msg: `${t(`Please fill all fields`)}`,
        });
        setTimeout(() => {
          setCustomAlert({ active: false, variant: "", msg: "" });
        }, 2000);
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
          paymentCurrency: currencyValue.value[0].id,
          paymentDesc: PAYMENT.VOUCHER_DESC,
          paymentAmount: voucherDetail.price,
          payvendorKey: providerValue.value[0].id,
          successUrl: window.location.href,
          cancelUrl: window.location.href,
          userId: main.user.userId,
          voucherId: voucherDetail.id,
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
              }, 2000);
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
            }, 2000);
            setLoader(false);
          });
      }
    }
    // else if (condition) {

    // } 

    else {
      if (isOK) {
        let data = {
          userId: auth.user.userId,
          voucherId: voucherDetail.id,
          expiryDate: voucherDetail.expiron,
          paymentType: paymentType,
        };

        buyGiftVoucher(headers, data)
          .then((res) => {
            setCustomAlert({
              active: true,
              variant: "success",
              msg: `${t(`Payment was successfull`)}`,
            });
            setTimeout(() => {
              setCustomAlert({ active: false, variant: "", msg: "" });
            }, 2000);
            dispatch(actions.getUserDetails(auth.user["emailId"], headers));
            setTimeout(() => {
              setCustomAlert({ active: false, variant: "", msg: "" });
              props.history.push("/my-vouchers-promo-codes");
            }, 2000);
            setLoader(false);
          })
          .catch((err) => {
            // setCustomAlert({
            //   active: true,
            //   variant: "error",
            //   msg:
            //     err.response !== undefined
            //       ? err.response.data
            //       : `${t(`Something went wrong`)}`,
            // });
            setCustomAlert({
              active: true,
              variant: "error",
              msg:"Not have sufficient E-wallet Credit Points",
            });
            setTimeout(() => {
              setCustomAlert({ active: false, variant: "", msg: "" });
            }, 2000);
            setLoader(false);
          });
      }
    }
  };

  return (
    <div className={`card card-custom card-stretch`}>
       <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`Voucher Details`)}
            </span>
            <Link to="/gift-vochers">
            <button className={classes.backButton}>{t(`Back`)}</button>
            </Link>
            {/* <span classes={classes.SubTitle}>{t(`Use your credits for your future purchases`)}</span> */}
          </div>
          {
            loader ?  <div className="text-center" style={{paddingTop:'25px'}}>
               <span className={classes.pleaseWait}>{t(`Please wait`)}...</span>
            </div>:
          

      <section className={classes.MyVocherSelection}>
        <div className={classes.mainContainer}>
          {/* <div className={"pt-5 pl-5 pr-5"}>
            <h3>{t(`Voucher Details`)}</h3>
          </div> */}
          <div className="row">
            <div className="col-md-4">
              <div
                className="custom-block1"
                style={{ backgroundColor: "#f89528" }}
              >
                <div className={classes.customBlock}>
                  <div className="text-center">
                    <p
                      className="font-weight-bold mb-0"
                      style={{ fontSize: "45px", color: "#ffffff" }}
                    >
                      {voucherDetail !== null
                        ? voucherDetail.discountType === "InPercent"
                          ? voucherDetail.discountValue + "%"
                          : voucherDetail.discountValue
                        : "%"}
                    </p>
                    <p
                      className="mt-0 mb-0"
                      style={{ fontSize: "30px", color: "#ffffff" }}
                    >
                      {t(`Discount`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="custom-block">
                <div className={classes.customBlock}>
                  <p className="font-weight-bold mb-0">
                    {voucherDetail !== null ? voucherDetail.details : ""}
                  </p>
                  <p className="mt-4 mb-0">
                    {t(`Expiry Date`)} :{" "}
                    {voucherDetail !== null
                      ? evaluateDate(voucherDetail.expiron)
                      : ""}
                  </p>
                  <p className="mt-4 mb-0">
                    {t(`Price`)} : {voucherDetail !== null ? voucherDetail.price : ""}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            {customAlert.active && (
              <Alert severity={customAlert.variant} className="mb-3 ml-5">
                {customAlert.msg}
              </Alert>
            )}
            <div className="col-md-12">
              <div className="custom-block">
                <input
                  type="radio"
                  checked={paymentType === "Werkzcredit" ? true : false}
                  name="payment_method"
                  value="Werkzcredit"
                  onChange={(e) => setPaymentType(e.target.value)}
                ></input>
                <label className="font-weight-bold ml-3">
                  {t(`Purchase with credit points`)}
                </label>

                <p
                  className="mt-5 mb-0 ml-3"
                  style={{ fontSize: 30, fontWeight: "bold" }}
                >
                  <AccountBalanceWallet
                    style={{ fontSize: 50 }}
                  ></AccountBalanceWallet>{" "}
                  {main.user !== null ? main.user["balance"] : 0}
                  {' '}{t(`Points`)}
                </p>
                {/* <p className="mt-4 mb-0">Price : </p> */}
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

          <div className="row mt-5">
            <div className="col-md-12">
              <div className="custom-block">
                <input
                  type="radio"
                  name="payment_method"
                  value="e-walletcredit"
                  onChange={(e) => setPaymentType(e.target.value)}
                ></input>
                <label className="font-weight-bold ml-3">
                  {t(`Purchase with e-wallet credit points`)}
                </label>

                <p
                  className="mt-5 mb-0 ml-3"
                  style={{ fontSize: 30, fontWeight: "bold" }}
                >
                  <AccountBalanceWallet
                    style={{ fontSize: 50 }}
                  ></AccountBalanceWallet>{" "}
                  {eWalletCreditPoints !== null ? eWalletCreditPoints : 0} Points
                </p>
                {/* <p className="mt-4 mb-0">Price : </p> */}
              </div>
            </div>

          </div>

          <div className="row mt-5">
            <div className="col-md-4">
              <button
                className="loginBtn"
                onClick={purchaseVoucher}
                disabled={loader}
              >
                {t(`Proceed to pay`)}
                {" "}
                {loader && <span className="ml-3 spinner spinner-white"></span>}
              </button>
            </div>
          </div>
        </div>
      </section>
}
    </div>
  );
};
