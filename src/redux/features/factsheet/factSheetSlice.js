import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import {
  addFactsheet,
  factsheetFromUnit,
  fetchUnitTypeByFundId,
  getFactsheetByFundId,
  getMonthlyPerformance,
  getMonthlyPortfolio,
  getPortfolioPerformance,
  modelPortfolioComparison,
  riskStatistics,
  topHoldings,
  updateFactsheet
} from "./factSheetCrud";

export const fetchMonthlyPortfolio = createAsyncThunk(
  "factsheet/fetchMonthlyPortfolio",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getMonthlyPortfolio(encrypt(payload));
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

export const fetchModelPortfolioComparison = createAsyncThunk(
  "factsheet/fetchModelPortfolioComparison",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await modelPortfolioComparison(encrypt(payload));
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

// Risk Statistics

export const fetchRiskStatistics = createAsyncThunk(
  "factsheet/fetchRiskStatistics",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await riskStatistics(encrypt(payload));
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

// Fetch Top Holdings

export const fetchTopHoldings = createAsyncThunk(
  "factsheet/fetchTopHoldings",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await topHoldings(encrypt(payload));
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
// create new factsheet
export const createFactsheet = createAsyncThunk(
  "factsheet/createFactsheet",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await addFactsheet(encrypt(payload));
      if (res) {
        // const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//getPortfolioPerformance
export const fetchPortfolioPerformance = createAsyncThunk(
  "factsheet/fetchPortfolioPerformance",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getPortfolioPerformance(encrypt(payload));
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

//getMonthlyPerformance
export const fetchMonthlyPerformance = createAsyncThunk(
  "factsheet/fetchMonthlyPerformance",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getMonthlyPerformance(encrypt(payload));
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

// get factsheet by fund id
export const getFactSheetByFundId = createAsyncThunk(
  "factsheet/getFactSheetByFundId",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await getFactsheetByFundId(encrypt(payload));
      if (res) {
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update factsheet by id

export const updateFactSheet = createAsyncThunk(
  "factsheet/updateFactSheet",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await updateFactsheet(encrypt(payload));
      if (res) {
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//get factsheetfields from unit
export const getFactsheetFieldsUnit = createAsyncThunk(
  "factsheet/getFactsheetFieldsUnit",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await factsheetFromUnit(encrypt(payload));
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


export const getUnitTypeByFundId = createAsyncThunk(
  "factsheet/getUnitTypeByFundId",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetchUnitTypeByFundId(encrypt(payload));
      if (res) {
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const factSheetSlice = createSlice({
  name: "factsheet",
  initialState: {
    factsheetdata: [],
    factsheet: {},
    monthlyPortfolioData: {},
    portfolioComparisonData: [],
    riskStatisticsData: [],
    topHoldingsData: [],
    portFolioPerformanceData: [],
    monthlyPerformanceData: [],
    status: null,
    loading: false,
    error: "",
    msg: "",
    unit: {},
    unitTypeList:[]
  },
  reducers: {
    clearState: (state, action) => {
      // alert('clear')
      state.error = null;
      state.loading = false;
      state.status = null;
      state.msg = null;
      state.error = null;
      state.factsheet = {};
    },
  },
  extraReducers: {
    // Monthly Portfolio Fact Sheet

    [fetchMonthlyPortfolio.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchMonthlyPortfolio.fulfilled]: (state, action) => {
      state.loading = false;
      state.monthlyPortfolioData = action.payload;
    },
    [fetchMonthlyPortfolio.rejected]: (state, error) => {
      state.loading = false;
      state.monthlyPortfolioData = {};
    },

    // Model Portfolio Comparison

    [fetchModelPortfolioComparison.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchModelPortfolioComparison.fulfilled]: (state, action) => {
      state.loading = false;
      state.portfolioComparisonData = action.payload;
    },
    [fetchModelPortfolioComparison.rejected]: (state, error) => {
      state.monthlyPortfolioData = [];
      state.loading = false;
    },

    //Risk Statistics

    [fetchRiskStatistics.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchRiskStatistics.fulfilled]: (state, action) => {
      state.loading = false;
      state.riskStatisticsData = action.payload;
    },
    [fetchRiskStatistics.rejected]: (state, error) => {
      state.loading = false;
      state.riskStatisticsData = [];
    },

    // Top Holdings

    [fetchTopHoldings.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTopHoldings.fulfilled]: (state, action) => {
      state.loading = false;
      state.topHoldingsData = action.payload;
    },
    [fetchTopHoldings.rejected]: (state, error) => {
      state.loading = true;
      state.topHoldingsData = [];
    },

    // getPortfolioPerformance

    [fetchPortfolioPerformance.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPortfolioPerformance.fulfilled]: (state, action) => {
      state.loading = false;
      state.portFolioPerformanceData = action.payload;
    },
    [fetchPortfolioPerformance.rejected]: (state, error) => {
      state.loading = false;
      state.portFolioPerformanceData = [];
    },

    // fetchMonthlyPerformance

    [fetchMonthlyPerformance.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchMonthlyPerformance.fulfilled]: (state, action) => {
      state.loading = false;
      state.monthlyPerformanceData = action.payload;
    },
    [fetchMonthlyPerformance.rejected]: (state, error) => {
      state.loading = false;
      state.monthlyPerformanceData = [];
    },

    // create fact sheet
    [createFactsheet.pending]: (state) => {
      // state.status= null,
      state.loading = true;
      state.error = null
    },
    [createFactsheet.fulfilled]: (state, action) => {
      state.loading = false;
      state.msg = action.payload.message;
    },
    [createFactsheet.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    // get factsheet by fund id

    [getFactSheetByFundId.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [getFactSheetByFundId.fulfilled]: (state, action) => {
      state.loading = false;

      state.factsheet = action.payload.data;
    },
    [createFactsheet.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    // update factsheet

    [updateFactSheet.pending]: (state) => {
      // state.status= null,
      state.loading = true;
      state.error = null
    },
    [updateFactSheet.fulfilled]: (state, action) => {
      state.loading = false;
      state.msg = action.payload.message;
    },
    [updateFactSheet.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    [fetchPortfolioPerformance.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPortfolioPerformance.fulfilled]: (state, action) => {
      state.loading = false;
      state.portFolioPerformanceData = action.payload;
    },
    [fetchPortfolioPerformance.rejected]: (state, error) => {
      state.loading = false;
      state.portFolioPerformanceData = [];
    },

    // fetchMonthlyPerformance

    [fetchMonthlyPerformance.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchMonthlyPerformance.fulfilled]: (state, action) => {
      state.loading = false;
      state.monthlyPerformanceData = action.payload;
    },
    [fetchMonthlyPerformance.rejected]: (state, error) => {
      state.loading = false;
      state.monthlyPerformanceData = [];
    },

    // create fact sheet
    [createFactsheet.pending]: (state) => {
      // state.status= null,
      state.loading = true;
      state.error = null
    },
    [createFactsheet.fulfilled]: (state, action) => {
      state.loading = false;
      state.msg = action.payload.message;
    },
    [createFactsheet.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    // get factsheet by fund id

    [getFactSheetByFundId.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [getFactSheetByFundId.fulfilled]: (state, action) => {
      state.loading = false;
      state.factsheet = action.payload.data || {};
    },
    [createFactsheet.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    // update factsheet

    [updateFactSheet.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [updateFactSheet.fulfilled]: (state, action) => {
      state.loading = false;
      state.msg = action.payload.message;
    },
    [updateFactSheet.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    // getFactsheetFieldsUnit
    [getFactsheetFieldsUnit.pending]: (state) => {
      state.loading = true;
    },
    [getFactsheetFieldsUnit.fulfilled]: (state, action) => {
      state.loading = false;
      // state.monthlyPortfolioData = {
      //   ...state.monthlyPortfolioData,
      //   ...action.payload,
      // };
      state.unit = action.payload;
    },
    [getFactsheetFieldsUnit.rejected]: (state, error) => {
      state.loading = false;
      state.unit=[]
    },


    [getUnitTypeByFundId.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [getUnitTypeByFundId.fulfilled]: (state, action) => {
      state.loading = false;
      state.unitTypeList = action.payload.data;
    },
    [getUnitTypeByFundId.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    
  },
});
export const { clearState } = factSheetSlice.actions;

export default factSheetSlice.reducer;
