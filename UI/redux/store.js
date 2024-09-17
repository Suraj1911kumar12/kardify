import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import profileReducer from './slice/profileSlice';
import addressReducer from './slice/addresSlice';
import wishListReducer from './slice/wishlist';
import selectedAddressReducer from './slice/SeletedAddress';
import selectedPayemnt from './slice/selectedPayment';
import MainAddressSlice from './slice/MainAddressSlice';

const Store = configureStore({
  reducer: {
    item: cartReducer,
    profile: profileReducer,
    address: addressReducer,
    wishList: wishListReducer,
    shipping: selectedAddressReducer,
    MainAddressSlice: MainAddressSlice,
    payment: selectedPayemnt,
  },
});

export default Store;
