import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import {
  getClientsByServiceProvider,
  getCsvData,
  getPortfolio,
  getPortfolioClientData
} from "./portfolioCrud";

export const fetchAllPortfolio = createAsyncThunk(
  "portfolio/fetchAllPortfolio",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getPortfolio(encrypt(payload));
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

export const fetchAllClientsByServiceProvider = createAsyncThunk(
  "portfolio/fetchAllClientsByServiceProvider",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getClientsByServiceProvider(encrypt(payload));
      if (res.data) {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPortfolioClients=createAsyncThunk(
  "portfolio/fetchPortfolioClients",
  async (payload,{rejectWithValue})=>{
    try {
      const res = await getPortfolioClientData(encrypt(payload));
      if (res.status) {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const fetchAllPortfolioCsvData = createAsyncThunk(
  "portfolio/fetchAllPortfolioCsvData",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getCsvData(encrypt(payload));
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

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    portfolioData: [],
    clientDetail: null,
    clientsList: [],
    portfolioCsvData: [],
    portfolioClientList:[],
    isLoading: null,
    isLoadingServiceProvider: null,
    investmentDetail:null,
    msg: null,
    error: null,
  },
  reducers: {
    clearState: (state, action) => {
      state.error = null;
      state.portfolioData = [];
      state.clientDetail=[]
      state.portfolioClientList=[]
      state.error = "";
      state.status = null;
    },
  },
  extraReducers: {
    [fetchAllPortfolio.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchAllPortfolio.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.portfolioData = action.payload?.portfolioServiceProviders;
      state.clientDetail=action.payload?.portfolioClientDetail
      state.investmentDetail=action.payload?.portfolioClientInvestmentDetail
      console.log(
        "action portfolio",
        action.payload
      );
    },
    [fetchAllPortfolio.rejected]: (state, error) => {
      state.isLoading = false;
    },

    [fetchAllClientsByServiceProvider.pending]: (state, action) => {
      state.isLoadingServiceProvider = true;
    },
    [fetchAllClientsByServiceProvider.fulfilled]: (state, action) => {
      state.isLoadingServiceProvider = false;
      state.clientsList = action.payload;
    },
    [fetchAllClientsByServiceProvider.rejected]: (state, error) => {
      state.isLoadingServiceProvider = false;
    },

    //csv data
    [fetchAllPortfolioCsvData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchAllPortfolioCsvData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.portfolioCsvData = action.payload;
    },
    [fetchAllPortfolioCsvData.rejected]: (state, error) => {
      state.isLoading = false;
    },

    //portFolio clients list
    [fetchPortfolioClients.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchPortfolioClients.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("action portfolioClientList", action.payload)
      state.portfolioClientList = action.payload;
    },
    [fetchPortfolioClients.rejected]: (state, error) => {
      state.isLoading = false;
    },
  },
});
export const { clearState } = portfolioSlice.actions;
export default portfolioSlice.reducer;
