/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import { Link, Switch, Redirect } from "react-router-dom";
// import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
// import { ContentRoute } from "../../../../_metronic/layout"
// import Login from "./Login";
// import Registration from "./Registration";
// import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { AuthLayout } from "../../../../_metronic/layout/components/AuthLayout";

export function AuthPage() {
  return (
    <>
      <AuthLayout />
    </>
  );
}
