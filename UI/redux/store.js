import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import profileReducer from './slice/profileSlice';
import addressReducer from './slice/addresSlice';

const Store = configureStore({
  reducer: {
    item: cartReducer,
    profile: profileReducer,
    address: addressReducer,
  },
});

export default Store;
