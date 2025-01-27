import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../Helpers/axiosInstance.js'
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
};

export const createAccount = createAsyncThunk("/auth/signup", async(data)=>{
    try {
        // console.log("Request Payload:", data);
        const res = axiosInstance.post("user/register",data);
        toast.promise(res,{
            loading: "Wait! Creating your account",
            success : (data)=>{
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});


export const login = createAsyncThunk("/auth/login", async(data)=>{
    try {
        // console.log("Request Payload:", data);
        const res = axiosInstance.post("user/login",data);
        toast.promise(res,{
            loading: "Wait! Logging to your account",
            success : (data)=>{
                return data?.data?.message;
            },
            error: "Failed to login"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

export const logout = createAsyncThunk("/auth/logout", async()=>{
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res,{
            loading: "Wait! Logging out",
            success : (data)=>{
                return data?.data?.message;
            },
            error: "Failed to logout"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, response) => {
            localStorage.setItem("data", JSON.stringify(response?.payload?.data));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", response?.payload?.data?.role);
            state.isLoggedIn = true;
            state.data = response?.payload?.data;
            state.role = response?.payload?.data?.role
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.data = {};
            state.role = ""
        })
        .addCase(getUserData.fulfilled, (state, response) => {
            if(!response?.payload?.data) return;
            localStorage.setItem("data", JSON.stringify(response?.payload?.data));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", response?.payload?.data?.role);
            state.isLoggedIn = true;
            state.data = response?.payload?.data;
            state.role = response?.payload?.data?.role
        });
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;