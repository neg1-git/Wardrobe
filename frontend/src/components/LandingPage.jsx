import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiTrendingUp, FiDollarSign, FiStar } from 'react-icons/fi'
import wardrobeScreenshot from '../assets/screenshots/Wardrobe screenshot.png'
import addClothesScreenshot from '../assets/screenshots/add clothes screenshot.png'
import outfitScreenshot from '../assets/screenshots/outfit page screenshot.png'
import costInsightsScreenshot from '../assets/screenshots/cost most expensive and value insight screenshots.png'
import activityInsightsScreenshot from '../assets/screenshots/recently worn and needt attention and recomendation screenshots.png'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-600 via-purple-700 to-pink-600"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Smart Wardrobe Management
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Track Your Wardrobe,
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-200 to-purple-200">
                Optimize Your Style
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Manage your clothing collection, track costs per wear, and get smart outfit recommendations.
              Make every piece count.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => navigate('/register')}
                className="group px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-200 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2"
              >
                Get Started Free
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                Login
              </button>
            </div>

            {/* Screenshot */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-4 border border-white/20">
                <img
                  src={wardrobeScreenshot}
                  alt="Wardrobe Dashboard"
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Decorative elements around screenshot */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-400 rounded-lg opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-400 rounded-lg opacity-60"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need to Manage Your Style
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you make the most of your wardrobe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-linear-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <FiTrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Analytics</h3>
              <p className="text-gray-600">
                Track wear patterns, get insights, and receive personalized outfit recommendations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-linear-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <FiDollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cost Tracking</h3>
              <p className="text-gray-600">
                Know your cost per wear and total wardrobe value. Make smarter clothing investments.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-linear-to-br from-orange-50 to-yellow-50 border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <FiStar className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Outfit Planning</h3>
              <p className="text-gray-600">
                Create and manage outfits, track favorites, and plan what to wear.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot Showcase Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              See It In Action
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the powerful features that make wardrobe management effortless
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Clothes Screenshot */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Add New Items</h3>
                <p className="text-sm text-gray-600">Easily add clothes with image upload and cost tracking</p>
              </div>
              <div className="p-4">
                <img
                  src={addClothesScreenshot}
                  alt="Add Clothes Interface"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Outfit Management Screenshot */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Outfit Management</h3>
                <p className="text-sm text-gray-600">Create outfits and track your wear history</p>
              </div>
              <div className="p-4">
                <img
                  src={outfitScreenshot}
                  alt="Outfit Management Interface"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Cost Insights Screenshot */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Cost & Value Insights</h3>
                <p className="text-sm text-gray-600">Track your wardrobe value and cost per wear</p>
              </div>
              <div className="p-4">
                <img
                  src={costInsightsScreenshot}
                  alt="Cost Insights Interface"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Activity Insights Screenshot */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Activity & Recommendations</h3>
                <p className="text-sm text-gray-600">See your wear patterns and get smart suggestions</p>
              </div>
              <div className="p-4">
                <img
                  src={activityInsightsScreenshot}
                  alt="Activity Insights Interface"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-linear-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-white/90 mb-10 text-lg">
            Join thousands of users who are making smarter clothing decisions
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-200 hover:scale-105 shadow-xl"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage