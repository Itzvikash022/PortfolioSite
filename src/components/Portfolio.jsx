import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const portfolioItems = [
  { 
    id: 1, 
    category: 'Web Templates', 
    title: 'Creative Agency Theme', 
    image: '/images/portfolio-1.webp',
    images: ['/images/portfolio-1.webp', '/images/hero-bg.webp', '/images/blog-1.webp'],
    description: 'A comprehensive web template tailored for creative agencies, featuring immersive dark modes, fluid animations, and a focus on visual hierarchy to showcase portfolios beautifully.',
    client: 'Envato',
    date: 'Oct 2025',
    role: 'Frontend Architect'
  },
  { 
    id: 2, 
    category: 'UI Elements', 
    title: 'Dashboard UI Kit', 
    image: '/images/portfolio-1.webp',
    images: ['/images/hero-bg.webp', '/images/portfolio-1.webp', '/images/blog-1.webp'],
    description: 'A cutting-edge dark-themed dashboard UI kit designed for SaaS platforms. Includes over 100+ components, interactive charts, and seamless responsive layouts for analytics.',
    client: 'FinTech Startup',
    date: 'Dec 2025',
    role: 'UI/UX Designer'
  },
  { 
    id: 3, 
    category: 'Logos', 
    title: 'StartUp Logo Design', 
    image: '/images/portfolio-1.webp',
    images: ['/images/blog-1.webp', '/images/hero-bg.webp', '/images/portfolio-1.webp'],
    description: 'A modern, geometric logo approach for an emerging AI startup. The branding package includes variations for dark and light modes, typography guidelines, and scalable vector assets.',
    client: 'AI Dynamics',
    date: 'Jan 2026',
    role: 'Brand Designer'
  },
  { 
    id: 4, 
    category: 'Drawings', 
    title: 'Abstract Illustration', 
    image: '/images/portfolio-1.webp',
    images: ['/images/hero-bg.webp', '/images/blog-1.webp', '/images/portfolio-1.webp'],
    description: 'A collection of abstract digital illustrations exploring the intersection of nature and technology. Created using advanced tablet workflows and custom brush engines.',
    client: 'Personal Project',
    date: 'Feb 2026',
    role: 'Illustrator'
  },
  { 
    id: 5, 
    category: 'Web Templates', 
    title: 'E-commerce React App', 
    image: '/images/portfolio-1.webp',
    images: ['/images/portfolio-1.webp', '/images/blog-1.webp', '/images/hero-bg.webp'],
    description: 'A robust, high-performance e-commerce frontend built entirely in React and Tailwind CSS. Features advanced filtering, cart management, and seamless micro-animations.',
    client: 'Shopify Premium',
    date: 'Mar 2026',
    role: 'Lead Developer'
  },
  { 
    id: 6, 
    category: 'UI Elements', 
    title: 'Mobile Banking App', 
    image: '/images/portfolio-1.webp',
    images: ['/images/blog-1.webp', '/images/portfolio-1.webp', '/images/hero-bg.webp'],
    description: 'Mobile-first design system for a digital banking application focusing on accessibility, clear visual hierarchy, and trust-building dark mode color palettes.',
    client: 'Global Bank',
    date: 'Apr 2026',
    role: 'Lead UX Designer'
  },
];

const filters = ['All', 'Web Templates', 'Logos', 'Drawings', 'UI Elements'];

function Carousel({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const paginate = (newDirection) => {
    if (newDirection === 1) {
      setIndex((prev) => (prev + 1) % images.length);
    } else {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -100) paginate(1);
            else if (swipe > 100) paginate(-1);
          }}
          className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
          alt="project slide"
        />
      </AnimatePresence>
      
      {/* Arrows (shown on hover) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button onClick={() => paginate(-1)} className="p-2 rounded-full bg-black/50 text-white hover:bg-accent hover:text-bg-primary transition shadow-lg"><ChevronLeft size={20}/></button>
        <button onClick={() => paginate(1)} className="p-2 rounded-full bg-black/50 text-white hover:bg-accent hover:text-bg-primary transition shadow-lg"><ChevronRight size={20}/></button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-accent' : 'w-2 bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedItem]);

  return (
    <section id="portfolio" className="mb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Works</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-sm tracking-wider font-medium transition-colors ${
                activeFilter === filter 
                  ? 'text-accent' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div 
            key={item.id} 
            className="group relative overflow-hidden rounded-lg animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedItem(item)}
          >
            {/* Image Wrapper */}
            <div className="aspect-[4/3] bg-bg-card overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-accent text-xs mb-1 font-mono tracking-wider">{item.category}</span>
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              <button 
                className="inline-flex items-center text-accent text-xs font-bold tracking-wider hover:text-white transition-colors uppercase"
              >
                READ MORE <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md"
              onClick={() => setSelectedItem(null)}
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl bg-bg-card border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_30px_60px_rgba(0,0,0,0.8)] max-h-[90vh] md:h-[600px]"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-accent hover:text-bg-primary transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>

              {/* Carousel Area */}
              <div className="w-full md:w-3/5 bg-black relative h-64 md:h-full overflow-hidden group">
                <Carousel images={selectedItem.images} />
              </div>

              {/* Details Area */}
              <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
                <span className="text-accent text-xs tracking-widest font-mono mb-2 uppercase">{selectedItem.category}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 leading-tight">{selectedItem.title}</h2>
                
                <div className="text-sm text-text-secondary leading-loose mb-8">
                  <p>{selectedItem.description}</p>
                </div>

                <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <span className="text-xs text-text-secondary uppercase tracking-widest font-bold">Client:</span>
                    <span className="text-sm font-bold text-text-primary">{selectedItem.client}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <span className="text-xs text-text-secondary uppercase tracking-widest font-bold">Date:</span>
                    <span className="text-sm font-bold text-text-primary">{selectedItem.date}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <span className="text-xs text-text-secondary uppercase tracking-widest font-bold">Role:</span>
                    <span className="text-sm border-b border-accent text-text-primary mb-0.5 pb-0.5">{selectedItem.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
