export default function Footer() {
  const logos = [
    { id: 1, name: 'Partner 1', image: '/images/brand-1.webp' },
    { id: 2, name: 'Partner 2', image: '/images/brand-1.webp' },
    { id: 3, name: 'Partner 3', image: '/images/brand-1.webp' },
    { id: 4, name: 'Partner 4', image: '/images/brand-1.webp' }
  ];

  return (
    <>
      {/* Brands Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in-up opacity-60">
        {logos.map(logo => (
          <div key={logo.id} className="flex justify-center items-center h-20 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
            <img src={logo.image} alt={logo.name} className="max-h-12 object-contain" />
          </div>
        ))}
      </div>

      {/* Footer minimal row */}
      <footer className="glass-card py-6 px-8 rounded-lg flex flex-col md:flex-row items-center justify-between text-sm text-text-secondary">
        <p>&copy; 2026 Vikash Maurya.</p>
        <p>Built with React & Tailwind V4</p>
      </footer>
    </>
  );
}
