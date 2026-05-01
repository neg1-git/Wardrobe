import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const PrivateLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default PrivateLayout