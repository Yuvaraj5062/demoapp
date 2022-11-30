import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { Form } from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useTranslation } from "react-i18next";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,

} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/adminActions";
import Alert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    width: "100%",
    margin: "auto",
    borderRadius: 20,
  },
  tableHead: {
    color: "#287CBC",
    textAlign: 'start'
  },
  deleteIcon: {
    color: "red",
    cursor: "pointer",
  },
  editIcon: {
    color: "#287CBC",
    cursor: "pointer",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#F7F6F8",
    border: "1px solid #287CBC",
    boxShadow: 5,
    padding: 10,
    borderRadius: 20,
  },
  tableTd: {
    maxWidth: '150px',
    textAlign: 'start'
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
  notFound: {
    color: "#B5B5C3",
    fontWeight: "400",
    fontSize: "16px",
    padding: "25px",
    textAlign: "center",
  },
  pleaseWait: {
    textAlign: 'center',
    padding: '10px',
    fontSize: '20px',
    width: '100%',
    color: "#287CBC",
    fontWeight: "500"
  },
});

export function ListVoucher() {
  const classes = useStyles();
  const [selectedId, setSelectedId] = React.useState();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const dispatch = useDispatch();
  const [vouchers, setVouchers] = useState([]);
  const [itemsToDisplay, setItemstoDisplay] = useState([])
  const { admin } = useSelector((state) => state);
  const { t } = useTranslation();
  const [loader,setLoader]=useState(false);
  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });

  const handleOpen = (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    
    setLoader(true)

    dispatch(actions.getVoucherList()).then((res)=>{
      setLoader(false)

    });
  }, []);

  useEffect(() => {
    if (admin.vouchers !== null) {
      setVouchers(admin.vouchers);

      setFilteredVouchers(admin.vouchers)
      let items = [...admin.vouchers]
      setItemstoDisplay(items.slice(0, 8))
    }
  }, [admin]);

  const evaluateDate = (e) => {
    // let options = { day: "numeric", month: "short", year: "numeric" };
    // const date = new Date(e);
    // const dateFormate = moment(date).format('DD-MM-YYYY');
    // return dateFormate;
    let options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };

  const [pageSize, setPageSize] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)

  const voucherDelete = () => {
    dispatch(actions.deleteVoucher(selectedId)).then((response) => {
      if (response.status === 200) {
        setAlertStatus({
          status: true,
          message: `${t(`Voucher deleted successfully`)}`,
          type: "success",
        });
        setTimeout(function () {
          setAlertStatus({ status: false, message: "", type: "" });
        }, 5000); //5 Second delay
      } else {
        setAlertStatus({
          status: true,
          message: `${t(`Unable to delete`)}`,
          type: "error",
        });
        setTimeout(function () {
          setAlertStatus({ status: false, message: "", type: "" });
        }, 5000); //5 Second delay

        return null;
      }
    });
    handleClose();
  };

  const [filteredVouchers, setFilteredVouchers] = useState([])
  const onSearchChange = (e) => {
    let filteredItems =
      vouchers !== null &&
      vouchers.filter(
        (item) =>
          item.title.toLocaleLowerCase().includes(e.target.value) ||
          item.details.toLocaleLowerCase().includes(e.target.value)
      );
    setFilteredVouchers(filteredItems)
    let items = [...filteredItems]
    setCurrentPage(1)
    setItemstoDisplay(items.slice(pageSize * (currentPage - 1), pageSize * currentPage))
    // setItemstoDisplay(filteredItems)
  }

  const handlePageChange = (e, val) => {
    setCurrentPage(val)
    let items = [...filteredVouchers]
    setItemstoDisplay(items.slice(pageSize * (val - 1), pageSize * val))
  }

  return (
    <div className={`card card-custom card-stretch`}>
      {/* begin::Header */}
      

      <div className={classes.MainHeader}>
            <span className={classes.MainTitle}>
            {t(`Vouchers`)}
            </span>
            <Link to="/admin/vouchers/add">
            <button className={classes.backButton}>{t(`Add_new`)}</button>
            </Link>
            {/* <span classes={classes.SubTitle}>{t(`Use your credits for your future purchases`)}</span> */}
          </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-0 mt-5 ">
        <div className="row mb-1 justify-content-center">
          {/* Table Starts here */}

          <TableContainer className={classes.table} component={Paper}>
            <Form.Group controlId="searchBasic" className={"ml-5 mt-5"}>
              <Form.Control
                type="text"
                className="rounded-shape"
                style={{ width: "40%" }}
                value={searchTerm}
                placeholder={t(`Search`)}
                // onChange={(e) => setSearchTerm(e.target.value)}
                onChange={(e) => onSearchChange(e)}
              />
            </Form.Group>
            {alertStatus.status && (
              <div className="row m-3">
                <div className="col-md-8">
                  <Alert severity={alertStatus.type}>
                    {alertStatus.message}
                  </Alert>
                </div>
              </div>
            )}
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`S.no`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Title`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Description`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Price`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Discount`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Valid upto`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Edit`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Delete`)}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* We have to map the data here */}

                {itemsToDisplay &&
                  itemsToDisplay !== null &&
                  itemsToDisplay.length !== 0 &&
                  itemsToDisplay.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell align="center" className={classes.tableTd}>{index + 1}</TableCell>
                      <TableCell align="center" className={classes.tableTd}>{item.title}</TableCell>
                      <TableCell align="center" className={classes.tableTd}>{item.details}</TableCell>
                      <TableCell align="center" className={classes.tableTd}>{"$"}{item.price}</TableCell>
                      <TableCell align="center" className={classes.tableTd}>
                        {item.discountType === "InPercent" ? item.discountValue + "%" : item.discountValue}
                      </TableCell>

                      <TableCell align="center" className={classes.tableTd}>
                        {evaluateDate(item.expiron)}
                      </TableCell>
                      <TableCell align="center" className={classes.tableTd}>
                        <Link to={`/admin/vouchers/edit/${item.id}`}>
                          <CreateIcon className={classes.editIcon} />
                        </Link>
                      </TableCell>
                      <TableCell align="center" className={classes.tableTd}>
                        <DeleteForeverIcon
                          onClick={() => {
                            handleOpen(item.id);
                          }}
                          className={classes.deleteIcon}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
           
            
             {loader && itemsToDisplay.length === 0?<div className={classes.pleaseWait}>{t(`Please wait`)}</div>:
             itemsToDisplay.length === 0 &&(
              <div className={classes.notFound}>{t(`No Record Found`)}</div>)
            }
          </TableContainer>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
              <span className="m-5" id="transition-modal-title " style={{fontSize:"18px",fontWeight:"500"}}>
                  {t(`Are you sure you want to delete this voucher`)}?
                </span>
                <div className="text-center m-5">
                  <button
                    className="btn btn-outline-danger btn-md m-2 w-25"
                    onClick={() => voucherDelete()}
                  >
                    {t(`Yes`)}

                  </button>
                  <button
                    onClick={handleClose}
                    className="btn btn-outline-secondary w-25 btn-md m-2"
                  >
                    {t(`No`)}

                  </button>
                </div>
              </div>
            </Fade>
          </Modal>
          {/* Table ends here */}
        </div>
        {itemsToDisplay &&
          itemsToDisplay !== null &&
          itemsToDisplay.length !== 0 &&
          <div className="row mt-5">
            <div className="col-md-12 d-flex justify-content-center">
              <Pagination
                size="large"
                variant="outlined"
                color="secondary"
                className="primary"
                count={Math.ceil(filteredVouchers && filteredVouchers.length / pageSize)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        }
      </div>
      {/* end::Body */}
    </div>
  );
}
