
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from '../../lib/gsap';

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, isMenuOpen }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    gsap.to('.navbar-container', {
      y: isVisible ? 0 : -100,
      duration: 0.6,
      ease: 'power3.out'
    });
  }, [isVisible]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[120] mix-blend-difference navbar-container px-6 py-8 md:px-12 md:py-10 flex justify-between items-center">
      text
    </nav>
  );
};

export default Navbar;