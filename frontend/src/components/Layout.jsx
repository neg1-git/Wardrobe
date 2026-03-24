import React from 'react'
import Login from './Login'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Layout