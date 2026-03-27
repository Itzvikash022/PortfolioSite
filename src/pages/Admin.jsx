import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Briefcase, FileText, Upload, Plus, Trash2, Check, ExternalLink, Mail, MessageSquare } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication checking
    if (token === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid admin token.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-sm bg-bg-card border border-white/5 p-8 rounded-2xl shadow-2xl flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6 border border-accent/20">
            <Lock size={28} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Restricted Access</h2>
          <p className="text-sm text-text-secondary text-center mb-8">Please enter your authorization token to access the mainframe.</p>
          
          <form onSubmit={handleLogin} className="w-full">
            <input 
              type="password"
              placeholder="Enter token..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              autoFocus
              className="w-full bg-bg-primary border border-white/10 rounded-md px-4 py-3 text-center text-lg text-white font-mono mb-4 focus:outline-none focus:border-accent transition-colors"
            />
            {authError && <p className="text-red-400 text-xs text-center mb-4">{authError}</p>}
            <button 
              type="submit"
              className="w-full py-3 bg-accent text-bg-primary font-bold rounded-md hover:-translate-y-1 transition-transform shadow-[0_10px_20px_-10px_rgba(250,204,21,0.5)] tracking-widest uppercase text-sm"
            >
              Authenticate
            </button>
          </form>
          <a href="/" className="mt-6 text-xs text-text-secondary hover:text-accent transition-colors underline underline-offset-4">Return to Public Homepage</a>
        </motion.div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('personal'); // personal, works, blogs
  
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-bg-card/50 border-r border-white/5 flex flex-col md:min-h-screen">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Lock size={20} className="text-accent" />
            Admin Panel
          </h1>
          <p className="text-xs text-text-secondary mt-1">v2.0 CMS Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
          <AdminTabButton icon={User} label="Personal Info" id="personal" active={activeTab} setActive={setActiveTab} />
          <AdminTabButton icon={Briefcase} label="Works/Projects" id="works" active={activeTab} setActive={setActiveTab} />
          <AdminTabButton icon={FileText} label="Blogs/News" id="blogs" active={activeTab} setActive={setActiveTab} />
          <AdminTabButton icon={Mail} label="Inbox" id="inbox" active={activeTab} setActive={setActiveTab} />
        </nav>
        
        <div className="p-4 border-t border-white/5 hidden md:block">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-3 text-sm text-text-secondary hover:text-accent bg-bg-primary rounded-md transition-colors border border-white/5">
            View Live Site <ExternalLink size={14} />
          </a>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
           <AnimatePresence mode="wait">
             {activeTab === 'personal' && <PersonalInfoTab key="personal" />}
             {activeTab === 'works' && <WorksTab key="works" />}
             {activeTab === 'blogs' && <BlogsTab key="blogs" />}
             {activeTab === 'inbox' && <InboxTab key="inbox" />}
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// UI COMPONENTS
// -------------------------------------------------------------

function AdminTabButton({ icon: Icon, label, id, active, setActive }) {
  const isActive = active === id;
  return (
    <button 
      onClick={() => setActive(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm font-medium whitespace-nowrap
        ${isActive ? 'bg-accent/10 border-accent/20 border text-accent shadow-inner' : 'text-text-secondary border border-transparent hover:bg-white/5 hover:text-text-primary'}
      `}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

function FormGroup({ label, children, description }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-text-primary mb-2">{label}</label>
      {description && <p className="text-xs text-text-secondary mb-3">{description}</p>}
      {children}
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input 
      className="w-full bg-bg-primary border border-white/10 rounded-md px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
      {...props}
    />
  );
}

function Textarea({ ...props }) {
  return (
    <textarea 
      className="w-full bg-bg-primary border border-white/10 rounded-md px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors resize-y min-h-[100px]"
      {...props}
    />
  );
}

// -------------------------------------------------------------
// TABS
// -------------------------------------------------------------

function PersonalInfoTab() {
  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setToast('Personal settings saved successfully.');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      {toast && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-md flex items-center gap-3 text-green-400 text-sm">
          <Check size={16} /> {toast}
        </div>
      )}
      
      <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-bold text-text-primary">Personal Information</h2>
          <button onClick={handleSave} className="bg-accent text-bg-primary px-6 py-2 rounded-md font-bold text-sm tracking-widest hover:bg-yellow-500 transition-colors shadow-lg">SAVE CHANGES</button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <FormGroup label="Full Name">
            <Input type="text" defaultValue="Vikash Maurya" />
          </FormGroup>
          <FormGroup label="Primary Roles (Comma separated)">
            <Input type="text" defaultValue="Front-end Developer, UI/UX Designer" />
          </FormGroup>
          <FormGroup label="Residence / Country">
            <Input type="text" defaultValue="India" />
          </FormGroup>
          <FormGroup label="City">
            <Input type="text" defaultValue="Surat" />
          </FormGroup>
          <FormGroup label="Age">
            <Input type="number" defaultValue={24} />
          </FormGroup>
          <FormGroup label="Profile Image URL" description="Upload or paste image URL">
            <div className="flex gap-2">
              <Input type="text" defaultValue="/images/profile.webp" />
              <button type="button" className="bg-bg-primary border border-white/10 hover:border-accent hover:text-accent px-4 py-2 rounded-md transition-colors"><Upload size={16} /></button>
            </div>
          </FormGroup>
        </form>

        <h3 className="text-xl font-bold text-text-primary mt-8 mb-4 border-b border-white/5 pb-2">Skills Matrix</h3>
        <p className="text-sm text-text-secondary mb-6">Manage the technical progress bars displayed in the global sidebar.</p>

        <div className="space-y-4">
          {/* Mock Skill Rows */}
          {['HTML', 'CSS', 'JavaScript', 'React'].map((skill, i) => (
            <div key={i} className="flex gap-4 items-center bg-bg-primary/50 p-3 rounded-md border border-white/5">
              <input className="w-1/3 bg-transparent border-none text-sm text-text-primary focus:outline-none" defaultValue={skill} />
              <input type="range" className="flex-1 accent-accent" defaultValue={90 - (i * 5)} min="10" max="100" />
              <span className="text-xs text-text-secondary w-8">{90 - (i * 5)}%</span>
              <button type="button" className="text-text-secondary hover:text-red-400 p-1 transition-colors"><Trash2 size={16} /></button>
            </div>
          ))}
          <button type="button" className="flex items-center gap-2 text-sm text-accent hover:text-yellow-400 font-bold mt-4 p-2 transition-colors">
            <Plus size={16} /> ADD SKILL
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function WorksTab() {
  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setToast('New project published to Portfolio.');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      {toast && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-md flex items-center gap-3 text-green-400 text-sm">
          <Check size={16} /> {toast}
        </div>
      )}
      
      <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-bold text-text-primary">Create New Project</h2>
          <button onClick={handleSave} className="bg-accent text-bg-primary px-6 py-2 rounded-md font-bold text-sm tracking-widest hover:bg-yellow-500 transition-colors shadow-lg">PUBLISH</button>
        </div>

        <form onSubmit={handleSave}>
          <FormGroup label="Project Title">
            <Input type="text" placeholder="e.g. Modern E-Commerce Platform" />
          </FormGroup>
          
          <FormGroup label="Category / Filter">
             <select className="w-full bg-bg-primary border border-white/10 rounded-md px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none">
                <option>Web Templates</option>
                <option>UI Elements</option>
                <option>Logos</option>
                <option>Drawings</option>
             </select>
          </FormGroup>

          <FormGroup label="Description & Tech Stack">
            <Textarea placeholder="Describe the project, challenges, and technologies used..." />
          </FormGroup>

          <FormGroup label="Project Gallery Image">
            <div className="w-full h-40 border-2 border-dashed border-white/10 hover:border-accent hover:bg-accent/5 transition-all rounded-xl flex flex-col items-center justify-center cursor-pointer group">
               <Upload size={32} className="text-text-secondary group-hover:text-accent mb-3 transition-colors" />
               <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors font-medium">Click to browse or drag image here</p>
               <p className="text-xs text-text-secondary/60 mt-1">Recommended size: 800x600px (WebP/JPEG)</p>
            </div>
          </FormGroup>
          
          <FormGroup label="External Link (Optional)">
            <Input type="url" placeholder="https://github.com/your-username/repo" />
          </FormGroup>
        </form>
      </div>
    </motion.div>
  );
}

function BlogsTab() {
   const [toast, setToast] = useState('');

   const handleSave = (e) => {
     e.preventDefault();
     setToast('Blog article dispatched to publication queue.');
     setTimeout(() => setToast(''), 3000);
   };
 
   return (
     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
       {toast && (
         <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-md flex items-center gap-3 text-green-400 text-sm">
           <Check size={16} /> {toast}
         </div>
       )}
       
       <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
         <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
           <div>
             <h2 className="text-2xl font-bold text-text-primary">Write Article</h2>
             <p className="text-xs text-text-secondary mt-1">Markdown is natively supported in the editor.</p>
           </div>
           <button onClick={handleSave} className="bg-accent text-bg-primary px-6 py-2 rounded-md font-bold text-sm tracking-widest hover:bg-yellow-500 transition-colors shadow-lg">POST</button>
         </div>
 
         <form onSubmit={handleSave}>
           <FormGroup label="Article Title">
             <Input type="text" placeholder="e.g. 10 Tips for Scaling React Architectures" className="w-full bg-bg-primary border border-white/10 rounded-md px-4 py-3 text-lg font-bold text-text-primary focus:outline-none focus:border-accent transition-colors" />
           </FormGroup>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
             <FormGroup label="Tags (Comma separated)">
                <Input type="text" placeholder="React, Performance, WebDev" />
             </FormGroup>
             <FormGroup label="Short Excerpt">
                <Input type="text" placeholder="A brief summary for the blog card container..." />
             </FormGroup>
           </div>
 
           <FormGroup label="Cover Image">
             <div className="w-full h-32 border-2 border-dashed border-white/10 hover:border-accent hover:bg-accent/5 transition-all rounded-xl flex flex-col items-center justify-center cursor-pointer group">
                <Upload size={24} className="text-text-secondary group-hover:text-accent mb-2 transition-colors" />
                <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors font-medium">Upload Cover Art</p>
             </div>
           </FormGroup>

           <FormGroup label="Markdown Content">
             {/* Rich text simulator placeholder */}
             <div className="border border-white/10 rounded-md overflow-hidden bg-bg-primary">
                <div className="flex items-center gap-2 p-2 px-4 border-b border-white/10 bg-bg-card/50">
                   <button type="button" className="text-text-secondary hover:text-text-primary font-bold px-2 py-1">B</button>
                   <button type="button" className="text-text-secondary hover:text-text-primary italic px-2 py-1">I</button>
                   <button type="button" className="text-text-secondary hover:text-text-primary underline px-2 py-1">U</button>
                   <div className="w-px h-4 bg-white/10 mx-2"></div>
                   <button type="button" className="text-text-secondary hover:text-text-primary px-2 py-1 text-sm bg-white/5 rounded">H2</button>
                   <button type="button" className="text-text-secondary hover:text-text-primary px-2 py-1 text-sm bg-white/5 rounded">Code</button>
                </div>
                <Textarea 
                   placeholder="# Start writing your masterpiece here..." 
                   className="w-full bg-transparent border-none rounded-none px-4 py-4 text-sm text-text-primary focus:outline-none focus:ring-0 min-h-[300px] font-mono leading-relaxed" 
                />
             </div>
           </FormGroup>
         </form>
       </div>
     </motion.div>
   );
 }

function InboxTab() {
  const messages = [
    { id: 1, name: 'Alice Walker', email: 'alice@example.com', date: 'Oct 24, 2026', subject: 'Freelance Project Inquiry', message: 'Hi Vikash! I loved your portfolio. Are you available for a 3-month contract building a React dashboard?' },
    { id: 2, name: 'Bob Smith', email: 'bob.smith@techcorp.com', date: 'Oct 23, 2026', subject: 'Full-time Frontend Role', message: 'Hello! I am a recruiter at TechCorp. We are looking for a Senior Frontend Developer and your profile stood out. Let me know if you are open to chat.' },
    { id: 3, name: 'Charlie Davis', email: 'charlie.design@studio.co', date: 'Oct 20, 2026', subject: 'Collaboration on UI Kit', message: 'Hey man, amazing animations on your site! Would you be interested in collaborating on an open-source UI frontend kit for Framer Motion?' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      {/* Container */}
      <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Inbox Messages</h2>
            <p className="text-xs text-text-secondary mt-1">Review contact form submissions.</p>
          </div>
          <div className="bg-accent text-bg-primary px-4 py-2 rounded-md font-bold text-sm shadow-inner uppercase tracking-widest hidden md:block">
            {messages.length} Unread
          </div>
        </div>

        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-bg-primary/50 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors group relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold">
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} className="text-xs text-text-secondary hover:text-accent transition-colors">{msg.email}</a>
                  </div>
                </div>
                <div className="text-xs text-text-secondary whitespace-nowrap bg-white/5 px-2 py-1 rounded">
                  {msg.date}
                </div>
              </div>
              
              <h5 className="text-sm font-bold text-text-primary/90 mb-2">{msg.subject}</h5>
              <p className="text-sm text-text-secondary/80 leading-relaxed border-l-2 border-white/10 pl-3">
                {msg.message}
              </p>
              
              <div className="hidden md:flex absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                <button type="button" className="p-2 bg-bg-card border border-white/10 rounded-md text-text-secondary hover:text-red-400 hover:border-red-400/30 transition-colors shadow-lg" title="Delete Message">
                  <Trash2 size={14} />
                </button>
                <button type="button" className="p-2 bg-bg-card border border-white/10 rounded-md text-text-secondary hover:text-accent hover:border-accent/30 transition-colors shadow-lg" title="Reply">
                  <MessageSquare size={14} />
                </button>
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-xl">
              <Mail size={32} className="text-text-secondary opacity-50 mx-auto mb-3" />
              <p className="text-text-secondary text-sm">Your inbox is empty.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
