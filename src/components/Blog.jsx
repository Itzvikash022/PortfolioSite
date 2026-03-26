import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'How to Build a Dark Mode React App',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet!',
      image: '/images/blog-1.webp',
      date: '24.12.2023',
    },
    {
      id: 2,
      title: 'UI/UX Principles for Dashboards',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet!',
      image: '/images/blog-1.webp',
      date: '15.11.2023',
    },
    {
      id: 3,
      title: 'Optimizing Webpack for Performance',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet!',
      image: '/images/blog-1.webp',
      date: '02.10.2023',
    }
  ];

  return (
    <section id="blog" className="mb-16">
      <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">Newsletter & Blog</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div 
            key={post.id} 
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
                to={`/blog/${post.id}`} 
                className="inline-flex items-center text-accent text-xs font-bold tracking-wider hover:text-white transition-colors uppercase mt-auto"
              >
                READ MORE <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
