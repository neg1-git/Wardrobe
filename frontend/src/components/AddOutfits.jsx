import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddOutfits = () => {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const nav = useNavigate()

  const handleAdd = async () => {
    if (!name.trim()) {
      setError('Please enter an outfit name')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const res = await axios.post('http://localhost:5000/outfit/create', {
        name
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      const outfitId = res.data.data.id
      console.log(outfitId)
      nav(`/app/add-outfit-items/${outfitId}`)
    } catch (error) {
      console.log(error.response?.data || error.message)
      setError('Failed to create outfit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create New Outfit</h1>
          <p className="text-gray-600 mt-2">Design your perfect outfit combination</p>
        </div>

        <div className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100">
          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Outfit Name</label>
              <input
                type="text"
                placeholder="Casual Friday, Summer Vibes, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 bg-gray-50 border border-gray-200 focus:border-purple-500"
              />
            </div>

            <button
              onClick={handleAdd}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isSubmitting ? 'Creating Outfit...' : 'Create Outfit'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => nav('/app/outfits')}
              className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
            >
              ← Back to Outfits
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddOutfits