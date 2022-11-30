import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import "react-phone-input-2/lib/high-res.css";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";
import { getWerkBalance } from "../components/_redux/mainCrud";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  WerkzCreditssectore: {
    width: "100%",
    float: "left",
    padding: "0px 0px 20px 0px",
    marginTop:"6px"
  },
  youCurrentlyhave: {
    width: "100%",
    maxWidth: "300px",
    margin: "25px auto 0px auto",
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
  },
  pleaseWait: {
    textAlign: "center",
    padding: "10px",
    fontSize: "20px",
    width: "100%",
    color: "#287CBC",
    fontWeight: "500",
  },

}));

const firstIndex = 0;

export const MyWerkzCredits = (props) => {
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(8);
  const [page, setPage] = React.useState(1);
  const [werkCreditBalance, setWerkCreditBalance] = useState();
  const { t } = useTranslation();
  const [werkCreditDetails, setWerkCreditDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data, setData] = React.useState(
    werkCreditDetails && werkCreditDetails.slice(firstIndex, pageSize)
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth, main } = useSelector((state) => state);

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    
    if (auth.user) {
      setLoader(true)
      dispatch(
        actions.getAllCreditTransactions(auth.user["userId"], headers)
      ).then((user) => {
        setWerkCreditDetails([...user].reverse());
        setLoader(false)
      });

      getWerkBalance(auth.user["userId"])
        .then((response) => {
          setWerkCreditBalance(response.data);
        })
        .catch((err) => {
        });
    }
  }, []);
  useEffect(() => {
    setData(werkCreditDetails && werkCreditDetails.slice(0, pageSize));
  }, [pageSize, werkCreditDetails]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setData(
      werkCreditDetails.slice(
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
              {t(`My WerkzCredits`)}
            </span><br />
            <span classes={classes.SubTitle}>{t(`Use your credits for your future purchases`)}</span>
          </div>
      <section className={classes.WerkzCreditssectore}>
        <div className="container">

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
              {werkCreditBalance ? werkCreditBalance : 0}
            </h1>
          </div>
          <div className={classes.WorthNextAdventure}>
            <div className={"pt-5"}>
              <p style={{ textAlign: "center" }}>
                {/* Worth $ 0.35 You can use your credits at checkout 20 credits
                will expire on 31 Dec 2022.  */}
                {t(`Book Your next adventure now!`)}

              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button
                className="loginBtn w-25 "
                onClick={() => history.push("/werkz-credits/buy")}
              >
                {t(`Buy more werkcreditz`)}

              </button>
            </div>
          </div>
          <div className={"pt-10"}>
            <span style={{fontSize:'16px'}}>{t(`My Activities`)}</span>
            {loader ? <div className={classes.pleaseWait}>{t(`Please wait`)}...</div>:
            <div className={classes.CreditGainedInformed}>
            
              <div className="row">
                <div className="col-md-2">
                  <p>
                    <b>{t(`Activity`)}</b>
                  </p>
                  {/* <p style={{color: '#ccc',}}>Booking number: 3491161894</p> */}
                </div>
                <div className="col-md-4 text-center">
                  <p>
                    <b>{t(`Refered To`)}</b>
                  </p>
                  {/* <p style={{color: '#ccc',}}>Booking number: 3491161894</p> */}
                </div>
                <div className="col-md-3">
                  <div style={{ textAlign: "center" }}>
                    <p>
                      <b>{t(`Credits earned/used`)}</b>
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div style={{ textAlign: "center" }}>
                    <p>
                      <b>{t(`Date`)}</b>
                    </p>
                  </div>
                </div>
              </div>


              {data &&
                data.map((data,index) =>{ 
                  return (
                  <div className="row" key={index}>
                    <div className="col-md-2">
                      <p>{data.details}</p>
                      {/* <p style={{color: '#ccc',}}>Booking number: 3491161894</p> */}
                    </div>
                    <div className="col-md-4 text-center">
                      <p>{data.referid}</p>
                      {/* <p style={{color: '#ccc',}}>Booking number: 3491161894</p> */}
                    </div>
                    <div className="col-md-3">
                      <div style={{ textAlign: "center" }}>
                        <p>
                          {data.type === "USE" || data.details == "Expired" ? "-" : "+"}
                          {data.werkzcredit}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div style={{ textAlign: "center" }}>
                        <p>
                          {data.createdon !== undefined
                            ? myFunc(data.createdon)
                            : ""}
                        </p>
                        {/* <p>{data.createdon}</p> */}
                      </div>
                    </div>
                  </div>
                )})}
              { data && data.length >0 && (
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <Pagination
                      size="large"
                      variant="outlined"
                      color="secondary"
                      className="primary"
                      count={Math.ceil(
                        werkCreditDetails && werkCreditDetails.length / pageSize
                      )}
                      page={page}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              )}
            </div>
}
          </div>
        </div>
      </section>
    </div>
  );
};
