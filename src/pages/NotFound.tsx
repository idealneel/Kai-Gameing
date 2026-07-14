import { Link } from 'react-router-dom';
import { Home, Gamepad2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-kai-dark">
      <div className="text-center px-4">
        <div className="text-8xl sm:text-9xl font-black text-kai-red mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-black mb-4">PAGE NOT FOUND</h1>
        <p className="text-kai-muted text-lg mb-8 max-w-md mx-auto">
          Looks like this level doesn't exist. Let's get you back to the game.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-neo bg-kai-red text-kai-ink flex items-center gap-2">
            <Home size={20} /> Go Home
          </Link>
          <Link to="/booking" className="btn-neo bg-kai-surface text-kai-text flex items-center gap-2">
            <Gamepad2 size={20} /> Book a Station
          </Link>
        </div>
      </div>
    </div>
  );
}
