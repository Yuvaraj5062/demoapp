import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Button } from "react-bootstrap";
import TestImg from "../../testImage/simpsons_header-h_2018.jpg";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/adminActions";
import CustomPagination from "../../../../../app/components/Pagination";
import Alert from "@material-ui/lab/Alert";
import { Form } from "react-bootstrap";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useTranslation } from "react-i18next";
import './Blogs.css'
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    borderRadius: 50,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#F7F6F8",
    border: "1px solid #287cbc",
    boxShadow: 5,
    padding: 50,
    borderRadius: 20,
    // margin:"5%"
  },
  approveButton: {
    backgroundColor: "#287CBC",
    borderRadius: "40px",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "400",
    border: "none",
    padding: "6px 17px",
  },
  rejectButton: {
    color: "#287CBC",
    fontSize: "14px",
    fontWeight: "400",
    backgroundColor: "#ffffff",
    borderRadius: "40px",
    border: "1px solid #287CBC",
    padding: "6px 17px",
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
  mainCard: {
    padding: "14px 25px 25px 25px",
  },
}));
const Blogs = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [reasonForReject, setReasonForReject] = useState({ isError: false, value: "", msg: "" });
  const [allBlogs, setAllBlogs] = useState([])
  const { t } = useTranslation();
  const [updatedBlogs, setUpdatedBlogs] = useState([])
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState();
  const [item, setItem] = useState();
  const [expandText, setExpandText] = useState(false);
  const [expandindex, setExpandIndex] = useState(false);
  const handleExpand = (value, index) => {
    setExpandText(value);
    setExpandIndex(index);
  };
  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [customAlert, setCustomAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  //for responsive size mobile and desktop
  let width = "40%";
  let margin = "10%";
  if (isMobile) {
    width = "90%";
    margin = "0";
  }

  const handelOpen = (item) => {
    setItem(item);
    setOpen(true);
  };

  useEffect(() => {
    setLoader(true);
    dispatch(actions.getApproveRejectBlogs(user.userId, "pending")).then(
      (response) => {
        setLoader(false);
        setAllBlogs(response);
        if (response) {
          setUpdatedBlogs([...response]);
        }
      }
    );
  }, []);
  const onPageChange = (data) => {
    setUpdatedBlogs(data);
  };

  const { user } = useSelector((state) => state.auth);

  //on review submit
  const handleRejectApproveBlog = (status, row) => {
    setItem(row);
    let isOK = true;

    if (status === "REJECT") {
      if (!reasonForReject.value) {
        setCustomAlert({
          status: true,
          message: `${t(`Please enter reason for reject`)}`,
          type: "error",
        });
        isOK = false;
        setTimeout(function () {
          setCustomAlert({ status: false, message: "", type: "" });
        }, 5000);
      }
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    let body = {
      blogId: parseInt(row.id),
      status: status,
      reason: reasonForReject.value,
      approvedby: parseInt(user.userId),
    };
    setLoader(true);
    if (isOK) {
      dispatch(actions.rejectBlog(body))
        .then((response) => {
          if (response.statusCode === 200) {
            setReasonForReject({ isError: false, value: "", msg: "" });
            dispatch(
              actions.getApproveRejectBlogs(user.userId, "pending")
            ).then((response) => {
              setAllBlogs(response);
              if (response) {
                setUpdatedBlogs([...response]);
              }
            });

            setLoader(false);
            setAlertStatus({
              status: true,
              message: response.message,
              type: "success",
            });

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

      handleClose();
    }
  };


  return (
    <div className={`card card-custom card-stretch`}>
      {/* begin::Header */}
      <div className="blogsHeader">
        <span className="blogsHeaderText">
          {t(`Blogs`)}
        </span>
      </div>

      {alertStatus.status && (
        <div className="row ml-4 mt-4">
          <div className="col-md-8">
            <Alert severity={alertStatus.type}>{alertStatus.message}</Alert>
          </div>
        </div>
      )}

      {!loader ? (
        <div className={["row", classes.mainCard].join(" ")}>
          {updatedBlogs.map((row, index) => (
            <div className="col-md-4" style={{ padding: "0px" }}>
              <div
                className="card shadow mb-4 ml-4 mr-4 mt-2 "
                style={{ borderRadius: "27px" }}
              >
                <img
                  src={
                    row.blogPhotos.length >= 50
                      ? row.blogPhotos
                      : "/media/Tripwerkzpath/blogdefaultimage.png"
                  }
                  className="blogsImage"
                />
                {/* src={row.blogPhotos ? row.blogPhotos : TestImg} "/media/Tripwerkzpath/ludgery/whichlist.jpg" className="card-img img-fluid br-20" */}
                <div className="card-body">
                  <p
                    className="font-weight-semi-bold text-center text-secondary"
                    style={{ minHeight: "72px" }}
                  >
                    <span className="blogsCardTitle"> {row.title}</span>
                  </p>
                  <span className="mb-4 font-weight-light">
                    {expandText && expandindex === row.title ?
                      expandText && <span className="blogsClientblogsClientCardSubTitle">{row.blogText}<span style={{ cursor: "pointer", color: "#287CBC" }} onClick={() => handleExpand(!expandText, row.title)}> ...{t(`View Less`)}</span></span> :
                      row.blogText.length < 30 ? <span className="blogsClientblogsClientCardSubTitle">{row.blogText}</span>: <span className="blogsClientblogsClientCardSubTitle">{row.blogText.substr(0, 30)} <span style={{ cursor: "pointer", color: "#287CBC" }} onClick={() => handleExpand(!expandText, row.title)}> ...{t(`Read More`)}</span></span>}
                  </span>
                  <div>
                                      <span className='blogsClientCardSubTitle' >{t(`Created on`)} : {row.createdOn.slice(0, 10)}</span>
                                      {/* {row.createdOn.slice(0, 10)} */}
                                    </div>
                  <div className={row.blogText.length < 30 ? "row mt-7" : "row mt-1"}>
                    <div className="col-md-6 mt-3">
                      <button className={classes.approveButton}
                        onClick={() => handleRejectApproveBlog("APPROVE", row)}>
                        {t(`Approve`)}
                      </button>
                    </div>
                    {/* <div className="col-md-3 mt-3"></div> */}
                    <div className="col-md-6 mt-3">
                      <button className={classes.rejectButton}
                        onClick={() => handelOpen(row)}>
                        {t(`Reject`)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.pleaseWait}>{t(`Please wait`)}...</div>
      )}
      {allBlogs.length === 0 && updatedBlogs.length === 0 && !loader && !alertStatus.status && (
        <div className={classes.notFound}> {t(`No Record Found`)}</div>
      )}
      {allBlogs.length > 0 && updatedBlogs.length > 0 && !loader && (
        <div className="mb-2">
          <CustomPagination
            data={allBlogs}
            pagesize={6}
            updateData={onPageChange}
          ></CustomPagination>
        </div>
      )}

      {/* end::Body */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        className={classes.modal}
        onClose={handelOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            className={classes.paper}
            style={{ width: width, marginLeft: margin }}
          >
            {customAlert.status && (
              <div className="row mb-2 ">
                <div className="col-md-8">
                  <Alert severity={customAlert.type}>
                    {customAlert.message}
                  </Alert>
                </div>
              </div>
            )}

            <div className="row mb-1 ">
              <div className="col-md-12 ">
                <Form.Group controlId="formIssue">
                  <Form.Label style={{ color: "#287cbc" }} className="h5"> {t(`Reason to Reject`)}</Form.Label>
                  <Form.Control
                    as="textarea" rows={2}
                    placeholder={t(`Add your text here...`)}
                    value={reasonForReject.value}
                    onChange={(e) =>
                      setReasonForReject({
                        value: e.target.value,
                        isError: e.target.value === "",
                        msg:
                          e.target.value === "" ? `${t(`"This is required field!"`)}` : "",
                      })
                    }
                    isInvalid={reasonForReject.isError}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <Button className="btn w-100 rounded-pill " style={{background:'#287cbc'}}
                  onClick={() => handleRejectApproveBlog("REJECT", item)}>
                  {t(`Submit`)}
                </Button>
              </div>
              <div className="col-5">
                <Button className="btn  w-100 rounded-pill ml-3"
                style={{background:'#ffffff',color:'#287cbc',border:'1px solid #287cbc'}}
                  onClick={() => handleClose()}>
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

export default Blogs;
