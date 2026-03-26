import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Trophy, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WIN_SCENARIOS = [
  "Persistence beats randomness.",
  "You debugged the system.",
  "Statistically impressive… or lucky.",
  "You brute-forced it. Respect."
];

export default function MiniGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempt, setAttempt] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('idle'); // 'playing', 'won', 'cooldown'
  const [winMessage, setWinMessage] = useState('');
  const [cooldownMins, setCooldownMins] = useState(0);
  
  useEffect(() => {
    const handleOpen = () => {
      // Cooldown Check
      const lastPlay = localStorage.getItem('lastMiniGamePlay');
      if (lastPlay) {
         const timeSince = Date.now() - parseInt(lastPlay, 10);
         const cooldownMs = 10 * 60 * 1000; // 10 minutes
         if (timeSince < cooldownMs) {
            setCooldownMins(Math.ceil((cooldownMs - timeSince) / 60000));
            setStatus('cooldown');
            setIsOpen(true);
            return;
         }
      }

      // Initialize game
      setTargetNumber(Math.floor(Math.random() * 20) + 1);
      setAttempt(1);
      setGuess('');
      setFeedback('');
      setStatus('playing');
      setIsOpen(true);
    };

    window.addEventListener('open-minigame', handleOpen);
    return () => window.removeEventListener('open-minigame', handleOpen);
  }, []);

  const closeGame = () => {
    setIsOpen(false);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    if (status !== 'playing') return;
    
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 20) {
      setFeedback('Enter a valid number between 1 and 20.');
      return;
    }

    // Weighted forced-win logic
    // Attempt 1: 20%, Attempt 2: 35%, Attempt 3: 50%, Attempt 4: 75%, Attempt 5: 100%
    const winChances = [0, 0.20, 0.35, 0.50, 0.75, 1.0];
    const isWinRoll = Math.random() < winChances[attempt];

    const isHonestWin = num === targetNumber;
    
    // Force win if roll succeeded
    const forceWin = isWinRoll && !isHonestWin;
    
    if (isHonestWin || forceWin) {
      triggerWin();
      return;
    }

    // Attempt failed
    if (attempt >= 5) {
      // Fallback safeguard to guarantee win on final stretch
      triggerWin();
      return;
    }

    // Normal failure feedback
    setFeedback(num > targetNumber ? "Too high! Try a lower number." : "Too low! Try a higher number.");
    setAttempt(attempt + 1);
    setGuess('');
  };

  const triggerWin = () => {
    setStatus('won');
    localStorage.setItem('hasPlayedMinigame', 'true');
    localStorage.setItem('lastMiniGamePlay', Date.now().toString());
    setWinMessage(WIN_SCENARIOS[Math.floor(Math.random() * WIN_SCENARIOS.length)]);
    
    // Fire Confetti explosion from edges
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#facc15', '#ffffff', '#252540'],
        zIndex: 300
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#facc15', '#ffffff', '#252540'],
        zIndex: 300
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeGame}
          className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 20 }}
           className="relative w-full max-w-sm bg-bg-card border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col justify-center items-center text-center overflow-hidden"
        >
           {/* Close Details */}
           <button 
             onClick={closeGame}
             className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
           >
             <X size={20} />
           </button>

           {status === 'playing' && (
             <>
               <span className="text-4xl mb-4 drop-shadow-md">🎮</span>
               <h3 className="text-xl font-bold text-text-primary mb-1">Guess the Number</h3>
               <p className="text-sm text-text-secondary mb-6">Pick a random number between <span className="text-white font-bold">1</span> and <span className="text-white font-bold">20</span></p>

               <form onSubmit={handleGuess} className="w-full flex gap-3 mb-2">
                 <input 
                   type="number" 
                   min="1" max="20"
                   autoFocus
                   value={guess}
                   onChange={(e) => setGuess(e.target.value)}
                   className="flex-1 bg-bg-primary border border-white/5 rounded-md px-4 py-3 text-center text-lg font-mono focus:outline-none focus:border-accent shadow-inner text-white"
                   placeholder="1 - 20"
                 />
                 <button 
                   type="submit"
                   className="bg-accent text-bg-primary font-bold px-6 py-3 rounded-md hover:-translate-y-1 transition-transform shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                 >
                   GUESS
                 </button>
               </form>

               {/* Feedback area fixed height prevents jumping */}
               <div className="h-6 mt-2 mb-4 w-full flex items-center justify-center">
                 {feedback && (
                   <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 font-mono italic">
                     {feedback}
                   </motion.p>
                 )}
               </div>

               <div className="w-full h-1 bg-bg-primary rounded-full overflow-hidden mt-1">
                 <div className="h-full bg-accent transition-all duration-300" style={{ width: `${(attempt / 5) * 100}%` }}></div>
               </div>
               <p className="text-[10px] text-text-secondary font-bold tracking-widest mt-3 uppercase">Attempt {attempt} / 5</p>
             </>
           )}

           {status === 'won' && (
             <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center w-full">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6 border border-accent/20 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                  <Trophy size={28} />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">You Win 🎉</h3>
                <p className="text-sm text-accent font-mono italic mb-8 py-2 px-4 bg-accent/10 rounded-md border border-accent/20">"{winMessage}"</p>
                
                <button 
                  onClick={closeGame}
                  className="w-full py-3 border border-white/10 hover:bg-white/5 rounded-md text-sm font-bold tracking-widest text-text-primary transition-colors uppercase"
                >
                  Return to Matrix
                </button>
             </motion.div>
           )}

           {status === 'cooldown' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full">
                <AlertCircle className="text-text-secondary mb-4 opacity-50" size={32} />
                <h3 className="text-xl font-bold text-text-primary mb-2">System Cooldown</h3>
                <p className="text-sm text-text-secondary mb-6 leading-relaxed">You've already manipulated the odds recently. The mainframe requires roughly <span className="text-accent font-bold">{cooldownMins} minutes</span> to reset.</p>
                <button onClick={closeGame} className="w-full py-3 bg-bg-primary rounded-md text-sm font-bold tracking-widest text-text-secondary hover:text-text-primary transition-colors uppercase">
                  Close Terminal
                </button>
             </motion.div>
           )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
