import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Layout from '../components/Layout';

export default function BlogPost() {
  const { id } = useParams();

  // In a real app we would fetch the post data based on ID
  const post = {
    title: 'How to Build a Dark Mode React App',
    content: `
      <p class="mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, sint ex doloremque molestias necessitatibus vel error consequuntur facilis ad minima voluptatum architecto aliquid unde! Assumenda impedit sequi obcaecati in.</p>
      
      <h3 class="text-xl font-bold mb-4 text-text-primary">The Process</h3>
      
      <p class="mb-4">Eos eaque impedit repellendus iusto asperiores distinctio natus. Quisquam reiciendis, omnis mollitia id a ipsam ex illum accusamus soluta, est laudantium, eius facere? Sed at in nam odio ab. Natus eum voluptatibus iusto rem voluptatem temporibus veritatis minus impedit.</p>
      
      <blockquote class="border-l-4 border-accent pl-6 py-2 my-8 italic text-lg text-text-primary bg-bg-card/30 rounded-r">
        "Good design is obvious. Great design is transparent." - Joe Sparano
      </blockquote>
      
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>Dolor sit amet consectetur adipisicing elit.</li>
        <li>Blanditiis id distinctio aut provident illum.</li>
        <li>Soluta eligendi voluptatem in alias ex suscipit.</li>
        <li>Nemo magni debitis assumenda!</li>
      </ul>
      
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab animi perferendis error provident sit? Iste hic corrupti odio vel commodi sed recusandae. Dolore accusamus non in? Soluta, assumenda iusto. Porro.</p>
    `,
    image: '/images/blog-1.webp',
    date: '24.12.2023',
    author: 'Vikash Maurya',
    category: 'Web Development',
    comments: 4,
  };

  return (
    <Layout>
      <div className="glass-card rounded-lg overflow-hidden animate-fade-in-up">
        {/* Featured Image */}
        <div className="h-64 md:h-96 w-full relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent"></div>
        </div>

        <div className="p-8 lg:p-12">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-text-secondary hover:text-accent font-bold text-xs tracking-wider uppercase mb-8 transition-colors">
            <ChevronLeft size={16} className="mr-1" /> Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">

            {/* Main Content */}
            <div className="lg:w-2/3">
              <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-8 leading-tight">
                {post.title}
              </h1>

              <div
                className="text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Sidebar Metadata */}
            <div className="lg:w-1/3 space-y-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-12">
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">Publication Info</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-text-secondary">Date:</span>
                    <span className="text-text-primary">{post.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-text-secondary">Author:</span>
                    <span className="text-text-primary">{post.author}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-text-secondary">Category:</span>
                    <span className="text-accent hover:underline cursor-pointer">{post.category}</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-text-secondary">Comments:</span>
                    <span className="text-text-primary">{post.comments}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'UI/UX', 'Design', 'Frontend'].map(tag => (
                    <span key={tag} className="text-xs text-text-secondary bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
