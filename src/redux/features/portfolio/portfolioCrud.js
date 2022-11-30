import axios from "axios";
import config from "../../../config/config";

export const getPortfolio = (payload) => {
  return axios.post(`${config.default.getAllPortfolio}`,{ data: payload });
};

export const getClientsByServiceProvider = (payload) => {
  return axios.post(`${config.default.getAllClientsByServiceProvider}`, { data: payload });
};

export const getCsvData = (payload) => {
  return axios.post(`${config.default.getAllCsvData}`, { data: payload });
};

export const getPortfolioClientData = (payload) => {
  return axios.post(`${config.default.getPortfolioClients}`, { data: payload });
};
