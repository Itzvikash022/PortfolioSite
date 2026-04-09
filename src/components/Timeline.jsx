import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { fetchAPI } from '../utils/api';
import { Sk } from './Skeleton';

export default function Timeline() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimeline = async () => {
      try {
        const data = await fetchAPI('/timeline');
        setTimeline(data);
      } catch (err) {
        console.error('Failed to load timeline:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTimeline();
  }, []);

  const education = timeline.filter(item => item.type === 'Education');
  const work = timeline.filter(item => item.type === 'Experience');

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {Array.from({ length: 2 }).map((_, col) => (
          <div key={col}>
            <Sk.Line className="w-1/3 h-6 mb-8" />
            <div className="relative border-l-2 border-white/5 ml-3 space-y-8 pb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="relative pl-8 animate-pulse">
                  <Sk.Circle className="absolute -left-[11px] top-1 w-5 h-5" />
                  <div className="glass-card p-6 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <Sk.Line className="w-1/2" />
                      <Sk.Line className="w-1/4 h-2" />
                    </div>
                    <Sk.Line className="w-1/3 h-2" />
                    <Sk.Line className="w-full h-2" />
                    <Sk.Line className="w-3/4 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="history" className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Education Column */}
        <div>
          <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">Education</h2>
          <div className="relative border-l-2 border-white/5 ml-3 space-y-8 pb-4">
            {education.map((item, index) => (
              <TimelineCard key={item._id || item.id} item={item} delay={index * 0.1} />
            ))}
            {education.length === 0 && <p className="text-sm italic opacity-50 pl-8">No education entries found.</p>}
          </div>
        </div>

        {/* Work History Column */}
        <div>
          <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">Work History</h2>
          <div className="relative border-l-2 border-white/5 ml-3 space-y-8 pb-4">
            {work.map((item, index) => (
              <TimelineCard key={item._id || item.id} item={item} delay={index * 0.1 + 0.3} />
            ))}
            {work.length === 0 && <p className="text-sm italic opacity-50 pl-8">No work entries found.</p>}
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
            {item.duration || item.date}
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
