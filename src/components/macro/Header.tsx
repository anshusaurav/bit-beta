import React, { useState } from 'react';


// interface HeaderProps {}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
      <a href="/" className="flex items-center">
        <img
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Logo"
          className="w-[184px] h-[54px]"
        />
      </a>
      <nav className={`nav ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="md:flex md:space-x-4">
          <li>
            <a href="#about" className="hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#why-us" className="hover:text-gray-300">
              Why Us
            </a>
          </li>
          <li>
            <a href="#client" className="hover:text-gray-300">
              Client
            </a>
          </li>
          <li>
            <a href="#feature" className="hover:text-gray-300">
              Feature
            </a>
          </li>
          <li>
            <a href="#podcast" className="hover:text-gray-300">
              Podcast
            </a>
          </li>
        </ul>
      </nav>
      <div className="hamburger md:hidden cursor-pointer" onClick={toggleMenu}>
        <svg
          className={`w-6 h-6 transition-transform ${
            isMenuOpen ? 'rotate-90' : ''
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>
    </header>
  );
};

export default Header;