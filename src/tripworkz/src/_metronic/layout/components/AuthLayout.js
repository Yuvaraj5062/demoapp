import React, { useMemo } from "react";
import objectPath from "object-path";
// LayoutContext
import { useHtmlClassService } from "../_core/MetronicLayout";
// Import Layout components
import { Header } from "./header/Header";
import { HeaderMobile } from "./header-mobile/HeaderMobile";
import { Footer } from "./footer/Footer";
import { LayoutInit } from "./LayoutInit";
import { ScrollTop } from "./extras/ScrollTop";
import { AnimateLoading } from "../../_partials/controls";
import { Switch, Redirect } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout"
import Login from "./../../../app/modules/Auth/pages/Login";
import Registration from "./../../../app/modules/Auth/pages/Registration";
import ForgotPassword from "./../../../app/modules/Auth/pages/ForgotPassword";
import SetPassword from "./../../../app/modules/Auth/pages/SetPassword";
import "../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import AcceptRejectPromocode from "../../../app/pages/AcceptRejectPromocode/AcceptRejectPromocode";
import {Route,useLocation} from "react-router-dom"
export function AuthLayout({ children }) {
  const location = useLocation()
  const uiService = useHtmlClassService();
  // Layout settings (cssClasses/cssAttributes)
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      selfLayout: objectPath.get(uiService.config, "self.layout"),
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      subheaderDisplay: objectPath.get(uiService.config, "subheader.display"),
      desktopHeaderDisplay: objectPath.get(
        uiService.config,
        "header.self.fixed.desktop"
      ),
      contentCssClasses: uiService.getClasses("content", true),
      contentContainerClasses: uiService.getClasses("content_container", true),
      contentExtended: objectPath.get(uiService.config, "content.extended"),
    };
  }, [uiService]);

  return layoutProps.selfLayout !== "blank" ? (
    <>
      <AnimateLoading />

      {/*begin::Main*/}
      <HeaderMobile />

      {location.pathname==="/voucheraccept"? 
        <div className="d-flex flex-column flex-root">
          <Switch>
            <Route to="/voucheraccept" component={AcceptRejectPromocode} />
          </Switch>
        </div>
      :<div className="d-flex flex-column flex-root">
        {/*begin::Page*/}
        <div className="d-flex flex-row flex-column-fluid page">
          {/*begin::Wrapper*/}
          <div
            className="d-flex flex-column flex-row-fluid wrapper"
            id="kt_wrapper"
          >
            <Header />
            {/*begin::Content*/}
            <div
              id="kt_content"
              className={`content ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
            >
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute path="/auth/registration" component={Registration} />
                <ContentRoute path="/auth/forgot-password" component={ForgotPassword} />
                <ContentRoute path="/auth/set-password" component={SetPassword} />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
              {/*end::Entry*/}
            </div>
            {/*end::Content*/}
            <Footer />
          </div>
          {/*end::Wrapper*/}
        </div>
        {/*end::Page*/}
      </div>}
      <ScrollTop />
      {/*end::Main*/}
      <LayoutInit />
    </>
  ) : (
    // BLANK LAYOUT
    <div className="d-flex flex-column flex-root">{children}</div>
  );
}
