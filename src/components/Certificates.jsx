import { useState, useEffect } from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { fetchAPI } from '../utils/api';
import { Sk } from './Skeleton';

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAPI('/certificates');
        setCerts(data);
      } catch (err) {
        console.error('Failed to load certificates:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section id="certificates" className="mb-16">
      <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">Certifications</h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-lg animate-pulse">
              <div className="flex items-center gap-3">
                <Sk.Box className="w-9 h-9 rounded flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Sk.Line className="w-3/4" />
                  <Sk.Line className="w-1/2 h-2" />
                </div>
                <Sk.Box className="w-8 h-8 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : certs.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 rounded-xl">
          <p className="text-text-secondary italic">No certifications listed yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certs.map((cert, index) => (
            <div
              key={cert._id}
              className="glass-card p-6 rounded-lg group hover:-translate-y-1 hover:border-accent/30 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Name + Icon */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {cert.icon ? (
                    <div className="relative flex-shrink-0">
                      <img
                        src={cert.icon}
                        alt={cert.name}
                        className="w-9 h-9 rounded object-contain bg-white/5 p-1 border border-white/10"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-9 h-9 rounded bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Award size={18} className="text-accent" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-bold text-text-primary text-sm leading-tight group-hover:text-accent transition-colors truncate">
                      {cert.name}
                    </h3>
                    {cert.about && (
                      <p className="text-xs text-text-secondary mt-0.5 line-clamp-2 leading-relaxed">
                        {cert.about}
                      </p>
                    )}
                  </div>
                </div>

                {/* Link */}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex-shrink-0 p-2 rounded-md bg-white/5 hover:bg-accent hover:text-bg-primary text-text-secondary transition-colors border border-white/10 hover:border-accent"
                    title="View Certificate"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
