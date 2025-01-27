const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

exports.connect=()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("Database connected")
    ).catch((error)=>{
        console.log("Database connection failed",error);
        process.exit(1);
    }
    )
}