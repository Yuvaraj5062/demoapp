import axios from "axios";
import config from "../../../config/config";

export const getPricing = (payload) => {
  return axios.post(`${config.default.getPricing}`, { data: payload });
};

export const getUnitType = (payload) => {
  return axios.post(`${config.default.getUnitType}`, { data: payload });
};

export const getAddPricingDetail = (payload) => {
  return axios.post(`${config.default.getAddPricingDetail}`, { data: payload });
};

export const addPricingCrud = (payload) => {
  return axios.post(`${config.default.addPricing}`, { data: payload });
};