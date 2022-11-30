import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/adminActions";
import { adminSlice } from '../../redux/adminSlice';

import CustomPagination from '../../../../../app/components/Pagination';
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { Cross, ShowHistory } from "../../../../../_metronic/_partials/controls/SVGIcon";

import './openticket.css'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,

} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

  pleaseWait: {
    textAlign: "center",
    padding: "10px",
    fontSize: "20px",
    width: "100%",
    color: "#287CBC",
    fontWeight: "500",
  },
  error:{fontSize: "16px",
  fontWeight: "400",
  color: "#B5B5C3",},
  QueryInformation: {
    border: "1px solid #cccccc",
    padding: "10px 20px",
    borderRadius: "10px",
    marginTop: "10px",
  },
  root: {
    // maxWidth: 345,
    borderRadius: 50,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

 
  
  PromotionsTicketTab: {
    fontWeight: "500", fontSize: "18px", color: "#636363", cursor: "pointer"
  },
  PromotionsMainHeader: { backgroundColor: "#F5F5F5", padding: "10px 20px" },
  PromotionsHeader: { fontWeight: "600", fontSize: "20px", color: "#287CBC", marginTop: "3px" },
  PopupCardTitle: { fontWeight: "500", fontSize: "18px", marginTop: "3px" },
  PopupTableTitle: { fontWeight: "500", fontSize: "16px", marginTop: "3px" },
  //tableHead: { fontWeight: "500", fontSize: "14px", marginTop: "3px" },
  tableData: { fontWeight: "400", fontSize: "12px" },
  mainTable: { width: "100%" },
  FirstColumn: {
    maxWidth: "80px", overflowY: "hidden", "&": {
      msOverflowStyle: "none",
      scrollbarWidth: "none"
    }
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
  
  tableTd1: {
    maxWidth: '100px',
    textAlign: 'start',
    fontSize:'13px'
  },
  tableTd2: {
    maxWidth: '100px',
    textAlign: 'center',
    fontSize:'13px'
  },
  tableTd: {
    maxWidth: '150px',
    textAlign: 'start',
    fontSize:'13px'
  },
  mainContaier:{
    padding:"25px 25px 0px 25px"
  },
  parentTable:{width:"94%",margin:"0px auto 0px auto"}
}))
const firstIndex = 0;

export default function OpenTicket() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [openTicketList, setOpenTicketList] = useState([]);
  const [updatedOpenTickets, setUpdatedOpenTickes] = useState([]);
  const { auth, admin } = useSelector((state) => state);
  const [selectedTab, setSelctedTab] = React.useState(0)
  const [pendingQueries, setPendingQueries] = useState([]);
  const [pageSize, setPageSize] = React.useState(4);
  const [page, setPage] = React.useState(1);
  const [closeQueries, setcloseQueries] = useState([]);
  const [loader, setLoader] = useState(false)
  const [open, setOpen] = useState(false);
  
  const { t } = useTranslation();
  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });
  const [updatedPendingQueries, setupdatedPendingQueries] = React.useState(
    pendingQueries.length>1 && pendingQueries.slice(firstIndex, pageSize)
  );
  const [updatedcloseQueries, setUpdatedCloseQueries] = React.useState(
    closeQueries.length > 1 && closeQueries.slice(firstIndex, pageSize)
  );
  useEffect(() => {
    setupdatedPendingQueries(pendingQueries && pendingQueries.slice(0, pageSize));
  }, [pageSize, pendingQueries]);
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
    setUpdatedCloseQueries(
      closeQueries.slice(
        firstIndex + pageSize * (value - 1),
        pageSize * value
      )
    );


  };
  const onPageChange = (data) => {
    setUpdatedOpenTickes(data)
  }

  useEffect(() => {
    setUpdatedCloseQueries(closeQueries.length > 0 && closeQueries.slice(0, pageSize));
  }, [pageSize, closeQueries]);

  const headers = {
    Authorization: "Bearer " + auth.authToken,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    dispatch(actions.getPendingQueriesList("Open"))
      .then((response) => {
        setupdatedPendingQueries(
          response.responseData.slice(firstIndex, pageSize)
        );

        setPendingQueries(response.responseData);
      });
    dispatch(actions.getCloseQueriesList("Close"))
      .then((response) => {
        setUpdatedCloseQueries(
          response.responseData.slice(firstIndex, pageSize)
        );
        setcloseQueries(response.responseData);
      });
    dispatch(actions.getAllOpenTicketList(headers, "Pending"))
      .then((response) => {
        setOpenTicketList(response.responseData)
        setUpdatedOpenTickes(response.responseData)

      })
  }, [open]);
  useEffect(() => {
    setLoader(true)
    dispatch(actions.getAllOpenTicketList(headers, "Pending"))
      .then((response) => {
        setOpenTicketList(response.responseData)
        setUpdatedOpenTickes(response.responseData)
        setLoader(false)
      })

    dispatch(actions.getPendingQueriesList("Open"))
      .then((response) => {
        // response.sort((a, b) => (a.id > b.id) ? 1 : -1)
        setPendingQueries(response.responseData);
        setLoader(false)
      });
    dispatch(actions.getCloseQueriesList("Close"))
      .then((response) => {
        // response.sort((a, b) => (a.id > b.id) ? 1 : -1)
        setcloseQueries(response.responseData);
        setLoader(false)
      });
  }, []);


  const handelReply = (data,type) => {
    // const { actions } = adminSlice;
    // dispatch(actions.userQuery(data));
    dispatch(actions.getAllHistory(data.id))

    history.push(
      `/admin/reply-query/${data.id}/${type}`
    )
  };
 

  
  
 

  return (
    <>
      <div className={`card card-custom card-stretch`}>
        <div className={classes.PromotionsMainHeader}>
          <span className={classes.PromotionsHeader}>
            {t(`Open Ticket`)}
          </span><br />
          <span className={classes.PromotionsSubHeader}>{t(`List of open ticket issue`)}</span>
        </div>
        <div className={["container",classes.mainContaier].join(' ')}>
          <div className="row   justify-content-between " style={{ backgroundColor: "#F5F5F5", borderBottom: "3px solid #287CBC",width:"100%",margin:"0px" }} >
            <div >
                <span className={selectedTab === 0 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setSelctedTab(0)}>{t(`Open Tickets`)}</span>
            </div>
            <div >            
                <span className={selectedTab === 1 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setSelctedTab(1)}>
                  {t(`In Progress`)}</span>           
            </div>
            <div>
                <span className={selectedTab === 2 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setSelctedTab(2)}>
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
                      <TableCell className={classes.tableHead} align="center">
                        {t(`Category`)}
                      </TableCell>
                      <TableCell className={classes.tableHead} align="center">
                        {t(`Sub-category`)}
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

                    {updatedOpenTickets.map((data, index) => (
                      <TableRow key={data.id}>
                        <TableCell align="center" className={classes.tableTd1}>{data.category}</TableCell>
                        <TableCell align="center" className={classes.tableTd}>{data.subCategory}</TableCell>
                        <TableCell align="center" className={classes.tableTd}>{data.queryDesc}</TableCell>
                        <TableCell align="center" className={classes.tableTd2}><ShowHistory fillColor="#287CBC" handleOpen={()=>handelReply(data,"close-ticket")}/></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </TableContainer>
              {updatedOpenTickets.length === 0 ?
                loader?<div className={classes.pleaseWait}>{t(`Please wait`)}...</div>:<div className="text-center p-5"> <span className={classes.error}>{t(`No Record Found`)}</span></div>
                :
                <div className='mt-3'>
                <CustomPagination data={openTicketList} pagesize={4} updateData={onPageChange}></CustomPagination>
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
                      <TableCell className={classes.tableHead} align="center">
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



                    {updatedPendingQueries.map((data, index) => (
                      <TableRow key={data.id}>
                        <TableCell align="center" className={classes.tableTd1}>{data.category}</TableCell>
                        <TableCell align="center" className={classes.tableTd}>{data.subCategory}</TableCell>
                        <TableCell align="center" className={classes.tableTd}>{data.queryDesc}</TableCell>
                        <TableCell align="center" className={classes.tableTd2}><ShowHistory fillColor="#287CBC" handleOpen={()=>handelReply(data,"close-ticket")}/></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </TableContainer>
              {updatedPendingQueries.length === 0 ?
                <div className="text-center p-5"> <span className={classes.error}>{t(`No Record Found`)}</span></div>
                :
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
                      <TableCell className={classes.tableHead} align="center">
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

            {updatedcloseQueries.length>0 ?
          <>
                    {updatedcloseQueries.map((data, index) => (
                      <TableRow key={data.id}>
                        <TableCell align="center" className={classes.tableTd1}>{data.category}</TableCell>
                        <TableCell align="center" className={classes.tableTd}>{data.subCategory}</TableCell>
                        <TableCell align="center" className={classes.tableTd}>{data.queryDesc}</TableCell>
                        <TableCell align="center" className={classes.tableTd2}><ShowHistory fillColor="#287CBC" handleOpen={()=>handelReply(data,"open-ticket")}/></TableCell>
                      </TableRow>
                    ))}</>:null}
                  </TableBody>
                </Table>

              </TableContainer>
              {updatedcloseQueries.length === 0 ?
               <div className="text-center p-5"> <span className={classes.error}>{t(`No Record Found`)}</span></div> :
                <div className="row pt-5 pb-4">
                  <div className="col-md-12 d-flex justify-content-center">
                    <Pagination
                      size="large"
                      variant="outlined"
                      color="secondary"
                      className="primary"
                      count={Math.ceil(
                        closeQueries && closeQueries.length / pageSize
                      )}
                      page={page}
                      onChange={handleDonePageChange}
                    />
                  </div>
                </div>
              }
            </>
          }
        </div>
      </div>
          </>
  );
}
