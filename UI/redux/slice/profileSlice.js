import { createSlice } from '@reduxjs/toolkit';

const initialState = null; // Start with null or an empty object

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile(state, action) {
      return action.payload; // Replace the current state with the new profile
    },
    removeProfile() {
      return null; // Clear the profile when removed
    },
  },
});

export const { addProfile, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;
