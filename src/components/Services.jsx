import { useState, useEffect } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { fetchAPI } from '../utils/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchAPI('/services');
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <section id="services" className="mb-16">
      <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">My Services</h2>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="text-accent animate-spin mb-4" size={40} />
          <p className="text-text-secondary animate-pulse uppercase tracking-widest text-xs">Loading Services...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={service._id || index} 
              className="glass-card p-8 rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(250,204,21,0.15)] hover:border-accent/30 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-bold mb-4 text-text-primary group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center text-accent text-xs font-bold tracking-wider hover:text-white transition-colors"
              >
                ORDER NOW <ChevronRight size={14} className="ml-1" />
              </a>
            </div>
          ))}
          {services.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-xl">
              <p className="text-text-secondary italic">No services listed yet.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
