import axios from "axios";
import { baseURL } from "../../../config/baseUrl";

export const Login = (payload) => {
  return axios.post(`${baseURL}/Auth/Login`, {data:payload});
};
