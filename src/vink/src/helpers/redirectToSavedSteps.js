import { popup } from "../redux/popup/popupSlice";

export const redirectTo = (name, dispatch) => {
  if (name === "OTPScreen") {
    dispatch(popup("CameraAccessScreen"));
  }

  if (name === "PhotoUploadScreen") {
    dispatch(popup("BankingApplicationScreen"));
  }

  if (name === "DocumentUploadScreen") {
    dispatch(popup("UserServicesScreen"));
  }

  if(name === "UserServicesScreen"){
    dispatch(popup('RegisterModalReadOnly'))
  }
  if(name === "UserDetailConfirmScreen"){
    dispatch(popup('LoginScreen'))
  }
};



