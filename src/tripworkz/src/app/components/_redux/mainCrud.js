import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;
export const GET_MEMBER_URL = `${BASE_URL}Profile/GetProfile`;
export const UPDATE_MEMBER_URL = `${BASE_URL}Profile`;
export const UPDATE_PASSWORD_URL = `${BASE_URL}SignUp/changepwd`;
export const GET_COUNTRY_URL = `${BASE_URL}CountryMst`;
export const GET_CITY_URL = `${BASE_URL}CityMst`;
export const GET_SECURITY_EMAIL = `${BASE_URL}Security`;
export const GET_PROVINCE_URL = `${BASE_URL}ProvinceMst`;
export const GET_ALL_CREDIT_TRANSACTIONS = `${BASE_URL}WerkzcreditMst/GetAllTransaction`;
export const GET_NOTIFICATION_SETTING_URL = `${BASE_URL}NotificationMst`;

// b2c get hotels listing
export const GET_USER_LOCATION_DETAILS = `https://aws.tripwerkz.com/new-api/api/secure/secure-ip`;
export const GET_RECOMMENDED_HOTEL = `https://aws.tripwerkz.com/new-api/hotel/get-hotels-list/`;
export const GET_REFER_LINK = `${BASE_URL}GenerateReferLink`;
export const SEND_REFER_LINK = `${BASE_URL}GenerateReferLink/SednReferLink`;
export const GET_ALL_VOUCHERS = `${BASE_URL}VoucherMaster/GetAllVoucher`;
export const GET_MY_VOUCHERS = `${BASE_URL}MyVoucherMaster`;
export const GET_VOUCHER_BY_ID_URL = `${BASE_URL}VoucherMaster`;
export const REDEEM_VOUCHER_URL = `${BASE_URL}RedeemVoucherMaster/RedeemVoucher`;
export const GIFT_VOUCHER_URL = `${BASE_URL}GiftVoucherMaster`;
export const GIFT_VOUCHER_ACCEPT = `${BASE_URL}GiftVoucherMaster/VoucherAcceptReject`;
export const GET_ALL_BOOKINGS = `${BASE_URL}Booking`;
export const GET_BOOKING_DETAIL_BY_ID_URL = `${BASE_URL}Booking/GetBookingDetailById`;
export const GET_WERKZCREDITS_BALANCE = `${BASE_URL}WerkzcreditMst/GetBalance`;

export const GET_MIDDLEWARE_COUNTRY = `${BASE_URL}Middleware/GetCountryList`;
export const GET_MIDDLEWARE_CURRENCY = `${BASE_URL}Middleware/GetCurrency`;
export const GET_MIDDLEWARE_PROVIDER = `${BASE_URL}Middleware/PaymentProvider`;
export const GET_MIDDLEWARE_CREATE_PAYMENT = `${BASE_URL}Middleware/PaymentCreate`;
export const GET_MIDDLEWARE_PAYMENT_STATUS = `${BASE_URL}Middleware/CheckPaymentStatus`;
export const APPLY_VOUCHER = `${BASE_URL}RedeemVoucherMaster/ApplyVoucher`;
export const GET_ALL_REVIEWS = `${BASE_URL}ReviewMaster/AllProductReview`;
export const CREATE_NEW_REVIEW = `${BASE_URL}ReviewMaster/AddReview`
export const GET_DASHBOARD_ITEM = `${BASE_URL}DashbordSettingMaster`;  
export const ADD_DASHBOARD_ITEM = `${BASE_URL}DashbordSettingMaster`; 
export const CREATE_NEW_CARD = `${BASE_URL}CardMaster`
export const GET_ALL_CARDS = `${BASE_URL}CardMaster/GetAllCard`; 
export const DELETE_CARD = `${BASE_URL}CardMaster/DeleteCard`;
export const GET_CARD_BY_ID = `${BASE_URL}CardMaster/GetCardById`;  
export const EDIT_CARD= `${BASE_URL}CardMaster/UpdateCard`; 
export const ADD_PRIMARY_CARD= `${BASE_URL}CardMaster/ChangePrimaryCard`;
export const GET_PARTNERS_DETAILS= `${BASE_URL}TravelMemberInfo/GetAllByReferenceNo`;
export const ADD_PARTNERS_DETAILS= `${BASE_URL}TravelMemberInfo/CreateTravelMemberinfo`; 
export const DELETE_PARTNERS= `${BASE_URL}TravelMemberInfo/deleteTravelMemberInfo`;  
export const EDIT_PARTNER_DETAILS= `${BASE_URL}TravelMemberInfo/UpdateTravelMemberInfo`;
export const GET_EWALLET_CREDTS_BALANCE= `${BASE_URL}EWalletcredit/GetEwalletBalance`;
export const CREATE_EWALLET_PAYMENT = `${BASE_URL}MyVoucherMaster`;
export const ADD_EWALLET_POINTS = `${BASE_URL}EWallet/CreateEwallet`;
export const GET_ALL_EWALLET_TRANSACTIONS = `${BASE_URL}EWalletcredit/GetAllEwallletTransaction`;
export const SEND_TICKET_QUERY= `${BASE_URL}OpenTicket/SendQueryMail`; 
export const GET_QUERY= `${BASE_URL}OpenTicket/GetAllOpenTicketquery`; 
//GetAllOpenTicketquerybyid
export const CLOSE_TICKET_QUERY= `${BASE_URL}OpenTicket/CloseTicket`; 
export const CREAT_BLOG= `${BASE_URL}Blogs/AddBlogs`;  
export const GET_ALL_BLOGS= `${BASE_URL}Blogs/AllBlogs`; 
export const GET_PENDING_QUERY= `${BASE_URL}OpenTicket/PendingOpenTicketquerybyid`;
export const GET_DONE_QUERY= `${BASE_URL}OpenTicket/GetAllCloseOpenTicket`;
export const GET_CATEGORY= `${BASE_URL}Category/GetAllCategory`;
export const GET_SUB_CATEGORY= `${BASE_URL}SubCategory/GetAllSubCategory`;
export const GET_HISTORY=`${BASE_URL}OpenTicket/ShowTicketHistory`;
export const ADD_QUERY_EMAIL = `${BASE_URL}OpenTicket/ReplyQueryMail`;
//Dashboard
export const OPEN_TICKET_QUERY= `${BASE_URL}OpenTicket/OpenTicket`;
export const GET_DASHBOARD_DETAILS=`${BASE_URL}Membership/GetMembershipLevel`;
export const GET_DASHBOARD_POINTS=`${BASE_URL}Membership/GetAllMember`;

export const GET_CURRENTPROMOTIONS=`${BASE_URL}VoucherMaster/GetAllCurrentMonthVoucher`;
export const GET_UPCOMINGPROMOTIONS=`${BASE_URL}VoucherMaster/GetAllUpcomingMonthVoucher`;
export function getMember(email, req_header) {
  return axios.get(GET_MEMBER_URL, {
    headers: req_header,
    params: { emailid: email },
  });
}
export function getWerkBalance(userid) {
  return axios.get(GET_WERKZCREDITS_BALANCE, {
    params: { userid: userid },
  });
}

export function updateMember(body, req_header) {
  return axios.post(UPDATE_MEMBER_URL, body, { headers: req_header });
}

export function updatePassword(body, req_header) {
  return axios.post(UPDATE_PASSWORD_URL, body, { headers: req_header });
}

export function getNotificationSettings(params, headers) {
  return axios.get(GET_NOTIFICATION_SETTING_URL, {
    params: params,
    headers: headers,
  });
}

export function updateNotificationSettings(body, req_header) {
  return axios.post(GET_NOTIFICATION_SETTING_URL, body, {
    headers: req_header,
  });
}

export function getCountry() {
  return axios.get(GET_COUNTRY_URL);
}

export function getCityByCountry(stId, couId) {
  return axios.get(GET_CITY_URL, {
    params: { stateId: stId, countryId: couId },
  });
}

export function getProvinceByCountry(id) {
  
  return axios.get(GET_PROVINCE_URL, { params: { countryid: id } });
}

export function getSecurityEmail(code, type) {
  return axios.get(GET_SECURITY_EMAIL, {
    params: { strencodedecode: code, type: type },
  });
}

// adding recommend hotels
export function getUserLocationDetails(req_header) {
  return axios.post(GET_USER_LOCATION_DETAILS, null, { headers: req_header });
}
export function getRecommededHotelsForUser(body, req_header) {
  return axios.post(GET_RECOMMENDED_HOTEL, body, { headers: req_header });
}
export function getAllCreditTransactions(id, header) {

  return axios.get(GET_ALL_CREDIT_TRANSACTIONS, {
    headers: header,
    params: { userid: id },
  });
}

export function getReferLink(email, req_header) {
  return axios.get(GET_REFER_LINK, {
    headers: req_header,
    params: { emailId: email },
  });
}

export function sendReferLink(refer, to, req_header) {
  return axios.post(
    SEND_REFER_LINK,
    { referlink: refer, tomailId: to },
    { headers: req_header }
  );
}

export function getAllVouchers(req_header) {
  return axios.get(GET_ALL_VOUCHERS, { headers: req_header });
}
export function getMyVouchers(req_header, params) {
  return axios.get(GET_MY_VOUCHERS, { headers: req_header, params: params });
}




export function getVoucherById(headers, params) {
  return axios.get(GET_VOUCHER_BY_ID_URL, { headers: headers, params });
}
export function buyGiftVoucher(req_header, body) {
  return axios.post(GET_MY_VOUCHERS, body, { headers: req_header });
}

export function bookingPayApi(req_header, body) {
  return axios.post(GET_MY_VOUCHERS, body, { headers: req_header });
}

export function redeemVoucher(req_header, body) {
  return axios.post(REDEEM_VOUCHER_URL, body, { headers: req_header });
}

export function applyVoucher(body) {
  return axios.post(APPLY_VOUCHER, body);
}

export function giftVoucher(req_header, body) {
  return axios.post(GIFT_VOUCHER_URL, body, { headers: req_header });
}

export function giftVoucherAccept(body) {
  return axios.post(GIFT_VOUCHER_ACCEPT, body);
}

export function getAllBookings(params) {
  return axios.get(GET_ALL_BOOKINGS, { params: params });
}

export function getMiddlewareCountries() {
  return axios.get(GET_MIDDLEWARE_COUNTRY);
}

export function getMiddlewareCurrencies() {
  return axios.get(GET_MIDDLEWARE_CURRENCY);
}

export function getMiddlewareProvider(body) {
  return axios.post(GET_MIDDLEWARE_PROVIDER, body);
}

export function paymentCreate(body) {
  return axios.post(GET_MIDDLEWARE_CREATE_PAYMENT, body);
}

export function getPaymentStatus(body) {
  return axios.post(GET_MIDDLEWARE_PAYMENT_STATUS, body);
}

export function getBookingDetailById(params) {
  return axios.get(GET_BOOKING_DETAIL_BY_ID_URL, { params });
}

export function getAllReviews(id) {
  return axios.get(GET_ALL_REVIEWS, { params: { userid: id } });
}

export function createNewReview(body) {
  return axios.post(CREATE_NEW_REVIEW, body);
}
export function getDashboardItems(id) {
  return axios.get(GET_DASHBOARD_ITEM, { params: { userid: id } });
}


export function addDashboardItems(body) {
  
  return axios.post(ADD_DASHBOARD_ITEM, body);
}

export function createNewCard(body) {
  return axios.post(CREATE_NEW_CARD, body);
}

export function getAllCards(id) {
  return axios.get(GET_ALL_CARDS, { params: { userid: id } });
}

export function deleteSelectedCard(id) {
  return axios.post(DELETE_CARD, null, { params: { cardid: id } });
}


export function getCardByCardId(id) {
  return axios.get(GET_CARD_BY_ID, { params: { cardid: id } });
}


export function editSelectedCard(body) {
  return axios.post(EDIT_CARD, body);
}

export function addCardAsPrimary(body){
  return axios.post(ADD_PRIMARY_CARD,body)
}


export function getPartners(id) {
  return axios.get(GET_PARTNERS_DETAILS, { params: { BookingRefNumber: id } });
}
export function addPartnerDetail(body){
  return axios.post(ADD_PARTNERS_DETAILS,body)
}

export function deletePartner(id) {
  return axios.post(DELETE_PARTNERS, null, { params: { id: id } });
}


export function editPartnerDetails(body) {
  return axios.post(EDIT_PARTNER_DETAILS, body); 
}

export function getEwalletCredit(id) {
  return axios.get(GET_EWALLET_CREDTS_BALANCE, { params: { userid: id } });
}

export function createEwalletcredit (req_header, body) {
  return axios.post(CREATE_EWALLET_PAYMENT, body, { headers: req_header });
}

export function addEwalletPoints(body) {
  return axios.post(ADD_EWALLET_POINTS, body);
}

export function getAllEwallletTransactions(id, header) {
  return axios.get(GET_ALL_EWALLET_TRANSACTIONS, {
    headers: header,
    params: { userid: id },
  });
}

export function sendTicketQuery(body,req_header){
  return axios.post(SEND_TICKET_QUERY,body,{ headers: req_header })
}
export function CloseTicket(body,req_header){
  console.log("CLOSE_TICKET_QUERY",CLOSE_TICKET_QUERY,body)
  return axios.post(CLOSE_TICKET_QUERY+`?id=${body.id}`,{ headers: req_header })
}
export function getMyQueris(id,status,req_header) {
  return axios.get(GET_QUERY,{ headers: req_header, params: { UserId: id,status:status } },);
}

export function addBlog(body) {
  return axios.post(CREAT_BLOG, body);
}

export function getMyBlogs(id) {
  return axios.get(GET_ALL_BLOGS, { params: { userid: id } });
}


export function getPendingQueries(userid,status) {
  return axios.get(GET_QUERY,{params: { UserId: userid,status:status }});
}
export function getAllHistory(userid) {
  console.log("inside crud",userid)
  return axios.get(GET_HISTORY,{params: { id: userid }});
}
export function getDoneQueries(userid,status){
  
  return axios.get(GET_QUERY,{params: { UserId: userid,status:status }});
}
export function getAllCategory(){
  return axios.get(GET_CATEGORY);
}
export function getAllSubCategory(id){
  return axios.get(GET_SUB_CATEGORY, { params: { CategoryId: id } });
}
export function getDashboardDetails(id){
  console.log("getting data",id)
  return axios.get(GET_DASHBOARD_DETAILS, { params: { UserId: id } });
}
export function getDashboardPoints(){
  return axios.get(GET_DASHBOARD_POINTS);
}

export function OpenTicket(body,req_header){
  return axios.post(OPEN_TICKET_QUERY+`?id=${body.id}`,{ headers: req_header })
}

export function getcurrentPromotions(){
  return axios.get(GET_CURRENTPROMOTIONS);
}
export function getupcomingPromotions(){
  console.log("calling")
  return axios.get(GET_UPCOMINGPROMOTIONS);
  
}
export function sendReplyEmail(body,headers) {
  return axios.post(ADD_QUERY_EMAIL, body, { headers: headers });
}