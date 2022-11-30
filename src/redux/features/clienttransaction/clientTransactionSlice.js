import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import {
  addNewClientTransaction,
  editClientTransactionById,
  getAllClientTransaction,
  getClientList,
  getFundClientTransaction,
  getIfaByClientId,
  getIFAList,
  deleteClientTransaction,
  getClientTransactionDetail,
} from "./clientTransactionCrud";

// GET CLIENT-LIST

export const fetchClientList = createAsyncThunk(
  "clienttransaction/fetchClientList",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getClientList(encrypt(payload));
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

// GET FUND FOR TRANSACTION

export const fetchFundForClientTransaction = createAsyncThunk(
  "clienttransaction/fetchFundForClientTransaction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getFundClientTransaction(encrypt(payload));
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

export const createClientTransaction = createAsyncThunk(
  "clienttransaction/createClientTransaction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await addNewClientTransaction(encrypt(payload));
      if (res.status) {
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// get ifa by client Id
export const fetchIfaByClientID = createAsyncThunk(
  "clienttransaction/fetchIfaByClientID",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getIfaByClientId(encrypt(payload));
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

// get all transaction by fund id

export const fetchAllClientTransaction = createAsyncThunk(
  "clienttransaction/fetchAllClientTransaction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getAllClientTransaction(encrypt(payload));
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

export const updateClientTransactionById = createAsyncThunk(
  "clienttransaction/updateClientTransactionById",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await editClientTransactionById(encrypt(payload));
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

export const deleteClientTransactionById = createAsyncThunk(
  "clienttransaction/deleteClientTransactionById",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await deleteClientTransaction(encrypt(payload));
      if (res.status) {
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get Total no of Units and type based on Client ID
export const getClientTransactionDetailByClientID = createAsyncThunk(
  "clienttransaction/getClientTransactionDetailByClientID",
  async (payload, {  rejectWithValue }) => {
    try {
      const res = await getClientTransactionDetail(encrypt(payload));
      if (res.status) {
        return res?.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const clientTransactionSlice = createSlice({
  name: "clienttransaction",
  initialState: {
    clientList: [],
    isLoading: null,
    msg: null,
    error: null,
    fund: null,
    ifa: [],
    clientTransactionDetails:{},
    transactions: {
      clientTransactionList: [],
      totalCount: 0,
    },
  },
  reducers: {
    clearState: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.msg = null;
      state.error = null;
      state.clientList = [];
      state.ifa = [];
      state.clientTransactionDetails={}
      state.transactions = action.payload.isClear ? {
        clientTransactionList: [],
        totalCount: 0,
      }:state.transactions;
    },
  },
  extraReducers: {
    // GET CLIENT-LIST

    [fetchClientList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchClientList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.clientList = action.payload;
    },
    [fetchClientList.rejected]: (state, error) => {
      state.isLoading = false;
    },

    // get ifa by client-id
    [fetchIfaByClientID.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchIfaByClientID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ifa = [{ id: 0, ifa: "None" }, ...action.payload];
    },
    [fetchIfaByClientID.rejected]: (state, error) => {
      state.isLoading = false;
    },

    [fetchFundForClientTransaction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchFundForClientTransaction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.fund = action.payload;
    },
    [fetchFundForClientTransaction.rejected]: (state, error) => {
      state.isLoading = false;
    },

    // Create Transaction

    [createClientTransaction.pending]: (state, action) => {
      state.isLoading = true;
      state.error= null
    },
    [createClientTransaction.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.fund = action.payload;
      state.msg = action.payload.message || "Trasaction Successfull";
    },
    [createClientTransaction.rejected]: (state, error) => {
      state.isLoading = false;
      state.error = state.error = error.payload || error.error.message;
    },

    // get all transaction by fund id

    [fetchAllClientTransaction.pending]: (state, action) => {
      state.isLoading = true;
      state.transactions = {
        clientTransactionList: [],
        totalCount: 0,
      };
      // state.error=null
    },
    [fetchAllClientTransaction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload;
    },
    [fetchAllClientTransaction.rejected]: (state, error) => {
      state.isLoading = false;
      // state.error = state.error = error.payload || error.error.message;
    },

    // update client transaction by id

    [updateClientTransactionById.pending]: (state) => {
      state.isLoading = true;
    },
    [updateClientTransactionById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.msg = action.payload.message;
    },
    [updateClientTransactionById.rejected]: (state, error) => {
      state.isLoading = false;
      state.error = state.error = error.payload || error.error.message;
    },

    [deleteClientTransactionById.pending]: (state) => {
      state.isLoading = true;
      state.error= null
    },
    [deleteClientTransactionById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.msg = action.payload.message;
    },
    [deleteClientTransactionById.rejected]: (state, error) => {
      state.isLoading = false;
      state.error = state.error = error.payload || error.error.message;
    },


    [getClientTransactionDetailByClientID.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getClientTransactionDetailByClientID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.clientTransactionDetails =action.payload;
    },
    [getClientTransactionDetailByClientID.rejected]: (state, error) => {
      state.isLoading = false;
    },
  },
});
export const { clearState } = clientTransactionSlice.actions;

export default clientTransactionSlice.reducer;
