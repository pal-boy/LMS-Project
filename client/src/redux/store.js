import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './slices/AuthSlice.js';
import courseSliceReducer from './slices/CourseSlice.js';
import razorpaySliceReducer from './slices/RazorpaySlice.js';

const store = configureStore({
    reducer: {
        auth : authSliceReducer,
        course : courseSliceReducer,
        razorpay : razorpaySliceReducer
    },
    devTools: true
});

export default store;