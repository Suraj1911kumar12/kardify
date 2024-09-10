import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import profileReducer from './slice/profileSlice';
import addressReducer from './slice/addresSlice';
import wishListReducer from './slice/wishlist';
import selectedAddressReducer from './slice/SeletedAddress';
import selectedPayemnt from './slice/selectedPayment';

const Store = configureStore({
  reducer: {
    item: cartReducer,
    profile: profileReducer,
    address: addressReducer,
    wishList: wishListReducer,
    shipping: selectedAddressReducer,
    payment: selectedPayemnt, // add other reducers here as per your requirements
  },
});

export default Store;
