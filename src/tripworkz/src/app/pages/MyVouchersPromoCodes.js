import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import { UseVoucherModal } from "../../_metronic/layout/components/voucher/UseVoucherModal";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  MyVocherSelection: { width: "100%", float: "left" },
  pricevocher: { width: "100%", position: "relative", height: "100%", maxHeight: '130px', padding: '5px' },
  giftVocher: { width: "100%", height: "100%", maxWidth: '90%' ,minHeight:'120px' },
  borderIncommonvocher: { border: "1px solid #ccc" , minHeight:'132.5px' },
  MyDiscouter: { position: "absolute", top: "10px", color: "#fff" },
  UseInformation: {
    backgroundColor: "#f89528",
    padding: "5px 20px",
    border: "none",
    color: "#fff",
  },
  noDataFound: {
    textAlign: 'center',
    padding: '10px',
    fontSize: '20px',
    width: '100%',
    color: "#287CBC",
    fontWeight: "500"
  },
  mainContaier: {
    padding: "25px 25px 25px 25px"
  },
  notFound: {
    color: "#B5B5C3",
    fontWeight: "400",
    fontSize: "16px",
    padding: "25px",
    textAlign: "center",
  },
}));

const firstIndex = 0;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export const MyVouchersPromoCodes = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = React.useState(8);
  const [pendingPageSize, setPendingPageSize] = React.useState(8);
  const [page, setPage] = React.useState(1);
  const [pendingPage, setPendingPage] = React.useState(1);
  const [openModal, setOpenModal] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [selectedTab, setSelctedTab] = React.useState(0)
  const[loader,setLoader]=React.useState(false)
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth, main } = useSelector((state) => state);
  const [data, setData] = React.useState(
    main.myVouchers && main.myVouchers.slice(firstIndex, pageSize)
  );
  const [pendingVoucher, setPendingVoucher] = React.useState(
    main.myPendingVouchers && main.myPendingVouchers.slice(firstIndex, pendingPageSize)
  );
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (auth.user) {
      setLoader(true)
      dispatch(actions.getMyVouchers(headers, { userid: auth.user.userId })).then((res)=>{
        setLoader(false)
      });
    }
  }, []);
  useEffect(() => {
    setData(main.myVouchers && main.myVouchers.slice(0, pageSize));
  }, [pageSize, main.myVouchers]);

  useEffect(() => {
    setPendingVoucher(main.myPendingVouchers && main.myPendingVouchers.slice(0, pendingPageSize));
  }, [pendingPageSize, main.myPendingVouchers]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setData(
      main.myVouchers.slice(
        firstIndex + pageSize * (value - 1),
        pageSize * value
      )
    );
  };
  const handlePendingPageChange = (event, value) => {
    setPendingPage(value);
    setData(
      main.myPendingVouchers.slice(
        firstIndex + pendingPageSize * (value - 1),
        pendingPageSize * value
      )
    );
  };

  const headers = {
    Authorization: `Bearer ` + auth.authToken,
    "Content-Type": "application/json",
  };

  const evaluateDate = (e) => {
    let options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };

  const handleUseVoucher = (voucher) => {
    setOpenModal(true)
    setSelectedVoucher(voucher)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedVoucher(null)
  }

  return (
    <div className={`card card-custom card-stretch`}>
      <div style={{ backgroundColor: "#F5F5F5", padding: "10px 20px" }}>
        <span style={{
          fontWeight: "600",
          fontSize: "18px",
          color: "#287CBC"
        }}>
          {t(`My Vouchers & Promo Codes`)}
        </span><br />
        <span style={{
          fontWeight: "400",
          fontSize: "13px"
        }}>{t(`Use your vouchers for your future purchases`)}</span>
      </div>
      <section className={classes.MyVocherSelection}>
        {/* <div className="container"> */}
        <div className={["container", classes.mainContaier].join(' ')}>
          <div className="row justify-content-between " style={{ backgroundColor: "#F5F5F5", borderBottom: "3px solid #287CBC", width: "100%", margin: "0px" }}  >
            <div >
              <span className={selectedTab === 0 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setSelctedTab(0)}>{t(`Available`)}</span>
            </div>
            <div >
              <span className={selectedTab === 1 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setSelctedTab(1)}>
                {t(`Redeemed/Expired`)}</span>
            </div>
          </div>
        </div>

        {selectedTab === 0 && <>
          <UseVoucherModal openModal={openModal} closeModal={handleCloseModal} voucher={selectedVoucher !== null ? selectedVoucher : {}}></UseVoucherModal>
          <div className="row mr-1 ml-1 ">
            {data
              ? data.map((item) => (
                <div className="col-md-6 mb-10">
                  <div className={"pt-0 pl-3 pr-3"}>
                    <div className={classes.borderIncommonvocher}>
                      <div class="row">
                        <div class="col-md-6" style={{ paddingRight: '0px' }}>
                          <div className={classes.pricevocher}>
                            <img
                              src={item.voucherImage.length >= 100 ? item.voucherImage : "media/Tripwerkzpath/Vouchers-03.png"}
                              className={classes.giftVocher}
                            />
                            {/* <div className={classes.MyDiscouter}>
                                      <h3 className={"pl-5 pt-5"}>{item.title}</h3>
                                      src={item.voucherimage.length>=50?item.voucherimage:"media/Tripwerkzpath/Vouchers-03.png"}
                                    </div> */}
                          </div>
                        </div>
                        <div class="col-md-6" style={{ paddingLeft: "0px" }}>
                          <p className={"pt-1 pl-1 pr-1"}>
                            <b>{item.title}</b>
                          </p>
                          <p className={"pt-0 pl-1 pr-1"}>
                            <b>Discount: {item.discountType === "InPercent"
                              ? item.discountValue + "%"
                              : item.discountValue}</b>
                          </p>
                          <p
                            className={"pt-0 pl-1 pr-1"}
                            style={{ fontSize: "11px" }}
                          >
                            {t(`Valid till`)}: {evaluateDate(item.expiron)}
                          </p>
                          <div
                            className={"pt-0 pr-1 pb-1"}
                            style={{ textAlign: "right" }}
                          >
                            <button className={classes.UseInformation} onClick={() => handleUseVoucher(item)}>
                              {t(`Use`)}
                            </button>
                          </div>
                        </div>
                        <div class="col-md-6"></div>
                      </div>
                    </div>
                  </div>
                </div>

              ))
              : null}


          </div>
          {main.myVouchers.length > 0 && main.myVouchers !== null ? <>
            <div className="row mb-2">
              <div className="col-md-12 d-flex justify-content-center">
                <Pagination
                  size="large"
                  variant="outlined"
                  color="secondary"
                  className="primary"
                  count={Math.ceil(
                    main.myVouchers && main.myVouchers.length / pageSize
                  )}
                  page={page}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </>:loader?<div className={classes.noDataFound}>{t(`Please wait`)}...</div>:<div className="text-center p-5"> <span className={classes.notFound}>{t(`No Record Found`)}</span></div>}
        </>}
        {selectedTab === 1 && <>

          <div className="row  ml-1 mr-1">
            {pendingVoucher
              ? pendingVoucher.map((item) => (
                <div className="col-md-6 mb-10">
                  <div className={"pt-0 pl-3 pr-3"}>
                    <div className={classes.borderIncommonvocher}>
                      <div class="row">
                        <div class="col-md-6" style={{ paddingRight: "0px" }}>
                          <div className={classes.pricevocher}>
                            <img
                              src={item.voucherImage.length >= 100 ? item.voucherImage : "media/Tripwerkzpath/Vouchers-03.png"}
                              className={classes.giftVocher}
                            />


                            {/* <div className={classes.MyDiscouter}>
                                    <h3 className={"pl-5 pt-5"}>{item.title}</h3>
                                  </div> */}
                          </div>
                        </div>
                        <div class="col-md-6" style={{ paddingLeft: "0px" }}>
                          <p className={"pt-1 pl-1 pr-1"}>
                            <b>{item.title}</b>
                          </p>
                          <p className={"pt-0 pl-1 pr-1"}>
                            <b>{t(`Discount`)}: {item.discountType === "InPercent"
                              ? item.discountValue + "%"
                              : item.discountValue}</b>
                          </p>
                          <p
                            className={"pt-0 pl-1 pr-1"}
                            style={{ fontSize: "11px" }}
                          >
                            {t(`Valid till`)}: {evaluateDate(item.expiron)}
                          </p>
                                  
                        </div>
                        <div class="col-md-6"></div>
                      </div>
                    </div>
                  </div>
                </div>

              ))
              : null}

          </div>
          {main.myPendingVouchers !== null && main.myPendingVouchers.length > 0 ?
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <Pagination
                  size="large"
                  variant="outlined"
                  color="secondary"
                  className="primary"
                  count={Math.ceil(
                    main.myPendingVouchers && main.myPendingVouchers.length / pendingPageSize
                  )}
                  page={pendingPage}
                  onChange={handlePendingPageChange}
                />
              </div>
            </div> :loader?<div className={classes.noDataFound}>{t(`Please wait`)}...</div>:<div className="text-center p-5"> <span className={classes.notFound}>{t(`No Record Found`)}</span></div>}

          

        </>}
        {/* {
          main.myPendingVouchers === null || data === null ? <div className={classes.notFound}>{t(`No vouchers found`)}.</div> : null
        } */}
        {/* </div> */}
      </section>
    </div>
  );
};
