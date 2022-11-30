import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../helpers/cyptoAES";
import {
  deleteGroup,
  getDataPaginated,
  getGroups,
  getPrivileges,
  newGroup,
  updatePrivileges,
  uploadCsvData
} from "./watchListCrud";

export const getAllGroup = createAsyncThunk(
  "watchlist/getAllGroups",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getGroups(encrypt(payload));
      if (res.data) {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllPrivileges = createAsyncThunk(
  "watchlist/getAllPrivileges",
  async (payload, { rejectWithValue, dispatch }) => {
    const res = await getPrivileges(encrypt(payload));

    try {
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

export const addNewGroup = createAsyncThunk(
  "watchlist/addNewGroup",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await newGroup(encrypt(payload));
      if (res.status) {
        dispatch(getAllGroup({ typeId: 2 }));
        dispatch(
          getAllPrivileges({
            typeId: 3,
            groupId: 0,
          })
        );
        dispatch(emptyListOfAccessCategory());

        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExistingGroup = createAsyncThunk(
  "watchlist/deleteGroup",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await deleteGroup(encrypt(payload));
      if (res.status) {
        dispatch(getAllGroup({ typeId: 2 }));
        dispatch(
          getAllPrivileges({
            typeId: 3,
            groupId: 0,
          })
        );
        dispatch(emptyListOfAccessCategory());
        // dispatch(getAllPrivileges({ typeId: 3, groupId: 0 }));
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGroupPrivileges = createAsyncThunk(
  "watchlist/updateGroupPrivileges",
  async (payload, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(getCheckedPrivileges());
      const { allUpdatePrivileges } = getState().watchlist;

      const updatedPayload = {
        ...payload,
        privileges: allUpdatePrivileges,
      };

      const res = await updatePrivileges(encrypt(updatedPayload));

      if (res.status) {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const uploadCsvDocument = createAsyncThunk(
  "watchlist/uploadCsvDocument",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await uploadCsvData(payload);

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

export const getPaginatedData = createAsyncThunk(
  "watchlist/getPaginatedData",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await getDataPaginated(encrypt(payload));
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

const WatchList = createSlice({
  name: "watchlist",
  initialState: {
    allGroups: [],
    allPrivileges: [],
    allUpdatePrivileges: [],
    accessCategoryList: [],
    error: null,
    msg: null,
    pending: false,
    csvdata: null,
    isCsvUploaded: null,
  },
  reducers: {
    subParentPrivileges: (state, action) => {
      const { id, isChecked, parentId } = action.payload;
      const b = JSON.stringify(state.allPrivileges);
      const c = JSON.parse(b);
      const newT = c;
      const par = newT.filter((item) => item.id === parentId);

      // handeling if parent clicked
      if (par[0].id === id) {
        const newParent = par[0].allPrivileges.map((subParent) => {
          subParent = {
            ...subParent,
            isSelected: isChecked,
            allPrivileges: subParent.allPrivileges.map((child) => {
              return {
                ...child,
                isSelected: isChecked,
              };
            }),
          };

          return subParent;
        });

        state.allPrivileges = state.allPrivileges.map((parent) => {
          if (parent.id === id) {
            parent = {
              ...parent,
              isSelected: isChecked,
              allPrivileges: newParent,
            };
          }
          return parent;
        });

        return;
      }

      // handlesub parent click
      if (par[0].id !== id) {
        let isSubParentClicked = false;

        const newSubParents = par[0].allPrivileges.map((subParent) => {
          if (subParent.id === id) {
            isSubParentClicked = true;
            subParent = {
              ...subParent,
              isSelected: isChecked,
              allPrivileges: subParent.allPrivileges.map((child) => {
                child = { ...child, isSelected: isChecked };
                return child;
              }),
            };
          }
          return subParent;
        });

        const isAllSubParentTrue = newSubParents.find(
          (subParent) => subParent.isSelected === false
        );

        if (isSubParentClicked) {
          isSubParentClicked = false;
          state.allPrivileges = state.allPrivileges.map((parent) => {
            if (parent.id === par[0].id) {
              parent = {
                ...parent,
                isSelected: isAllSubParentTrue ? false : true,
                allPrivileges: newSubParents,
              };
            }

            return parent;
          });
          return;
        }
      }

      // handle  child click =
      if (parentId) {
        const updateParChild = par[0].allPrivileges.map((subParent) => {
          let isAllSelected = true;
          subParent.allPrivileges.map((child, index) => {
            if (child.id === id) {
              if (isChecked === false) {
                isAllSelected = false;
              }
              child.isSelected = isChecked;
            } else {
              if (child.isSelected === false) {
                isAllSelected = false;
              }
            }
            subParent.isSelected = isAllSelected === false ? false : true;
            return child;
          });

          return subParent;
        });

        const isParSelected = updateParChild.filter(
          (e) => e.isSelected === false
        ).length;

        state.allPrivileges = state.allPrivileges.map((item) => {
          if (item.id === parentId) {
            item = {
              ...item,
              isSelected: isParSelected ? false : true,
              allPrivileges: updateParChild,
            };
          }
          return item;
        });
      }
    },
    getCheckedPrivileges: (state, action) => {
      /* list of checked items */
      const checkedList = [];
      try {
        state.allPrivileges.map((parent) => {
          if (parent?.isSelected) {
            checkedList.push(parent?.id);
          }
          parent.allPrivileges.map((subParent) => {
            if (subParent?.isSelected) {
              checkedList.push(subParent?.id);
            }
            subParent.allPrivileges.map((child) => {
              if (child?.isSelected) {
                checkedList.push(child?.id);
              }
            });
          });
        });
      } catch (error) {
        console.log(error);
      }

      state.allUpdatePrivileges = checkedList;
    },
    getListOfAccessCategory: (state, action) => {
      const accessCategoryList = [];

      try {
        state.allPrivileges.map((parent) => {
          if (parent?.isSelected /* && parent.allPrivileges.length !== 0 */) {
            accessCategoryList.push(parent?.accessCategory);
          }
          parent.allPrivileges.map((subParent) => {
            if (
              subParent?.isSelected /* && subParent.allPrivileges.length !== 0 */
            ) {
              accessCategoryList.push(subParent?.accessCategory);
            }
            subParent.allPrivileges.map((child) => {
              if (child?.isSelected) {
                accessCategoryList.push(child?.accessCategory);
              }
            });
          });
        });
      } catch (error) {
        console.log(error);
      }

      state.accessCategoryList = accessCategoryList;
    },
    emptyListOfAccessCategory: (state, action) => {
      state.accessCategoryList = [];
    },
    addErrorMsgs: (state, action) => {
      state.error = action.payload;
    },
    emptyMsgs: (state, action) => {
      state.isCsvUploaded = null;
      state.error = null;
      state.msg = null;
    },
  },
  extraReducers: {
    /* 
    getAllGropus form server
    */
    [getAllGroup.pending]: (state, action) => {
      state.pending = true;
    },
    [getAllGroup.fulfilled]: (state, action) => {
      state.pending = true;
      state.allGroups = action.payload;
    },
    [getAllGroup.rejected]: (state, error) => {
      state.error = error.message || error.error.payload;
    },
    /* 
    getAllPrivileges form server
    */
    [getAllPrivileges.pending]: (state, action) => {
      state.pending = true;
    },
    [getAllPrivileges.fulfilled]: (state, action) => {
      state.pending = false;

      const updatePrivilleges = action.payload.map((parent) => {
        parent.type = "parent";
        parent.allPrivileges.map((subParent) => {
          subParent.type = "subParent";
          subParent.allPrivileges.map((child) => {
            child.type = "child";
            if (child.isSelected) {
              parent.expandOnLoad = true;
              subParent.expandOnLoad = true;
              child.expandOnLoad = true;
            }
            return child;
          });

          return subParent;
        });
        return parent;
      });

      // console.log(updatePrivileges, "sdfkj");

      state.allPrivileges = updatePrivilleges;
      state.error = null;
    },
    [getAllPrivileges.rejected]: (state, error) => {
      state.error = error.message || error.error.payload;
    },
    /* 
    updateAllPrivileges 
    */
    [updateGroupPrivileges.pending]: (state, action) => {
      state.pending = true;
      state.msg = null;
    },
    [updateGroupPrivileges.fulfilled]: (state, action) => {
      state.pending = false;
      state.msg = "Updated Successfully";
    },
    [updateGroupPrivileges.rejected]: (state, error) => {
      state.pending = false;
      state.msg = null;
      state.error = error.message || error.error.payload;
    },
    /* 
    adding new group to server
    */
    [addNewGroup.pending]: (state, action) => {
      state.pending = true;
    },
    [addNewGroup.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = null;
    },
    [addNewGroup.rejected]: (state, error) => {
      state.error = error.message || error.error.payload;
    },
    /* 
    delete existing group from server
    */
    [deleteExistingGroup.pending]: (state, action) => {
      state.pending = true;
    },
    [deleteExistingGroup.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = null;
    },
    [deleteExistingGroup.rejected]: (state, error) => {
      state.error = error.message || error.error.payload;
    },
    /* 
    upload csv document to server
    */
    [uploadCsvDocument.pending]: (state, action) => {
      state.pending = true;
      state.isCsvUploaded = null;
    },
    [uploadCsvDocument.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = null;
      state.isCsvUploaded = "Document uploaded successfully";
    },
    [uploadCsvDocument.rejected]: (state, error) => {
      state.pending = false;
      state.error = error.message || error.payload;
    },
    /* 
    get paginated data
    */
    [getPaginatedData.pending]: (state, action) => {
      state.pending = true;
    },
    [getPaginatedData.fulfilled]: (state, action) => {
      state.pending = false;
      state.csvdata = action.payload;
      // state.error = null;
    },
    [getPaginatedData.rejected]: (state, error) => {
      state.error = error.message || error.error.payload;
    },
  },
});

export const {
  subParentPrivileges,
  getCheckedPrivileges,
  getListOfAccessCategory,
  emptyListOfAccessCategory,
  emptyMsgs,
  addErrorMsgs,
} = WatchList.actions;
export default WatchList.reducer;
