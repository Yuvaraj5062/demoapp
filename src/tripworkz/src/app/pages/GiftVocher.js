import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import "react-phone-input-2/lib/high-res.css";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  MyVocherSelection: { width: "100%", float: "left" },
  pricevocher: { width: "100%", position: "relative", height:"100%",maxHeight:'130px',padding:'5px' },
  giftVocher: {/* width: "100%" */ height:"100%", maxWidth:'90%' },
  borderIncommonvocher: { border: "1px solid #ccc"},
  MyDiscouter: { position: "absolute", top: "10px", color: "#fff" },
  UseInformation: {
    backgroundColor: "#f89528",
    padding: "5px 20px",
    border: "none",
    color: "#fff",
  },
  PromotionsTicketTabActive:
  {
    fontWeight: '500',
    fontSize: '16px',
     color:'#ffffff',
     cursor:' pointer',
     display: 'inline-block',
     textAlign: 'center',
     minWidth:' 236px',
     padding:' 16px 0px 12px 0px',
     background:' #287CBC',
     borderRadius:'10px 10px 0px 0px',
     borderBottom:'2px solid #287CBC'
  },
PromotionsTicketTab:{
  fontWeight: '400',
    fontSize: '16px',
     color:'#636363',
     cursor: 'pointer',
     display: 'inline-block',
     textAlign: 'center',
     minWidth: '236px',
     padding: '16px 0px 12px 0px',
     background: 'rgb(245, 245, 245)',
},
PromotionsMainHeader:{backgroundColor: "#F5F5F5",padding: "10px 20px"},
PromotionsHeader:{fontWeight: "600",fontSize: "18px",color: "#287CBC"},
PromotionsSubHeader:{fontWeight: "400",fontSize: "13px"},
pleaseWait:{
  fontSize:'20px',
  color:'#287CBC',
  fontWeight:'500',
  marginTop:'25px'
},
mainContaier:{
  padding:"25px 25px 0px 25px"
},
card:{
  padding:'10px 25px 10px 25px'
},
  notFound: {
    color: "#B5B5C3",
    fontWeight: "400",
    fontSize: "16px",
    padding: "25px",
    textAlign: "center",
    width:'100%'
  },
}));

const firstIndex = 0;

export const GiftVocher = (props) => {
  const [pageSize, setPageSize] = React.useState(8);
  const [loader,setLoader] = useState(false)
  const [page, setPage] = React.useState(1);
  const [loader1,setLoader1] = useState(false)
  const [page1, setPage1] = React.useState(1);
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth, main } = useSelector((state) => state);
  const [data, setData] = React.useState([]);
  const [data1, setData1] = React.useState([]);
  const [selectedTab, setSelctedTab] = React.useState(0)
  const [voucher, setVoucher] = React.useState(
    data && data.slice(firstIndex, pageSize)
  );
  const [voucher1, setVoucher1] = React.useState(
    data1 && data1.slice(firstIndex, pageSize)
  );
  const headers = {
    Authorization: `Bearer ` + auth.authToken,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    setLoader(true)
    dispatch(actions.getupcomingPromotions())
    .then((response) => {
      
      if(response===null){

      }else{
        setData1(response);
      }
      setLoader1(false)
    });
   // dispatch(actions.getAllVouchers(headers))
   dispatch(actions.getcurrentPromotions())
    .then((response) => {
      //console.log("response",response)
      if(response===null){
      }else{
      setData(response);
      }
      setLoader(false)
    });
  }, []);

  useEffect(() => {
    setVoucher(data && data.slice(0, pageSize));
  }, [pageSize, data]);
  useEffect(() => {
    setVoucher1(data1 && data1.slice(0, pageSize));
  }, [pageSize, data1]);
  const handlePageChange = (event, value) => {
    setPage(value);
    setVoucher(
      data.slice(firstIndex + pageSize * (value - 1), pageSize * value)
    );
  };
  const handlePageChange1 = (event, value) => {
    setPage1(value);
    setVoucher1(
      data1.slice(firstIndex + pageSize * (value - 1), pageSize * value)
    );
  };

  const evaluateDate = (e) => {
    let options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };

  return (
    <div className={`card card-custom card-stretch`}>

<div className={classes.PromotionsMainHeader}>
        <span className={classes.PromotionsHeader}>
       {t(`Buy Tripwerkz Gift Vouchers`)}
        </span><br/>
        <span  className={classes.PromotionsSubHeader}>{t(`Buy your tripwerkz gift vouchers`)}</span>
    
      </div>


      <section className={classes.MyVocherSelection}>
        {/* <div className="container"> */}
          {/* <div className={"pt-5 pl-5 pr-5"}>
            <h3>Buy Tripwerkz Vouchers</h3>
            <p>Use your vouchers for your future purchases</p>
          </div> */}
          {
            loader &&  <div className="text-center" style={{paddingTop:'25px'}}>
               <span className={classes.pleaseWait}>{t(`Please wait`)}...</span>
            </div>
          }
          {
            !loader && 
            <div className={["container",classes.mainContaier].join(' ')}>
              <div className="row justify-content-between " style={{ backgroundColor: "#F5F5F5", borderBottom: "3px solid #287CBC",width:"100%",margin:"0px" }} >
            <div >
                <span className={selectedTab === 0 ? classes.PromotionsTicketTabActive : classes.PromotionsTicketTab} onClick={() => setSelctedTab(0)}>
                {t(`Current Vouchers`)}  </span>
            </div>
            <div >
                <span className={selectedTab === 1 ? classes.PromotionsTicketTabActive : classes.PromotionsTicketTab} onClick={() => setSelctedTab(1)}>
                {t(`Upcoming Vouchers`)} </span>
            </div>
          </div>
            </div>
          }
       
          
          <div className="row">
            { selectedTab === 0 ? voucher && voucher !== null && voucher.length !== 0 
              ? voucher.map((val, index) => (
                  <div className="col-md-6 pt-5 ">
                    <div className={classes.card}>
                      <div className={classes.borderIncommonvocher}>
                        <div class="row">
                          <div class="col-md-6" style={{ paddingRight: "0px" }}>
                            <div className={classes.pricevocher}>
                              <img
                                src={val.voucherImage.length>50 ?val.voucherImage:"/media/Tripwerkzpath/blogdefaultimage.png"}
                                className={classes.giftVocher}
                              />
                              
                              {/* <div className={classes.MyDiscouter}>
                                <h3 className={"pl-5 pt-5"}>{val.title}</h3>
                              </div> */}
                            </div>
                          </div>
                          <div class="col-md-6" style={{ paddingLeft: "0px" }}>
                            <p className={"pt-1 pl-1 pr-1"} style={{minHeight:'22.75px'}}>
                              <b>{val.title}</b>
                            </p>
                            <p className={"pl-1 pr-1"}>
                              <b>{t(`Discount`)}: {val.discountType === "InPercent"
                          ? val.discountValue + "%"
                          : val.discountValue}</b>
                            </p>
                            <p
                              className={"pt-0 pl-1 pr-1"}
                              style={{ fontSize: "11px" }}
                            >
                              {evaluateDate(val.expiron)}
                            </p>
                            <div
                              className={"pt-0 pr-1 pb-1"}
                              style={{ textAlign: "right" }}
                            >
                              <button
                                className={classes.UseInformation}
                                onClick={() =>
                                  props.history.push(
                                    "/gift-vochers/buy/" + val.id
                                  )
                                }
                              >
                                {t(`Buy`)}
                              </button>
                            </div>
                          </div>
                          <div class="col-md-6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : loader ? null : <div className={classes.notFound}>{t(`No Record Found`)}</div> : null}
              { selectedTab === 1 ? voucher1 && voucher1 !== null && voucher1.length !== 0
              ? voucher1.map((val, index) => (
                  <div className="col-md-6 pt-5 pb-5">
                    <div className={classes.card}>
                      <div className={classes.borderIncommonvocher}>
                        <div class="row">
                          <div class="col-md-6" style={{ paddingRight: "0px" }}>
                            <div className={classes.pricevocher}>
                              <img
                                src= {val.voucherImage.length>=50?val.voucherImage:"/media/Tripwerkzpath/blogdefaultimage.png"}
                                className={classes.giftVocher}
                              />
                              {/* <div className={classes.MyDiscouter}>
                                <h3 className={"pl-5 pt-5"}>{val.title}</h3>
                              </div> */}
                            </div>
                          </div>
                          <div class="col-md-6" style={{ paddingLeft: "0px" }}>
                            <p className={"pt-1 pl-1 pr-1"}>
                              <b>{val.title}</b>
                            </p>
                            <p className={"pl-1 pr-1"}>
                              <b>{t(`Discount`)}: {val.discountType === "InPercent"
                          ? val.discountValue + "%"
                          : val.discountValue}</b>
                            </p>
                            <p
                              className={"pt-0 pl-1 pr-1"}
                              style={{ fontSize: "11px" }}
                            >
                              {evaluateDate(val.expiron)}
                            </p>
                            <div
                              className={"pt-0 pr-1 pb-1"}
                              style={{ textAlign: "right" }}
                            >
                              <button
                                className={classes.UseInformation}
                                onClick={() =>
                                  props.history.push(
                                    "/gift-vochers/buy/" + val.id
                                  )
                                }
                              >
                               {t(`Buy`)}
                              </button>
                            </div>
                          </div>
                          <div class="col-md-6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : loader ? null : <div className={classes.notFound}>{t(`No Record Found`)}</div> : null}
          </div>
        {/* </div> */}
        {selectedTab ===0 && voucher && voucher !== null && voucher.length !== 0 && (
          <div className="row pb-2">
            <div className="col-md-12 d-flex justify-content-center">
              <Pagination
                size="large"
                variant="outlined"
                color="secondary"
                className="primary"
                count={Math.ceil(data && data.length / pageSize)}
                page={page}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )    }
        {selectedTab ===1 && voucher1 && voucher1 !== null && voucher1.length !== 0 &&(
          <div className="row pb-2">
            <div className="col-md-12 d-flex justify-content-center">
              <Pagination
                size="large"
                variant="outlined"
                color="secondary"
                className="primary"
                count={Math.ceil(data1 && data1.length / pageSize)}
                page={page1}
                onChange={handlePageChange1}
              />
            </div>
          </div>
        )}

        
      </section>
    </div>
  );
};
