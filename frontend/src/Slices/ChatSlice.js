import { createSlice } from "@reduxjs/toolkit"

const initialState={
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages:undefined,
}

const chatSlice=createSlice({
    name:'chat',
    initialState,
    reducers:{
        setSelectedChatType(state,value){
            state.selectedChatType=value.payload
        },
        setSelectedChatData(state,value){
            state.selectedChatData=value.payload
        },
        setSelectedChatMessages(state,value){
            state.selectedChatMessages=value.payload
        },
        closeChat(state,value){
            state.selectedChatType = undefined;
            state.selectedChatData = undefined;
            state.selectedChatMessages = undefined;
        }
    }
})

export const {setSelectedChatType,setSelectedChatData,setSelectedChatMessages,closeChat}=chatSlice.actions;
export default chatSlice.reducer;