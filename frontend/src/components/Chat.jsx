import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Chat() {
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: `Hi there! I'm here to help you understand this webpage better. 
Feel free to ask me any questions you have about its content, structure, or purpose. 
I can summarize information, answer specific questions, and even help you find what you're looking for. 
What would you like to know?`
    }
  ])
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages([...messages, { from: 'user', text: input }])
    setInput('')
    const session_id = localStorage.getItem('session_id')
    try {
      const res = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, session_id })
      })
      const data = await res.json()
      setMessages(msgs => [...msgs, { from: 'ai', text: data.answer }])
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'ai', text: 'Error getting answer.' }])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(e)
    }
  }

  return (
    <div className="relative flex flex-col h-[420px] w-[350px] bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      
      {/* Floating background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-6 w-20 h-20 bg-gradient-to-r from-blue-100/40 to-purple-100/40 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-12 right-4 w-16 h-16 bg-gradient-to-r from-pink-100/40 to-blue-100/40 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-8 w-12 h-12 bg-gradient-to-r from-purple-100/40 to-pink-100/40 rounded-full blur-lg animate-float-slow"></div>
      </div>

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>

      {/* Header */}
      <div className="relative z-10 flex items-center px-4 py-3 bg-white/60 backdrop-blur-sm border-b border-white/30">
        <button
          className="mr-3 p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-all duration-200 animate-slideInLeft"
          onClick={() => navigate('/')}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="flex-1 text-center">
          <div className="inline-flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
            <h1 className="text-lg font-semibold text-gray-800 animate-slideInDown">Webpage Q&A</h1>
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse [animation-delay:0.5s]"></div>
          </div>
        </div>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      {/* Welcome message */}
      <div className="relative z-10 px-4 py-3 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border-b border-white/30 animate-fadeIn">
        <div className="text-gray-600 text-sm font-medium">
          Welcome! Ask me anything about this webpage.
        </div>
      </div>

      {/* Messages container */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {messages.map((msg, idx) =>
          msg.from === 'ai' ? (
            <div key={idx} className="flex items-start animate-slideInLeft" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center mr-3 shadow-lg animate-pulse">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1 font-medium">AI Assistant</div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 text-gray-800 max-w-[240px] shadow-sm border border-white/50 hover:shadow-md transition-all duration-200">
                  {msg.text}
                </div>
              </div>
            </div>
          ) : (
            <div key={idx} className="flex justify-end animate-slideInRight" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl px-4 py-3 max-w-[240px] shadow-lg hover:shadow-xl transition-all duration-200">
                {msg.text}
              </div>
            </div>
          )
        )}
      </div>

      {/* Input form */}
      <div className="relative z-10 flex items-center px-4 py-3 bg-white/60 backdrop-blur-sm border-t border-white/30">
        <div className="relative flex-1 mr-3">
          <input
            className={`w-full px-4 py-2.5 bg-white/80 backdrop-blur-sm border-2 rounded-2xl text-gray-700 placeholder-gray-400 text-sm transition-all duration-300 ease-out focus:outline-none ${
              focused 
                ? 'border-blue-300 shadow-lg shadow-blue-100/50 bg-white transform scale-[1.01]' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            placeholder="Ask a question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          
          {/* Input highlight effect */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-200/20 to-purple-200/20 transition-opacity duration-300 pointer-events-none ${
            focused ? 'opacity-100' : 'opacity-0'
          }`}></div>
        </div>
        
        <button 
          type="submit" 
          onClick={handleSend}
          className={`p-2.5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
            input.trim() 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 active:scale-95' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!input.trim()}
          aria-label="Send"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="transform rotate-45">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-2deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(1deg); }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite 4s;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out 0.2s both;
        }
      `}</style>
    </div>
  )
}

export default Chat