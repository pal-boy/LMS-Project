import AppResponse from "../utils/response.util.js"
import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import { razorpay } from "../server.js";
import Payment from "../models/payment.model.js";
import Subscription from "../models/subscription.model.js";

const getRazorpayApiKey = async(req,res,next)=>{
    const key = process.env.RAZORPAY_KEY_ID;
    console.log("Razorpay API Key : ",key);
    res.status(200).json(
        new AppResponse(200,key,"Razorpay API Key")
    )
}

// const buySubscription = async(req,res,next)=>{
//     const {id} = req.user;
//     const user = await User.findById(id);
//     if (!user) {
//         return next(
//             new AppError(400,"Unauthorized user , please login!")
//         );
//     }

//     if (user.role === 'ADMIN') {
//         return next(
//             new AppError(400,"You are ADMIN , you can't purchase!!")
//         );
//     };

//     try {
//         const subscription = await razorpay.subscriptions.create({
//             plan_id : process.env.RAZORPAY_PLAN_ID,
//             customer_notify : 1
//         });
//         console.log("Subscription : ",subscription);
//         user.subscription.id = subscription.id;
//         user.subscription.status = subscription.status;
    
//         await user.save();
    
//         res.status(200).json(
//             new AppResponse(200,subscription.id,"Subscribed successfully")
//         )
//     } catch (error) {
//         return next(
//             new AppError(500,"Payment failed , please try again later!")
//         );
        
//     }
// }
const buySubscription = async (req, res,next) => {
    try {
        console.log("Request Body:", req.body);
        const { userId, courseId } = req.body;

        if (!userId || !courseId) {
            return next(
                new AppError(400, "User ID and Course ID are required to buy a subscription.")
            );
        }

        // Define Razorpay Subscription Plan Details
        const subscriptionOptions = {
            plan_id: process.env.RAZORPAY_PLAN_ID, // Predefined plan in Razorpay dashboard
            customer_notify: 1,
            total_count: 12, // Example: 12 months
        };

        // Create a new Razorpay subscription
        const subscription = await razorpay.subscriptions.create(subscriptionOptions);

        // Save subscription details in the database
        const newSubscription = new Subscription({
            userId,
            courseId,
            razorpaySubscriptionId: subscription.id,
            status: "pending",
        });

        await newSubscription.save();

        res.status(200).json(
            new AppResponse(200, subscription, "Subscribed successfully")
        );

    } catch (error) {
        console.error("Error in buying subscription:", error);
        return next(
            new AppError(500, "Payment failed, please try again later.")
        );
    }
};

const verifySubscription = async(req,res,next)=>{
    const {id} = req.user;
    const {razorpay_payment_id , razorpay_signature , razorpay_subscription_id} = req.body;

    const user = await User.findById(id);
    if (!user) {
        return next(
            new AppError(400,"Unauthorized user , please login!")
        );
    };

    const subscriptionId = user.subscription.id;
    const generatedSignature = crypto
                .createHmac('sha256' , process.env.RAZORPAY_SECRET)
                .update(`${razorpay_payment_id}|${subscriptionId}`)
                .digest('hex');
    
    if (generatedSignature !== razorpay_signature) {
        return next(
            new AppError(500,"Payment failed , please try again later!")
        );
    };

    await Payment.create({
        razorpay_payment_id , 
        razorpay_signature , 
        razorpay_subscription_id
    });

    user.subscription.status = 'active';
    await user.save();

    res.status(200).json(
        new AppResponse(200,"Payment varified successfully")
    )
}

const cancelSubscription = async(req,res,next)=>{
    const {id} = req.user;
    const user = await User.findById(id);
    if (!user) {
        return next(
            new AppError(400,"Unauthorized user , please login!")
        );
    }

    if (user.role === 'ADMIN') {
        return next(
            new AppError(400,"You are ADMIN , you can't purchase or cancel subscription!!")
        );
    };

    const subscriptionId = user.subscription.id;
    const cancelSubscription = await razorpay.subscriptions.cancel(subscriptionId);

    user.subscription.status = cancelSubscription.status;
    await user.save();

    res.status(200).json(
        new AppResponse(200 , "Subscription cancelled")
    );
}

const getAllPayments = async(req,res,next)=>{
    const {count} = req.query;

    const subscriptions = await razorpay.subscriptions.all({
        count : count || 10
    });

    res.status(200).json(
        new AppResponse(200, subscriptions , "All Payments")
    );
}

export {
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    getAllPayments
}