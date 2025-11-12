import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    allUsersCount: 0,
    subscribedCount: 0,
    totalViews: 0,
}

export const getStatsData = createAsyncThunk("stats/get",async()=>{
    try {
        const response = axiosInstance.get('admin/stats/users');
        toast.promise(response,{
            loading : "Fetching Stats",
            success : "Stats fetched successfully",
            error : "Error in fetching Stats"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const statSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export default statSlice.reducer;