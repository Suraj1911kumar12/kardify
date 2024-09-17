import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const getWhishList = createAsyncThunk(
  'addres/getAddress',
  async token => {
    try {
      const response = await axios.get('/get-all-addresses', {
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

const initialState = {};

const MainAddress = createSlice({
  name: 'mainAddress',
  initialState,
  reducers: {
    setMainAddress(state, action) {
      // Assuming you want to replace the entire array of addresses
      state.addresses = action.payload;
    },
  },
});

export const {setMainAddress, addAddress} = MainAddress.actions;
export default MainAddress.reducer;
