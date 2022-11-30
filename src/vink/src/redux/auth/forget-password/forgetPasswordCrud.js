import axios from "axios";
import { baseURL } from "../../../config/baseUrl";

export const getforgetPasswordLink = (payload) => {
  return axios.post(`${baseURL}/ForgotPassword/SendResetPasswordMail`, {
    data: payload,
  });
};

export const resetPasswordLinkExpire = (payload) => {
  return axios.post(`${baseURL}/ForgotPassword/ResetPasswordLinkExpiry`, {
    data: payload,
  });
};

export const resetPassword = (payload) => {
  return axios.post(`${baseURL}/ForgotPassword/ResetPassword`, {
    data: payload,
  });
};
