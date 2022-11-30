import React, { Suspense, lazy, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./components/_redux/mainActions";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { ListVoucher } from "./modules/Admin/pages/Vouchers/ListVoucher";
import CreateVoucher from "./modules/Admin/pages/Vouchers/CreateVoucher";
import EditVoucher from "./modules/Admin/pages/Vouchers/EditVoucher";
import CreditPoints from "./modules/Admin/pages/Configurations/CreditPoints";
// import ExpiryTime from "./modules/Admin/pages/Configurations/ExpiryTime";
import Blogs from "./modules/Admin/pages/Blogs/Blogs";
import Reviews from "./modules/Admin/pages/Reviews/Reviews";
import PromocodeList from "./modules/Admin/pages/Promocodes/PromocodeList";
import CreatePromoCode from "./modules/Admin/pages/Promocodes/CreatePromoCode";
import EditPromoCode from "./modules/Admin/pages/Promocodes/EditPromoCode";
import OpenTicket from "./modules/Admin/pages/OpenTicket/OpenTicket";
import { ProfilePage } from "./pages/ProfilePage";
import QueryReply from "./modules/Admin/pages/OpenTicket/QueryReply";


export default function AdminRoutes() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const headers = {
    Authorization: "Bearer " + auth.authToken,
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
          headers
        )
      );
      dispatch(actions.getUserDetails(auth.user["emaiL_ID"], headers));
      dispatch(
        actions.getCityDetails(
          auth.user["provinceId"],
          auth.user["countryId"]
        )
      );
      dispatch(actions.getProvinceDetails(auth.user["countryId"]));
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/admin/vouchers/list" />}
        <ContentRoute path="/admin/vouchers/list" component={ListVoucher} />
        <ContentRoute path="/admin/vouchers/add" component={CreateVoucher} />
        <ContentRoute path="/admin/vouchers/edit/:id" component={EditVoucher} />
        <ContentRoute
          exact
          path="/admin/werkcreditz"
          component={CreditPoints}
        />
        {/* <ContentRoute path="/admin/werkcreditz-expiry" component={ExpiryTime} /> */}
        <ContentRoute path="/admin/blogs" component={Blogs} />
        <ContentRoute path="/admin/reviews" component={Reviews} />
        <ContentRoute path="/admin/profile" component={ProfilePage} />
        <ContentRoute path="/admin/promocodes/list" component={PromocodeList} />
        <ContentRoute
          path="/admin/promocodes/add"
          component={CreatePromoCode}
        />
        <ContentRoute
          path="/admin/promocodes/edit/:id"
          component={EditPromoCode}
        />
         <ContentRoute path="/admin/open-ticket" component={OpenTicket} />
         <ContentRoute path="/admin/reply-query" component={QueryReply} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
