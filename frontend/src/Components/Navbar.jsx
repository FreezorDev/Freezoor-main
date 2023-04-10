import React from 'react';
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2z"
                />
              </svg>
            </button>
          </div>
          <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div
              className={`${
                isMenuOpen ? 'fixed' : 'hidden'
              } md:hidden bg-white h-full w-64 top-0 right-0 z-50 pt-16 px-6 transform transition-transform duration-300 ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <a href="#" className="block py-2">Home</a>
              <a href="#" className="block py-2">About</a>
              <a href="#" className="block py-2">Pricing</a>
              <a href="#" className="block py-2">About Us</a>
            </div>
            <div className="hidden md:flex flex-col md:flex-row md:mx-6 text-gray-700">
              <a href="#" className="my-1 md:my-0 md:mx-4">Home</a>
              <a href="#" className="my-1 md:my-0 md:mx-4">About</a>
              <a href="#" className="my-1 md:my-0 md:mx-4">Pricing</a>
              <a href="#" className="my-1 md:my-0 md:mx-4">About Us</a>
            </div>
            <div className="md:flex md:items-center">
              <button className="primaryBg text-white px-4 py-2 rounded primaryBg hoverBg my-1 md:my-0 md:ml-4">
                Create an Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
