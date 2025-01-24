import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: [],
}

export const getAllCourses = createAsyncThunk("course/getAllCourses",   async()=>{
    try {
        const res = axiosInstance.get("/courses");
        toast.promise(res,{
            loading: "Wait! Courses are loading",
            success: "couses fetched successfully",
            error: "Failed to fetch courses"
        });
        return (await res).data.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
}); // Add the API endpoint here

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getAllCourses.fulfilled, (state,action)=>{
            if(action.payload){
                state.courseData = [...action.payload];
            }
        })
    },
});

export default courseSlice.reducer;