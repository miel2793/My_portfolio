import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUpRight, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePublicData } from '../context/PublicDataContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { settings } = usePublicData();
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Education', href: '/#education' },
    { name: 'Leadership', href: '/#leadership' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      if (location.pathname !== '/') {
        window.location.href = href;
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0d11]/85 dark:bg-[#0b0d11]/85 bg-white/90 backdrop-blur-md shadow-md border-b border-subtle'
          : 'bg-transparent'
      }`}
      style={{
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo / Monogram */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="MD: Miel Mahmud Sifat Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-[#12161f] border border-lime-400/30 flex items-center justify-center font-heading font-bold text-lime-400 text-lg group-hover:border-lime-400 group-hover:scale-105 transition-all shadow-sm">
              MS
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base sm:text-lg tracking-tight text-theme-primary group-hover:text-lime-400 transition-colors">
                {settings?.profile?.fullName || 'MD: Miel Mahmud Sifat'}
              </span>
              <span className="text-[11px] font-mono text-theme-muted tracking-wider uppercase">
                Flutter & Mobile Dev
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isBlog = link.href === '/blog';
              const isActive = isBlog && location.pathname.startsWith('/blog');

              return isBlog ? (
                <Link
                  key={link.name}
                  to="/blog"
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-lime-400 bg-lime-400/10'
                      : 'text-theme-secondary hover:text-theme-primary hover:bg-slate-800/20'
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-theme-secondary hover:text-theme-primary hover:bg-slate-800/20 transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-700/50 hover:border-lime-400/50 text-theme-secondary hover:text-theme-primary transition-colors focus:outline-none"
              aria-label="Toggle dark/light theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet-500" />}
            </button>

            {/* Admin Badge shortcut if authenticated */}
            {isAuthenticated && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600/15 border border-violet-500/30 text-violet-400 hover:bg-violet-600/25 text-xs font-semibold"
                title="Go to Admin Dashboard"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}

            {/* Direct Contact Button */}
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/#contact');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-lime-400 text-black font-semibold text-sm hover:bg-lime-300 transition-all shadow-sm active:scale-95"
            >
              Contact Me
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-700/50 text-theme-secondary"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet-500" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-slate-700/50 text-theme-primary focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#0b0d11] dark:bg-[#0b0d11] bg-white border-b border-subtle px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-theme-secondary hover:text-theme-primary hover:bg-slate-800/30"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {isAuthenticated && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-violet-600/15 text-violet-400 border border-violet-500/30 text-sm font-semibold"
              >
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/#contact');
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-lime-400 text-black font-semibold text-sm"
            >
              Contact Me
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
