import axios from "axios";
import { baseURL } from "./baseUrl";
import { decrypt } from "./cyptoAES";

const api = axios.create({
  baseURL: baseURL,
});

const getLocalAccessToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
const getLocalRefreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken;
};

api.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    localStorage.setItem("token", token);
    if (token) {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      //config['headers']['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    const data = { ...res.data, data: decrypt(res.data.data) };
    return data;
  },
  async (error) => {
    const originalConfig = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const response = await refreshToken();
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          originalConfig.headers.Authorization =
            `Bearer ` + response.data.Data?.Token;
          return axios(originalConfig);
        } catch (error) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        }
      }
    }
  }
);

function refreshToken() {
  return axios.post(baseURL + "refreshToken", {
    token: getLocalAccessToken(),
    refreshToken: getLocalRefreshToken(),
  });
}
