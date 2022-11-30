import React, { Suspense, lazy, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./components/_redux/mainActions";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { ProfilePage } from "./pages/ProfilePage";
import { WhichList} from "./pages/WhichList";
//import { Settings} from "./pages/Settings";
import { Settings } from "./pages/Settings"
import { TripInformation } from "./pages/TripInformation";
import { MyReviews } from "./pages/MyReviews";
import { AccountSettingPage } from "./pages/AccountSettingPage";
import { MyWerkzCredits } from "./pages/MyWerkzCredits";
import { BookingPurchase } from "./pages/BookingPurchase";
import { MyVouchersPromoCodes } from "./pages/MyVouchersPromoCodes";
import {GiftVocher} from "./pages/GiftVocher";
import { DevelopmentPage } from "./pages/DevelopmentPage";
import { ManagePaymentMethods } from "./pages/ManagePaymentMethods";
import { ReferMyFriend } from "./pages/ReferMyFriend";
import { MyBookings } from "./pages/MyBookings";
import { ManageBookingInfo } from "./pages/ManageBookingInfo";
import { BuyGiftVoucher } from "./pages/BuyGiftVoucher";
import BuyWerkzCredits from "./pages/BuyWerkzCredits";
import BookingDetails from "./pages/BookingDetails";
import  EditCards  from "./pages/MyCards/EditCards" 
import  {Ewallet}  from "./pages/Ewallet"
import AddEwalletPoints from "./pages/AddEwalletPoints"; 
import OpenTicket from "./pages/OpenTicket";
import { Blogs } from "./pages/Blogs";
import ClientQueryReply from "./pages/ClientQueryReplay";


export default function BasePage() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const headers = {
    Authorization:'Bearer ' + auth.authToken,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    if (auth.user) {
      dispatch(
        actions.getCountryDetails(
          {
            "display-length": 999999,
            "display-start": 1,
            "sort-column": 0,
            "sort-direction": "ASC",
            "search-text": "",
          },
          headers,
        ),
      );
      dispatch(actions.getUserDetails(auth.user["emailId"], headers));
      dispatch(
        actions.getCityDetails(auth.user["provinceId"],auth.user["countryId"]),
      );
      dispatch(
        actions.getProvinceDetails(auth.user["countryId"]
        ),
      );
      dispatch(actions.getMyMiddlewareCountries({
        "display-length": 999999,
        "display-start": 1,
        "sort-column": 0,
        "sort-direction": "ASC",
        "search-text": "",
      }));
      dispatch(actions.getMyMiddlewareCurrencies());


    }
  }, [dispatch]);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/trip-information" />}
        <ContentRoute path="/trip-information" component={TripInformation} />
        <ContentRoute path="/profile" component={ProfilePage} />
        <ContentRoute
          path="/manage-payment-methods"
          component={ManagePaymentMethods}
        />


<ContentRoute
          path="/my-card/edit-card/:id"
          component={EditCards}
        />
        {/* <ContentRoute path="/my-bookings" component={MyBookings} /> */}
        {/* <ContentRoute
          path="/manage-booking-info"
          component={ManageBookingInfo}
        /> */}
        <ContentRoute path="/refer-my-friend" component={ReferMyFriend} />
        <ContentRoute path="/my-werkz-credits" component={MyWerkzCredits} />
        <ContentRoute path="/werkz-credits/buy" component={BuyWerkzCredits} />

        <ContentRoute
          path="/my-vouchers-promo-codes"
          component={MyVouchersPromoCodes}
        />
        <ContentRoute path="/gift-vochers/buy/:id" component={BuyGiftVoucher} />
        <ContentRoute path="/gift-vochers" component={GiftVocher} />
        <ContentRoute path="/my-reviews" component={MyReviews} />


        <ContentRoute path="/booking-purchase" component={BookingPurchase} />
        <ContentRoute path="/booking/detail/:id" component={BookingDetails} />
        <ContentRoute path="/account-setting" component={AccountSettingPage} />
        <ContentRoute path="/under-development" component={DevelopmentPage} />
        <ContentRoute path="/which-list" component={WhichList} />
        <ContentRoute path="/e-wallet" component={Ewallet} />
        <ContentRoute path="/settings" component={Settings} />
        <ContentRoute path="/add-e-wallet-points" component={AddEwalletPoints} />
        <ContentRoute path="/open-ticket" component={OpenTicket} />
        <ContentRoute path="/blogs" component={Blogs} />
        <ContentRoute path="/user/reply-query" component={ClientQueryReply} />
        
        <Redirect exact to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
