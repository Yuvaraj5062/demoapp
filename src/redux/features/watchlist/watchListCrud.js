import axios from "axios";
import config from "../../../config/config";

export const getGroups = (payload) => {
  return axios.post(config.default.getAllGroups, { data: payload });
};

export const getPrivileges = (payload) => {
  return axios.post(config.default.getPrivileges, { data: payload });
};

export const newGroup = (payload) => {
  return axios.post(config.default.addNewGroup, { data: payload });
};

export const deleteGroup = (payload) => {
  return axios.post(config.default.deleteGroup, { data: payload });
};

export const updatePrivileges = (payload) => {
  return axios.post(config.default.updatePrivilege, { data: payload });
};

export const uploadCsvData = (payload) => {
  return axios.post(config.default.uploadCSV, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDataPaginated = (payload) => {
  return axios.post(config.default.paginatedData, { data: payload });
};
