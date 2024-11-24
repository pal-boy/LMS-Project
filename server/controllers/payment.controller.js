import AppResponse from "../utils/response.util.js"
import User from "../models/user.model.js";
import AppError from "../utils/error.util";

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
    }
}

const verifySubscription = async(req,res,next)=>{

}

const cancelSubscription = async(req,res,next)=>{

}

const getAllPayments = async(req,res,next)=>{

}

export {
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    getAllPayments
}