import {Router} from 'express';
import { getProfile, login, logout, register } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const userRouter = Router()

// userRouter.post('/register',register);
userRouter.route('/register').post(upload.single("avatar"),register);
userRouter.post('/login',login);
userRouter.get('/logout',logout);
userRouter.get('/me',isLoggedIn , getProfile);

export default userRouter;