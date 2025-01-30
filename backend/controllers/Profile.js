const User = require("../models/User");
const { uploadImageToCloudinary, deleteImageFromCloudinary } = require("../utils/Cloudinary");
const cloudinary=require('cloudinary').v2
require('dotenv').config();

exports.updateUserData=async(req,res)=>{
    try {
        const {id,email}=req.user;
        const {firstName,lastName}=req.body;

        if(!firstName || !lastName){
            return res.status(400).json({
                success:false,
                message:"First Name and Last Name are required",
            })
        }

        const userData=await User.findById(id);

        if(!userData){
            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        }

        const updatedUser=await User.findByIdAndUpdate({_id:id},{firstName:firstName,lastName:lastName,profileSetup:true},{new:true},{runValidators:true});

        return res.status(200).json({
            success:true,
            message:"User data updated successfully",
            user:updatedUser,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateUserImage=async(req,res)=>{
    try {
        console.log(req.files);
        const {profileImage}=req.files;
        const {id}=req.user;

        if(!profileImage){
            return res.status(400).json({
                success:false,
                message:"Profile Image is required",
            })
        }

        const updatedPicture=await uploadImageToCloudinary(profileImage,process.env.FOLDER_NAME)
        const pictureUrl=updatedPicture.secure_url;
        const image_id=updatedPicture.public_id;

        const updatedUser=await User.findByIdAndUpdate({_id:id},{image:pictureUrl,image_id:image_id},{new:true},{runValidators:true});

        return res.status(200).json({
            success:true,
            message:"User image updated successfully",
            user:updatedUser,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.deleteUserImage=async(req,res)=>{
    try {
        const {id}=req.user;
        const {image_id}=req.body;
        console.log(image_id);

        if (!image_id) {
            return res.status(400).json({
                success: false,
                message: "Image ID is required",
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await deleteImageFromCloudinary(image_id)

        const updatedUser=await User.findByIdAndUpdate({_id:id},{image:null,image_id:null},{new:true},{runValidators:true});

        return res.status(200).json({
            success:true,
            message:"User image deleted successfully",
            user:updatedUser,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
