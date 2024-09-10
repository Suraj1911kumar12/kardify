import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  payemntType: 'COD',
  paymentId: 1,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentType(state, action) {
      state.payemntType = action.payload;
    },
    setPaymentID(state, action) {
      state.paymentId = action.payload;
    },
  },
});

export const {setPaymentType, setPaymentID} = paymentSlice.actions;

export default paymentSlice.reducer;
