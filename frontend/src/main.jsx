import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './Reducer/index.js'
import { SocketProvider } from './context/SocketContext.jsx'


const store=configureStore({
    reducer:rootReducer
})

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
       <Provider store={store}>
            <SocketProvider>
                <App />
                <Toaster/>
            </SocketProvider>
       </Provider>
    </BrowserRouter>
)
