import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import { cityDropdown, clearCityList, clearStateList, countryDropdown, stateDropdown } from "../common/commonSlice";

import {
  addCity,
  addClient,
  addClientPage2,
  addCountry,
  addExternalAccountCrud,
  addOffice,
  addState,
  deleteCityCrud,
  deleteCountryCrud,
  deleteExternalAccountCrud,
  deleteOfficeCrud,
  deleteStateCrud,
  editExternalAccountCrud,
  getAccountNumber,
  getAccountTypeDropdown,
  getclientTypeDropdown,
  getconsultantDropdown,
  getExternalAccount,
  getifaDropdownDropdown,
  getOfficeById,
  getOfficeDropdown,
  getpersonalityTypeDropdown,
  getserviceProviderDropdown,
  getSoftwareGroupDropdown,
  gettypeDropdown,
  updateCityCrud,
  updateClient,
  updateCountryCrud,
  updateOfficeCrud,
  updateStateCrud,
} from "./crmCrud";

export const officeDropdown = createAsyncThunk(
  "crm/officeDropdown",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await getOfficeDropdown(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          let id = res.data.offices
          if (id.length > 0) {
            dispatch(selectedId(id[id.length - 1].officeId))
          }
        }
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const officeById = createAsyncThunk(
  "crm/officeById",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await getOfficeById(encrypt(payload));
      if (res) {
        return res.data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const accountTypeDropdown = createAsyncThunk(
  "crm/accountTypeDropdown",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getAccountTypeDropdown();
      if (res) {
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const personalityTypeDropdown = createAsyncThunk(
  "crm/personalityTypeDropdown",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getpersonalityTypeDropdown();
      if (res) {
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const consultantDropdown = createAsyncThunk(
  "crm/consultantDropdown",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getconsultantDropdown();
      if (res) {
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const ifaDropdown = createAsyncThunk(
  "crm/ifaDropdown",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getifaDropdownDropdown();
      if (res) {
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const clientTypeDropdown = createAsyncThunk(
  "crm/clientTypeDropdown",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getclientTypeDropdown();
      if (res) {
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const softwareGroupDropdown = createAsyncThunk(
  "crm/softwareGroupDropdown",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await getSoftwareGroupDropdown(encrypt(payload));
      if (res) {
        // const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        // //console.log(data);
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerClient = createAsyncThunk(
  "crm/registerClient",
  async (payload, { dispatch, rejectWithValue }) => {
    try {

      const res = await addClient(encrypt(payload));
      if (res) {
        // const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        // //console.log(data);
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const updateRegisterClient = createAsyncThunk(
  "crm/updateRegisterClient",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await updateClient(encrypt(payload));
      if (res) {
        // const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        // //console.log(data);
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerClientPage2 = createAsyncThunk(
  "crm/registerClientPage2",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await addClientPage2(encrypt(payload));
      if (res) {
        // const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        // //console.log(data);
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const externalAccount = createAsyncThunk(
  "crm/externalAccount",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await getExternalAccount(encrypt(payload));
      if (res) {
        // const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        // //console.log(data);
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const serviceProviderDropdown = createAsyncThunk(
  "crm/serviceProviderDropdown",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getserviceProviderDropdown();
      if (res) {
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const typeDropdown = createAsyncThunk(
  "crm/typeDropdown",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await gettypeDropdown();

      if (res) {
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const addExternalAccount = createAsyncThunk(
  "crm/addExternalAccount",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await addExternalAccountCrud(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          dispatch(externalAccount({ clientId: payload.clientId }));
        }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editExternalAccount = createAsyncThunk(
  "crm/editExternalAccount",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await editExternalAccountCrud(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          // dispatch(externalAccount({ clientId: payload.clientId }))
        }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExternalAccount = createAsyncThunk(
  "crm/deleteExternalAccount",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await deleteExternalAccountCrud(encrypt(payload));
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

export const deleteOffice = createAsyncThunk(
  "crm/deleteOffice",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await deleteOfficeCrud(encrypt({ id: payload.id, userId: payload.userId }));
      if (res) {
        if (res.statusCode === 200) {
          dispatch(officeDropdown({ cityId: payload.cityId }));
        }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewOffice = createAsyncThunk(
  "crm/addNewOffice",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await addOffice(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          dispatch(officeDropdown({ cityId: payload.cityId }));
        }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewCountry = createAsyncThunk(
  "crm/addNewCountry",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await addCountry(encrypt(payload));
      if (res) {
        dispatch(clearStateList())
        if (res.statusCode === 200) { dispatch(countryDropdown()); }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateCountry = createAsyncThunk(
  "crm/updateCountry",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await updateCountryCrud(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) { dispatch(countryDropdown()); }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCountry = createAsyncThunk(
  "crm/deleteCountry",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await deleteCountryCrud(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          dispatch(countryDropdown());
        }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewState = createAsyncThunk(
  "crm/addNewState",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await addState(encrypt(payload));
      if (res) {
        dispatch(clearCityList())
        if (res.statusCode === 200) { dispatch(stateDropdown({ countryId: payload.countryId })) }

        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateState = createAsyncThunk(
  "crm/updateState",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await updateStateCrud(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) { dispatch(stateDropdown({ countryId: payload.countryId })) }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteState = createAsyncThunk(
  "crm/deleteState",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await deleteStateCrud(encrypt({ id: payload.id }));
      if (res) {
        if (res.statusCode === 200) {
          dispatch(stateDropdown({ countryId: payload.countryId }))
        }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewCity = createAsyncThunk(
  "crm/addNewCity",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await addCity(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          dispatch(cityDropdown({ stateId: payload.stateId }));
        }

        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCity = createAsyncThunk(
  "crm/updateCity",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await updateCityCrud(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          dispatch(cityDropdown({ stateId: payload.stateId }));
        }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCity = createAsyncThunk(
  "crm/deleteCity",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await deleteCityCrud(encrypt({ cityId: payload.cityId }));
      if (res) {
        if (res.statusCode === 200) {
          dispatch(cityDropdown({ stateId: payload.stateId }));
        }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateOffice = createAsyncThunk(
  "crm/updateOffice",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await updateOfficeCrud(encrypt(payload));
      if (res) {
        if (res.statusCode === 200) {
          dispatch(officeDropdown({ cityId: payload.cityId }));
        }
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const accountNumber = createAsyncThunk(
  "crm/accountNumber",
  async (payload, { dispatch, rejectWithValue }) => {
    try {

      const res = await getAccountNumber(encrypt(payload));
      if (res) {
        // const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };
        // //console.log(data);
        return res;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CRMSlice = createSlice({
  name: "crm",
  initialState: {
    officeDropdownData: [],
    accountTypeDropdown: [],
    personalityTypeDropdownData: [],
    consultantDropdownData: [],
    ifaDropdownData: [],
    softwareGroupDropdownData: [],
    serviceProviderDropdownData: [],
    typeDropdownData: [],
    clientTypeDropdownData: [],
    externalAccountData: [],
    cityDetail: null,
    accountNum: "",
    officeData: null,
    status: null,
    loading: false,
    error: "",
    userId: null,
    selId: '',
    isDeleted: false,
    docs: [],

  },
  reducers: {
    clearState: (state, action) => {
      state.error = null;
      state.loading = false;
      state.error = "";
      state.status = null;
      state.isDeleted = false
    },
    clearAccountNum: (state, action) => {
      state.accountNum = null;
    },
    clearCityDetail: (state, action) => {
      state.cityDetail = null
    },
    selectedId: (state, action) => {
      state.selId = action.payload
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
  },
  extraReducers: {
    /* 
    Office dropdown data 
    */
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
      }
    },
    [officeDropdown.rejected]: (state, error) => {
      state.loading = false;
    },

    /*  
Software Access Group dropdown data 
*/
    [officeById.pending]: (state) => { },
    [officeById.fulfilled]: (state, action) => {
      state.officeData = action.payload;
    },
    [officeById.rejected]: (state, error) => { },
    /*  
Account Type dropdown data 
*/
    [accountTypeDropdown.pending]: (state) => { },
    [accountTypeDropdown.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.accountTypeDropdownData = action.payload.data;
      }
    },
    [accountTypeDropdown.rejected]: (state, error) => { },
    /*  
personalityType dropdown data 
    */
    [personalityTypeDropdown.pending]: (state) => { },
    [personalityTypeDropdown.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.personalityTypeDropdownData = action.payload.data;
      }
    },
    [personalityTypeDropdown.rejected]: (state, error) => { },
    /*  
Consultant dropdown data 
   */
    [consultantDropdown.pending]: (state) => { },
    [consultantDropdown.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.consultantDropdownData = action.payload.data;
      }
    },
    [consultantDropdown.rejected]: (state, error) => { },
    /*  
IFA dropdown data 
*/
    [ifaDropdown.pending]: (state) => { },
    [ifaDropdown.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.ifaDropdownData = action.payload.data;
      }
    },
    [ifaDropdown.rejected]: (state, error) => { },
    /*  
    Client Type dropdown data 
    */
    [clientTypeDropdown.pending]: (state) => { },
    [clientTypeDropdown.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.clientTypeDropdownData = action.payload.data;
      }
    },
    [clientTypeDropdown.rejected]: (state, error) => { },

    /*  
registerClient 
*/
    [registerClient.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [registerClient.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.data) {
        state.userId = action.payload.data.userId;
      }
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [registerClient.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },



    /*  
    updateRegisterClient 
    */
    [updateRegisterClient.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [updateRegisterClient.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.data) {
        state.userId = action.payload.data.userId;
      }
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [updateRegisterClient.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },


    /*  
registerClient page 2 dropdown data 
*/
    [registerClientPage2.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [registerClientPage2.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [registerClientPage2.rejected]: (state, error) => {
      state.error = error.payload || error.error.message; //check
      state.loading = false;
    },

    /*  
addNewOffice 
*/
    [addNewOffice.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [addNewOffice.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [addNewOffice.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },


    /*  
addNewCountry 
*/
    [addNewCountry.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [addNewCountry.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [addNewCountry.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
    /*  
update country 
*/
    [updateCountry.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [updateCountry.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [updateCountry.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },


    /*  
  delete Country 
 */
    [deleteCountry.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [deleteCountry.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [deleteCountry.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },


    /*  
addNewState 
*/
    [addNewState.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [addNewState.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [addNewState.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },


    /*  
  update state 
  */
    [updateState.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [updateState.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [updateState.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    /*  
  delete State 
 */
    [deleteState.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [deleteState.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [deleteState.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },



    /*  
addNewCity 
*/
    [addNewCity.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [addNewCity.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [addNewCity.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    /*  
update city 
*/
    [updateCity.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [updateCity.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [updateCity.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    /*  
  delete Country 
 */
    [deleteCity.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [deleteCity.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [deleteCity.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    /*  
update Office 
*/
    [updateOffice.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [updateOffice.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [updateOffice.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    /*  
Software Access Group dropdown data 
*/
    [softwareGroupDropdown.pending]: (state) => { },
    [softwareGroupDropdown.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.softwareGroupDropdownData = action.payload.data;
      }
    },
    [softwareGroupDropdown.rejected]: (state, error) => { },

    /*  
Account number data 
*/
    [accountNumber.pending]: (state) => { },
    [accountNumber.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.accountNum = action.payload;
      }

    },
    [accountNumber.rejected]: (state, error) => { },

    /*  
    externalAccountData data 
    */
    [externalAccount.pending]: (state) => { },
    [externalAccount.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.externalAccountData = action.payload.data;
      }
    },
    [externalAccount.rejected]: (state, error) => { },

    /*  
Service Provider  dropdown data 
*/
    [serviceProviderDropdown.pending]: (state) => { },
    [serviceProviderDropdown.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.serviceProviderDropdownData = action.payload.data;
      }
    },
    [serviceProviderDropdown.rejected]: (state, error) => { },

    /*  
Type dropdown data 
*/
    [typeDropdown.pending]: (state) => { },
    [typeDropdown.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.typeDropdownData = action.payload.data;
      }
    },
    [typeDropdown.rejected]: (state, error) => { },
    /*  
addExternalAccount 
*/
    [addExternalAccount.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [addExternalAccount.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [addExternalAccount.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
    /*  
edit ExternalAccount 
*/
    [editExternalAccount.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [editExternalAccount.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [editExternalAccount.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },
    /*  
  delete ExternalAccount 
 */
    [deleteExternalAccount.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [deleteExternalAccount.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    },
    [deleteExternalAccount.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload || error.error.message; //check
    },

    /*  
  delete Office 
 */
    [deleteOffice.pending]: (state) => {
      // state.status= null,
      state.loading = true;
    },
    [deleteOffice.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.isDeleted = action.payload.statusCode === 200 ? true : false
      state.error = action.payload.message;
    },
    [deleteOffice.rejected]: (state, error) => {
      state.loading = false;
      state.isDeleted = false
      state.error = error.payload || error.error.message; //check
    },
  },
});
export const {
  clearState,
  clearAccountNum,
  clearCityDetail,
  selectedId,
  uploadDocs,
  removeDocs,
  clearAllDocs, } = CRMSlice.actions;
export default CRMSlice.reducer;
