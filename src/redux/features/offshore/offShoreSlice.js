import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import { fetchOffshoreCurrencyList, fetchOffShoreList } from "./offShoreCrud";

export const getOffshoreList = createAsyncThunk(
    "offShore/getOffshoreList",
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchOffShoreList(encrypt(payload));
            if (res.status) {
                return res.data;
            } else {
                throw new Error(res.data?.message || res?.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const getOffshoreCurrency = createAsyncThunk(
    "offShore/getOffshoreCurrency",
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchOffshoreCurrencyList(encrypt(payload));
            if (res.status) {
                return res.data;
            } else {
                throw new Error(res.data?.message || res?.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const offShoreSlice = createSlice({
    name: "offShore",
    initialState: {
        status: null,
        loading: false,
        error: "",
        msg: '',
        offshoreList: [],
        offshoreCurrencyList:[]

    },
    reducers: {
        clearState: (state, action) => {
            // alert('clear')
            state.error = null;
            state.loading = false;
            state.status = null;
            state.msg = null;
            state.offshoreCurrencyList=[];
            state.offshoreList=[]

        },
    },
    extraReducers: {
        [getOffshoreList.pending]: (state, action) => {
            //  state.loading = true;
        },
        [getOffshoreList.fulfilled]: (state, action) => {
            state.loading = false;
            state.offshoreList = action.payload;
        },
        [getOffshoreList.rejected]: (state, error) => {
            state.offshoreList=[]
            state.loading = false;
        },

        [getOffshoreCurrency.pending]: (state, action) => {
            //  state.loading = true;
        },
        [getOffshoreCurrency.fulfilled]: (state, action) => {
            state.loading = false;
            state.offshoreCurrencyList = action.payload;
        },
        [getOffshoreCurrency.rejected]: (state, error) => {
            state.loading = false;
        },

    },

});
export const {
    clearState,
} = offShoreSlice.actions;

export default offShoreSlice.reducer;