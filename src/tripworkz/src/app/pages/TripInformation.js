import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import { useCookies } from "react-cookie";
import 'react-circular-progressbar/dist/styles.css';
import { Tooltip } from "@material-ui/core";
import { useTranslation } from "react-i18next";



// getting date range for hotel listing
var today = new Date();
const CheckInDate = new Date(today);
CheckInDate.setDate(CheckInDate.getDate() + 14);
const CheckOutDate = new Date(today);
CheckOutDate.setDate(CheckOutDate.getDate() + 15);
// getting date range for hotel listing

const useStyles = makeStyles((theme) => ({
  MyVocherSelection: { width: "100%", float: "left", padding: "11px 0px" },
  myWeekzCredition: {
    width: "100%",
    float: "left",
    backgroundColor: "#287CBC",
    position: "relative",
    borderRadius: "11px",
    marginTop: "10px",
    padding: "5px 0px 0px 0px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      marginTop: "20px",
    },
    boxShadow: "0px 0px 20px #ccc",
  },
  TripDateInformer: {
    backgroundColor: "#fff",
    borderRadius: "0px 0px 10px 10px",
    padding: "5px 5px",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
    minHeight: '156px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  TripDateInformerTier: {
    backgroundColor: "#fff",
    borderRadius: "0px 0px 10px 10px",
    padding: "5px 5px",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
    minHeight: '156px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  TripDateInformernow: {
    backgroundColor: "#fff",
    borderRadius: "0px 0px 10px 10px",
    padding: "5px 5px",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
  },
  MyWerkzInformation: { fontSize: "13px", color: "#fff", marginTop: "5px" },
  Daycationnow: {
    fontSize: "50px",
    padding: "10px 0px",
    fontWeight: "800",
    color: "#287CBC",
  },
  Pointsexpire: { fontSize: "15px", color: "#000" },
  dataInfligher: { width: "15px" },
  TravelingPath: {
    width: "100%",
    minHeight: 200,
    maxHeight: 200,
    objectFit: "cover",
    borderRadius: 10,
  },

  voucherImg: {
    width: "100%",
    // height: "80%",
    // margin: "5px"
  },

  points: { fontSize: "13px", fontWeight: "400" },
  TripworkPoints: { marginTop: "10px" },
  gifImageConversion: { width: "100%", padding: "10px" },

  Hangualtornel: { padding: "10px" },
  HangualInformed: { fontSize: "14px", margin: "0px" },
  AsianHotelInform: { padding: "10px 0px" },
  tierProgressCredits: {
    textAlign: 'start',
    fontSize:'14px'
  },
  tierProgressMsg:{
    textAlign: 'center',
    fontSize:'14px',
    color: '#287CBC',
    
  },
  silver: {
    display: "inline-block",
    padding: "5px",
    border: '1px solid silver',
    minWidth: '70px',
    background: 'silver',
    color: '#282828',
    fontWeight:'500',
    cursor: 'pointer'
  },
  gold: {
    display: "inline-block",
    padding: "5px",
    border: '1px solid gold',
    minWidth: '70px',
    borderLeft: '0px',
    background: 'gold',
    color: '#282828',
    fontWeight:'500',
    cursor: 'pointer'
  },
  platinum: {
    display: "inline-block",
    padding: "5px",
    border: '1px solid #DCDCDC',
    minWidth: '70px',
    borderLeft: '0px',
    background: '#DCDCDC',  
    color: '#282828',
    fontWeight:'500',
    cursor: 'pointer'
  },
  tooltip: {
    display: 'inline-block',
    position: 'relative',
  },
}));

const useStylesTooltip = makeStyles((theme) => ({
  arrow: {
    color: '#287CBC',
  },
  tooltip: {
    backgroundColor:'#287CBC',
    color:'white',
    minWidth:'100px',
    textAlign:'center',
    fontSize:'14px',
    fontWeight:"400"
  },
}));

function CustomTooltip(props) {
  const classe = useStylesTooltip();

  return <Tooltip arrow classes={classe} {...props} />;
}
// let array = [{ "1": 1 }, { "2": 2 }, { 3: "f" },]
export const TripInformation = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies();
  const [dashboardData, setDashboardData] = useState()
  const [circleColor, setCircleColor] = useState()
  const [msg, setMsg] = useState(null)
  const [silverPoints, setSilverPoints] = useState({minPoint:501,maxPoint:1000})
  const [goldPoints, setGoldPoints] = useState({minPoint:1001,maxPoint:1500})
  const [platinumPoints, setPlatinumPoints] = useState({minPoint:1501,maxPoint:2000})
  const [currentCurrency, setCurrentCurrency] = useState("SGD");
  const [userWishlist, setUserWishlist] = useState(
    cookies["user-wishlist"] ? cookies["user-wishlist"] : [],
  );

  const { auth, main } = useSelector((state) => state);
  
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "api-key": process.env.REACT_APP_TRIP_API_KEY,
  };

  let userId = auth.user.userId
  useEffect(() => {
    
    dispatch(actions.getDashboardItemsList(userId));
    dispatch(actions.getDashboardPoints()).then((response)=>{
      
      if (response[0].membershipLevel==="Silver") {
        setSilverPoints({minPoint:response[0].minPoint,maxPoint:response[0].maxPoint})  
      }if (response[1].membershipLevel==="Gold") {
        
        setGoldPoints({minPoint:response[1].minPoint,maxPoint:response[1].maxPoint})  
      }
       if (response[2].membershipLevel==="Platinum") {
        setPlatinumPoints({minPoint:response[2].minPoint,maxPoint:response[2].maxPoint})  
      }
    });
    dispatch(actions.getDashboardDetails(userId)).then((response) => {
      setDashboardData(response)
      if (response.membershipLevel === "Silver") {
        setCircleColor("silver")
      }
      else if (response.membershipLevel === "Gold") {
        setCircleColor("GOLD")
      }
      else if (response.membershipLevel === "Platinum") {
        setCircleColor("#DCDCDC")
      }else{
        setMsg(response.membershipLevel)
      }
    });
  }, []);





  useEffect(() => {
    if (auth.user) {
     
    }
  }, [dispatch]);
  useEffect(() => {
    setCookie("user-wishlist", userWishlist, {
      path: "/",
      maxAge: 2592000,
      domain: "tripwerkz.com",
    });
  }, [userWishlist]);

  return (
    <div className={`card card-custom card-stretch`}>
      <div style={{ backgroundColor: "#F5F5F5", padding: "20px 20px" }}>
        <span style={{ fontWeight: "600", fontSize: "18px", color: "#287CBC" }}>
           {t(`Trip Dashboard`)}
        </span>
      </div>
      <section className={classes.MyVocherSelection}>
        <div className="container">
          {main.settings ?
            <div className={"pt-1"}>
              <div className="row">
                {main.settings.myWerkzCredit && <div className="col-md-6">
                  <div className={classes.myWeekzCredition}>
                    <div className="myCreditsInfomr">
                      <li>
                        <img
                          src="/media/Tripwerkzpath/dateInform.png"
                          className={classes.dataInfligher}
                        />
                      </li>
                      <li>
                        <h5 className={classes.MyWerkzInformation}>
                          {t(`My werkz credits`)}
                        </h5>
                      </li>
                    </div>
                    <div className={classes.TripDateInformer}>
                      <span className={classes.Daycationnow}>
                        {main.user !== null ? main.user.balance : 0}
                        {/* <span className={classes.points}>points</span> */}
                      </span>
                      {/* <p className={classes.Pointsexpire}> */}
                      {/* Your points will be ready for use soon */}
                      {/* {"05"} points expire {"30 may 2022"} */}
                      {/* </p> */}
                    </div>
                  </div>
                </div>
                }

                {main.settings.tierProgress && <div className="col-md-6">
                  <div className={classes.myWeekzCredition}>
                    <div className="myCreditsInfomr">
                      <li>
                        <img
                          src="/media/Tripwerkzpath/currently.png"
                          className={classes.dataInfligher}
                        />
                      </li>
                      <li>
                        <h5 className={classes.MyWerkzInformation}>
                        {t(`Tier progress`)}
                        </h5>
                      </li>
                    </div>
                    <div className={classes.TripDateInformerTier}>
                    
                      <div className="row w-100">
                    {msg?  <div className="col-md-12" style={{paddingLeft:'17px',paddingBottom:"17px"}}><span className={classes.tierProgressMsg}>{msg}</span></div>:

                        <div className="col-md-8" style={{padding:'5px'}}>
                          <ul style={{color:'#287CBC'}}>
                        
                            <li className={classes.tierProgressCredits}>
                              <span >{t(`Earned`)}</span>
                              <span >  {dashboardData && dashboardData.pointBalance}</span>{' '}{' '}
                              <span >{t(`credits`)}</span>
                            </li>

                            <li className={classes.tierProgressCredits}>
                              <span>{t(`Membership_status`)}</span>   
                              <span> {dashboardData && dashboardData.membershipLevel}</span>
                            </li>

                          </ul>

                        </div>
}
                        <div className="col-md-4">
                          <div style={{ width: "80%", textAlign: "center" }}>
                            {dashboardData &&
                              <div style={{
                                position: "absolute",
                                height: "50px",
                                width: "50px",
                                left: "1px",
                                top: "0px",
                                bottom:'100px',
                                background: `${circleColor}`,
                                borderRadius: "50%",
                                transition: "transform 5s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              >
                                <div style={{ color: "white",fontWeight:'bold' }} >{dashboardData.pointBalance}</div>
                              </div>
                              // <CircularProgressbarWithChildren
                              // value={66} strokeWidth={4} 
                              // counterClockwise={true} 
                              // >
                              //   <div className="h3">
                              //     <b >{dashboardData.pointBalance}</b>
                              //     </div>
                              //   <div > credit
                              //   </div>
                              // </CircularProgressbarWithChildren>
                            }
                          </div>
                        </div>
                        <div className='col-md-12 mt-5'>
                          <CustomTooltip title={`${silverPoints.minPoint} - ${silverPoints.maxPoint}`} placement='top' >
                            <span className={classes.silver}>{t(`Silver`)}</span>
                          </ CustomTooltip >
                          <CustomTooltip title={`${goldPoints.minPoint} - ${goldPoints.maxPoint}`} placement='top' arrow>
                            <span className={classes.gold}>{t(`Gold`)}</span>
                          </CustomTooltip  >
                          <CustomTooltip title={`${platinumPoints.minPoint} - ${platinumPoints.maxPoint}`} placement='top' arrow >
                            <span className={classes.platinum}>{t(`Platinum`)}</span>
                          </CustomTooltip  >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                }
              </div>

              {main.settings.vouchers && <div className="row">
                <div className="col-md-6" style={{paddingTop:'15px'}}>
                  <div className={classes.myWeekzCredition}>
                    <div className="myCreditsInfomr">
                      <li>
                        <img
                          src="/media/Tripwerkzpath/dateStar.png"
                          className={classes.dataInfligher}
                        />
                      </li>
                      <li>
                        <h5 className={classes.MyWerkzInformation}>
                          {t(`Vouchers you can redeem`)}
                        </h5>
                      </li>
                    </div>
                    <div className={classes.TripDateInformer}>

                      {/* {userWishlist.length >0 ? ( */}
                      <div className="row">
                        <div className="col-md-12">
                          <img
                            src="/media/Tripwerkzpath/voucher.jpg" className={classes.voucherImg} />
                        </div>

                        {/* ) : (
                        <div className="col-12 mx-auto my-2">
                          <p>
                           No Vouchers Available
                          </p>
                        </div>
                      )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              }
              {/* <div className="row">
              <div className="col-md-12">
                <div className={classes.TripworkPoints}>
                  <div className={classes.myWeekzCredition}>
                    <div className="myCreditsInfomr">
                      <li>
                        <img
                          src="/media/Tripwerkzpath/dateStar.png"
                          className={classes.dataInfligher}
                        />
                      </li>
                      <li>
                        <h5 className={classes.MyWerkzInformation}>
                          Vouchers you can redeem
                        </h5>
                      </li>
                    </div>
                    <div className={classes.TripDateInformernow}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className={classes.VoucherGifter}>
                            <img
                              src="/media/Tripwerkzpath/voucher.jpg"
                              className={classes.gifImageConversion}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={classes.VoucherGifter}>
                            <img
                              src="/media/Tripwerkzpath/voucher.jpg"
                              className={classes.gifImageConversion}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            */}
              {/* {main.settings.recommendations &&      <div class="row">
              <div class="col-md-12">
                <div className={classes.TripworkPoints}>
                  <div className={classes.myWeekzCredition}>
                    <div className="myCreditsInfomr">
                      <li>
                        <img
                          src="/media/Tripwerkzpath/savingFiles.png"
                          className={classes.dataInfligher}
                        />
                      </li>
                      <li>
                        <h5 className={classes.MyWerkzInformation}>
                          Recommendations for you
                        </h5>
                      </li>
                    </div>
                    {main.recommendedHotelForUser ? (
                      <div className={classes.TripDateInformernow}>
                        <div className="row">
                          {main.recommendedHotelForUser.hotels
                            .filter(
                              (val) =>
                                val["hotel-key"] && val["hotel-key"] !== null,
                            )
                            .slice(0, 6)
                            .map((hotel, index) => (
                              <div className="col-md-4 col-lg-4 col-sm-4 col-6">
                                <div className={classes.Hangualtornel}>
                                  <div className="HangualHotel">
                                    <img
                                      src={
                                        hotel.images["base-url"].md
                                          ? hotel.images["base-url"].md +
                                          hotel.images["feature-image-url"]
                                          : hotel.images["base-url"].lg +
                                          hotel.images["feature-image-url"]
                                      }
                                      className={classes.TravelingPath}
                                    />
                                  </div>
                                  <div className={classes.Circle}>
                                    <p className={classes.HangualInformed}>
                                      <b>{hotel["hotel-name"]}</b>
                                    </p>
                                    <p className={classes.HangualInformed}>
                                      {hotel["hotel-address"]["address"] +
                                        ", " +
                                        hotel["hotel-address"]["city"]}
                                    </p>
                                  </div>
                                  <a
                                    href={`https://www.tripwerkz.com/hotels/rooms/show-rooms?cg=HOTEL&ci=${getDateYYYYMMDD(
                                      CheckInDate,
                                    )}&co=${getDateYYYYMMDD(
                                      CheckOutDate,
                                    )}&hid=${hotel["hotel-id"]
                                      }&rd=1-2-0&curr=${currentCurrency}&hkey=${hotel["hotel-key"]
                                      }`}
                                    target="_blank"
                                  >
                                    View Hotel
                                  </a>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                     ) : (
                      <div className={classes.TripDateInformernow}>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                            <div className={classes.Hangualtornel}>
                              <span className="spinner-border text-primary"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )} 
                  </div>
                </div>
              </div>
            </div>
} */}
            </div>
            : null}
        </div>
      </section>
    </div>
  );
};
