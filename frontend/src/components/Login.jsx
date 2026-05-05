import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const nav = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      nav('/app/wardrobe')
    } catch (error) {
      setError(error.response?.data?.msg || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-[#7856FF] to-[#FF36A2]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-white/20 backdrop-blur-xl border border-white/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Wardrobe</h1>
          <p className="text-white/80 mt-2">Your personal style companion</p>
        </div>

        <div className="p-8 bg-white/15 backdrop-blur-xl rounded-4xl border border-white/30">
          <h2 className="text-2xl font-semibold text-white mb-6">Welcome back</h2>

          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm bg-red-400/30 border border-red-400/50">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 bg-white/10 border border-white/20"
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
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 bg-white/10 border border-white/20"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-4 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] bg-white/25 backdrop-blur-xl border border-white/40"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-white/60">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          <button
            onClick={() => nav('/register')}
            className="w-full py-3.5 px-4 text-white font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-[#3B82F6] border border-[#2563EB]"
          >
            Create account
          </button>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">
          Your style, organized ✨
        </p>
      </div>
    </div>
  )
}

export default Login
