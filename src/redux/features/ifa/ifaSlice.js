import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import {
  creteIfas,
  getAllIFA,
  getAllIFAList,
  creteIfaPhase2,
  getOfficeDropdown,
  fetchIfaByIfaId,
  updateIfaPhase1,
  generateIfaAccNumber,
  fetchSoftAccessGroup,
  fetchRoles
} from "./ifaCrud";

// Create New Ifa
export const createNewIfa = createAsyncThunk(
  "ifa/createNewIfa",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await creteIfas(encrypt(payload));
      if (res.status) {
        // const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        return res;
      } else {
        throw new Error(res.data?.message || res?.message);
      }
    } catch (ifaError) {
      return rejectWithValue(ifaError.message);
    }
  }
);

export const createNewIfaPhase2 = createAsyncThunk(
  "ifa/createNewIfaPhase2",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await creteIfaPhase2(encrypt(payload));
      if (res) {
        // const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        return res;
      } else {
        throw new Error(res.data?.message || res?.message);
      }
    } catch (ifaError) {
      return rejectWithValue(ifaError?.message);
    }
  }
);

export const officeDropdown = createAsyncThunk(
  "ifa/officeDropdown",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await getOfficeDropdown(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          let id = res.data.offices;
          if (id.length > 0) {
            dispatch(selectedId(id[id.length - 1].officeId));
          }
        }
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (ifaError) {
      return rejectWithValue(ifaError.message);
    }
  }
);

export const getAllIfaclients = createAsyncThunk(
  "ifa/getAllIfaClients",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getAllIFA(encrypt(payload));
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

export const getAllIfalists = createAsyncThunk(
  "ifa/getAllIfalists",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getAllIFAList(encrypt(payload));
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

export const getIfaByIfaId = createAsyncThunk(
  "ifa/getIfaByIfaId",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetchIfaByIfaId(encrypt(payload));
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

export const updateIfasPhase1 = createAsyncThunk(
  "ifa/updateIfasPhase1",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateIfaPhase1(encrypt(payload));
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

//promises not written
export const ifaAccNumber = createAsyncThunk(
  "ifa/ifaAccNumber",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await generateIfaAccNumber();
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

//Get Software Access Group List
export const getSoftAccessGroup = createAsyncThunk(
  "ifa/getSoftAccessGroup",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetchSoftAccessGroup(encrypt(payload));
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


//Get Role List
export const getRoles = createAsyncThunk(
  "ifa/getRoles",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetchRoles(encrypt(payload));
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

const ifaSlice = createSlice({
  name: "ifa",
  initialState: {
    ifaStatus: null,
    loading: false,
    ifaError: "",
    ifaId: null,
    msg: "",
    docs: [],
    ifaclientlist: [],
    ifalist: [],
    officeDropdownData: [],
    ifaByIdData: [],
    softAccessGroupList: [],
    roleList: []
  },
  reducers: {
    clearIfsState: (state, action) => {
      // alert('clear')
      state.ifaError = null;
      state.loading = false;
      state.ifaStatus = null;
      state.msg = null;
      //state.ifaId = null;
      //state.docs = [];
      // state.ifaclientlist = [];
      // state.ifalist = [];
      //ifa state.ifaError = null
    },

    clearAllDocs: (state) => {
      state.docs = [];
    },

    uploadDocs: (state, action) => {
      if (action.payload) {
        action.payload?.isEdit
          ? (state.docs = action.payload?.docs)
          : (state.docs = [...state.docs, action.payload]);
      }
    },
    removeDocs: (state, action) => {
      const newDocs = state.docs.filter((e, index) => index !== action.payload);
      state.docs = newDocs;
    },
    clearCityDetail: (state, action) => {
      state.cityDetail = null;
    },
    selectedId: (state, action) => {
      state.selId = action.payload;
    },
  },
  extraReducers: {
    [officeDropdown.pending]: (state) => {
      //  state.loading = true;
    },
    [officeDropdown.fulfilled]: (state, action) => {
      // state.loading = false;
      if (action.payload.statusCode === 200) {
        state.cityDetail = {
          cityId: action.payload?.data?.cityId,
          cityName: action.payload?.data?.cityName,
        };
        state.officeDropdownData = action.payload?.data?.offices;
        state.ifaError = action.payload.message;
      }
    },
    [officeDropdown.rejected]: (state, ifaError) => {
      state.loading = false;
      state.ifaError = ifaError.payload || ifaError.error.message;
    },
    // create IFA
    [createNewIfa.pending]: (state) => {
      state.loading = true;
    },
    [createNewIfa.fulfilled]: (state, action) => {
      state.loading = false;
      state.ifaStatus = action.payload.statusCode;
      state.ifaError = action.payload?.message;
      state.ifaId = action.payload.data.id;
    },
    [createNewIfa.rejected]: (state, ifaError) => {
      state.loading = false;
      state.ifaError = ifaError.payload || ifaError.error.message;
    },

    // create IFA phase 2
    [createNewIfaPhase2.pending]: (state) => {
      state.loading = true;
    },
    [createNewIfaPhase2.fulfilled]: (state, action) => {
      state.loading = false;
      state.ifaError = action.payload?.message;
      state.ifaStatus = action.payload.statusCode;
    },
    [createNewIfaPhase2.rejected]: (state, ifaError) => {
      state.loading = false;
      state.ifaError = ifaError.payload || ifaError.error.message;
    },

    // Get ifa by id
    [getIfaByIfaId.pending]: (state) => {
      //state.loading = true;

     },
    [getIfaByIfaId.fulfilled]: (state, action) => {
      state.loading = false;
      state.ifaByIdData = action.payload;
    },
    [getIfaByIfaId.rejected]: (state, ifaError) => {
      state.loading = false;
    },

    //

    [getAllIfaclients.pending]: (state, action) => {},
    [getAllIfaclients.fulfilled]: (state, action) => {
      state.loading = false;
      state.ifaclientlist = action.payload;
    },
    [getAllIfaclients.rejected]: (state, error) => {
      state.loading = false;
    },

    //ifalist

    [getAllIfalists.pending]: (state, action) => {
      //  state.loading = true;
    },
    [getAllIfalists.fulfilled]: (state, action) => {
      state.loading = false;
      state.ifalist = action.payload;
    },
    [getAllIfalists.rejected]: (state, error) => {
      state.loading = false;
    },

    //Update ifa phase1
    [updateIfasPhase1.pending]: (state) => {
      state.loading = true;
    },
    [updateIfasPhase1.fulfilled]: (state, action) => {
      state.loading = false;
      state.ifaError = action.payload?.message;
      state.ifaStatus = action.payload?.statusCode;
    },
    [updateIfasPhase1.rejected]: (state, ifaError) => {
      state.loading = false;
      state.ifaError = ifaError.payload || ifaError.error.message;
    },
  

  [getRoles.pending]: (state, action) => {
    //  state.loading = true;
  
  },
  [getRoles.fulfilled]: (state, action) => {
    state.loading = false;
    state.roleList = action.payload?.roleList;
  },
  [getRoles.rejected]: (state, error) => {
    state.loading = false;

  },


  [getSoftAccessGroup.pending]: (state, action) => {
    //  state.loading = true;
  },
  [getSoftAccessGroup.fulfilled]: (state, action) => {
    state.loading = false;
    state.softAccessGroupList = action.payload;
  },
  [getSoftAccessGroup.rejected]: (state, error) => {
    state.loading = false;
  },


  }

});
export const {
  clearIfsState,
  uploadDocs,
  removeDocs,
  selectedId,
  clearCityDetail,
  clearAllDocs,
} = ifaSlice.actions;

export default ifaSlice.reducer;
