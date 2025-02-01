import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PublicRoute({children}) {
   const {token}=useSelector((state)=>state.auth);
   
   if(token!==null){
      return <Navigate to='/chat'/>
   }
   return children;
}

export default PublicRoute