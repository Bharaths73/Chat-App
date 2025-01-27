import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Auth from './Pages/Auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import Chat from './Pages/Chat'
import PrivateRoute from './components/Auth/PrivateRoute'
import PublicRoute from './components/Auth/PublicRoute'
import Profile from './Pages/Profile'

function App() {

  return (
    <Routes>
      <Route path='/' element={<PublicRoute><Auth/></PublicRoute>}/>
      <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>}/>
      <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
      <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}

export default App
