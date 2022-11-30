import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import * as actions from "../../redux/adminActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";

import { useTranslation } from "react-i18next";
const useStyles = makeStyles({
  cardContainer: {
    width: "80%",
    margin: "auto",
  },
  textHead: {
    color: "#287CBC",
  },
  mainContainer: {
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
});

const EditPromoCode = () => {
  let { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState({ isError: false, value: "", msg: "" });
  const [giftCode, setGiftCode] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [discountAmount, setDiscountAmount] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [discount, setDiscount] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [details, setDetails] = useState({
    isError: false,
    value: "",
    msg: "",
  });

  const [validTill, setValidTill] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [discountType, setDiscountType] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [body, setBody] = useState();

  useEffect(() => {
    const evaluateDate = (e) => {
      let options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(e).toLocaleDateString("en-us", options);
    };
    if (id) {
      dispatch(actions.getSelectedPromocodeById(id))
        .then((response) => {
          const date = new Date(response.expiredon).toISOString().slice(0, 10);
          setTitle({ ...title, value: response.title });
          setGiftCode({ ...giftCode, value: response.giftcode });
          setDiscountType({
            ...discountType,
            value: response.DiscountType,
          });
          setDiscount({ ...discount, value: response.discount_value });
          setValidTill({ ...validTill, value: date });
          setDetails({ value: response.detail });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const onEditSubmit = () => {
    let isOK = true;
    if (!title.value) {
      setTitle({ ...title, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }
    if (!giftCode.value) {
      setGiftCode({
        ...giftCode,
        isError: true,
        msg: `${t(`This is required field!`)}`,
      });
      isOK = false;
    }
    if (!discountType.value || discountType.value === "selected") {
      setDiscountType({
        ...discountAmount,
        isError: true,
        msg: `${t(`Please select discount type!`)}`,
      });
      isOK = false;
    }
    if (!discount.value) {
      setDiscount({
        ...discount,
        isError: true,
        msg: `${t(`This is required field!`)}`,
      });
      isOK = false;
    }
    if (!validTill.value) {
      setValidTill({
        ...validTill,
        isError: true,
        msg: `${t(`This is required field!`)}`,
      });
      isOK = false;
    }
    if (!details.value) {
      setDetails({ ...details, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }
    if (isOK) {
      
      let body1 = {
        id: parseInt(id),
        title: title.value,
        detail: details.value,
        DiscountType:discountType.value,
        discount_value:parseInt(discount.value),
        giftcode: giftCode.value,
        expiredon: validTill.value,
      };
      setLoader(true);
      dispatch(actions.editPromocode(body1))
        .then((response) => {
          if (response.status === 200) {
            setLoader(false);
            history.push("/admin/promocodes/list");
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
            setLoader(false);
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
          setLoader(false);
        });
    }
  };

  return (
    <div className={`card card-custom `}>
      {/* begin::Header */}
    

      <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`Promocodes`)}
            </span>
            <Link to="/admin/promocodes/list">
            <button className={classes.backButton}>{t(`Back`)}</button>
            </Link>
            {/* <span classes={classes.SubTitle}>{t(`Use your credits for your future purchases`)}</span> */}
          </div>


      {/* end::Header */}

      {/* begin::Body */}
      <Paper className="ml-10 mr-10 mb-20 mt-10 pl-5 rounded-lg" elevation={5}>
        <div className="card-header border-0 py-5 mt-5">
          <h3 className="card-title align-items-bi flex-column">
            <span className={("card-label", classes.textHead)}>
               {t(`Edit_promocode`)}
            </span>
          </h3>
        </div>
        <div className={("card-body py-0", classes.cardContainer)}>
          <div className="row mb-1 ">
            <div className="col-md-8">
              <Form.Group controlId="titleBasic">
                <Form.Label style={{ color: "#287CBC" }}>{t(`Title`)}</Form.Label>
                <Form.Control
                  type="text"
                  className="rounded-shape"
                  value={title.value}
                  onChange={(e) =>
                    setTitle({
                      value: e.target.value,
                      isError: e.target.value === "",
                      msg:
                        e.target.value === "" ? `${t(`This is required field!`)}` : "",
                    })
                  }
                  isInvalid={title.isError}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row mb-1 ">
            <div className="col-md-8">
              <Form.Group controlId="priceBasic">
                <Form.Label style={{ color: "#287CBC" }}>{t(`Details`)}</Form.Label>
                <Form.Control
                  type="text"
                  className="rounded-shape"
                  value={details.value}
                  onChange={(e) =>
                    setDetails({
                      value: e.target.value,
                      isError: e.target.value === "",
                      msg:
                        e.target.value === "" ? `${t(`This is required field!`)}` : "",
                    })
                  }
                  isInvalid={details.isError}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-md-8">
              <Form.Group controlId="giftCodeBasic">
                <Form.Label style={{ color: "#287CBC" }}>{t(`Gift Code`)}</Form.Label>
                <Form.Control
                  type="text"
                  className="rounded-shape"
                  value={giftCode.value}
                  onChange={(e) =>
                    setGiftCode({
                      value: e.target.value,
                      isError: e.target.value === "",
                      msg:
                        e.target.value === "" ? `${t(`This is required field!`)}` : "",
                    })
                  }
                  isInvalid={giftCode.isError}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-1 ">
            <div className="col-md-8">
              <Form.Group controlId="discountAmountBasic">
                <Form.Label style={{ color: "#287CBC" }}>{t(`Discount Type`)}</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  className="rounded-shape"
                  value={discountType.value}
                  onChange={(e) =>
                    setDiscountType({
                      value: e.target.value,
                      isError: e.target.value === "",
                      msg:
                        e.target.value === "" ? `${t(`This is required field!`)}` : "",
                    })
                  }
                  isInvalid={discountType.isError}
                >
                  <option value="">{t(`Select`)}</option>
                  <option value="InPercent">{t(`Percentage`)}</option>
                  <option value="InAmount">{t(`Amount`)}</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          {discountType.value && discountType.value !== "selected" ? (
            <div className="row mb-1 ">
              <div className="col-md-8">
                <Form.Group controlId="discountBasic">
                  <Form.Label style={{ color: "#287CBC" }}>
                    {`Discount ${
                      discountType.value !== ""
                      ? discountType.value === "InPercent"? "(%)":"(Amount)"
                      : null
                    }`}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    className="rounded-shape"
                    value={discount.value}
                    onChange={(e) =>
                      setDiscount({
                        value: e.target.value,
                        isError: e.target.value === "",
                        msg:
                          e.target.value === ""
                            ? `${t(`This is required field!`)}`
                            : "",
                      })
                    }
                    isInvalid={discount.isError}
                  />
                </Form.Group>
              </div>
            </div>
          ) : null}

          <div className="row mb-1 ">
            <div className="col-md-8">
              <Form.Group controlId="pointsBasic">
                <Form.Label style={{ color: "#287CBC" }}>{t(`Valid Till`)}</Form.Label>
                <Form.Control
                  type="date"
                  className="rounded-shape"
                  value={validTill.value}
                  onChange={(e) =>
                    setValidTill({
                      value: e.target.value,
                      isError: e.target.value === "",
                      msg:
                        e.target.value === "" ? `${t(`This is required field!`)}` : "",
                    })
                  }
                  isInvalid={validTill.isError}
                />
              </Form.Group>
            </div>
          </div>
          {alertStatus.status && (
            <div className="row mb-10 ">
              <div className="col-md-8">
                <Alert severity={alertStatus.type} className="mb-3">
                  {alertStatus.message}
                </Alert>
              </div>
            </div>
          )}
          <div className="row mb-10 ">
            <div className="col-md-4">
              <button
                className="loginBtn"
                onClick={onEditSubmit}
                disabled={loader}
              >
                {loader ? (
                  <span className="ml-3 spinner spinner-white"></span>
                ) : (
                  `${t(`Save`)}`
                )}
              </button>
            </div>

            <div className="col-md-4">
              <Link to="/admin/promocodes/list">
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

export default EditPromoCode;
