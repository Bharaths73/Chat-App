const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const database=require('./config/database');
const authRoutes=require('./routes/Auth');
const profileRoutes=require('./routes/Profile');
const contactsRoutes=require('./routes/Contacts')
const messageRoutes=require('./routes/Messages')
const fileUpload=require('express-fileupload');
const { cloudinaryConnection } = require('./config/cloudinary');
const { setupSocket } = require('./socket');
const http=require('http')
const PORT=process.env.PORT || 3000;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://chat-app-frontend-at2y.onrender.com",
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
app.use('/api/v1/contacts',contactsRoutes);
app.use('/api/v1/messages',messageRoutes);

// app.use('/',(req,res)=>{
//     console.log("Server is running");
//     return res.status(200).json({
//         success:true,
//         message:"Server is running"
//     })
// })


const server = http.createServer(app);
setupSocket(server);

server.listen(PORT,()=>{
    console.log('Server is running on port ',PORT);
})
