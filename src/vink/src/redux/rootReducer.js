import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./auth/login/loginSlice";
import RegisterReducer from "./auth/register/registerSlice";
import UserImageReducer from "./auth/register/userImageSlice";
import StepReducer from "./popup/popupSlice";
import DcoumentUploadReducer from "./auth/register/documentUploadSlice";
import ForgetPasswordSliceReducer from "./auth/forget-password/forgetPasswordSlice";

const persistConfig = {
  storage,
  key: "vink-user",
  whitelist: ["userInfo"],
};

const PersitedAuthReducer = persistReducer(persistConfig, AuthReducer);

export const rootReducer = combineReducers({
  auth: PersitedAuthReducer,
  register: RegisterReducer,
  step: StepReducer,
  userImage: UserImageReducer,
  documentUpload: DcoumentUploadReducer,
  forgetPassword: ForgetPasswordSliceReducer,
});
