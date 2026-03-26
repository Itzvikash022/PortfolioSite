import { useState } from 'react';
import { Check } from 'lucide-react';
import { FaLinkedinIn, FaDribbble, FaBehance, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Sidebar({ className = '' }) {
  const [lang, setLang] = useState('EN');

  return (
    <div className={`flex flex-col h-full bg-bg-sidebar text-text-secondary ${className}`}>
      {/* Profile Section */}
      <div className="p-6 flex flex-col items-center border-b border-white/5 bg-bg-card/50">
        <div className="relative mb-4">
          <img
            src="/images/profile.webp"
            alt="Vikash Maurya"
            className="w-24 h-24 rounded-full object-cover border-2 border-bg-card"
          />
          <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-bg-card"></div>
        </div>
        <h2 className="text-text-primary text-lg font-bold">Vikash Maurya</h2>
        <p className="text-sm mt-1">Front-end Developer</p>
        <p className="text-sm">UI/UX Designer</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
        {/* Info List */}
        <div className="space-y-2 pb-6 border-b border-white/5 text-sm">
          <div className="flex justify-between">
            <span>Residence:</span>
            <span className="text-text-primary">India</span>
          </div>
          <div className="flex justify-between">
            <span>City:</span>
            <span className="text-text-primary">Surat</span>
          </div>
          <div className="flex justify-between">
            <span>Age:</span>
            <span className="text-text-primary">24</span>
          </div>
        </div>

        {/* Languages (Circular Progress) */}
        <div className="py-6 border-b border-white/5 flex justify-between px-2">
          <CircularProgress label="French" value={100} />
          <CircularProgress label="English" value={90} />
          <CircularProgress label="Spanish" value={70} />
        </div>

        {/* Skills (Horizontal Progress) */}
        <div className="py-6 border-b border-white/5 space-y-4">
          <ProgressBar label="HTML" value={90} />
          <ProgressBar label="CSS" value={95} />
          <ProgressBar label="JS" value={75} />
          <ProgressBar label="PHP" value={65} />
          <ProgressBar label="WordPress" value={85} />
        </div>

        {/* Extra Skills/Tools */}
        <div className="py-6 border-b border-white/5 space-y-2 text-sm text-text-secondary">
          <div className="flex items-center gap-3">
            <Check size={14} className="text-accent" />
            <span>Bootstrap, Materialize</span>
          </div>
          <div className="flex items-center gap-3">
            <Check size={14} className="text-accent" />
            <span>Stylus, Sass, Less</span>
          </div>
          <div className="flex items-center gap-3">
            <Check size={14} className="text-accent" />
            <span>Gulp, Webpack, Grunt</span>
          </div>
          <div className="flex items-center gap-3">
            <Check size={14} className="text-accent" />
            <span>GIT knowledge</span>
          </div>
        </div>
      </div>

      {/* Footer Controls & Socials */}
      <div className="p-5 bg-bg-card/50 flex flex-col items-center gap-5 border-t border-white/5 mt-auto">
        {/* Play a Game Button */}
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-minigame'))}
          className="w-full py-3 px-4 bg-bg-primary/50 hover:bg-accent/20 border border-white/5 hover:border-accent/30 text-text-secondary hover:text-accent rounded-md text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group focus:outline-none"
        >
          <span>PLAY A GAME</span>
          <span className="group-hover:rotate-12 transition-transform drop-shadow-md">🎮</span>
        </button>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-5 w-full">
          <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><FaLinkedinIn size={16} /></a>
          <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><FaDribbble size={16} /></a>
          <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><FaBehance size={16} /></a>
          <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><FaGithub size={16} /></a>
          <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><FaTwitter size={16} /></a>
        </div>
      </div>
    </div>
  );
}

// Subcomponents

function CircularProgress({ label, value }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-14 h-14 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-bg-card"
          />
          {/* Progress circle */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-accent transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-[10px] text-text-primary">{value}%</span>
      </div>
      <span className="text-xs text-text-primary">{label}</span>
    </div>
  );
}

function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-primary font-medium">{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1 bg-bg-card rounded-full overflow-hidden border border-white/5">
        <div
          className="h-full bg-accent transition-all duration-1000 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
