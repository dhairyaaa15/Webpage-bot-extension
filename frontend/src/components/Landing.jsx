import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AnimatedLoader() {
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-bounce [animation-delay:-0.3s] shadow-sm"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-bounce [animation-delay:-0.15s] shadow-sm"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 animate-bounce shadow-sm"></div>
      </div>
      <span className="mt-4 text-gray-600 text-sm font-medium animate-pulse">
        Analyzing webpage...
      </span>
    </div>
  )
}

function Landing() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  const handleAnalyze = () => {
    if (!url) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/chat')
    }, 2500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && url) {
      handleAnalyze()
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[420px] w-[350px] bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      
      {/* Floating background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-8 w-24 h-24 bg-gradient-to-r from-blue-100/60 to-purple-100/60 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-16 right-6 w-20 h-20 bg-gradient-to-r from-pink-100/60 to-blue-100/60 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/3 right-12 w-16 h-16 bg-gradient-to-r from-purple-100/60 to-pink-100/60 rounded-full blur-lg animate-float-slow"></div>
      </div>

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>

      <div className="relative z-10 flex flex-col items-center px-4">
        
        {/* Header section */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
            <h1 className="text-sm font-medium text-gray-500 tracking-wider uppercase animate-slideInDown">
              Webpage Analyzer
            </h1>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse [animation-delay:0.5s]"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 leading-tight animate-slideInUp">
            Analyze any webpage
          </h2>
          
          <p className="text-gray-500 text-sm animate-fadeIn [animation-delay:0.3s] opacity-0 fill-mode-forwards">
            Paste a URL to get started
          </p>
        </div>

        {/* Input section */}
        <div className="relative w-[90%] mb-6">
          <input
            type="text"
            placeholder="Enter or paste URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 rounded-2xl text-gray-700 placeholder-gray-400 transition-all duration-300 ease-out focus:outline-none ${
              focused 
                ? 'border-blue-300 shadow-lg shadow-blue-100/50 bg-white transform scale-[1.01]' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            disabled={loading}
          />
          
          {/* Input highlight effect */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-200/20 to-purple-200/20 transition-opacity duration-300 pointer-events-none ${
            focused ? 'opacity-100' : 'opacity-0'
          }`}></div>
        </div>

        {/* Analyze button */}
        <button
          className={`relative w-[90%] py-2 rounded-2xl font-semibold text-lg transition-all duration-300 disabled:opacity-60 overflow-hidden group ${
            loading 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed shadow-lg' 
              : `bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-blue-200/50 active:scale-[0.98] ${url ? 'hover:scale-[1.02]' : ''}`
          }`}
          onClick={handleAnalyze}
          disabled={loading}
        >
          <span className="relative z-10 text-white font-medium">
            {loading ? 'Analyzing...' : 'Analyze'}
          </span>
          
          {/* Button shine effect */}
          {!loading && url && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          )}
        </button>

        {loading && <AnimatedLoader />}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
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
        
        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out 0.2s both;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .fill-mode-forwards {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  )
}

export default Landing