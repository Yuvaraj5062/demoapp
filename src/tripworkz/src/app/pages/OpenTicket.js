import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/_redux/mainActions";
import Alert from '@material-ui/lab/Alert';
import { Button } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
import './Css/openticket.css'
import { Cross, ShowHistory } from '../../_metronic/_partials/controls/SVGIcon';
import { useHistory } from "react-router";
import {

  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,

} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({

  inValid: {
    backgroundPosition: "right calc(0.2em + 1.3rem) center !important ",
    fontSize: "14px",
    fontWeight: "400",
  },
  textField: {
    fontSize: "14px",
    fontWeight: "400",
  },

  tableHead: { fontWeight: "500", fontSize: "14px", marginTop: "3px" },
  tableData: { fontWeight: "400", fontSize: "12px" },
  mainTable: { width: "100%" },

  mainContaier: {
    padding: "25px 0px 0px 0px"
  },

  tableTd1: {
    maxWidth: '100px',
    textAlign: 'center',
    fontSize: "13px",
    fontWeight: "400",
  },
  tableTd: {
    maxWidth: '150px',
    textAlign: 'start',
    fontSize: "13px",
    fontWeight: "400",
  },
  table: {
    width: "100%",
    // margin: "auto",
    // borderRadius: 20,
  },
  tableHead: {
    color: "#287CBC",
    textAlign: 'start',
    fontSize: "14px",
    fontWeight: "400",

  },
  tableHead1: {
    color: "#287CBC",
    textAlign: 'center',
    fontSize: "14px",
    fontWeight: "400",
  },
  parentTable: { width: "100%", margin: "0px auto 0px auto" },
  userInput: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#3F4254",
  },
  error: {
    fontSize: "16px",
    fontWeight: "400",
    color: "#B5B5C3",
  }
}))




const firstIndex = 0;
export default function OpenTicket() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { auth, main } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [adminReply, setAdminReply] = useState([]);
  const [clientReply, setClientReply] = useState([]);

  const [loader, setLoader] = useState(true)
  const history = useHistory();
  let userId = auth.user.useR_ID
  const [complaintMsg, setComplaintMsg] = useState({
    isError: false, value: "", msg: ""
  });
  const [category, setCategory] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [subCategory, setSubCategory] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });


  const [selectedTab, setSelctedTab] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(2);
  const [page, setPage] = React.useState(1);
  const [myQueryList, setMyQueryList] = useState([]);
  const [pendingQueries, setPendingQueries] = useState([]);
  const [doneQueries, setDoneQueries] = useState([]);
  const [categorylist, setCategoryList] = useState([]);
  const [subCategorylist, setSubCategoryList] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [historyType, setHistoryType] = useState(true);
  const [allQueries, setAllQueries] = React.useState(
    myQueryList && myQueryList.slice(firstIndex, pageSize)
  );

  const [updatedPendingQueries, setupdatedPendingQueries] = React.useState(
    pendingQueries.length > 0 && pendingQueries.slice(firstIndex, pageSize)
  );
  const [updatedDoneQueries, setUpdatedDoneQueries] = React.useState(
    doneQueries.length > 0 && doneQueries.slice(firstIndex, pageSize)
  );

  const headers = {
    Authorization: `Bearer ` + auth.authToken,
    "Content-Type": "application/json",
  };




  const getApiCall = () => {
    let userId = auth.user.userId
    dispatch(actions.getAllQueris(userId, "Pending", headers))
      .then((response) => {
        if (response.responseCode === 200) {
          setMyQueryList(response.responseData);
        }

      });

    dispatch(actions.getPendingQueriesList(userId, "Open"))
      .then((response) => {

        setPendingQueries(response.responseData);

      });

    dispatch(actions.getDoneQueriesList(userId, "Close"))
      .then((response) => {
        setDoneQueries(response.responseData);
      });

    dispatch(actions.getAllCategory())
      .then((response) => {
        setCategoryList(response);

      });

  }


  useEffect(() => {
    if (auth.user) {
      getApiCall()
    }
  }, []);
  useEffect(() => {
    dispatch(actions.getAllSubCategory(category.value))
      .then((response) => {
        setSubCategoryList(response);
      });
  }, [category.value]);

  useEffect(() => {
    setAllQueries(myQueryList && myQueryList.slice(0, pageSize));
  }, [pageSize, myQueryList]);


  useEffect(() => {
    setupdatedPendingQueries(pendingQueries.length > 0 && pendingQueries.slice(0, pageSize));
  }, [pageSize, pendingQueries]);
  useEffect(() => {
    setUpdatedDoneQueries(doneQueries.length > 0 && doneQueries.slice(0, pageSize));
  }, [pageSize, doneQueries]);


  useEffect(() => {
    let userId = auth.user.userId
    dispatch(actions.getPendingQueriesList(userId, "Open"))
      .then((response) => {
        setupdatedPendingQueries(
          response.responseData.slice(firstIndex, pageSize)
        );

        setPendingQueries(response.responseData);
      });
    dispatch(actions.getDoneQueriesList(userId, "Close"))
      .then((response) => {

        setUpdatedDoneQueries(
          response.responseData.slice(firstIndex, pageSize)
        );
        setDoneQueries(response.responseData)

      });
    dispatch(actions.getAllQueris(userId, "Pending", headers))
      .then((response) => {
        if (response.responseCode === 200) {
          setMyQueryList(response.responseData);
        }
      });

  }, [open]);






  const myFunc = (e) => {
    let options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };


  const onAddIssue = () => {
    let isOK = true;

    if (!category.value) {
      setCategory({ isError: true, value: "", msg:  `${t(`Please Select Category`)}` });
      setAlertStatus({
        status: true,
        message: `${t(`Please Select Category`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }
    if (!subCategory.value) {
      setSubCategory({ isError: true, value: "", msg: `${t(`Please select sub-category`)}` });
      setAlertStatus({
        status: true,
        message: `${t(`Please select sub-category`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }
    if (!complaintMsg.value) {
      setComplaintMsg({ isError: true, value: "", msg: "" });
      setAlertStatus({
        status: true,
        message: `${t(`Please enter message`)}`,
        type: "error",

      });
      isOK = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }
    if (isOK) {

      let body = {
        userId: auth.user.userId,
        queryDesc: complaintMsg.value,
        category: category.value,
        subCategory: subCategory.value
      };

      dispatch(actions.addTicketQuery(body, headers))
        .then((response) => {
          if (response.status === 200) {
            getApiCall()
            setComplaintMsg({ isError: false, value: "", msg: "" });
            setCategory({ isError: false, value: "", msg: "" });
            setSubCategory({ isError: false, value: "", msg: "" })
            setAlertStatus({
              status: true,
              message: `${t(`Ticket added successfully`)}`,
              type: "success",
            });

            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay

            return null;
          } else {
            setAlertStatus({
              status: true,
              message: `${t(`Something went wrong`)}`,
              type: "error",
            });

            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay

            return null;
          }
        })
        .catch((error) => {
          setAlertStatus({
            active: true,
            variant: "error",
            msg: `${t(`Something went wrong`)}`,
          });

          setTimeout(function () {
            setAlertStatus({ status: false, message: "", type: "" });
          }, 5000); //5 Second delay

          return null;
        });
    }
  };


  const handleCancel = () => {
    setComplaintMsg({ isError: false, value: "", msg: "" });
    setCategory({ isError: false, value: "", msg: "" });
    setSubCategory({ isError: false, value: "", msg: "" })

  };

  //All queries pagination handler 
  const handleAllPageChange = (event, value) => {
    setPage(value);
    setAllQueries(
      myQueryList.slice(
        firstIndex + pageSize * (value - 1),
        pageSize * value
      )
    );
  };

  //Pending queries pagination handler 
  const handlePendingPageChange = (event, value) => {
    setPage(value);
    setupdatedPendingQueries(
      pendingQueries.slice(
        firstIndex + pageSize * (value - 1),
        pageSize * value
      )
    );

  };

  //Completed queries pagination handler 
  const handleDonePageChange = (event, value) => {
    setPage(value);
    setUpdatedDoneQueries(
      doneQueries.slice(
        firstIndex + pageSize * (value - 1),
        pageSize * value
      )
    );


  };
  useEffect(() => {
    setAdminReply(main.adminReply)
  }, [main.adminReply]);
  useEffect(() => {
    setClientReply(main.clientReply)
  }, [main.clientReply]);

  const handelOpen = (item, btext) => {
    setHistoryData(item)
    setHistoryType(btext)
    setOpen(true)
    dispatch(actions.getAllHistory(item.id))
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleClsoeTicket = () => {
    const headers = {
      Authorization: `Bearer ` + auth.authToken,
      "Content-Type": "application/json",
    };
    let body = {
      id: historyData.id
    }

    dispatch(actions.CloseTicket(body, headers))
      .then((response) => {
        setAlertStatus({
          status: true,
          message: "Ticket Close Successfully",
          type: "success",
        });
        dispatch(actions.getDoneQueriesList(userId, "Close"))
        dispatch(actions.getPendingQueriesList(userId, "Pending"))
          .then((response) => {
            setTimeout(() => {
              setAlertStatus({
                status: false,
                message: "",
                type: "",
              });
              handleClose()
            }, 5000)
          });
      }).catch((error) => {

        setAlertStatus({
          status: true,
          message: `${t(`Something went wrong`)}`,
          type: "error",
        });
        handleClose()
      });

  }

  const evaluateDate = (e) => {
    let options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };
  const handelReply = (data, type) => {
    history.push(
      `user/reply-query/${data.id}/${type}`
    )
  };

  return (
    <>
      <div className={`card card-custom card-stretch`}>

        <div className="openTicketHeader">
          <span className="openTicketHeaderText">
            {t(`Open Ticket`)}
          </span><br />
          <span className="openTicketHeaderSubText">{t(`Issue an open ticket to the customer services`)}</span>

        </div>
        {/* <div className="container"> */}
        <div className="row " style={{ marginTop: "25px" }}>
          <div className="container">
            <div >
              {
                alertStatus.status && <div className="row">
                  <Alert severity={alertStatus.type} style={{ width: '94%', margin: '0px auto 25px auto' }}>
                    {alertStatus.message}
                  </Alert>
                </div>
              }

              <div className={' pl-5 pr-5'}>
                <div className={`card card-custom card-stretch `}>
                  <div className="row ml-10">
                    <div className="col-md-8 mb-8 mt-5" >
                      <span className='registerText'>
                        {t(`Register Ticket Issue`)}
                      </span>
                    </div>
                  </div>
                  <div className="row ml-10">
                    <div className="col-md-3 pt-2">
                      <span className={classes.userInput}>
                        {t(`Category`)}
                      </span>
                    </div>
                    <div className="col-md-6 ">
                      <Form.Group controlId="Priority">
                        <Form.Control
                          as="select"
                          className={["rounded-shape", classes.inValid].join(' ')}
                          value={category.value}
                          onChange={(e) =>
                            setCategory({
                              value: e.target.value,
                              isError: e.target.value === "",
                              msg: e.target.value === "" ? `${t(`This is required field`)}` : "",
                            })
                          }
                          isInvalid={category.isError}
                        >
                          <option value="">
                            {t(`Select Category`)}
                          </option>
                          {categorylist.length >= 1 &&
                            categorylist.map((data) => (
                              <option value={data.categoryId}>{data.categoryName}</option>
                            ))}
                        </Form.Control>
                      </Form.Group>

                    </div>
                  </div>
                  <div className="row ml-10">
                    <div className="col-md-3 pt-2">
                      <span className={classes.userInput}>
                        {t(`Sub-Category`)}

                      </span>
                    </div>
                    <div className="col-md-6 ">
                      <Form.Group controlId="Priority">
                        <Form.Control
                          as="select"
                          className={["rounded-shape", classes.inValid].join(' ')}
                          value={subCategory.value}
                          disabled={category.value ? false : true}
                          onChange={(e) =>
                            setSubCategory({
                              value: e.target.value,
                              isError: e.target.value === "",
                              msg: e.target.value === "" ? `${t(`This is required field`)}` : "",
                            })
                          }
                          isInvalid={subCategory.isError}
                        >
                          {category.value && subCategorylist.length >= 1 &&
                            <><option value="">
                              {t(`Select Sub-Category`)}
                            </option>
                              {subCategorylist.map((data) => (
                                <option value={data.subCategoryId}>{data.subCategoryName}</option>

                              ))}
                            </>}

                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row ml-10">
                    <div className="col-md-3 pt-2">
                      <span className={classes.userInput}>
                        {t(`Ticket Description`)}

                      </span>
                    </div>
                    <div className="col-md-6 ">
                      <Form.Group controlId="formIssue">
                        <Form.Control
                          as="textarea" rows={4}
                          placeholder={`${t(`Enter your ticket description`)}`}
                          value={complaintMsg.value}
                          className={classes.textField}
                          onChange={(e) =>
                            setComplaintMsg({
                              value: e.target.value.trimLeft(),
                              isError: e.target.value === "",
                              msg:
                                e.target.value === "" ? `${t(`This is required field`)}` : "",
                            })
                          }
                          isInvalid={complaintMsg.isError}

                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row ml-10 mb-5">
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                      <Button style={{ backgroundColor: "#287CBC", fontWeight: "400", fontSize: "13px" }}
                        className="  w-100 rounded-pill"
                        onClick={onAddIssue}
                      >
                        {t(`Submit`)}
                      </Button>
                    </div>
                    <div className="col-md-3">
                      <Button className="  w-100 rounded-pill"
                        style={{ backgroundColor: "#287CBC", fontWeight: "400", fontSize: "13px" }}
                        onClick={handleCancel}
                      >
                        {t(`Cancel`)}
                      </Button>
                    </div>

                  </div>
                </div>
                <div className={["container", classes.mainContaier].join(' ')}>
                  <div className="row   justify-content-between " style={{ backgroundColor: "#F5F5F5", borderBottom: "3px solid #287CBC", width: "100%", margin: "0px" }} >
                    <div >
                      <span className={selectedTab === 0 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setSelctedTab(0)}>{t(`Open Tickets`)}</span>
                    </div>
                    <div >
                      <span className={selectedTab === 1 ? "openTicketTabActive" : "openTicketTab"} onClick={() => setSelctedTab(1)}>
                        {t(`In Progress`)}</span>
                    </div>
                    <div>
                      <span className={selectedTab === 2 ? "openTicketTabActive" : "openTicketTab"} onClick={() => setSelctedTab(2)}>
                        {t(`Close Tickets`)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={classes.parentTable}>
                  {selectedTab === 0 &&
                    <>
                      <TableContainer className={classes.table} >
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableHead1} align="center">
                                {t(`Category`)}
                              </TableCell>
                              <TableCell className={classes.tableHead} align="center">
                                {t(`Sub-Category`)}
                              </TableCell>
                              <TableCell className={classes.tableHead} align="center">
                                {t(`Ticket Description`)}
                              </TableCell>
                              <TableCell className={classes.tableHead1} align="center">
                                {t(`Show History`)}
                              </TableCell>

                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {/* We have to map the data here */}

                            {myQueryList.map((data, index) => (
                              <TableRow key={data.id}>
                                <TableCell align="center" className={classes.tableTd1}>{data.category}</TableCell>
                                <TableCell align="center" className={classes.tableTd}>{data.subCategory}</TableCell>
                                <TableCell align="center" className={classes.tableTd}>{data.queryDesc}</TableCell>
                                <TableCell align="center" className={classes.tableTd1}><ShowHistory fillColor="#287CBC" handleOpen={() => handelReply(data, "close-ticket")} /></TableCell>
                              </TableRow>

                            ))}
                          </TableBody>
                        </Table>

                      </TableContainer>
                      {myQueryList.length === 0 ?
                        <div className="text-center p-5"><span className={classes.error}>{t(`No Record Found`)}</span></div>
                        :
                        <div className="row pt-5 pb-4">
                          <div className="col-md-12 d-flex justify-content-center">
                            <Pagination
                              size="large"
                              variant="outlined"
                              color="secondary"
                              className="primary"
                              count={Math.ceil(
                                myQueryList && myQueryList.length / pageSize
                              )}
                              page={page}
                              onChange={handleAllPageChange}
                            />
                          </div>
                        </div>
                      }
                    </>
                  }
                </div>

                <div className={classes.parentTable}>
                  {selectedTab === 1 &&
                    <>
                      <TableContainer className={classes.table} >
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableHead1} align="center">
                                {t(`Category`)}
                              </TableCell>
                              <TableCell className={classes.tableHead} align="center">
                                {t(`Sub-Category`)}
                              </TableCell>
                              <TableCell className={classes.tableHead} align="center">
                                {t(`Ticket Description`)}
                              </TableCell>
                              <TableCell className={classes.tableHead1} align="center">
                                {t(`Show History`)}
                              </TableCell>

                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {/* We have to map the data here */}
                            {updatedPendingQueries.length > 0 ?
                              <>
                                {updatedPendingQueries.map((data, index) => (
                                  <TableRow key={data.id}>
                                    <TableCell align="center" className={classes.tableTd1}>{data.category}</TableCell>
                                    <TableCell align="center" className={classes.tableTd}>{data.subCategory}</TableCell>
                                    <TableCell align="center" className={classes.tableTd}>{data.queryDesc}</TableCell>
                                    <TableCell align="center" className={classes.tableTd1}><ShowHistory fillColor="#287CBC" handleOpen={() => handelReply(data, "close-ticket")} /></TableCell>
                                  </TableRow>

                                ))}</> : null}
                          </TableBody>
                        </Table>

                      </TableContainer>
                      {updatedPendingQueries.length > 0 ?
                        <div className="row pt-5 pb-4">
                          <div className="col-md-12 d-flex justify-content-center">
                            <Pagination
                              size="large"
                              variant="outlined"
                              color="secondary"
                              className="primary"
                              count={Math.ceil(
                                pendingQueries && pendingQueries.length / pageSize
                              )}
                              page={page}
                              onChange={handlePendingPageChange}
                            />
                          </div>
                        </div>
                        : <div className="text-center p-5">
                          <span className={classes.error}>{t(`No Record Found`)}</span></div>
                      }
                    </>
                  }
                </div>
                <div className={classes.parentTable}>
                  {selectedTab === 2 &&
                    <>
                      <TableContainer className={classes.table} >
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableHead1} align="center">
                                {t(`Category`)}
                              </TableCell>
                              <TableCell className={classes.tableHead} align="center">
                                {t(`Sub-Category`)}
                              </TableCell>
                              <TableCell className={classes.tableHead} align="center">
                                {t(`Ticket Description`)}
                              </TableCell>
                              <TableCell className={classes.tableHead1} align="center">
                                {t(`Show History`)}
                              </TableCell>

                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {/* We have to map the data here */}
                            {updatedDoneQueries.length > 0 ?
                              <>
                                {updatedDoneQueries.map((data, index) => (
                                  <TableRow key={data.id}>
                                    <TableCell align="center" className={classes.tableTd1}>{data.category}</TableCell>
                                    <TableCell align="center" className={classes.tableTd}>{data.subCategory}</TableCell>
                                    <TableCell align="center" className={classes.tableTd}>{data.queryDesc}</TableCell>
                                    <TableCell align="center" className={classes.tableTd1}><ShowHistory fillColor="#287CBC" handleOpen={() => handelReply(data, "open-ticket")} /></TableCell>
                                  </TableRow>

                                ))}</> : null}
                          </TableBody>
                        </Table>

                      </TableContainer>
                      {updatedDoneQueries.length > 0 ?

                        <div className="row pt-5 pb-4">
                          <div className="col-md-12 d-flex justify-content-center">
                            <Pagination
                              size="large"
                              variant="outlined"
                              color="secondary"
                              className="primary"
                              count={Math.ceil(
                                doneQueries && doneQueries.length / pageSize
                              )}
                              page={page}
                              onChange={handleDonePageChange}
                            />
                          </div>
                        </div> : <div className="text-center p-5">
                          <span className={classes.error}>{t(`No Record Found`)}</span></div>
                      }
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>

    </>
  );
}
