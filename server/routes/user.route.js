import {Router} from 'express';
import { forgotPassword, getProfile, login, logout, register, resetPassword } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const userRouter = Router()

// userRouter.post('/register',register);
userRouter.route('/register').post(upload.single("avatar"),register);
userRouter.post('/login',login);
userRouter.get('/logout',logout);
userRouter.get('/me',isLoggedIn , getProfile);
userRouter.post("/forgotPassword",forgotPassword);
userRouter.post("/resetPassword/:resetToken",resetPassword);

export default userRouter;