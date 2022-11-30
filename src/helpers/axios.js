import axios from "axios";
import config from "../config/config";
import { store } from "../redux/store";
import { decrypt, encrypt } from "./cyptoAES";

const getProtectedResource = () => {
  const { userInfo } = store.getState().login;
  return { userInfo };
};

// axios.interceptors.request.use(
//   (config) => {
//     config["headers"]["Authorization"] =
//       "Bearer " + localStorage.getItem("token");
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (res) => {
//     let data;
//     if (res.data.status) {
//       const decryptres = JSON.parse(decrypt(res.data.data));
//       data = {
//         ...res.data,
//         data: decryptres,
//       };
//     } else {
//       data = res.data;
//     }
//     return data;
//     // return res;
//   },
//   async (error) => {
//     const originalConfig = error.config;

//     if (error.response) {
//       if (error.response.status === 401 && !originalConfig._retry) {
//         console.log(localStorage.getItem("token"));

//         return axios
//           .post(config.default.refreshtoken, {
//             data: encrypt({
//               token: localStorage.getItem("token"),
//               refreshToken: localStorage.getItem("refreshToken"),
//             }),
//           })
//           .then((res) => {
//             // console.log("token",res.data.token)
//             // console.log("retoken",res.data.refreshToken)
//             if (res.data.token) {
//               // console.log("refresh")
//               localStorage.setItem("token", res.data.token);
//               localStorage.setItem("refreshToken", res.data.refreshToken);
//               originalConfig.headers.Authorization = `Bearer ` + res.data.token;
//               return axios(originalConfig);
//             }
//           });
//       }
//     }
//   }
// );

const api = axios.create({
  baseURL: config.default.baseUrl,
});

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config["headers"]["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (res) {
    let data;
    // console.log("token",localStorage.getItem("token"))
    if (res.data.status) {
      const decryptres = JSON.parse(decrypt(res.data.data));
      data = {
        ...res.data,
        data: decryptres,
      };
    } else {
      data = res.data;
    }
    return data;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true;
      return axios
        .post(config.default.refreshtoken, {
          data: encrypt({
            token: localStorage.getItem("token"),
            refreshToken: localStorage.getItem("refreshToken"),
          }),
        })
        .then((res) => {
          if (res.data?.token) {
            // console.log('setting new refresh token ')
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            originalRequest.headers.Authorization = `Bearer ` + res.data.token;
            return axios(originalRequest);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.clear();
            window.location.href = "/";
          }
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.clear();
          window.location.href = "/";
        });
    }
    return Promise.reject(error);
  }
);

export default api;
