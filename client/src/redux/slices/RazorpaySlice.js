import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
};

export const getRazorpayKey = createAsyncThunk("/payment/key", async () => {
    try {
        const res = await axiosInstance.get("/payments/razorpay-key");
        return res.data;
    } catch(error) {
        toast.error(error.message);
    }
});

export const buySubscription = createAsyncThunk("/payment/subscription", async (data) => {
    // console.log("Request Payload Data:", data);
    try {
        const res = await axiosInstance.post("/payments/subscribe",data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return res.data;
    } catch(error) {
        toast.error(error.message);
    }
});

export const verifySubscription = createAsyncThunk("/payment/verify", async (data) => {
    console.log("Verify Subscription Data2:", data);
    try {
        const response = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return response.data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const cancelSubscription = createAsyncThunk("/payment/cancel", async () => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "unsubscribing the bundle",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to ubsubscribe"
        })
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const getAllPayments = createAsyncThunk("/payment/all", async () => {
    try {
        const response = axiosInstance.get("/payments?count=100", );
        toast.promise(response, {
            loading: "Getting the payment records",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to get payment records"
        })
        return (await response).data;
    } catch(error) {
        toast.error("Operation failed");
    }
});

const PaymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorpayKey.fulfilled, (state, action) =>{
            // console.log("Razorpay Key:", action?.payload?.data);
            state.key = action?.payload?.data;
        })
        .addCase(buySubscription.fulfilled, (state, action) => {
            // console.log("Subscription ID:", action?.payload?.data.id);
            state.subscription_id = action?.payload?.data.id;
        })
        .addCase(verifySubscription.fulfilled, (state, action) => {
            console.log("verifySubcription : ",action?.payload);
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(verifySubscription.rejected, (state, action) => {
            console.log(action);
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(getAllPayments.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.allPayments;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })
    }
});

export default PaymentSlice.reducer;