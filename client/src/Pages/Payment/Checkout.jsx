import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiRupee } from "react-icons/bi";
import { buySubscription, getRazorpayKey, verifySubscription } from '../../redux/slices/RazorpaySlice';
import toast from 'react-hot-toast';
import HomeLayout from '../../Layouts/HomeLayout';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpaykey = useSelector((state) => state.razorpay.key);
    const subscription_id = useSelector((state) => state.razorpay.subscription_id);
    const isPaymentVerified = useSelector((state) => state.razorpay.isPaymentVerified);
    const userData = useSelector((state) => state.auth.data);
    const courseData = useSelector((state) => state.course.courseData[0]);
    // console.log("Course Data : ",courseData);
    // console.log("User Data : ",userData);
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature:""
    }

    async function handleSubscription(e) {
        e.preventDefault();
        // console.log("Razorpay Key at checkout:", razorpaykey);
        // console.log("Subscription ID at checkout:", subscription_id);
        if(!razorpaykey || !subscription_id) {
            toast.error("Failed to load razorpay key or subscription id");
            return;
        }
        const options = {
            key: razorpaykey,
            subscription_id: subscription_id,
            name: "Coursify Palboy pvt. ltd.",
            description: "Subscription",
            prefill: {
                name: userData.name,
                email: userData.email,
            },
            theme: {
                color: "#F37254"
            },
            handler: async function(response) {
                console.log("Handler Response : ",response);
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                console.log("Payment Details : ",paymentDetails);
                toast.success("Payment successful");
                const res = await dispatch(verifySubscription(paymentDetails));
                console.log("Verify subscription res :",res);
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        };
        const rzpObj = new window.Razorpay(options);
        rzpObj.open();
    }

    const formData = new FormData();
    formData.append("userId", userData._id);
    formData.append("courseId", courseData._id);
    async function load(){
        await dispatch(getRazorpayKey());
        await dispatch(buySubscription(formData));
    }
    useEffect(() => {
       load();
    }, []);
  return (
    <HomeLayout>
        <form
            onSubmit={handleSubscription}
            className="min-h-[90vh] flex items-center justify-center text-white"
        >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
            <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl0lg rounded-tr-lg">Subscription Bundle</h1>
            <div className="px-4 space-y-5 text-center">
                <p className="text-[17px]">
                    This purchase will allow you to access all available course of our platform for {" "} 
                    <span className="text-yellow-500 font-bold">
                    <br />1 Year duration</span> { " " }
                    All the existing and new launched courses will be also available
                </p>

                <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                    <BiRupee /><span>499</span> only
                </p>
                <div className="text-gray-200">
                    <p>100% refund on cancellation</p>
                    <p>* Terms and conditions applied *</p>
                </div>
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                    Buy now
                </button>
            </div>
        </div>

        </form>
    </HomeLayout>
  );
};

export default Checkout
