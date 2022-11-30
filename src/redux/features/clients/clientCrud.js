import axios from "axios";
import config from "../../../config/config";

export const getClients = (payload) => {
  return axios.post(`${config.default.getAllClients}`, { data: payload });
};
