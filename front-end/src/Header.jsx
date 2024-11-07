import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignJustify, FaCompress } from 'react-icons/fa';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className='fixed top-0 z-10 flex h-6 w-full items-center justify-between bg-emerald-800 px-4 text-white'>
      <h1 className='text-lg font-extrabold'>
        <Link to='/'>Cyclable</Link>
      </h1>

      <FaAlignJustify
        className='cursor-pointer text-white hover:text-gray-300'
        onClick={toggleMenu}
        size={24}
      />

      {menuOpen && (
        <div className='absolute right-4 top-16 z-10 w-64 rounded-lg bg-gray-100 p-4 shadow-lg'>
          <FaCompress
            className='absolute right-2 top-2 cursor-pointer text-emerald-800 hover:text-gray-600'
            onClick={toggleMenu}
            size={20}
          />
          <nav className='mt-4'>
            <ul className='flex flex-col items-end space-y-4'>
              <li>
                <Link
                  to='/'
                  className='font-semibold text-emerald-800 hover:underline'
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/map'
                  className='font-semibold text-emerald-800 hover:underline'
                  onClick={toggleMenu}
                >
                  Map
                </Link>
              </li>
              <li>
                <Link
                  to='/post'
                  className='font-semibold text-emerald-800 hover:underline'
                  onClick={toggleMenu}
                >
                  Post
                </Link>
              </li>
              <li>
                <Link
                  to='/profile'
                  className='font-semibold text-emerald-800 hover:underline'
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to='/saved-routes'
                  className='font-semibold text-emerald-800 hover:underline'
                  onClick={toggleMenu}
                >
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
