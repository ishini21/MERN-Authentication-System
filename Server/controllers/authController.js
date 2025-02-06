import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';


export const register = async (req,res)=>{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.json({success:false,message:'Missing Details'})
    }
    try{

        const existingUser = await userModel.findOne({email})

        if(existingUser){                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            return res.json({success:false,message:'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await userModel({name,email,password:hashedPassword});
        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET ,{expiresIn:'7d'});

        res.cookie('token',token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 *  60 * 60 * 1000
        });

        //sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to MERN-AUTH!",
            text: `Welcome to MERN-AUTH website. Your account has been created with email id:${email}`,
        };

         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        

        return res.json({success: true,message: 'Successfully registered!'});

    }catch (error) {
        console.error('Error:',error); // Log the error message to the console
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
    
}

export const login = async (req, res) => {
    const {email,password} = req.body;

    if(!email || !password) {
        return res.json({success:false,message:'Email and password required'})
    }

    try{
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success:false,message:' Invalid email '});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({success:false,message:' Invalid password '});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET ,{expiresIn:'7d'});

        res.cookie('token',token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 *  60 * 60 * 1000
        });

        return res.json({success: true,message:'successfully logged'});        

    }catch(error){
        res.json({success:false,message: error.message});

    }


};

export const logout = async (req, res) => {

    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({success:true, message:"Logged Out"})

    }catch(error){
        return res.json({success:false,message: error.message});
    }
}

