const Messages = require("../models/Messages");
const { uploadImageToCloudinary } = require("../utils/Cloudinary");

exports.getMessages=async(req,res)=>{
    try {
        const user1=req.user.id;
        const user2=req.params.id;

        if(!user1 || !user2){
            return res.status(400).json({
                success:false,
                message:"Users Id is required"
            })
        }

    const messages=await Messages.find({
        $or:[
            {sender:user1,recipient:user2},
            {sender:user2,recipient:user1}
        ]
    }).sort({timeStamp:1})

    return res.status(200).json({
        success:true,
        message:"Messages found",
        messages:messages
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.uploadFile=async(req,res)=>{
    try {
        if(!req.files){
            return res.status(400).json({
                success:false,
                message:"File is missing"
            })
        }

        const {file}=req.files;
        console.log("file is ",file);
        

        if(!file){
            return res.status(400).json({
                success:false,
                message:"File is missing"
            })
        }

        const uploadedFile=await uploadImageToCloudinary(file,process.env.FOLDER_NAME)
        const fileUrl=uploadedFile.secure_url;
        const file_id=uploadedFile.public_id;

        return res.status(200).json({
            success:true,
            message:"File sent successfully",
            fileUrl:fileUrl,
            file_id:file_id
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}