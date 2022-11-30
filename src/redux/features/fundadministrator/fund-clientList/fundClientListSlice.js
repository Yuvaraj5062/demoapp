import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../../helpers/cyptoAES";
import { getAllFundsClient } from "./fundClientListCrud";

export const fetchAllFundClients = createAsyncThunk(
  "fundClients/fetchAllFundClients",
  async (payload, { rejectWithValue, dispatch }) => {
    console.log(payload);
    try {
      const res = await getAllFundsClient(encrypt(payload));

      if (res.status) {
        console.log(res.data);
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const clientSlice = createSlice({
  name: "fundClients",
  initialState: {
    fundClientsList: [],

    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchAllFundClients.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchAllFundClients.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.fundClientsList = action.payload.fundAdministrationClientList || [];
      state.fundClientsList = {
        ...action.payload,
        fundAdministrationClientList:
          action.payload.fundAdministrationClientList || [],
      };
    },
    [fetchAllFundClients.rejected]: (state, error) => {
      state.isLoading = false;
      state.fundClientsList = {
        fundAdministrationClientList: [],
      };
      state.error = error.payload || error.error.message;
    },
  },
});

export default clientSlice.reducer;
