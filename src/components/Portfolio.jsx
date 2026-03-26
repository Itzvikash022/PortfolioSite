import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const portfolioItems = [
  { id: 1, category: 'Web Templates', title: 'Creative Agency Theme', image: '/images/portfolio-1.webp' },
  { id: 2, category: 'UI Elements', title: 'Dashboard UI Kit', image: '/images/portfolio-1.webp' },
  { id: 3, category: 'Logos', title: 'StartUp Logo Design', image: '/images/portfolio-1.webp' },
  { id: 4, category: 'Drawings', title: 'Abstract Illustration', image: '/images/portfolio-1.webp' },
  { id: 5, category: 'Web Templates', title: 'E-commerce React App', image: '/images/portfolio-1.webp' },
  { id: 6, category: 'UI Elements', title: 'Mobile Banking App', image: '/images/portfolio-1.webp' },
];

const filters = ['All', 'Web Templates', 'Logos', 'Drawings', 'UI Elements'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

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
            className="group relative overflow-hidden rounded-lg animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
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
              <span className="text-accent text-xs mb-1 font-mono">{item.category}</span>
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              <a 
                href="#" 
                className="inline-flex items-center text-text-primary text-xs font-bold tracking-wider hover:text-accent transition-colors"
                onClick={e => e.preventDefault()}
              >
                READ MORE <ChevronRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
