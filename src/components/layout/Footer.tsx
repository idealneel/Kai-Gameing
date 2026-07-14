import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { Instagram } from '../ui/Instagram';
import { useSettings } from '../../hooks/useSettings';
import { useInView } from '../../hooks/useInView';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
];

function getPhoneDigits(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export default function Footer() {
  const s = useSettings();
  const phoneDigits = getPhoneDigits(s.whatsapp);
  const [ref, inView] = useInView(0.1);

  return (
    <footer ref={ref} className="bg-kai-deeper border-t-3 border-kai-ink">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 reveal ${inView ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/assets/kaifavi.png" alt="KaiGaming" className="h-12 w-12 object-cover object-top" style={{ clipPath: 'inset(0 0 25% 0)', mixBlendMode: 'lighten' }} />
              <span className="text-xl font-black tracking-tight text-kai-text">
                KAI<span className="text-kai-red">GAMING</span>
              </span>
            </div>
            <p className="text-kai-muted text-sm leading-relaxed">
              Play Has No Limits. Premium PS5 gaming experience in Ambernath.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-kai-red mb-4">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-kai-muted hover:text-kai-text text-sm font-medium transition-colors inline-block py-1.5 min-h-[36px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-kai-red mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-kai-muted">
                <MapPin size={16} className="text-kai-red mt-0.5 shrink-0" />
                <span>{s.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-kai-muted">
                <Phone size={16} className="text-kai-red shrink-0" />
                <a href={`tel:${phoneDigits}`} className="hover:text-kai-text transition-colors">
                  {s.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-kai-muted">
                <MessageCircle size={16} className="text-kai-red shrink-0" />
                <a
                  href={`https://wa.me/${phoneDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-kai-text transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-kai-muted">
                <Instagram size={16} className="text-kai-red shrink-0" />
                <a
                  href={`https://instagram.com/${s.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-kai-text transition-colors"
                >
                  {s.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t-3 border-kai-ink flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-kai-muted text-xs">
              © {new Date().getFullYear()} KaiGaming. All rights reserved.
            </p>
            <Link to="/privacy" className="text-kai-muted text-xs hover:text-kai-red transition-colors">
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`https://instagram.com/${s.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-kai-muted hover:text-kai-red transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href={`https://wa.me/${phoneDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-kai-muted hover:text-kai-red transition-colors"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
