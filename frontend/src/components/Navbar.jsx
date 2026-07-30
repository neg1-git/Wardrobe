import React, { useState } from 'react'
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiLayers, FiGrid, FiShoppingCart } from "react-icons/fi"
import { useNavigate, useLocation, Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const navLinks = [
    { href: "/app/insights", label: "Insights", icon: FiGrid },
    { href: "/app/wardrobe", label: "Wardrobe", icon: FiLayers },
    { href: "/app/outfits", label: "Outfits", icon: FiHome },
    { href: "/app/shopping-planner", label: "AI Shopping", icon: FiShoppingCart }
  ]

  return (
    <nav className="sticky top-4 z-50 py-4 px-4 sm:px-6 mx-7 rounded-3xl md:rounded-4xl" style={{ background: 'linear-gradient(135deg, #7856FF 0%, #FF36A2 100%)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navbar */}
        <div className="hidden sm:flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className='w-10 h-10' />
              <span className="text-white font-bold text-xl">Wardrobe</span>
            </div>
            <div className="flex gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/90 hover:text-white transition-all duration-200 hover:scale-105"
                  >
                    <link.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/60'}`} />
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-white/80'}`}>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <a
              href=""
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/90 hover:text-white transition-all duration-200 hover:scale-105"
            >
              <FiUser className="w-4 h-4 text-white/60" />
              <span className="font-medium text-white/80">Profile</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white transition-all duration-200 hover:scale-105"
              style={{ background: 'rgba(255, 100, 100, 0.2)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 100, 100, 0.4)' }}
            >
              <FiLogOut className="w-4 h-4" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="sm:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className='w-8 h-8' />
              <span className="text-white font-bold text-lg">Wardrobe</span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-white transition-all duration-200 hover:scale-110"
              style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-4 p-4 rounded-2xl space-y-2" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/90 hover:text-white transition-all duration-200 hover:scale-105"
                  >
                    <link.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/60'}`} />
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-white/80'}`}>{link.label}</span>
                  </Link>
                )
              })}
              <div className="h-px my-3" style={{ background: 'rgba(255, 255, 255, 0.2)' }}></div>
              <a
                href=""
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/90 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <FiUser className="w-5 h-5 text-white/60" />
                <span className="font-medium text-white/80">Profile</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(255, 100, 100, 0.2)', border: '1px solid rgba(255, 100, 100, 0.4)' }}
              >
                <FiLogOut className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar