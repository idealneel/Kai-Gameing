import { MapPin, Phone, MessageCircle, Mail, Clock } from 'lucide-react';
import { Instagram } from '../components/ui/Instagram';
import { useSettings } from '../hooks/useSettings';
import { useInView } from '../hooks/useInView';
import { useRef } from 'react';

function getPhoneDigits(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

function ContactCard({ icon: Icon, children, delay = 0 }: {
  icon: React.ElementType; children: React.ReactNode; delay?: number;
}) {
  return (
    <div
      className="card-neo p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all duration-100"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-kai-red flex items-center justify-center border-3 border-kai-ink shadow-neo-sm shrink-0">
          <Icon size={20} className="text-kai-ink" />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

function MagneticButton({ href, target, children, className }: {
  href: string; target?: string; children: React.ReactNode; className?: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (btn) btn.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={btnRef}
      href={href}
      target={target}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: 'transform 0.2s ease-out' }}
    >
      {children}
    </a>
  );
}

export default function Contact() {
  const s = useSettings();
  const phoneDigits = getPhoneDigits(s.whatsapp);
  const igHandle = s.instagram.replace('@', '');

  const [heroRef, heroInView] = useInView(0.1);
  const [cardsRef, cardsInView] = useInView(0.1);
  const [actionsRef, actionsInView] = useInView(0.1);

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="py-20 bg-kai-dark">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal ${heroInView ? 'visible' : ''}`}>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[0.95]">
            GET IN <span className="text-kai-red">TOUCH</span>
          </h1>
          <p className="text-kai-muted text-lg max-w-xl mx-auto">
            Have questions? Want to book a group session? Hit us up.
          </p>
        </div>
      </section>

      {/* Contact Info + Map — 5A: Slide-in Cards */}
      <section ref={cardsRef} className="py-16 bg-kai-deeper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`space-y-4 stagger-children ${cardsInView ? 'visible' : ''}`}>
              <ContactCard icon={MapPin} delay={0}>
                <h3 className="font-bold mb-1">Address</h3>
                <p className="text-kai-muted text-sm leading-relaxed">{s.address}</p>
              </ContactCard>

              <ContactCard icon={Phone} delay={80}>
                <h3 className="font-bold mb-1">Phone / WhatsApp</h3>
                <a href={`tel:${phoneDigits}`} className="text-kai-red font-bold text-lg hover:underline block">{s.phone}</a>
                <a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noopener noreferrer" className="text-kai-muted text-sm hover:text-kai-text flex items-center gap-1 mt-1">
                  <MessageCircle size={14} /> Chat on WhatsApp
                </a>
              </ContactCard>

              <ContactCard icon={Mail} delay={160}>
                <h3 className="font-bold mb-1">Email</h3>
                <a href={`mailto:${s.email}`} className="text-kai-muted text-sm hover:text-kai-text">{s.email}</a>
              </ContactCard>

              <ContactCard icon={Instagram} delay={240}>
                <h3 className="font-bold mb-1">Instagram</h3>
                <a href={`https://instagram.com/${igHandle}`} target="_blank" rel="noopener noreferrer" className="text-kai-red font-bold hover:underline">{s.instagram}</a>
              </ContactCard>

              <ContactCard icon={Clock} delay={320}>
                <h3 className="font-bold mb-1">Hours</h3>
                <p className="text-kai-muted text-sm">{s.workingHours}</p>
              </ContactCard>
            </div>

            {/* Google Map */}
            <div className="card-neo overflow-hidden h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps?q=KaiGaming+Ambernath+Maharashtra+421506&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions — 5C: Magnetic Buttons */}
      <section ref={actionsRef} className="py-16 bg-kai-dark border-t-3 border-kai-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-2xl font-black tracking-tight mb-8 reveal ${actionsInView ? 'visible' : ''}`}>
            QUICK <span className="text-kai-red">ACTIONS</span>
          </h2>
          <div className={`flex flex-wrap justify-center gap-4 stagger-children ${actionsInView ? 'visible' : ''}`}>
            <MagneticButton
              href={`https://wa.me/${phoneDigits}?text=Hi! I'd like to book a PS5 station at KaiGaming.`}
              className="btn-neo bg-kai-red text-kai-ink flex items-center gap-2"
            >
              <MessageCircle size={16} /> Book via WhatsApp
            </MagneticButton>
            <MagneticButton
              href={`tel:${phoneDigits}`}
              className="btn-neo bg-kai-surface text-kai-text flex items-center gap-2"
            >
              <Phone size={16} /> Call Now
            </MagneticButton>
            <MagneticButton
              href={`https://instagram.com/${igHandle}`}
              className="btn-neo bg-kai-surface text-kai-text flex items-center gap-2"
            >
              <Instagram size={16} /> Follow on Instagram
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
