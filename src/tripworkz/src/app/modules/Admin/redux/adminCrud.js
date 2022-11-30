import axios from "axios";
const BASE_URL = process.env.REACT_APP_URL;

// export const GET_VOUCHER_URL = `${BASE_URL}Profile/GetProfile`;
export const GET_WERKCREDITZ_URL = `${BASE_URL}WerkzcreditPointExpiryMaster/GetAllPoints`;
export const POST_WERKCREDITZ_URL = `${BASE_URL}WerkzcreditPointExpiryMaster/UpdatePointExpiry`;
export const CREATE_POINTS_URL=`${BASE_URL}PointValueMaster/CreatePointValue`;
export const GET_WERKCREDITZ_EXPIRY_URL = `${BASE_URL}WerkzcreditPointExpiryMaster/GetAllPoints`;
export const POST_WERKCREDITZ_EXPIRY_URL = `${BASE_URL}WerkzcreditPointExpiryMaster/UpdatePointExpiry`;
// Vouchers API
export const GET_ALL_VOUCHERS = `${BASE_URL}VoucherMaster/GetAllVoucher`;
export const CREATE_NEW_VOUCHER = `${BASE_URL}VoucherMaster`;
export const DELETE_VOUCHER = `${BASE_URL}VoucherMaster/DeleteVoucher`;
export const EDIT_VOUCHER = `${BASE_URL}VoucherMaster/UpdateVoucher`;
export const GET_VOUCHER_BY_ID = `${BASE_URL}VoucherMaster`;
// Promocode API
export const GET_ALL_PROMOCODES = `${BASE_URL}PromocodeMaster/GetAllPromocode`;
export const CREATE_NEW_PROMOCODE = `${BASE_URL}PromocodeMaster`;
export const DELETE_PROMOCODE = `${BASE_URL}VoucherMaster/DeleteVoucher`;
export const EDIT_PROMOCODE = `${BASE_URL}PromocodeMaster/UpdatePromocode`;
export const GET_PROMOCODE_BY_ID = `${BASE_URL}PromocodeMaster`;

// Reviews API
export const GET_ALL_REVIEWS = `${BASE_URL}ReviewMaster/ApproveRejectList`;
export const EDIT_REVIEWS = `${BASE_URL}ReviewMaster/ApproveRejectReview`;
 
//Open Ticket
export const GET_ALL_OPEN_TICKET_QUERY = `${BASE_URL}OpenTicket/GetAllOpenTicketquery`;
export const ADD_QUERY_EMAIL = `${BASE_URL}OpenTicket/ReplyQueryMail`;
export const GET_PENDING_QUERY= `${BASE_URL}OpenTicket/PendingOpenTicketquery`;
export const GET_CLOSE_QUERY= `${BASE_URL}OpenTicket/GetAllCloseOpenTicket`;
export const GET_HISTORY=`${BASE_URL}OpenTicket/ShowTicketHistory`;
export const CLOSE_TICKET_QUERY= `${BASE_URL}OpenTicket/CloseTicket`; 
export const OPEN_TICKET_QUERY= `${BASE_URL}OpenTicket/OpenTicket`;
//blogs 
export const GET_APPROVE_REJECT_BLOGS = `${BASE_URL}Blogs/BlogApproveRejectList`;

export const REJECT_BLOG = `${BASE_URL}Blogs/ApproveRejectBlogs`;
export const GET_POINT_URL= `${BASE_URL}PointValueMaster/GetAllPointValue`;
// Werkcreditz
export function getWerkcreditzPoints(headers) {
  return axios.get(GET_WERKCREDITZ_URL, { headers: headers });
}

export function getPoints(headers) {
  return axios.get(GET_POINT_URL, { headers: headers });
}
export function postWerkcreditzPoints(headers, payload) {
  return axios.post(POST_WERKCREDITZ_URL, payload, { headers: headers });
}
export function createPoints(headers, payload) {
  return axios.post(CREATE_POINTS_URL, payload, { headers: headers });
}
export function getWerkcreditzPointsExpiry(headers) {
  return axios.get(GET_WERKCREDITZ_EXPIRY_URL, { headers: headers });
}
// Vouchers
export function getAllVouchers() {
  return axios.get(GET_ALL_VOUCHERS);
}
export function createNewVoucher(body) {
  return axios.post(CREATE_NEW_VOUCHER, body);
}

export function deleteSelectedVoucher(id) {
  return axios.post(DELETE_VOUCHER, null, { params: { id: id } });
}

export function editSelectedVoucher(body) {
  return axios.post(EDIT_VOUCHER, body);
}

export function getSelectedVoucher(id) {
  return axios.get(GET_VOUCHER_BY_ID, { params: { id: id } });
}
export function postWerkcreditzExpiryPoints(headers, payload) {
  return axios.post(POST_WERKCREDITZ_EXPIRY_URL, payload, { headers: headers });
}

// Promocodes

export function getAllPromocodes() {
  return axios.get(GET_ALL_PROMOCODES);
}
export function createNewPromocode(body) {
  return axios.post(CREATE_NEW_PROMOCODE, body);
}

export function deleteSelectedPromocode(id) {
  return axios.post(DELETE_PROMOCODE, null, { params: { id: id } });
}

export function editSelectedPromocode(body) {
  return axios.post(EDIT_PROMOCODE, body);
}

export function getSelectedPromocode(id) {
  return axios.get(GET_PROMOCODE_BY_ID, { params: { id: id } });
}


//Reviews
export function getAllReviews() {
  return axios.get(GET_ALL_REVIEWS);
}

export function editSelectedReview(body) {
  return axios.post(EDIT_REVIEWS, body);
}


//Open ticket

export function getAllOpenTicket(headers,status) {
  return axios.get(GET_ALL_OPEN_TICKET_QUERY, { headers: headers, params: {status:status } });
}

export function sendReplyEmail(body,headers) {
  return axios.post(ADD_QUERY_EMAIL, body, { headers: headers });
}

export function getApproveRejectBlogList(id,status) {
  console.log("idnnnnnnn",id,status)
  //{ params: { userid: id ,status:status} }
  return axios.get(GET_APPROVE_REJECT_BLOGS, { params: {status:status} });
}

export function rejectBlog(body) {
  return axios.post(REJECT_BLOG, body);
}

export function getPendingQueries(status) {
  return axios.get(GET_ALL_OPEN_TICKET_QUERY, { params: {status:status } });
}

export function getCloseQueries(status){
  return axios.get(GET_ALL_OPEN_TICKET_QUERY, { params: {status:status } });
}


export function getHistory(userid) {
  return axios.get(GET_HISTORY,{params: { id: userid }});
}
export function CloseTicket(body,req_header){
  return axios.post(CLOSE_TICKET_QUERY+`?id=${body.id}`,{ headers: req_header })
}
export function OpenTicket(body,req_header){
  return axios.post(OPEN_TICKET_QUERY+`?id=${body.id}`,{ headers: req_header })
}