import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/booking', label: 'Book Now' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    clickCountRef.current += 1;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      e.preventDefault();
      navigate('/admin');
    } else {
      timeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 500);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-kai-deeper border-b-3 border-kai-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — 6B: Hover Animation */}
          <Link to="/" className="flex items-center gap-2 group" onClick={handleLogoClick}>
            <img
              src="/assets/kaifavi.png"
              alt="KaiGaming"
              className="h-12 w-12 object-cover object-top group-hover:rotate-6 transition-transform duration-200"
              style={{ clipPath: 'inset(0 0 25% 0)', mixBlendMode: 'lighten' }}
            />
            <span className="text-xl font-black tracking-tight text-kai-text">
              KAI<span className="text-kai-red group-hover:text-shadow-lg transition-all duration-200">GAMING</span>
            </span>
          </Link>

          {/* Desktop Nav — 6A: Underline Animation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                  location.pathname === link.to
                    ? 'text-kai-red active'
                    : 'text-kai-muted hover:text-kai-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-kai-muted hover:text-kai-text"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — 6C: Slide Animation */}
      {isOpen && (
        <div className="md:hidden bg-kai-deeper border-t-3 border-kai-ink">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-4 text-sm font-bold uppercase tracking-wide border-3 border-kai-ink transition-all duration-200 min-h-[44px] ${
                  location.pathname === link.to
                    ? 'bg-kai-red text-kai-ink'
                    : 'bg-kai-surface text-kai-text hover:bg-kai-dark'
                }`}
                style={{
                  animation: `step-slide-in 0.3s ease-out ${i * 60}ms both`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
