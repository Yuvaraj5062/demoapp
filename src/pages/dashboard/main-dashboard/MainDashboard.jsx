// import { useEffect, useState } from "react";
// import { matchPath, useLocation } from "react-router-dom"
// import { routeData } from "../../../app/routes/routeData";
import Breadcrumb from "../../../component/breadcrumb/Breadcumb";

const Maindashboard = ({ children }) => {
  return (
    <>
      <Breadcrumb />
      {children}
    </>
  );
};
export default Maindashboard;
