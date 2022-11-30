import React from "react";
// import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { corporateNavbarData } from "../../data/data";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen ";

const Corporate = ({ children }) => {
  const isMobile = useCheckMobileScreen();
  return (
    <div>
      {!isMobile ? <Navbar navbarData={corporateNavbarData} /> : ""}
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Corporate;
