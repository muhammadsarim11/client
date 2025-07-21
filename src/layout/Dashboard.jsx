// File: src/pages/Dashboard.jsx

import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../utils/api.js';
import {
  FaBook,
  FaBell,
  FaPrayingHands,
  FaDharmachakra,
  FaQuran,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUniversity,
  FaStar,
  FaCrown,
  FaKaaba,
} from "react-icons/fa";
import ErrorBoundary from '../components/ErrorBoundary';
import HijriDate from '../components/HijriDate';

// Lazy load components
const NotesSection = lazy(() => import("../components/NotesSection"));
const Reminder = lazy(() => import("../components/Reminder"));
const PrayersSection = lazy(() => import("../components/PrayersSection"));
const TasbeehSection = lazy(() => import("../components/TasbeehSection"));
const DailyAyah = lazy(() => import("../components/DailyAyah"));
const IslamicHistory = lazy(() => import("../components/IslamicHistory"));
const AshraMushabara = lazy(() => import("../components/AshraMushabara"));
const KhulfaRashideen = lazy(() => import("../components/KhulfaRashideen"));
const PillarsOfIslam = lazy(() => import("../components/PillarsOfIslam"));

const renderSection = (activeSection) => {
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>
  );

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        {(() => {
          switch (activeSection) {
            case "notes": return <NotesSection />;
            case "reminders": return <Reminder />;
            case "prayers": return <PrayersSection />;
            case "tasbeeh": return <TasbeehSection />;
            case "ayah": return <DailyAyah />;
            case "history": return <IslamicHistory />;
            case "ashra": return <AshraMushabara />;
            case "khulfa": return <KhulfaRashideen />;
            case "pillars": return <PillarsOfIslam />;
            default: return <NotesSection />;
          }
        })()}
      </Suspense>
    </ErrorBoundary>
  );
};

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("notes");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Disable back button
  useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, '', window.location.href);
    };

    const handlePopState = (event) => {
      window.history.pushState(null, '', window.location.href);
    };

    // Push current state to history
    window.history.pushState(null, '', window.location.href);
    
    // Listen for back button
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem('accessToken');
      // Clear history and navigate
      window.history.replaceState(null, '', '/login');
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem('accessToken');
      window.history.replaceState(null, '', '/login');
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 flex justify-between items-center bg-green-700 text-white">
        <h1 className="text-xl font-semibold">Tazkiyah Dashboard</h1>
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-green-100 border-r border-green-200 min-h-screen transition-all duration-300 z-10 flex flex-col`}
      >
        <div className="p-4 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-green-800 mb-6 text-center hidden md:block">
            ﷽ Tazkiyah
          </h2>
          <nav className="space-y-4">
            <SidebarItem
              label="Notes"
              icon={<FaBook />}
              active={activeSection === "notes"}
              onClick={() => {
                setActiveSection("notes");
                setSidebarOpen(false);
              }}
            />
            <SidebarItem
              label="Reminders"
              icon={<FaBell />}
              active={activeSection === "reminders"}
              onClick={() => {
                setActiveSection("reminders");
                setSidebarOpen(false);
              }}
            />
            <SidebarItem
              label="Prayers"
              icon={<FaPrayingHands />}
              active={activeSection === "prayers"}
              onClick={() => {
                setActiveSection("prayers");
                setSidebarOpen(false);
              }}
            />
            <SidebarItem
              label="Tasbeeh"
              icon={<FaDharmachakra />}
              active={activeSection === "tasbeeh"}
              onClick={() => {
                setActiveSection("tasbeeh");
                setSidebarOpen(false);
              }}
            />
            <SidebarItem
              label="Daily Ayah"
              icon={<FaQuran />}
              active={activeSection === "ayah"}
              onClick={() => {
                setActiveSection("ayah");
                setSidebarOpen(false);
              }}
            />
            <SidebarItem
              label="Islamic History"
              icon={<FaUniversity />}
              active={activeSection === "history"}
              onClick={() => {
                setActiveSection("history");
                setSidebarOpen(false);
              }}
            />
            <SidebarItem
              label="Ashra Mubashra"
              icon={<FaStar />}
              active={activeSection === "ashra"}
              onClick={() => {
                setActiveSection("ashra");
                setSidebarOpen(false);
              }}
            />
            <SidebarItem
              label="Khulfa-e-Rashideen"
              icon={<FaCrown />}
              active={activeSection === "khulfa"}
              onClick={() => {
                setActiveSection("khulfa");
                setSidebarOpen(false);
              }}
            />
            <SidebarItem
              label="Pillars of Islam"
              icon={<FaKaaba />}
              active={activeSection === "pillars"}
              onClick={() => {
                setActiveSection("pillars");
                setSidebarOpen(false);
              }}
            />
          </nav>
        </div>
        
        {/* Logout Button - Fixed at bottom, always visible */}
        <div className="p-4 border-t border-green-200 bg-green-100 sticky bottom-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md font-medium"
            title="Logout"
          >
            <FaSignOutAlt size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">
        {/* Top Widget - Hijri Date Only for Notes Section */}
        {activeSection === "notes" && (
          <div className="mb-6">
            <HijriDate />
          </div>
        )}
        {renderSection(activeSection)}
      </main>
    </div>
  );
}

function SidebarItem({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-left ${
        active
          ? "bg-green-600 text-white"
          : "text-green-800 hover:bg-green-200 transition"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
