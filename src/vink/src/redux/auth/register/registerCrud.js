import axios from "axios";
import { baseURL } from "../../../config/baseUrl";

export const addUser = (payload) => {
  return axios.post(`${baseURL}/User/AddUser`, { data: payload });
};

export const fetchCategories = () => {
  return axios.post(`${baseURL}/Category/GetCategories`);
};

export const fetchSubCategories = (id) => {
  return axios.post(
    `${baseURL}/SubCategory/GetSubCategoriesById
  `,
    { data: id }
  );
};

export const fetchAccountType = (id) => {
  return axios.post(`${baseURL}/AccountType/GetAccountTypeById`, { data: id });
};

export const fetchCountries = (id) => {
  return axios.post(`${baseURL}/Region/GetCountries`, { data: id });
};

export const fetchVerifyOTP = (payload) => {
  return axios.post(`${baseURL}/User/VerifyOTP`, { data: payload });
};

export const fetchResendOTP = (payload) => {
  return axios.post(`${baseURL}/User/ResendOTP`, { data: payload });
};

export const fetchUserServices = () => {
  return axios.post(`${baseURL}/Service/GetServices`);
};

export const postUserServices = (payload) => {
  return axios.post(`${baseURL}/User/UpdateUserServices`, { data: payload });
};

export const getUserById = (payload) => {
  return axios.post(`${baseURL}/User/GetUserById`, { data: payload });
};

export const updateUserDetail = (payload) => {
  return axios.post(`${baseURL}/User/UpdateUser`, { data: payload });
};

export const getSavedApplications = (payload) => {
  return axios.post(`${baseURL}/User/GetSavedApplicationDetail`, { data: payload });
};