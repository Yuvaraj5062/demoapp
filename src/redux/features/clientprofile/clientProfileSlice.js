import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import { getUserData } from "./clientProfileCrud";

export const getClientProfile = createAsyncThunk(
  "clientProfile/getClientProfile",
  async (payload, { rejectWithValue }) => {
    console.log(payload, "profile");
    try {
      const res = await getUserData(encrypt(payload));
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

// export const updateClientProfile = createAsyncThunk(
//   "clientProfile/updateClientProfile",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await updateUserProfile(encrypt(payload));

//       if (res.status) {
//         console.log(res.data, "data");
//         return res.data;
//       } else {
//         throw new Error(res.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const ClientProfileSlice = createSlice({
  name: "clientProfile",
  initialState: {
    loading: false,
    clientDetail: {},
  },
  reducers: {
    emptyClientDetail: (state, action) => {
      state.clientDetail = {};
    },
  },
  extraReducers: {
    /* 
    getiing client profile from server 
    */
    [getClientProfile.pending]: (state) => {
      state.loading = true;
    },
    [getClientProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.clientDetail = action.payload;
    },
    [getClientProfile.rejected]: (state, error) => {
      state.loading = false;
    },

    /* 
    updating client Profile 
    */
    // [updateClientProfile.pending]: (state) => {
    //   state.loading = true;
    // },
    // [updateClientProfile.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.clientDetail = action.payload;
    // },
    // [updateClientProfile.rejected]: (state, error) => {
    //   state.loading = false;
    // },
  },
});

export const { emptyClientDetail } = ClientProfileSlice.actions;
export default ClientProfileSlice.reducer;
