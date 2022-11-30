import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import { addPricingCrud, getAddPricingDetail, getPricing, getUnitType } from "./pricingCrud";

export const fetchPricingData = createAsyncThunk(
  "pricing/fetchPricingData",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getPricing(encrypt(payload));
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

export const fetchUnitByFundId = createAsyncThunk(
  "pricing/fetchUnitByFundId",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getUnitType(encrypt(payload));
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

export const fetchAddPricingDetail = createAsyncThunk(
  "pricing/fetchAddPricingDetail",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getAddPricingDetail(encrypt(payload));
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

export const addPricing = createAsyncThunk(
  "pricing/addPricing",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await addPricingCrud(encrypt(payload));
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

const pricingSlice = createSlice({
  name: "pricing",
  initialState: {
    pricingData: [],
    unitType:[],
    pricingInputField:[],
    pricingInputValidataions:{},
    isLoading: null,
    msg: null,
    error: null,
    status:null
  },
  reducers: {},
  extraReducers: {
    [fetchPricingData.pending]: (state, action) => {
      state.isLoading = true;
      state.error= null;
      state.status=null
    },
    [fetchPricingData.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.pricingData = action.payload;
    },
    [fetchPricingData.rejected]: (state, error) => {
      state.isLoading = true;
    },

    [fetchUnitByFundId.pending]: (state, action) => {
      state.isLoading = true;
      state.error= null;
      state.status=null
    },
    [fetchUnitByFundId.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.unitType = ["All",...action.payload?.unitType];
    },
    [fetchUnitByFundId.rejected]: (state, error) => {
      state.isLoading = true;
    },

    [fetchAddPricingDetail.pending]: (state, action) => {
      state.isLoading = true;
      state.error= null;
      state.status=null
    },
    [fetchAddPricingDetail.fulfilled]: (state, action) => {
      state.isLoading = true;
      // state.pricingInputValidataions=action.payload?.dynamicPricingInputValidation[0]
      state.pricingInputField=action.payload?.dynamicPricingInputFields
      for (let i=0;i<action.payload?.dynamicPricingInputFields.length;i++){
        state.pricingInputValidataions[action.payload?.dynamicPricingInputFields[i]]=
        {required: {
          value: true,
          message: `Please enter ${action.payload?.dynamicPricingInputFields[i]}`,
        },
      }
      }
    },
    [fetchAddPricingDetail.rejected]: (state, error) => {
      state.isLoading = true;
    },

    [addPricing.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addPricing.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.status=action.payload?.status
      state.error=action.payload?.message
    },
    [addPricing.rejected]: (state, error) => {
      state.isLoading = true;
    },
  },
});

export default pricingSlice.reducer;
