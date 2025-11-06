import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk("course/lecture/get",async(cId)=>{
    try {
        console.log("course id ", cId);
        const response = axiosInstance.get(`/courses/${cId}`);
        toast.promise(response,{
            loading : "Lectures are loading",
            success : "Lectures fetched successfully",
            error : "Error in fetching lectures"
        });
        console.log("lecture response ",(await response).data);
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const addCourseLecture = createAsyncThunk("course/lecture/add",async(data)=>{
    try {
        const formData = new FormData();
        formData.append("title",data.title);
        formData.append("description",data.description);
        formData.append("video",data.video);
        const response = axiosInstance.post(`/courses/${data.id}`,formData,{
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        });
        toast.promise(response,{
            loading : "adding course Lectures",
            success : "Lectures added successfully",
            error : "Error in adding lectures"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
export const deleteCourseLecture = createAsyncThunk("course/lecture/delete",async(data)=>{
    try {
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response,{
            loading : "deleting course Lecture",
            success : "Lecture deleted successfully",
            error : "Error in deleting lectures"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const LectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseLectures.fulfilled,(state,actions)=>{
        console.log("getting lectures : ",actions.payload.data);
        state.lectures = actions?.payload?.data;
    });
    builder.addCase(addCourseLecture.fulfilled,(state,actions)=>{
        console.log("adding lectures : ",actions);
        state.lectures = actions?.payload?.course?.lectures;
    })
  }
});

export default LectureSlice.reducer;