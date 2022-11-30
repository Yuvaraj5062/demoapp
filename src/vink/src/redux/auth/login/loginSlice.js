import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { decrypt, encrypt } from "../../../helpers/cyptoAES";
import { Login } from "./loginCrud";

export const loginRequest = createAsyncThunk(
  "auth/loginRequest",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await Login(encrypt(payload));

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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    userInfo: {},
    error: null,
    status: null,
  },
  reducers: {
    getUser: (state) => {
      state.userInfo = {};
    },
    logOut: (state) => {
      state.userInfo = null;
    },

    cancelError: (state, action) => {
      state.error = null;
    },

  },
  extraReducers: {
    
    [loginRequest.pending]: (state) => {
      state.loading = true;
    },
    [loginRequest.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      // state.status = "success";
      // localStorage.setItem("token", JSON.stringify(action.payload)); // todo checkfor interceptor
    },
    [loginRequest.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
  },
});

export const { getUser, logOut,cancelError } = authSlice.actions;
export default authSlice.reducer;
