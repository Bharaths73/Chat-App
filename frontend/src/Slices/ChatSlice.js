import { createSlice } from "@reduxjs/toolkit"

const initialState={
    selectedChatType:null,
    selectedChatData:null,
    selectedChatMessages:[],
    directMessagesContacts:[],
    // isUploading:false,
    // isDownloading:false,
    // fileUploadProgress:0,
    // fileDownloadProgress:0,
}

const chatSlice=createSlice({
    name:'chat',
    initialState,
    reducers:{
        setSelectedChatType(state,value){
            state.selectedChatType=value.payload
        },
        setSelectedChatData: (state, action) => {
            state.selectedChatData = action.payload; 
        },
        setSelectedChatMessages(state,value){
            state.selectedChatMessages=value.payload
        },
        setDirectMessagesContacts(state,value){
            if (Array.isArray(value.payload)) {
                state.directMessagesContacts = value.payload;
            } else {
                const exists = state.directMessagesContacts.some(
                    contact => contact._id === value.payload._id
                );
        
                if (!exists) {
                    state.directMessagesContacts.unshift(value.payload);
                }
            }
        },
        addMessage(state,action){
            const message = action.payload;
            if (
                state.selectedChatType &&
                (state.selectedChatData?._id === message?.sender?._id ||
                    state.selectedChatData?._id === message?.recipient?._id)
            ) {
                state.selectedChatMessages.push({
                    ...action.payload,
                    recipient:
                        state.selectedChatType === "channel"
                            ? action.payload.recipient
                            : action.payload.recipient._id,
                    sender:
                        state.selectedChatType === "channel"
                            ? action.payload.sender
                            : action.payload.sender._id,
                });

    }
        },
        closeChat(state,value){
            state.selectedChatType = undefined;
            state.selectedChatData = undefined;
            state.selectedChatMessages = []
        }
    }
})

export const {setSelectedChatType,setSelectedChatData,setSelectedChatMessages,closeChat,addMessage,setDirectMessagesContacts}=chatSlice.actions;
export default chatSlice.reducer;