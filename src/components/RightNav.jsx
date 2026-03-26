import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Cat, Ghost, Bot, MousePointer2, Ban } from 'lucide-react';

export default function RightNav({ mascotVariant, setMascotVariant }) {
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
        <div className="flex flex-col gap-2 bg-bg-card rounded-[2rem] p-1 shadow-inner relative group/mascot">
          {/* Mascot Main Toggle / Icon */}
          <button 
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${mascotVariant !== 'none' ? 'bg-accent/20 text-accent' : 'text-text-secondary hover:text-text-primary'}`}
            title="Mascot Options"
          >
            {mascotVariant === 'ghost' && <Ghost size={14} />}
            {mascotVariant === 'drone' && <Bot size={14} />}
            {mascotVariant === 'cyberpet' && <Cat size={14} />}
            {mascotVariant === 'retro' && <MousePointer2 size={14} />}
            {mascotVariant === 'none' && <Ban size={14} />}
          </button>

          {/* Expanded Mascot Menu (Appears on Hover) */}
          {/* 'after' pseudo-element creates an invisible bridge across the 16px mr-4 gap so the mouse doesn't drop the group hover! */}
          <div className="absolute right-full top-0 mr-4 flex items-center gap-2 opacity-0 -translate-x-4 pointer-events-none group-hover/mascot:opacity-100 group-hover/mascot:translate-x-0 group-hover/mascot:pointer-events-auto transition-all duration-300 bg-bg-card border border-white/5 rounded-full px-2 py-1.5 shadow-xl glass-panel whitespace-nowrap after:absolute after:inset-y-0 after:-right-6 after:w-6">
            <button onClick={() => setMascotVariant('ghost')} className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${mascotVariant === 'ghost' && 'text-accent'}`} title="Cute Ghost">
              <Ghost size={16} />
            </button>
            <button onClick={() => setMascotVariant('drone')} className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${mascotVariant === 'drone' && 'text-accent'}`} title="Sci-Fi Drone">
              <Bot size={16} />
            </button>
            <button onClick={() => setMascotVariant('cyberpet')} className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${mascotVariant === 'cyberpet' && 'text-accent'}`} title="Cyber Pet">
              <Cat size={16} />
            </button>
            <button onClick={() => setMascotVariant('retro')} className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${mascotVariant === 'retro' && 'text-accent'}`} title="Retro Cursor">
              <MousePointer2 size={16} />
            </button>
            <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
            <button onClick={() => setMascotVariant('none')} className={`p-1.5 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors ${mascotVariant === 'none' && 'text-red-500'}`} title="Disable Mascot">
              <Ban size={16} />
            </button>
          </div>
          
          <div className="w-full h-[1px] bg-white/5 my-0.5"></div>
          
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
          <p className="text-xs text-text-secondary mb-3 font-bold tracking-widest">MASCOT OPTIONS</p>
          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => setMascotVariant('ghost')} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${mascotVariant === 'ghost' ? 'bg-accent/20 text-accent border border-accent/20' : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-transparent'}`}>
              <Ghost size={14} /> GHOST
            </button>
            <button onClick={() => setMascotVariant('drone')} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${mascotVariant === 'drone' ? 'bg-accent/20 text-accent border border-accent/20' : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-transparent'}`}>
              <Bot size={14} /> DRONE
            </button>
            <button onClick={() => setMascotVariant('cyberpet')} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${mascotVariant === 'cyberpet' ? 'bg-accent/20 text-accent border border-accent/20' : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-transparent'}`}>
              <Cat size={14} /> CYBER PET
            </button>
            <button onClick={() => setMascotVariant('retro')} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${mascotVariant === 'retro' ? 'bg-accent/20 text-accent border border-accent/20' : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-transparent'}`}>
              <MousePointer2 size={14} /> RETRO
            </button>
            <button onClick={() => setMascotVariant('none')} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${mascotVariant === 'none' ? 'bg-red-500/20 text-red-500 border border-red-500/20' : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-transparent'}`}>
              <Ban size={14} /> OFF
            </button>
          </div>

          <p className="text-xs text-text-secondary mb-3 font-bold tracking-widest">THEME</p>
          <div className="flex gap-2">
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
