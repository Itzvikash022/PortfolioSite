import { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { StatSkeleton } from './Skeleton';

export default function Hero() {
  const [sentences, setSentences] = useState(['I build web and mobile applications']);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const [stats, setStats] = useState({
    years: 0,
    cmsProjects: 0,
    githubCommits: 0,
    githubRepos: 0,
    loading: true
  });

  useEffect(() => {
    // 1. Load Sentences
    fetch('/data/sentences.xml')
      .then(res => res.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, 'text/xml');
        const sentenceNodes = xml.querySelectorAll('sentence');
        const loadedSentences = Array.from(sentenceNodes).map(node => node.textContent);
        if (loadedSentences.length > 0) setSentences(loadedSentences);
      })
      .catch(err => console.error("Error loading XML:", err));

    // 2. Load Dynamic Stats
    const fetchStats = async () => {
      try {
        const profileRes = await fetch('/api/personal');
        const profile = await profileRes.json();
        
        const projectsRes = await fetch('/api/projects');
        const projects = await projectsRes.json();
        
        let ghStats = { commits: 0, repos: 0 };
        
        if (profile.githubUsername) {
          try {
            const ghRes = await fetch(`/api/github-stats/${profile.githubUsername}`);
            ghStats = await ghRes.json();
          } catch (e) { 
            console.error("GH fetch fail", e);
            ghStats = { commits: 240, repos: 16 }; // Decent fallbacks if everything fails
          }
        }

        setStats({
          years: (profile.yearsExperience !== undefined && profile.yearsExperience !== null && profile.yearsExperience !== '') ? profile.yearsExperience : 3,
          cmsProjects: (profile.completedProjects !== undefined && profile.completedProjects !== null && profile.completedProjects !== '') ? profile.completedProjects : projects.length,
          githubCommits: ghStats.commits,
          githubRepos: ghStats.repos,
          loading: false
        });
      } catch (err) {
        console.error("Stats fetch error:", err);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const currentSentence = sentences[loopNum % sentences.length];
      setText(isDeleting ? currentSentence.substring(0, text.length - 1) : currentSentence.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 20 : 60);

      if (!isDeleting && text === currentSentence) {
        setTypingSpeed(1500); 
        setIsDeleting(true);
      }
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(Math.floor(Math.random() * sentences.length));
        setTypingSpeed(300);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, sentences, typingSpeed]);

  return (
    <section className="relative w-full rounded-2xl overflow-hidden mb-8" id="home">
      <div className="absolute inset-0 z-0">
        <img src="/images/hero-bg.webp" alt="Hero background" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-14 lg:p-16">
        <div className="flex-1 max-w-2xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
            Discover my Amazing <br />
            Art Space!
          </h1>

          <div className="mb-8 font-mono text-sm md:text-base animate-fade-in-up min-h-[3rem]" style={{ animationDelay: '0.1s', lineHeight: '1.8' }}>
            <span className="text-accent font-bold mr-2">&lt;code&gt;</span>
            <span className="text-text-primary tracking-wide">{text}</span>
            <span className="animate-pulse font-bold text-text-primary">|</span>
            <span className="text-accent font-bold ml-2">&lt;/code&gt;</span>
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <a href="#portfolio" className="bg-accent text-bg-primary font-bold py-3 px-8 rounded-sm hover:-translate-y-1 transition-transform shadow-[0_10px_20px_-10px_rgba(250,204,21,0.5)]">
              EXPLORE NOW
            </a>
            <a href="#contact" className="border-2 border-white/20 text-text-primary font-bold py-3 px-8 rounded-sm hover:border-accent hover:text-accent transition-colors uppercase">
              CONTACT ME <ChevronRight size={16} className="inline ml-1" />
            </a>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center md:justify-end animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[80px]"></div>
            <img src="/images/hero-portrait.webp" alt="Portrait" className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl" />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-6 md:px-14 border-t border-white/5 bg-bg-card/30 backdrop-blur-sm">
        {stats.loading ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          <>
            <Stat counter={stats.years} suffix="+" label="Years Experience" />
            <Stat counter={stats.cmsProjects} label="Completed Projects" />
            <Stat counter={stats.githubRepos} label="Public Repos" />
            <Stat counter={stats.githubCommits} suffix="+" label="Commits Made" />
          </>
        )}
      </div>
    </section>
  );
}

// Updated counter component to react to prop changes
function Stat({ counter, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Reset count when counter prop changes (e.g. after fetch)
    setCount(0);
    
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const end = parseFloat(counter);
        if (isNaN(end) || end === 0) return;

        let start = 0;
        const totalDuration = 2000;
        const isDecimal = end % 1 !== 0;
        
        // Calculate step based on value scale
        const step = isDecimal ? end / 100 : Math.ceil(end / 100);
        const incrementTime = Math.max(10, totalDuration / 100);

        let timer = setInterval(() => {
          start += step;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          setCount(start);
        }, incrementTime);

        observerRef.current.disconnect();
      }
    }, { threshold: 0.1 });

    if (nodeRef.current) observerRef.current.observe(nodeRef.current);
    return () => { if (observerRef.current) observerRef.current.disconnect(); };
  }, [counter]);

  const displayCount = (counter.toString().includes('.') || count % 1 !== 0) 
    ? count.toFixed(1) 
    : Math.floor(count);

  return (
    <div ref={nodeRef} className="flex items-center gap-3">
      <span className="text-2xl md:text-3xl font-bold text-accent font-mono min-w-[3rem]">
        {displayCount}{suffix}
      </span>
      <span className="text-xs text-text-secondary max-w-[100px] leading-tight uppercase tracking-tighter font-bold">
        {label}
      </span>
    </div>
  );
}
