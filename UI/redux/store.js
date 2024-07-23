import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './AuthSlice'

export const store = configureStore({
    reducer: {
        user: UserReducer
    }
})

export default store