import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  UserLinksInformer: { position: "relative" },
  CopyLinked: { position: "absolute", top: "0px", right: "0px" },
  CopyBtnCreater: {
    backgroundColor: "#287CBC",
    border: "none",
    padding: "10px 20px",
    color: "#fff",
    borderRadius: "15px",
  },
  FaceBookInformer: {
    width: "100%",
    float: "left",
    padding: "10px 15px",
    backgroundColor: "#39579a",
    color: "#fff",
    border: "none",
  },
  Messenger: {
    width: "100%",
    float: "left",
    padding: "10px 15px",
    backgroundColor: "#0087ff",
    color: "#fff",
    border: "none",
  },
  Twitter: {
    width: "100%",
    float: "left",
    padding: "10px 15px",
    backgroundColor: "#059ff5",
    color: "#fff",
    border: "none",
  },
  SendMessagerInform: {
    width: "100%",
    backgroundColor: "#287CBC",
    border: "none",
    padding: "10px 15px",
    color: "#fff",
    borderRadius: 20,
  },
}));
export const ManageBookingInfo = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [bookNum, setBookNum] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  return (
    <div className={`card card-custom card-stretch`}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-xs-12">
            <div className={"pt-10 pl-5 pr-10"}>
              <h3>{t(`Booking Number`)}</h3>
            </div>
            <div className={"pt-5 pl-5 pr-10"}>
              <div className="row">
                <div className="col-md-9 col-sm-9 col-xs-9">
                  <div className={"pt-8 pl-0 pr-0 pb-3"}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        placeholder={t(`Enter Booking Number`)}
                        className="rounded-shape"
                        value={bookNum.value}
                        onChange={(e) =>
                          setBookNum({
                            value: e.target.value,
                            isError: e.target.value === "",
                            msg:
                              e.target.value === ""
                                ? `${t(`Please Valid Booking Number`)}`
                                : "",
                          })
                        }
                        isInvalid={bookNum.isError}
                      />
                      <span
                        style={{ color: "red", fontSize: 10, marginLeft: 5 }}
                      >
                        {bookNum.msg}
                      </span>
                    </Form.Group>
                  </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-3">
                  <div className={"pt-8 pl-0 pr-5 pb-3"}>
                    {bookNum.value.length > 0 ? (
                      <a
                        href={`https://agent.tripwerkz.com/payment/MyBooking.aspx?invoice-number=${bookNum.value}`}
                        target="_blank"
                      >
                        <button className={classes.SendMessagerInform}>
                          {t(`Go`)}
                        </button>
                      </a>
                    ) : (
                      <button className={classes.SendMessagerInform}> {t(`Go`)}</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
