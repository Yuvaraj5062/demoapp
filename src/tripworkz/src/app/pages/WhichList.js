
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import 'react-phone-input-2/lib/high-res.css'
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
    Whichborder: { border: '1px solid #ccc', padding: '10px', },
    WichlistLudgery: { width: '100%', },
    specialbtn: { padding: '5px 10px', backgroundColor: '#2cae2c', color: '#fff', fontSize: '8px', borderRadius: '5px', border: 'none', },
    spaniargalInformer: { fontSize: '15px', },
    roomAmount: { position: 'relative' },
    totalAmounter: { color: '#fc9f22', marginTop: '10px', },
    BookNowinformer: { padding: '5px 10px', backgroundColor: '#287CBC', color: '#fff', border: 'none', borderRadius: '10px', },
    BookContinuse: { position: 'absolute', right: '0px', bottom: '0px', },
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
    }
}))

export const WhichList = (props) => {
    const [value, setValue] = React.useState();
    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <div className={`card card-custom card-stretch`}>
            <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`Wishlist`)}
            </span><br />
            {/* <span classes={classes.SubTitle}>{t(`All your registered payment method will be shown here`)}</span> */}
          </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-sm-6 col-12">
                        <div className={'pt-2 pb-6'}></div>
                        {/* <h2> {t(`Wishlist`)}</h2> */}
                        <div className={classes.Whichborder}>
                            <img src="/media/Tripwerkzpath/ludgery/whichlist.jpg" className={classes.WichlistLudgery} />
                            <h3 className={'pt-4 pb-1'}>{t(`Diamond Hotel`)} <button className={classes.specialbtn}>{t(`SPECIAL`)}</button></h3>
                            <Rating name="simple-controlled" value={4.5} onChange={(event, newValue) => { setValue(newValue); }} className={classes.spaniargalInformer} /> <span>{t(`1,234 reviews`)}</span>
                            <p><i class="fas fa-map-marker-alt"></i>{t(`Quezon City, Manila -63 km to center`)} </p>
                            <div className="amanitiyInformernow">
                                <li><i class="fas fa-wifi"></i> {t(`Free Wifi`)}</li>
                                <li><i class="fas fa-utensils"></i> {t(`Restaurant`)}</li>
                            </div>
                            <div className="amanitiyInformernow">
                                <li><i class="fas fa-swimming-pool"></i> {t(`pool`)}</li>
                                <li><i class="fas fa-concierge-bell"></i> {t(`Room Service`)}</li>
                            </div>
                            <div className={classes.roomAmount}>
                                <h3 className={classes.totalAmounter}>$200</h3>
                                <div className={classes.BookContinuse}>
                                    <button className={classes.BookNowinformer}>{t(`Book Now`)}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};