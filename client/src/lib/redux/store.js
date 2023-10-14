import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './rootReducer';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const useDispatch = () => useReduxDispatch()
export const useSelector = useReduxSelector