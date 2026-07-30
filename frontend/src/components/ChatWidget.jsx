import React, { useState, useRef, useEffect } from 'react'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'
import axios from 'axios'

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://wardrobe-backend-sandy.vercel.app'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hey! 👋 I'm **Ace**, your AI closet assistant. Ask me anything about your wardrobe — outfit suggestions, wear stats, or what to wear today!"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    // Add user message to UI
    const userMessage = { role: 'user', text: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      // Build the history array for the backend (exclude the initial welcome message)
      const history = updatedMessages
        .slice(1, -1) // Remove welcome msg and the current user msg (sent separately)
        .map((msg) => ({ role: msg.role, text: msg.text }))

      const res = await axios.post(
        `${API_BASE}/api/ai/chat`,
        { message: trimmed, history },
        { headers: { token: localStorage.getItem('token') } }
      )

      const aiReply = {
        role: 'model',
        text: res.data.reply || "Sorry, I couldn't process that."
      }
      setMessages((prev) => [...prev, aiReply])
    } catch (err) {
      console.error('Chat error:', err)
      const backendMsg = err.response?.data?.msg
      const errorReply = {
        role: 'model',
        text: backendMsg
          ? `⚠️ ${backendMsg}`
          : "⚠️ Something went wrong. Please check your connection and try again."
      }
      setMessages((prev) => [...prev, errorReply])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  /**
   * Simple markdown-lite renderer for bold (**text**) and bullet points.
   * This is intentionally minimal — no external dependencies needed.
   */
  const renderText = (text) => {
    const lines = text.split('\n')
    return lines.map((line, i) => {
      // Bold: **text**
      const parts = line.split(/(\*\*.*?\*\*)/g)
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j}>{part.slice(2, -2)}</strong>
        }
        return <span key={j}>{part}</span>
      })

      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        return (
          <div key={i} style={{ paddingLeft: '12px', display: 'flex', gap: '6px' }}>
            <span>•</span>
            <span>{rendered}</span>
          </div>
        )
      }

      return (
        <div key={i} style={{ minHeight: line.trim() === '' ? '8px' : 'auto' }}>
          {rendered}
        </div>
      )
    })
  }

  return (
    <>
      {/* Chat Panel */}
      <div
        style={{
          position: 'fixed',
          bottom: isOpen ? '24px' : '-600px',
          right: '24px',
          width: '400px',
          maxWidth: 'calc(100vw - 48px)',
          height: '560px',
          maxHeight: 'calc(100vh - 48px)',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          transition: 'bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 25px 60px rgba(120, 86, 255, 0.3), 0 8px 20px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #7856FF 0%, #FF36A2 100%)',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              ✨
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '16px' }}>Ace Assistant</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                {isLoading ? 'Thinking...' : 'AI-powered closet coach'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '10px',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = 'rgba(255,255,255,0.25)')}
            onMouseLeave={(e) => (e.target.style.background = 'rgba(255,255,255,0.15)')}
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#f8f7ff',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius:
                    msg.role === 'user'
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                  background:
                    msg.role === 'user'
                      ? 'linear-gradient(135deg, #7856FF 0%, #9B6DFF 100%)'
                      : '#ffffff',
                  color: msg.role === 'user' ? '#fff' : '#1a1a2e',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  boxShadow:
                    msg.role === 'user'
                      ? '0 4px 12px rgba(120, 86, 255, 0.25)'
                      : '0 2px 8px rgba(0,0,0,0.06)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(0,0,0,0.04)',
                }}
              >
                {renderText(msg.text)}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  background: '#ffffff',
                  padding: '14px 20px',
                  borderRadius: '18px 18px 18px 4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                }}
              >
                <span className="ace-dot" style={{ animationDelay: '0s' }}></span>
                <span className="ace-dot" style={{ animationDelay: '0.15s' }}></span>
                <span className="ace-dot" style={{ animationDelay: '0.3s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: '14px 16px',
            background: '#ffffff',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your wardrobe..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '14px',
              border: '1.5px solid #e8e5f0',
              outline: 'none',
              fontSize: '14px',
              background: '#f8f7ff',
              color: '#1a1a2e',
              transition: 'border 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#7856FF')}
            onBlur={(e) => (e.target.style.borderColor = '#e8e5f0')}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              border: 'none',
              background:
                isLoading || !input.trim()
                  ? '#d1cde0'
                  : 'linear-gradient(135deg, #7856FF 0%, #FF36A2 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
              transition: 'transform 0.15s, opacity 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!isLoading && input.trim()) e.target.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            border: 'none',
            background: 'linear-gradient(135deg, #7856FF 0%, #FF36A2 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 9999,
            boxShadow: '0 8px 30px rgba(120, 86, 255, 0.4), 0 4px 12px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)'
            e.currentTarget.style.boxShadow =
              '0 12px 40px rgba(120, 86, 255, 0.5), 0 6px 16px rgba(0,0,0,0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow =
              '0 8px 30px rgba(120, 86, 255, 0.4), 0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <FiMessageCircle size={26} />
        </button>
      )}

      {/* Inline keyframe styles for the typing dots animation */}
      <style>{`
        @keyframes aceBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        .ace-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7856FF, #FF36A2);
          display: inline-block;
          animation: aceBounce 1.2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

export default ChatWidget
