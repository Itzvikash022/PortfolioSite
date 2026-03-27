import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import ChatWidget from './ChatWidget';
import CursorMascot from './CursorMascot';
import MiniGame from './MiniGame';
import RightNav from './RightNav';
import { motion, useScroll } from 'framer-motion';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mascotVariant, setMascotVariant] = useState(() => {
    return localStorage.getItem('portfolio_mascot') || 'ghost';
  });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    localStorage.setItem('portfolio_mascot', mascotVariant);
  }, [mascotVariant]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen relative z-0 text-text-primary font-sans selection:bg-accent selection:text-bg-primary">
      {/* Top Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-accent z-[100] origin-left shadow-[0_0_15px_rgba(250,204,21,0.8)]"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Mobile Header for Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-bg-card z-50 flex items-center justify-between px-6 border-b border-white/5 shadow-md">
        <span className="font-bold text-lg">Vikash Maurya</span>
        <button onClick={toggleSidebar} className="text-text-primary focus:outline-none">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Left Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 glass-panel overflow-y-auto custom-scrollbar ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar className="h-full" />
      </div>

      {/* Right Navigation */}
      <RightNav mascotVariant={mascotVariant} setMascotVariant={setMascotVariant} />

      {/* Main Content */}
      <div className="pt-16 lg:pt-0 pb-10 lg:pl-[280px] lg:pr-[70px] relative min-h-screen flex flex-col">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
          {children}
        </div>
      </div>

      {/* Global Interactive Elements */}
      <MiniGame />
      {mascotVariant !== 'none' && <CursorMascot variant={mascotVariant} />}
      <ChatWidget />
    </div>
  );
}
