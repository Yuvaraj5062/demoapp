import axios from "axios";
import { baseURL } from "../../../config/baseUrl";

export const fetchUploadUserImage = (payload) => {
  return axios.post(`${baseURL}/User/AddProfilePhoto`,payload,{ headers: { "Content-Type": "multipart/form-data" }});
};

// payload = {userId, files}
