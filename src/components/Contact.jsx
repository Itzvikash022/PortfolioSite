import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, User, MessageSquare, Loader2 } from 'lucide-react';
import { fetchAPI } from '../utils/api';

export default function Contact() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchAPI('/personal');
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile for contact:', err);
      }
    };
    loadProfile();
  }, []);

  const {
    city = 'Surat',
    residence = 'India',
    address = '20 Dellbank Rd',
    email = 'carter.inbox@mail.com',
    phone = '+78 098 333 11 22',
    socials = {}
  } = profile || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await fetchAPI('/messages', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="mb-16">
      <h2 className="text-2xl font-bold mb-8 animate-fade-in-up">Contact Information</h2>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="glass-card p-6 rounded-lg text-center flex flex-col items-center group hover:border-accent/30 transition-colors">
          <div className="w-12 h-12 bg-bg-primary rounded-full flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(250,204,21,0.2)]">
            <MapPin size={20} />
          </div>
          <h3 className="font-bold text-text-primary mb-2">Location</h3>
          <p className="text-text-secondary text-sm">{address || 'Surat, India'}</p>
        </div>

        <div className="glass-card p-6 rounded-lg text-center flex flex-col items-center group hover:border-accent/30 transition-colors">
          <div className="w-12 h-12 bg-bg-primary rounded-full flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(250,204,21,0.2)]">
            <Mail size={20} />
          </div>
          <h3 className="font-bold text-text-primary mb-2">Email & Social</h3>
          <p className="text-text-secondary text-sm line-clamp-1 mb-1">{email}</p>
          <div className="flex gap-3 text-xs text-text-secondary">
             {socials.discord && <span className="opacity-80">Discord: {socials.discord.split('/').pop()}</span>}
             {socials.telegram && <span className="opacity-80">TG: @{socials.telegram.split('/').pop().replace('@', '')}</span>}
             {!socials.discord && !socials.telegram && <span className="opacity-80">Twitter: @itzvikash</span>}
          </div>
        </div>

        <div className="glass-card p-6 rounded-lg text-center flex flex-col items-center group hover:border-accent/30 transition-colors">
          <div className="w-12 h-12 bg-bg-primary rounded-full flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(250,204,21,0.2)]">
            <Phone size={20} />
          </div>
          <h3 className="font-bold text-text-primary mb-2">Phones</h3>
          <p className="text-text-secondary text-sm">Main: {phone}</p>
          <p className="text-text-secondary text-sm">Available Mon-Sat</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Get in touch</h2>

      {/* Contact Form */}
      <div className="glass-card p-8 rounded-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        {submitted ? (
          <div className="bg-accent/10 border border-accent text-accent px-4 py-6 rounded text-center relative font-bold text-lg animate-fade-in-up">
            Thanks! Your message has been sent successfully.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
                <User size={18} />
              </div>
              <input
                type="text"
                required
                placeholder="Name"
                className="w-full bg-bg-primary border border-white/5 rounded pl-12 pr-4 py-4 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full bg-bg-primary border border-white/5 rounded pl-12 pr-4 py-4 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-text-secondary">
                <MessageSquare size={18} />
              </div>
              <textarea
                required
                placeholder="Message"
                rows="5"
                className="w-full bg-bg-primary border border-white/5 rounded pl-12 pr-4 py-4 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors resize-y custom-scrollbar"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="bg-accent text-bg-primary font-bold py-4 px-8 rounded hover:bg-white hover:text-bg-primary transition-all shadow-[0_10px_20px_-10px_rgba(250,204,21,0.5)] hover:shadow-none uppercase tracking-wider text-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  SENDING...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
