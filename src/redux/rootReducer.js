import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ClientProfileReducer from "./features/clientprofile/clientProfileSlice";
import ClientReducer from "./features/clients/clientSlice";
import CommonReducer from "./features/common/commonSlice";
import CRMReducer from "./features/crm/crmSlice";
import AddFundReducer from "./features/fundadministrator/addFunSlice";
import fundClientReducer from "./features/fundadministrator/fund-clientList/fundClientListSlice";
import LoginReducer from "./features/login/loginSlice";
import PortfolioReducer from "./features/portfolio/portfolioSlice";
import PricingReducer from "./features/pricing/pricingSlice";
import RegisterReducer from "./features/register/registerSlice";
import WatchListReducer from "./features/watchlist/watchListSlice";
// import FactsheetReducer from "./features/fundadministrator/factsheet/fachsheetSlice";
import FactSheetReducer from "./features/factsheet/factSheetSlice";
import IfaReducer from "./features/ifa/ifaSlice";
import RoleReducer from "./features/managerole/manageroleSlice";
import OffshoreReducer from "./features/offshore/offShoreSlice";

// import FactSheetReducer from "./features/factsheet/factSheetSlice";
// import IfaReducer from "./features/ifa/ifaSlice";
import ClientTransactionReducer from "./features/clienttransaction/clientTransactionSlice";
const persistConfig = {
  storage,
  key: "walt-user",
  whitelist: ["userInfo"],
};

const PeristedLoginReducer = persistReducer(persistConfig, LoginReducer);

export const rootReducer = combineReducers({
  register: RegisterReducer,
  login: PeristedLoginReducer,
  crm: CRMReducer,
  watchlist: WatchListReducer,
  common: CommonReducer,
  client: ClientReducer,
  clientProfile: ClientProfileReducer,
  addFund: AddFundReducer,
  portfolio: PortfolioReducer,
  pricing: PricingReducer,
  // factsheet:FactsheetReducer,
  factSheet: FactSheetReducer,
  ifa: IfaReducer,
  clientTransaction: ClientTransactionReducer,
  managerole: RoleReducer,
  offShore: OffshoreReducer,
  fundClients: fundClientReducer,
});
