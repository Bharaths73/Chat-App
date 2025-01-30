import toast from "react-hot-toast";
import { Messages } from "../api";
import { apiConnector } from "../apiConnector";
import { setSelectedChatMessages } from "../../Slices/ChatSlice";

export const getMessages=async(token,dispatch,id)=>{
    const toastId=toast.loading("Getting Messages...")
    let result=[]
    try {
        const response=await apiConnector('GET',Messages.GET_MESSAGES_API+`/${id}`,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        console.log("Get Messages Response is ",response);

        if(!response.data.success){
            console.log(response.data.message);
            throw new Error(response.data.message)
        }

        response.data.messages ? dispatch(setSelectedChatMessages(response.data.messages)): null;
        // return result;
        toast.success("Messages fetched Successfully")
    } catch (error) {
        console.log("Get messages error is ",error);
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Getting messages failed";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const sendFile=async(formData,token,dispatch)=>{
    const toastId=toast.loading("Sending File...")
    let result=null;
    try {
        const response=await apiConnector('POST',Messages.UPLOAD_FILE_API,formData,{Authorization:`Bearer ${token}`,withCredentials:true,"Content-Type": "multipart/form-data"})

        console.log("Sending File Response is ",response);

        if(!response.data.success){
            console.log(response.data.message);
            throw new Error(response.data.message)
        }
        result=response.data.fileUrl ? response.data.fileUrl : null;
        toast.success("File sent Successfully")
        return result;
    } catch (error) {
        console.log("File error is ",error);
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to send file";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}