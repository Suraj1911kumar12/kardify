import {createSlice} from '@reduxjs/toolkit';

const initialState = [];
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const newItem = action.payload;
      state.push(newItem);
    },
    removeProduct(state, action) {
      return state.filter((item, index) => index !== action.payload);
    },
  },
});

export const {addProduct, removeProduct} = cartSlice.actions;
export default cartSlice.reducer;
