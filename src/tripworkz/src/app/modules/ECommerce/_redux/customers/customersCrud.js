import axios from "axios";

export const CUSTOMERS_URL = "api/customers";

const BASE_URL = process.env.REACT_APP_URL;
export const GET_MEMBER_URL = `${BASE_URL}member/member-get`;
export const UPDATE_MEMBER_URL = `${BASE_URL}member/editmemberbysignup`;
export const GET_COUNTRY_URL = `${BASE_URL}country/get`;
export const GET_CITY_URL = `${BASE_URL}city/get-by-country-key`;
export const GET_PROVINCE_URL = `${BASE_URL}province/get-by-country-key`;

const header = { headers: { "Content-Type": "application/json" } };

export function getMember(email) {
  return axios.post(GET_MEMBER_URL, { "email-id": email }, header);
}

export function updateMember(body) {
  return axios.post(UPDATE_MEMBER_URL, body, header);
}

export function getCountry(body, req_header) {
  return axios.post(GET_COUNTRY_URL, body, { req_header });
}

export function getCityByCountry(body, req_header) {
  return axios.post(GET_CITY_URL, body, { req_header });
}

export function getProvinceByCountry(body, req_header) {
  return axios.post(GET_PROVINCE_URL, body, { req_header });
}






// CREATE =>  POST: add a new customer to the server
export function createCustomer(customer) {
  return axios.post(CUSTOMERS_URL, { customer });
}

// READ
export function getAllCustomers() {
  return axios.get(CUSTOMERS_URL);
}

export function getCustomerById(customerId) {
  return axios.get(`${CUSTOMERS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
  return axios.post(`${CUSTOMERS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateCustomer(customer) {
  return axios.put(`${CUSTOMERS_URL}/${customer.id}`, { customer });
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteCustomer(customerId) {
  return axios.delete(`${CUSTOMERS_URL}/${customerId}`);
}

// DELETE Customers by ids
export function deleteCustomers(ids) {
  return axios.post(`${CUSTOMERS_URL}/deleteCustomers`, { ids });
}
