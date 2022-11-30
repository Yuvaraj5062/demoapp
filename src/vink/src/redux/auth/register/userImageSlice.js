import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { popup } from "../../popup/popupSlice";
import { fetchUploadUserImage } from "./userImageCrud";

export const uploadUserImage = createAsyncThunk(
  "userImage/uploadUserImage",
  async (payload, { dispatch, rejectWithValue, getState }) => {
    try {
      const res = await fetchUploadUserImage(payload);
      if (res.data.status) {
        dispatch(popup("BankingApplicationScreen"));
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userImageSlice = createSlice({
  name: "userImage",
  initialState: {
    loading: false,
    error: null,
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
    setImageUploadError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [uploadUserImage.pending]: (state) => {
      state.loading = true;
    },
    [uploadUserImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      // state.status = action.payload.message;
    },
    [uploadUserImage.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
  },
});
export const { cancelError, closeSuccess, setImageUploadError } =
  userImageSlice.actions;
export default userImageSlice.reducer;
