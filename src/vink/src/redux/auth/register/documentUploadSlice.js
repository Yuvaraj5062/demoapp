import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { decrypt, encrypt } from "../../../helpers/cyptoAES";
import { popup } from "../../popup/popupSlice";
import {
  addAddressProof,
  addIdProof,
  deleteDocument,
  UpdateUploadDocumentStatus,
} from "./documentUploadCrud";

export const addressProofUpload = createAsyncThunk(
  "documentUpload/addressProofUpload",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await addAddressProof(payload);
      if (res.data.status) {
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        return data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const idProofUpload = createAsyncThunk(
  "documentUpload/addIdProofUpload",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await addIdProof(payload);
      if (res.data.status) {
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        return data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadDocuments = createAsyncThunk(
  "documentUpload/uploadDocuments",
  async (payload, { dispatch, rejectWithValue, getState }) => {
    try {
      const res = await UpdateUploadDocumentStatus(encrypt(payload));
      if (res.data.status) {
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        dispatch(popup("UserServicesScreen"));
        return data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeDocument = createAsyncThunk(
  "documentUpload/removeDocument",
  async (payload, { dispatch, rejectWithValue, getState }) => {
    try {
      const res = await deleteDocument(encrypt(payload));
      if (res.data.status) {
        const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        //dispatch(popup("UserServicesScreen"));
        return data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const documentUploadSlice = createSlice({
  name: "documentUpload",
  initialState: {
    error: "",
    loading: false,
    status: null,
    addUrls: [],
    idUrls: [],
  },
  reducers: {
    setDocUploadError: (state, action) => {
      state.error = action.payload;
    },
    cancelError: (state, action) => {
      state.error = null;
    },
    closeSuccess: (state, action) => {
      state.status = null;
      state.error = null;
    },

    setImages: (state, action) => {
      state.addUrls = action?.payload?.addressProofList;
      state.idUrls = action?.payload?.idProofList;
    },

    editUrls: (state, action) => {
      const { doctype, id } = action.payload;

      if (doctype === "idProof") {
        const newIdUrls = state.idUrls.filter((e) => e.documentId !== id);
        state.idUrls = newIdUrls;
      }

      if (doctype === "addProof") {
        const newAddUrls = state.addUrls.filter((e) => e.documentId !== id);
        state.addUrls = newAddUrls;
      }
    },
  },
  extraReducers: {
    /* 
    adding addressProof
    */
    [addressProofUpload.pending]: (state, action) => {
      state.loading = true;
    },
    [addressProofUpload.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.addUrls = action.payload.data;
      // state.status = action.payload.message;
    },
    [addressProofUpload.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
    /* 
    adding idProof
    */
    [idProofUpload.pending]: (state, action) => {
      state.loading = true;
    },
    [idProofUpload.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.idUrls = action.payload.data;
      // state.status = action.payload.message;
    },
    [idProofUpload.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
    /* 
    uplod final continue
    */

    [uploadDocuments.pending]: (state, action) => {
      state.loading = true;
    },
    [uploadDocuments.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.status = action.payload.message;
      state.addUrls = [];
      state.idUrls = [];
    },
    [uploadDocuments.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
    /* 
   remove doucumetn slice
    */

    [removeDocument.pending]: (state, action) => {
      state.loading = true;
    },
    [removeDocument.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [removeDocument.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
  },
});

export const {
  setDocUploadError,
  closeSuccess,
  cancelError,
  setImages,
  editUrls,
} = documentUploadSlice.actions;
export default documentUploadSlice.reducer;
