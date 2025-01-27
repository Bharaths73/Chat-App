const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const database=require('./config/database');
const authRoutes=require('./routes/Auth');
const profileRoutes=require('./routes/Profile');
const fileUpload=require('express-fileupload');
const { cloudinaryConnection } = require('./config/cloudinary');
const PORT=process.env.PORT || 3000;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

cloudinaryConnection();

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/profile',profileRoutes);

// app.use('/',(req,res)=>{
//     console.log("Server is running");
//     return res.status(200).json({
//         success:true,
//         message:"Server is running"
//     })
// })

app.listen(PORT,()=>{
    console.log('Server is running on port ',PORT);
})
