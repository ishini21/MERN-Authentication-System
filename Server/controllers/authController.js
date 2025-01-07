import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';

export const register = async (req,res)=>{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.json({success:false,message:'Missing Details'})
    }
    try{

        const existingUser = await userModel.find({email})

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

    }catch(error){
        res.json({success:false,message: error.message});

    }
}

export const login = async (req, res) => {
    const {email,password} = req.body;

    if(!email || !password) {
        return res.json({success:false,message:'Email and password required'})
    }

    try{
        const user = await userModel.find({email})

        if(!user) {
            return res.json({success:false,message:' Invalid user '});
        }

    }catch(errr){
        res.json({success:false,message: error.message});

    }


};