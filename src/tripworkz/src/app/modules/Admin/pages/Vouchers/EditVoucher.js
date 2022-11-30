import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import * as actions from "../../redux/adminActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";
import Moment from 'moment';

const useStyles = makeStyles({
  cardContainer: {
    width: "80%",
    margin: "auto",
  },
  textHead: {
    color: "#287CBC",
    fontSize: '16px',
      fontWeight: '500',
  },
  mainContainer: {
    borderRadius: 20,
  },
  MainHeader: {     backgroundColor: "#F5F5F5", 
  padding: "10px 20px", 
  display:'flex',
  justifyContent:"space-between",
  alignItems:'center',
  width:'100%' },
  backButton:{
    marginRight: '11px',
    background: '#287CBC',
    border: '1px solid #287CBC',
    borderRadius: '30px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '400',
    padding: '9px 30px'
  },
  MainTitle: {
    fontWeight: "600",
    fontSize: "18px",
    color: "#287CBC"
  },
  SubTitle: {
    fontWeight: "400",
    fontSize: "13px",
    marginTop: "1px"
  },
  inValid:{
    backgroundPosition:"right calc(0.2em + 1.3rem) center !important " 
  }
});

const EditVoucher = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const { t } = useTranslation();
  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });
  
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState({ isError: false, value: "", msg: "" });
  const [details, setDetails] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [discountType, setDiscountType] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [discount, setDiscount] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [price, setPrice] = useState({ isError: false, value: "", msg: "" });
  const [validTill, setValidTill] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [imageFile, setImageFile] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [imgBase64, setImgBase64] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  

  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(actions.getSelectedVoucherById(id))
        .then((response) => {
          const date = response.expiron.slice(0, 10);
          setTitle({ ...title, value: response.title });
          setDetails({ ...details, value: response.details });
          setDiscountType({
            ...discountType,
            value: response.discountType,
          });
          setDiscount({ ...discount, value: response.discountValue });
          setValidTill({ ...validTill, value: date });
          setPrice({ ...price, value: response.price });
          setImageFile({...imageFile, value: response.voucherImageName})
          setImgBase64({...imgBase64, value:response.voucherImage})
        })
        .catch((error) => {
        });
    }
  }, []);

  const onEditSubmit = () => {
    let isOK = true;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    if (!title.value) {
      setTitle({ ...title, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }
    if(title.value.length > 50){
      setAlertStatus({
        status: true,
        message: `${t(`Title should not exceed 50 characters.`)}`,
        type: "error",
      })
      isOK = false;
    }
    if (!details.value) {
      setDetails({ ...details, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }
    if(details.value.length > 150){
      setAlertStatus({
        status: true,
        message: `${t(`Description should not exceed 150 characters.`)}`,
        type: "error",
      })
      isOK = false;
    }
    if (!discountType.value || discountType.value === "selected") {
      setDiscountType({
        ...discountType,
        isError: true,
        msg: `${t(`Please select discount type!`)}`,
      });
      isOK = false;
    }
    if (!discount.value) {
      setDiscount({
        ...discount,
        isError: true,
        msg: `${t(`This is required field!`)}`,
      });
      isOK = false;
    }
    if(discountType.value === "InPercent" && (parseInt(discount.value) > 100 || parseFloat(discount.value) <=0)){
      setDiscount({
        ...discount,
        isError: true,
        msg: `${t(`Invalid Percent Value.`)}`,
      });
      isOK = false;
    }
    if(discountType.value === "InAmount" && parseFloat(discount.value) <=0){
      setDiscount({
        ...discount,
        isError: true,
        msg: `${t(`Invalid Amount Value.`)}`,
      });
      isOK = false;
    }
    if (!validTill.value) {
      setValidTill({
        ...validTill,
        isError: true,
        msg: `${t(`This is required field!`)}`,
      });
      isOK = false;
    }
    if (!price.value) {
      setPrice({ ...price, isError: true, msg: `${t(`This is required field!`)}` });
      isOK = false;
    }
    if (price.value && parseFloat(price.value) <= 0 ) {
      setPrice({ ...price, isError: true, msg:  `${t(`Invalid Price.`)}`});
      isOK = false;
    }
    if (title.value === '') {
      setAlertStatus({
        status: true,
        message:  `${t(`Please Enter title`)}` ,
        type: "error",
      })
      isOK = false;
    } else if(details.value === ''){
      setAlertStatus({
        status: true,
        message:  `${t(`Please Enter Description`)}`,
        type: "error",
      })
      isOK = false;
    } else if(discountType.value === ''){
      setAlertStatus({
        status: true,
        message: `${t(`Please select discount type!`)}`,
        type: "error",
      })
      isOK = false;
    } else if(discount.value === ''){
      setAlertStatus({
        status: true,
        message: `${t(`Please select discount percentage`)}`,
        type: "error",
      })
      isOK = false;
    }else if( parseFloat(discount.value) <= 0){
      setAlertStatus({
        status: true,
        message: `${t(`Invalid discount amount`)}`,
        type: "error",
      })
      isOK = false;
    } else if(price.value === ''){
      setAlertStatus({
        status: true,
        message:  `${t(`Please select price`)}`,
        type: "error",
      })
      isOK = false;
    } else if( parseFloat(price.value) <= 0){
      setAlertStatus({
        status: true,
        message: `${t(`Invalid Price.`)}`,
        type: "error",
      })
      isOK = false;
    } else if(validTill.value === ''){
      setAlertStatus({
        status: true,
        message: `${t(`Please select valid date`)}`,
        type: "error",
      })
      isOK = false;
    }else if(validTill.value <= Moment(new Date()).format('YYYY-MM-DD')){
      setAlertStatus({
        status: true,
        message: `${t(`Please select valid expiry date`)}`,
        type: "error",
      })
      isOK = false;
    }
     else if (!imageFile.value || !imgBase64.value) {
      setAlertStatus({
        status: true,
        message: `${t(`Please select Image file.`)}`,
        type: "error",
      })
      isOK = false;
    }
    if(imgBase64.value){
      let strings = imgBase64.value.split(",");
      switch (strings[0]) {//check image's extension
          case "data:image/jpeg;base64":
            
              break;
          case "data:image/png;base64":
            
              break;
          case "data:image/jpg;base64":
          
                  break;        
          default:
            isOK = false;
            setAlertStatus({
              status: true,
              message: `${t(`Please select proper file type`)}`,
              type: "error",
            });
            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000);
              break;
      }
    }
    
    if (isOK) {
    
      let body = {
        id: parseInt(id),
        title: title.value,
        details: details.value,
        discountType: discountType.value,
        discountValue: parseInt(discount.value) ,
        expiron: validTill.value,
        price: parseInt(price.value),
        voucherImage: imgBase64.value,
        voucherImageName: imageFile.value
      }
      setLoader(true);
      dispatch(actions.editVoucher(body))
        .then((response) => {    
          if (response === "Voucher updated successfully") {
            setLoader(false);
            setAlertStatus({
              status: true,
              message:response,
              type: "success",
            });
            setTimeout(function() {
              history.push("/admin/vouchers/list");
            }, 5000);
            
          } else {
            setAlertStatus({
              status: true,
              message:
                response.response !== undefined
                  ? response.response.data
                  : `${t(`Please enter fields correctly`)}`,
              type: "error",
            });
            setTimeout(function() {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay
            setLoader(false);
            return null;
          }
        })
        .catch((error) => {
          setAlertStatus({
            status: true,
            message: error,
            type: "error",
          });
          setTimeout(function() {
            setAlertStatus({ status: false, message: "", type: "" });
          }, 5000); //5 Second delay
          setLoader(false);
        });
    }
    else {
      window.scrollTo({
        top:0,
        behavior: 'smooth'
      })
      setTimeout(function() {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 2000); //3 Second delay
    }
  };

  return (
    <div className={`card card-custom `}>
      {/* begin::Header */}
      {/* <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className={"card-label font-weight-bolder"}>
            {t(`Vouchers`)}
            </span>
        </h3>
      </div> */}
      <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`Vouchers`)}
            </span>
            <Link to="/admin/vouchers/list">
            <button className={classes.backButton}>{t(`Back`)}</button>
            </Link>
            {/* <span classes={classes.SubTitle}>{t(`Use your credits for your future purchases`)}</span> */}
          </div>
      {/* end::Header */}

      {/* begin::Body */}
      {alertStatus.status && (
            <div className="row mt-10 ml-8 mr-8 ">
              <div className="col-md-12">
                <Alert severity={alertStatus.type} >
                  {alertStatus.message}
                </Alert>
              </div>
            </div>
          )}
      <Paper className="ml-10 mr-10 mb-20 mt-10 pl-5 rounded-lg" elevation={5}>
        <div className="card-header border-0 py-5 mt-5">
          <h3 className="card-title align-items-bi flex-column">
            <span className={("card-label", classes.textHead)}>
            {t(`Edit Voucher`)}    
            </span>
          </h3>
        </div>
        <div className={("card-body py-0", classes.cardContainer)}>
          
          <div className="row mb-1 ">
            <div className="col-md-8">
              <Form.Group controlId="titleBasic">
                <Form.Label style={{ color: "#287CBC" }}> {t(`Title`)}</Form.Label>
                <Form.Control
                  type="text"
                  className="rounded-shape"
                  value={title.value}
                  onChange={(e) =>
                    setTitle({
                      value: e.target.value,
                      isError: e.target.value === "",
                      msg:
                        e.target.value === "" ? `${t(`This is required field!`)}` : "",
                    })
                  }
                  isInvalid={title.isError}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-md-8">
              <Form.Group controlId="detailsBasic">
                <Form.Label style={{ color: "#287CBC" }}>{t(`Description`)}</Form.Label>
                <Form.Control
                  type="text"
                  className="rounded-shape"
                  value={details.value}
                  onChange={(e) =>
                    setDetails({
                      value: e.target.value,
                      isError: e.target.value === "",
                      msg:
                        e.target.value === "" ? `${t(`This is required field!`)}` : "",
                    })
                  }
                  isInvalid={details.isError}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-1 ">
            <div className="col-md-8">
              <Form.Group controlId="discountTypeBasic">
                <Form.Label style={{ color: "#287CBC" }}>{t(`Discount Type`)}</Form.Label>
                <Form.Control
                  as="select"
                  className={["rounded-shape",classes.inValid].join(' ')}
                  value={discountType.value}
                  onChange={(e) =>
                    setDiscountType({
                      value: e.target.value,
                      isError: e.target.value === "",
                      msg:
                        e.target.value === "" ? `${t(`This is required field!`)}` : "",
                    })
                  }
                  isInvalid={discountType.isError}
                >
                  <option value="">{t(`Select`)}</option>
                  <option value="InPercent">{t(`Percentage`)}</option>
                  <option value="InAmount">{t(`Amount`)}</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          {discountType.value && discountType.value !== "selected" ? (
            <div className="row mb-1 ">
              <div className="col-md-8">
                <Form.Group controlId="discountBasic">
                  <Form.Label style={{ color: "#287CBC" }}>
                  {`Discount ${
                      discountType.value !== ""
                        ? discountType.value === "InPercent"? "(%)":"(Amount)"
                        : null
                    }`}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    className="rounded-shape"
                    value={discount.value}
                    onChange={(e) =>
                      setDiscount({
                        value: parseFloat(e.target.value),
                        isError: e.target.value === "",
                        msg:
                          e.target.value === ""
                            ? `${t(`This is required field!`)}`
                            : "",
                      })
                    }
                    isInvalid={discount.isError}
                  />
                </Form.Group>
              </div>
            </div>
          ) : null}

          <div className="row mb-1 ">
            <div className="col-md-8">
              <Form.Group controlId="priceBasic">
                <Form.Label style={{ color: "#287CBC" }}>{t(`Price`)}</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  className="rounded-shape"
                  value={price.value}
                  onChange={(e) =>
                    setPrice({
                      value: parseFloat(e.target.value),
                      isError: e.target.value === "",
                      msg:
                        e.target.value === "" ? `${t(`This is required field!`)}` : "",
                    })
                  }
                  isInvalid={price.isError}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-1 ">
            <div className="col-md-8">
              <Form.Group controlId="pointsBasic">
                <Form.Label style={{ color: "#287CBC" }}>
                   {t(`Valid Till`)}
                </Form.Label>
                <Form.Control
                  type="date"
                  className="rounded-shape"
                  min={new Date().toISOString().split("T")[0]}
                  value={validTill.value}
                  onChange={(e) => {
                    setValidTill({
                      value: e.target.value,
                      isError: e.target.value === "",
                      msg:
                        e.target.value === "" ? `${t(`This is required field!`)}` : "",
                    });
                  }}
                  isInvalid={validTill.isError}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-1 ">
            <div className="col-md-8">
              <Form.Group controlId="pointsBasic">
                <Form.Label style={{ color: "#287CBC" }}>
                  
                  {t(`Upload Image`)}
                </Form.Label>
                <div class="custom-file ">
                  <input
                    style={{ borderRadius: 50 }}
                    type="file"
                    accept='image/*'
                    class="custom-file-input "
                    id="customFile"
                    onChange={ async (e) => {
                      if(e.target.files[0]){
                        setImageFile({
                          isError: false,
                          value: e.target.files[0].name,
                          msg: "",
                        })
                        let base64 = await getBase64(e.target.files[0]);
                        setImgBase64({
                          isError: false,
                          value: base64,
                          msg: "",
                        })
                      }
                    }}
                  />
                  <label
                    class="custom-file-label inputFile"
                    for="customFile"
                    style={{
                      borderRadius: 20,
                    }}
                  >
                    {imageFile.value ? imageFile.value : "Choose file"}
                  </label>
                </div>
              </Form.Group>
            </div>
          </div>

          <div className="row mb-10 ">
            <div className="col-md-4">
              <button
                className="loginBtn"
                onClick={onEditSubmit}
                disabled={loader}
              >
                {loader ? (
                  <span className="ml-3 spinner spinner-white"></span>
                ) : (
                
                  `${t(`Save`)}`
                )}
              </button>
            </div>

            <div className="col-md-4">
              <Link to="/admin/vouchers/list">
                <button className="loginBtn">{t(`Cancel`)}</button>
              </Link>
            </div>
          </div>
        </div>
      </Paper>
      {/* end::Body */}
    </div>
  );
};

export default EditVoucher;
