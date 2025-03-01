import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: [],
}

export const getAllCourses = createAsyncThunk("course/getAllCourses",   async()=>{
    try {
        const res = axiosInstance.get("/courses",{withCredentials:true});
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

export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.post("/courses", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Credentials': true
            }
        });
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course"
        });

        return (await response).data

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

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