import toast from "react-hot-toast";
import { Contacts } from "../api";
import { apiConnector } from "../apiConnector";

export const getContacts=async(search,token)=>{
    const toastId=toast.loading("Searching...")
    let result=[]
    try {
        const response=await apiConnector('POST',Contacts.SEARCH_CONTACTS_API,{search:search},{Authorization:`Bearer ${token}`,withCredentials:true})

        console.log("Search Response is ",response);

        if(!response.data.success){
            console.log(response.data.message);
            throw new Error(response.data.message)
        }

        result = response.data.contacts ? [...response.data.contacts] : [];
        return result;
    } catch (error) {
        console.log("Search error is ",error);
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Searching failed";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}