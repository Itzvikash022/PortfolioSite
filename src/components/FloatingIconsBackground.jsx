import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaJs, FaHtml5, FaCss3Alt, 
  FaVuejs, FaSass, FaNodeJs, FaPython, 
  FaDocker, FaGithub, FaFigma, FaBootstrap 
} from 'react-icons/fa6';

const ICONS = [
  FaReact, FaJs, FaHtml5, FaCss3Alt, 
  FaVuejs, FaSass, FaNodeJs, FaPython, 
  FaDocker, FaGithub, FaFigma, FaBootstrap
];

export default function FloatingIconsBackground() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate static random elements only on the client side
    const newElements = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      size: Math.floor(Math.random() * 24) + 20, // 20px to 44px
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 60 + 40, // 40s to 100s (very slow and smooth)
      delay: Math.random() * -100, // Negative delay to start mid-animation
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() > 0.5 ? 360 : -360,
      yOffset: Math.random() * 400 + -200, 
      xOffset: Math.random() * 400 - 200, 
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-bg-primary">
      {/* 
        Solid base without massive glow orbs.
        Only pure monochrome floating tech stack icons. 
      */}
      {elements.map((el) => {
        const { Icon } = el;
        return (
          <motion.div
            key={el.id}
            className="absolute text-white/5 opacity-80" 
            style={{ left: el.left, top: el.top }}
            initial={{ 
              y: 0, 
              x: 0, 
              rotate: el.rotateStart 
            }}
            animate={{
              y: [0, el.yOffset, 0],
              x: [0, el.xOffset, 0],
              rotate: [el.rotateStart, el.rotateStart + el.rotateEnd],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "linear",
              delay: el.delay,
            }}
          >
            <Icon size={el.size} />
          </motion.div>
        );
      })}
    </div>
  );
}
