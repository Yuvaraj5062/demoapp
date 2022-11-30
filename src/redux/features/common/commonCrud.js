import axios from "axios";
import config from "../../../config/config";
export const getCountryDropdown = () => {
  return axios.post(config.default.getCountryDropdownData);
};

export const getStateDropdown = (payload) => {
  return axios.post(config.default.getStateDropdownData, { data: payload });
};

export const getCityDropdown = (payload) => {
  return axios.post(config.default.getCityDropdownData, { data: payload });
};
export const birthdayReport = (payload) => {
  return axios.post(config.default.getbirthdayreports, { data: payload });
};
