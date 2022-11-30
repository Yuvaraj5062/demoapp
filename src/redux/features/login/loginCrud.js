import axios from "axios";
import config from "../../../config/config";

export const Login = (payload) => {
  return axios.post(`${config.default.login}`, { data: payload });
};

export const sendForgotPassMail = (payload) => {
  return axios.post(`${config.default.forgotPassword}`, { data: payload });
};


export const checkPasswordExpiryLink = (payload) => {
  return axios.post(`${config.default.passwordLink}`, { data: payload });
};

export const passReset = (payload) => {
  return axios.post(`${config.default.resetPass}`, { data: payload });
};