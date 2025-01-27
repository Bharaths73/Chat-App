import { apiConnector } from "../apiConnector";
import {Auth, Profile} from '../api'
import toast from "react-hot-toast";
import { setToken, setUserData } from "../../Slices/AuthSlice";

export async function login({email,password},dispatch,navigate) {
    const toastId=toast.loading("Logging in...")
    try {
        const result=await apiConnector('post',Auth.LOGIN_API,{email,password})

        console.log("Login Response is ",result);

        if(!result.data.success){
            console.log(result.data.message);
            throw new Error(result.data.message)
        }

        dispatch(setToken(result.data.user.token));
        dispatch(setUserData(result.data.user))
        localStorage.setItem("token", JSON.stringify(result.data.user.token))
        localStorage.setItem("user", JSON.stringify(result.data.user))
        navigate('/chat')
        toast.success("Login Success")
        // return result.data;
    } catch (error) {
        console.log("login error is ",error);
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Login failed";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export async function signUp({email,password,confirmPassword}) {
    const toastId=toast.loading("Creating...")
    try {
        const result=await apiConnector('post',Auth.SIGNUP_API,{email,password,confirmPassword})

        console.log("Signup Response is ",result);

        if(!result.data.success){
            console.log(result.data.message);
            throw new Error(result.data.message)
        }

        toast.success("Created Account Successfully")
        return result.data;
    } catch (error) {
        console.log("Signup error is ",error);
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to create account";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}


export async function updateUserData({firstName,lastName},dispatch,token,navigate) {
    const toastId=toast.loading("Updating...")
    try {
        const result=await apiConnector('put',Profile.UPDATE_USER_API,{firstName,lastName},{Authorization:`Bearer ${token}`,withCredentials:true})

        console.log("Update Response is ",result);

        if(!result.data.success){
            console.log(result.data.message);
            throw new Error(result.data.message)
        }

        dispatch(setUserData(result.data.user))
        localStorage.setItem("user", JSON.stringify(result.data.user))
        toast.success("Successfully Updated")
        navigate('/chat');
    } catch (error) {
        console.log("Update error is ",error);
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Update failed";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export async function updateProfileImage(formData,dispatch,token) {
    const toastId=toast.loading("Updating...")
    try {
        console.log(formData);
        const result=await apiConnector('POST',Profile.UPDATE_USER_IMAGE_API,formData,{Authorization:`Bearer ${token}`,withCredentials:true, "Content-Type": "multipart/form-data"})

        console.log("Update Response is ",result);

        if(!result.data.success){
            console.log(result.data.message);
            throw new Error(result.data.message)
        }

        dispatch(setUserData({...result.data.user,image_id: result.data.image_id}))
        localStorage.setItem("user", JSON.stringify({...result.data.user,image_id: result.data.image_id}))
        toast.success("Successfully Updated Profile Image")
    } catch (error) {
        console.log("Update error is ",error);
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Update failed";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}


export async function deleteProfileImage(dispatch,token,image_id) {
    const toastId=toast.loading("Deleting...")
    try {
        console.log(image_id);
        
        const result=await apiConnector('DELETE',Profile.DELETE_USER_IMAGE_API,{image_id:image_id},{Authorization:`Bearer ${token}`,withCredentials:true})

        console.log("Delete Response is ",result);

        if(!result.data.success){
            console.log(result.data.message);
            throw new Error(result.data.message)
        }

        dispatch(setUserData(result.data.user))
        localStorage.setItem("user", JSON.stringify(result.data.user))
        toast.success("Successfully Deleted Profile Image")
    } catch (error) {
        console.log("Delete error is ",error);
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Deletion failed";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}