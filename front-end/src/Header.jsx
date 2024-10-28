
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="h-6 p-4 bg-blue-500 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Cyclable</h1>

      <button
        className="p-2 bg-blue-700 rounded-full"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {menuOpen && (
        <div className="absolute top-16 right-4 w-64 bg-white shadow-lg p-4 z-10">
          <button
            className="absolute top-2 right-2 text-xl"
            onClick={toggleMenu}
          >
            ✕
          </button>
          <nav className="mt-4 space-y-4">
            <ul>
              <li>
                <Link to="/" className="text-blue-500 hover:underline" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-blue-500 hover:underline" onClick={toggleMenu}>
                  Map
                </Link>
              </li>
            <li>
                <Link to="/post" className="text-blue-500 hover:underline" onClick={toggleMenu}>
                  Post
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-blue-500 hover:underline" onClick={toggleMenu}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/saved-routes" className="text-blue-500 hover:underline" onClick={toggleMenu}>
                  Saved Routes
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
