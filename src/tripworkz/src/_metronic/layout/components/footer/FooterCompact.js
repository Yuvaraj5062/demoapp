import React from "react";
import { toAbsoluteUrl } from "../../../_helpers";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Link from "@material-ui/core/Link";
export function FooterCompact({
  today,
  footerClasses,
  footerContainerClasses,
}) {
  const iconStyle = {
    color: "#287CBC",
    fontSize: "45px",
    margin: "0 12px",
  };

  const footerNavStyle = {
    listStyle: "none",
    padding: 0,
    fontWeight: "500",
    lineHeight: "30px",
  };
  return (
    <>
      {/* begin::Footer */}
      <div
        className={`footer bg-white pt-15 flex-lg-column  ${footerClasses}`}
        id="kt_footer"
      >
        {/* begin::Container */}
        <div className="container mb-5">
          <div className="row">
            <div className="col-md-4  col-sm-12 text-center">
              <div className="mb-2">
                <Link href="https://www.tripwerkz.com/" target="_blank">
                  <img
                    className="logo-default max-h-50px"
                    alt="Logo"
                    src={toAbsoluteUrl("/media/logos/logonew.png")}
                  />
                </Link>
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  fontWeight: "400",
                  margin: "0px",
                  color: "#4a4a4a",
                  padding: "10px",
                }}
              >
                Tripwerkz is Asia’s leading online travel company that provides
                online travel booking services such as hotel reservation,
                airline ticket, packaged and customized tours and other
                miscellaneous travel management applications.
              </p>
              <div className="mb-5">
                <Link
                  href="https://www.facebook.com/Tripwerkz-107745654720275"
                  target="_blank"
                  style={{ padding: "0px 5px" }}
                >
                  <i
                    className="fab fa-facebook-f"
                    style={{ color: "#297cbb", fontSize: "23px" }}
                  ></i>
                </Link>
                <Link
                  href="https://www.instagram.com/tripwerkz/"
                  target="_blank"
                  style={{ padding: "0px 5px" }}
                >
                  <i
                    className="fab fa-instagram"
                    style={{ color: "#297cbb", fontSize: "23px" }}
                  ></i>
                </Link>
                <Link
                  href="https://twitter.com/tripwerkz"
                  target="_blank"
                  style={{ padding: "0px 5px" }}
                >
                  <i
                    className="fab fa-twitter"
                    style={{ color: "#297cbb", fontSize: "23px" }}
                  ></i>
                </Link>
              </div>
            </div>
            <div className="col-md-7 col-sm-12">
              <div className="row">
                <div className="col-sm-4 text-center">
                  <div className={"mt-9"}>
                    <h3 style={{ fontWeight: "600", color: "#000" }}>
                      ABOUT US
                    </h3>
                    <ul style={footerNavStyle}>
                      <li style={{ fontWeight: "400" }}>
                        <Link
                          href="https://www.tripwerkz.com/blogs/"
                          
                        >
                          <span className="footerNavbarConversion">Blogs</span>
                        </Link>
                      </li>
                      <li style={{ fontWeight: "400" }}>
                        <Link
                          href="https://www.tripwerkz.com/careers/"
                        
                        >
                          <span className="footerNavbarConversion">
                            Careers
                          </span>
                        </Link>
                      </li>
                      <li style={{ fontWeight: "400" }}>
                        <Link
                          href="https://www.tripwerkz.com/sitemap/"
                      
                        >
                          <span className="footerNavbarConversion">
                            Site Map
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4 text-center">
                  <div className={"mt-9"}>
                    <h3 style={{ fontWeight: "600", color: "#000" }}>
                      TERMS OF USE
                    </h3>
                    <ul style={footerNavStyle}>
                      <li style={{ fontWeight: "400" }}>
                        <Link
                          href="https://www.tripwerkz.com/faq/"
                       
                        >
                          <span className="footerNavbarConversion">
                            FAQ Page
                          </span>
                        </Link>
                      </li>
                      <li style={{ fontWeight: "400" }}>
                        <Link
                          href="https://www.tripwerkz.com/privacy-policy/"
                    
                        >
                          <span className="footerNavbarConversion">
                            Privacy Policy
                          </span>
                        </Link>
                      </li>
                      <li style={{ fontWeight: "400" }}>
                        <Link
                          href="https://www.tripwerkz.com/cookie-policy/"
                      
                        >
                          <span className="footerNavbarConversion">
                            Cookie Policy
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4 text-center">
                  <div className={"mt-9"}>
                    <h3 style={{ fontWeight: "600", color: "#000" }}>
                      FOR BUSINESS
                    </h3>
                    <ul style={footerNavStyle}>
                      {/* <li style={{fontWeight: '400',}}>Merchant/Supplier Access</li>
                    <li style={{fontWeight: '400',}}>Partners Access</li>
                    <li style={{fontWeight: '400',}}>Agent Access</li> */}
                      <li style={{ fontWeight: "400" }}>
                        <Link
                          href="https://www.tripwerkz.com/content-creator-access/"
                    
                        >
                          <span className="footerNavbarConversion">
                            Content Creator Access
                          </span>
                        </Link>
                      </li>
                      <li style={{ fontWeight: "400" }}>
                        <Link
                          href="https://www.tripwerkz.com/partner-with-us/"
                      
                        >
                          <span className="footerNavbarConversion">
                            Partner with Us
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            float: "left",
            backgroundColor: "#287CBC",
            padding: "3px 0px",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <p
                  style={{
                    margin: "0px",
                    color: "#fff",
                    fontWeight: "400",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  Copyright © 2021 All Rights Reserved | Tripwerkz | Singapore
                  Travel Licence TA03393
                </p>
              </div>
              <div className="col-md-4">
                <div className="footerCareers">
                  <li>
                    <Link
                      href="https://www.tripwerkz.com/privacy-policy/"
                 
                    >
                      PRIVACY
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.tripwerkz.com/careers/"
                  
                    >
                      CAREERS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.tripwerkz.com/contact-us/"
                  
                    >
                      CONTACT US
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
