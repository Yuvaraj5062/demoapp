import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import { AddRole, GetAllRoleList, UpdateRole } from "./manageroleCrud";

export const getAllIRole = createAsyncThunk(
  "managerole/getAllIRole",
  async (payload, { rejectWithValue }) => {
    console.log("payload", payload);
    try {
      const res = await GetAllRoleList(encrypt(payload));
      if (res.status) {
        console.log("data", res);
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addRoleData = createAsyncThunk(
  "managerole/addRoleData",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("payload", payload);
      const res = await AddRole(encrypt(payload));
      if (res.status) {
        console.log("data", res);
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateRole = createAsyncThunk(
  "managerole/updateRole",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await UpdateRole(encrypt(payload));
      if (res.status) {
        console.log("data", res);
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const roleSlice = createSlice({
  name: "managerole",
  initialState: {
    rolelist: [],
    msg: "",
    error: "",
  },
  reducers: {
    clearroleState: (state, action) => {
      state.loading = false;
      state.msg = null;
      state.error = null;
      state.error = null;
    },
  },
  extraReducers: {
    [getAllIRole.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllIRole.fulfilled]: (state, action) => {
      state.loading = false;
      state.rolelist = action.payload;
    },
    [getAllIRole.rejected]: (state, error) => {
      state.loading = false;
    },

    //Add Role

    [addRoleData.pending]: (state, action) => {
      state.loading = true;
    },
    [addRoleData.fulfilled]: (state, action) => {
      state.loading = false;
      state.msg = action.payload.message;
    },
    [addRoleData.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message;
    },

    //Update Role

    [updateRole.pending]: (state, action) => {
      state.loading = true;
    },
    [updateRole.fulfilled]: (state, action) => {
      state.loading = false;
      state.msg = action.payload.message;
      state.data = action.payload.data;
    },
    [updateRole.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message;
    },
  },
});
export const { clearroleState } = roleSlice.actions;

export default roleSlice.reducer;
