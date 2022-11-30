import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "react-bootstrap";
import { Alert } from "@material-ui/lab";
import * as actions from "../../redux/adminActions"
import { useTranslation } from "react-i18next";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { postWerkcreditzPoints,createPoints } from "../../redux/adminCrud";

const useStyles = makeStyles({
  table: {
    margin: "auto",
    borderRadius: 20,
  },
  tableHead: {
    color: "#287CBC",
  },
  PromotionsMainHeader: { backgroundColor: "#F5F5F5", padding: "20px 20px", marginBottom: "6px" },
  PromotionsHeader: { fontWeight: "600", fontSize: "18px", color: "#287CBC" },
  PromotionsSubHeader: { fontWeight: "400", fontSize: "13px" },
});

const CreditPoints = () => {
  const classes = useStyles();
  const [type, setType] = useState({ isError: false, value: "", msg: "" });
  const [points, setPoints] = useState({ isError: false, value: "", msg: "" });
  const [time, setTime] = useState({ isError: false, value: "", msg: "" });
  const [werkCreditValue, setWerkCreditValue] = useState({ isError: false, value: "", msg: "" });
  const [currencyValue, setCurrencyValue] = useState({ isError: false, value: "", msg: "" });
  const [customAlert, setCustomAlert] = useState({ active: false, variant: "", msg: "" });
  const [loader, setLoader] = useState(false)
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { auth, admin } = useSelector((state) => state);
  const headers = {
    Authorization: "Bearer " + auth.authToken,
    "Content-Type": "application/json",
  };
  useEffect(() => {
     
    dispatch(actions.getWerkcreditzPoints(headers));
    dispatch(actions.getPoints(headers)).then((res)=>{

      setCurrencyValue({
        value: res[0].pointvalue,
        isError:"",
        msg: "",
      })
      setWerkCreditValue({
        value: res[0].creditpoint,
        isError:"",
        msg:"",
      })

    });
  }, []);
  const evaluateDate = (e) => {
    let options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };

  const resetAlert = () => {
    setTimeout(() => {
      setCustomAlert({ active: false, variant: "", msg: "" })
    }, 2000)
  }

  const onPostWerkcreditz = () => {
    setLoader(true)
    let isOK = true;
    if (!type.value) {
      setType({ ...type, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
      setLoader(false)
    }

    if (!points.value) {
      setPoints({ ...points, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
      setLoader(false)
    }
    if (parseInt(points.value) < 0) {
      setCustomAlert({ active: true, variant: "error", msg: `${t(`Invalid points`)}` })
      resetAlert()
      isOK = false;
      setLoader(false)
    }
    if (!time.value) {
      setTime({ ...time, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
      setLoader(false)
    }
    if (parseInt(time.value) <= 0) {
      setCustomAlert({ active: true, variant: "error", msg: `${t(`Invalid time`)}` })
      resetAlert()
      setLoader(false)
      isOK = false;
    }
    if (isOK) {
      let payload = {
        id: JSON.parse(type.value).id,
        "type": JSON.parse(type.value).type,
        "points": parseInt(points.value),
        "expirytime": parseInt(time.value)
      }
      postWerkcreditzPoints(headers, payload).then((res) => {
        if (res.status === 200) {
          setLoader(false)
          setCustomAlert({ active: true, variant: "success", msg: `${t(`Werkcreditz Configurations Updated Successfully`)}` })
          resetAlert()
          dispatch(actions.getWerkcreditzPoints(headers))
          setPoints({ isError: false, value: "", msg: "" })
          setTime({ isError: false, value: "", msg: "" })
        }
      }).catch((err) => {
        setLoader(false)
        setCustomAlert({ active: true, variant: "error", msg: `${t(`Something went wrong updating configurations`)}` })
        resetAlert()
      })
    }
  }

  const onWerkCreditzConversion = () => {
    let isOK=true
    console.log("done")
    if(!currencyValue.value){
      setCustomAlert({ active: true, variant: "error", msg: `${t(`Werkcredit required`)}` })
      isOK=false
    }
    else if(!werkCreditValue.value){
      setCustomAlert({ active: true, variant: "error", msg: `${t(`USD required`)}` })
      isOK=false
    }

    if (isOK) {
      let payload = {
        creditPoint: parseInt(currencyValue.value),
        pointValue: parseInt(werkCreditValue.value)
      }
      createPoints(headers,payload).then((res)=>{
        console.log("done")
        dispatch(actions.getPoints(headers)).then((res)=>{

          setCurrencyValue({
            value: res[0].pointvalue,
            isError:"",
            msg: "",
          })
          setWerkCreditValue({
            value: res[0].creditpoint,
            isError:"",
            msg:"",
          })
    
        });
        setCustomAlert({ active: true, variant: "success", msg: `${t(`Point created Successfully`)}` })
      })
    }
    setTimeout(() => {
      setCustomAlert({ active: false, variant: "", msg: "" })
    }, 2000)

  }

  return (
    <div className={`card card-custom card-stretch`}>

      <div className={classes.PromotionsMainHeader}>
        <span className={classes.PromotionsHeader}>
          {t(`Werkcreditz`)}
        </span>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-0 ">
        {customAlert.active && (
          <Alert severity={customAlert.variant} className="mb-3">
            {customAlert.msg}
          </Alert>
        )}
        <div className="row mb-1 justify-content-center">
          <div className="col-md-4 ">
            <Form.Group controlId="formGridState">
              <Form.Label>{t(`Type`)}</Form.Label>
              <Form.Control
                as="select"
                className="rounded-shape"
                value={type.value}
                onChange={(e) => {
                  setType({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  });
                  setPoints({
                    value:
                      e.target.value !== ""
                        ? JSON.parse(e.target.value).points
                        : "",
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  });
                  setTime({
                    value:
                      e.target.value !== ""
                        ? JSON.parse(e.target.value).expirytime
                        : "",
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  });
                }}
                isInvalid={type.isError}
              // isValid={!title.isError}
              >
                <option value="">{t(`Choose`)}</option>
                {admin.werkcreditz !== null
                  ? admin.werkcreditz.map((item) => (
                    <option value={JSON.stringify(item)}>{item.type}</option>
                  ))
                  : null}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`Points`)}</Form.Label>
              <Form.Control
                type="number"
                className="rounded-shape"
                value={points.value}
                onChange={(e) =>
                  setPoints({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={points.isError}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`Expiry Time(In days)`)}</Form.Label>
              <Form.Control
                type="number"
                className="rounded-shape"
                value={time.value}
                onChange={(e) =>
                  setTime({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={time.isError}
              />
            </Form.Group>
          </div>

          <div className="col-md-2 col-sm-3 col-xs-3 pt-2  pr-5 pb-3">
            <button
              className="loginBtn"
              onClick={onPostWerkcreditz}
            // disabled={}
            >
              {t(`Save`)}
              {/* {loader && (
                <span className="ml-3 spinner spinner-white"></span>
              )} */}

            </button>
          </div>
        </div>
        {/* Table Starts here */}

        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead} align="center">
                  {t(`Type`)}
                </TableCell>
                <TableCell className={classes.tableHead} align="center">
                  {t(`Points`)}
                </TableCell>
                <TableCell className={classes.tableHead} align="center">
                  {t(`Expiry Time(In days)`)}
                </TableCell>
                <TableCell className={classes.tableHead} align="center">
                  {t(`Updated_on`)}
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {/* We have to map the data here */}

              {admin.werkcreditz !== null
                ? admin.werkcreditz.map((item) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{item.type}</TableCell>
                    <TableCell align="center">{item.points}</TableCell>
                    <TableCell align="center">{item.expirytime}</TableCell>
                    <TableCell align="center">{item.updateOn !== undefined ? evaluateDate(item.updateOn) : ''}</TableCell>
                    <TableCell align="center">{item.expirydate}</TableCell>                    </TableRow>
                ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table ends here */}
      </div>
      {/* end::Body */}
      <div className="card-body py-0 ">
        <div className="border-0">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder  text-dark" style={{ fontSize: 16 }}>
              {t(`Werkcreditz Conversion`)}
            </span>
          </h3>
        </div>
        <div className="row mb-1 m-3">
          <div className="col-md-3">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`Werkcredit`)}</Form.Label>
              <Form.Control
                type="number"
                className="rounded-shape"
                value={werkCreditValue.value}
                onChange={(e) =>
                  setWerkCreditValue({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={werkCreditValue.isError}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t(`USD`)}</Form.Label>
              <Form.Control
                type="number"
                className="rounded-shape"
                value={currencyValue.value}
                onChange={(e) =>
                  setCurrencyValue({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? `${t(`This is required field!`)}` : "",
                  })
                }
                isInvalid={currencyValue.isError}
              />
            </Form.Group>
          </div>

          <div className="col-md-2 col-sm-3 col-xs-3 pt-2  pr-5 pb-3">
            <button
              className="loginBtn"
              onClick={onWerkCreditzConversion}
            // disabled={}
            >
              {t(`Save`)}
              {/* {loader && (
                <span className="ml-3 spinner spinner-white"></span>
              )} */}

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditPoints;
