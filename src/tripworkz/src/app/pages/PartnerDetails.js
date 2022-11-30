import React, { useEffect } from "react";
import * as actions from "../components/_redux/mainActions";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Form, Button } from "react-bootstrap";
import Alert from "@material-ui/lab/Alert";
import { CircularProgress } from "@material-ui/core"
import Moment from 'moment';

import {
  Table,
  Paper,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
  heading:{
    fontWeight: "500",
    fontSize: "16px",
  },
  tableHead: {
    color: "#287CBC",
    width: "100px",
    overflow: "hidden",
  },

  tableCell: {
    wordBreak: "break-all",

  },
  Icons: {
    color: "#287CBC",
    cursor: "pointer",
  },

  deleteIcons: {
    color: "red",
    cursor: "pointer",
  },
  paper: {
    backgroundColor: "#F7F6F8",
    border: "1px solid #287CBC",
    boxShadow: 5,
    padding: 10,
    borderRadius: 20,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  notFound:{
    color:'#B5B5C3',  
    fontWeight:'400',
    fontSize:'16px',
    textAlign:'center',
    paddingTop:"25px"
  },
  pleaseWait: {
    textAlign: "center",
    padding: "10px",
    fontSize: "20px",
    width: "100%",
    color: "#287CBC",
    fontWeight: "500",
  },
}))
export const PartnerDetails = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { auth, main } = useSelector((state) => state);
  const [partnerDetails, setPartnerDetails] = useState([])
  const [itemsToDisplay, setItemstoDisplay] = useState([])
  const [pageSize, setPageSize] = useState(2)
  const [currentPage, setCurrentPage] = useState(1)
  const [handelDeleteOpen, setHandelDeleteOpen] = useState(false);
  const [handelEditOpen, setHandelEditOpen] = useState(false);
  const [partnerId, setPartnerId] = useState()
  const [editItem, setEditItem] = useState()
  const [loader, setLoader] = useState(false)
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


  const [validationAlertStatus, setValidationAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });


  useEffect(() => {
    let data = []
    setLoader(true)
    
    if (main.partners !== null) {
      
      for (let index = 0; index < main.partners.length; index++) {
        if (main.partners[index].isDelete === false) {
          data.push(main.partners[index])
        }
      }  
      let items = [...data]
      setItemstoDisplay(items.slice(0, 2))
      setPartnerDetails(data)
    }
    setLoader(false)
  }, [main]);
  useEffect(() => {
    if(props.bookingReferenceNo){
    dispatch(actions.getPartnersDetails(props.bookingReferenceNo))
    }
  }, [props.bookingReferenceNo]);

  const handelDelete = (id) => {
    setHandelDeleteOpen(true);
    setPartnerId(id)
  };
  const handelDeleteClose = () => {
    setHandelDeleteOpen(false);
  };


  const handelEdit = (item) => {
    setHandelEditOpen(true);
    setEditItem(item)
    setName({
      isError: false,
      value: item.name,
      msg: "",
    });
    setPassportNo({
      isError: false,
      value: item.passportNumber,
      msg: "",
    });
    const date = item.dob.slice(0, 10);
    setDateOfBirth({
      isError: false,
      value: date,
      msg: "",
    });
    setEmail({
      isError: false, value: item.emailId, msg: ""
    });
    setGender({
      isError: false,
      value: item.gender,
      msg: "",
    });

    setContactNo({
      isError: false,
      value: item.contactNo,
      msg: "",
    });
  };
  const handelEditClose = () => {
    setHandelEditOpen(false);
  };


  const handlePageChange = (e, val) => {
    setCurrentPage(val)
    let items = [...partnerDetails]
    setItemstoDisplay(items.slice(pageSize * (val - 1), pageSize * val))
  }

  const deletePartner = () => {
    dispatch(actions.deletePartnerById(partnerId)).then((response) => {
      if (response.status === 200) {
        dispatch(actions.getPartnersDetails(props.bookingReferenceNo))

        setAlertStatus({
          status: true,
          message: `${t(`Partner deleted successfully`)}`,
          type: "success",
        });

        setTimeout(function () {
          setAlertStatus({ status: false, message: "", type: "" });
        }, 5000); //5 Second delay
        handelDeleteClose()
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


  }


  const onUpdatePartner = () => {
    let isOK = true;

    if (!name.value) {
      setValidationAlertStatus({
        status: true,
        message: `${t(`Name is required`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setValidationAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }

    if (contactNo.value.length > 10 || contactNo.value.length < 10) {
      setValidationAlertStatus({
        status: true,
        message: `${t(`Contact number must be 10 digit`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setValidationAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }



    if (!dateOfBirth.value) {
      setValidationAlertStatus({
        status: true,
        message: `${t(`Date of birth is required`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setValidationAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }

    if (dateOfBirth.value>Moment( new Date()).format('YYYY-MM-DD')) {
      setValidationAlertStatus({
        status: true,
        message: `${t(`Date of birth should not future date`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setValidationAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }


    if (!email.value) {
      setValidationAlertStatus({
        status: true,
        message: `${t(`Email is required`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setValidationAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }


    if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
      setValidationAlertStatus({
        status: true,
        message: `${t(`Please enter valid email`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setValidationAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;


    }

    if (!gender.value) {
      setValidationAlertStatus({
        status: true,
        message: `${t(`Gender is required`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setValidationAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }



    if (isOK) {
      let body = {
        id: editItem.id,
        bookingRefNumber: editItem.bookingReferenceNo,
        name: name.value,
       // passportNo: passportNo.value,
        dob: dateOfBirth.value,
        emailId: email.value,
        gender: gender.value,
        phoneNumber: contactNo.value
      }


      //Add Partner Details
      dispatch(actions.editPartner(body))
        .then((response) => {
          if (response === "Updated") {
            handlePageChange();
            dispatch(actions.getPartnersDetails(props.bookingReferenceNo))
            // dispatch(actions.getPartnersDetails(bookingReferenceNo))

            setAlertStatus({
              status: true,
              message: `${t(`Partner details updated successfully`)}`,
              type: "success",
            });

            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay
            handelEditClose()
            return null;
          }

          else {
            setValidationAlertStatus({
              status: true,
              message: `${t(`Something went wrong`)}`,
              type: "error",
            });

            setTimeout(function () {
              setValidationAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay

            return null;
          }
        })

    }
  }

 

  return (
    <div>
      <div className="mb-2 ml-2 h3">
      <span className={classes.heading}>   {t(`Partners Details`)}</span>
      </div>
      <TableContainer className={classes.table} component={Paper}>
        {alertStatus.status && (
          <Alert severity={alertStatus.type} >
            {alertStatus.message}
          </Alert>
        )}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="center">
                {t(`Full Name`)}
              </TableCell>
              {/* <TableCell className={classes.tableHead} align="center">
                Passport Number
              </TableCell> */}
              <TableCell className={classes.tableHead} align="center">
                {t(`Date of Birth`)}
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                {t(`Email`)}
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                {t(`Gender`)}
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                {t(`Contact Number`)}
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                {t(`Edit`)}
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                {t(`Delete`)}
              </TableCell>
            </TableRow>
          </TableHead>
          {loader? <div className={classes.pleaseWait}>{t(`Please wait`)}...</div>:
          partnerDetails.length > 0 ?
            <TableBody>
              {/* We have to map the data here */}
              {itemsToDisplay.map((item, index) => (


                <TableRow key={item.id}>
                  <TableCell className={classes.tableCell} align="center">{item.name}</TableCell>
                  {/* <TableCell className={classes.tableCell} align="center">{item.passportNumber}</TableCell> */}
                  <TableCell className={classes.tableCell} align="center">{item.dob.slice(0, 10)}</TableCell>
                  <TableCell className={classes.tableCell} align="center" > {item.emailId}</TableCell>
                  <TableCell className={classes.tableCell} align="center">{item.gender}</TableCell>
                  <TableCell className={classes.tableCell} align="center"> {item.contactNo}</TableCell>
                  <TableCell className={classes.tableCell} align="center">

                    {/* <Link Link to={`/my-card/edit-card/${item.id}`}> */}
                    <CreateIcon className={classes.Icons}
                      onClick={() => {
                        handelEdit(item);
                      }} />
                    {/* </Link> */}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    <DeleteForeverIcon
                      onClick={() => {
                        handelDelete(item.id);
                      }}
                      className={classes.deleteIcons} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            : null}
        </Table>

      </TableContainer>
      {/* Popup for Delete */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={handelDeleteOpen}
        onClose={handelDeleteClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={handelDeleteOpen}>
          <div className={classes.paper}>
            {/* {alertStatus.status && (
              <Alert severity={alertStatus.type} >
                {alertStatus.message}
              </Alert>
            )} */}
            <span className="m-5" id="transition-modal-title " style={{fontSize:"18px",fontWeight:"500"}}>
               {t(`Are you sure you want to delete this partner ?`)}
            </span>
            <div className="text-center m-5">
              <button
                className="btn btn-outline-danger btn-md m-2 w-25"
                onClick={() => deletePartner()}
              >
                 {t(`Yes`)}
              </button>
              <button
                onClick={handelDeleteClose}
                className="btn btn-outline-secondary w-25 btn-md m-2"
              >
                {t(`No`)}
              </button>
            </div>
          </div>
        </Fade>
      </Modal>

      {/* DELETE POPUP END */}

      {/* EDIT POPUP */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={handelEditOpen}
        onClose={handelEditOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>

        <Fade in={handelEditOpen}>
          <div className={classes.paper} >

            <div className={("card-body px-20 py-4")}>
              <div className="row  ">
                <div className="col-md-12">
                  {validationAlertStatus.status && (
                    <Alert severity={validationAlertStatus.type} >
                      {validationAlertStatus.message}
                    </Alert>
                  )}
                </div>
                <div style={{color:'#287CBC',fontSize:'16px',fontWeight:'400',margin:"20px 10px"}}>{t(`Edit partner details`)}</div>
              </div>
              <div className="row mb-1 ">
                <div className="col-md-6">
                  <Form.Group controlId="nameBasic">
                    <Form.Label style={{ color: "#287CBC" }}>{t(`Full Name`)} </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t(`Full Name`)}
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
                  className="btn btn-primary rounded-pill btn-md m-2 w-25"
                  onClick={() => { onUpdatePartner() }}
                  style={{background:"#287CBC",color:"#ffffff"}}>
                  {t(`Submit`)}

                </Button>
                <Button
                  onClick={handelEditClose}
                  className="btn btn-outline-primary w-25 rounded-pill ml-10"
                  style={{background:"#287CBC",color:"#ffffff"}}>
                  {t(`Cancel`)}
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>

      {/* EDIT POPUP END */}
      {partnerDetails.length > 0 ?
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center mt-6">
            <Pagination
              size="large"
              variant="outlined"
              color="secondary"
              className="primary"
              count={Math.ceil(partnerDetails.length / pageSize)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
        :
       loader? null:
        <div className={classes.notFound}>{t(`No Record Found`)} </div>
      }
    </div>
  )
};
