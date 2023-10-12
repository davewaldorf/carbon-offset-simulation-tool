import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: null,
  country: 'United States',
  mode: 'Monthly',
  purchases: [],
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
      state.purchases.push(action.payload);
    },
  },
});

