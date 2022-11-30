import * as requestFromServer from "./adminCrud";
import { adminSlice } from "./adminSlice";

const { actions } = adminSlice;

//Werkcreditz

export const getWerkcreditzPoints = (headers) => (dispatch) => {
  return requestFromServer
    .getWerkcreditzPoints(headers)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.werkcreditzPoints(response.data));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const getWerkcreditzPointsExpiry = (headers) => (dispatch) => {
  return requestFromServer
    .getWerkcreditzPointsExpiry(headers)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.werkcreditzPointsExpiry(response.data));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

// Vouchers

export const getVoucherList = () => (dispatch) => {
  return requestFromServer
    .getAllVouchers()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.vouchersFetched(response.data));
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.vouchersFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const createVoucher = (body) => (dispatch) => {
  return requestFromServer
    .createNewVoucher(body)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getVoucherList());
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const deleteVoucher = (id) => (dispatch) => {
  return requestFromServer
    .deleteSelectedVoucher(id)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getVoucherList());
        return response;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const editVoucher = (body) => (dispatch) => {
  return requestFromServer
    .editSelectedVoucher(body)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getVoucherList());
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const getSelectedVoucherById = (id, req_header) => (dispatch) => {
  return requestFromServer
    .getSelectedVoucher(id, req_header)
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

// Promocodes

export const getPromocodesList = () => (dispatch) => {
  return requestFromServer
    .getAllPromocodes()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.promocodesFetched(response.data));
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.vouchersFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const createPromocode = (body) => (dispatch) => {
  return requestFromServer
    .createNewPromocode(body)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getPromocodesList());
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const deletePromocode = (id) => (dispatch) => {
  return requestFromServer
    .deleteSelectedPromocode(id)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getPromocodesList());
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const editPromocode = (body) => (dispatch) => {
  return requestFromServer
    .editSelectedPromocode(body)
    .then((response) => {

      if (response.status === 200) {
        dispatch(getPromocodesList());
        return response;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const getSelectedPromocodeById = (id, req_header) => (dispatch) => {
  return requestFromServer
    .getSelectedPromocode(id, req_header)
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


//Reviews
export const getAllReviews = () => (dispatch) => {
  return requestFromServer
    .getAllReviews()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.reviewsFetched(response.data));
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.reviewsFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};


//editSelectedReview
export const editReview = (body) => (dispatch) => {
  return requestFromServer
    .editSelectedReview(body)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getAllReviews());
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

//Open ticket

export const getAllOpenTicketList = (headers,status) => (dispatch) => {
  return requestFromServer
    .getAllOpenTicket(headers,status)
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.ticketFetched(response.data));
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.ticketFetched([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const addReplyTicketIssue = (body, headers) => (dispatch) => {
  return requestFromServer
    .sendReplyEmail(body, headers)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getPromocodesList());
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};

export const getApproveRejectBlogs = (id,status) => (dispatch) => {
  return requestFromServer
    .getApproveRejectBlogList(id,status)
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

export const rejectBlog = (body) => (dispatch) => {
  return requestFromServer
    .rejectBlog(body)
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


export const getPendingQueriesList = (status) => (dispatch) => {
  return requestFromServer
    .getPendingQueries(status)
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

export const getCloseQueriesList = (status) => (dispatch) => {
  return requestFromServer
    .getCloseQueries(status)
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
export const getAllHistory = (userid) => (dispatch) => {
  return requestFromServer
    .getHistory(userid)
    .then((response) => {
    
      if (response.data.responseData) {
        let admin = [];
        let client = [];
        console.log("ttttttttcalllllllllllllllllllllllllllllllll",response.data.responseData)
        if (response.data.responseData) {
          dispatch(actions.adminReplayFetched(response.data.responseData.replyTicketList));
          // response.data.responseData.replyTicketList.forEach((item) => { 
            
          //   if (item.replyBy === 3) {
          //   admin.push(item);
          //   }else{
          //     client.push(item);
          //   }           
         // });
         return response.data.responseData
          console.log("calllllllllllllllllllllllllllllllll")
          dispatch(actions.adminReplayFetched(admin));
          dispatch(actions.clientReplayFetched(client));
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



export const getPoints = (headers) => (dispatch) => {
  return requestFromServer
    .getPoints(headers)
    .then((response) => {
      if (response.status === 200) {
        //dispatch(actions.werkcreditzPoints(response.data));
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {

      return error;
    });
};