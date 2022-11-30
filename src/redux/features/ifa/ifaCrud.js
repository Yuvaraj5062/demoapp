import axios from "axios";
import config from "../../../config/config";

export const creteIfas = (payload) => {
  return axios.post(`${config.default.creteIfa}`, { data: payload });
};

export const creteIfaPhase2 = (payload) => {
  return axios.post(`${config.default.creteIfasPhase2}`, { data: payload });
};

export const getOfficeDropdown = (payload) => {
  return axios.post(config.default.getOfficeDropdownData, { data: payload });
};
export const getAllIFA = (payload) => {
  return axios.post(`${config.default.getallIFAClient}`, { data: payload });
};

export const getAllIFAList = (payload) => {
  return axios.post(`${config.default.getAllIFAList}`, { data: payload });
};

export const fetchIfaByIfaId = (payload) => {
  return axios.post(`${config.default.getIfaById}`, { data: payload });
};

export const updateIfaPhase1 = (payload) => {
  return axios.post(`${config.default.updateIfaPhase1}`, { data: payload });
};

export const generateIfaAccNumber = () => {
  return axios.post(`${config.default.ifaAccNumber}`);
};

export const fetchSoftAccessGroup = (payload) => {
  return axios.post(`${config.default.softwareAccessGroup}`, { data: payload });
};

export const fetchRoles = (payload) => {
  return axios.post(`${config.default.roles}`, { data: payload });
};





