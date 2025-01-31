import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PFTContext } from '../../store/store'

function ProtectedRoutes() {
    const context = useContext(PFTContext);
    const authenticated = context.state.authenticated;
  return (
    authenticated ? <Outlet/> : <Navigate to="/"/>
  )
}

export default ProtectedRoutes