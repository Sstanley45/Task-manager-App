import React,{useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { AppContext } from '../contexts/appContext'


const ProtectedRoutes = ({children}) => {
    const { user , token } = useContext(AppContext) 
    if (!user && !token) {
        return <Navigate to = '/register' />
     }
  return children
}

export default ProtectedRoutes;