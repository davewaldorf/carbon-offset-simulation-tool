import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  userID: null,
  country: 'United States',
  carbonNeutrality: new Date().getFullYear() + 3, 
  mode: 'Monthly',
  purchases: [],
  treeEmissions : 0,
  carbonConsumption: 15520,
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
      state.treeEmissions = action.payload;
    },
    setCarbonConsumption: (state, action) => {
      state.carbonConsumption = action.payload;
    },
    setCarbonNeutralityYear: (state, action) => {
      state.carbonNeutrality = action.payload;
    },
  },
});

