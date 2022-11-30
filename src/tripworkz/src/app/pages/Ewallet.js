

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import "react-phone-input-2/lib/high-res.css";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  WorthNextAdventure: { width: "100%", maxWidth: "500px", margin: "0 auto" },
  CreditGainedInformed: {
    border: "1px solid #cccccc",
    padding: "10px 20px",
    borderRadius: "10px",
    marginTop: "10px",
  },
  EWalletPoints: {
    width: "100%",
    float: "left",
    padding: "0px 0px 20px 0px",
  },
  youCurrentlyhave: {
    width: "100%",
    maxWidth: "300px",
    margin: "0 auto",
    borderRadius: "10px",
    border: "1px solid #cccccc",
    padding: "20px",
    textAlign: "center",
  },
  WorthNextAdventure: { width: "100%", maxWidth: "500px", margin: "0 auto" },
  CreditGainedInformed: {
    border: "1px solid #cccccc",
    padding: "10px 20px",
    borderRadius: "10px",
    marginTop: "10px",
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
  }
}));

const firstIndex = 0;

export const Ewallet = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { auth, main } = useSelector((state) => state);
  const [pageSize, setPageSize] = React.useState(8);
  const [page, setPage] = React.useState(1);
  const [eWalletCreditPoints, setEwalletCreditPoints] = useState();
  const [eWalletCreditDetails, setEwalletCreditDetails] = useState([]);
  const [data, setData] = React.useState(
    eWalletCreditDetails && eWalletCreditDetails.slice(firstIndex, pageSize)
  );


  console.log(eWalletCreditDetails, "eWalletCreditDetails")
  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    if (auth.user) {
      dispatch(
        actions.getAllEwallletTransaction(auth.user["userId"], headers)
      ).then((user) => {
        if (user) {
          setEwalletCreditDetails([user].reverse());
        }
      });
      dispatch(
        actions.getEwalletCreditPoints(auth.user["useR_ID"])
      ).then((response) => {
        setEwalletCreditPoints(response);
      });

    }

  }, []);
  useEffect(() => {
    setData(eWalletCreditDetails && eWalletCreditDetails.slice(0, pageSize));
  }, [pageSize, eWalletCreditDetails]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setData(
      eWalletCreditDetails.slice(
        firstIndex + pageSize * (value - 1),
        pageSize * value
      )
    );
  };
  const myFunc = (e) => {
    let options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };


  return (
    <div className={`card card-custom card-stretch`}>
      <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`E-Wallet`)}
            </span><br />
            <span classes={classes.SubTitle}>{t(`Use your e-wallet for your future purchases`)}</span>
          </div>
      <section className={classes.EWalletPoints}>
        <div className="container" style={{marginTop:'25px'}}>
          {/* <div className={"pt-10 pl-5 pr-5"}>
            <h3>{t(`My E-Wallet`)}</h3>
            <p>{t(`Use your e-wallet for your future purchases`)}</p>
          </div> */}
          <div className={classes.youCurrentlyhave}>
            <p
              style={{ textAlign: "center", color: "#287CBC" }}
              className={"pt-2"}
            >
              {t(`You currently have`)}
            </p>
            <h1
              style={{ fontWeight: "800", fontSize: "45px", color: "#287CBC" }}
              className={"pt-2"}
            >
              {eWalletCreditPoints}
            </h1>
          </div>
          <div className={classes.WorthNextAdventure}>
            <div className={"pt-5"}>
              <p style={{ textAlign: "center" }}>
                {/* Worth $ 0.35 You can use your credits at checkout 20 credits
                will expire on 31 Dec 2022.  */}
                {t(`Book Your next adventure now`)}!
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <button
                className="loginBtn w-auto px-5 py-3"
                onClick={() => history.push("/add-e-wallet-points")}
              >
                {t(`Add more e-wallet points`)}
              </button>
            </div>
          </div>
          <div className="pt-10" >
            <h3 style={{fontSize:'16px',fontWeight:'400'}}>{t(`My Activities`)}</h3>

            <div className={classes.CreditGainedInformed}>
              <div className='row'>
                <div className='col '>
                  <b>{t(`Activity`)}</b>
                </div>
                <div className='col' style={{ textAlign: "center" }}>
                  <b>{t(`Credits earned/used`)}</b>
                </div>
                <div className='col' style={{ textAlign: "center" }}>
                  <b>{t(`Date`)}</b>
                </div>
              </div>

              {data &&
                data.map((data) => (
                  <div className="row">
                    <div className="col">
                      <p>{data.type}</p>
                      {/* <p style={{color: '#ccc',}}>Booking number: 3491161894</p> */}
                    </div>
                    <div className="col">
                      <div style={{ textAlign: "center" }}>
                        <p>
                          {data.type === "Added" || data.type === "Success" ? "+" : "-"}
                          {data.ewalletCredit} 
                        </p>
                      </div>
                    </div>
                    <div className="col">
                      <div style={{ textAlign: "center" }}>
                        <p>
                          {data.createdOn !== undefined
                            ? myFunc(data.createdOn)
                            : ""}
                        </p>
                        {/* <p>{data.createdon}</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              {eWalletCreditDetails && eWalletCreditDetails.length !== 0 && (
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <Pagination
                      size="large"
                      variant="outlined"
                      color="secondary"
                      className="primary"
                      count={Math.ceil(
                        eWalletCreditDetails && eWalletCreditDetails.length / pageSize
                      )}
                      page={page}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div></div>
      </section>
    </div>
  );
};
