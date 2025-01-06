import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.port || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));

app.get('/', (req, res) => 
    res.send("API Working fine"));

app.listen(port, ()=>console.log(`listening on port : ${port}`));


