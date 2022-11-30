import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import Alert from "@material-ui/lab/Alert";
import { Typeahead } from "react-bootstrap-typeahead";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({

  inValid: {
    backgroundPosition: "right calc(0.2em + 1.3rem) center !important "
  }
});
export const ProfilePage = (props) => {
  const dispatch = useDispatch();
  const { auth, main } = useSelector((state) => state);
  const { t } = useTranslation();
  const classes = useStyles();
  const [title, setTitle] = useState({ isError: false, value: "", msg: "" });
  const [fname, setFname] = useState({ isError: false, value: "", msg: "" });
  const [lname, setLname] = useState({ isError: false, value: "", msg: "" });
  const [email, setEmail] = useState({ isError: false, value: "", msg: "" });
  const [address, setAddress] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [phone, setPhone] = useState({
    isError: false,
    value: null,
    msg: "",
    country: "us",
    code: "1",
  });
  const [postalCode, setPostalCode] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [country, setCountry] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [city, setCity] = useState({ isError: false, value: "", msg: "" });
  const [province, setProvince] = useState({
    isError: false,
    value: "",
    msg: "",
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [provinceKey, setProvinceKey] = useState(0);
  const [countryKey, setCountryKey] = useState(0);
  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });

  const headers = {
    Authorization: "Bearer " + auth.authToken,
    "Content-Type": "application/json",
  };


  const countryChangeHandler = (e) => {
    setIsChanged(true);
    let key = e.length === 0 ? [] : e[0].id;
    setCountryKey(key);
    let countryObj = [];
    if (key.length !== 0) {
      main.countries.map((data) => {
        if (key === data["countrY_ID"]) {
          let selected = {
            id: data["countrY_ID"],
            name: data["countrY_NAME"],
          };
          countryObj.push(selected);
        }
      });
    }

    setCity({ value: [], isError: false, msg: "" });
    setProvince({ value: [], isError: false === 0, msg: "" });

    setCountry({
      value: countryObj,
      isError: key.length === 0,
      msg: key.length === 0 ? `${t(`This is required field!`)}` : "",
    });
    if (key.length !== 0) {
      dispatch(actions.getProvinceDetails(key)).then((data) => {
        let options = [];
        if (data !== undefined) {
          data.map((province) =>
            options.push({
              id: province["provinancE_ID"],
              name: province["prvinancE_NAME"],
            })
          );
        }

        setProvinces(options);
      });
    }
  };

  const cityChangeHandler = (e) => {
    let key = e.length === 0 ? [] : e[0].id;
    let cityObj = [];
    if (key.length !== 0) {
      main.cities.map((data) => {
        if (key === data["citY_ID"]) {
          let selected = { id: data["citY_ID"], name: data["citY_NAME"] };
          cityObj.push(selected);
        }
      });
    }

    setCity({
      value: cityObj,
      isError: key.length === 0,
      msg: key.length === 0 ? `${t(`This is required field!`)}` : "",
    });
  };

  const provinceChangeHandler = (e) => {
    let key = e.length === 0 ? [] : e[0].id;
    let provinceObj = [];
    if (key.length !== 0) {
      main.provinces.map((data) => {
        if (key === data["provinancE_ID"]) {
          let selected = {
            id: data["provinancE_ID"],
            name: data["prvinancE_NAME"],
          };
          provinceObj.push(selected);
        }
      });


      if (provinceObj[0].id !== 0) {
        dispatch(actions.getCityDetails(key, countryKey)).then((data) => {
          let options = [];
          if (data) {
            data.map((city) =>
              options.push({ id: city["citY_ID"], name: city["citY_NAME"] })
            );
            setCities(options);
          }
        });
        setProvinceKey(key);
      }
    }

    setProvince({
      value: provinceObj,
      isError: key.length === 0,
      msg: key.length === 0 ? `${t(`This is required field!`)}` : "",
    });

  };

  const updateSettingHandler = () => {
    let isOK = true;
    if (!title.value) {
      setTitle({ ...title, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }

    if (!fname.value) {
      setFname({ ...fname, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }

    if (!lname.value) {
      setLname({ ...lname, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }

    if (!address.value) {
      setAddress({ ...address, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }

    if (!postalCode.value) {
      setPostalCode({
        ...postalCode,
        isError: true,
        msg: `${t(`This is required field!`)}`,
      });
      isOK = false;
    }

    if (!phone.value || phone.value === phone.code) {
      setPhone({ ...phone, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }

    if (country.value.length === 0) {
      setCountry({ ...country, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }


    if (city.value.length === 0) {
      setCity({ ...city, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }

    if (province.value.length === 0) {
      setProvince({
        ...province,
        isError: true,
        msg: `${t(`This is required field!`)}`,
      });
      isOK = false;
    }

    if (isOK) {
      let body = {
        userId: auth.user.userId,
        title: title.value,
        firstName: fname.value,
        lastName: lname.value,
        emailId: email.value,
        contactNo: phone.value,
        address: address.value,
        cityId: city.value[0].id,
        postalCode: postalCode.value,
        provinceId: province.value[0].id,
        countryId: country.value[0].id,
        balance: auth.user.balance,
        countryCode: auth.user.countryCode,
      };
      dispatch(actions.updateUserDetails(body, headers))
        .then((res) => {

          if (res === "Success") {
            setAlertStatus({
              status: true,
              message:`${t(`Profile updated successfully`)}`,
              type: "success",
            });
            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay
          } else if (res) {
            setAlertStatus({
              status: true,
              message: res,
              type: "error",
            });
            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000);
          }

          else {
            setAlertStatus({
              status: true,
              message: res,
              type: "error",
            });
            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay
          }
        })
    }
    //console.log("aaaaaaa", main.updateSettingStat)
    // if (main.updateSettingStat) {
    //   setAlertStatus({
    //     message: main.updateSettingStat.msg,
    //     type: main.updateSettingStat.status,
    //   });
    //   setTimeout(function () {
    //     setAlertStatus({ message: "", type: "" });
    //   }, 5000); //5 Second delay
    // }
  };

  useEffect(() => {
    if (auth.user.cityId) {
      dispatch(
        actions.getCityDetails(auth.user.provinceId, auth.user.countryId)
      ).then((data) => {
        let options = [];
        if (data) {
          data.map((city) =>
            options.push({ id: city["citY_ID"], name: city["citY_NAME"] })
          );

          setCities(options);
        }
      });
    }
    if (auth.user.provinceId) {
      dispatch(actions.getProvinceDetails(auth.user.countryId)).then(
        (data) => {
          let options = [];
          if (data) {
            data.map((data) =>
              options.push({
                id: data["provinancE_ID"],
                name: data["prvinancE_NAME"],
              })
            );
            setProvince(options);
          }
        }
      );
    }
  

  }, []);






  useEffect(() => {

    if (auth.user && !isChanged) {
      dispatch(actions.getUserDetails(auth.user.emailId, headers)).then(
        (user) => {
          setTitle({ isError: false, value: user.title, msg: "" });
          setFname({ isError: false, value: user["firstName"], msg: "" });
          setLname({ isError: false, value: user["lastName"], msg: "" });
          setEmail({ isError: false, value: user["emailId"], msg: "" });
          setAddress({
            isError: false,
            value: user["address"] === null ? "" : user["address"],
            msg: "",
          });
          setPhone({
            isError: false,
            value:
              user["contactNo"] &&
                user["contactNo"] !== null &&
                user["contactNo"] !== ""
                ? user["contactNo"]
                : null,
            msg: "",
            country: "us",
            code:
              user["countryCode"] &&
                user["countryCode"] !== null &&
                user["countryCode"] !== 0 &&
                user["countryCode"] !== ""
                ? user["countryCode"] + ""
                : "1",
          });
          setPostalCode({
            isError: false,
            value: user["postalCode"] === null ? "" : user["postalCode"],
            msg: "",
          });
          if (user && main.countries) {
            let countryObj = [];

            if (user["countryId"] !== null) {
              main.countries.map((data) => {
                if (user["countryId"] === data["countrY_ID"]) {

                  let selected = {
                    id: data["countrY_ID"],
                    name: data["countrY_NAME"],
                  };
                  countryObj.push(selected);
                }
              });
            }
            let cityObj = [];
            if (main.cities) {
              if (user["cityId"] !== null) {
                main.cities.map((data) => {
                  if (user["cityId"] === data["citY_ID"]) {
                    let selected = {
                      id: data["citY_ID"],
                      name: data["citY_NAME"],
                    };
                    cityObj.push(selected);
                  }
                });
              }
            }

            let provinceObj = [];
            if (main.provinces) {
              if (user["provinceId"] !== null) {

                main.provinces.map((data) => {
                  if (user["provinceId"] === data["provinancE_ID"]) {
                    let selected = {
                      id: data["provinancE_ID"],
                      name: data["prvinancE_NAME"],
                    };
                    provinceObj.push(selected);
                  }
                });
              }
            }

            setCountry({ isError: false, value: countryObj, msg: "" });
            setCity({ isError: false, value: cityObj, msg: "" });
            setProvince({ isError: false, value: provinceObj, msg: "" });
          }
        }
      );
      if (main.countries) {
        let options = [];
        main.countries.map((country) =>
          options.push({
            id: country["countrY_ID"],
            name: country["nicename"],
          })
        );
        setCountries(options);
      }

      if (main.cities) {
        let options = [];
        main.cities.map((city) => {

          options.push({ id: city["citY_ID"], name: city["citY_NAME"] })
        }
        );
        setCities(options);
      }

      if (main.provinces) {
        let options = [];
        main.provinces.map((province) =>
          options.push({
            id: province["provinancE_ID"],
            name: province["prvinancE_NAME"],
          })
        );
        setProvinces(options);
      }
    }
  }, [dispatch, main.countries, main.cities, main.provinces]);

  return (
    <div className={`card card-custom card-stretch`}>
      {/* begin::Header */}

      <div style={{ backgroundColor: "#F5F5F5", padding: "9px 20px" }}>
        <span style={{
          fontWeight: "600",
          fontSize: "18px",
          color: "#287CBC"
        }}>
          {t(`My Profile`)}
        </span><br />
        <span style={{
          fontWeight: "400",
          fontSize: "13px",
          marginTop: "1px"
        }}>{t(`This information is used to autofill your details to make it easier for you to make your bookings. Your details are stored securely andwill not be shared publicly`)}</span>
      </div>

      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-0 pt-2 ">
        {alertStatus.status && (
          <Alert severity={alertStatus.type} className="mb-3 ">
            {alertStatus.message}
          </Alert>
        )}
        <div className="row mb-1 mt-3">
          <div className="col-md-2">
            <Form.Group controlId="formGridState">
              <Form.Label>{t(`Title`)}</Form.Label>
              <Form.Control
                as="select"
                className={["rounded-shape", classes.inValid].join(' ')}
                value={title.value}
                onChange={(e) =>
                  setTitle({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={title.isError}
              // isValid={!title.isError}
              >
                <option value="">{t(`Choose`)}</option>
                <option value="Mr">{t(`MR`)}</option>
                <option value="Mrs">{t(`MRS`)}</option>
                <option value="Ms">{t(`MS`)}</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-5">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`First Name (as on travel document)`)}</Form.Label>
              <Form.Control
                type="text"
                className="rounded-shape"
                value={fname.value}
                onChange={(e) =>
                  setFname({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={fname.isError}
              />
            </Form.Group>
          </div>
          <div className="col-md-5">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`Last Name (as on travel document)`)}</Form.Label>
              <Form.Control
                type="text"
                className="rounded-shape"
                value={lname.value}
                onChange={(e) =>
                  setLname({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={lname.isError}
              />
            </Form.Group>
          </div>
        </div>

        <div className="row mb-1">
          <div className="col-md-5">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`Email (for booking confirmation)`)}</Form.Label>
              <Form.Control
                type="email"
                className="rounded-shape"
                value={email.value}
                disabled
              />
            </Form.Group>
          </div>

          <div className="col-md-5">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`Address`)}</Form.Label>
              <Form.Control
                type="text"
                className="rounded-shape"
                value={address.value}
                onChange={(e) =>
                  setAddress({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={address.isError}
              />
            </Form.Group>
          </div>
        </div>

        <div className="row mb-1">
          <div className="col-md-5">
            <Form.Group controlId="formBasicEmail">
              <Form.Label> {t(`Phone Number`)}</Form.Label>
              <PhoneInput
                enableSearch={true}
                inputClass={`countryField1 ${phone.isError ? "error-field1" : ""
                  }`}
                buttonClass={phone.isError ? "error-field1" : ""}
                searchStyle={{ width: "93%" }}
                value={phone.code + phone.value}
                onChange={(data, country) => {
                  setPhone({
                    isError: data === "",
                    msg: data === "" ? `${t(`This is required field!`)}` : "",
                    value: data.slice(country.dialCode.length),
                    country: country.countryCode,
                    code: country.dialCode,
                  });
                }}
                country={phone.country}
                error={true}
                disableSearchIcon={true}
              />
            </Form.Group>
          </div>
          <div className="col-md-5">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`Postal Code`)}</Form.Label>
              <Form.Control
                type="text"
                className="rounded-shape"
                value={postalCode.value}
                onChange={(e) =>
                  setPostalCode({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={postalCode.isError}
              />
            </Form.Group>
          </div>
        </div>

        <div className="row mb-1">
          <div className="col-md-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`Country`)}</Form.Label>
              <Typeahead
                className="rounded-shape"
                id="basic-typeahead-single"
                labelKey="name"
                onChange={countryChangeHandler}
                isInvalid={country.isError}
                options={countries}
                placeholder={t(`Choose a country...`)}
                selected={country.value}
              />

            </Form.Group>
          </div>

          <div className="col-md-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`Province`)}</Form.Label>
              <Typeahead
                className="rounded-shape"
                id="basic-typeahead-single"
                labelKey="name"
                onChange={provinceChangeHandler}
                isInvalid={province.isError}
                options={provinces}
                placeholder={t(`Choose a province...`)}
                selected={province.value}
              />

            </Form.Group>
          </div>

          <div className="col-md-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`City of travel document`)}</Form.Label>
              <Typeahead
                className="rounded-shape"
                id="basic-typeahead-single"
                labelKey="name"
                onChange={cityChangeHandler}
                isInvalid={city.isError}
                options={cities}
                placeholder={t(`Choose a city...`)}
                selected={city.value}
              />

            </Form.Group>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-2">
            <button
              className="loginBtn"
              onClick={updateSettingHandler}
             // disabled={main.updateSettingLoader}
            >
              {t(`Save`)}
              {/* {main.updateSettingLoader && (
                <span className="ml-3 spinner spinner-white"></span>
              )} */}
            </button>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
};
