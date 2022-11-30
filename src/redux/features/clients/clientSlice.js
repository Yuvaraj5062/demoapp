import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import { getClients } from "./clientCrud";

export const fetchAllClients = createAsyncThunk(
  "clients/fetchAllClients",
  async (payload, { rejectWithValue }) => {
    // console.log(payload, "in payload");
    try {
      const res = await getClients(encrypt(payload));
      if (res.status) {
        // console.log("clients res", res);
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
  name: "clients",
  initialState: {
    clients: [],
    isLoading: null,
    msg: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAllClients.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchAllClients.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.clients = action.payload;
    },
    [fetchAllClients.rejected]: (state, error) => {
      state.isLoading = false;
    },
  },
});

export default clientSlice.reducer;
