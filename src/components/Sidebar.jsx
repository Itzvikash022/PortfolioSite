import { useState, useEffect } from 'react';
import { Check, Download } from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaDiscord, FaTelegram } from 'react-icons/fa';
import { fetchAPI } from '../utils/api';
import { Sk } from './Skeleton';

export default function Sidebar({ className = '' }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchAPI('/personal');
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className={`flex flex-col h-full bg-bg-sidebar text-text-secondary ${className}`}>
        <div className="p-6 flex flex-col items-center border-b border-white/5 bg-bg-card/50 animate-pulse">
          <Sk.Circle className="w-24 h-24 mb-4" />
          <Sk.Line className="w-2/3 mb-2" />
          <Sk.Line className="w-1/2 h-2 mb-1" />
          <Sk.Line className="w-1/2 h-2" />
        </div>
        <div className="flex-1 px-6 py-6 space-y-6 animate-pulse">
          <div className="space-y-3 pb-6 border-b border-white/5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Sk.Line className="w-1/3 h-2" />
                <Sk.Line className="w-1/4 h-2" />
              </div>
            ))}
          </div>
          <div className="flex justify-around pb-6 border-b border-white/5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Sk.Circle className="w-14 h-14" />
                <Sk.Line className="w-10 h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const {
    name = 'Vikash Maurya',
    role1 = 'Front-end Developer',
    role2 = 'UI/UX Designer',
    residence = 'India',
    city = 'Surat',
    age = 24,
    languages = [],
    skills = [],
    tools = [],
    profileImage,
    resumeUrl = '',
    socials = {}
  } = profile || {};

  const avatarSrc = profileImage || '/images/profile.webp';

  const socialIcons = [
    { key: 'linkedin', icon: <FaLinkedinIn size={16} /> },
    { key: 'github', icon: <FaGithub size={16} /> },
    { key: 'twitter', icon: <FaTwitter size={16} /> },
    { key: 'instagram', icon: <FaInstagram size={16} /> },
    { key: 'discord', icon: <FaDiscord size={16} /> },
    { key: 'telegram', icon: <FaTelegram size={16} /> }
  ];

  return (
    <div className={`flex flex-col h-full bg-bg-sidebar text-text-secondary ${className}`}>
      {/* Profile Section */}
      <div className="p-6 flex flex-col items-center border-b border-white/5 bg-bg-card/50">
        <div className="relative mb-4">
          <img
            src={avatarSrc}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-2 border-bg-card"
          />
          <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-bg-card"></div>
        </div>
        <h2 className="text-text-primary text-lg font-bold">{name}</h2>
        <p className="text-sm mt-1">{role1}</p>
        <p className="text-sm">{role2}</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
        {/* Info List */}
        <div className="space-y-2 pb-6 border-b border-white/5 text-sm">
          <div className="flex justify-between">
            <span>Residence:</span>
            <span className="text-text-primary">{residence}</span>
          </div>
          <div className="flex justify-between">
            <span>City:</span>
            <span className="text-text-primary">{city}</span>
          </div>
          <div className="flex justify-between">
            <span>Age:</span>
            <span className="text-text-primary">{age}</span>
          </div>
        </div>

        {/* Languages (Circular Progress) */}
        <div className="py-6 border-b border-white/5 flex flex-wrap justify-between gap-y-4 px-2">
          {languages.map((l, i) => (
            <CircularProgress key={i} label={l.label} value={l.value} />
          ))}
        </div>

        {/* Skills (Horizontal Progress) */}
        <div className="py-6 border-b border-white/5 space-y-4">
          {skills.map((s, i) => (
            <ProgressBar key={i} label={s.label} value={s.value} />
          ))}
        </div>

        {/* Extra Skills/Tools */}
        <div className="py-6 border-b border-white/5 space-y-2 text-sm text-text-secondary">
          {tools.map((tag, i) => (
            <div key={i} className="flex items-center gap-3">
              <Check size={14} className="text-accent" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Controls & Socials */}
      <div className="p-5 bg-bg-card/50 flex flex-col items-center gap-4 border-t border-white/5 mt-auto">
        {/* Download Resume Button */}
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="w-full py-3 px-4 bg-accent text-bg-primary border border-accent/30 rounded-md text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group hover:bg-yellow-400 hover:shadow-[0_6px_20px_-5px_rgba(250,204,21,0.5)] focus:outline-none"
          >
            <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>DOWNLOAD RESUME</span>
          </a>
        )}

        {/* Play a Game Button */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-minigame'))}
          className="w-full py-3 px-4 bg-bg-primary/50 hover:bg-accent/20 border border-white/5 hover:border-accent/30 text-text-secondary hover:text-accent rounded-md text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group focus:outline-none"
        >
          <span>PLAY A GAME</span>
          <span className="group-hover:rotate-12 transition-transform drop-shadow-md">🎮</span>
        </button>

        {/* Dynamic Social Icons */}
        <div className="flex items-center justify-center gap-5 w-full">
          {socialIcons.map(({ key, icon }) => (
            socials[key] ? (
              <a 
                key={key} 
                href={socials[key]} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
                title={key.charAt(0).toUpperCase() + key.slice(1)}
              >
                {icon}
              </a>
            ) : null
          ))}
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
