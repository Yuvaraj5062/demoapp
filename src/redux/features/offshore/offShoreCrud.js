import axios from "axios";
import config from "../../../config/config";

export const fetchOffShoreList = (payload) => {
    return axios.post(`${config.default.getOffshoreList}`, { data: payload });
};
export const fetchOffshoreCurrencyList = (payload) => {
    return axios.post(`${config.default.offshoreCurrencyList}`, { data: payload });
};