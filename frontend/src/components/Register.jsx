import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const nav = useNavigate()

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await axios.post('https://wardrobe-backend-sandy.vercel.app/auth/register', {
        name,
        email,
        password,
      })

      alert('Registration successful! Please login.')
      nav('/login')
    } catch (error) {
      setError(error.response?.data?.msg || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #7856FF 0%, #FF36A2 100%)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Wardrobe</h1>
          <p className="text-white/80 mt-2">Your personal style companion</p>
        </div>

        <div className="p-8" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(24px)', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
          <h2 className="text-2xl font-semibold text-white mb-6">Create account</h2>

          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: 'rgba(255, 100, 100, 0.3)', border: '1px solid rgba(255, 100, 100, 0.5)' }}>
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3.5 px-4 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.4)' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}></div>
            <span className="px-4 text-sm text-white/60">or</span>
            <div className="flex-1 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}></div>
          </div>

          <button
            onClick={() => nav('/login')}
            className="w-full py-3.5 px-4 text-white font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: '#3B82F6', border: '1px solid #2563EB' }}
          >
            Sign in
          </button>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">
          Your style, organized ✨
        </p>
      </div>
    </div>
  )
}

export default Register
