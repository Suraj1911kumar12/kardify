import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  shippingType: 'self pickup',
  shippingId: 1,
};

const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    setShippingType(state, action) {
      state.shippingType = action.payload;
    },
    setShippingId(state, action) {
      state.shippingId = action.payload;
    },
  },
});

export const {setShippingType, setShippingId} = shippingSlice.actions;

export default shippingSlice.reducer;
