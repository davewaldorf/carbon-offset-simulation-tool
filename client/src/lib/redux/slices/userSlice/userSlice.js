import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: null,
  country: 'United States',
  carbonNeutralityYear: new Date().getFullYear() + 5, 
  mode: 'Monthly',
  purchases: [],
  carbonOffset : []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setCountryAndMode: (state, action) => {
      state.country = action.payload.country;
      state.mode = action.payload.mode;
    },
    addPurchase: (state, action) => {
      state.purchases = (action.payload);
    },
    setCarbonOffset: (state, action) => {
      state.carbonOffset = action.payload;
    },
  },
});

