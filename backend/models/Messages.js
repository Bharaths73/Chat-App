const mongoose=require('mongoose')

const MessageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false
    },
    messageType:{
        type:String,
        enum:["text","file"],
        required:true
    },
    content:{
        type:String,
        required:function(){
            return this.messageType==='text'
        }
    },
    fileUrl:{
        type:String,
        required:function(){
            return this.messageType==='file'
        }
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Messages',MessageSchema)