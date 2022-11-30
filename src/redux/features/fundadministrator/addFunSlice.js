import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFundInitalPayload } from "../../../helpers/addFundInitPayload";
import { encrypt } from "../../../helpers/cyptoAES";
import {
  addNewFund,
  deleteFundById,
  getFund,
  getFundList,
  updateFundById,
  updateFundStatusReq
} from "./addFundCrud";

export const addFund = createAsyncThunk(
  "addFund/addFund",
  async (payload, { dispatch, rejectWithValue }) => {
    const newisVatApp = payload.isVatapplicable === "YES" ? true : false;
    const newPayload = { ...payload, isVatapplicable: newisVatApp };
    try {
      const res = await addNewFund(encrypt(newPayload));

      if (res.status) {
        try {
          dispatch(getAllFunds({ isActive: false }));
        } catch (error) {}
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllFunds = createAsyncThunk(
  "addFund/getAllFunds",
  async (payload, { rejectWithValue }) => {
    const { data, method } = payload;
    try {
      const res = await getFundList(encrypt(payload));
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

export const getFundById = createAsyncThunk(
  "addFund/getFundById",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getFund(encrypt(payload));
      console.log(res.data, "funddata");
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

export const deleteFund = createAsyncThunk(
  "addFund/deleteFund",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await deleteFundById(encrypt(payload));

      if (res.status) {
        try {
          dispatch(
            // getAllFunds({ data: { isActive: true }, method: "activeFunds" })
            getAllFunds(encrypt({ isActive: false }))
          );
        } catch (error) {}
        return res.message;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFund = createAsyncThunk(
  "addFund/updateFund",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const newisVatApp = payload.isVatapplicable === "YES" ? true : false;
      const newPayload = { ...payload, isVatapplicable: newisVatApp };
      console.log("payload", payload);
      const res = await updateFundById(encrypt(newPayload));

      if (res.status) {
        try {
          dispatch(
            // getAllFunds({ data: { isActive: true }, method: "activeFunds" })
            getAllFunds(encrypt({ isActive: false }))
          );
        } catch (error) {}
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// / activate dactivate funds  /
export const updateFundStatus = createAsyncThunk(
  "addFund/updateFundStatus",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await updateFundStatusReq(encrypt(payload));
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

const AddFundSlice = createSlice({
  name: "addFund",
  initialState: {
    loading: false,
    currSelectedFund: "",
    fundDetail: {},
    fundList: [],
    allTypeFundList: [],
    msg: "",
    error: "",
  },
  reducers: {
    emptyFundDetails: (state, action) => {
      state.fundDetail = addFundInitalPayload;
    },
    setSelectedCurrFund: (state, action) => {
      state.currSelectedFund = action.payload;
    },
    emptyErrors: (state, action) => {
      state.error = "";
      state.msg = "";
      state.currSelectedFund = "";
    },
  },
  extraReducers: {
    /* 
    add new fund
     */
    [addFund.pending]: (state, action) => {
      state.loading = true;
      state.msg = "";
      state.error = "";
    },
    [addFund.fulfilled]: (state, action) => {
      state.loading = false;
      state.msg = "Fund Added";
    },
    [addFund.rejected]: (state, error) => {
      state.msg = "";
      state.loading = false;
      state.error = state.error = error.payload || error.error.message;
    },

    /* 
    get Fund by id
    */
    [getFundById.pending]: (state, action) => {
      state.loading = true;
    },
    [getFundById.fulfilled]: (state, action) => {
      state.loading = false;
      state.fundDetail = { ...action.payload, id: action.payload.fundId };
    },
    [getFundById.rejected]: (state, error) => {
      state.loading = false;
    },

    /* 
    get List of all funds
    */
    [getAllFunds.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllFunds.fulfilled]: (state, action) => {
      state.loading = false;

      state.allTypeFundList = action.payload;
      const v = [...action.payload.filter((item) => item.isActive === true)];

      state.fundList = v;

      // if (action.payload.method === "allTypeFund") {
      //   state.allTypeFundList = action.payload.data;
      // } else {
      //   state.fundList = action.payload.data;
      // }
    },
    [getAllFunds.rejected]: (state, error) => {
      state.loading = false;
    },

    /* 
    delete fund by id 
    */
    [deleteFund.pending]: (state, action) => {
      state.loading = true;
      state.msg = "";
      state.error = "";
    },
    [deleteFund.fulfilled]: (state, action) => {
      state.loading = false;
      state.msg = action.payload;
    },
    [deleteFund.rejected]: (state, error) => {
      state.loading = false;
      state.msg = "";
      state.error = state.error = error.payload || error.error.message;
    },
    /* 
    update fund 
    */
    [updateFund.pending]: (state, action) => {
      state.loading = true;
      state.msg = "";
    },
    [updateFund.fulfilled]: (state, action) => {
      state.loading = false;
      state.msg = "Fund updated successfully";
    },
    [updateFund.rejected]: (state, error) => {
      state.loading = false;
      state.msg = "";
      state.error = state.error = error.payload || error.error.message;
    },
  },
});

export const { emptyFundDetails, emptyErrors, setSelectedCurrFund } =
  AddFundSlice.actions;
export default AddFundSlice.reducer;

// getAllFunds
