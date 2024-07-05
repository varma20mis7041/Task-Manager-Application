// Import the configureStore function from Redux Toolkit
import {configureStore} from '@reduxjs/toolkit';
import todoReducers from '../slices/todoAppSlice';

// Create the Redux store using configureStore
const store = configureStore({
  // Set the reducer for the store to todoReducers
  reducer: todoReducers,
});


export default store;
