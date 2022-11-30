import axios from "axios";
import { baseURL } from "../../../config/baseUrl";

export const getUserServices = () => {
  return axios.get(`${baseURL}/Service/GetServices` );
};