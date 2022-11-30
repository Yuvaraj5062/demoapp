import axios from "axios";
import config from "../../../../config/config";

export const getAllFundsClient = (payload) => {
  return axios.post(`${config.default.getAllFundClients}`, { data: payload });
};
