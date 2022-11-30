import axios from "axios";
import config from "../../../config/config";

// get all client list for client transaction
export const getClientList = (payload) => {
  return axios.post(`${config.default.getClientList}`, { data: payload });
};

// get fund for client transaction

export const getFundClientTransaction = (payload) => {
  return axios.post(`${config.default.getFundForClientTransaction}`, {
    data: payload,
  });
};

// add new client transaction

export const addNewClientTransaction = (payload) => {
  return axios.post(`${config.default.addNewClientTransaction}`, {
    data: payload,
  });
};

// get ifa by client Id

export const getIfaByClientId = (payload) => {
  return axios.post(`${config.default.getIfaByClientId}`, { data: payload });
};

// get all transaction by fund if
export const getAllClientTransaction = (payload) => {
  return axios.post(`${config.default.getAllClientTransaction}`, {
    data: payload,
  });
};

// edit client transaction
export const editClientTransactionById = (payload) => {
  return axios.post(`${config.default.editClientById}`, { data: payload });
};

// get client transaction detail by client

export const deleteClientTransaction = (payload) => {
  return axios.post(`${config.default.deleteClientTransaction}`, {
    data: payload,
  });
};
export const getClientTransactionDetail = (payload) => {
  return axios.post(`${config.default.getClientTransactionDetail}`, {
    data: payload,
  });
};
