import { Gamepad2, Users, Coffee, Wifi } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useState, useRef } from 'react';

const games = [
  { name: 'WWE 2K25', img: '/assets/games/wwe-2k25.png' },
  { name: 'Spider-Man 2', img: '/assets/games/spider-man-2.png' },
  { name: 'God of War Ragnarok', img: '/assets/games/god-of-war-ragnarok.png' },
  { name: 'FC25', img: '/assets/games/fc25.png' },
  { name: 'Tekken 8', img: '/assets/games/tekken-8.png' },
  { name: 'Mortal Kombat', img: '/assets/games/mortal-kombat.png' },
  { name: 'GTA 5', img: '/assets/games/gta-5.png' },
  { name: 'Ghost of Tsushima', img: '/assets/games/ghost-of-tsushima.png' },
  { name: 'The Last of Us', img: '/assets/games/the-last-of-us.png' },
  { name: 'Cricket 24', img: '/assets/games/cricket-24.png' },
  { name: 'Asphalt Racing', img: '/assets/games/asphalt-racing.png' },
  { name: 'A Way Out', img: '/assets/games/a-way-out.png' },
  { name: 'It Takes Two', img: '/assets/games/it-takes-two.png' },
  { name: 'Uncharted 4', img: '/assets/games/uncharted.png' },
  { name: 'Watch Dogs', img: '/assets/games/watch-dogs.png' },
  { name: 'Horizon Forbidden West', img: '/assets/games/horizon-forbidden-west.png' },
];

export default function About() {
  const [heroRef, heroInView] = useInView(0.1);
  const [photoRef, photoInView] = useInView(0.1);
  const [offerRef, offerInView] = useInView(0.1);
  const [gamesRef, gamesInView] = useInView(0.1);

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="py-20 bg-kai-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-3xl reveal ${heroInView ? 'visible' : ''}`}>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[0.95]">
              WHERE GAMERS<br /><span className="text-kai-red">COME ALIVE</span>
            </h1>
            <p className="text-kai-muted text-lg leading-relaxed">
              KaiGaming is a premium PS5 gaming cafe in the heart of Ambernath. We built this space for gamers, by gamers — a place where you can escape into your favorite worlds with top-tier setups and an atmosphere that hits different.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Grid — 3 photos only */}
      <section ref={photoRef} className="py-12 bg-kai-deeper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children ${photoInView ? 'visible' : ''}`}>
            {[
              { img: '/assets/games/spider-man-2.png', label: 'Spider-Man 2' },
              { img: '/assets/games/fc25.png', label: 'FC 25' },
              { img: '/assets/games/ghost-of-tsushima.png', label: 'Ghost of Tsushima' },
            ].map((photo, i) => (
              <div key={i} className="card-neo overflow-hidden aspect-video group cursor-pointer">
                <img src={photo.img} alt={photo.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 img-shadow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section ref={offerRef} className="py-20 bg-kai-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-12 text-center reveal ${offerInView ? 'visible' : ''}`}>
            WHAT WE <span className="text-kai-red">OFFER</span>
          </h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${offerInView ? 'visible' : ''}`}>
            {[
              { icon: Gamepad2, title: 'PS5 Gaming', desc: '3 premium PlayStation 5 setups with DualSense controllers and top titles.' },
              { icon: Coffee, title: 'Snacks & Drinks', desc: 'Fuel your gaming sessions with our range of snacks and beverages.' },
              { icon: Users, title: 'Group Bookings', desc: 'Book multiple stations for parties, events, or gaming nights with friends.' },
              { icon: Wifi, title: 'Perfect Vibe', desc: 'LED mood lighting, cloud ceiling, and a setup designed for immersion.' },
            ].map((item, i) => (
              <div key={i} className="card-neo p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all duration-100 group">
                <div className="w-12 h-12 bg-kai-red flex items-center justify-center border-3 border-kai-ink shadow-neo-sm mb-4 group-hover:rotate-6 transition-transform duration-200">
                  <item.icon size={24} className="text-kai-ink" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-kai-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Available — horizontal image rows with cursor-follow tooltip */}
      <section ref={gamesRef} className="py-20 bg-kai-deeper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-12 text-center reveal ${gamesInView ? 'visible' : ''}`}>
            GAMES <span className="text-kai-red">AVAILABLE</span>
          </h2>
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 stagger-children ${gamesInView ? 'visible' : ''}`}>
            {games.map((game, i) => (
              <GameCard key={i} game={game} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GameCard({ game }: { game: { name: string; img: string } }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className="relative cursor-pointer aspect-square border-3 border-kai-ink max-w-[250px] max-h-[250px] mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="overflow-hidden w-full h-full">
        <img src={game.img} alt={game.name} className="w-full h-full object-cover img-shadow" />
      </div>
      {hovered && (
        <div
          className="fixed pointer-events-none bg-kai-red text-kai-ink px-4 py-2 font-bold text-sm border-3 border-kai-ink shadow-neo-sm z-[9999] whitespace-nowrap"
          style={{ left: pos.x + 16, top: pos.y + 16 }}
        >
          {game.name}
        </div>
      )}
    </div>
  );
}
