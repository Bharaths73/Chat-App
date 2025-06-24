const {Server}=require('socket.io');
const Messages = require('./models/Messages');
require('dotenv').config();

exports.setupSocket=(server)=>{
    const io=new Server(server,{
        cors:{
            origin:"https://chat-app-frontend-at2y.onrender.com",
            methods:["GET", "POST"],
            credentials:true,
        }
    })

    const userSocket=new Map();

    io.on('connection',(socket)=>{
        console.log('User connected');
        const userId=socket.handshake.query.userId;
        if(userId){
            userSocket.set(userId,socket.id);
            console.log(userSocket);
        }
        else{
            console.log('No user id found');
        }
        socket.on('sendMessage',async(message)=>{
            const senderSocketId=userSocket.get(message.sender);
            const recipientSocketId=userSocket.get(message.recipient);
            console.log("new message ",senderSocketId," ",recipientSocketId);
            

            const createdMessage=await Messages.create(message)

            const messageData=await Messages.findById(createdMessage._id).populate("sender","_id email firstName lastName image").populate("recipient","_id email firstName lastName image")
            if(messageData){
                console.log("message is ",messageData);
            }
            else{
                console.log("no message");
                
            }
            

            if(recipientSocketId){
                io.to(recipientSocketId).emit('receiveMessage',messageData)
            }

            if(senderSocketId){
                io.to(senderSocketId).emit('receiveMessage',messageData)
            }
        })
        socket.on('disconnect',()=>{
            console.log('User disconnected ',socket.id);
            for(const [userId,socketId] of userSocket.entries()){
                if(socketId===socket.id){
                    userSocket.delete(userId);
                    break;
        }}})
    })
}

