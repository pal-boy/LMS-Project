import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './slices/AuthSlice.js';
import courseSliceReducer from './slices/CourseSlice.js';
import razorpaySliceReducer from './slices/RazorpaySlice.js';
import lectureSliceReducer from './slices/LectureSlice.js';
import statSliceReducer from './slices/StatSlice.js';

const store = configureStore({
    reducer: {
        auth : authSliceReducer,
        course : courseSliceReducer,
        razorpay : razorpaySliceReducer,
        lectures : lectureSliceReducer,
        stats : statSliceReducer,
    },
    devTools: true
});

export default store;