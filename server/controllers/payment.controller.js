import AppResponse from "../utils/response.util.js"
import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import { razorpay } from "../server.js";
import Payment from "../models/payment.model.js";

const getRazorpayApiKey = async(req,res,next)=>{
    const key = process.env.RAZORPAY_KEY_ID;
    res.status(200).json(
        new AppResponse(200,key,"Razorpay API Key")
    )
}

const buySubscription = async(req,res,next)=>{
    const {id} = req.user;
    const user = await User.findById(id);
    if (!user) {
        return next(
            new AppError(400,"Unauthorized user , please login!")
        );
    }

    if (user.role === 'ADMIN') {
        return next(
            new AppError(400,"You are ADMIN , you can't purchase!!")
        );
    };

    const subscription = await razorpay.subscriptions.create({
        plain_id : process.env.RAZORPAY_PLAN_ID,
        customer_notify : 1
    });
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json(
        new AppResponse(200,subscription.id,"Subscribed successfully")
    )
}

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