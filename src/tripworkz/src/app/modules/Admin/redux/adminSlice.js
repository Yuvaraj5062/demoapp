import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // userDetail: null,
  vouchers: null,
  werkcreditz: null,
  werkcreditzExpiry: null,
  promocodes: null,
  reviews:null,
  openTicket:null,
  queryMessage:null,
  clientReply:null,
  adminReply:[]
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    vouchersFetched: (state, action) => {
      state.vouchers = action.payload;
    },
    promocodesFetched: (state, action) => {
      state.promocodes = action.payload;
    },
    werkcreditzPoints: (state, action) => {
      state.werkcreditz = action.payload;
    },
    werkcreditzPointsExpiry: (state, action) => {
      state.werkcreditzExpiry = action.payload;
    },
    reviewsFetched: (state, action) => {
      state.reviews = action.payload;
    },
    ticketFetched: (state, action) => {
      state.openTicket = action.payload;
    },
    userQuery: (state, action) => {
      state.queryMessage = action.payload;
    },
    adminReplayFetched: (state,action) => {
      console.log("aaaaaaaaaaaaa",action.payload)
      state.adminReply = action.payload
    },
    clientReplayFetched: (state,action) => {
      console.log("bbbbb",action.payload)
      state.clientReply = action.payload
    },

    clearState: (state, action) => {
      state.vouchers = null;
      state.werkcreditz = null;
      state.werkcreditzExpiry = null;
      state.voucherList = null;
      state.openTicket=null;
      state.queryMessage=null;
      state.adminReply=[];
      state.clientReply=null

    },
  },
});
