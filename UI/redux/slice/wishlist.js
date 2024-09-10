import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from '../../../axios';

// Fetch wishlist
export const getWhishList = createAsyncThunk(
  'wishList/getWhishList',
  async token => {
    try {
      const response = await axios.get('/get-all-wishlists', {
        headers: {Authorization: token},
      });
      if (response.data.code === 200) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  },
);
// Add to wishlist
export const addWishList = createAsyncThunk(
  'wishList/addWishList',
  async cred => {
    try {
      // Check if item already exists in the wishlist
      const checkResponse = await axios.get('/get-all-wishlists', {
        headers: {Authorization: cred.token},
      });

      if (checkResponse.data.code === 200) {
        const existingItems = checkResponse.data.data;
        const itemExists = existingItems.some(
          item => item.product_id === cred.id,
        );

        if (itemExists) {
          throw new Error('Item already in wishlist');
        }
      }

      // Add to wishlist if it does not exist
      const response = await axios.post(
        '/add-to-wishlist',
        {
          product_id: cred.id,
        },
        {
          headers: {Authorization: cred.token},
        },
      );

      if (response.data.status === 'error') {
        throw new Error('Error adding to wishlist');
      } else {
        return response.data.data; // This should be the newly added item or updated wishlist
      }
    } catch (error) {
      console.error(
        'Error adding to wishlist:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  },
);
let initialState = {
  loading: false,
  data: [],
  error: null,
};
const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getWhishList.pending, state => {
        state.loading = true;
      })
      .addCase(getWhishList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getWhishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addWishList.pending, state => {
        state.loading = true;
      })
      .addCase(addWishList.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload;
        // Check if the item already exists in the state
        const itemExists = state.data.some(
          item => item?.product_id === newItem?.product_id,
        );

        if (!itemExists) {
          state.data.push(newItem);
        }
      })
      .addCase(addWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default wishListSlice.reducer;
