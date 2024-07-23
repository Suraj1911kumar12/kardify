import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        data: []
    },
    reducers: {
        addUser(state, action) {
            state.data.push(action.payload)
        }
    }
})


export const { addUser } = AuthSlice.actions
export default AuthSlice.reducer