import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB  = async () =>{
    mongoose.connection.on('connected',()=>console.log("Database connected"));

    await mongoose.connect(`${process.env.MONGODB_URL}mern-Auth`)

}

export default connectDB;





