import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import 'react-phone-input-2/lib/high-res.css'
import Alert from '@material-ui/lab/Alert';
import { Button } from "react-bootstrap";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
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
const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
  Add_A_payment: {
    backgroundColor: '#287CBC',
    border: 'none',
    color: '#fff',
    padding: '8px 20px',
    borderRadius: '10px',
  },
  Paymentbtn: {
    textAlign: 'right', [theme.breakpoints.down("sm")]: {
      textAlign: 'center',
    },
  },
  Deluxerooms: {
    width: "97%",
    float: "left",
    padding: "10px 0px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "auto",
  },

  deleteIcon: {
    color: "red",
    cursor: "pointer",
  },
  editIcon: {
    color: "#287CBC",
    cursor: "pointer",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#F7F6F8",
    border: "1px solid #287CBC",
    boxShadow: 5,
    padding: 10,
    borderRadius: 20,
  },
  tableHead: {
    color: "#287CBC",
    fontSize: "14px",
    fontWeight: "400",
  },

  dateField: {
    borderRadius: "50px !important",
    borderColor: "#B4CFEC",
    padding: "3%",
    color: "#ccc"
  },
  MainHeader: { backgroundColor: "#F5F5F5", padding: "10px 20px" },
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
  error:{fontSize: "16px",
  fontWeight: "400",
  color: "#B5B5C3",},
  pleaseWait: {
    textAlign: "center",
    padding: "10px",
    fontSize: "20px",
    width: "100%",
    color: "#287CBC",
    fontWeight: "500",
  },


}))
export const ManagePaymentMethods = (props) => {
  const { auth, main } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [itemsToDisplay, setItemstoDisplay] = useState([])
  const [allCards, setAllCards] = useState([])
  const { t } = useTranslation();
  const [expiryDate, setExpiryDate] = useState({
    isError:false,
    value:'',
    msg:''
  });
  const [pageSize, setPageSize] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });

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
     

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    return [mnth, date.getFullYear(),].join("-");
  }
  const handleexpiryDate = (date) => {
    console.log('date>>>>..........???',date)
    setExpiryDate({
      isError:false,
      value:date,
      msg:''
    });
  };

  let userId = auth.user.userId
  useEffect(() => {
    setLoader(true)  
    dispatch(actions.getAllCardList(userId))
      .then((response) => {
        if(response.responseData){
        setAllCards(response.responseData)
        setLoader(false)
        }
      })
      console.log("date",Moment(new Date).subtract(1, 'months').format('MM/YYYY'))
  }, []);


  useEffect(() => {
    if (main.cards !== null) {
      setAllCards(main.cards.responseData);
      let items = [...main.cards.responseData]
      setItemstoDisplay(items.slice(0, 8))
    }
  }, [main]);


  const handelCancel = () => {
    setCardName({ isError: false, value: "", msg: "" })
    setExpiryDate({
      isError:false,
      value:'',
      msg:''
    })
    setCardNumber({ isError: false, value: "", msg: "" })
  }

  const handleOpen = (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const cardDelete = () => {
    dispatch(actions.deleteCard(selectedId)).then((response) => {
      if (response.status === 200) {
        dispatch(actions.getAllCardList(userId))
          .then((response) => {
            if(response.responseData){
            setAllCards(response.responseData)
            }

          })
        setAlertStatus({
          status: true,
          message: `${t(`Successfully Deleted`)}`,
          type: "success",
        });
        setTimeout(function () {
          setAlertStatus({ status: false, message: "", type: "" });
        }, 5000); //5 Second delay
      } else {
        setAlertStatus({
          status: true,
          message: `${t(`Unable to delete`)}`,
          type: "error",
        });
        setTimeout(function () {
          setAlertStatus({ status: false, message: "", type: "" });
        }, 5000); //5 Second delay

        return null;
      }
    });
    handleClose();
  };

  let isOK = false;
  const addNewCard = () => {
    console.log("expiryDate",expiryDate)
  //  let yesterday = ( d => new Date(d.setDate(d.getDate()-31)) )(new Date);
    
    isOK = true;

    if (!cardName.value) {
        setCardName({ ...cardName, isError: true, msg: `${t(`This is required field!`)}` });
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
    if (! /^[a-z A-Z\s]+$/.test(cardName.value)) {
      setCardName({ ...cardName, isError: true, msg: `${t(`This is required field!`)}` });
      setAlertStatus({
        status: true,
        message: `${t(`Enter valid name (only alphabets are allowed)`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }
    
    if(!cardNumber.value){
      setCardNumber({value:"", isError: true, msg: `${t(`Card number must be 16 digit`)}` });
      setAlertStatus({
        status: true,
        message: `${t(`Card number is required`)}`,
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


    if (!expiryDate.value) {
      setExpiryDate({
        isError:true,
        value:'',
        msg:`${t(`Expiry date is required`)}`
      })
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
        userId: userId,
        nameOnCard: cardName.value,
        cardNo: cardNumber.value,
        expiryDate: (convert(expiryDate.value))
      }


      dispatch(actions.addCard(body))
        .then((response) => {
          if (response.responseCode === 200) {
            dispatch(actions.getAllCardList(userId))
              .then((response) => {
                setAllCards(response.responseData)
              })

            handelCancel()
            setAlertStatus({
              status: true,
              message: `${t(`Card Added Successfully`)}`,
              type: "success",
            });

            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay

            return null;
          }
          if (response.response.data.responseCode === 400) {
            dispatch(actions.getAllCardList(userId))
              .then((response) => {
                setAllCards(response.responseData)
              })

            handelCancel()
            setAlertStatus({
              status: true,
              message: response.response.data.responseMessage,
              type: "error",
            });

            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay

            return null;
          }


        })
        .catch((error) => {
          console.log(error, "errror")
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

  const setCardAsPrimary = (id, name, isPrimary) => {
    let body = {
      id: id,
      isPrimary: isPrimary
    }
    console.log("done3")
    dispatch(actions.addPrimaryCard(body))
      .then((response) => {
        console.log("done",response)
        if (response.responseCode === 200) {
        console.log("done1",response)
          dispatch(actions.getAllCardList(userId))
          setAlertStatus({
            status: true,
            message: ` ${name} ${t(`card set as Primary card`)}`,
            type: "success",
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


  const handlePageChange = (e, val) => {
    setCurrentPage(val)
    let items = [...allCards]
    setItemstoDisplay(items.slice(pageSize * (val - 1), pageSize * val))
  }
  const [cardNamePlaceholder, setCardNamePlaceholder] = useState('Card Name');
  const [cardNumberPlaceholder, setCardNumberPlaceholder] = useState('Card Number');
  const [cardExpiryPlaceholder, setCardExpiryPlaceholder] = useState('Expiry Date');
  let date = new Date();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return (
    <div className={`card card-custom card-stretch`}>
      <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`Manage Payment Methods`)}
            </span><br />
            <span classes={classes.SubTitle}>{t(`All your registered payment method will be shown here`)}</span>
          </div>
      {/* <div className={'pl-5  pr-5'}> */}
        <div className="container" style={{paddingTop:'25px',paddingBottom:'25px'}}>
          <div className="row position-relative">
            
          {
            alertStatus.message !== '' &&<Alert severity={alertStatus.type} style={{marginLeft:'13px',marginBottom:'25px'}} >
            {alertStatus.message}
          </Alert>
          }
            <div className={classes.Deluxerooms}>
              <div className={' pb-5 pl-5 pr-5'}>
                <div className="row ml-10">
                  <div className="col-md-8 mb-8" style={{ fontWeight: "600", fontSize: "15px", }}>
                    {t(`Add Card Details`)}
                  </div>
                  {/* <div className="col-md-4 flex-end">

                  </div> */}
                </div>
                <div className="row ml-10">
                  <div className="col-md-4">  
                    <Form.Group controlId="formCardName">
                      <Form.Label className="ml-4">{t(`Card Name`)}</Form.Label>
                      <Form.Control
                        type="text"
                        className="rounded-shape"
                        placeholder={cardNamePlaceholder}
                        onFocus={() => setCardNamePlaceholder('')}
                        onBlur={() => setCardNamePlaceholder('Card Name')}
                        value={cardName.value}
                        onChange={(e) =>
                          setCardName({
                            value: e.target.value.trimLeft(),
                            isError: false,
                            msg:
                              e.target.value === "" ? `${t(`This is required field!`)}` : "",
                          })
                        }
                        isInvalid={cardName.isError}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-4">
                    <Form.Group controlId="formCardNumber">
                      <Form.Label className="ml-4" >{t(`Card Number`)}</Form.Label>
                      <Form.Control
                        type="text"
                        className="rounded-shape"
                        placeholder={cardNumberPlaceholder}
                        onFocus={() => setCardNumberPlaceholder('')}
                        onBlur={() => setCardNumberPlaceholder('Card Number')}
                        value={cardNumber.value}
                        onChange={(e) =>
                          setCardNumber({
                            value: e.target.value.trim(),
                            isError: false,
                            msg:
                              e.target.value === "" ? `${t(`This is required field!`)}` : "",
                          })
                        }
                        isInvalid={cardNumber.isError}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-4">
                    <Form.Group controlId="formExpiryDate" is={expiryDate.isError}>
                      <Form.Label className="ml-4" >{t(`Expiry Date`)}</Form.Label>
                      <DatePicker
                        className={["rounded-shape", "form-control",expiryDate.isError ? 'is-invalid':null].join(' ')}
                        placeholderText={cardExpiryPlaceholder}
                        showMonthYearPicker
                        minDate={firstDay} 
                        selected={expiryDate.value}
                        // value={expiryDate}
                        onFocus={() => setCardExpiryPlaceholder('')}
                        onBlur={() => setCardExpiryPlaceholder('Expiry Date')}
                        dateFormat="MM/yyyy"
                        onChange={handleexpiryDate}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ml-2 mb-5 mt-5">
            <div className="col-md-2 mt-2">
              <Button style={{ backgroundColor: "#287CBC" }}
                className="  w-100 rounded-pill  "
                onClick={() => {
                  addNewCard();
                }}
              >
                {t(`Submit`)}
              </Button>
            </div>
            <div className="col-md-2 mt-2">
              <Button className="  w-100 rounded-pill"
                style={{ backgroundColor: "#287CBC" }}
                onClick={() => {
                  handelCancel()
                }}>
                {t(`Cancel`)}
              </Button>
            </div>
          </div>
          {loader?<div className={classes.pleaseWait}>{t(`Please wait`)}...</div>:
              
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Card Name`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Card Number`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Expiry Date`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Set Primary Card`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Edit`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Delete`)}
                  </TableCell>
                </TableRow>
              </TableHead>
             
              {allCards.length >= 1 ?
                <TableBody>
                  {/* We have to map the data here */}

                  {itemsToDisplay.map((item, index) => {
                    let str = String(item.cardNo).slice(-4);
                    let no = Number(str);
                    return (
                      <TableRow key={item.id}>
                        <TableCell align="center">{item.nameOnCard}</TableCell>
                        <TableCell align="center">{t(`XXXX-XXXX-XXXX-`)}{no}</TableCell>
                        <TableCell align="center">{item.expiryDate}</TableCell>
                        <TableCell align="center">
                          <input
                            type="radio"
                            name="Primary"
                            checked={allCards[index].isPrimary}
                            value={allCards[index].isPrimary}
                            onChange={(e) => {
                              setCardAsPrimary(item.id, item.nameOnCard, true)

                            }
                            }

                          ></input>

                        </TableCell>
                        <TableCell align="center">

                          <Link Link to={`/my-card/edit-card/${item.id}`}>
                            <CreateIcon className={classes.editIcon} />
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <DeleteForeverIcon
                            onClick={() => {
                              handleOpen(item.id);
                            }}
                            className={classes.deleteIcon} />
                        </TableCell>
                      </TableRow>
                    )
                  }
                  )}
                </TableBody>
                : null}
            </Table>
          </TableContainer>
          }
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
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
              <span className="m-5" id="transition-modal-title " style={{fontSize:"18px",fontWeight:"500"}}>
                  {t(`Are you sure you want to delete this card ?`)}
                </span>
                <div className="text-center m-5">
                  <button
                    className="btn btn-outline-danger btn-md m-2 w-25"
                    onClick={() => cardDelete()}
                  >
                    {t(`Yes`)}
                  </button>
                  <button
                    onClick={handleClose}
                    className="btn btn-outline-secondary w-25 btn-md m-2"
                  >
                    {t(`No`)}
                  </button>
                </div>
              </div>
            </Fade>
          </Modal>
          {allCards.length > 0 ?
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center mt-6">
                <Pagination
                  size="large"
                  variant="outlined"
                  color="secondary"
                  className="primary"
                  count={Math.ceil(allCards.length / pageSize)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            </div>

            :
            loader ? null : <div className="text-center p-5"> <span className={classes.error}>{t(`No Record Found`)}</span></div>}
          
        </div>
      {/* </div> */}
    </div>
  );
};
