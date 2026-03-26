import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Cat } from 'lucide-react';

export default function RightNav({ isMascotEnabled, setIsMascotEnabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('HOME');
  const [theme, setTheme] = useState('dark');

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'PORTFOLIO', href: '#portfolio' },
    { name: 'HISTORY', href: '#history' },
    { name: 'CONTACT', href: '#contact' },
    { name: 'TESTIMONIALS', href: '#testimonials' },
    { name: 'BLOG', href: '#blog' }
  ];

  const handleNavClick = (name) => {
    setActiveSection(name);
    setIsOpen(false);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <>
      {/* Fixed Right Bar (Desktop Only) */}
      <div className="hidden lg:flex fixed top-0 right-0 h-screen w-[70px] bg-bg-sidebar border-l border-white/5 flex-col items-center justify-between py-8 z-40">
        
        {/* Hamburger */}
        <button 
          onClick={() => setIsOpen(true)}
          className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
        >
          <Menu size={24} />
        </button>

        {/* Current Section Label (Rotated) */}
        <div className="flex-1 flex items-center justify-center">
          <span 
            className="text-text-secondary text-xs font-bold tracking-widest origin-center"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {activeSection}
          </span>
        </div>

        {/* Theme & Controls Toggle (Vertical) */}
        <div className="flex flex-col gap-2 bg-bg-card rounded-[2rem] p-1 shadow-inner">
          <button 
            onClick={() => setIsMascotEnabled(!isMascotEnabled)}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isMascotEnabled ? 'bg-accent/20 text-accent' : 'text-text-secondary hover:text-text-primary'}`}
            title="Toggle Mascot"
          >
            <Cat size={14} />
          </button>
          
          <div className="w-full h-[1px] bg-white/5 my-1"></div>
          
          <button 
            onClick={() => handleThemeChange('dark')}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${theme === 'dark' ? 'bg-accent text-bg-primary' : 'text-text-secondary hover:text-text-primary'}`}
          >
            <Moon size={14} />
          </button>
          <button 
            onClick={() => handleThemeChange('light')}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${theme === 'light' ? 'bg-accent text-bg-primary' : 'text-text-secondary hover:text-text-primary'}`}
          >
            <Sun size={14} />
          </button>
        </div>
      </div>

      {/* Expanded Menu Overlay */}
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-bg-primary/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div 
        className={`fixed top-0 right-0 h-screen w-72 bg-bg-sidebar border-l border-white/5 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header containing X button */}
        <div className="p-6 flex justify-between items-center bg-bg-card/30 border-b border-white/5">
          <span className="font-bold tracking-wider text-sm">NAVIGATION</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.name)}
              className="block font-bold text-sm tracking-widest py-3 text-text-secondary hover:text-text-primary transition-colors relative group"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-accent transition-all duration-300 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:-left-6"></span>
            </a>
          ))}
        </nav>

        {/* Bottom Theme & Controls Toggle */}
        <div className="p-6 border-t border-white/5 bg-bg-card/30">
          <p className="text-xs text-text-secondary mb-3 font-bold tracking-widest">CONTROLS</p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setIsMascotEnabled(!isMascotEnabled)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-2 ${isMascotEnabled ? 'bg-accent/20 text-accent border border-accent/20' : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-transparent'}`}
            >
              <Cat size={14} /> MASCOT
            </button>
            <button 
              onClick={() => { handleThemeChange('dark'); setIsOpen(false); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-2 ${theme === 'dark' ? 'bg-accent text-bg-primary' : 'bg-bg-primary text-text-secondary hover:text-text-primary'}`}
            >
              <Moon size={14} /> DARK
            </button>
            <button 
              onClick={() => { handleThemeChange('light'); setIsOpen(false); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-2 ${theme === 'light' ? 'bg-accent text-bg-primary' : 'bg-bg-primary text-text-secondary hover:text-text-primary'}`}
            >
              <Sun size={14} /> LIGHT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
