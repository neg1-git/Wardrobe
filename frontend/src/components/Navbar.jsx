import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <div className='border-2 py-4 m-7 px-7 flex justify-between'>
      <div className='flex gap-5 items-center'>
        <div><img src={logo} alt="Logo" className='w-10 h-10' /></div>
        <a href="/insights">Insights</a>
        <a href="/wardrobe">Wardrobe</a>
        <a href="/outfits">Outfits</a>
      </div>
      <div className='flex gap-5 items-center'>
        <a href="">Profile</a>
        <a href="">Log Out</a>
      </div>
    </div>
  )
}

export default Navbar