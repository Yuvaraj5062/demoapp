import axios from "axios";
import config from "../../../config/config";

export const getUserData = (payload) => {
  return axios.post(config.default.getClientById, { data: payload });
};
