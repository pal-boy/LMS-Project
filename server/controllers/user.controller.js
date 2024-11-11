import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import AppResponse from "../utils/response.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs'

const cookieOptions = {
    maxAge: 7*24*60*60*1000 , // 7 days
    httpOnly: true,
    secure: true
};

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
            public_id: "",
            secure_url: ''
        }
    });
    if (!user) {
        return next(new AppError(401 , "User registration failed")); 
    }

    // file upload
    if (req.file) {
        console.log(req.file);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                height:250,
                width:250,
                gravity: 'faces',
                crop: 'fill'
            });
            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // remove file from server
                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (error) {
            return next(new AppError(400 , "Error while uploading avatar"));
        }
    }

    await user.save();

    user.password = undefined;

    const token = await user.generateJWTtoken();
    res.cookie('token' , token, cookieOptions);

    return res.status(200).json(
        new AppResponse(200,user,"User registered successfully")
    );
};


const login = async(req,res,next)=>{
    try {
        const {email, password} = req.body;
    
        if (!email || !password) {
            return next(new AppError(400 , "All fields are required"));
        }
    console.log("at login-",email,password);
        const user = await User.findOne({email}).select('+password');
        if (!user || !user.comparePassword(password)) {
            return next(new AppError(403 , "Email or password does not match"));
        }
    
        const token = await user.generateJWTtoken();
        user.password = undefined;
        res.cookie('token' , token, cookieOptions);
    
        return res.status(200).json(
            new AppResponse(200,user,"User logged in successfully")
        );
    } catch (error) {
        return next(new AppError(407 , error.message));
    }
};



const logout = (req,res)=>{
    res.cookie('token',null,{
        httpOnly: true,
        secure: true,
        maxAge: 0
    });

    return res.status(200).json(
        new AppResponse(200,"User logged out successfully")
    );
};


const getProfile = async(req,res,next)=>{
    try {
        const userId = req.user.id;
        console.log(userId);
        const user = await User.findById({userId});
        console.log(user);
        return res.status(200).json(
            new AppResponse(200,user,"User profile fetched successfully")
        );
    } catch (error) {
        return next(new AppError(403 , "Failed to fetch profile details"));
    }
};

export {
    register,
    login,
    logout,
    getProfile
}