import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
import io from 'socket.io-client'
import { addMessage, setDirectMessagesContacts } from "../Slices/ChatSlice";

const SocketContext = createContext(null);

export const useSocket=()=>{
    return useContext(SocketContext);
}

export const SocketProvider=({children})=>{
    const socket=useRef();
    const {userData}=useSelector((state)=>state.auth);
    const {selectedChatType,selectedChatData,selectedChatMessages}=useSelector((state)=>state.chat)
    const dispatch=useDispatch()

    

    useEffect(()=>{
        if(userData){
            socket.current=io(SERVER_URL,{query:{userId:userData._id}});
            
            socket.current.on('connect',()=>{
                console.log('Connected to socket');
            })

            const handleReceiveMessage=(message)=>{
                console.log("selected chat ",selectedChatData);
                console.log("client message is ",message);
                
                // if(selectedChatType && ( selectedChatData?._id===message?.sender?._id || selectedChatData?._id===message?.recipient?._id)){
                //     console.log("message rec ",message);
                //     dispatch(addMessage(message))
                // }

                dispatch(addMessage(message))
                if(message.recipient._id!==userData._id){
                    dispatch(setDirectMessagesContacts(message.recipient))
                }
                else{
                    dispatch(setDirectMessagesContacts(message.sender))
                }
                
            }

            socket.current.on('receiveMessage',handleReceiveMessage)

            return ()=>{
                if(socket.current){
                    socket.current.disconnect();
                }}
        } 
        // else{
        //     if (socket.current) {
        //         socket.current.disconnect();
        //         socket.current = null;
        //         // setSocketInstance(null);
        //       }
        // }
        
    },[userData])

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
}