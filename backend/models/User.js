const mongoose=require('mongoose');

const User=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    firstName:{
        type:String,
        required:false,
        trim:true,
    },
    lastName:{
        type:String,
        required:false,
        trim:true,
    },
    image:{
        type:String,
        required:false,
    },
    image_id:{
        type:String,
        required:false,
    },
    profileSetup:{
        type:Boolean,
        default:false,
    },
    token:{
        type:String,
    }
})

module.exports=mongoose.model('User',User);