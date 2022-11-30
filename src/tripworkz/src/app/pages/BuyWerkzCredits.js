import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import "react-phone-input-2/lib/high-res.css";
import Alert from "@material-ui/lab/Alert";
import { Typeahead } from "react-bootstrap-typeahead";
import { useLocation, useParams } from "react-router";
import { PAYMENT } from "../constants";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });
const useStyles = makeStyles((theme) => ({
  customBlock: { height: "100px" },
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
}));

const BuyWerkzCredits = (props) => {
  const [werkzCreditsValue, setWerkzCreditsValue] = useState({
    isError: false,
    value: "",
    msg: "",
  });
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
  const { t } = useTranslation();
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
  const [werkzCreditsDetail, setWerkzCreditsDetail] = useState(null);
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
        countryCode: countryKey,
        currencyCode: key,
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

  const checkPaymentStatus = () => {
    setPaymentType("Cash");
    setLoader(true);
    let payload = {
      paymentRefNumber: ls.get("werkzCreditspaymentRef").paymentrefnumber,
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
              setCustomAlert({
                active: false,
                variant: "",
                msg: "",
              });
            }, [2000]);
          } else {
            setCustomAlert({
              active: true,
              variant: "success",
              msg: res.data.dataException.err_msg,
            });
            setTimeout(() => {
              setCustomAlert({
                active: false,
                variant: "",
                msg: "",
              });
            }, [2000]);
          }
          ls.removeAll();
          setTimeout(() => {
            setLoader(false);
            props.history.push("/my-werkz-credits");
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
            setCustomAlert({
              active: false,
              variant: "",
              msg: "",
            });
          }, [2000]);
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
            msg: `${t(`Something went wrong`)}`,
          });
        }
      });
  };

  useEffect(() => {
    let payRef = ls.get("werkzCreditspaymentRef");
    if (payRef !== "") {
      checkPaymentStatus();
    }
  }, []);

  const purchasewerkzCredits = () => {
    let isOK = true;

    setLoader(true);
    if (paymentType === "") {
      setCustomAlert({
        active: true,
        variant: "error",
        msg: `${t(`Please select payment method`)}`,
      });
      isOK = false;
      setLoader(false);
    } else if (paymentType === "Cash") {
      if (countryValue.value.length === 0) {
        setCustomAlert({
          active: true,
          variant: "error",
          msg: `${t(`Please fill all fields`)}`,
        });
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
          paymentAmount: parseInt(werkzCreditsValue.value),
          payvendorKey: providerValue.value[0].id,
          successUrl: window.location.href,
          cancelUrl: window.location.href,
          userId: main.user.userId,
          voucherId: 0,
        };

        dispatch(actions.createMiddlewarePayment(body))
          .then((response) => {
            if (response.status === 200) {
              ls.set("werkzCreditspaymentRef", {
                paymentrefnumber: response.data["payment-ref-number"],
              });
              window.location.href = response.data["vendor-process-url"];
              setLoader(false);
            } else {
              setCustomAlert({
                active: true,
                variant: "error",
                msg: `${t(`Something went wrong`)}`,
              });
              setLoader(false);
            }
          })
          .catch((error) => {
            setCustomAlert({
              active: true,
              variant: "error",
              msg: `${t(`Something went wrong`)}`,
            });
            setLoader(false);
          });
      }
    }
  };
  return (
    <div className={`card card-custom card-stretch`}>
      <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`Buy More Credits`)}
            </span>
            <Link to="/my-werkz-credits">
            <button className={classes.backButton}>{t(`Back`)}</button>
            </Link>
            {/* <span classes={classes.SubTitle}>{t(`Use your credits for your future purchases`)}</span> */}
          </div>
      <section className={classes.MyVocherSelection}>
        <div className="container">
          <div >
            {/* <h3>{t(`Buy More Credits`)}</h3> */}
            {customAlert.active && (
              <Alert severity={customAlert.variant} className="mb-3 mt-2">
                {customAlert.msg}
              </Alert>
            )}
          </div>
          <div className="row" style={{marginTop:'25px'}}>
            <div className="col-md-6">
              <div className="custom-block">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold ml-3 mb-5">
                    {t(`Enter No. of Werkzcredit you want to purchase`)}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    className="rounded-shape"
                    value={werkzCreditsValue.value}
                    onChange={(e) =>
                      setWerkzCreditsValue({
                        value: e.target.value,
                        isError: e.target.value === "",
                        msg:
                          e.target.value === ""
                            ? `${t(`This is required field!`)}`
                            : "",
                      })
                    }
                    isInvalid={werkzCreditsValue.isError}
                  />
                </Form.Group>
              
                <p className="mt-4 ml-3 mb-0">
                  {t(`Price`)} : {werkzCreditsValue.value * 1}
                </p>
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
                          placeholder={t(`Choose a country`)}
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
                          placeholder={t(`Choose a currency`)}
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
                          placeholder={t(`Choose a provider`)}
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
            <div className="col-md-4">
              <button
                className="loginBtn"
                onClick={purchasewerkzCredits}
                disabled={loader}
              >
                {t(`Proceed to pay`)}{" "}
                {loader && <span className="ml-3 spinner spinner-white"></span>}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyWerkzCredits;
