import { ChevronRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Web Development',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi!',
    },
    {
      title: 'UI/UX Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi!',
    },
    {
      title: 'Sound Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi!',
    },
    {
      title: 'Game Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi!',
    },
    {
      title: 'Advertising',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi!',
    },
  ];

  return (
    <section id="services" className="mb-16">
      <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">My Services</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div 
            key={index} 
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
      </div>
    </section>
  );
}
