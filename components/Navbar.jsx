'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home',     id: 'home',     type: 'scroll' },
  { label: 'CV',       href: '/cv',    type: 'link'   },
  { label: 'Projects', id: 'projects', type: 'scroll' },
  { label: 'Contact',  id: 'contact',  type: 'scroll' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (id) => {
    setMenuOpen(false);
    if (pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isOnCV = pathname === '/cv';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(10,22,40,0.08)]'
          : 'bg-white border-b border-deep-space/8'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo / name */}
        <button
          onClick={() => handleScroll('home')}
          className="font-display font-semibold text-[17px] tracking-tight text-deep-space hover:text-circuit transition-colors"
        >
          Ali Saber
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              {item.type === 'link' ? (
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isOnCV
                      ? 'text-signal'
                      : 'text-slate-mid hover:text-deep-space'
                  } ${item.href === '/cv' && isOnCV ? 'text-signal' : ''}`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => handleScroll(item.id)}
                  className="text-sm font-medium text-slate-mid hover:text-deep-space transition-colors"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-slate-mid hover:text-deep-space"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-5">
          {NAV_ITEMS.map((item) =>
            item.type === 'link' ? (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-mid hover:text-deep-space"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleScroll(item.id)}
                className="text-sm font-medium text-slate-mid hover:text-deep-space text-left"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
}
