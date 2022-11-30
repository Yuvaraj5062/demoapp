import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { WerkzcreditSuccess } from "./WerkzcreditSuccess";

export default function SuccessPage() {
  return (
    <Switch>
      {/* <Redirect from="/success" exact={true} to="/error/error-v1" /> */}
      <Route path="/success/werkzcredit-extension" component={WerkzcreditSuccess} />
    </Switch>
  );
}
