import { useState } from 'react';
import { FiSun, FiMoon, FiArrowRight, FiTrendingUp, FiStar, FiBarChart, FiUsers } from 'react-icons/fi';

// Navbar Component (Reusable)
const Nav = ({ darkMode, toggleDarkMode }) => (
  <div className={`w-full p-4 flex justify-between items-center ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
    <div className="flex items-center gap-2">
      <FiTrendingUp className="w-6 h-6 text-blue-500" />
      <h1 className="text-xl font-bold">CX360</h1>
    </div>
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
    </button>
  </div>
);

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex flex-col min-h-screen w-full ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
            <Nav darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <h1 className="text-5xl font-bold mb-4">
                    Unlock Brand Insights with <span className="text-blue-500">CX360</span>
                </h1>
                <p className="text-xl mb-8 max-w-2xl">
                    Empowering investors with real-time brand performance analytics, reviews, and ratings to make smarter decisions.
                </p>
                <button
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
                        isDarkMode
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    Get Started <FiArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Features Section */}
            <div className="w-full py-16 px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose CX360?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Feature 1 */}
                    <div className={`p-6 rounded-2xl transition-all ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                    } shadow-md hover:shadow-lg`}>
                        <FiTrendingUp className="w-10 h-10 text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Brand Performance</h3>
                        <p className="text-gray-500">
                            Track real-time performance metrics and trends for any brand.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className={`p-6 rounded-2xl transition-all ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                    } shadow-md hover:shadow-lg`}>
                        <FiStar className="w-10 h-10 text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Reviews & Ratings</h3>
                        <p className="text-gray-500">
                            Aggregate and analyze customer reviews and ratings across platforms.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className={`p-6 rounded-2xl transition-all ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                    } shadow-md hover:shadow-lg`}>
                        <FiBarChart className="w-10 h-10 text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Investor Tools</h3>
                        <p className="text-gray-500">
                            Advanced tools to help investors make data-driven decisions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="w-full py-16 px-8">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Testimonial 1 */}
                    <div className={`p-6 rounded-2xl transition-all ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                    } shadow-md hover:shadow-lg`}>
                        <p className="text-gray-500 mb-4">
                            "CX360 has transformed how we evaluate brands. The insights are unparalleled!"
                        </p>
                        <div className="flex items-center gap-3">
                            <FiUsers className="w-6 h-6 text-blue-500" />
                            <span className="font-semibold">John Doe, Investor</span>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className={`p-6 rounded-2xl transition-all ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                    } shadow-md hover:shadow-lg`}>
                        <p className="text-gray-500 mb-4">
                            "The review aggregation feature is a game-changer for our team."
                        </p>
                        <div className="flex items-center gap-3">
                            <FiUsers className="w-6 h-6 text-blue-500" />
                            <span className="font-semibold">Jane Smith, Brand Manager</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className={`w-full p-8 border-t ${
                isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
            }`}>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <FiTrendingUp className="w-6 h-6 text-blue-500" />
                        <h1 className="text-xl font-bold">CX360</h1>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-blue-500 transition-colors">About</a>
                        <a href="#" className="hover:text-blue-500 transition-colors">Features</a>
                        <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
                    </div>
                    <p className="text-gray-500">© 2023 CX360. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}