import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../utils/api';
import { Sk } from './Skeleton';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchAPI('/blogs');
        setPosts(data);
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  return (
    <section id="blog" className="mb-16">
      <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">Newsletter & Blog</h2>
      
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card rounded-lg overflow-hidden animate-pulse">
              <Sk.Box className="h-48 w-full" />
              <div className="p-6 space-y-3">
                <Sk.Line className="w-1/4 h-2" />
                <Sk.Line className="w-3/4" />
                <Sk.Line className="w-1/2 h-2" />
                <Sk.Line className="w-full h-2" />
                <Sk.Line className="w-1/4 h-2 mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div 
              key={post._id || post.id} 
              className="glass-card flex flex-col rounded-lg overflow-hidden group animate-fade-in-up transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(250,204,21,0.15)] hover:border-accent/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden bg-bg-card">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs text-text-secondary mb-2">{post.date}</span>
                <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post._id || post.id}`} 
                  className="inline-flex items-center text-accent text-xs font-bold tracking-wider hover:text-white transition-colors uppercase mt-auto"
                >
                  READ MORE <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-xl">
              <p className="text-text-secondary italic">No blog posts found.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
