import mongoose from "mongoose";

const userSchema = new mongoosse.Schema({

    name: {type:String,reqired:true},
    email: {type:String,reqired:true,unique:true},
    password: {type:String,reqired:true},
    verifyOtp: {type:String,default:''},
    verifyOtpExpireAt: {type:Number,default:0},
    isAccountVerified: {type:Boolean,default:false},
    resetOtp: {type:String,default:''},
    resetOtpExpireAt: {type:Number,default:0},  
    
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;