"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { X, Minimize2, MessageCircle, Send, Sparkles, Heart } from "lucide-react"
import { useHubSpotBooking } from "@/lib/hooks/useHubSpotBooking"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface QuickPrompt {
  id: string
  text: string
  action: string
}

const CBPSChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationCount, setConversationCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [characterMood, setCharacterMood] = useState<"happy" | "thinking" | "excited" | "helpful">("happy")
  const [showSparkles, setShowSparkles] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { openBooking } = useHubSpotBooking()

  const quickPrompts: QuickPrompt[] = [
    { id: "what-is-cbps", text: "What is Colorado BPS?", action: "ai-response" },
    { id: "building-qualify", text: "Does my building qualify?", action: "ai-response" },
    { id: "deadlines", text: "What are the key deadlines?", action: "ai-response" },
    { id: "penalties", text: "What are the penalties for non-compliance?", action: "ai-response" },
    { id: "costs", text: "How much will compliance cost?", action: "ai-response" },
    { id: "incentives", text: "What incentives are available?", action: "ai-response" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const moodCycle = setInterval(() => {
      if (!isLoading && !isTyping) {
        const moods: Array<"happy" | "thinking" | "excited" | "helpful"> = ["happy", "helpful", "excited"]
        setCharacterMood(moods[Math.floor(Math.random() * moods.length)])
      }
    }, 4000)

    return () => clearInterval(moodCycle)
  }, [isLoading, isTyping])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setCharacterMood("excited")
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 2000)

      addBotMessage(
        "👋 Hi! I'm Charlie, your CBPS compliance expert. Let me help you get compliant and save money with early adopter incentives!\n\nFirst, I need to know about your building to give you the right guidance:\n\n🏢 What's the square footage of your building?\n📍 Is this a commercial office, multifamily residential, or mixed-use property?",
      )
    }
  }, [isOpen])

  const addBotMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])
  }

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])
    setConversationCount((prev) => prev + 1)
  }

  const getAIResponse = async (userMessage: string) => {
    setIsLoading(true)
    setIsTyping(true)
    setCharacterMood("thinking")

    try {
      console.log("[v0] Sending message to API:", userMessage)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.slice(-6),
          conversationCount: conversationCount,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("[v0] API response error:", response.status, errorData)
        throw new Error(`API Error: ${response.status} - ${errorData.details || "Unknown error"}`)
      }

      const data = await response.json()
      console.log("[v0] API response received:", data)

      setTimeout(() => {
        setCharacterMood("helpful")
        setShowSparkles(true)
        setTimeout(() => setShowSparkles(false), 1500)

        addBotMessage(data.response)
        setIsLoading(false)
        setIsTyping(false)

        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "chatbot_ai_interaction",
            chatbot_action: "ai_response_received",
            conversation_count: conversationCount,
            has_meeting_link: data.includeMeetingLink,
          })
        }
      }, 1500)
    } catch (error) {
      console.error("[v0] Error getting AI response:", error)
      setTimeout(() => {
        setCharacterMood("helpful")
        addBotMessage(
          "Oops! I'm having a little trouble connecting right now. 😅 Don't worry though - I'm still here to help! Try asking your question again, or let's get you connected with one of our CBPS experts who can assist you right away!",
        )
        setIsLoading(false)
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleQuickPrompt = (action: string, text: string) => {
    addUserMessage(text)
    if (action === "ai-response") {
      getAIResponse(text)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() && !isLoading) {
      const message = inputMessage.trim()
      setInputMessage("")
      addUserMessage(message)
      getAIResponse(message)
    }
  }

  const openExpertBooking = () => {
    setCharacterMood("excited")
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 2000)

    openBooking({ uuid: "72bb221b-c89c-4bb5-8209-5722d80a8aed" })

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "chatbot_booking_clicked",
        chatbot_action: "expert_booking_opened",
        conversation_count: conversationCount,
      })
    }
  }

  const handleChatbotClick = () => {
    if (!isOpen) {
      setIsAnimating(true)
      setTimeout(() => {
        setIsOpen(true)
        setIsAnimating(false)
      }, 600)

      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "chatbot_opened",
          chatbot_action: "widget_clicked",
        })
      }
    }
  }

  const closeChatbot = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const minimizeChatbot = () => {
    setIsMinimized(true)
  }

  const CharacterIcon = () => (
    <div className="relative z-10 flex items-center justify-center">
      {/* Custom Robot Character SVG */}
      <div
        className={`transition-all duration-500 ${characterMood === "thinking" ? "animate-pulse" : ""} ${characterMood === "excited" ? "animate-bounce" : ""}`}
      >
        {/* Custom Robot Character SVG */}
        <svg width="32" height="32" viewBox="0 0 32 32" className="transition-all duration-300">
          {/* Robot Body */}
          <rect
            x="8"
            y="16"
            width="16"
            height="12"
            rx="3"
            fill="#4ade80"
            stroke="#22c55e"
            strokeWidth="1"
            className={`transition-all duration-300 ${characterMood === "excited" ? "animate-pulse" : ""}`}
          />

          {/* Robot Head */}
          <rect
            x="10"
            y="8"
            width="12"
            height="10"
            rx="2"
            fill="#60a5fa"
            stroke="#3b82f6"
            strokeWidth="1"
            className="transition-all duration-300"
          />

          {/* Hard Hat */}
          <ellipse
            cx="16"
            cy="8"
            rx="7"
            ry="3"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1"
            className={`transition-all duration-300 ${characterMood === "happy" ? "animate-wiggle" : ""}`}
          />
          <rect x="13" y="6" width="6" height="2" rx="1" fill="#f59e0b" />

          {/* Eyes - Change based on mood */}
          {characterMood === "thinking" ? (
            <>
              <circle cx="13" cy="12" r="1.5" fill="#1f2937" className="animate-pulse" />
              <circle cx="19" cy="12" r="1.5" fill="#1f2937" className="animate-pulse" />
              <circle cx="13" cy="11.5" r="0.5" fill="#ffffff" />
              <circle cx="19" cy="11.5" r="0.5" fill="#ffffff" />
            </>
          ) : characterMood === "excited" ? (
            <>
              <ellipse cx="13" cy="12" rx="1.5" ry="2" fill="#1f2937" />
              <ellipse cx="19" cy="12" rx="1.5" ry="2" fill="#1f2937" />
              <circle cx="13" cy="11" r="0.5" fill="#ffffff" />
              <circle cx="19" cy="11" r="0.5" fill="#ffffff" />
            </>
          ) : (
            <>
              <circle cx="13" cy="12" r="1.5" fill="#1f2937" />
              <circle cx="19" cy="12" r="1.5" fill="#1f2937" />
              <circle cx="13" cy="11.5" r="0.5" fill="#ffffff" />
              <circle cx="19" cy="11.5" r="0.5" fill="#ffffff" />
            </>
          )}

          {/* Mouth - Changes based on mood */}
          {characterMood === "excited" ? (
            <ellipse cx="16" cy="15" rx="2" ry="1" fill="#1f2937" />
          ) : characterMood === "thinking" ? (
            <line x1="14" y1="15" x2="18" y2="15" stroke="#1f2937" strokeWidth="1" strokeLinecap="round" />
          ) : (
            <path d="M 14 15 Q 16 16 18 15" stroke="#1f2937" strokeWidth="1" fill="none" strokeLinecap="round" />
          )}

          {/* Robot Arms */}
          <rect
            x="6"
            y="18"
            width="3"
            height="6"
            rx="1.5"
            fill="#4ade80"
            stroke="#22c55e"
            strokeWidth="1"
            className={`transition-all duration-300 ${characterMood === "excited" ? "animate-wiggle" : ""}`}
          />
          <rect
            x="23"
            y="18"
            width="3"
            height="6"
            rx="1.5"
            fill="#4ade80"
            stroke="#22c55e"
            strokeWidth="1"
            className={`transition-all duration-300 ${characterMood === "excited" ? "animate-wiggle" : ""}`}
          />

          {/* Robot Hands */}
          <circle cx="7.5" cy="25" r="1.5" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />
          <circle cx="24.5" cy="25" r="1.5" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />

          {/* Chest Panel */}
          <rect x="12" y="19" width="8" height="6" rx="1" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />

          {/* Chest Buttons */}
          <circle cx="14" cy="21" r="0.5" fill="#ef4444" className={`${isLoading ? "animate-ping" : ""}`} />
          <circle cx="16" cy="21" r="0.5" fill="#22c55e" />
          <circle cx="18" cy="21" r="0.5" fill="#fbbf24" />

          {/* Status Light */}
          <rect
            x="15"
            y="23"
            width="2"
            height="1"
            rx="0.5"
            fill={isLoading ? "#ef4444" : characterMood === "excited" ? "#22c55e" : "#60a5fa"}
            className={`transition-all duration-300 ${isLoading ? "animate-pulse" : ""}`}
          />
        </svg>
      </div>

      {/* Sparkles effect */}
      {showSparkles && (
        <>
          <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-2 -left-2 animate-ping" />
          <Sparkles
            className="w-2 h-2 text-blue-300 absolute -bottom-1 -right-2 animate-ping"
            style={{ animationDelay: "0.5s" }}
          />
          <Sparkles
            className="w-2 h-2 text-colorado-gold-400 absolute top-0 right-0 animate-ping"
            style={{ animationDelay: "1s" }}
          />
        </>
      )}
    </div>
  )

  return (
    <>
      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-[1000]">
        {!isOpen && (
          <div
            onClick={handleChatbotClick}
            className={`relative cursor-pointer transition-all duration-300 hover:scale-110 group ${
              isAnimating ? "animate-spin" : "animate-float"
            }`}
          >
            {/* Enhanced character container with breathing effect */}
            <div className="w-16 h-16 bg-gradient-to-br from-colorado-blue-600 via-colorado-blue-700 to-colorado-blue-800 rounded-full shadow-lg flex items-center justify-center relative overflow-hidden animate-breathe">
              {/* Multiple pulsing glow effects */}
              <div className="absolute inset-0 bg-colorado-gold-400 rounded-full animate-ping opacity-20"></div>
              <div
                className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-10"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Character with enhanced animations */}
              <CharacterIcon />
            </div>

            {/* Enhanced notification badge with heartbeat */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-heartbeat">
              <MessageCircle className="w-2 h-2 text-white" />
            </div>

            {/* Hover tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Hi! I'm Charlie, your CBPS helper! 👋
            </div>
          </div>
        )}

        {/* Enhanced Chat Window */}
        {isOpen && (
          <div
            className={`fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col transition-all duration-300 ${
              isMinimized ? "h-12" : "animate-slideUp"
            } md:w-96 md:h-[500px] overflow-hidden`}
          >
            {/* Enhanced Header with character animation */}
            <div className="bg-gradient-to-r from-colorado-blue-600 via-colorado-blue-700 to-colorado-blue-800 text-white p-4 rounded-t-lg flex items-center justify-between relative overflow-hidden">
              {/* Animated background particles */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
                <div
                  className="absolute top-6 right-8 w-1 h-1 bg-yellow-300 rounded-full animate-twinkle"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute bottom-3 left-12 w-1 h-1 bg-blue-300 rounded-full animate-twinkle"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>

              <div className="flex items-center space-x-3 relative z-10">
                <div
                  className={`w-8 h-8 bg-colorado-blue-500 rounded-full flex items-center justify-center transition-all duration-300 ${isTyping ? "animate-pulse" : "animate-breathe"}`}
                >
                  <svg width="16" height="16" viewBox="0 0 32 32" className="transition-all duration-300">
                    {/* Mini Robot Head */}
                    <rect x="10" y="8" width="12" height="10" rx="2" fill="#60a5fa" />
                    <ellipse cx="16" cy="8" rx="7" ry="3" fill="#fbbf24" />
                    <circle cx="13" cy="12" r="1" fill="#1f2937" />
                    <circle cx="19" cy="12" r="1" fill="#1f2937" />
                    <circle cx="13" cy="11.5" r="0.3" fill="#ffffff" />
                    <circle cx="19" cy="11.5" r="0.3" fill="#ffffff" />
                    <path d="M 14 15 Q 16 16 18 15" stroke="#1f2937" strokeWidth="0.5" fill="none" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm flex items-center space-x-1">
                    <span>Charlie - AI CBPS Assistant</span>
                    {characterMood === "excited" && <Heart className="w-3 h-3 text-red-300 animate-pulse" />}
                  </h3>
                  <p className="text-xs text-colorado-blue-100">{isTyping ? "Thinking..." : "Ready to help! ✨"}</p>
                </div>
              </div>
              <div className="flex space-x-2 relative z-10">
                <button
                  onClick={minimizeChatbot}
                  className="text-white hover:text-colorado-gold-300 transition-colors hover:scale-110"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={closeChatbot}
                  className="text-white hover:text-colorado-gold-300 transition-colors hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Enhanced Messages with animations */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-messageSlide`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl text-sm whitespace-pre-line shadow-sm transition-all duration-200 hover:shadow-md ${
                          message.isBot
                            ? "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-800 rounded-bl-sm"
                            : "bg-gradient-to-br from-colorado-blue-600 to-colorado-blue-700 text-white rounded-br-sm"
                        }`}
                      >
                        {message.text.replace(/https:\/\/meetings\.hubspot\.com[^\s]*/g, "")}
                      </div>
                    </div>
                  ))}

                  {/* Enhanced Loading indicator with character animation */}
                  {isLoading && (
                    <div className="flex justify-start animate-messageSlide">
                      <div className="bg-gradient-to-br from-gray-100 to-gray-50 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-colorado-blue-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-colorado-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-colorado-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">Charlie is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Quick Prompts */}
                  {messages.length <= 1 && !isLoading && (
                    <div className="space-y-3 animate-fadeIn">
                      <p className="text-xs text-gray-500 text-center flex items-center justify-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Quick building assessment:</span>
                        <Sparkles className="w-3 h-3" />
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { id: "size-20k-50k", text: "My building is 20,000-50,000 sq ft", action: "ai-response" },
                          { id: "size-50k-plus", text: "My building is over 50,000 sq ft", action: "ai-response" },
                          { id: "multifamily", text: "I have a multifamily property", action: "ai-response" },
                          { id: "not-started", text: "I haven't started compliance yet", action: "ai-response" },
                          {
                            id: "need-incentives",
                            text: "Tell me about early adopter incentives",
                            action: "ai-response",
                          },
                          { id: "deadline-help", text: "What are my compliance deadlines?", action: "ai-response" },
                        ].map((prompt, index) => (
                          <button
                            key={prompt.id}
                            onClick={() => handleQuickPrompt(prompt.action, prompt.text)}
                            className="text-left p-3 text-xs bg-gradient-to-r from-colorado-gold-50 to-colorado-blue-50 hover:from-colorado-gold-100 hover:to-colorado-blue-100 rounded-xl border border-colorado-gold-200 transition-all duration-200 hover:shadow-md hover:scale-105 animate-slideInUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <span className="font-medium">{prompt.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Expert Consultation Button */}
                  {(conversationCount >= 2 ||
                    messages.some((msg) => msg.text.includes("consultation") || msg.text.includes("expert"))) && (
                    <div className="flex justify-center mt-4 animate-bounceIn">
                      <button
                        onClick={openExpertBooking}
                        className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 hover:scale-105 animate-pulse-slow"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>🚀 Schedule Call with CBPS Expert</span>
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Input Section */}
                <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <form onSubmit={handleSendMessage} className="flex space-x-3">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Tell me your building size or type... 🏢"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-colorado-gold-300"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-gradient-to-r from-colorado-blue-600 to-colorado-blue-700 text-white p-3 rounded-xl hover:from-colorado-blue-700 hover:to-colorado-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* Enhanced Footer */}
                <div className="px-4 pb-3">
                  <p className="text-xs text-gray-500 text-center flex items-center justify-center space-x-1">
                    <span>🤖 AI-Powered by Vert Energy Group</span>
                    <span>•</span>
                    <span>CBPS Experts ⚡</span>
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
          75% { transform: translateY(-3px) rotate(-1deg); }
        }
        
        @keyframes slideUp {
          0% { transform: translateY(100%) scale(0.8); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes messageSlide {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slideInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .animate-breathe {
          animation: breathe 3s ease-in-out infinite;
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-messageSlide {
          animation: messageSlide 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.4s ease-out;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.6s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

export default CBPSChatbot
