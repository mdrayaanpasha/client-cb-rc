import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { FiSun, FiMoon, FiArrowUp, FiDatabase, FiTrendingUp } from 'react-icons/fi';

// Custom Navbar Component
const Nav = ({ darkMode, toggleDarkMode }) => (
  <div className={`w-full p-4 flex justify-between items-center ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
    <div className="flex items-center gap-2">
              <FiTrendingUp className="w-6 h-6 text-blue-500" />
        
      <h1 className="text-xl font-bold" onClick={e=>window.location.href="./"}>CXpert</h1>
    </div>
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
    </button>
  </div>
);

export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingTextIndex, setLoadingTextIndex] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const messagesEndRef = useRef(null);

    const loadingMessages = [
        "Analyzing your request...",
        "Searching through products...",
        "Compiling best results...",
        "Finalizing response..."
    ];

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Loading text animation
    useEffect(() => {
        let interval;
        if (isLoading) {
            interval = setInterval(() => {
                setLoadingTextIndex(prev => (prev + 1) % loadingMessages.length);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        setMessages(prev => [...prev, { content: inputMessage, isBot: false }]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(`https://brands.cx360.in/generate-sql?user_query=${encodeURIComponent(inputMessage)}`);
            const data = await response.json();
            
            setMessages(prev => [
                ...prev,
                { content: data.explanation, isBot: true }
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev,
                { content: "⚠️ Connection error - please try again later", isBot: true }
            ]);
        }
        setIsLoading(false);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex flex-col h-screen w-full ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50'}`}>
            <Nav darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            
            {/* Messages Container with Custom Scrollbar */}
            <div className={`flex-1 overflow-y-auto p-6 w-full scrollbar ${isDarkMode ? 'scrollbar-dark' : 'scrollbar-light'}`}>
                <div className="w-full flex flex-col gap-6">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`w-full flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in-up`}
                        >
                            <div
                                className={`p-4 rounded-2xl max-w-full transition-all duration-300 ${
                                    msg.isBot 
                                        ? `${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} shadow-md hover:shadow-lg`
                                        : 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
                                }`}
                            >
                                <div 
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ 
                                        __html: marked.parse(msg.content),
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="w-full flex justify-start animate-fade-in-up">
                            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} shadow-md`}>
                                <div className="flex items-center gap-3">
                                    <div className="flex space-x-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-full animate-bounce ${isDarkMode ? 'bg-blue-300' : 'bg-blue-400'}`}></div>
                                        <div className={`w-2.5 h-2.5 rounded-full animate-bounce delay-150 ${isDarkMode ? 'bg-blue-300' : 'bg-blue-400'}`}></div>
                                        <div className={`w-2.5 h-2.5 rounded-full animate-bounce delay-300 ${isDarkMode ? 'bg-blue-300' : 'bg-blue-400'}`}></div>
                                    </div>
                                    <span className="text-sm">
                                        {loadingMessages[loadingTextIndex]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Empty div to auto-scroll to bottom */}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            
            {/* Input Area */}
            <form onSubmit={handleSubmit} className={`border-t p-6 w-full ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
                <div className="w-full flex gap-4">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask about products or brands..."
                        className={`w-full p-4 rounded-xl focus:outline-none transition-all ${
                            isDarkMode 
                                ? 'bg-gray-800 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                                : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400'
                        }`}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`p-4 rounded-xl transition-all flex-shrink-0 ${
                            isDarkMode
                                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <FiArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </form>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .scrollbar-light::-webkit-scrollbar-track {
                    background: #f3f4f6;
                }
                .scrollbar-light::-webkit-scrollbar-thumb {
                    background: #9ca3af;
                    border-radius: 4px;
                }
                .scrollbar-dark::-webkit-scrollbar-track {
                    background: #1f2937;
                }
                .scrollbar-dark::-webkit-scrollbar-thumb {
                    background: #4b5563;
                    border-radius: 4px;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.3s ease-out;
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}