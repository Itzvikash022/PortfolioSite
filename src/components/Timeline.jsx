import { ChevronRight } from 'lucide-react';

export default function Timeline() {
  const education = [
    {
      id: 1,
      title: 'University of toronto',
      subtitle: 'Student',
      date: 'jan 2018 - may 2020',
      description: 'Dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.',
      linkText: 'DIPLOME'
    },
    {
      id: 2,
      title: 'Arter design school',
      subtitle: 'Student',
      date: 'jan 2018 - may 2020',
      description: 'Consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde?',
      linkText: ''
    },
    {
      id: 3,
      title: 'Web developer courses',
      subtitle: 'Student',
      date: 'jan 2018 - may 2020',
      description: 'Dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.',
      linkText: 'LICENCE'
    }
  ];

  const work = [
    {
      id: 1,
      title: 'Envato',
      subtitle: 'Template author',
      date: 'jan 2018 - may 2020',
      description: 'Placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.',
      linkText: ''
    },
    {
      id: 2,
      title: 'Themeforest',
      subtitle: 'Template author',
      date: 'jan 2018 - may 2020',
      description: 'Adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde?',
      linkText: 'RECOMMENDATION'
    },
    {
      id: 3,
      title: 'Envato market',
      subtitle: 'Template author',
      date: 'jan 2018 - may 2020',
      description: 'Consectetur adipisicing elit. Excepturi, obcaecati, quisquam id molestias eaque asperiores voluptatibus cupiditate error assumenda delectus odit similique earum voluptatem doloremque dolorem ipsam quae rerum quis.',
      linkText: 'RECOMMENDATION'
    }
  ];

  return (
    <section id="history" className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Education Column */}
        <div>
          <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">Education</h2>
          <div className="relative border-l-2 border-white/5 ml-3 space-y-8 pb-4">
            {education.map((item, index) => (
              <TimelineCard key={item.id} item={item} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Work History Column */}
        <div>
          <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">Work History</h2>
          <div className="relative border-l-2 border-white/5 ml-3 space-y-8 pb-4">
            {work.map((item, index) => (
              <TimelineCard key={item.id} item={item} delay={index * 0.1 + 0.3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, delay }) {
  return (
    <div 
      className="relative pl-8 animate-fade-in-up" 
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Timeline Dot */}
      <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-bg-primary border-[4px] border-accent shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
      
      {/* Card Content */}
      <div className="glass-card p-6 md:p-8 rounded-lg group hover:border-accent/30 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
          <h3 className="text-lg font-bold text-text-primary capitalize">{item.title}</h3>
          <span className="text-xs text-text-secondary bg-white/5 py-1 px-3 rounded-full whitespace-nowrap">
            {item.date}
          </span>
        </div>
        
        <h4 className="text-sm italic text-text-secondary mb-4">{item.subtitle}</h4>
        
        <p className="text-text-secondary text-sm mb-4 leading-relaxed">
          {item.description}
        </p>
        
        {item.linkText && (
          <a 
            href="#" 
            className="inline-flex items-center text-accent text-xs font-bold tracking-wider hover:text-white transition-colors uppercase"
            onClick={e => e.preventDefault()}
          >
            {item.linkText} <ChevronRight size={14} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
}
