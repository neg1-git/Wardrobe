import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ViewOutfits = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedOutfit, setExpandedOutfit] = useState(null)

  const nav = useNavigate('')

  const getOutfits = async () => {
    try {
      const res = await axios.get('https://wardrobe-backend-sandy.vercel.app/outfit/get-outfits', {
        headers: {
          token: localStorage.getItem("token")
        }
      })

      setData(res.data.data)
      console.log('Outfits data:', res.data.data)
      // Log first outfit's clothes structure
      if (res.data.data && res.data.data.length > 0) {
        console.log('First outfit clothes:', res.data.data[0].clothes)
        console.log('First cloth type:', typeof res.data.data[0].clothes?.[0])
        console.log('First cloth value:', res.data.data[0].clothes?.[0])
      }

    } catch (error) {
      console.log(error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://wardrobe-backend-sandy.vercel.app/outfit/delete/${id}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      getOutfits()
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  const handleWorn = async (id) => {
    try {
      const res = await axios.post(`https://wardrobe-backend-sandy.vercel.app/outfit/${id}/wear`,
        {},
        {
          headers: {
            token: localStorage.getItem("token")
          }
        })

      getOutfits();

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  const handleFav = async (id) => {
    try {
      const res = await axios.patch(`https://wardrobe-backend-sandy.vercel.app/outfit/${id}/favorite`, {},
        {
          headers: {
            token: localStorage.getItem("token")
          }
        })

      getOutfits();

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  const toggleExpand = (outfitId) => {
    setExpandedOutfit(expandedOutfit === outfitId ? null : outfitId)
  }

  useEffect(() => {
    getOutfits()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading outfits...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Outfits</h1>
            <p className="text-gray-600 mt-2">Your curated outfit combinations</p>
          </div>
          <button
            onClick={() => nav('/app/add-outfits')}
            className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            Create New Outfit
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-4">
              <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No outfits yet</h3>
            <p className="text-gray-500">Create your first outfit combination!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((outfit) => (
              <div
                key={outfit.outfit_id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Outfit Header - Always Visible */}
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpand(outfit.outfit_id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{outfit.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {outfit.wear_count}x worn
                        </span>
                        {outfit.last_worn_date && (
                          <span>Last: {new Date(outfit.last_worn_date).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFav(outfit.outfit_id)
                        }}
                        className={`p-2 rounded-lg transition-colors ${outfit.is_favorite ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'}`}
                      >
                        <svg className="w-5 h-5" fill={outfit.is_favorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${expandedOutfit === outfit.outfit_id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded Items Section - Only Visible When Clicked */}
                {expandedOutfit === outfit.outfit_id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="pt-3 space-y-2">
                      {outfit.clothes && outfit.clothes.length > 0 ? (
                        outfit.clothes.map((cloth, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {typeof cloth === 'object' ? cloth.name : cloth}
                              </p>
                              {typeof cloth === 'object' && cloth.category && (
                                <p className="text-xs text-gray-500">{cloth.category}</p>
                              )}
                            </div>
                            {typeof cloth === 'object' && cloth.color && (
                              <span className="text-xs text-gray-600 capitalize bg-white px-2 py-1 rounded-full border border-gray-200">
                                {cloth.color}
                              </span>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-3 text-gray-500 text-sm">
                          No items in this outfit
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons - Always Visible */}
                <div className="p-4 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => handleWorn(outfit.outfit_id)}
                    className="flex-1 py-2 px-3 bg-purple-50 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mark Worn
                  </button>
                  <button
                    onClick={() => handleDelete(outfit.outfit_id)}
                    className="flex-1 py-2 px-3 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewOutfits