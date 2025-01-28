const User = require("../models/User");

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