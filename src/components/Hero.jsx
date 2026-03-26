import { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  const [sentences, setSentences] = useState(['I build web and mobile applications']);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    fetch('/data/sentences.xml')
      .then(res => res.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, 'text/xml');
        const sentenceNodes = xml.querySelectorAll('sentence');
        const loadedSentences = Array.from(sentenceNodes).map(node => node.textContent);
        if (loadedSentences.length > 0) {
          setSentences(loadedSentences);
        }
      })
      .catch(err => console.error("Error loading XML:", err));
  }, []);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      // Pick current sentence
      const currentSentence = sentences[loopNum % sentences.length];

      setText(isDeleting
        ? currentSentence.substring(0, text.length - 1)
        : currentSentence.substring(0, text.length + 1)
      );

      // Adjust typing speed based on whether it's deleting (faster deleting)
      setTypingSpeed(isDeleting ? 20 : 60);

      // If finished typing
      if (!isDeleting && text === currentSentence) {
        setTypingSpeed(1500); // Wait 1.5s before deleting
        setIsDeleting(true);
      }
      // If finished deleting
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        // Randomly select next sentence index
        const nextIndex = Math.floor(Math.random() * sentences.length);
        setLoopNum(nextIndex);
        setTypingSpeed(300); // Wait 0.3s before typing begins again
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, sentences, typingSpeed]);

  return (
    <section className="relative w-full rounded-2xl overflow-hidden mb-8" id="home">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.webp"
          alt="Hero background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-14 lg:p-20">
        {/* Text Content */}
        <div className="flex-1 max-w-2xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
            Discover my Amazing <br />
            Art Space!
          </h1>

          <div className="mb-8 font-mono flex items-center gap-2 text-sm md:text-base animate-fade-in-up h-8" style={{ animationDelay: '0.1s' }}>
            <span className="text-accent font-bold">&lt;code&gt;</span>
            <span className="text-text-primary tracking-wide">
              {text}
              <span className="animate-pulse font-bold ml-px">|</span>
            </span>
            <span className="text-accent font-bold">&lt;/code&gt;</span>
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <a href="#portfolio" className="bg-accent text-bg-primary font-bold py-3 px-8 rounded-sm hover:-translate-y-1 transition-transform shadow-[0_10px_20px_-10px_rgba(250,204,21,0.5)]">
              EXPLORE NOW
            </a>
            <a href="#contact" className="border-2 border-white/20 text-text-primary font-bold py-3 px-8 rounded-sm hover:border-accent hover:text-accent transition-colors">
              HIRE ME <ChevronRight size={16} className="inline ml-1" />
            </a>
          </div>
        </div>

        {/* Portrait Image */}
        <div className="flex-1 relative flex justify-center md:justify-end animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[80px]"></div>
            <img
              src="/images/hero-portrait.webp"
              alt="Vikash Maurya Portrait"
              className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 flex flex-wrap justify-between items-center gap-6 px-8 py-6 md:px-14 border-t border-white/5 bg-bg-card/30 backdrop-blur-sm">
        <Stat counter={10} suffix="+" label="Years Experience" />
        <Stat counter={143} label="Completed Projects" />
        <Stat counter={114} label="Happy Customers" />
        <Stat counter={20} suffix="+" label="Honors and Awards" />
      </div>
    </section>
  );
}

// Simple counter animation component
function Stat({ counter, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const end = parseInt(counter, 10);
        if (start === end) return;

        let totalDuration = 2000;
        let incrementTime = (totalDuration / end);

        let timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) clearInterval(timer);
        }, incrementTime);

        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [counter]);

  return (
    <div ref={nodeRef} className="flex items-center gap-3">
      <span className="text-2xl md:text-3xl font-bold text-accent font-mono">
        {count}{suffix}
      </span>
      <span className="text-sm text-text-secondary max-w-[100px] leading-tight">
        {label}
      </span>
    </div>
  );
}
