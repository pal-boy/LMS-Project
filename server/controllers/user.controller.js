import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import AppResponse from "../utils/response.util.js";

const register = async(req,res,next)=>{
    const {fullname , email, password} = req.body;

    if (!fullname || !email || !password) {
        return next(new AppError(400 , "All fields are required"));
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        return next(new AppError(401 , "User already exists"));
    }

    const user = await User.create({
        fullname,email,password,
        avatar:{
            public_id: email,
            secure_url: 'empty'
        }
    });
    if (!user) {
        return next(new AppError(401 , "User registration failed")); 
    }

    // TODO : file upload

    await user.save();

    user.password = undefined;

    res.status(200).json(
        new AppResponse(200,user,"User registered successfully")
    );
};


const login = (req,res)=>{

};


const logout = (req,res)=>{

};


const getProfile = (req,res)=>{

};

export {
    register,
    login,
    logout,
    getProfile
}