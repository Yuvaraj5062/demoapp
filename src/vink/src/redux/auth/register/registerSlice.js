import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { popup } from "../../popup/popupSlice";
import { setImages } from "./documentUploadSlice";
import { decrypt, encrypt } from "../../../helpers/cyptoAES";
import {
  addUser,
  fetchAccountType,
  fetchCategories,
  fetchCountries,
  fetchResendOTP,
  fetchSubCategories,
  fetchUserServices,
  fetchVerifyOTP,
  getSavedApplications,
  getUserById,
  postUserServices,
  updateUserDetail,
} from "./registerCrud";
import { redirectTo } from "../../../helpers/redirectToSavedSteps";

export const registerUser = createAsyncThunk(
  "register/rigisterUser",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await addUser(encrypt(payload));

      if (res.data.status) {
        dispatch(popup("OTPScreen"));
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };

        return data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCategory = createAsyncThunk(
  "register/getCategory",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await fetchCategories();
      let data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSubCategory = createAsyncThunk(
  "register/getSubCategory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchSubCategories(
        encrypt({
          categoryId: id,
        })
      );

      let data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAccountType = createAsyncThunk(
  "register/getAccountType",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchAccountType(
        encrypt({
          subCategoryId: id,
        })
      );

      let data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCountries = createAsyncThunk(
  "register/getCountries",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await fetchCountries(
        encrypt({
          countryId: 0,
        })
      );
      const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "register/verifyOTP",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetchVerifyOTP(encrypt(payload));
      if (res.data.status) {
        dispatch(popup("CameraAccessScreen"));
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        return data;
      } else {
        res.data?.data &&
          dispatch(setInvalidOtpCunt(res.data.data.invalidOTPCount));
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "register/resendOTP",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetchResendOTP(encrypt(payload));
      if (res.data.status) {
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };

        return data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUsersServices = createAsyncThunk(
  "register/getUsersServices",
  async ({}, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetchUserServices();

      if (res.data.status) {
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        return data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserServices = createAsyncThunk(
  "register/updateUserServices",
  async (payload, { dispatch, rejectWithValue, getState }) => {
    try {
      const res = await postUserServices(encrypt(payload));
      if (res.data.status) {
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        // dispatch(popup("SignupSuccess"));
        const { userInfo } = getState().register;

        dispatch(popup("RegisterModalReadOnly"));
        dispatch(getUsersById(userInfo.data.userId));
        return data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUsersById = createAsyncThunk(
  "register/getUsersById",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await getUserById(encrypt({ userId: id }));
      if (res.data.status) {
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        return data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserById = createAsyncThunk(
  "register/updateUserById",
  async ({}, { rejectWithValue, dispatch, getState }) => {
    try {
      const { userInfo } = getState().register;
      const res = await updateUserDetail(encrypt(userInfo.data));

      if (res.data.status) {
        dispatch(popup("SignupSuccess"));
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSavedApplication = createAsyncThunk(
  "register/getSavedApplication",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await getSavedApplications(encrypt(payload));
      if (res.data.status) {
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        data.data.completedScreen.toString() === "PhotoUploadScreen" &&
          dispatch(setImages(data.data.data));


        data.data.completedScreen.toString() === "UserServicesScreen" &&
        dispatch(getUsersById(data.data.userId));
       
       
        redirectTo(data.data.completedScreen.toString(), dispatch);
        return data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    userInfo: {},
    userServices: [],
    step: null,
    status: null,
    loading: false,
    category: [],
    subCategory: [],
    accountType: [],
    countries: [],
    error: null,
    otpResendTime: "",
    otpAttempt: 3,
    UserId: null,
    expiresOn: null,
    refreceNumber: null,
  },
  reducers: {
    resetSubCatAndAccType: (state, action) => {
      if (state.subCategory.length !== 0 || state.accountType.length !== 0) {
        /* gracefull handeling, remove all subcat and account-type before chnaging */
        state.subCategory = [];
        state.accountType = [];
      }
    },

    cancelError: (state, action) => {
      state.error = null;
    },
    closeSuccess: (state, action) => {
      state.status = null;
      state.error = null;
    },
    setInvalidOtpCunt: (state, action) => {
      state.otpAttempt = 3 - Number(action.payload);
    },
  },
  extraReducers: {
    /* 
    Add user/Register user 
    */
    [registerUser.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      // state.status = action.payload.message;
      state.error = null;
    },
    [registerUser.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
    /*   
      Get categories form server
   */
    [getCategory.pending]: (state) => {
      state.loading = false;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload.data;
      state.error = null;
    },
    [getCategory.rejected]: (state, error) => {
      state.loading = true;
      //state.error = error.payload || error.error.message; //check
    },
    /*   
      Get subCategories form server
   */
    [getSubCategory.pending]: (state, action) => {
      state.loading = false;
    },
    [getSubCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.subCategory = action.payload.data;
      state.error = null;
    },
    [getSubCategory.rejected]: (state, error) => {
      state.loading = false;
      // state.error = error.payload || error.error.message; //check
    },
    /*   
      Get AccountType form server
   */
    [getAccountType.pending]: (state, action) => {
      state.loading = false;
    },
    [getAccountType.fulfilled]: (state, action) => {
      state.loading = false;
      state.accountType = action.payload.data;
      state.error = null;
    },
    [getAccountType.rejected]: (state, error) => {
      state.loading = false;
      // state.error = error.payload || error.error.message; //check
    },
    /* 
    Get Countries form server
     */
    [getCountries.pending]: (state, action) => {
      state.loading = false;
    },
    [getCountries.fulfilled]: (state, action) => {
      state.loading = false;
      state.countries = action.payload.data;
      state.error = null;
    },
    [getCountries.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
    /* 
    validate otp againts backend
    */
    [verifyOTP.pending]: (state, action) => {
      state.loading = true;
    },
    [verifyOTP.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.userInfo = action.payload;
      // state.status = action.payload.message;
      state.expiresOn = action.payload.data.registrationExpiryDate;
      state.refreceNumber = action.payload.data.userReferenceId;
    },
    [verifyOTP.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
    /* 
      resend  otp againts backend
      */
    [resendOTP.pending]: (state, action) => {
      state.loading = true;
    },
    [resendOTP.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      //state.status = action.payload.message;
    },
    [resendOTP.rejected]: (state, error) => {
      state.loading = false;
      //state.status = "";
      state.error = error.payload || error.error.message; //check
    },
    /* 
    Get Premiun User services from server
    */
    [getUsersServices.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsersServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.userServices = action.payload.data.map((item) => {
        return { ...item, check: false };
      });
      state.error = null;
    },
    [getUsersServices.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    /* 
     Get User by id
    */
    [getUsersById.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsersById.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    [getUsersById.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    /* 
      Update User services
    */
    [updateUserServices.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUserServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateUserServices.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    /* 
      Update User By Id - userConfirmation api
    */
    [updateUserById.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUserById.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateUserById.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    /* 
     Get User Saved Application 
    */
    [getSavedApplication.pending]: (state, action) => {
      state.loading = true;
    },
    [getSavedApplication.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
      state.expiresOn = action.payload.data.registrationExpiryDate;
      state.refreceNumber = action.payload.data.userReferenceId;
    },
    [getSavedApplication.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
  },
});

export const {
  resetSubCatAndAccType,
  cancelError,
  closeSuccess,
  setInvalidOtpCunt,
} = registerSlice.actions;
export default registerSlice.reducer;
