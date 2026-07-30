import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  FiTrendingUp,
  FiShoppingBag,
  FiExternalLink,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiAlertCircle,
  FiShoppingCart,
} from 'react-icons/fi'

// Auto-detect production vs localhost backend URL
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://wardrobe-backend-sandy.vercel.app'

const ShoppingPlanner = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedCard, setExpandedCard] = useState({}) // track accordion states

  const fetchShoppingPlan = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get(`${API_BASE}/api/ai/shopping-plan`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      if (res.data.success) {
        setData(res.data)
      } else {
        setError('Failed to fetch shopping recommendations.')
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.msg || 'Could not connect to the AI service.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShoppingPlan()
  }, [])

  const toggleExpand = (index) => {
    setExpandedCard((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Lookup existing item details (image, name) by UUID
  const getExistingItem = (id) => {
    return data?.items?.find((item) => item.id === id)
  }

  // Generate dynamic shop URL
  const getShopUrl = (site, query) => {
    const encoded = encodeURIComponent(query)
    if (site === 'amazon') {
      return `https://www.amazon.in/s?k=${encoded}`
    }
    if (site === 'flipkart') {
      return `https://www.flipkart.com/search?q=${encoded}`
    }
    return '#'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full space-y-6">
          {/* Skeleton Header */}
          <div className="h-10 bg-gray-200 rounded-lg w-1/3 animate-pulse mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-1/2 animate-pulse mx-auto"></div>

          {/* Skeleton Banner */}
          <div className="h-28 bg-gray-200 rounded-2xl animate-pulse"></div>

          {/* Skeleton Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md text-center border border-red-100">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to load Shopping Plan</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchShoppingPlan}
            className="px-6 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition"
          >
            Retry Analysis
          </button>
        </div>
      </div>
    )
  }

  const recommendations = data?.recommendations || []

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">AI Shopping Planner</h1>
          <p className="text-gray-600 mt-2">
            Strategic wardrobe recommendations to unlock maximum outfit value
          </p>
        </div>

        {/* Gap Analysis Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600 shrink-0">
            <FiTrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Wardrobe Gap Analysis</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{data?.gapAnalysis}</p>
          </div>
        </div>

        {recommendations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500">No recommendations available. Try adding some items to your Wardrobe first!</p>
          </div>
        ) : (
          /* Recommendations Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, idx) => {
              const isExpanded = expandedCard[idx]
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    {/* Header: Category and Name */}
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider">
                        {rec.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FiShoppingBag className="text-pink-500 shrink-0" />
                      {rec.name}
                    </h2>

                    <p className="text-gray-600 text-sm leading-relaxed">{rec.reason}</p>

                    {/* ROI Impact Box */}
                    {rec.roiImpact && (
                      <div className="p-3 bg-green-50/70 border border-green-100 rounded-xl text-xs font-medium text-green-700 flex items-center gap-2">
                        <span>💡</span>
                        <span>{rec.roiImpact}</span>
                      </div>
                    )}

                    {/* Unlocked Outfits Combo Builder Accordion */}
                    <div className="border-t border-gray-100 pt-4">
                      <button
                        onClick={() => toggleExpand(idx)}
                        className="w-full flex justify-between items-center text-sm font-semibold text-gray-700 hover:text-purple-600 transition"
                      >
                        <span>New Outfits Unlocked</span>
                        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                      </button>

                      {isExpanded && (
                        <div className="mt-4 space-y-4 animate-fadeIn">
                          {rec.unlockedOutfits?.map((outfit, oIdx) => (
                            <div key={oIdx} className="p-3 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                              <p className="text-xs font-bold text-purple-600">{outfit.name}</p>
                              
                              {/* Combo Display */}
                              <div className="flex items-center flex-wrap gap-2 text-xs text-gray-500">
                                {outfit.existingItems?.map((id, itemIdx) => {
                                  const item = getExistingItem(id)
                                  if (!item) return null
                                  return (
                                    <React.Fragment key={id}>
                                      {itemIdx > 0 && <FiPlus className="shrink-0 w-3 h-3 text-gray-400" />}
                                      <div className="flex items-center gap-1.5 bg-white py-1 px-2.5 rounded-lg shadow-2xs border border-gray-100">
                                        {item.image_url ? (
                                          <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="w-5 h-5 rounded-full object-cover border border-purple-200"
                                          />
                                        ) : (
                                          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[10px] text-purple-700 font-bold uppercase">
                                            {item.name[0]}
                                          </div>
                                        )}
                                        <span className="font-medium text-gray-700 max-w-[80px] truncate">
                                          {item.name}
                                        </span>
                                      </div>
                                    </React.Fragment>
                                  )
                                })}

                                {/* The New Recommended Item itself */}
                                <FiPlus className="shrink-0 w-3 h-3 text-gray-400" />
                                <div className="flex items-center gap-1.5 bg-purple-50/70 border border-dashed border-purple-300 py-1 px-2.5 rounded-lg">
                                  <FiShoppingCart className="w-3 h-3 text-purple-600" />
                                  <span className="font-bold text-purple-700 truncate max-w-[90px]">
                                    {rec.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions: Shop Buttons */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-3">
                    <a
                      href={getShopUrl('amazon', rec.searchQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition duration-200"
                    >
                      Amazon <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={getShopUrl('flipkart', rec.searchQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2 px-3 bg-[#ffe11b] text-gray-800 rounded-xl text-sm font-bold hover:bg-[#ebd01a] shadow-xs hover:shadow-md transition duration-200 border border-yellow-300"
                    >
                      Flipkart <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShoppingPlanner
