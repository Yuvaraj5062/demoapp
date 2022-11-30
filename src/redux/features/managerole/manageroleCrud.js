import axios from "axios";
import config from "../../../config/config";

export const GetAllRoleList = (payload) => {
  return axios.post(`${config.default.getAllRole}`, { data: payload });
};
export const AddRole = (payload) => {
  return axios.post(`${config.default.addRole}`, { data: payload });
};
export const UpdateRole = (payload) => {
  return axios.post(`${config.default.updateRole}`, { data: payload });
};
