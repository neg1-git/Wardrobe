import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatWidget from './ChatWidget'

const PrivateLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
      <ChatWidget/>
    </div>
  )
}

export default PrivateLayout