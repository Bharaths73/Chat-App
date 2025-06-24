const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Messages = require("../models/Messages");

exports.searchContacts=async(req,res)=>{
    try {
        const {search}=req.body;

        if(!search){
            return res.status(400).json({
                success:false,
                message:"Search Query is not present"
            })
        }

    const sanitizedsearch=search.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

    const regex=new RegExp(sanitizedsearch,"i");
    const contacts=await User.find({
        $and: [
            { _id: { $ne: req.user.id } },
            {
                $or: [
                    { firstName: regex },
                    { lastName: regex },
                    { email: regex }
                ]
            }
        ]
    });

    return res.status(200).json({
        success:true,
        message:"Contact Found",
        contacts:contacts
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getContactsForDM=async(req,res)=>{
    try {
        const {id}=req.user;

        const userId=new mongoose.Types.ObjectId(id);

        const contacts=await Messages.aggregate([
            {
                $match:{
                    $or:[{sender:userId},{recipient:userId}]
                }
            },
            {
                $sort:{timeStamp:-1}
            },
            {
                $group:{
                    _id:{
                        $cond:{
                            if:{$eq:["$sender",userId]},
                            then:"$recipient",
                            else:"$sender",
                        }
                    },
                    lastMessageTime:{$first:"$timeStamp"},
                }
            },
            {
                $lookup : {
                    from:"users",
                    localField:"_id",
                    foreignField:"_id",
                    as:"contactInfo"
                }
            },{
                $unwind:"$contactInfo",
            },
            {
                $project:{
                    _id:1,
                    lastMessageTime:1,
                    email:"$contactInfo.email",
                    firstName:"$contactInfo.firstName",
                    lastName:"$contactInfo.lastName",
                    image:"$contactInfo.image"
                }
            },
            {
                $sort:{lastMessageTime:-1}
            }
        ])

        return res.status(200).json({
            success: true,
            contacts
        });
    
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllContacts=async(req,res)=>{
    try {
        const users=await User.find({_id:{$ne:req.user.id}},"firstName lastName _id")

        const contacts=users.map((user)=>({
            label:user.firstName ? `${user.firstName} ${user.lastName}` :user.email
        }))

    return res.status(200).json({
        success:true,
        message:"Contacts Found",
        contacts:contacts
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
