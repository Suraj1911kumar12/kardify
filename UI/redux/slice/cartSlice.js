import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getProduct(state, action) {
      return [...action.payload]; // Replace the state with the fetched cart items
    },
    addProduct(state, action) {
      const newItem = action.payload;
      const existingItem = state.find(item => item.id === newItem.id);
      if (existingItem) {
        return state;
      } else {
        state.push(newItem);
        return state;
      }
    },
    removeProduct(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const {addProduct, removeProduct, getProduct} = cartSlice.actions;
export default cartSlice.reducer;
