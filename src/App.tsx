import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/src/components/layout/Navbar';
import MenuOverlay from '@/src/components/layout/MenuOverlay';
import Footer from '@/src/components/sections/Footer';
import useLenis from '@/src/hooks/useLenis';
import { gsap } from '@/src/lib/gsap';

// Lazy Load Pages
const Home = React.lazy(() => import('@/src/pages/Home'));
const Developments = React.lazy(() => import('@/src/pages/Developments'));
const Contact = React.lazy(() => import('@/src/pages/Contact'));

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const cursorRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  // 🔑 Lenis instance ref
  const lenisRef = useLenis();

  /**
   * 🔁 PAGE TRANSITION + SCROLL CONTROL
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // ✅ Always reset scroll on route change (unless explicit section scroll)
    if (!params.get('scroll')) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }
    }

    // Close menu on navigation
    setIsMenuOpen(false);

    // 🎬 Curtain transition
    const tl = gsap.timeline();

    gsap.set(curtainRef.current, {
      y: '100%',
      opacity: 1,
    });

    tl.to(curtainRef.current, {
      y: '0%',
      duration: 0.6,
      ease: 'expo.inOut',
    })
      .to(curtainRef.current, {
        y: '-100%',
        duration: 0.6,
        ease: 'expo.inOut',
        delay: 0.1,
      });

    tl.fromTo(
      '.page-wrapper',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    // 🌿 Deep-link scroll (Lifestyle section)
    if (params.get('scroll') === 'lifestyle' && location.pathname === '/') {
      setTimeout(() => {
        const el = document.getElementById('lifestyle-section');
        if (el && lenisRef.current) {
          lenisRef.current.scrollTo(el);
        }
      }, 800); // after transition
    }
  }, [location.pathname, location.search, lenisRef]);

  /**
   * 🖱️ CUSTOM CURSOR
   */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power3' });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    const handleHover = () => {
      const targets = document.querySelectorAll(
        'a, button, input, textarea, select, .hover-trigger'
      );

      targets.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(cursor, {
            scale: 3.5,
            backgroundColor: 'white',
            mixBlendMode: 'difference',
            borderWidth: 0,
            duration: 0.2,
          });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(cursor, {
            scale: 1,
            backgroundColor: 'transparent',
            mixBlendMode: 'difference',
            borderWidth: 1,
            duration: 0.2,
          });
        });
      });
    };

    handleHover();

    const observer = new MutationObserver(handleHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-stone-800 selection:text-white cursor-none">
      <Navbar
        onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
        isMenuOpen={isMenuOpen}
      />

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* 🎬 Transition Curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[200] bg-[#1a1a1a] pointer-events-none translate-y-full"
      />

      <main className="page-wrapper">
        <Suspense fallback={<div className="h-screen w-full bg-[#1a1a1a]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<Vision />} />
            <Route path='/services' element={<ServicesPage />} />
            <Route path="/developments" element={<Developments />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/developments/:slug" element={<PropertyDetail />} /> */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {/* 🖱️ Cinematic Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 border border-white/40 rounded-full pointer-events-none z-[210] hidden md:block mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default App;