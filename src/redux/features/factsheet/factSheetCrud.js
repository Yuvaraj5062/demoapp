import axios from "axios";
import config from "../../../config/config";

export const getMonthlyPortfolio = (payload) => {
  return axios.post(`${config.default.getMonthlyPortfolio}`, { data: payload });
};

export const modelPortfolioComparison = (payload) => {
  return axios.post(`${config.default.getModelPortfolioComparison}`, {
    data: payload,
  });
};

export const riskStatistics = (payload) => {
  return axios.post(`${config.default.getRiskStatistics}`, { data: payload });
};

export const topHoldings = (payload) => {
  return axios.post(`${config.default.getTopHoldings}`, { data: payload });
};
// create new factsheet
export const addFactsheet = (payload) => {
  return axios.post(config.default.addFactSheet, { data: payload });
};
export const getPortfolioPerformance = (payload) => {
  return axios.post(`${config.default.getPortfolioPerformance}`, {
    data: payload,
  });
};

export const getMonthlyPerformance = (payload) => {
  return axios.post(`${config.default.getMonthlyPerformance}`, {
    data: payload,
  });
};

// get factsheet by fund id

export const getFactsheetByFundId = (payload) => {
  return axios.post(config.default.getFactsheetByFundId, { data: payload });
};

// update factsheet

export const updateFactsheet = (payload) => {
  return axios.post(config.default.updateFactSheet, { data: payload });
};
//get factsheetfields from unit

export const factsheetFromUnit = (payload) => {
  return axios.post(config.default.getFactsheetFieldsFromUnit, {
    data: payload,
  });
};

export const fetchUnitTypeByFundId = (payload) => {
  return axios.post(config.default.unitTypeByFundId, {
    data: payload,
  });
};


