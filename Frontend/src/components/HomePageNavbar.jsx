import { useState } from 'react';
import TrueFocus from "../UI/Components/TrueFocus.jsx";
import StarBorder from "../UI/Components/Border.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="Navbar h-[50px] flex w-full justify-between items-center px-4 md:px-6 lg:px-8">
      {/* Left - Logo */}
      <div className="left w-auto flex-shrink-0">
        <TrueFocus 
          sentence="Ai Arena"
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>
      
      {/* Middle - Navigation (Desktop) */}
      <div className="middle hidden md:flex items-center justify-center flex-1 max-w-md mx-4">
        <StarBorder
          as="button"
          className="custom-class"
          color="cyan"
          speed="5s"
        >
          <div className="h-full flex flex-row w-full min-w-[200px] lg:w-[250px] justify-between items-center py-2 px-4 lg:px-6 rounded-[99px]">
            <a className="text-sm lg:text-[16px] flex items-center justify-center font-normal text-white hover:text-cyan-400 transition-colors" href="#Features">
              Feature
            </a>    
            <a className="text-sm lg:text-[16px] flex items-center justify-center font-normal text-white hover:text-cyan-400 transition-colors" href="#Pricing">
              Pricing
            </a>
            <a className="text-sm lg:text-[16px] flex items-center justify-center font-normal text-white hover:text-cyan-400 transition-colors" href="#FAQ">
              FAQ
            </a>
          </div>
        </StarBorder>
      </div>

      {/* Right - Login Button (Desktop) */}
      <div className="right hidden md:flex w-auto justify-end items-center flex-shrink-0">
        <a href="/login">
          <StarBorder
            as="button"
            className="custom-class p-2 lg:p-3 transition-transform duration-300 hover:scale-110"
            color="cyan"
            speed="5s"
          >
            <span className="text-sm lg:text-base">Login</span>
            <i className="fa-solid fa-arrow-right text-white pl-2"></i>
          </StarBorder>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[50px] left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-cyan-400/20 z-50">
          <div className="flex flex-col items-center py-6 space-y-4">
            {/* Mobile Navigation Links */}
            <a 
              className="text-white text-lg font-normal hover:text-cyan-400 transition-colors py-2"
              href="#Features"
              onClick={() => setIsMenuOpen(false)}
            >
              Feature
            </a>    
            <a 
              className="text-white text-lg font-normal hover:text-cyan-400 transition-colors py-2"
              href="#Pricing"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              className="text-white text-lg font-normal hover:text-cyan-400 transition-colors py-2"
              href="#FAQ"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            
            {/* Mobile Login Button */}
            <div className="pt-4">
              <a href="/login" onClick={() => setIsMenuOpen(false)}>
                <StarBorder
                  as="button"
                  className="custom-class p-3 transition-transform duration-300 hover:scale-110"
                  color="cyan"
                  speed="5s"
                >
                  <span className="text-base">Login</span>
                  <i className="fa-solid fa-arrow-right text-white pl-2"></i>
                </StarBorder>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;