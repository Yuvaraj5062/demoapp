import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import { clearAccountNum, selectedId } from "../crm/crmSlice";
import {
  birthdayReport,
  getCityDropdown,
  getCountryDropdown,
  getStateDropdown
} from "./commonCrud";

export const countryDropdown = createAsyncThunk(
  "common/countryDropdown",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await getCountryDropdown();
      if (res) {
        if (res.statusCode === 200) {
          let id = res.data;
          if (id.length > 0) {
            dispatch(selectedId(id[id.length - 1].countryId));
          }
        }
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const stateDropdown = createAsyncThunk(
  "common/stateDropdown",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await getStateDropdown(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          let id = res.data.stateList;
          if (id.length > 0) {
            dispatch(selectedId(id[id.length - 1].stateId));
          }
        }
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cityDropdown = createAsyncThunk(
  "common/cityDropdown",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await getCityDropdown(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          let id = res.data.cityList;
          if (id.length > 0) {
            dispatch(selectedId(id[id.length - 1].cityId));
          }
        }
        dispatch(clearAccountNum());
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllReports = createAsyncThunk(
  "common/fetchAllReports",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await birthdayReport(encrypt(payload));
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
const CommonSlice = createSlice({
  name: "common",
  initialState: {
    countryDropdownData: [],
    stateDropdownData: [],
    cityDropdownData: [],
    reports: [],
    countryDetail: null,
    stateDetail: null,
    status: null,
    loading: false,
  },
  reducers: {
    clearStateList: (state, action) => {
      state.stateDropdownData = [];
    },
    clearCityList: (state, action) => {
      state.cityDropdownData = [];
    },
    clearStateDetail: (state, action) => {
      state.stateDetail = null;
    },
  },
  extraReducers: {
    /* 
    Country dropdown data 
    */
    [countryDropdown.pending]: (state) => {
      //  state.loading = true;
    },
    [countryDropdown.fulfilled]: (state, action) => {
      // state.loading = false;
      if (action.payload.statusCode === 200) {
        state.countryDropdownData = action.payload.data;
      }
    },
    [countryDropdown.rejected]: (state, error) => {
      state.loading = false;
    },
    /*  
State Type dropdown data 
*/
    [stateDropdown.pending]: (state) => { },
    [stateDropdown.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.countryDetail = {
          countryId: action.payload?.data?.countryId,
          countryName: action.payload?.data?.countryName,
        };
        state.stateDropdownData = action.payload?.data?.stateList;
      }
    },

    [stateDropdown.rejected]: (state, error) => { },
    /*  
City dropdown data 
    */
    [cityDropdown.pending]: (state) => { },
    [cityDropdown.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.stateDetail = {
          stateId: action.payload?.data?.stateId,
          stateName: action.payload?.data?.stateName,
        };
        state.cityDropdownData = action.payload?.data?.cityList;
      }
    },
    [cityDropdown.rejected]: (state, error) => { },
    [fetchAllReports.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAllReports.fulfilled]: (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    },
    [fetchAllReports.rejected]: (state, error) => {
      state.loading = true;
    },
  },
});

export const { clearStateList, clearCityList, clearStateDetail } =
  CommonSlice.actions;
export default CommonSlice.reducer;
