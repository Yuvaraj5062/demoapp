import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CustomPagination from '../components/Pagination';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import Alert from "@material-ui/lab/Alert";
import { CircularProgress } from "@material-ui/core"
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  Deluxerooms: {
    width: "100%",
    float: "left",
    padding: "10px 0px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "12.5px",
    marginBottom:'12.5px'
  },
  DeluxePater: { width: '100%', },
  MarchInformer: { color: '#ccc', },
  PromotionsTicketTabActive: {
    fontWeight: "600", fontSize: "18px", color: "#ffffff", cursor: "pointer"
  },
  PromotionsTicketTab: {
    fontWeight: "500", fontSize: "18px", color: "#636363", cursor: "pointer"
  },
  MyReviewsMainHeader: { backgroundColor: "#F5F5F5", padding: "10px 20px" },
  MyReviewsHeader: { fontWeight: "600", fontSize: "18px", color: "#287CBC" },
  MyReviewsSubHeader: { fontWeight: "400", fontSize: "13px" },
  mainContaier: {
    padding: "25px 25px 0px 25px"
  },
  pleaseWait: {
    textAlign: 'center',
    padding: '10px',
    fontSize: '20px',
    width: '100%',
    color: "#287CBC",
    fontWeight: "500"
  },
  notFound:{
    color:'#B5B5C3',
    fontWeight:'400',
    fontSize:'16px',
    textAlign:'center',
    paddingTop:"25px"
  },
  alert:{
      width:'94%',
      margin:'25px auto 0px auto',
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box paddingX={3} paddingY={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


export const MyReviews = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const [pendingReviews, setPendingReviews] = useState([]);
  const [updatedPendingReviews, setUpdatedPendingReviews] = useState([]);
  const [completedReviews, setCompletedReviews] = useState([]);
  const [updatedCompletedReviews, setUpdatedcompletedReviews] = useState([]);
  const [tab, setTab] = React.useState(0);
  const [flag, setFlag] = useState(false)
  const [updatedReviews, setUpdatedReviews] = useState([])
  const { auth, main } = useSelector((state) => state);
  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });

  let userId = auth.user.userId
  useEffect(() => {
    let data = []
    let pendingReview = []
    let completedReview = []
    dispatch(actions.getAllReviewList(userId))

      .then((response) => {
        data = response
        for (let index = 0; index < data.length; index++) {
          if (data[index].status === "PENDING") {
            pendingReview.push(data[index])

          }

          if (data[index].status === "APPROVE") {
            completedReview.push(data[index])

          }
        }
        setPendingReviews(pendingReview)
        setCompletedReviews(completedReview)
      })
  }, [flag]);


  let isOK = false;
  const onCreateNewReview = (index) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    isOK = true;
    if (!updatedReviews[index].review) {
      setAlertStatus({
        status: true,
        message: `${t(`Review message required`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }

    if (updatedReviews[index].review.length > 100) {
      setAlertStatus({
        status: true,
        message: `${t(`Only 100 Characters allowed`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }

    if (!updatedReviews[index].rating) {
      setAlertStatus({
        status: true,
        message: `${t(`Rating is Required`)}`,
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
        review: updatedReviews[index].review,
        productId: updatedReviews[index].productName,
        rating: updatedReviews[index].rating,
        userId: userId
      }

      dispatch(actions.createReview(body, userId))
        .then((response) => {
          if (response === "Success") {
            dispatch(actions.getAllReviewList(userId))
              .then((response) => {
                setUpdatedReviews(response)
                setFlag(!flag)
              });
            setAlertStatus({
              status: true,
              message: `${t(`Review added successfully`)}`,
              type: "success",
            });

            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay

            return null;
          }
          else {
            setAlertStatus({
              status: true,
              message: `${t(`Unable to add review`)}`,
              type: "error",
            });

            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay

            return null;
          }
        })
    }
  }


  const onPageChange = (data) => {
    setUpdatedReviews(data)
  }
  const onPendingPageChange = (data) => {
    setUpdatedPendingReviews(data)
  }
  const onCompletedPageChange = (data) => {
    setUpdatedcompletedReviews(data)
  }

  return (
    <div className={`card card-custom card-stretch`}>

      <div className={classes.MyReviewsMainHeader}>
        <span className={classes.MyReviewsHeader}>
          {t(`My Reviews`)}
        </span><br />
        <span className={classes.MyReviewsSubHeader}>{t(`Leave a review and earn Tripwerkz Credits`)}</span>

      </div>
      {/* <div className={' pl-10 pr-10 '}  > */}
      {/* <div className="container"> */}
      {
        alertStatus.message !== '' && 
          <div className={classes.alert}>
            <Alert severity={alertStatus.type} >{alertStatus.message}</Alert>
          </div>
      }
      <div className={["container", classes.mainContaier].join(' ')}>
        <div className="row justify-content-between " style={{ backgroundColor: "#F5F5F5", borderBottom: "3px solid #287CBC", width: "100%", margin: "0px" , marginBottom:'12.5px' }} >
          <div >
            <span className={tab === 0 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setTab(0)}>{t(`All`)}</span>
          </div>
          <div >
            <span className={tab === 1 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setTab(1)}>
              {t(`Pending`)} </span>
          </div>
          <div>
            <span className={tab === 2 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setTab(2)}>
              {t(`Reviewed`)}
            </span>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-md-12">
          {main.reviews ?
            <div>
              <div>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={tab}
                >
                  <TabPanel value={tab} index={0} dir={theme.direction}>
                    {main.reviews.length > 0 ?
                      <div>
                        {updatedReviews.map((item, index) => (
                          <div className={classes.Deluxerooms}  >
                            <div className={'pt-5 pb-5 pl-5 pr-5'}>
                              <div className="row" key={index}>
                                <div className="col-md-3">
                                  <img src="/media/Tripwerkzpath/ludgery/deluxe.jpg" className={classes.DeluxePater} />
                                </div>
                                <div className="col-md-9">
                                  <div className="d-flex ">
                                    <div style={{ margin: '3px 0px',color:'#287CBC',fontWeight:'500',fontSize:'16px' }}>{item.productName}</div>
                                    <div className="ml-auto d-flex">
                                      <div className='mr-2'>{item.rating===0?`${t(`Unrated`)}`:item.rating}</div>
                                      <Rating name="read-only" value={item.rating ? parseInt(item.rating) : 0} readOnly /></div>
                                  </div>
                                  <p className='h3'>{item.productname}</p>
                                  {/* <p style={{ margin: '3px 0px', }}>add:1/26 dummy text here ,122250</p> */}
                                  <p style={{ margin: '3px 0px', }}>{item.itemname}</p>
                                  <p style={{ margin: '3px 0px', }}>{item.itemplanname}</p>
                                  <p style={{ margin: '3px 0px', }}>{item.review}</p>

                                  {!item.status ?
                                    <div>
                                      <div className='d-flex'>
                                      <span className='mb-4 mr-4 ' style={{color:'#287CBC',fontWeight:'400',fontSize:'14px'}}>{t(`Rate Us`)}</span>
                                      <Rating name={"hotel-" + index}
                                        value={item.rating}
                                        onChange={(event, newInform) => {
                                          let tempReviews = [...updatedReviews]
                                          tempReviews[index] = { ...tempReviews[index], rating: newInform }
                                          setUpdatedReviews(tempReviews)
                                        }}

                                      />
                                      </div>
                                      <div className="form-group">
                                        <Form.Control as="textarea"
                                          placeholder={t(`Add your text here max 100 Characters`)}
                                          rows="3"
                                          value={updatedReviews[index].review}
                                          onChange={(e) => {
                                            let tempReviews = [...updatedReviews]
                                            tempReviews[index] = { ...tempReviews[index], review: e.target.value }
                                            setUpdatedReviews(tempReviews)
                                          }
                                          }
                                        />
                                      </div>
                                      <Button
                                        className="btn btn-primary rounded-pill"
                                        onClick={() => {
                                          onCreateNewReview(index);
                                        }}
                                        style={{ backgroundColor: "#287CBC", fontWeight: "400", fontSize: "13px" }}
                                      >
                                        {t(`Submit`)}
                                      </Button>

                                      <Button className="btn btn-primary rounded-pill m-3 "
                                        onClick={() => {
                                          let tempReviews = [...updatedReviews]
                                          tempReviews[index] = { ...tempReviews[index], review: "", rating: "" }
                                          setUpdatedReviews(tempReviews)
                                        }
                                        }   style={{ backgroundColor: "#287CBC", fontWeight: "400", fontSize: "13px" }}>
                                        {t(`Cancel`)}
                                      </Button>
                                    </div>
                                    : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div style={{ padding: '12.5px 0px' }}>
                          <CustomPagination data={main.reviews} pagesize={3} updateData={onPageChange}></CustomPagination>
                        </div>
                      </div>
                      : <div className={classes.notFound}>{t(`No Record Found`)}</div>}
                  </TabPanel>
                  <TabPanel value={tab} index={1} dir={theme.direction}>
                    {pendingReviews.length > 0 ?
                      <div>
                        {updatedPendingReviews.map((item, index) => (
                          <div>
                            {/* {item.status === "PENDING" ? */}
                            <div className={classes.Deluxerooms}>
                              <div className={'pt-5 pb-5 pl-5 pr-5'}>
                                <div className="row">
                                  <div className="col-md-3">
                                    <img src="/media/Tripwerkzpath/ludgery/deluxe.jpg" className={classes.DeluxePater} />
                                  </div>
                                  <div className="col-md-9">
                                    <div className="d-flex ">
                                      <p className=' text-primary h5 ' style={{ margin: '3px 0px', }}>{item.productName}</p>
                                      <div className="ml-auto d-flex">
                                        <div className='mr-2'>{item.rating}</div>
                                        <Rating name="read-only" value={item.rating} readOnly /></div>
                                    </div>
                                    <p className='h3'>{item.productname}</p>
                                    {/* <p style={{ margin: '3px 0px', }}>add:1/26 dummy text here ,122250</p> */}
                                    <p style={{ margin: '3px 0px', }}>{item.itemname}</p>
                                    <p style={{ margin: '3px 0px', }}>{item.itemplanname}</p>
                                    <p style={{ margin: '3px 0px', }}>{item.review}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* : null} */}
                          </div>
                        ))}
                        <div style={{ padding: '12.5px 0px' }}>
                          <CustomPagination data={pendingReviews} pagesize={3} updateData={onPendingPageChange}></CustomPagination>
                        </div>
                      </div>
                      :  <div className={classes.notFound}>{t(`No Record Found`)}</div>
                    }

                  </TabPanel>
                  <TabPanel value={tab} index={2} dir={theme.direction}>
                    {completedReviews.length > 0 ?
                      <div>
                        {updatedCompletedReviews.map((item, index) => (
                          <div>
                            {/* {item.status === "APPROVE" ? */}
                            <div className={classes.Deluxerooms}>
                              <div className={'pt-5 pb-5 pl-5 pr-5'}>
                                <div className="row">
                                  <div className="col-md-3">
                                    <img src="/media/Tripwerkzpath/ludgery/deluxe.jpg" className={classes.DeluxePater} />
                                  </div>
                                  <div className="col-md-9">
                                    <div className="d-flex ">
                                      <p className=' text-primary h5 ' style={{ margin: '3px 0px', }}>{item.productName}</p>
                                      <div className="ml-auto d-flex">
                                        <div className='mr-2'>{item.rating}</div>
                                        <Rating name="read-only" value={item.rating} readOnly /></div>
                                    </div>
                                    <p className='h3'>{item.productname}</p>
                                    {/* <p style={{ margin: '3px 0px', }}>add:1/26 dummy text here ,122250</p> */}
                                    <p style={{ margin: '3px 0px', }}>{item.review}</p>
                                    <p style={{ margin: '3px 0px', }}>{item.itemplanname}</p>
                                    <p style={{ margin: '3px 0px', }}>{item.itemname}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* // :
                                  // null} */}
                          </div>
                        ))}
                        <div style={{ padding: '12.5px 0px' }}>
                          <CustomPagination data={completedReviews} pagesize={3} updateData={onCompletedPageChange}></CustomPagination>
                        </div>
                      </div>
                      :<div className={classes.notFound}>{t(`No Record Found`)}</div>}

                  </TabPanel>
                </SwipeableViews>
              </div>
            </div>
            :
            <div className={classes.pleaseWait}>{t(`Please wait`)}...</div>}
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}