import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Briefcase, FileText, Upload, Plus, Trash2, Check, ExternalLink, Mail, MessageSquare, Loader2, Save, X, Star, Globe } from 'lucide-react';
import { fetchAPI } from '../utils/api';
import { PersonalInfoSkeleton, AdminRowSkeleton, BlogRowSkeleton } from '../components/Skeleton';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (token === 'admin123') {
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid admin token.');
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken === 'admin123') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative z-0">
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
  const [activeTab, setActiveTab] = useState('personal');
  // Track which tabs have been opened at least once — only mount them when visited
  const [visited, setVisited] = useState(new Set(['personal']));

  const switchTab = (tab) => {
    setActiveTab(tab);
    setVisited(prev => new Set([...prev, tab]));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative z-0">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-bg-card/50 border-r border-white/5 flex flex-col md:min-h-screen">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Lock size={20} className="text-accent" />
            Admin Panel
          </h1>
          <p className="text-xs text-text-secondary mt-1">v2.0 CMS Dashboard</p>
        </div>

        <nav className="flex-1 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto overflow-y-auto max-h-[60vh] md:max-h-none custom-scrollbar">
          <AdminTabButton icon={User} label="Personal" id="personal" active={activeTab} setActive={switchTab} />
          <AdminTabButton icon={Briefcase} label="Projects" id="works" active={activeTab} setActive={switchTab} />
          <AdminTabButton icon={FileText} label="Blogs" id="blogs" active={activeTab} setActive={switchTab} />
          <AdminTabButton icon={Check} label="Certificates" id="certificates" active={activeTab} setActive={switchTab} />
          <AdminTabButton icon={Star} label="Reviews" id="testimonials" active={activeTab} setActive={switchTab} />
          <AdminTabButton icon={Plus} label="Timeline" id="timeline" active={activeTab} setActive={switchTab} />
          <AdminTabButton icon={Mail} label="Inbox" id="inbox" active={activeTab} setActive={switchTab} />
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
          {/* Each tab is only rendered after its first visit, then kept alive via CSS */}
          {visited.has('personal') && <div className={activeTab === 'personal' ? 'block' : 'hidden'}><PersonalInfoTab /></div>}
          {visited.has('works') && <div className={activeTab === 'works' ? 'block' : 'hidden'}><WorksTab /></div>}
          {visited.has('blogs') && <div className={activeTab === 'blogs' ? 'block' : 'hidden'}><BlogsTab /></div>}
          {visited.has('certificates') && <div className={activeTab === 'certificates' ? 'block' : 'hidden'}><CertificatesTab /></div>}
          {visited.has('testimonials') && <div className={activeTab === 'testimonials' ? 'block' : 'hidden'}><TestimonialsTab /></div>}
          {visited.has('timeline') && <div className={activeTab === 'timeline' ? 'block' : 'hidden'}><TimelineTab /></div>}
          {visited.has('inbox') && <div className={activeTab === 'inbox' ? 'block' : 'hidden'}><InboxTab /></div>}
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
  const [profile, setProfile] = useState({
    name: '', role1: '', role2: '', residence: '', city: '', age: '', profileImage: '', resumeUrl: '', githubUsername: '', yearsExperience: '', completedProjects: '',
    email: '', phone: '', address: '',
    socials: { linkedin: '', twitter: '', instagram: '', github: '', discord: '', telegram: '' },
    languages: [], skills: [], tools: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('general'); // 'general' or 'skills'

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAPI('/personal');
        const defaults = {
          name: '', role1: '', role2: '', residence: '', city: '', age: '', profileImage: '', resumeUrl: '', githubUsername: '', yearsExperience: '', completedProjects: '',
          email: '', phone: '', address: '',
          socials: { linkedin: '', twitter: '', instagram: '', github: '', discord: '', telegram: '' },
          languages: [], skills: [], tools: []
        };
        setProfile({ ...defaults, ...(data || {}) });
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await fetchAPI('/personal', {
        method: 'PUT',
        body: JSON.stringify(profile)
      });
      setToast('Personal settings saved successfully.');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    setProfile({ ...profile, skills: [...(profile.skills || []), { label: 'New Skill', value: 80 }] });
  };

  const removeSkill = (index) => {
    const newSkills = [...profile.skills];
    newSkills.splice(index, 1);
    setProfile({ ...profile, skills: newSkills });
  };

  const updateSkill = (index, field, val) => {
    const newSkills = [...profile.skills];
    newSkills[index][field] = field === 'value' ? parseInt(val) : val;
    setProfile({ ...profile, skills: newSkills });
  };

  const addLanguage = () => {
    setProfile({ ...profile, languages: [...(profile.languages || []), { label: 'New Language', value: 100 }] });
  };

  const removeLanguage = (index) => {
    const next = [...profile.languages];
    next.splice(index, 1);
    setProfile({ ...profile, languages: next });
  };

  const updateLanguage = (index, field, val) => {
    const next = [...profile.languages];
    next[index][field] = field === 'value' ? parseInt(val) : val;
    setProfile({ ...profile, languages: next });
  };

  const addTool = () => {
    setProfile({ ...profile, tools: [...(profile.tools || []), 'New Tool'] });
  };

  const removeTool = (index) => {
    const next = [...profile.tools];
    next.splice(index, 1);
    setProfile({ ...profile, tools: next });
  };

  const updateTool = (index, val) => {
    const next = [...profile.tools];
    next[index] = val;
    setProfile({ ...profile, tools: next });
  };

  if (loading) return <PersonalInfoSkeleton />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      {toast && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-md flex items-center gap-3 text-green-400 text-sm">
          <Check size={16} /> {toast}
        </div>
      )}

      <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-bold text-text-primary">Personal Panel</h2>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-accent text-bg-primary px-6 py-2 rounded-md font-bold text-sm tracking-widest hover:bg-yellow-500 transition-colors shadow-lg disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            SAVE CHANGES
          </button>
        </div>

        {/* Sub-tabs Navigation */}
        <div className="flex gap-4 mb-8 border-b border-white/5 pb-px">
          <button
            onClick={() => setActiveSubTab('general')}
            className={`pb-4 text-sm font-bold tracking-widest transition-all relative ${activeSubTab === 'general' ? 'text-accent' : 'text-text-secondary hover:text-text-primary'}`}
          >
            GENERAL INFO
            {activeSubTab === 'general' && <motion.div layoutId="subtab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
          <button
            onClick={() => setActiveSubTab('skills')}
            className={`pb-4 text-sm font-bold tracking-widest transition-all relative ${activeSubTab === 'skills' ? 'text-accent' : 'text-text-secondary hover:text-text-primary'}`}
          >
            SKILLS & TOOLS
            {activeSubTab === 'skills' && <motion.div layoutId="subtab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
          <button 
            onClick={() => setActiveSubTab('contact')}
            className={`pb-4 text-sm font-bold tracking-widest transition-all relative ${activeSubTab === 'contact' ? 'text-accent' : 'text-text-secondary hover:text-text-primary'}`}
          >
            CONTACT & SOCIAL
            {activeSubTab === 'contact' && <motion.div layoutId="subtab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
        </div>

        <div className="min-h-[400px]">
          {activeSubTab === 'general' && (
            <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <FormGroup label="Full Name">
                <Input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              </FormGroup>
              <FormGroup label="Role 1">
                <Input type="text" value={profile.role1} onChange={e => setProfile({ ...profile, role1: e.target.value })} />
              </FormGroup>
              <FormGroup label="Role 2">
                <Input type="text" value={profile.role2} onChange={e => setProfile({ ...profile, role2: e.target.value })} />
              </FormGroup>
              <FormGroup label="Residence / Country">
                <Input type="text" value={profile.residence} onChange={e => setProfile({ ...profile, residence: e.target.value })} />
              </FormGroup>
              <FormGroup label="City">
                <Input type="text" value={profile.city} onChange={e => setProfile({ ...profile, city: e.target.value })} />
              </FormGroup>
              <FormGroup label="Age">
                <Input type="number" value={profile.age} onChange={e => setProfile({ ...profile, age: e.target.value })} />
              </FormGroup>
              <FormGroup label="Profile Image URL">
                <div className="flex gap-2">
                  <Input type="text" value={profile.profileImage} onChange={e => setProfile({ ...profile, profileImage: e.target.value })} />
                  <button type="button" className="bg-bg-primary border border-white/10 hover:border-accent hover:text-accent px-4 py-2 rounded-md transition-colors"><Upload size={16} /></button>
                </div>
              </FormGroup>
              <FormGroup label="Resume / CV URL">
                <Input type="text" value={profile.resumeUrl || ''} onChange={e => setProfile({ ...profile, resumeUrl: e.target.value })} placeholder="https://drive.google.com/... or /resume.pdf" />
              </FormGroup>
              <FormGroup label="GitHub Username">
                <Input type="text" value={profile.githubUsername || ''} onChange={e => setProfile({ ...profile, githubUsername: e.target.value })} placeholder="e.g. Itzvikash022" />
              </FormGroup>
              <FormGroup label="Years Experience">
                <Input type="number" step="0.1" value={profile.yearsExperience || ''} onChange={e => setProfile({ ...profile, yearsExperience: e.target.value })} placeholder="e.g. 1.5" />
              </FormGroup>
              <FormGroup label="Completed Projects (Manual)">
                <Input type="number" value={profile.completedProjects || ''} onChange={e => setProfile({ ...profile, completedProjects: e.target.value })} placeholder="e.g. 50" />
              </FormGroup>
            </motion.form>
          )}

          {activeSubTab === 'skills' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <section>
                <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
                  <Briefcase size={18} className="text-accent" /> Skills Matrix
                </h3>
                <p className="text-xs text-text-secondary mb-6 italic">Visual progress bars in main sidebar.</p>
                <div className="space-y-4">
                  {(profile.skills || []).map((skill, i) => (
                    <div key={i} className="flex gap-4 items-center bg-bg-primary/50 p-3 rounded-md border border-white/5 group">
                      <input className="w-1/3 bg-transparent border-none text-sm text-text-primary focus:outline-none" value={skill.label} onChange={e => updateSkill(i, 'label', e.target.value)} />
                      <input type="range" className="flex-1 accent-accent" value={skill.value} onChange={e => updateSkill(i, 'value', e.target.value)} min="10" max="100" />
                      <span className="text-xs text-text-secondary w-8 font-mono">{skill.value}%</span>
                      <button onClick={() => removeSkill(i)} type="button" className="text-text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={addSkill} type="button" className="flex items-center gap-2 text-xs text-accent hover:text-yellow-400 font-bold p-2 transition-colors uppercase tracking-widest"><Plus size={14} /> Add Skill</button>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
                  Languages
                </h3>
                <p className="text-xs text-text-secondary mb-6 italic">Circular progress rings in main sidebar.</p>
                <div className="space-y-4">
                  {(profile.languages || []).map((lang, i) => (
                    <div key={i} className="flex gap-4 items-center bg-bg-primary/50 p-3 rounded-md border border-white/5 group">
                      <input className="w-1/3 bg-transparent border-none text-sm text-text-primary focus:outline-none" value={lang.label} onChange={e => updateLanguage(i, 'label', e.target.value)} />
                      <input type="range" className="flex-1 accent-accent" value={lang.value} onChange={e => updateLanguage(i, 'value', e.target.value)} min="10" max="100" />
                      <span className="text-xs text-text-secondary w-8 font-mono">{lang.value}%</span>
                      <button onClick={() => removeLanguage(i)} type="button" className="text-text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={addLanguage} type="button" className="flex items-center gap-2 text-xs text-accent hover:text-yellow-400 font-bold p-2 transition-colors uppercase tracking-widest"><Plus size={14} /> Add Language</button>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
                  Tools & Tech
                </h3>
                <p className="text-xs text-text-secondary mb-6 italic">Simple tags for tools and dependencies.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(profile.tools || []).map((tool, i) => (
                    <div key={i} className="flex gap-2 items-center bg-bg-primary/50 p-2 rounded-md border border-white/5 group">
                      <input className="flex-1 bg-transparent border-none text-sm text-text-primary focus:outline-none ml-2" value={tool} onChange={e => updateTool(i, e.target.value)} />
                      <button onClick={() => removeTool(i)} type="button" className="text-text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={14} /></button>
                    </div>
                  ))}
                  <button onClick={addTool} type="button" className="flex justify-center items-center gap-2 text-xs text-accent hover:text-yellow-400 font-bold border border-dashed border-accent/30 rounded-md p-3 transition-colors md:col-span-2 uppercase tracking-widest"><Plus size={14} /> Add Tool</button>
                </div>
              </section>
            </motion.div>
          )}

          {activeSubTab === 'contact' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <section>
                <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2 border-b border-white/5 pb-2">
                  <Mail size={18} className="text-accent" /> Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <FormGroup label="Professional Email">
                    <Input type="email" value={profile.email || ''} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="hello@example.com" />
                  </FormGroup>
                  <FormGroup label="Phone Number">
                    <Input type="text" value={profile.phone || ''} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
                  </FormGroup>
                  <FormGroup label="Detailed Address / Location">
                    <Input type="text" value={profile.address || ''} onChange={e => setProfile({ ...profile, address: e.target.value })} placeholder="123 Street, City, Country" />
                  </FormGroup>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2 border-b border-white/5 pb-2">
                  <Globe size={18} className="text-accent" /> Social Presence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <FormGroup label="LinkedIn URL">
                    <Input type="text" value={profile.socials?.linkedin || ''} onChange={e => setProfile({ ...profile, socials: { ...profile.socials, linkedin: e.target.value } })} placeholder="https://linkedin.com/in/..." />
                  </FormGroup>
                  <FormGroup label="GitHub Profile URL">
                    <Input type="text" value={profile.socials?.github || ''} onChange={e => setProfile({ ...profile, socials: { ...profile.socials, github: e.target.value } })} placeholder="https://github.com/..." />
                  </FormGroup>
                  <FormGroup label="Twitter (X) URL">
                    <Input type="text" value={profile.socials?.twitter || ''} onChange={e => setProfile({ ...profile, socials: { ...profile.socials, twitter: e.target.value } })} placeholder="https://twitter.com/..." />
                  </FormGroup>
                  <FormGroup label="Instagram URL">
                    <Input type="text" value={profile.socials?.instagram || ''} onChange={e => setProfile({ ...profile, socials: { ...profile.socials, instagram: e.target.value } })} placeholder="https://instagram.com/..." />
                  </FormGroup>
                  <FormGroup label="Discord Username/Link">
                    <Input type="text" value={profile.socials?.discord || ''} onChange={e => setProfile({ ...profile, socials: { ...profile.socials, discord: e.target.value } })} placeholder="e.g. User#1234" />
                  </FormGroup>
                  <FormGroup label="Telegram Username/Link">
                    <Input type="text" value={profile.socials?.telegram || ''} onChange={e => setProfile({ ...profile, socials: { ...profile.socials, telegram: e.target.value } })} placeholder="e.g. t.me/User" />
                  </FormGroup>
                </div>
              </section>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}



const PROJECT_CATEGORIES = ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'Management', 'Design', 'Other'];

function WorksTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [imageInputs, setImageInputs] = useState(['']);
  const [formData, setFormData] = useState({
    title: '', category: 'Frontend', description: '', date: '', role: '', previewLink: '', githubLink: '',
  });
  const [toast, setToast] = useState('');

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchAPI('/projects');
      setProjects(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const images = imageInputs.filter(url => url.trim() !== '');
    try {
      await fetchAPI('/projects', { method: 'POST', body: JSON.stringify({ ...formData, images }) });
      setToast('Project published successfully.');
      setFormData({ title: '', category: 'Frontend', description: '', date: '', role: '', previewLink: '', githubLink: '' });
      setImageInputs(['']);
      setIsAdding(false);
      loadProjects();
      setTimeout(() => setToast(''), 3000);
    } catch (err) { alert('Failed to publish'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetchAPI(`/projects/${id}`, { method: 'DELETE' });
      loadProjects();
    } catch (err) { alert('Delete failed'); }
  };

  const addImageInput = () => {
    if (imageInputs.length < 5) setImageInputs([...imageInputs, '']);
  };

  const updateImage = (i, val) => {
    const next = [...imageInputs];
    next[i] = val;
    setImageInputs(next);
  };

  const removeImage = (i) => {
    setImageInputs(imageInputs.filter((_, idx) => idx !== i));
  };

  if (loading) return <AdminRowSkeleton count={3} />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      {toast && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-md flex items-center gap-3 text-green-400 text-sm">
          <Check size={16} /> {toast}
        </div>
      )}

      <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl mb-8">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-bold text-text-primary">Project Management</h2>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-accent text-bg-primary px-6 py-2 rounded-md font-bold text-sm tracking-widest hover:bg-yellow-500 transition-colors shadow-lg flex items-center gap-2"
          >
            {isAdding ? <X size={16} /> : <Plus size={16} />}
            {isAdding ? 'CANCEL' : 'ADD NEW'}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handlePublish} className="mb-12 p-6 bg-bg-primary/30 rounded-xl border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-accent mb-2 uppercase tracking-wider">New Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup label="Project Title">
                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="My Awesome Project" required />
              </FormGroup>
              <FormGroup label="Category">
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-bg-primary border border-white/10 rounded-md px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                >
                  {PROJECT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </FormGroup>
              <FormGroup label="Role">
                <Input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="Lead Developer" />
              </FormGroup>
              <FormGroup label="Date">
                <Input value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} placeholder="Jan 2024" />
              </FormGroup>
              <FormGroup label="Live Preview URL">
                <Input value={formData.previewLink} onChange={e => setFormData({ ...formData, previewLink: e.target.value })} placeholder="https://example.com" />
              </FormGroup>
              <FormGroup label="GitHub URL">
                <Input value={formData.githubLink} onChange={e => setFormData({ ...formData, githubLink: e.target.value })} placeholder="https://github.com/..." />
              </FormGroup>
            </div>
            <FormGroup label="Description">
              <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            </FormGroup>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs text-text-secondary uppercase tracking-widest font-bold">Images (max 5)</label>
                {imageInputs.length < 5 && (
                  <button type="button" onClick={addImageInput} className="text-xs text-accent hover:underline flex items-center gap-1">
                    <Plus size={12} /> Add Image
                  </button>
                )}
              </div>
              {imageInputs.map((url, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input value={url} onChange={e => updateImage(i, e.target.value)} placeholder={`Image URL ${i + 1}`} />
                  {imageInputs.length > 1 && (
                    <button type="button" onClick={() => removeImage(i)} className="text-text-secondary hover:text-red-400 flex-shrink-0">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="submit" className="w-full py-4 bg-accent text-bg-primary font-bold rounded-md hover:bg-yellow-500 transition-colors uppercase tracking-widest text-sm shadow-xl">PUBLISH PROJECT</button>
          </form>
        )}

        <div className="space-y-4">
          {projects.map(proj => (
            <div key={proj._id} className="flex items-center justify-between p-4 bg-bg-primary/50 rounded-lg border border-white/5 group">
              <div>
                <h4 className="font-bold text-text-primary text-sm">{proj.title}</h4>
                <p className="text-xs text-text-secondary">{proj.category}</p>
              </div>
              <button onClick={() => handleDelete(proj._id)} className="p-2 text-text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {projects.length === 0 && <p className="text-center text-text-secondary py-10 italic">No projects found.</p>}
        </div>
      </div>
    </motion.div>
  );
}

function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', image: '', tags: '', date: new Date().toLocaleDateString() });
  const [toast, setToast] = useState('');

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = async () => {
    try {
      const data = await fetchAPI('/blogs');
      setBlogs(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()) };
      await fetchAPI('/blogs', { method: 'POST', body: JSON.stringify(payload) });
      setToast('Article published.');
      setFormData({ title: '', excerpt: '', content: '', image: '', tags: '', date: new Date().toLocaleDateString() });
      setIsAdding(false);
      loadBlogs();
      setTimeout(() => setToast(''), 3000);
    } catch (err) { alert('Post failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetchAPI(`/blogs/${id}`, { method: 'DELETE' });
      loadBlogs();
    } catch (err) { alert('Delete failed'); }
  };

  if (loading) return <BlogRowSkeleton count={4} />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      {toast && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-md flex items-center gap-3 text-green-400 text-sm">
          <Check size={16} /> {toast}
        </div>
      )}

      <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-bold text-text-primary">Blog Feed</h2>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-accent text-bg-primary px-6 py-2 rounded-md font-bold text-sm tracking-widest hover:bg-yellow-500 transition-colors shadow-lg flex items-center gap-2"
          >
            {isAdding ? <X size={16} /> : <Plus size={16} />}
            {isAdding ? 'CANCEL' : 'WRITE ARTICLE'}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handlePost} className="mb-12">
            <FormGroup label="Title"><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required /></FormGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup label="Tags"><Input value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} /></FormGroup>
              <FormGroup label="Image URL"><Input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} /></FormGroup>
            </div>
            <FormGroup label="Excerpt"><Input value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} /></FormGroup>
            <FormGroup label="Markdown Content"><Textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} /></FormGroup>
            <button type="submit" className="w-full py-4 bg-accent text-bg-primary font-bold rounded hover:bg-yellow-500 transition-colors uppercase tracking-widest text-sm shadow-xl">POST ARTICLE</button>
          </form>
        )}

        <div className="space-y-4">
          {blogs.map(blog => (
            <div key={blog._id} className="flex items-center justify-between p-4 bg-bg-primary/50 rounded-lg border border-white/5 group">
              <div>
                <h4 className="font-bold text-text-primary text-sm">{blog.title}</h4>
                <p className="text-xs text-text-secondary">{blog.date}</p>
              </div>
              <button onClick={() => handleDelete(blog._id)} className="p-2 text-text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {blogs.length === 0 && <p className="text-center text-text-secondary py-10 italic">No articles published yet.</p>}
        </div>
      </div>
    </motion.div>
  );
}

function CertificatesTab() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', link: '', about: '', icon: '' });

  useEffect(() => { loadCerts(); }, []);

  const loadCerts = async () => {
    try { const data = await fetchAPI('/certificates'); setCerts(data); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetchAPI('/certificates', { method: 'POST', body: JSON.stringify(formData) });
      setFormData({ name: '', link: '', about: '', icon: '' });
      loadCerts();
    } catch (err) { alert('Failed to add certificate'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete certificate?')) return;
    try { await fetchAPI(`/certificates/${id}`, { method: 'DELETE' }); loadCerts(); }
    catch (err) { alert('Delete failed'); }
  };

  if (loading) return <AdminRowSkeleton count={3} />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-text-primary mb-8 border-b border-white/5 pb-4">Manage Certificates</h2>
        <form onSubmit={handleCreate} className="mb-12 p-6 bg-bg-primary/30 rounded-xl border border-white/5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup label="Certification Name"><Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="AWS Certified Developer" required /></FormGroup>
            <FormGroup label="Certificate Link"><Input value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} placeholder="https://verify.credly.com/..." /></FormGroup>
            <FormGroup label="Icon Image URL (optional)"><Input value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} placeholder="https://example.com/badge.png" /></FormGroup>
          </div>
          <FormGroup label="About"><Textarea value={formData.about} onChange={e => setFormData({ ...formData, about: e.target.value })} /></FormGroup>
          <button type="submit" className="w-full py-4 bg-accent text-bg-primary font-bold rounded uppercase tracking-widest text-sm shadow-xl">ADD CERTIFICATE</button>
        </form>
        <div className="space-y-4">
          {certs.map(c => (
            <div key={c._id} className="flex items-center justify-between p-4 bg-bg-primary/50 rounded-lg border border-white/5 group">
              <div className="flex items-center gap-3">
                {c.icon && <img src={c.icon} alt="" className="w-8 h-8 rounded object-contain" />}
                <div>
                  <h4 className="font-bold text-text-primary text-sm">{c.name}</h4>
                  {c.about && <p className="text-xs text-text-secondary line-clamp-1">{c.about}</p>}
                </div>
              </div>
              <button onClick={() => handleDelete(c._id)} className="p-2 text-text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
            </div>
          ))}
          {certs.length === 0 && <p className="text-center text-text-secondary py-10 italic">No certificates added yet.</p>}
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialsTab() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', role: '', text: '', image: '/images/testimonial-1.webp' });

  useEffect(() => { loadReviews(); }, []);

  const loadReviews = async () => {
    try { const data = await fetchAPI('/testimonials'); setReviews(data); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetchAPI('/testimonials', { method: 'POST', body: JSON.stringify(formData) });
      setFormData({ name: '', role: '', text: '', image: '/images/testimonial-1.webp' });
      loadReviews();
    } catch (err) { alert('Failed to add review'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete review?')) return;
    try { await fetchAPI(`/testimonials/${id}`, { method: 'DELETE' }); loadReviews(); }
    catch (err) { alert('Delete failed'); }
  };

  if (loading) return <AdminRowSkeleton count={4} />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-text-primary mb-8 border-b border-white/5 pb-4">Manage Reviews</h2>
        <form onSubmit={handleCreate} className="mb-12 p-6 bg-bg-primary/30 rounded-xl border border-white/5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup label="Author Name"><Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required /></FormGroup>
            <FormGroup label="Role/Company"><Input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required /></FormGroup>
          </div>
          <FormGroup label="Review Text"><Textarea value={formData.text} onChange={e => setFormData({ ...formData, text: e.target.value })} required /></FormGroup>
          <FormGroup label="Avatar Image URL"><Input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} /></FormGroup>
          <button type="submit" className="w-full py-4 bg-accent text-bg-primary font-bold rounded uppercase tracking-widest text-sm shadow-xl">ADD REVIEW</button>
        </form>
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r._id} className="flex items-center justify-between p-4 bg-bg-primary/50 rounded-lg border border-white/5 group">
              <div className="flex items-center gap-4">
                <img src={r.image} className="w-10 h-10 rounded-full object-cover" alt="" />
                <div><h4 className="font-bold text-text-primary text-sm">{r.name}</h4><p className="text-xs text-text-secondary">{r.role}</p></div>
              </div>
              <button onClick={() => handleDelete(r._id)} className="p-2 text-text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineTab() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ type: 'Experience', title: '', subtitle: '', duration: '', description: '' });

  useEffect(() => { loadEntries(); }, []);

  const loadEntries = async () => {
    try { const data = await fetchAPI('/timeline'); setEntries(data); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetchAPI('/timeline', { method: 'POST', body: JSON.stringify(formData) });
      setFormData({ type: 'Experience', title: '', subtitle: '', duration: '', description: '' });
      loadEntries();
    } catch (err) { alert('Failed to add entry'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete entry?')) return;
    try { await fetchAPI(`/timeline/${id}`, { method: 'DELETE' }); loadEntries(); }
    catch (err) { alert('Delete failed'); }
  };

  if (loading) return <AdminRowSkeleton count={4} />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-text-primary mb-8 border-b border-white/5 pb-4">Manage Timeline</h2>
        <form onSubmit={handleCreate} className="mb-12 p-6 bg-bg-primary/30 rounded-xl border border-white/5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup label="Entry Type">
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full bg-bg-primary border border-white/10 rounded-md px-4 py-2 text-sm text-text-primary focus:outline-none">
                <option>Education</option><option>Experience</option>
              </select>
            </FormGroup>
            <FormGroup label="Duration"><Input placeholder="e.g. Jan 2020 - Present" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} /></FormGroup>
            <FormGroup label="Main Title"><Input placeholder="e.g. Apple Inc." value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} /></FormGroup>
            <FormGroup label="Subtitle"><Input placeholder="e.g. Senior Developer" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} /></FormGroup>
          </div>
          <FormGroup label="Description"><Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} /></FormGroup>
          <button type="submit" className="w-full py-4 bg-accent text-bg-primary font-bold rounded uppercase tracking-widest text-sm shadow-xl">ADD ENTRY</button>
        </form>
        <div className="space-y-4">
          {entries.map(e => (
            <div key={e._id} className="p-4 bg-bg-primary/50 rounded-lg border border-white/5 group flex items-center justify-between">
              <div>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${e.type === 'Education' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>{e.type}</span>
                <h4 className="font-bold text-text-primary text-sm mt-1">{e.title} <span className="text-text-secondary font-normal">— {e.subtitle}</span></h4>
                <p className="text-xs text-text-secondary">{e.duration}</p>
              </div>
              <button onClick={() => handleDelete(e._id)} className="p-2 text-text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function InboxTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadMessages(); }, []);

  const loadMessages = async () => {
    try {
      const data = await fetchAPI('/messages');
      setMessages(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete message?')) return;
    try {
      await fetchAPI(`/messages/${id}`, { method: 'DELETE' });
      loadMessages();
    } catch (err) { alert('Delete failed'); }
  };

  if (loading) return <AdminRowSkeleton count={3} />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Inbox Messages</h2>
            <p className="text-xs text-text-secondary mt-1">Review contact form submissions.</p>
          </div>
          <div className="bg-accent text-bg-primary px-4 py-2 rounded-md font-bold text-sm shadow-inner uppercase tracking-widest hidden md:block">
            {messages.length} Total
          </div>
        </div>

        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-bg-primary/50 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors group relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold">
                    {msg.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} className="text-xs text-text-secondary hover:text-accent transition-colors">{msg.email}</a>
                  </div>
                </div>
                <div className="text-xs text-text-secondary whitespace-nowrap bg-white/5 px-2 py-1 rounded">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>

              <h5 className="text-sm font-bold text-text-primary/90 mb-2">{msg.subject || 'No Subject'}</h5>
              <p className="text-sm text-text-secondary/80 leading-relaxed border-l-2 border-white/10 pl-3">
                {msg.message}
              </p>

              <div className="hidden md:flex absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                <button onClick={() => handleDelete(msg._id)} type="button" className="p-2 bg-bg-card border border-white/10 rounded-md text-text-secondary hover:text-red-400 hover:border-red-400/30 transition-colors shadow-lg" title="Delete Message">
                  <Trash2 size={14} />
                </button>
                <a href={`mailto:${msg.email}`} className="p-2 bg-bg-card border border-white/10 rounded-md text-text-secondary hover:text-accent hover:border-accent/30 transition-colors shadow-lg" title="Reply">
                  <MessageSquare size={14} />
                </a>
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
