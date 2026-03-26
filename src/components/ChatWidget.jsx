import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MessageSquare, X, ArrowRight } from 'lucide-react';

export default function ChatWidget() {
  const [phase, setPhase] = useState('fab'); // fab, shooting, input, chat
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you today?", isBot: true }
  ]);
  const messagesEndRef = useRef(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (phase === 'chat' && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, phase]);

  const startShooting = () => {
    setPhase('shooting');
    setTimeout(() => {
      setPhase('input');
    }, 400); // bolt animation duration
  };

  const handleArrowClick = (e) => {
    e.stopPropagation();
    if (text.trim() === '') {
      setPhase('fab');
    } else {
      setMessages([...messages, { id: Date.now(), text, isBot: false }]);
      setText('');
      // simulate reply
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now(), text: "Thanks for the message! I'll quickly get back to you.", isBot: true }]);
      }, 1000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {phase === 'fab' && (
          <motion.div
            key="fab"
            layoutId="chat-wrapper"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={startShooting}
            className="fixed bottom-6 right-6 lg:bottom-8 lg:right-[94px] w-14 h-14 bg-accent rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)] flex items-center justify-center text-bg-primary hover:scale-110 transition-transform z-40 cursor-pointer"
          >
            <MessageSquare size={24} />
          </motion.div>
        )}

        {phase === 'shooting' && (
          <motion.div
            key="bolt"
            className="fixed bottom-[2.5rem] right-[3.25rem] lg:bottom-[3.5rem] lg:right-[122px] h-1.5 bg-accent shadow-[0_0_15px_rgba(250,204,21,1)] z-40 rounded-full"
            initial={{ width: 0, opacity: 1 }}
            animate={{ width: 'calc(50vw - 2rem)', opacity: [1, 1, 0] }}
            transition={{ duration: 0.4, times: [0, 0.7, 1], ease: "easeOut" }}
          />
        )}

        {phase === 'input' && (
          <motion.div
            key="input"
            layoutId="chat-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            drag
            dragConstraints={{ left: -500, right: 500, top: -500, bottom: 50 }}
            dragElastic={0.1}
            dragMomentum={false}
            className="fixed bottom-8 left-0 right-0 mx-auto w-[90vw] max-w-3xl h-14 glass-card backdrop-blur-md bg-bg-card/70 border border-white/10 rounded-full flex items-center px-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 overflow-hidden cursor-text"
            onClick={() => setPhase('chat')}
          >
            <input 
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-text-primary placeholder-text-secondary outline-none px-2"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleArrowClick(e);
              }}
            />
            <button 
              onClick={handleArrowClick}
              className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-bg-primary hover:bg-white transition-colors flex-shrink-0"
            >
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {phase === 'chat' && (
          <motion.div
            key="chat"
            layoutId="chat-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            drag
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ left: -500, right: 500, top: -500, bottom: 50 }}
            dragElastic={0.1}
            dragMomentum={false}
            style={{ touchAction: 'auto' }}
            className="fixed bottom-8 left-0 right-0 mx-auto w-[90vw] max-w-3xl h-[450px] min-h-[350px] min-w-[300px] glass-card backdrop-blur-xl bg-bg-card/85 border border-white/10 rounded-2xl flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden resize"
          >
            {/* Header (Drag Handle) */}
            <div 
              className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 cursor-grab active:cursor-grabbing touch-none"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-bg-primary font-bold">
                  A
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-primary leading-tight">Artur Carter</h3>
                  <p className="text-xs text-text-secondary">Online</p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setPhase('input'); }}
                className="text-text-secondary hover:text-text-primary transition-colors p-1"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-md ${
                    msg.isBot 
                      ? 'bg-white/10 text-text-primary rounded-tl-sm' 
                      : 'bg-accent text-bg-primary font-medium rounded-tr-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex gap-2 items-center">
              <input 
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-bg-primary/50 text-text-primary placeholder-text-secondary outline-none px-4 py-2.5 rounded-full text-sm border border-white/5 focus:border-accent/50 transition-colors"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleArrowClick(e);
                }}
                autoFocus
              />
              <button 
                onClick={handleArrowClick}
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-bg-primary hover:bg-white transition-colors flex-shrink-0"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
