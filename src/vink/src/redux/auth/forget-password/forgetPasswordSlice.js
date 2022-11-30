import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { decrypt, encrypt } from "../../../helpers/cyptoAES";
import {
  getforgetPasswordLink,
  resetPasswordLinkExpire,
  resetPassword,
} from "./forgetPasswordCrud";

export const sendForgetPasswordLink = createAsyncThunk(
  "forgetPassword/sendForgetPasswordLink",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getforgetPasswordLink(encrypt(payload));
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

export const sendResetPasswordLinkExpire = createAsyncThunk(
  "forgetPassword/resetPasswordLinkExpire",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await resetPasswordLinkExpire(encrypt(payload));
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

export const sendResetPassword = createAsyncThunk(
  "forgetPassword/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await resetPassword(encrypt(payload));
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

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState: {
    error: "",
    loading: false,
    status: null,
  },
  reducers: {
    cancelError: (state, action) => {
      state.error = null;
    },
    closeSuccess: (state, action) => {
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: {
    // Send ForgetPassword Link

    [sendForgetPasswordLink.pending]: (state, action) => {
      state.loading = true;
    },
    [sendForgetPasswordLink.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.status = action.payload.message;
    },
    [sendForgetPasswordLink.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message;
    },

    // Reset Password Link Expire

    [resetPasswordLinkExpire.pending]: (state, action) => {
      state.loading = true;
    },
    [resetPasswordLinkExpire.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [resetPasswordLinkExpire.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message;
    },

    // Reset Password

    [sendResetPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [sendResetPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.status = action.payload.message;
    },
    [sendResetPassword.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message;
    },
  },
});

export const { closeSuccess, cancelError } = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
