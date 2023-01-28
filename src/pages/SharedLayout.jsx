import { Outlet } from "react-router-dom";
import Header from "./Header";
import { AuthProvider } from "../contexts/AuthContext";

import React from 'react'

const SharedLayout = () => {
  return (
    <>
    <AuthProvider>
        <Header/>
        <Outlet/>
    </AuthProvider>
    </>
  )
}

export default SharedLayout