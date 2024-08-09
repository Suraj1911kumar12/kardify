import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';

const Store = configureStore({
  reducer: {
    item: cartReducer,
  },
});

export default Store;
