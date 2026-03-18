'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_ITEMS, type NavItem } from '@/lib/constants';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Track scroll for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const isActive = (item: NavItem) => {
    if (item.href === '/') return pathname === '/';
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Top accent bar */}
      <div className="fixed top-0 left-0 right-0 z-[51] h-[3px] bg-gradient-to-r from-[#2563EB] to-[#06B6D4]" />

      <header
        className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logo-corifer.png"
                alt="CORIFER - Conseil d'Orientation de la Recherche et de l'Innovation de la filière FERroviaire"
                width={180}
                height={52}
                className="h-auto w-[140px] sm:w-[180px]"
                priority
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children ? handleMouseEnter(item.label) : undefined
                  }
                  onMouseLeave={item.children ? handleMouseLeave : undefined}
                >
                  <Link
                    href={item.href}
                    className={`group relative inline-flex items-center gap-1 px-3 py-2 text-[13px] font-medium tracking-[0.02em] transition-colors ${
                      isActive(item)
                        ? 'text-[#0F1B3D]'
                        : 'text-[#0F1B3D]/65 hover:text-[#0F1B3D]'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                    {/* Underline indicator */}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#2563EB] transition-transform duration-300 origin-left ${
                        isActive(item)
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>

                  {/* Desktop dropdown */}
                  {item.children && openDropdown === item.label && (
                    <div
                      className="absolute left-0 top-full pt-2"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-60 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
                        {/* Colored top border on dropdown */}
                        <div className="h-[2px] bg-gradient-to-r from-[#2563EB] to-[#06B6D4]" />
                        <div className="py-1.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 text-[13px] tracking-[0.01em] transition-colors ${
                                pathname === child.href
                                  ? 'text-[#2563EB] font-medium'
                                  : 'text-[#0F1B3D]/65 hover:text-[#0F1B3D] hover:bg-gray-50'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile hamburger button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-[#0F1B3D]/70 hover:text-[#0F1B3D] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header (3px accent + 72px header) */}
      <div className="h-[75px]" />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-out panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile panel header with logo */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <Image
            src="/images/logo-corifer.png"
            alt="CORIFER"
            width={130}
            height={37}
            className="h-auto w-[130px]"
          />
          <button
            type="button"
            className="rounded-md p-1.5 text-[#0F1B3D]/60 hover:text-[#0F1B3D] transition-colors"
            onClick={closeMobileMenu}
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Accent line under mobile header */}
        <div className="h-[2px] bg-gradient-to-r from-[#2563EB] to-[#06B6D4]" />

        {/* Mobile navigation links */}
        <nav className="overflow-y-auto h-[calc(100%-69px)] px-4 py-5">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="mb-0.5">
              {item.children ? (
                <>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-[13px] tracking-[0.02em] font-medium transition-colors ${
                      isActive(item)
                        ? 'text-[#0F1B3D]'
                        : 'text-[#0F1B3D]/70 hover:text-[#0F1B3D]'
                    }`}
                    onClick={() =>
                      setMobileSubmenu(
                        mobileSubmenu === item.label ? null : item.label
                      )
                    }
                    aria-expanded={mobileSubmenu === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileSubmenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Mobile submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      mobileSubmenu === item.label
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="ml-3 border-l-2 border-[#2563EB]/20 pl-3 py-1">
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block rounded-md px-3 py-2 text-[13px] tracking-[0.01em] text-[#0F1B3D]/50 hover:text-[#0F1B3D] transition-colors"
                      >
                        Tout voir
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobileMenu}
                          className={`block rounded-md px-3 py-2 text-[13px] tracking-[0.01em] transition-colors ${
                            pathname === child.href
                              ? 'text-[#2563EB] font-medium'
                              : 'text-[#0F1B3D]/50 hover:text-[#0F1B3D]'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block rounded-md px-3 py-3 text-[13px] tracking-[0.02em] font-medium transition-colors ${
                    isActive(item)
                      ? 'text-[#0F1B3D]'
                      : 'text-[#0F1B3D]/70 hover:text-[#0F1B3D]'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
