import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;
export const LOGIN_URL = `${BASE_URL}Auth`;
export const CHECK_EMAIL_URL = `${BASE_URL}SignUp/CheckEmailId`;
export const CHECK_PHONE_URL = `${BASE_URL}SignUp/CheckPhoneno`;
export const REGISTER_URL = `${BASE_URL}SignUp`;
export const CREATE_PASSWORD_URL = `${BASE_URL}SignUp/changepwd`;
export const UPDATE_PASSWORD_URL = `${BASE_URL}SignUp/changepwd`;
export const REQUEST_PASSWORD_URL = `${BASE_URL}ForgotPassword/setpassword`;
export const GET_USER_URL = `${BASE_URL}Profile/GetProfile`;
export const GET_GOOGLE_DATA = `${BASE_URL}SocialLogin`;
export const CHECK_EXPIRY_URL = `${BASE_URL}CheckURL`;

const header = { headers: { "Content-Type": "application/json" } };

export function login(email, password,countryName,currencyCode,currencyName) {
  return axios.post(LOGIN_URL, { "userName": email, "password": password,"countryName":countryName,"currencyCode":currencyCode,"currencyName":currencyName }, header);
}

export function socialLogin(body) {
  return axios.post(GET_GOOGLE_DATA, body);
}

export function register(email, contactNo, dialCode, referLink) {
  return axios.post(REGISTER_URL, { "emailId": email, "contactNo": contactNo, "countryCode": dialCode, "referBY": referLink }, header);
}

export function emailExists(email) {
  // return axios.get(CHECK_EMAIL_URL, { "emailId": email }, header);
  return axios.get(CHECK_EMAIL_URL, { params: { emailId: email } }, header);

}

export function phoneExists(code, phone) {
  return axios.get(CHECK_PHONE_URL, { params: { countryCode: code, phoneNo: phone } }, header);

}

export function checkExpiryUrl(params) {
  return axios.get(CHECK_EXPIRY_URL, { params: params }, header)
}

export function createPassword(body) {
  return axios.post(CREATE_PASSWORD_URL, body);
}

export function updatePassword(body, req_header) {
  return axios.post(UPDATE_PASSWORD_URL, body, { headers: req_header });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { "emailId": email }, header);
}

export function getUser(email, headerBody) {
  return axios.get(GET_USER_URL, { headers: headerBody, params: { "emailid": email } });
}

export function getUserByToken(key) { }


export function getCountry(email, headerBody) {
  return axios.get('https://ipapi.co/json/')
}
