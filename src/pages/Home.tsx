import { Link } from 'react-router-dom';
import { Gamepad2, Clock, Star, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';
import { useCounter } from '../hooks/useCounter';
import CircularGallery from '../components/ui/CircularGallery';


function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [ref, inView] = useInView(0.3);
  const count = useCounter(target, 1500, inView);
  return (
    <div ref={ref}>
      <div className="text-3xl font-black text-kai-red mb-2">{count}{suffix}</div>
      <div className="text-kai-muted text-sm font-medium uppercase tracking-wide">{label}</div>
    </div>
  );
}

export default function Home() {
  const [heroRef, heroInView] = useInView(0.1);
  const [stationsRef, stationsInView] = useInView(0.1);
  const [pricingRef, pricingInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.1);

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[90vh] bg-kai-dark overflow-hidden hero-grid">

        {/* Background image */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <img src="/assets/games/spider-man-2.png" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-kai-dark via-kai-dark/95 to-kai-dark/60" />
        </div>

        {/* Circular Gallery — full hero, behind text */}
        <div className="absolute inset-0 gallery-scale" style={{ zIndex: 1 }}>
          <CircularGallery
            items={[
              { image: '/assets/games/spider-man-2.png', text: 'Spider-Man 2' },
              { image: '/assets/games/god-of-war-ragnarok.png', text: 'God of War Ragnarök' },
              { image: '/assets/games/gta-5.png', text: 'GTA 5' },
              { image: '/assets/games/tekken-8.png', text: 'Tekken 8' },
              { image: '/assets/games/wwe-2k25.png', text: 'WWE 2K25' },
              { image: '/assets/games/fc25.png', text: 'FC 25' },
              { image: '/assets/games/mortal-kombat.png', text: 'Mortal Kombat' },
              { image: '/assets/games/the-last-of-us.png', text: 'The Last of Us' },
              { image: '/assets/games/ghost-of-tsushima.png', text: 'Ghost of Tsushima' },
              { image: '/assets/games/horizon-forbidden-west.png', text: 'Horizon Forbidden West' },
              { image: '/assets/games/uncharted.png', text: 'Uncharted' },
              { image: '/assets/games/a-way-out.png', text: 'A Way Out' },
              { image: '/assets/games/it-takes-two.png', text: 'It Takes Two' },
              { image: '/assets/games/watch-dogs.png', text: 'Watch Dogs' },
              { image: '/assets/games/cricket-24.png', text: 'Cricket 24' },
              { image: '/assets/games/asphalt-racing.png', text: 'Asphalt Racing' },
            ]}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
            font="bold 30px Orbitron"
          />
        </div>

        {/* Text content — bottom centre */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 10, textShadow: '0 2px 8px rgba(0,0,0,1), 0 4px 32px rgba(0,0,0,1), 0 8px 64px rgba(0,0,0,0.95)' }}>
          <h1 className={`text-[2rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] leading-[0.95] tracking-tight mb-6 transition-all duration-700 delay-100 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 700 }}>
            PLAY HAS<br />
            <span className="text-kai-red">NO LIMITS</span>
          </h1>
          <p className={`text-kai-text text-base sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ textShadow: '0 2px 8px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,1)' }}>
            Premium PS5 gaming experience. 3 stations, top games, and an atmosphere built for gamers.
          </p>
          <div className={`flex flex-wrap gap-4 justify-center transition-all duration-700 delay-300 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Link to="/booking" className="btn-neo bg-kai-red text-kai-ink flex items-center gap-2" style={{ boxShadow: 'none' }}>
              <Gamepad2 size={20} /> Book a Station <ArrowRight size={16} />
            </Link>
            <Link to="/pricing" className="btn-neo bg-kai-surface text-kai-text">View Pricing</Link>
          </div>
        </div>

        {/* Seamless blur transition into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-kai-deeper" style={{ zIndex: 11, backdropFilter: 'blur(1px)' }} />
      </section>

      {/* Stations */}
      <section ref={stationsRef} className="py-20 bg-kai-deeper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 reveal ${stationsInView ? 'visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">OUR <span className="text-kai-red">STATIONS</span></h2>
            <p className="text-kai-muted max-w-xl mx-auto">3 premium PS5 setups, each with a 55" TV and surround sound. Pick your game, claim your spot.</p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children ${stationsInView ? 'visible' : ''}`}>
            {[
              { img: '/assets/games/wwe-2k25.png', name: 'Station 1', games: 'All Games Available' },
              { img: '/assets/games/god-of-war-ragnarok.png', name: 'Station 2', games: 'All Games Available' },
              { img: '/assets/games/gta-5.png', name: 'Station 3', games: 'All Games Available' },
            ].map((station, i) => (
              <StationCard key={i} {...station} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section ref={pricingRef} className="py-20 bg-kai-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`card-neo p-8 sm:p-12 text-center reveal ${pricingInView ? 'visible' : ''}`}>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">STARTING AT <span className="text-kai-red">₹55/HR</span></h2>
            <p className="text-kai-muted text-lg mb-8 max-w-xl mx-auto">Super Hours from 10AM to 2PM. Any game, any station. Premium gaming without the premium price tag.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/pricing" className="btn-neo bg-kai-surface text-kai-text flex items-center gap-2"><Clock size={16} /> See Full Pricing</Link>
              <Link to="/booking" className="btn-neo bg-kai-red text-kai-ink flex items-center gap-2"><Star size={16} /> Book Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-16 bg-kai-deeper border-t-3 border-b-3 border-kai-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center stagger-children ${statsInView ? 'visible' : ''}`}>
            <StatCounter target={3} suffix="" label="PS5 Stations" />
            <StatCounter target={16} suffix="" label="Games Available" />
            <StatCounter target={55} suffix="" label="Starting Per Hour" />
            <StatCounter target={12} suffix="hrs" label="Open Daily" />
          </div>
        </div>
      </section>
    </div>
  );
}

function StationCard({ img, name, games }: { img: string; name: string; games: string }) {
  const tilt = useTilt(8);
  return (
    <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
      className="card-neo overflow-hidden group transition-shadow duration-200 hover:shadow-neo-sm"
      style={{ transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out' }}>
      <div className="aspect-video overflow-hidden">
        <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 img-shadow" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <p className="text-kai-muted text-sm">{games}</p>
      </div>
    </div>
  );
}
