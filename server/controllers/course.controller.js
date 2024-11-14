import Course from "../models/courses.model.js"
import AppError from "../utils/error.util.js";
import AppResponse from "../utils/response.util.js";

const getAllCourses = async(req,res,next)=>{
    try {
        const courses = await Course.findOne({}).select('-lectures');
        if (!courses) {
            return next(new AppError(400 , "No couses found"));
        }
        return res.status(200).json(
            new AppResponse(200,courses,"All courses fetched successfully")
        );
    } catch (error) {
        return next(new AppError(400 , "Failed to get all courses"));
    }
}


const getCourseById = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const course = await Course.findById({id});

        if (!course) {
            return next(new AppError(400 , "No such couse is exist"));
        }

        return res.status(200).json(
            new AppResponse(200,course.lectures,"Course fetched successfully")
        );
    } catch (error) {
        return next(new AppError(400 , "Failed to get the course"));
    }
}

export {
    getAllCourses,
    getCourseById
}