import axios from "axios";
import { baseURL } from "../../../config/baseUrl";

export const addAddressProof = (payload) => {
  return axios.post(`${baseURL}/User/AddAddressProof`, payload);
};

export const addIdProof = (payload) => {
  return axios.post(`${baseURL}/User/AddIdProof`, payload);
};

export const UpdateUploadDocumentStatus = (payload) => {
  return axios.post(`${baseURL}/User/UpdateUploadDocumentStatus`, {
    data: payload,
  });
};

export const deleteDocument = (payload) => {
  return axios.post(`${baseURL}/User/DeleteDocument`, {
    data: payload,
  });
};
