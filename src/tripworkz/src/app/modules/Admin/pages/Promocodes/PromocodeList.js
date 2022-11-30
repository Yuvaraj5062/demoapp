import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { Form } from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/adminActions";
import Alert from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles({
  table: {
    width: "100%",
    margin: "auto",
    borderRadius: 20,
  },
  tableHead: {
    color: "#287CBC",
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
  PromotionsMainHeader:
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#F5F5F5",
    // padding: "20px 20px",
    marginBottom: "6px"
  },
  PromotionsHeader: { fontWeight: "600", fontSize: "18px", color: "#287CBC" },
});

export default function PromocodeList() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [selectedId, setSelectedId] = React.useState();
  const dispatch = useDispatch();
  const [promocode, setPromocode] = useState([]);
  const { admin } = useSelector((state) => state);
  const { t } = useTranslation();
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
    dispatch(actions.getPromocodesList());
  }, []);

  useEffect(() => {
    if (admin.promocodes !== null) {
      setPromocode(admin.promocodes);
    }
  }, [admin]);

  const filteredItems =
    promocode !== null &&
    promocode.filter(
      (item) =>
        item.title.toLocaleLowerCase().includes(searchTerm) ||
        item.detail.toLocaleLowerCase().includes(searchTerm)
    );
  const itemsToDisplay = searchTerm ? filteredItems : promocode;

  const evaluateDate = (e) => {
    let options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(e).toLocaleDateString("en-us", options);
  };

  const promocodeDelete = () => {
    dispatch(actions.deletePromocode(selectedId)).then((response) => {
      if (response.status === 200) {
        setAlertStatus({
          status: true,
          message: `${t(`Successfully deleted`)}`,
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

  return (
    <div className={`card card-custom card-stretch`}>
      {/* begin::Header */}
      {/* <div className={classes.PromotionsMainHeader}>
       
          <span className={classes.PromotionsHeader}>
            {t(`Promocodes`)}
          </span>
       
      
          <Link to="/admin/promocodes/add">
            <button className="loginBtn">{t(`Add_new`)}</button>
          </Link>
        
      </div> */}
       <div className="card-header border-0 py-5 d-flex align-items-center" style={{background:'#F5F5F5'}}>
        <h3 className="card-title flex-column m-0 ">
          <span className={classes.PromotionsHeader}>
          {t(`Promocodes`)}
          </span>
        </h3>
        <div className="col-md-2 col-sm-3 col-xs-3">
          <Link to="/admin/promocodes/add">
            <button className="m-0 loginBtn">{t(`Add_new`)}</button>
          </Link>
        </div>
      </div>
    
      {/* begin::Body */}
      <div className="card-body" style={{paddingTop:'25px'}}>
        <div className="row mb-5 justify-content-center">
          {/* Table Starts here */}

          <TableContainer className={classes.table} component={Paper}>
            <Form.Group controlId="searchBasic" className={"ml-5 mt-5"}>
              <Form.Control
                type="text"
                className="rounded-shape"
                style={{ width: "40%" }}
                value={searchTerm}
                placeholder={t(`Search`)}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                    {t(`Discount Amount`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Discount Type`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Gift Code`)}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    {t(`Issue_on`)}
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
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.title}</TableCell>
                      <TableCell align="center">{item.detail}</TableCell>
                      <TableCell align="center">{item.discountType ==="InPercent" ? item.discountValue + "%" : item.discountValue}</TableCell>
                      <TableCell align="center">{item.discountType}</TableCell>

                      <TableCell align="center">{item.giftCode}</TableCell>
                      <TableCell align="center">
                        {evaluateDate(item.createOn)}
                      </TableCell>
                      <TableCell align="center">
                        {evaluateDate(item.expiredOn)}
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`/admin/promocodes/edit/${item.id}`}>
                          <CreateIcon className={classes.editIcon} />
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <DeleteForeverIcon
                          onClick={() => handleOpen(item.id)}
                          className={classes.deleteIcon}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {itemsToDisplay.length === 0 && (
              <div className="text-center">
                {t(`There are no items to display adjust your filter criteria`)}

              </div>
            )}
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
                    onClick={() => promocodeDelete()}
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
      </div>
      {/* end::Body */}
    </div>
  );
}
