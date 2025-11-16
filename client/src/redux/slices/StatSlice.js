import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    allUsersCount: 0,
    subscribedCount: 0,
    totalViews: 0,
    totalLectures: 0,
    totalCourses: 0,
    totalPayments: 0,
    totalRevenue: 0,
}

export const getStatsData = createAsyncThunk("stats/get",async()=>{
    try {
        const response = axiosInstance.get('admin/stats/users');
        toast.promise(response,{
            loading : "Fetching Stats",
            success : "Stats fetched successfully",
            error : "Error in fetching Stats"
        });
        console.log("admin stats data ",(await response).data);
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const statSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            console.log("gets stat data fulfilled ",action.payload);
            state.allUsersCount = action.payload.data.users.total;
            state.subscribedCount = action.payload.data.subscriptions.active;
            state.totalViews = action.payload.data.courses.totalLectures;
            state.totalPayments = action.payload?.payments?.totalPayments || 0;
            state.totalRevenue = action.payload?.payments?.totalRevenue || 0;
        });
    },
});

export default statSlice.reducer;