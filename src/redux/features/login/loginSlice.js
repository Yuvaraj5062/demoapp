import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt, encryptString } from "../../../helpers/cyptoAES";
import {
  checkPasswordExpiryLink,
  Login,
  passReset,
  sendForgotPassMail
} from "./loginCrud";

export const userLogin = createAsyncThunk(
  "Login/userLogin",
  async (payload, { rejectWithValue }) => {
    const newPayload = { ...payload, password: encryptString(payload.password) };

    try {
      const res = await Login(encrypt(newPayload));
      if (res.status) {
        if (res.data.accessControl.length === 0) {
          throw new Error("Not allowed , Ask administrator for permissions");
        }
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "Login/forgotPassword",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const res = await sendForgotPassMail(encrypt(payload));
      if (res.status) {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const passwordLinkCheck = createAsyncThunk(
  "Login/passwordLinkCheck",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await checkPasswordExpiryLink(encrypt(payload));
      if (res.status) {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "Login/resetPassword",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const res = await passReset(encrypt(payload));
      if (res.status) {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    userInfo: {},
    isLoading: false,
    error: "",
    isMobileAuthPending: false,
    msg: null,
    isPasswordResetDone: null,
  },
  reducers: {
    setToDefault: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isMobileAuthPending = false;
      state.msg = null;
      state.userInfo = {};
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.isMobileAuthPending = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.userInfo = action.payload;
      state.error = null;
      state.isMobileAuthPending = false;
    },
    [userLogin.rejected]: (state, error) => {
      state.isMobileAuthPending = false;
      state.isLoading = false;

      state.error = error.payload || error.error.message; //check
    },
    /* 
    handling forgot password
    */
    [forgotPassword.pending]: (state, action) => {
      state.isLoading = true;
      state.msg = "";
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.msg = "Password Reset link has been sent to your email";
    },
    [forgotPassword.rejected]: (state, error) => {
      state.isLoading = false;
    },
    /* 
    check password expiry link
    */
    [passwordLinkCheck.pending]: (state, action) => {
      state.isLoading = true;
    },
    [passwordLinkCheck.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.msg = "password link checked";
    },
    [passwordLinkCheck.rejected]: (state, error) => {
      state.msg = null;
      state.isLoading = false;
    },
    /* 
    check password expiry link
    */
    [resetPassword.pending]: (state, action) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isPasswordResetDone = "Password Reset Successfully";
    },
    [resetPassword.rejected]: (state, error) => {
      state.isLoading = false;
    },
  },
});

export const { setToDefault } = LoginSlice.actions;
export default LoginSlice.reducer;
