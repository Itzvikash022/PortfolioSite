import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { fetchAPI } from '../utils/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchAPI('/testimonials');
        setTestimonials(data);
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isHovered, testimonials.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="mb-16">
      <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">Recommendations</h2>
      
      <div 
        className="relative glass-card p-8 md:p-12 rounded-lg animate-fade-in-up flex flex-col items-center justify-center min-h-[300px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="text-accent animate-spin mb-4" size={40} />
            <p className="text-text-secondary uppercase tracking-widest text-xs">Loading Recommendations...</p>
          </div>
        ) : testimonials.length > 0 ? (
          <>
            <div className="overflow-hidden w-full">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial._id || index} 
                    className="w-full flex-shrink-0 px-4 flex flex-col items-center text-center"
                  >
                    {/* Avatar */}
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-accent shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                    />
                    
                    {/* Name & Role */}
                    <h3 className="text-lg font-bold text-text-primary">{testimonial.name}</h3>
                    <p className="text-sm italic text-text-secondary mb-4">{testimonial.role}</p>
                    
                    {/* Quote */}
                    <p className="text-text-primary text-base md:text-lg italic leading-relaxed max-w-2xl mb-6 flex-1">
                      "{testimonial.text || testimonial.quote}"
                    </p>
                    
                    {/* Rating */}
                    <div className="flex gap-1 text-accent mt-auto">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          fill={i < (testimonial.rating || 5) ? "currentColor" : "transparent"} 
                          className={i < (testimonial.rating || 5) ? "text-accent" : "text-white/20"}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-card border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-card border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === activeIndex ? 'bg-accent' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-10 opacity-50 italic">No recommendations found yet.</div>
        )}
      </div>
    </section>
  );
}
