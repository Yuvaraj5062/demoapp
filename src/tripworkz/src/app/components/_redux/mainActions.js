import * as requestFromServer from "./mainCrud";
import { mainSlice } from "./mainSlice";

const { actions } = mainSlice;

export const getUserDetails = (email, req_header) => (dispatch) => {
  return requestFromServer
    .getMember(email, req_header)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.userDetailsFetched(response.data));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find member details";
    });
};

export const getNotificationSettings = (params, headers) => (dispatch) => {
  return requestFromServer
    .getNotificationSettings(params, headers)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.setNotificationSettings(response.data));
      }
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch(
          actions.setNotificationSettings({
            userId: params.userId,
            updatenpramotionEmail: false,
            updatenpromotionSMS: false,
            reminderEmail: false,
            reminderSMS: false,
            accountnotificationEmail: false,
            accountnotificationSMS: false,
          })
        );
      }
    });
};

export const updateNotificationSettings = (data, headers) => (dispatch) => {
  dispatch(actions.notificationLoader(true));
  return requestFromServer
    .updateNotificationSettings(data, headers)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.setNotificationSettings(data));
        dispatch(actions.notificationLoader(false));
        dispatch(
          actions.notificationStatus({
            status: "success",
            msg: "Settings updated successfully.",
          })
        );
      } else {
        dispatch(
          actions.notificationStatus({
            status: "error",
            msg: "Something went wrong",
          })
        );
      }
    })
    .catch((error) => {
      dispatch(actions.notificationLoader(false));
      return error;
    });
};

export const updateUserDetails = (body, req_header) => (dispatch) => {
  dispatch(actions.settingLoader(true));
  return requestFromServer
    .updateMember(body, req_header)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.settingLoader(false));
        dispatch(actions.userDetailsFetched(body));
        dispatch(
          actions.settingUpdateStatus({
            status: "success",
            msg: response.data,
          })
        );
       return response.data
      } else {
        dispatch(actions.settingLoader(false));
        dispatch(
          actions.settingUpdateStatus({
            status: "error",
            msg: response.data,
          })
        );
        return response.data
      }
    })
    .catch((error) => {
      // console.log("error............",error.response.data);
      //error.clientMessage = "Can't update member details";
      return error.response.data
    });
};

export const updateUserPassword = (body, req_header) => (dispatch) => {
  dispatch(actions.passwordLoader(true));
  return requestFromServer
    .updatePassword(body, req_header)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.passwordLoader(false));
        dispatch(
          actions.passwordUpdateStatus({
            status: "success",
            msg: response.data,
          })
        );
      } else {
        dispatch(actions.passwordLoader(false));
        dispatch(
          actions.passwordUpdateStatus({
            status: "error",
            msg: response.data,
          })
        );
      }
    })
    .catch((error) => {
      dispatch(actions.passwordLoader(false));
      dispatch(
        actions.passwordUpdateStatus({
          status: "error",
          msg: "Please provide the correct password",
        })
      );
    });
};

export const getCountryDetails = () => (dispatch) => {
  return requestFromServer
    .getCountry()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.countryFetched(response.data));
      }
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't get countries";
    });
};

export const getCityDetails = (provinceId, countryId) => (dispatch) => {
  return requestFromServer
    .getCityByCountry(provinceId, countryId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.citiesFetched(response.data));
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't get cities";
    });
};

export const getProvinceDetails = (id) => (dispatch) => {
  return requestFromServer
    .getProvinceByCountry(id)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.provincesFetched(response.data));
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't get province";
    });
};

export const getUserLocation = (req_header) => (dispatch) => {
  return requestFromServer
    .getUserLocationDetails(req_header)
    .then((response) => {
      if (response.data.dataException.err_code === 200) {
        dispatch(actions.userLocationDetailsFetched(response.data.data));
        return response.data.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find user location details";
    });
};

export const getRecommendedHotel = (body, req_header) => (dispatch) => {
  return requestFromServer
    .getRecommededHotelsForUser(body, req_header)
    .then((response) => {
      if (response.data.dataException.err_code === 200) {
        dispatch(actions.recommendedHotelForUserFethed(response.data.data));
        return response.data.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find Recommended Hotel details";
    });
};

export const getAllCreditTransactions = (id, header) => (dispatch) => {
  return requestFromServer
    .getAllCreditTransactions(id, header)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find member details";
    });
};

export const getSecurityEmailDetails = (code, type) => (dispatch) => {
  return requestFromServer
    .getSecurityEmail(code, type)
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
    })
    .catch((error) => {
      // console.log("...>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>cant fetch user",error);
      // error.clientMessage = "Can't get user email";
    });
};

export const getUserReferLink = (email, req_header) => () => {
  return requestFromServer
    .getReferLink(email, req_header)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't get refer link";
    });
};

export const sendReferEmail = (refer, to, req_header) => () => {
  return requestFromServer
    .sendReferLink(refer, to, req_header)
    .then((response) => {
      if (response.status === 200) {
        return response;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
      // error.clientMessage = "Can't get refer link";
    });
};

export const getAllVouchers = (req_header) => (dispatch) => {
  return requestFromServer
    .getAllVouchers(req_header)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.allVouchersFetched(response.data));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};

export const getMyVouchers = (req_header, params) => (dispatch) => {
  return requestFromServer
    .getMyVouchers(req_header, params)
    .then((response) => {
      if (response.status === 200) {
        let pendingVouchers = [];
        let allVouchers = [];
        if (response.data.length !== 0) {
          response.data.forEach((item) => {
            if (item.status === "Active Voucher Reedim List" || item.status === "Active Voucher Expired List" ) {
              pendingVouchers.push(item);
            }
             else if (item.status === "Success" || item.status === "Active Voucher Active List") {
              allVouchers.push(item);
            }
          });
          dispatch(actions.myVouchersFetched(allVouchers));
          dispatch(actions.myPendingVouchersFetched(pendingVouchers));
        }
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};




export const getcurrentPromotions = () => (dispatch) => {
  return requestFromServer
    .getcurrentPromotions()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.currentPromotionsFetched(response.data));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};

export const getupcomingPromotions = () => (dispatch) => {
  
  return requestFromServer
    .getupcomingPromotions()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.upcomingPromotionsFetched(response.data));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};
















export const redeemVoucher = (req_header, body) => (dispatch) => {
  return requestFromServer
    .redeemVoucher(req_header, body)
    .then(async (response) => {
      if (response.status === 200) {
        // dispatch(actions.myVouchersFetched(response.data));
        await getMyVouchers(req_header, { userid: body.userid });
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};

export const giftVoucher = (req_header, body) => (dispatch) => {
  return requestFromServer
    .giftVoucher(req_header, body)
    .then(async (response) => {
      if (response.status === 200) {
        // dispatch(actions.myVouchersFetched(response.data));
        await getMyVouchers(req_header, { userid: body.userid });
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};

export const giftVoucherAcceptStatus = (body) => (dispatch) => {
  return requestFromServer
    .giftVoucherAccept(body)
    .then(async (response) => {
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};

export const getAllBookings = (params) => (dispatch) => {
  return requestFromServer
    .getAllBookings(params)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.allBookingsFetched(response.data));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};




export const getBookingById = (params) => (dispatch) => {
  return requestFromServer
    .getBookingDetailById(params)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};

export const getMyMiddlewareCountries = () => (dispatch) => {
  return requestFromServer
    .getMiddlewareCountries()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.middlewareCountriesFetched(response.data));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};

export const getMyMiddlewareCurrencies = () => (dispatch) => {
  return requestFromServer
    .getMiddlewareCurrencies()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.middlewareCurrenciesFetched(response.data));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};

export const getMyMiddlewareProvider = (body) => (dispatch) => {
  return requestFromServer
    .getMiddlewareProvider(body)
    .then(async (response) => {
      if (response.status === 200) {
        dispatch(actions.middlewareProvidersFetched(response.data));
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};

export const createMiddlewarePayment = (body) => (dispatch) => {
  return requestFromServer
    .paymentCreate(body)
    .then(async (response) => {
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};

export const getPaymentStatus = (body) => {
  return requestFromServer
    .getPaymentStatus(body)
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        return res;
      }
    })
    .catch((err) => {
      return err;
    });
};



export const getAllReviewList = (id) => (dispatch) => {
  return requestFromServer
    .getAllReviews(id)
    .then((response) => {
      console.log("response.data",response.data)
      if (response.status === 200) {
        dispatch(actions.allReviewsFetched(response.data));
       
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.allReviewsFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};




export const createReview = (body,userId) => (dispatch) => {
  return requestFromServer
    .createNewReview(body)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getAllReviewList(userId));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};



export const getDashboardItemsList = (id) => (dispatch) => {
  return requestFromServer
    .getDashboardItems(id)
    .then((response) => {
      console.log("response.data",response.data)
      if (response.status === 200) {
        dispatch(actions.settingControlFetched(response.data));
       
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.settingControlFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

//add new item on dashboard
export const addDashboardItem = (body) => (dispatch) => {
  return requestFromServer
    .addDashboardItems(body)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getDashboardItemsList(body.userid));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

//add new card
export const addCard = (body) => (dispatch) => {
  return requestFromServer
    .createNewCard(body)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getAllCardList(body.userId));
        console.log((body.userId))
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log("error in catch",error.response)
      console.log(error);
      return error;
    });
};


//get  card of speciffic user by it's id
export const getAllCardList = (id) => (dispatch) => {
  return requestFromServer
    .getAllCards(id)
    .then((response) => {
      console.log("response.data",response.data)
      if (response.status === 200) {
        dispatch(actions.allCardFetched(response.data));
       
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.allCardFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

//delete card by id
export const deleteCard = (id) => (dispatch) => {
  return requestFromServer
    .deleteSelectedCard(id)
    .then((response) => {
      if (response.status === 200) {
       // dispatch(getVoucherList());
        return response;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};



//get card by id

export const getCardById = (id) => (dispatch) => {
  return requestFromServer
    .getCardByCardId(id)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.cardByIdFetched(response.data));
       
        return response;
      } else if (response.status === 204) {
        dispatch(actions.cardByIdFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


//editSelectedCard
export const editCard = (body) => (dispatch) => {
  return requestFromServer
    .editSelectedCard(body)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


//set card as primary card
export const addPrimaryCard=(body)=>(despatch)=>{
  return requestFromServer
  .addCardAsPrimary(body)
  .then((response)=>{
    if(response.status===200)
    {
      return response.data;
    }
    else{
      return null
    }
  }).catch((error)=>{
    console.log(error);
    return error
  })
}

//addPartnerDetails

export const addPartnerDetails = (body) => (dispatch) => {
  return requestFromServer
    .addPartnerDetail(body)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getPartnersDetails(body.bookingRefNumber));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


//get  partner detrails
export const getPartnersDetails = (id) => (dispatch) => {
  return requestFromServer
    .getPartners(id)
    
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.partnersFetched(response.data));
       
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.partnersFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


export const deletePartnerById = (id) => (dispatch) => {
  return requestFromServer
    .deletePartner(id)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.partnersFetched(response.data));
        return response;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const editPartner = (body) => (dispatch) => {
  return requestFromServer
    .editPartnerDetails(body)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};




export const getEwalletCreditPoints = (id) => (dispatch) => {
  return requestFromServer
    .getEwalletCredit(id)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.eWalletCreditFetched(response.data));
       
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.eWalletCreditFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

//Add points to e-wallet
export const addPointsToWallet = (body) => (dispatch) => {
  return requestFromServer
    .addEwalletPoints(body)
    .then(async (response) => {
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};


export const getAllEwallletTransaction = (id, header) => (dispatch) => {
  return requestFromServer
    .getAllEwallletTransactions(id, header)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find member details";
    });
};

export const addTicketQuery = (body,req_header) => (dispatch) => {
  return requestFromServer
    .sendTicketQuery(body,req_header)
    .then(async (response) => {
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};
export const CloseTicket = (body,req_header) => (dispatch) => {
  return requestFromServer
    .CloseTicket(body,req_header)
    .then(async (response) => {
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};
export const getAllQueris = (id,status,req_header) => (dispatch) => {
  return requestFromServer
    .getMyQueris(id,status,req_header)
    .then((response) => {
      if (response.status === 200) {
       // dispatch(actions.eWalletCreditFetched(response.data));
       
        return response.data;
      } else if (response.status === 204) {
        //dispatch(actions.eWalletCreditFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


export const addBlogs = (body) => (dispatch) => {
  return requestFromServer
    .addBlog(body)
    .then(async (response) => {
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


export const getMyBlogs = (id) => (dispatch) => {
  return requestFromServer
    .getMyBlogs(id)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 204) {
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      return error;
    });
};


export const getPendingQueriesList = (userid,status) => (dispatch) => {
  return requestFromServer
    .getPendingQueries(userid,status)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 204) {
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};




export const getDoneQueriesList = (userid,status) => (dispatch) => {
  return requestFromServer
    .getDoneQueries(userid,status)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 204) {
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};




export const getAllCategory = () => (dispatch) => {
  return requestFromServer
    .getAllCategory()
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 204) {
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getAllSubCategory = (id) => (dispatch) => {
  return requestFromServer
    .getAllSubCategory(id)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 204) {
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getDashboardDetails = (id) => (dispatch) => {
  
  return requestFromServer
    .getDashboardDetails(id)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 204) {
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


export const getDashboardPoints = () => (dispatch) => {
  
  return requestFromServer
    .getDashboardPoints()
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 204) {
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};












export const addReplyTicketIssue = (body, headers) => (dispatch) => {
  return requestFromServer
    .sendReplyEmail(body, headers)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const getAllHistory = (userid) => (dispatch) => {
  return requestFromServer
    .getAllHistory(userid)
    .then((response) => {
      console.log("qqqqqqqqcalllllllllllllllllllllllllllllllll",response)
      if (response.data.responseData) {
        let admin = [];
        let client = [];
        console.log("ttttttttcalllllllllllllllllllllllllllllllll",response.data.responseData)
        if (response.data.responseData) {
          return  response.data.responseData;   
       
        }
      } else if (response.data.status === 204) {
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


export const OpenTicket = (body,req_header) => (dispatch) => {
  return requestFromServer
    .OpenTicket(body,req_header)
    .then(async (response) => {
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      // error.clientMessage = "Can't get refer link";
      return error;
    });
};


