import config from "../../../config/config";
import axios from "axios";
export const getOfficeDropdown = (payload) => {
  return axios.post(config.default.getOfficeDropdownData, { data: payload });
};

export const getpersonalityTypeDropdown = () => {
  return axios.post(config.default.personalityTypeDropdownData);
};

export const getconsultantDropdown = () => {
  return axios.post(config.default.getconsultantDropdownData);
};
export const getifaDropdownDropdown = () => {
  return axios.post(config.default.getifaDropdownData);
};

export const getclientTypeDropdown = () => {
  return axios.post(config.default.getclientTypeData);
};

export const getAccountTypeDropdown = () => {
  return axios.post(config.default.getAccountTypeDropdownData);
};

export const getSoftwareGroupDropdown = (payload) => {
  return axios.post(config.default.getsoftwareGroupDropdownData, {
    data: payload,
  });
};
export const getAccountNumber = (payload) => {
  return axios.post(config.default.getaccountNumber, { data: payload });
};
export const getOfficeById = (payload) => {
  return axios.post(config.default.getofficeById, { data: payload });
};
export const addClient = (payload) => {
  return axios.post(config.default.addNewClient, { data: payload });
};
export const updateClient = (payload) => {
  return axios.post(config.default.updateClient, { data: payload });
};
export const addClientPage2 = (payload) => {
  return axios.post(config.default.addNewClientPhase2, { data: payload });
};

export const addOffice = (payload) => {
  return axios.post(config.default.addNewOffice, { data: payload });
};
export const addCountry = (payload) => {
  return axios.post(config.default.addNewCountry, { data: payload });
};
export const addState = (payload) => {
  return axios.post(config.default.addNewState, { data: payload });
};
export const addCity = (payload) => {
  return axios.post(config.default.addNewCity, { data: payload });
};
export const updateOfficeCrud = (payload) => {
  return axios.post(config.default.updateOffice, { data: payload });
};
export const updateCountryCrud = (payload) => {
  return axios.post(config.default.updateCountry, { data: payload });
};
export const updateStateCrud = (payload) => {
  return axios.post(config.default.updateState, { data: payload });
};

export const updateCityCrud = (payload) => {
  return axios.post(config.default.updateCity, { data: payload });
};

export const getserviceProviderDropdown = () => {
  return axios.post(config.default.getServiceProviderDropdownData);
};

export const gettypeDropdown = () => {
  return axios.post(config.default.getTypeDropdownData);
};

export const addExternalAccountCrud = (payload) => {
  return axios.post(config.default.addExternalAccount, { data: payload });
};

export const editExternalAccountCrud = (payload) => {
  return axios.post(config.default.updateExternalAccount, { data: payload });
};
export const deleteExternalAccountCrud = (payload) => {
  return axios.post(config.default.deleteExternalAccount, { data: payload });
};
export const deleteOfficeCrud = (payload) => {
  return axios.post(config.default.deleteOfficeAccount, { data: payload });
};
export const deleteCountryCrud = (payload) => {
  return axios.post(config.default.deleteCountry, { data: payload });
};
export const deleteStateCrud = (payload) => {
  return axios.post(config.default.deleteState, { data: payload });
};
export const deleteCityCrud = (payload) => {
  return axios.post(config.default.deleteCity, { data: payload });
};

export const getExternalAccount = (payload) => {
  return axios.post(config.default.getexternalAccount, { data: payload });
};
