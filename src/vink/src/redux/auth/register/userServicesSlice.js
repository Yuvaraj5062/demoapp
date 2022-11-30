import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import  { popup } from "../../popup/popupSlice";
import { getUserServices } from "./userServicesCrud";

export const getUsersServices = createAsyncThunk(
  "userServices/getUsersServices",
  async ({dispatch, rejectWithValue }) => {
    try {
      const res = await getUserServices();
      if (res.data.status) {
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);





const userServices = createSlice({
  name: "getUsersServices",
  initialState: { 
    useServices:{},
    error: "",
     loading: false },
  reducers: {
    setDocUploadError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    /* 
    adding addressProof
    */
    [getUsersServices.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsersServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.useServices=action.payload
      state.error = null;
    },
    [getUsersServices.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

  },
});

export const { setDocUploadError } = userServices.actions;
export default userServices.reducer;
