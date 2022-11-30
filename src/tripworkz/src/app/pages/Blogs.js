import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from '../components/Pagination';
import * as actions from "../components/_redux/mainActions";
import '../modules/Admin/pages/Blogs/Blogs.css'

const useStyles = makeStyles((theme) => ({
  blogContainer: {
    width: "98%",
    float: "left",
    padding: "10px 0px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: " 0% 10% 5% 0%"
  },
  blogImage: { width: '100%', },
  MarchInformer: { color: '#ccc', },
  pleaseWait: {
    textAlign: 'center',
    padding: '10px',
    fontSize: '20px',
    width: '100%',
    color: "#287CBC",
    fontWeight: "500"
  },
  tabContainer: {
    display: "flex",
    justifyContent: 'space-between'
  },
  activeTab: {
    color: 'red'
  },
  deactiveTab: {
    color: 'red'
  },
  mainContaier:{
    padding:'0px 10px 0px 25px'
  }
}));


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
        <Box paddingX={0} paddingY={3} overflow='hidden'>
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



export const Blogs = () => {
  const classes = useStyles()
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);
  const { auth, main } = useSelector((state) => state);
  const userId = auth.user.userId
  const { t } = useTranslation();
  const dispatch = useDispatch()
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

  const [blogText, setBlogText] = useState({
    isError: false,
    value: "",
    msg: "",
  });
  const [blogTitle, setBlogTitle] = useState({
    isError: false,
    value: "",
    msg: "",
  });

  const [alertStatus, setAlertStatus] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [allBlogs, setAllBlogs] = useState()
  const [pendingBlogs, setPendingBlogs] = useState()
  const [approvedBlogs, setApprovedBlog] = useState()
  const [updatedPendingBlogs, setUpdatedPendingBlogs] = useState([]);
  const [updatedCompleteBlogs, setUpdatedCompleteBlogs] = useState([]);
  const [updatedBlogs, setUpdatedBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [flag, setFlag] = useState(false)
  const [expandText, setExpandText] = useState(false)
  const [expandindex, setExpandIndex] = useState(false)

  const handleExpand = (value, index) => {

    setExpandText(value)
    setExpandIndex(index)
  }

  useEffect(() => {
    let data = []
    let pendingBlog = []
    let approvedBlog = []
    dispatch(actions.getMyBlogs(userId))
      .then((response) => {
        data = response
        setAllBlogs(response)
        let array = response.slice().sort((a, b) => b.id - a.id)
        setUpdatedBlogs([...array])
        for (let index = 0; index < data.length; index++) {
          if (data[index].status === "Pending") {
            pendingBlog.push(data[index])

          }

          if (data[index].status === "APPROVE") {
            approvedBlog.push(data[index])

          }
        }
        setPendingBlogs(pendingBlog)
        let array1 = pendingBlog.slice().sort((a, b) => b.id - a.id)
        setUpdatedPendingBlogs([...array1])
        setApprovedBlog(approvedBlog)
        let array2 = approvedBlog.slice().sort((a, b) => b.id - a.id)
        setUpdatedCompleteBlogs([...array2])

      })
  }, [flag]);


  const onPageChange = (data) => {
    setUpdatedBlogs(data)
  }
  const onPendingPageChange = (data) => {
    setUpdatedPendingBlogs(data)
  }
  const onCompletedPageChange = (data) => {
    setUpdatedCompleteBlogs(data)
  }


  const createBlog = () => {
    let isOk = true;
    if (!blogText.value) {
      setAlertStatus({
        status: true,
        message: `${t(`Blog text is required`)}`,
        type: "error",

      });
      isOk = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000);
    }
    if (!blogTitle.value) {
      setAlertStatus({
        status: true,
        message: `${t(`Blog title is required`)}`,
        type: "error",

      });
      isOk = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }

    if (imgBase64.value) {
      let strings = imgBase64.value.split(",");
      switch (strings[0]) {//check image's extension
        case "data:image/jpeg;base64":
    
          break;
        case "data:image/png;base64":
          
          break;
        case "data:image/jpg;base64":
          
          break;
        default:
          isOk = false;
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

    if (!imgBase64.value) {
      setAlertStatus({
        status: true,
        message: `${t(`Please upload blog image`)}`,
        type: "error",

      });
      isOk = false;
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }

    if (isOk) {
      let body = {
        userId: userId,
        blogText: blogText.value,
        blogPhotos: imgBase64.value,
        title: blogTitle.value,
        createdOn: new Date(),
        status: " "
      }

      setLoading(true)
      dispatch(actions.addBlogs(body))
        .then((response) => {
          if (response.status === 200) {

            setBlogText({
              isError: false,
              value: "",
              msg: "",
            });
            setBlogTitle({
              isError: false,
              value: "",
              msg: "",
            });

            setImgBase64({
              isError: false,
              value: "",
              msg: "",
            });

            setFlag(!flag)
            //  dispatch(actions.getMyBlogs(userId))
            //  .then((response) => {
            //   setAllBlogs(response)
            // })
            setLoading(false)
            setAlertStatus({
              status: true,
              message: `${t(`The blog has been added successfully`)}`,
              type: "success",

            });
            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 5000); //5 Second delay

            return null;

          }


          else {
            setLoading(false)
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
          setLoading(false)
          setAlertStatus({
            status: true,
            message: `${t(`Something went wrong`)}`,
            type: "error",

          });

        });
      setTimeout(function () {
        setAlertStatus({ status: false, message: "", type: "" });
      }, 5000); //5 Second delay

      return null;
    }
  }
  const cancleBlog = () => {
    setImgBase64({
      ...imgBase64, value: ''
    });
    setBlogText({
      ...blogText, value: ''
    });
    setBlogTitle({
      ...blogTitle, value: ''
    })
  }


  return (
    <div className={`card card-custom card-stretch`}>
      <div className="blogsHeader">
        <span className="blogsHeaderText">
          {t(`Blogs`)}
        </span>
        <span className="blogsSubtitle">
          {t(`Write a blog and earn Tripwerkz Credit Points`)}
        </span>
      </div>
      <div className={'pl-10 pr-10 pb-10'}  >
        <div className={["container",classes.mainContaier].join(' ')} >
          <div className='row mt-2 mb-2 mr-2'>
            <div className='col-12'>
              {alertStatus.message ?
                <Alert severity={alertStatus.type} >
                  {alertStatus.message}
                </Alert> : null}
            </div>
          </div>
          <div className={classes.blogContainer}  >
            <div className={'pt-5 pb-5 pl-5 pr-5'}>
              <div className="row" >
                <div className="col-md-3 p-5">
                  {/* <img src={imgBase64.value ? imgBase64.value : "/media/Tripwerkzpath/blogdefaultimage.png"} 
                  className="blogsClientImage" /> */}
                  {imgBase64.value ?
                    <img src={imgBase64.value}
                      className="blogsClientImage" /> :
                    // <span className='mt-4'>Image</span>
                    <div className='blogsClientImageTxt'>{t(`Image`)}</div>

                  }
                  {/* <label htmlFor="icon-button-file" className="btn  ml-5 rounded-pill " style={{ backgroundColor: "#287CBC", color: "#ffffff" , marginTop:'40px' }}> Upload Image</label> */}
                </div>
                <div className="col-md-9">
                  <div className="form-group ">
                    <label className="font-weight-bold ">{t(`Title`)}</label>

                    <Form.Control type="text"
                      placeholder={t(`Add a title up to 60 characters`)}
                      maxLength={60}
                      value={blogTitle.value}
                      onChange={(e) =>
                        setBlogTitle({
                          value: e.target.value.trimLeft(),
                          isError: e.target.value === "",
                          msg:
                            e.target.value === "" ? `${t(`This is required field!`)}` : "",
                        })
                      }
                      isInvalid={blogTitle.isError}

                    />
                  </div>
                  <div className="form-group ">
                    <label className="font-weight-bold ">{t(`Description`)}</label>
                    <Form.Control as="textarea" rows={2}
                      placeholder={t(`Add your text here`)}
                      value={blogText.value}
                      onChange={(e) =>
                        setBlogText({
                          value: e.target.value.trimLeft(),
                          isError: e.target.value === "",
                          msg:
                            e.target.value === "" ? `${t(`This is required field!`)}` : "",
                        })
                      }
                      isInvalid={blogText.isError}

                    />
                  </div>


                  <input accept="image/*" id="icon-button-file"
                    type="file" style={{ display: 'none' }}
                    onChange={async (e) => {
                      if (e.target.files[0]) {
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
                      // setImageFile({
                      //   value: e.target.files[0],
                      // });
                    }} />
                  {/* <label htmlFor="icon-button-file" className="btn  rounded-pill mt-1" style={{backgroundColor:"#287CBC",color:"#ffffff"}}> Upload Image</label> */}


                </div>
                <div className='col-md-12 '>
                  <label htmlFor="icon-button-file" className="btn  ml-5 rounded-pill " style={{ backgroundColor: "#287CBC", color: "#ffffff", marginTop: '7px' }}> {t(`Upload Image`)}</label>
                  <button className="btn rounded-pill "
                    style={{ marginLeft: "10%", backgroundColor: "#287CBC", color: "#ffffff" }}
                    onClick={() => createBlog()}
                  >
                    &nbsp;&nbsp;&nbsp;
                    {loading ?
                      <span className="spinner spinner-white"></span>
                      :
                      `${t(`Save`)}`} &nbsp;&nbsp;&nbsp;
                  </button>

                  <button className=' btn rounded-pill cancleBtn' onClick={() => cancleBlog()}>
                    {t(`Cancel`)}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* 287CBC */}

          <div className="row justify-content-between " style={{ backgroundColor: "#F5F5F5", borderBottom: "3px solid #287CBC",width:'98%',margin:'0px' }} >
            <div >
              <span className={tab === 0 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setTab(0)}>{t(`All`)}</span>
            </div>
            <div >
              <span className={tab === 1 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setTab(1)}>
                {t(`Pending`)} </span>
            </div>
            <div>
              <span className={tab === 2 ? "openTicketAdminTabActive" : "openTicketTab"} onClick={() => setTab(2)}>
                {t(`Approved`)}
              </span>
            </div>
            {/* <div className="col-md-4">

            </div> */}
          </div>
          <div className="row">
            <div className="col-md-12">

              <div>
                <div>
                  <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={tab}
                  >
                    <TabPanel value={tab} index={0} dir={theme.direction}>

                      {allBlogs ?
                        <div>
                          {updatedBlogs.map((row, index) => (
                            <div className={classes.blogContainer}>
                              <div className={'pt-5 pb-5 pl-5 pr-5'}>

                                <div className="row">
                                  <div className="col-md-3">
                                    <img src={row.blogPhotos.length >= 50 ? row.blogPhotos : "/media/Tripwerkzpath/blogdefaultimage.png"} className="blogsClientImage" />
                                  </div>
                                  <div className="col-md-9 mt-1" >
                                    <span className='blogsClientCardTitle'>{row.title}</span><br />
                                    <span className='blogsClientblogsClientCardSubTitle'>
                                      {expandText && expandindex === row.title ?
                                        expandText && <span>{row.blogText}<span style={{ cursor: "pointer", color: "#287CBC" }} onClick={() => handleExpand(!expandText, row.title)}> ...View Less</span></span> :
                                        row.blogText.length < 20 ? row.blogText : <span>{row.blogText.substr(0, 200)} <span style={{ cursor: "pointer", color: "#287CBC" }} onClick={() => handleExpand(!expandText, row.title)}> ...Read More</span></span>}
                                    </span>
                                    <div>
                                      <span className='blogsClientCardSubTitle' >{t(`Created on`)} : {row.createdOn.slice(0, 10)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          ))}
                          {updatedBlogs.length > 0 ?
                            <CustomPagination data={allBlogs} pagesize={3} updateData={onPageChange}></CustomPagination>
                            : <div className='text-muted h4 text-center'>
                              {t(`No Record Found`)}
                            </div>
                          }
                        </div>
                        :
                        <div className={classes.pleaseWait}>{t(`Please wait`)}...</div>
                      }
                    </TabPanel>
                    <TabPanel value={tab} index={1} dir={theme.direction}>
                      {pendingBlogs ?
                        <div>
                          {updatedPendingBlogs.map((row, index) => (
                            <div className={classes.blogContainer}>
                              <div className={'pt-5 pb-5 pl-5 pr-5'}>

                                <div className="row">
                                  <div className="col-md-3">
                                    <img src={row.blogPhotos.length >= 50 ? row.blogPhotos : "/media/Tripwerkzpath/blogdefaultimage.png"} className="blogsClientImage" />
                                  </div>

                                  <div className="col-md-9 mt-1" >
                                    <span className='blogsClientCardTitle' >{row.title}</span><br />
                                    <span className='blogsClientblogsClientCardSubTitle'>
                                      {expandText && expandindex === row.title ?
                                        expandText && <span>{row.blogText}<span style={{ cursor: "pointer", color: "#287CBC" }} onClick={() => handleExpand(!expandText, row.title)}> ...View Less</span></span> :
                                        row.blogText.length < 20 ? row.blogText : <span>{row.blogText.substr(0, 200)} <span style={{ cursor: "pointer", color: "#287CBC" }} onClick={() => handleExpand(!expandText, row.title)}> ...Read More</span></span>
                                      }               </span>
                                    <div>
                                      <span className='blogsClientCardSubTitle' >{t(`Created on`)} : {row.createdOn.slice(0, 10)}</span>
                                    </div>
                                  </div>
                                </div>

                              </div>

                            </div>
                          ))}
                          {updatedPendingBlogs.length > 0
                            ?
                            <CustomPagination data={pendingBlogs} pagesize={3} updateData={onPendingPageChange}></CustomPagination>
                            : <div className='text-muted h4 text-center'>
                              {t(`No Record Found`)}
                            </div>}
                        </div>
                        :
                        <div className={classes.pleaseWait}>{t(`Please wait`)}...</div>
                      }

                    </TabPanel>
                    <TabPanel value={tab} index={2} dir={theme.direction}>
                      {approvedBlogs ?
                        <div>
                          {updatedCompleteBlogs.map((row, index) => (
                            <div className={classes.blogContainer}>
                              <div className={'pt-5 pb-5 pl-5 pr-5'}>

                                <div className="row">
                                  <div className="col-md-3">
                                    <img src={row.blogPhotos.length >= 50 ? row.blogPhotos : "/media/Tripwerkzpath/blogdefaultimage.png"} className="blogsClientImage" />
                                  </div>
                                  <div className="col-md-9 mt-1" >
                                    <span className='blogsClientCardTitle' >{row.title}</span>
                                    <br />
                                    <span className='blogsClientblogsClientCardSubTitle'>
                                    {expandText && expandindex === row.title ?
                                      expandText && <span>{row.blogText}<span style={{ cursor: "pointer", color: "#287CBC" }} onClick={() => handleExpand(!expandText, row.title)}> ...View Less</span></span> :
                                      row.blogText.length < 20 ? row.blogText : <span>{row.blogText.substr(0, 200)} <span style={{ cursor: "pointer", color: "#287CBC" }} onClick={() => handleExpand(!expandText, row.title)}> ...Read More</span></span>}
                                      </span>
                                    <div>
                                      <span className='blogsClientCardSubTitle' > {t(`Created on`)}: {row.createdOn.slice(0, 10)}</span>
                                    </div>
                                  </div>
                                </div>

                              </div>

                            </div>
                          ))}
                          {
                            updatedCompleteBlogs.length > 0 ?

                              <CustomPagination data={approvedBlogs} pagesize={3} updateData={onCompletedPageChange}></CustomPagination>
                              : <div className='text-muted h4 text-center'>
                                {t(`No Record Found`)}
                              </div>}</div>
                        :
                        <div className={classes.pleaseWait}>{t(`Please wait`)}...</div>
                      }
                    </TabPanel>
                  </SwipeableViews>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
