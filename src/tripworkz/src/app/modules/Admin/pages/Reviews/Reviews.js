
import * as auth from "../../../Auth/_redux/authRedux";
import Rating from "@material-ui/lab/Rating";
import TestImage from "../../testImage/simpsons_header-h_2018.jpg";
import CardActions from "@material-ui/core/CardActions";
import { Button } from "react-bootstrap";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Form } from "react-bootstrap";
import * as actions from "../../redux/adminActions";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from '../../../../../app/components/Pagination';
import { CircularProgress } from "@material-ui/core"
import { useTranslation } from "react-i18next";
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
    marginLeft: '15%',
    padding: 50,
    height: '40%',
    width: '55%',
    borderRadius: 20,
  },
  MainHeader: { backgroundColor: "#F5F5F5", padding: "20px 20px" },
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
  pleaseWait: {
    textAlign: "center",
    padding: "10px",
    fontSize: "20px",
    width: "100%",
    color: "#287CBC",
    fontWeight: "500",
  },
  notFound: {
    color: "#B5B5C3",
    fontWeight: "400",
    fontSize: "16px",
    padding: "25px",
    textAlign: "center",
  },
  alert: {
    width: '94%',
    margin: '25px auto 0px auto',
  },
    buttonFlex:{
      display:'flex',
      flexWrap:'wrap',
    },
  approveButton: {
    marginLeft:'110px !important',
    background:'#287cbc',
    borderRadius:'40px',
    color:'#ffffff',
    fontWeight:'400',
    textAlign:'center',
    // minWidth:'180px',
    border:'none',
    padding:'14px 0px',
    fontSize: "14px",
    padding: "6px 17px"
  },
  rejectButton:{
    marginLeft:'36px !important',
    border: '1px solid #287CBC',
    borderRadius: '40px',
    background:'#ffffff',
    // minWidth:'180px',
    color: "#287CBC",
    fontSize: "14px",
    fontWeight: "400",
    border: "1px solid #287CBC",
    padding: "6px 17px",
  }

});

const Reviews = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState({ isError: false, value: "", msg: "" });
  const [updatedReviews, setUpdatedReviews] = useState([])
  const [reviewId, setReviewId] = useState();
  const [flag, setFlag] = useState(false);
  const { admin } = useSelector((state) => state);
  const [loader, setLoader] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });

  const onReviewSubmit = () => {
    let isOK = true;
    if (!review.value) {
      setReview({ ...review, isError: true, msg: `${t(`Please select Image file.`)}` });
      isOK = false;
    }
    if (review.value.length > 100) {
      setAlertStatus({
        status: true,
        message: `${t(`Review should not exceed 100 characters`)}`,
        type: "error",
      })
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });

      }, 2000);
    }
    if (isOK) {
      onhandlePostReview('REJECT', reviewId, review.value)
    }
  }
  useEffect(() => {
    if (admin.reviews !== null) {
      let item = [...admin.reviews]
      if (item.length === 0)
        setFlag(true)
    }
  }, [admin.reviews]);
  //on review submit
  const onhandlePostReview = (status, item, reason) => {
    let body = {
      reviewId: parseInt(item.id),
      status: status,
      reason: reason,
      approvedby: parseInt(user.userId)
    }
    setLoader(true);
    dispatch(actions.editReview(body))
      .then((response) => {
        if (response === "Review rejected" || response === "Review approved") {
          setLoader(false);
          setAlertStatus({ status: true, message: response, type: "success" });
          setUpdatedReviews([]);
          setTimeout(function () {
            setAlertStatus({ status: false, message: "", type: "" });
          }, 5000);
        }
        else {
          setAlertStatus({ status: true, message: `${t(`Something went wrong`)}`, type: "error" });
          setTimeout(function () {
            setAlertStatus({ status: false, message: "", type: "" });

          }, 5000);

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
        }, 2000); //2 Second delay
        setLoader(false);
      });
    handleClose()
  }

  useEffect(() => {
    dispatch(actions.getAllReviews())
  }, []);
  //popup
  const handleOpen = (item) => {
    setReviewId(item)
    setOpen(true);
  };
  const handleClose = () => {
    setLoader(false);
    setOpen(false);
    setAlertStatus({ status: false, message: "", type: "" });
  };
  //pagination
  const onPageChange = (data) => {
    setUpdatedReviews(data)
  }
  return (
    <div className="card card-custom" style={{ minHeight: '800px' }} >
      <div className={classes.MainHeader}>
        <span className={classes.MainTitle}>
          {t(`Reviews`)}
        </span><br />
        {/* <span classes={classes.SubTitle}>{t(`All your registered payment method will be shown here`)}</span> */}
      </div>
      {/* begin::Header */}
      {/* <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className={"card-label font-weight-bolder"}>
            {t(`Reviews`)}
            </span>
        </h3>
      </div> */}
      {/* end::Header */}

      {/* begin::Body */}
      {flag &&  alertStatus.message === '' &&
        <div className={classes.notFound}>{t(`No Record Found`)}</div>
      }
      {admin.reviews === null &&
        <div className={classes.pleaseWait}>Please wait...</div>
      } <>
        {alertStatus.status && !open &&
          <div className={classes.alert}>
            <Alert severity={alertStatus.type} >
              {alertStatus.message}
            </Alert>
          </div>

        }
        {
          updatedReviews.length !== 0 &&
          updatedReviews.map((item, index) => (
            <div className="p-5 ml-10 mr-10 mb-0 mt-5" key={index}>
              <div
                className=" row card d-flex flex-row w-100 review-card"
                style={{ borderRadius: 20, border: "2px solid #287CBC" }}
              >
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                  <img
                    src={TestImage}
                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    className="card-img-top m-5"
                    alt="..."
                  />
                </div>
                <div className="card-body col-md-8">
                  <h5 className="card-title p-0 m-0" style={{color:'#287CBC'}}>{item.productid}</h5>
                  {/* <p className="text-secondary mb-5 mt-3">17 November 2021</p> */}
                  <p className="card-text">
                    {item.review}
                  </p>

                </div>
                <div className="col-md-2 d-flex justify-content-''center mt-10 mb-10 pr-10">
                  <div className='mr-2'>{item.rating===0?`${t(`Unrated`)}`:item.rating}</div>
                  <Rating name="read-only" value={item.rating} readOnly />
                  {/* <ArrowDownwardIcon className="text-primary ml-2 mr-2 cursor-pointer" />
                    <DeleteIcon className="text-primary 5 mr-2 cursor-pointer" /> */}
                </div>
                <CardActions className="col-md 1 d-flex justify-content-center ml-40 mb-10 ">
                  <div className="ml-40"></div>
                    <div className={classes.buttonFlex}>
                  <button className={classes.approveButton}
                    onClick={() => onhandlePostReview('APPROVE', item, '')}
                    disabled={item.status === "APPROVE"}>
                    {t(`Approve`)}
                  </button>
                  <button className={classes.rejectButton}
                    onClick={() => handleOpen(item)}>
                    {t(`Reject`)}
                  </button>
                    </div>
                </CardActions>
              </div>
            </div>
          ))}
        {
          !flag && admin.reviews !== null && <div className="mb-4">
            <CustomPagination data={admin.reviews} pagesize={3} updateData={onPageChange}></CustomPagination>
          </div>
        }

      </>


      {/* end::Body */}
      {/* begin::Modal */}
      {/* <Modal
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
          <div className={classes.paper}>

            <div className={("card-body py-0")}>
              {alertStatus.status && (
                <div className="row mb-2 ">
                  <div className="col-md-8">
                    <Alert severity={alertStatus.type} >
                      {alertStatus.message}
                    </Alert>
                  </div>
                </div>
              )}

              <div className="row mb-1 ">
                <div className="col-md-8">
                  <Form.Group controlId="reviewBasic">
                    <Form.Label style={{ color: "#287CBC" }} className="h5"> {t(`Reason to Reject`)}</Form.Label>
                    <Form.Control
                      // type="textarea"

                      as="textarea" rows={2}
                      // className="form-control mt-3"
                      placeholder={t(`Add your text here max 100 characters`)}
                      onChange={(e) =>
                        setReview({
                          value: e.target.value,
                          isError: e.target.value === "",
                          msg:
                            e.target.value === "" ? `${t(`Please select Image file.`)}` : "",
                        })
                      }
                      isInvalid={review.isError}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="mt-15 mb-5">
                <Button
                 style={{ backgroundColor: "#287CBC", fontWeight: "400", fontSize: "13px" }}
                 className="  rounded-pill"
                  onClick={onReviewSubmit}
                  disabled={loader}>
                  {loader ? (
                    <span className="ml-3 spinner spinner-white"></span>
                  ) : (
                    " Submit"
                  )}
                </Button>
                <Button
                  onClick={handleClose}
                  className=" ml-5  rounded-pill"
                          style={{ backgroundColor: "#287CBC", fontWeight: "400", fontSize: "13px" }}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal> */}
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        className={classes.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            className={classes.paper}
            style={{ width: '40%', marginLeft: '10%' }}
          >
            {alertStatus.status && (
              <div className="row mb-2 ">
                <div className="col-md-8">
                  <Alert severity={alertStatus.type}>
                    {alertStatus.message}
                  </Alert>
                </div>
              </div>
            )}

            <div className="row mb-1 ">
              <div className="col-md-12 ">
              <Form.Group controlId="reviewBasic">
                    <Form.Label style={{ color: "#287CBC" }} className="h5"> {t(`Reason to Reject`)}</Form.Label>
                    <Form.Control
                      // type="textarea"

                      as="textarea" rows={2}
                      // className="form-control mt-3"
                      placeholder={t(`Add your text here max 100 characters`)}
                      onChange={(e) =>
                        setReview({
                          value: e.target.value,
                          isError: e.target.value === "",
                          msg:
                            e.target.value === "" ? `${t(`Please select Image file.`)}` : "",
                        })
                      }
                      isInvalid={review.isError}
                    />
                  </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <Button className="btn w-100 rounded-pill " style={{background:'#287cbc'}}
                    onClick={onReviewSubmit}>
                  Submit
                </Button>
              </div>
              <div className="col-5">
                <Button className="btn  w-100 rounded-pill ml-3"
                style={{background:'#ffffff',color:'#287cbc',border:'1px solid #287cbc'}}
                onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      {/* end::modal */}

    </div>
  );
};

export default Reviews;
