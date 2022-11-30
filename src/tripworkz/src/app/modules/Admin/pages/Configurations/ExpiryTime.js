import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "react-bootstrap";
import * as actions from "../../redux/adminActions";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postWerkcreditzExpiryPoints } from "../../redux/adminCrud";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  table: {
    margin: "auto",
    borderRadius: 20,
  },
  tableHead: {
    color: "#287CBC",
  },
});

const ExpiryTime = () => {
  const classes = useStyles();
  const [type, setType] = useState({ isError: false, value: "", msg: "" });
  const [time, setTime] = useState({ isError: false, value: "", msg: "" });
  const [customAlert, setCustomAlert] = useState({ active: true, variant: "", msg: "" });
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()
  const { auth, admin } = useSelector((state) => state);
  const evaluateDate = (e) => {
    let options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };
  const headers = {
    Authorization: "Bearer " + auth.authToken,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    dispatch(actions.getWerkcreditzPointsExpiry(headers));
  }, []);

  const resetAlert = () => {
    setTimeout(() => {
      setCustomAlert({ active: false, variant: "", msg: "" })
    },2000 )
  }

  const onPostWerkcreditzExpiry = () => {
    setLoader(true)
    let isOK = true;
    if (!type.value) {
      setType({ ...type, isError: true, msg: "This is required field!" });
      isOK = false;
    }
    if (!time.value) {
      setTime({ ...time, isError: true, msg: "This is required field!" });
      isOK = false;
    }
    if(isOK){
      let payload = {
        id: JSON.parse(type.value).id,
        "type": JSON.parse(type.value).type,
        "expirytime": parseInt(time.value),
      }
      postWerkcreditzExpiryPoints(headers,payload).then((res) => {
        if(res.status === 200){
          setLoader(false)
          setCustomAlert({active: true, variant: "success", msg: "Werkcreditz Expiry Configurations Updated Successfully"})
          resetAlert()
          dispatch(actions.getWerkcreditzPointsExpiry(headers))
          setTime({ isError: false, value: "", msg: "" })
        }
      }).catch((err) => {
        setLoader(false)
        setCustomAlert({active: true, variant: "error", msg: "Something went wrong updating configurations."})
        resetAlert()
      })
    }
  }

  return (
    <div className={`card card-custom card-stretch`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Werkcreditz Expiry Configuration
          </span>
          <span className="mt-2 font-weight-light font-size-sm">
            This is a test paragraph....the real description will be pasted here
            once we get it.
          </span>
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-0 ">
      {customAlert.active && <Alert severity={customAlert.variant} className="mb-3">{customAlert.msg}</Alert>}
        <div className="row mb-1 justify-content-center">
          <div className="col-md-4">
            <Form.Group controlId="formGridState">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                className="rounded-shape"
                value={type.value}
                onChange={(e) => {
                  setType({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? "This is required field!" : "",
                  });
                  setTime({
                    value:
                      e.target.value !== ""
                        ? JSON.parse(e.target.value).expirytime
                        : "",
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? "This is required field!" : "",
                  });
                }}
                isInvalid={type.isError}
                // isValid={!title.isError}
              >
                <option value="">Choose...</option>
                {admin.werkcreditzExpiry !== null
                  ? admin.werkcreditzExpiry.map((item) => (
                      <option value={JSON.stringify(item)}>{item.type}</option>
                    ))
                  : null}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Time(In days):</Form.Label>
              <Form.Control
                type="number"
                className="rounded-shape"
                value={time.value}
                onChange={(e) =>
                  setTime({
                    value: e.target.value,
                    isError: e.target.value === "",
                    msg: e.target.value === "" ? "This is required field!" : "",
                  })
                }
                isInvalid={time.isError}
              />
            </Form.Group>
          </div>

          <div className="col-md-2 col-sm-3 col-xs-3 pt-2  pr-5 pb-3">
            <button
              className="loginBtn"
              onClick={onPostWerkcreditzExpiry}
              // disabled={}
            >
              Save
              {loader && (
                  <span className="ml-3 spinner spinner-white"></span>
                )} 
               
            </button>
          </div>
        </div>
        {/* Table Starts here */}

        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead} align="center">
                  Type
                </TableCell>
                <TableCell className={classes.tableHead} align="center">
                  Time
                </TableCell>
                <TableCell className={classes.tableHead} align="center">
                  Updated on
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* We have to map the data here */}
              {admin.werkcreditzExpiry !== null
                ? admin.werkcreditzExpiry.map((item) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{item.type}</TableCell>
                      <TableCell align="center">{item.expirytime}</TableCell>
                      <TableCell align="center">{item.updateOn !== undefined ? evaluateDate(item.updateOn) : ''}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table ends here */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export default ExpiryTime;
