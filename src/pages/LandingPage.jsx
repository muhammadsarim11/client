import { Link } from "react-router-dom";
import { FaBook, FaBell, FaPrayingHands, FaDharmachakra, FaQuran, FaCalendarAlt, FaArrowRight, FaStar, FaHeart, FaMoon } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-6xl text-green-600 animate-pulse">☪</div>
        <div className="absolute top-40 right-32 text-4xl text-emerald-600 animate-bounce">🕌</div>
        <div className="absolute bottom-32 left-16 text-5xl text-teal-600 animate-pulse">📿</div>
        <div className="absolute bottom-20 right-20 text-4xl text-green-600 animate-pulse">☪</div>
        <div className="absolute top-60 left-1/2 text-3xl text-emerald-600 animate-bounce">🌙</div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl mr-3 shadow-md hover:shadow-lg transition-shadow">
                <FaQuran className="text-white" size={20} />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800">
                <span className="text-emerald-600">﷽</span> Tazkiyah
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-green-700 hover:text-green-800 font-medium transition-all px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-green-50 border border-green-200 hover:border-green-300 text-xs sm:text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg font-semibold text-xs sm:text-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 mb-6 shadow-sm hover:shadow-md transition-shadow">
              <FaStar className="text-green-500" />
              <span className="text-green-700 text-sm">Premium Islamic Companion</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-green-800 mb-6 leading-tight animate-fade-in">
              Your Digital
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Islamic Journey
              </span>
            </h2>
            
            <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              Elevate your spiritual practice with beautifully crafted tools for Quranic verses, 
              prayer tracking, dhikr counters, and Islamic reminders.
            </p>
            
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-green-800 text-2xl font-arabic mb-3" dir="rtl">
                ذَّرْ فَّ الذِّكْرْ
              </p>
              <p className="text-green-600 text-sm">
                "And remind, for indeed, the reminder benefits the believers." - Quran 51:55
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none sm:flex-row">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl font-bold text-center flex items-center justify-center group"
            >
              Begin Your Journey 
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto bg-white/90 border-2 border-green-500 text-green-700 px-6 py-3 rounded-xl hover:bg-green-50 hover:border-green-600 transition-all font-semibold text-center shadow-md hover:shadow-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-green-800 mb-4">
              Premium Islamic Tools
            </h3>
            <p className="text-green-600 text-xl">
              Everything you need for spiritual excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Daily Ayah */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-green-100 hover:border-green-200 transition-all shadow-md hover:shadow-lg group transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-400 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform shadow-md">
                <FaQuran className="text-white" size={28} />
              </div>
              <h4 className="text-2xl font-bold text-green-800 mb-4">Daily Ayah</h4>
              <p className="text-green-600 leading-relaxed">
                Start each day with divine guidance through carefully selected Quranic verses with beautiful translations.
              </p>
            </div>

            {/* Prayer Tracking */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-green-100 hover:border-green-200 transition-all shadow-md hover:shadow-lg group transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform shadow-md">
                <FaPrayingHands className="text-white" size={28} />
              </div>
              <h4 className="text-2xl font-bold text-green-800 mb-4">Prayer Tracking</h4>
              <p className="text-green-600 leading-relaxed">
                Maintain perfect prayer consistency with intelligent tracking and gentle reminders.
              </p>
            </div>

            {/* Digital Tasbeeh */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-green-100 hover:border-green-200 transition-all shadow-md hover:shadow-lg group transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform shadow-md">
                <FaDharmachakra className="text-white" size={28} />
              </div>
              <h4 className="text-2xl font-bold text-green-800 mb-4">Smart Tasbeeh</h4>
              <p className="text-green-600 leading-relaxed">
                Premium dhikr counters with goal tracking, achievements, and spiritual milestones.
              </p>
            </div>

            {/* Islamic Calendar */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-green-100 hover:border-green-200 transition-all shadow-md hover:shadow-lg group transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform shadow-md">
                <FaCalendarAlt className="text-white" size={28} />
              </div>
              <h4 className="text-2xl font-bold text-green-800 mb-4">Hijri Calendar</h4>
              <p className="text-green-600 leading-relaxed">
                Stay connected with Islamic dates and never miss important religious occasions.
              </p>
            </div>

            {/* Spiritual Notes */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-green-100 hover:border-green-200 transition-all shadow-md hover:shadow-lg group transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform shadow-md">
                <FaBook className="text-white" size={28} />
              </div>
              <h4 className="text-2xl font-bold text-green-800 mb-4">Spiritual Journal</h4>
              <p className="text-green-600 leading-relaxed">
                Document your Islamic learning journey with elegant note-taking and reflection tools.
              </p>
            </div>

            {/* Smart Reminders */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-green-100 hover:border-green-200 transition-all shadow-md hover:shadow-lg group transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-red-400 to-pink-400 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform shadow-md">
                <FaBell className="text-white" size={28} />
              </div>
              <h4 className="text-2xl font-bold text-green-800 mb-4">Smart Reminders</h4>
              <p className="text-green-600 leading-relaxed">
                Intelligent notifications for prayers, dhikr, Quran reading, and Islamic events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Quote Section */}
      <section className="py-20 bg-gradient-to-r from-green-100/50 to-emerald-100/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <FaMoon className="text-green-500 text-4xl mx-auto mb-6 animate-pulse" />
            <p className="text-3xl md:text-4xl font-arabic mb-6 leading-relaxed text-green-800" dir="rtl">
              نَّادِي اللَّهَ جَّ
            </p>
            <p className="text-2xl italic mb-4 text-green-600">
              "And whoever fears Allah - He will make for him a way out."
            </p>
            <p className="text-green-500 text-lg">
              Quran 65:2
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-green-800 mb-6">
            Start Your Premium Islamic Experience
          </h3>
          <p className="text-green-600 text-xl mb-8">
            Join thousands of Muslims elevating their spiritual practice with Tazkiyah
          </p>
          <Link
            to="/register"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-12 py-5 rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl font-bold text-xl inline-flex items-center group transform hover:scale-105"
          >
            Create Free Account 
            <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800/90 backdrop-blur-md text-white py-12 border-t border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-3 rounded-xl mr-4 shadow-md">
              <FaQuran className="text-white" size={20} />
            </div>
            <h4 className="text-2xl font-bold">
              <span className="text-green-300">﷽</span> Tazkiyah
            </h4>
          </div>
          <p className="text-green-100 italic mb-6 text-lg">
            "And it is He who created the heavens and earth in truth." - Quran 6:73
          </p>
          <div className="flex justify-center items-center gap-2 text-green-200">
            <FaHeart className="text-red-400 animate-pulse" />
            <p className="text-sm">
              © 2024 Tazkiyah. Built with love for the Muslim Ummah.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}




