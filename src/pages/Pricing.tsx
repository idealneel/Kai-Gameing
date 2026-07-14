import { Link } from 'react-router-dom';
import { Clock, Zap, Gamepad2, ArrowRight } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';

const offers = [
  {
    title: 'Quick Play Deal',
    desc: '2 Hour Booking / Half Hour Free',
    valid: 'After 2 PM, everyday till 31st December',
    back: 'Valid on all Quick Play games. Cannot be combined with other offers. Walk-in or pre-book.',
  },
  {
    title: 'Story Mode Deal',
    desc: '3 Hour Booking / 1 Hour Free',
    valid: 'After 2 PM, everyday till 31st December',
    back: 'Valid on Story Mode tier games only. Advance booking recommended. Subject to availability.',
  },
];

function PriceCard({ icon: Icon, name, time, price, unit, description, games, highlight }: {
  icon: React.ElementType; name: string; time: string; price: string; unit: string;
  description: string; games: string; highlight: boolean;
}) {
  const tilt = useTilt(6);
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`card-neo p-6 flex flex-col ${
        highlight ? 'border-kai-red bg-kai-red/10' : ''
      } transition-shadow duration-200 hover:shadow-neo-sm ${highlight ? 'game-card-float' : ''}`}
      style={{ transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out' }}
    >
      {highlight && (
        <div className="bg-kai-red text-kai-ink text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4 inline-block border-3 border-kai-ink shadow-neo-sm -rotate-2">
          Best Value
        </div>
      )}
      <div className="w-10 h-10 bg-kai-surface flex items-center justify-center border-3 border-kai-ink mb-4">
        <Icon size={20} className="text-kai-red" />
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-kai-muted text-xs mb-4">{time}</p>
      <div className="mb-4">
        <span className="text-4xl font-black text-kai-red">{price}</span>
        <span className="text-kai-muted text-sm ml-1">{unit}</span>
      </div>
      <p className="text-kai-muted text-sm leading-relaxed mb-4 flex-1">{description}</p>
      <div className="border-t-3 border-kai-ink pt-4 mt-auto">
        <p className="text-xs font-bold uppercase tracking-wide text-kai-red mb-2">Games:</p>
        <p className="text-kai-muted text-xs leading-relaxed">{games}</p>
      </div>
    </div>
  );
}

export default function Pricing() {
  const s = useSettings();
  const [heroRef, heroInView] = useInView(0.1);
  const [cardsRef, cardsInView] = useInView(0.1);
  const [offersRef, offersInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.1);

  const pricingTiers = [
    { icon: Zap, name: 'Super Hours', time: '10AM – 2PM', price: s.pricing.superHours, unit: '/hr per person', description: 'Best value! Any game, any station during off-peak hours.', games: 'All Games', highlight: true },
    { icon: Gamepad2, name: 'Quick Play', time: 'Any Time', price: s.pricing.quickPlay, unit: '/hr per person', description: 'Competitive and fighting games. Jump in and play.', games: 'WWE 2K25, FC25, Tekken 8, Mortal Kombat, Cricket 24, Asphalt Racing', highlight: false },
    { icon: Clock, name: 'Story Mode', time: 'Any Time', price: s.pricing.storyMode, unit: '/hr per person', description: 'Immersive single-player adventures. Take your time.', games: 'Spider-Man 2, The Last of Us, God of War Ragnarok, Ghost of Tsushima, A Way Out, It Takes Two', highlight: false },
  ];

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="py-20 bg-kai-dark">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal ${heroInView ? 'visible' : ''}`}>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[0.95]">
            SIMPLE <span className="text-kai-red">PRICING</span>
          </h1>
          <p className="text-kai-muted text-lg max-w-xl mx-auto">
            No hidden fees. Pick your tier, pick your game, and start playing.
          </p>
        </div>
      </section>

      {/* Pricing Cards — 3A: Tilt + Float + 1E: Stagger */}
      <section ref={cardsRef} className="py-12 bg-kai-deeper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto stagger-children ${cardsInView ? 'visible' : ''}`}>
            {pricingTiers.map((tier, i) => (
              <PriceCard key={i} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* Offers — 3B: Flip Cards + 1E: Stagger */}
      <section ref={offersRef} className="py-16 bg-kai-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-black tracking-tight mb-8 text-center reveal ${offersInView ? 'visible' : ''}`}>
            SPECIAL <span className="text-kai-red">OFFERS</span>
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto stagger-children ${offersInView ? 'visible' : ''}`}>
            {offers.map((offer, i) => (
              <div key={i} className="card-neo p-6 border-kai-red relative overflow-hidden group cursor-pointer min-h-[12rem]">
                {/* Front content */}
                <div className="transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
                  <p className="text-kai-text font-bold text-xl mb-2">{offer.desc}</p>
                  <p className="text-kai-muted text-sm">{offer.valid}</p>
                </div>
                {/* Terms overlay — fades in on hover */}
                <div className="absolute inset-0 p-6 bg-kai-deeper border-3 border-kai-red flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-bold mb-3 text-kai-red">Terms & Conditions</h3>
                  <p className="text-kai-muted text-sm leading-relaxed">{offer.back}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-16 bg-kai-deeper border-t-3 border-kai-ink">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal ${ctaInView ? 'visible' : ''}`}>
          <h2 className="text-3xl font-black tracking-tight mb-4">
            READY TO <span className="text-kai-red">PLAY</span>?
          </h2>
          <p className="text-kai-muted mb-8">Contact us to get started.</p>
          <Link
            to="/contact"
            className="btn-neo bg-kai-red text-kai-ink inline-flex items-center gap-2"
          >
            Contact Us
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
