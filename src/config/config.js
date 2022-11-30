// export const BASE_URL = "https://wcmbe-qa.archesoftronix.in/api/"; //QA
export const BASE_URL = "https://wcmbe-dev.archesoftronix.in/api/"; //DEV
//  export const BASE_URL = "https://wcmbe-uat.archesoftronix.in/api/"; //UAT
// export const BASE_URL ="http://192.168.1.116:1011/api/" //tanu
export default {
  default: {
    // login
    baseUrl: BASE_URL,
    login: BASE_URL + "Auth/Login",
    refreshtoken: BASE_URL + "Auth/GetRefreshToken",
    forgotPassword: BASE_URL + "Auth/ForgotPassword",
    passwordLink: BASE_URL + "Auth/CheckResetPasswordLink",
    resetPass: BASE_URL + "Auth/ResetPassword",
    //crm
    getOfficeDropdownData: BASE_URL + "Office/GetOfficeByCityId", //by id
    getifaDropdownData: BASE_URL + "IFA/GetAllIFA",
    getAccountTypeDropdownData: BASE_URL + "AccountType/GetAllAccountType",
    personalityTypeDropdownData:
      BASE_URL + "PersonalityType/GetAllPersonalityType",
    getconsultantDropdownData:
      BASE_URL + "WaltCapConsultant/GetAllWaltCapConsultant",
    addNewClient: BASE_URL + "User/AddClientPhase1",
    updateClient: BASE_URL + "User/UpdateClientPhase1",
    getifaDropdownData: BASE_URL + "IFA/GetAllIFA",
    getclientTypeData: BASE_URL + "ClientType/GetAllClientType",
    getAccountTypeDropdownData: BASE_URL + "AccountType/GetAllAccountType",
    personalityTypeDropdownData:
      BASE_URL + "PersonalityType/GetAllPersonalityType",
    getconsultantDropdownData:
      BASE_URL + "WaltCapConsultant/GetAllWaltCapConsultant",
    getsoftwareGroupDropdownData: BASE_URL + "Watch/GetAllGroups",
    getaccountNumber: BASE_URL + "User/GenerateAccountNo",
    addNewClient: BASE_URL + "User/AddClientPhase1",
    addNewClientPhase2: BASE_URL + "User/AddClientPhase2",
    addExternalAccount: BASE_URL + "ExternalAccount/AddExternalAccount",
    addNewOffice: BASE_URL + "Office/AddOffice",
    updateExternalAccount: BASE_URL + "ExternalAccount/UpdateExternalAccount",
    addNewOffice: BASE_URL + "Office/AddOffice",
    updateOffice: BASE_URL + "Office/UpdateOffice",
    deleteOfficeAccount: BASE_URL + "Office/DeleteOffice",
    getServiceProviderDropdownData:
      BASE_URL + "ServiceProvider/GetAllServiceProvider",
    getTypeDropdownData:
      BASE_URL + "ServiceProviderType/GetAllServiceProviderType",
    getexternalAccount:
      BASE_URL + "ExternalAccount/GetAllExternalAccountByUserId",
    deleteExternalAccount: BASE_URL + "ExternalAccount/DeleteExternalAccount",
    //common
    addNewCountry: BASE_URL + "Region/AddCountryCustom",
    updateCountry: BASE_URL + "Region/UpdateCountryCustom",
    updateState: BASE_URL + "Region/UpdateStateCustom",
    updateCity: BASE_URL + "Region/UpdateCityCustom",
    deleteCountry: BASE_URL + "Region/DeleteCountryCustom",
    deleteState: BASE_URL + "Region/DeleteStateCustom",
    deleteCity: BASE_URL + "Region/DeleteCityCustom",
    addNewState: BASE_URL + "Region/AddStateCustom",
    addNewCity: BASE_URL + "Region/AddCityCustom",
    getCountryDropdownData: BASE_URL + "Region/GetAllCountryCustom",
    getStateDropdownData: BASE_URL + "Region/GetAllStateCustomByCountryId",
    getCityDropdownData: BASE_URL + "Region/GetAllCityCustomByStateId",

    // watchList || Mange software access
    getAllGroups: BASE_URL + "Watch/GetAllGroups",
    getPrivileges: BASE_URL + "Watch/GetAllPrivileges",
    addNewGroup: BASE_URL + "AccessCategory/AddAccessCategory",
    deleteGroup: BASE_URL + "AccessCategory/DeleteAccessCategory",
    updatePrivilege: BASE_URL + "Watch/UpdatePrivileges",
    uploadCSV: BASE_URL + "UploadCSVDocument/UploadDocument",
    paginatedData: BASE_URL + "UploadCSVDocument/GetAllCSVDocumentData",

    // crm
    getAllClients: BASE_URL + "User/GetAllClient",
    //client profile
    getClientById: BASE_URL + "User/GetByClientId",
    // fund
    getFund: BASE_URL + "Fund/GetFundById",
    addNewFund: BASE_URL + "Fund/AddFund",
    deleteFund: BASE_URL + "Fund/DeleteFund",
    getFundList: BASE_URL + "Fund/GetFundList",
    updateFundStatus: BASE_URL + "Fund/UpdateFundStatus",
    updateFund: BASE_URL + "Fund/UpdateFund",
    // remeber to change base url
    getAllFundClients:
      BASE_URL + "FundAdministrationClient/GetAllFundAdministrationClient",
    // api/FundAdministrationClient/GetAllFundAdministrationClient

    //pricing
    getPricing: BASE_URL + "FundPricing/GetPricing",
    getUnitType: BASE_URL + "FactSheet/GetUnitTypeByFundId",
    getAddPricingDetail: BASE_URL + "FundPricing/GetAddPricingDetail",
    addPricing: BASE_URL + "FundPricing/AddPricing",

    //Portfolio
    getAllPortfolio: BASE_URL + "Portfolio/GetPortFolioData",
    getAllClientsByServiceProvider:
      BASE_URL + "Portfolio/GetPortfolioClientData",
    getAllCsvData: BASE_URL + "Portfolio/GetPortfolioCSVData",
    getAllPortfolio: BASE_URL + "Portfolio/GetPortFolioData",
    getPortfolioClients: BASE_URL + "Portfolio/GetPortfolioClientList",

    // factsheet

    addFactSheet: BASE_URL + "FactSheet/AddFactSheetDetails",
    updateFactSheet: BASE_URL + "FactSheet/UpdateFactSheet",
    getFactsheetByFundId: BASE_URL + "FactSheet/GetFactSheetByFundId",
    getAllClientsByServiceProvider:
      BASE_URL + "Portfolio/GetPortfolioClientData",
    // getAllClientsByServiceProvider:BASE_URL + "Portfolio/GetPortfolioClientData",
    getAllCsvData: BASE_URL + "Portfolio/GetPortfolioCSVData",
    getAllPortfolio: BASE_URL + "Portfolio/GetPortFolioData",
    getMonthlyPortfolio: BASE_URL + "FactSheet/GetFactSheetByFundId",
    getModelPortfolioComparison:
      BASE_URL + "FactSheet/GetModelPortfolioComparison",
    getRiskStatistics: BASE_URL + "FactSheet/GetRiskStatistics",
    getTopHoldings: BASE_URL + "FactSheet/GetTopHoldings",
    getPortfolioPerformance: BASE_URL + "FactSheet/GetPortfolioPerformance",
    getMonthlyPerformance: BASE_URL + "FactSheet/GetMonthlyPerformance",
    getFactsheetFieldsFromUnit:
      BASE_URL + "FactSheet/GetFactSheetFieldsFromUnit",
    //Birthday Report
    getbirthdayreports: BASE_URL + "BirthdayReport/GetBirthdayReports",

    //Ifa
    creteIfa: BASE_URL + "IFA/AddIFAPhase1",
    creteIfasPhase2: BASE_URL + "IFA/AddIFAPhase2",
    getIfaById: BASE_URL + "IFA/GetIFAById",
    updateIfaPhase1: BASE_URL + "IFA/UpdateIFA",
    ifaAccNumber: BASE_URL + "IFA/GenerateIFAAccountNo",
    getallIFAClient: BASE_URL + "IFA/GetAllIFAClient",
    getAllIFAList: BASE_URL + "IFA/GetAllIFAList",
    roles: BASE_URL + "Role/GetAllRole",
    softwareAccessGroup: BASE_URL + "Watch/GetAllGroups",

    //Client transaction

    getClientList: BASE_URL + "User/GetAllClientList",
    getFundForClientTransaction:
      BASE_URL + "ClientTransaction/GetFundForCTByFundId",
    getIfaByClientId: BASE_URL + "ClientTransaction/GetAllIFAbyClientId",
    editClientById: BASE_URL + "ClientTransaction/editClientById",

    // add new client transactoion
    addNewClientTransaction:
      BASE_URL + "ClientTransaction/AddClientTransaction",
    // get all transaction from fund id

    getAllClientTransaction:
      BASE_URL + "ClientTransaction/GetAllClientTransactionByFundId",

    //Manage Role
    getAllRole: BASE_URL + "Role/GetAllRole",
    addRole: BASE_URL + "Role/AddRole",
    updateRole: BASE_URL + "Role/UpdateRole",
    deleteClientTransaction:
      BASE_URL + "ClientTransaction/DeleteClientTransaction",

    getClientTransactionDetail:
      BASE_URL + "ClientTransaction/GetTranscationTypeByClientId",

    //OffShore
    getOffshoreList: BASE_URL + "Offshore/GetOffshoreClientList",
    offshoreCurrencyList: BASE_URL + "Currency/GetAllCurrency",

    //GetUnitTypeByFundId
    unitTypeByFundId: BASE_URL + "FactSheet/GetUnitTypeByFundId",
  },
};
