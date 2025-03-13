import express from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendverifyOtp, verifyEmail,adminaccess } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
import checkRole from '../middleware/checkRole.js';
const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendverifyOtp);
authRouter.post('/verify-account',userAuth,verifyEmail);
authRouter.get('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);
authRouter.get('/adminaccess',userAuth,checkRole(["admin"]),adminaccess)




export default authRouter;

