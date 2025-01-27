import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userData:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading:false,
    token:localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
}

const authSlice=createSlice({
    name: 'auth',
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload
        },
        setUserData(state,value){
            state.userData=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        }
    }
})

export const {setToken,setLoading,setUserData}=authSlice.actions;
export default authSlice.reducer;