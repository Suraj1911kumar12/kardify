import {createSlice} from '@reduxjs/toolkit';

const initialState = [];
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress(state, action) {
      const newItem = action.payload;
      state.push(...newItem);
    },
    removeAddress(state, action) {
      return state.filter((item, index) => index !== action.payload);
    },
  },
});

export const {addAddress, removeAddress} = addressSlice.actions;
export default addressSlice.reducer;
