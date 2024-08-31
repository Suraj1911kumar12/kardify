import {createSlice} from '@reduxjs/toolkit';

const initialState = [];
const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlist(state, action) {
      const newItem = action.payload;
      state.push(...newItem);
    },
  },
});

export const {addWishlist} = wishListSlice.actions;

export default wishListSlice.reducer;
