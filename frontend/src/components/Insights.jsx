import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Insights = () => {

  const [data, setData] = useState(null)
  const [reco, setReco] = useState(null)
  const [costData, setCostData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getInsights = async () => {
    try {
      const result = await axios.get('http://localhost:5000/outfit/insights', {
        headers: {
          token: localStorage.getItem("token")
        }
      })

      setData(result.data)

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  const getRecommendations = async () => {
    try {
      const result = await axios.get('http://localhost:5000/outfit/recommendations', {
        headers: {
          token: localStorage.getItem("token")
        }
      })

      console.log(result.data)
      setReco(result.data)

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  const getCostInsights = async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/cost-insights', {
        headers: {
          token: localStorage.getItem("token")
        }
      })

      console.log(result.data)
      setCostData(result.data)

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([getInsights(), getRecommendations(), getCostInsights()])
      setIsLoading(false)
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Style Insights</h1>
          <p className="text-gray-600 mt-2">Your wardrobe analytics and recommendations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Most Worn</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{data?.mostWorn?.name || 'No data'}</p>
            <p className="text-sm text-gray-500">{data?.mostWorn?.wear_count || 0} times</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Least Worn</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{data?.leastWorn?.name || 'No data'}</p>
            <p className="text-sm text-gray-500">{data?.leastWorn?.wear_count || 0} times</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Recent Activity</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{data?.recentlyWorn?.length || 0} outfits</p>
            <p className="text-sm text-gray-500">Recently worn</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Need Attention</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{data?.neglected?.length || 0} outfits</p>
            <p className="text-sm text-gray-500">Not worn recently</p>
          </div>
        </div>

        {/* Cost Insights Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cost & Value Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Total Wardrobe Value</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">₹{parseFloat(costData?.totalWardrobeValue || 0).toFixed(2)}</p>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Most Expensive Item</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{costData?.mostExpensive?.[0]?.name || 'No data'}</p>
              <p className="text-sm text-gray-600">₹{parseFloat(costData?.mostExpensive?.[0]?.cost || 0).toFixed(2)}</p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Best Value Item</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{costData?.bestValue?.[0]?.name || 'No data'}</p>
              <p className="text-sm text-gray-600">₹{parseFloat(costData?.bestValue?.[0]?.cost_per_wear || 0).toFixed(2)}/wear</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Most Expensive Items */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Most Expensive Items
              </h3>
              {costData?.mostExpensive && costData.mostExpensive.length > 0 ? (
                <div className="space-y-3">
                  {costData.mostExpensive.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">₹{parseFloat(item.cost || 0).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No cost data available</p>
              )}
            </div>

            {/* Best Value Items */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Best Value (Cost per Wear)
              </h3>
              {costData?.bestValue && costData.bestValue.length > 0 ? (
                <div className="space-y-3">
                  {costData.bestValue.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.category} • {item.total_wears} wears</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-purple-600">₹{parseFloat(item.cost_per_wear || 0).toFixed(2)}/wear</span>
                        <p className="text-xs text-gray-500">₹{parseFloat(item.cost || 0).toFixed(2)} total</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Wear items to see cost per wear data</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recently Worn */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recently Worn
            </h3>
            {data?.recentlyWorn && data.recentlyWorn.length > 0 ? (
              <div className="space-y-3">
                {data.recentlyWorn.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.last_worn_date
                          ? new Date(item.last_worn_date).toLocaleDateString()
                          : 'Never'}
                      </p>
                    </div>
                    <span className="text-sm text-gray-600">{item.wear_count}x worn</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>

          {/* Neglected Outfits */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Need Attention
            </h3>
            {data?.neglected && data.neglected.length > 0 ? (
              <div className="space-y-3">
                {data.neglected.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.last_worn_date
                          ? new Date(item.last_worn_date).toLocaleDateString()
                          : 'Never worn'}
                      </p>
                    </div>
                    <span className="text-sm text-orange-600">{item.wear_count}x worn</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">All outfits are getting love! 💚</p>
            )}
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Recommendations
            </h3>
            {(reco?.data || reco) && (reco.data || reco).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {(reco.data || reco).map((item) => (
                  <div
                    key={item.outfit_id || item.id}
                    className="p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:border-purple-200 transition-colors"
                  >
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <span>{item.wear_count}x worn</span>
                      {item.is_favorite && (
                        <span className="text-yellow-500">⭐ Favorite</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recommendations right now. You're doing great! 🎉</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Insights