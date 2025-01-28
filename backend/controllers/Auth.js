const User = require("../models/User");
const bcrypt=require('bcrypt');
const Jwt=require('jsonwebtoken');

const createToken=(payload)=>{
    const token=Jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'});
    return token;
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        console.log("email and password ",email," ",password);
        
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password are required",
        }
        )
    }

    const user=await User.findOne({email:email});

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found",
        })
    }

    if(await bcrypt.compare(password,user.password)){
        const payload={
            email:user.email,
            id:user._id,
        }
        
        const token=createToken(payload);

        user.token=token;
        user.password=undefined;

        const options={
            expires:new Date(Date.now()+2*24*60*60*1000),
            httpOnly:true,
        }

        res.cookie('token',token,options).status(200).json({
            success:true,
            message:"Login Successfull",
            user:user,
        })
    }
    else{
        return res.status(401).json({
            success:false,
            message:"Password is incorrect",
        })
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        })
    }
}

exports.signUp=async(req,res)=>{
    try {
        const {email,password,confirmPassword}=req.body;

        if(!email || !password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Email and password are required",
            })
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password should be same",
            })
        }

        const existingUser=await User.findOne({email:email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists",
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=await User.create({
            email:email,
            password:hashedPassword,
            firstName:null,
            lastName:null,
            image:null, 
            image_id:null,
            profileSetup:false,
        })

        const payload={
            email:newUser.email,
            id:newUser._id,
        }

        const token=createToken(payload);
        
        newUser.token=token;
        newUser.password=undefined;

        const options={
            expires:new Date(Date.now()+2*24*60*60*1000),
            httpOnly:true,
        }

        return res.cookie('token',token,options).status(200).json({
            success:true,
            message:"User is registered successfully",
            user:newUser,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        })
    }
}

exports.logout=async(req,res)=>{
    try {
        const options={
            expires:new Date(Date.now()-1000),
            httpOnly:true,
        }

        res.cookie('token',"",options).status(200).json({
            success:true,
            message:"Logout Successfull",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        })
    }
}