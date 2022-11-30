import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import Pagination from "@material-ui/lab/Pagination";
import "react-phone-input-2/lib/high-res.css";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  DeluxeInformation: {
    width: "98%",
    float: "left",
    padding: "10px 0px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: 10,
  },
  DeluxePater: { width: "100%" },
  BookingInformerrate: {
    width: "100%",
    float: "left",
    height: "100px",
    position: "relative",
  },
  Bookingrater: { position: "absolute", bottom: "0px", right: "3px" },
  ViewBrancher: {
    backgroundColor: "#287CBC",
    color: "#fff",
    padding: "8px 15px",
    borderRadius: "10px",
    border: "none",
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
  notFound:{
    color:'#B5B5C3',  
    fontWeight:'400',
    fontSize:'16px',
    textAlign:'center',
    paddingTop:"25px"
  },
  pleaseWait: {
    textAlign: 'center',
    padding: '10px',
    fontSize: '20px',
    width: '100%',
    color: "#287CBC",
    fontWeight: "500"
  },
}));

const firstIndex = 0;

export const BookingPurchase = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const [bookings, setBookingsData] = useState([]);
  const [pageSize, setPageSize] = React.useState(3);
  const [page, setPage] = React.useState(1);
  const[loader,setLoader]=React.useState(false);
  const [data, setData] = React.useState(
    bookings && bookings.slice(firstIndex, pageSize)
  );
  const handleHotelDetails = (item) => {
    localStorage.setItem('url', "/booking/detail/" + item.id);
    props.history.push("/booking/detail/" + item.id);

  };
  const { auth } = useSelector((state) => state);
  const headers = {
    Authorization: `Bearer ` + auth.authToken,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    setLoader(true)
    if (auth.user.emailId) {
      dispatch(actions.getAllBookings({ emailid: auth.user.emailId })).then(
        (response) => {
          setBookingsData([...response].reverse());
          setLoader(false)
          // setBookingsData(null)
        }
      );
    }
  }, []);

  useEffect(() => {
    setData(bookings && bookings.slice(0, pageSize));
  }, [pageSize, bookings]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setData(
      bookings.slice(firstIndex + pageSize * (value - 1), pageSize * value)
    );
  };

  return (
    <div className={`card card-custom card-stretch`}>
       <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`My Booking & Purchases`)}
            </span><br />
            <span classes={classes.SubTitle}>{t(`Review your recent bookings and purchases`)}</span>
          </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={"pt-8 pb-2"}>
              {/* <h3>{t(`Booking and Purchases`)}</h3>
              <p>{t(`Review your recent bookings and purchases`)}</p> */}
              {data !== null
                ? data.length === 0 ?loader? <div className={classes.pleaseWait}>{t(`Please wait`)}...</div>:<div className={classes.notFound}>{t(`No Record Found`)}</div> : data.map((item) => (
                  <div className={classes.DeluxeInformation}>
                    <div className={"pt-5 pb-5 pl-5 pr-5"}>
                      <div className="row">
                        <div className="col-md-3">
                          <img
                            src="/media/Tripwerkzpath/ludgery/deluxe.jpg"
                            className={classes.DeluxePater}
                          />
                        </div>
                        <div className="col-md-5">
                          <div>
                            <h3>{item.productname}</h3>
                            <p style={{ margin: "3px 0px" }}>
                              {item.producttype}
                            </p>
                            <p style={{ margin: "3px 0px" }}>
                              {item.itemplanname}
                            </p>
                            <p style={{ margin: "3px 0px" }}>
                              {item.ammenitydesc}
                            </p>
                            <p style={{ margin: "3px 0px" }}>
                              {t(`Invoice no`)}: {item.invoiceno}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div style={{ textAlign: "right" }}>
                            <p
                              style={{
                                color:
                                  item.bookingstatus === "Confirmed"
                                    ? "green"
                                    : item.bookingstatus === "Pending"
                                      ? "orange"
                                      : "red",
                              }}
                            >
                              {item.bookingstatus}
                            </p>
                          </div>
                          <div className={classes.BookingInformerrate}>
                            <div className={classes.Bookingrater}>
                              <h3 style={{ textAlign: "right" }}>
                                {t(`SGD`)}   {item.netamount}
                              </h3>
                              <button
                                onClick={() =>
                                  handleHotelDetails({ id: item.id })
                                }
                                className={classes.ViewBrancher}
                              >
                                {t(`View branch`)}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                : loader? <div className={classes.pleaseWait}>{t(`Please wait`)}...</div>:<div className={classes.notFound}>{t(`No Record Found`)}</div>}
              {bookings && bookings !== null  && bookings.length !== 0  && (
                <div
                  className={classes.DeluxeInformation}
                  style={{ marginBottom: '25px' }}
                >
                  <div className={"pt-5 pb-5 pl-5 pr-5"}>
                    <div className="row">
                      <div className="col-md-12 d-flex justify-content-center">
                        <Pagination
                          size="large"
                          variant="outlined"
                          color="secondary"
                          className="primary"
                          count={Math.ceil(
                            bookings && bookings.length / pageSize
                          )}
                          page={page}
                          onChange={handlePageChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
