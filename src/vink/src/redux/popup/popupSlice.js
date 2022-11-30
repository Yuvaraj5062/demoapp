import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { LoginModal } from "../../components/modal/login-modal/LoginModal";
import RegisterModal from "../../components/modal/register-modal/RegisterModal";
import OtpVerificatoinModal from "../../components/modal/otp-verification-modal/OtpVerificationModal";
import AccessCameraModal from "../../components/modal/access-camera-modal/AccessCameraModal";
import CapturePhotoModal from "../../components/modal/capture-photo-modal/CapturePhotoModal";
import AccessCameraBlockModal from "../../components/modal/access-camera-blocked-modal/AccessCameraBlockModal";
import BankingApplicationModal from "../../components/modal/banking-application-modal/BankingApplicationModal";
import UploadProfilePictureModal from "../../components/modal/upload-profile-picture-modal/UploadProfilePictureModal";
import PersonalAccountModal from "../../components/modal/personal-account-modal/PersonalAccountModal";
import RegisterModalReadOnly from "../../components/modal/register-modal-readonly/RegisterModalReadOnly";
import SignupModal from "../../components/modal/signup-modal/SignupModal";
import { ForgetPasswordModal } from "../../components/modal/forget-password-modal/ForgetPasswordModal";
import ResetPasswordModal from "../../components/modal/reset-password-modal/ResetPasswordModal";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    popup: false,
    step: null,
    children: null,
  },
  reducers: {
    popup: (state, action) => {
      const childrens = [
        { LoginScreen: LoginModal },
        { RegistrationScreen: RegisterModal },
        { OTPScreen: OtpVerificatoinModal },
        { CameraAccessScreen: AccessCameraModal },
        { AccessCameraBlockScreen: AccessCameraBlockModal },
        { CapturePhotoScreen: CapturePhotoModal },
        { UploadProfileScreen: UploadProfilePictureModal },
        { BankingApplicationScreen: BankingApplicationModal },
        { UserServicesScreen: PersonalAccountModal },
        { RegisterModalReadOnly: RegisterModalReadOnly },
        { SignupSuccess: SignupModal },
        { ForgetPasswordScreen: ForgetPasswordModal },
        { ResetPassScreen: ResetPasswordModal },
      ];
      state.popup = true;
      state.step = action.payload;
      const child = childrens.find((e) => Object.keys(e)[0] === action.payload);
      state.children = child[action.payload];
    },

    closePopup: (state, action) => {
      state.popup = false;
      state.step = null;
      state.children = null;
    },
  },
});

export const { popup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
