import React, { useEffect, useState } from "react";
import { mainSlice } from "../components/_redux/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import ToggleSwitch from "../components/toggle-switch/ToggleSwitch";
import './Css/settings.css'
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    image:{
        display:'inline-block',
        width:'50px',
        height:'50px',
    }
  }))
export const Settings = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { auth, main } = useSelector((state) => state);
    const [stateItem, setState] = useState(main.settings)
    const [myWerkzCredit, setMyWerkzCredit] = useState()
    const [hotelsInWishList, setHotelsInWishList] = useState()
    const [tierProgress, setTierProgress] = useState()
    const [vouchers, setVouchers] = useState()
    const [recommendations, setRecommendations] = useState()
    const { t } = useTranslation();
    useEffect(() => {

        dispatch(actions.getDashboardItemsList(auth.user.userId))
            .then((response) => {
                setMyWerkzCredit(response.myWerkzCredit)
                setHotelsInWishList(response.hotelsInWishList)
                setTierProgress(response.tierProgress)
                setVouchers(response.vouchers)
                setRecommendations(response.recommendations)

            });
    }, []);


    const myWerkzCreditChange=(val)=>{
        setMyWerkzCredit(val==="myWerkzCredit"? !myWerkzCredit:myWerkzCredit)
        setTierProgress(val==="tierProgress"?!tierProgress:tierProgress)
        setVouchers(val==="vouchers"?!vouchers:vouchers)
        setRecommendations(val==="recommendations"?!recommendations:recommendations)
    
        const payload = {
                    "userId": auth.user.userId,
                    "myWerkzCredit": val==="myWerkzCredit"?!myWerkzCredit:myWerkzCredit,
                    "hotelsInWishList": hotelsInWishList,
                    "tierProgress":val==="tierProgress"?!tierProgress:tierProgress ,
                    "vouchers":val==="vouchers"?!vouchers:vouchers ,
                    "recommendations":val==="recommendations"?!recommendations:recommendations 
                }
                    dispatch(actions.addDashboardItem(payload))
            .then((response) => {
                if (response) {
                    dispatch(actions.getDashboardItemsList(auth.user.userId));
                }
            })

    }

    // useEffect(() => {

    //     const payload = {
    //         "userId": auth.user.userId,
    //         "myWerkzCredit": myWerkzCredit,
    //         "hotelsInWishList": hotelsInWishList,
    //         "tierProgress": tierProgress,
    //         "vouchers": vouchers,
    //         "recommendations": recommendations
    //     }

    //     dispatch(actions.addDashboardItem(payload))
    //         .then((response) => {
    //             if (response) {
    //                 dispatch(actions.getDashboardItemsList(auth.user.userId));
    //             }

    //         })

    // }, [myWerkzCredit, hotelsInWishList, vouchers, tierProgress])

    return (
        <div className={`card card-custom card-stretch`}>
            <div className="settingHeader">
                <span className="settingHeaderText">   
                    {t(`Dashboard Configuration`)}
                </span>
            </div>

            <div className="card" style={{paddingTop:'40px'}}>

                <div className="row m-auto w-100 p-4" style={{ backgroundColor: "#F5F5F5" }}>
                    <div className="col-2"></div>
                    <div className="col-4 text-start ">
                        <span className="settingTableHeader">
                            {t(`Configuration for`)}
                        </span>

                    </div>
                    <div className="col-4 text-center">
                        <span className="settingTableHeader">
                             {t(`Show On Dashboard`)}
                        </span>
                    </div>
                    <div className="col-2"></div>
                </div>

                <div className="row m-10 align-items-center">
                    <div className="col-2"></div>
                    <div className="col-4 text-start font-weight-bold p-0">
                        <img
                            src='media/Tripwerkzpath/Dashboard/credits.png' className={classes.image} />
                        <span className="pl-3">{t(`My Werkz Credit`)}
                            </span>
                    </div>
                    <div className="col-4 text-center pt-2 font-weight-bold">
                        {main.settings &&
                            <div >
                                <ToggleSwitch
                                    handleToggle={() => {
                                        myWerkzCreditChange("myWerkzCredit")
                                        
                                    }}
                                    isToggled={myWerkzCredit}
                                />
                            </div>
                        }
                    </div>
                    <div className="col-2 ">
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="row m-10 align-items-center">
                    <div className="col-2"></div>
                    <div className="col-4 text-start  font-weight-bold  p-0">
                        <img
                            src='media/Tripwerkzpath/Dashboard/recomandation.png' className={classes.image} />
                        <span className="pl-3">{t(`Recommendations`)}</span>
                    </div>
                    <div className="col-4 text-center pt-2 font-weight-bold">
                        {main.settings &&
                            <div >
                                <ToggleSwitch
                                    handleToggle={() => {
                                        myWerkzCreditChange("recommendations")
                                    }}
                                    isToggled={recommendations}
                                />
                            </div>
                        }
                    </div>
                    <div className="col-2 ">
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="row m-10 align-items-center">
                    <div className="col-2"></div>
                    <div className="col-4 text-start font-weight-bold p-0">
                        <img
                            src='media/Tripwerkzpath/Dashboard/progress.png' className={classes.image} />
                        <span className="pl-3">{t(`Tier Progress`)}</span>
                    </div>
                    <div className="col-4 text-center pt-2 font-weight-bold">
                        {main.settings &&
                            <div className="">
                                <ToggleSwitch
                                    handleToggle={() => {
                                        myWerkzCreditChange("tierProgress")
                                    }}
                                    isToggled={tierProgress}
                                />
                            </div>
                        }
                    </div>
                    <div className="col-2 ">
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="row m-10 align-items-center">
                    <div className="col-2"></div>
                    <div className="col-4 text-start font-weight-bold p-0">
                        <img
                            src='media/Tripwerkzpath/Dashboard/voucher.png'  className={classes.image}/>
                        <span className="pl-3">{t(`Vouchers`)}</span>
                    </div>
                    <div className="col-4 text-center pt-2 font-weight-bold">
                        {main.settings &&
                            <div className="">
                                <ToggleSwitch
                                    handleToggle={() => {
                                        myWerkzCreditChange("vouchers")
                                    }}
                                    isToggled={vouchers}
                                />
                            </div>
                        }
                    </div>
                    <div className="col-2 ">
                    </div>
                </div>
            </div>
        </div>
    );
};