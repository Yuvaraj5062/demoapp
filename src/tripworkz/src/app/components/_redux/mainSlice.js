import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // userDetail: null,
  countries: null,
  cities: null,
  provinces: null,
  updateSettingLoader: false,
  updatePasswordLoader: false,
  updateSettingStat: null,
  updatePasswordStat: null,
  user: null,
  notifications:null,
  // hotels integration
  userLocationDetails: null,
  recommendedHotelForUser: null,
  updateNotificationLoader:false,
  notificationStatus:null,
  allVouchers: null,
  myVouchers: [],
  adminReply:null,
  clientReply:null,
  reviews:null,
  myPendingVouchers: null,
  allBoookings:null,
  middlewareCountries:null,
  middlewareCurrencies:null,
  middlewareProviders:null,
  settings:null,
  cards:null,
  cardById:null,
  partners:null,
  eWalletCreditPoints:null,
  currentPromotions:null,
  upcomingPromotions:null
};

export const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    userDetailsFetched: (state, action) => {
      state.user = action.payload;
    },
    settingLoader: (state, action) => {
      state.updateSettingLoader = action.payload;
    },
    settingUpdateStatus: (state, action) => {
      state.updateSettingStat = action.payload;
    },
    passwordLoader: (state, action) => {
      state.updatePasswordLoader = action.payload;
    },
    passwordUpdateStatus: (state, action) => {
      state.updatePasswordStat = action.payload;
    },
    setNotificationSettings: (state,action) => {
      state.notifications = action.payload
    },
    notificationLoader: (state, action) => {
      state.updateNotificationLoader = action.payload;
    },
    notificationStatus: (state,action) => {
      state.notificationStatus = action.payload;
    },
    countryFetched: (state, action) => {
      state.countries = action.payload;
    },
    citiesFetched: (state, action) => {
      state.cities = action.payload;
    },
    provincesFetched: (state, action) => {
      state.provinces = action.payload;
    },
    userLocationDetailsFetched: (state, action) => {
      state.userLocationDetails = action.payload;
    },
    recommendedHotelForUserFethed: (state, action) => {
      state.recommendedHotelForUser = action.payload;
    },
    allVouchersFetched: (state,action) => {
      state.allVouchers = action.payload
    },
    myVouchersFetched: (state,action) => {
      state.myVouchers = action.payload
    },
    adminReplayFetched: (state,action) => {
      console.log("aaaaaaaaaaaaa",action.payload)
      state.adminReply = action.payload
    },
    clientReplayFetched: (state,action) => {
      console.log("bbbbb",action.payload)
      state.clientReply = action.payload
    },
    currentPromotionsFetched: (state,action) => {
      state.currentPromotions = action.payload
    },
    upcomingPromotionsFetched: (state,action) => {
      state.upcomingPromotions = action.payload
    },
    
    myPendingVouchersFetched: (state,action) => {
      state.myPendingVouchers = action.payload
    },
    allBookingsFetched: (state,action) => {
      state.allBoookings = action.payload
    },
    middlewareCountriesFetched: (state,action) => {
      state.middlewareCountries = action.payload
    },
    middlewareCurrenciesFetched: (state,action) => {
      state.middlewareCurrencies = action.payload
    },
    middlewareProvidersFetched: (state,action) => {
      state.middlewareProviders = action.payload
    },

    allReviewsFetched: (state,action) => {
      state.reviews = action.payload
    },
    settingControlFetched: (state,action) => {
      //console.log("action.payload",action.payload)
      state.settings = action.payload
    },

    allCardFetched: (state,action) => {
      state.cards = action.payload
    },

    cardByIdFetched: (state,action) => {
      state.cardById = action.payload
    },
    
    partnersFetched: (state,action) => {
      state.partners = action.payload
      console.log(">>>>>>",state.partners)
    },

    eWalletCreditFetched: (state,action) => {
      state.eWalletCreditPoints = action.payload
    },

    clearState: (state, action) => {
      state.countries = null;
      state.cities = null;
      state.provinces = null;
      state.updateSettingLoader = false;
      state.updatePasswordLoader = false;
      state.updateSettingStat = null;
      state.updatePasswordStat = null;
      state.userLocationDetails = null;
      state.recommendedHotelForUser = null;
      state.user = null;
      state.notifications = null;
      state.updateNotificationLoader=false;
      state.allVouchers=null;
      state.myVouchers=null;
      state.myPendingVouchers=null;
      state.allBoookings=null;
     state.reviews=null;
      state.middlewareCountries=null;
      state.middlewareCurrencies=null;
      state.middlewareProviders=null;
      state.cards=null;
      state.cardById=null;
      state.partners=null;
      state.eWalletCreditPoints=null;
      state.currentPromotions=null;
      state.upcomingPromotions=null;
    },
  },
});
