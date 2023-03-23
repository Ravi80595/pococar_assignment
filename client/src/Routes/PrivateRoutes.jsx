import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const isAuth=localStorage.getItem("pococareToken")

if(isAuth == " "  || isAuth == null){
    return <Navigate to="/Login"/>
}
    return children
}

export default PrivateRoute
