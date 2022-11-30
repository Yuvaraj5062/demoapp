import axios from "axios";
import config from "../../../config/config";

export const getFund = (payload) => {
  return axios.post(`${config.default.getFund}`, { data: payload });
};

export const addNewFund = (payload) => {
  return axios.post(`${config.default.addNewFund}`, { data: payload });
};

export const getFundList = (payload) => {
  return axios.post(`${config.default.getFundList}`, { data: payload });
};

export const deleteFundById = (payload) => {
  return axios.post(`${config.default.deleteFund}`, { data: payload });
};

export const updateFundById = (payload) => {
  return axios.post(`${config.default.updateFund}`, { data: payload });
};

// activate deactivate
export const updateFundStatusReq = (payload) => {
  return axios.post(`${config.default.updateFundStatus}`, { data: payload });
};
