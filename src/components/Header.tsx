'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start shrink-0">
              <span className="text-2xl font-extrabold tracking-tight text-[#0F1B3D]">
                CORIFER
              </span>
              <span className="text-[10px] font-medium leading-tight text-[#0F1B3D]/60 max-w-[220px]">
                Conseil d&apos;Orientation de la Recherche
                <br />
                et de l&apos;Innovation Ferroviaire
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-1">
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
                    className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item)
                        ? 'text-[#0F1B3D] bg-[#0F1B3D]/5'
                        : 'text-[#0F1B3D]/80 hover:text-[#0F1B3D] hover:bg-[#0F1B3D]/5'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* Desktop dropdown */}
                  {item.children && openDropdown === item.label && (
                    <div
                      className="absolute left-0 top-full pt-1"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-56 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              pathname === child.href
                                ? 'bg-[#0F1B3D]/5 text-[#0F1B3D] font-medium'
                                : 'text-[#0F1B3D]/70 hover:bg-[#0F1B3D]/5 hover:text-[#0F1B3D]'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile hamburger button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-[#0F1B3D] hover:bg-[#0F1B3D]/5 transition-colors"
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

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20" />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-out panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile panel header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <span className="text-lg font-bold text-[#0F1B3D]">Menu</span>
          <button
            type="button"
            className="rounded-md p-2 text-[#0F1B3D] hover:bg-[#0F1B3D]/5 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile navigation links */}
        <nav className="overflow-y-auto h-[calc(100%-65px)] px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="mb-1">
              {item.children ? (
                <>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-medium transition-colors ${
                      isActive(item)
                        ? 'text-[#0F1B3D] bg-[#0F1B3D]/5'
                        : 'text-[#0F1B3D]/80 hover:text-[#0F1B3D] hover:bg-[#0F1B3D]/5'
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
                    <div className="ml-3 border-l-2 border-[#0F1B3D]/10 pl-3 py-1">
                      <Link
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-sm text-[#0F1B3D]/60 hover:text-[#0F1B3D] hover:bg-[#0F1B3D]/5 transition-colors"
                      >
                        Tout voir
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                            pathname === child.href
                              ? 'text-[#0F1B3D] font-medium bg-[#0F1B3D]/5'
                              : 'text-[#0F1B3D]/60 hover:text-[#0F1B3D] hover:bg-[#0F1B3D]/5'
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
                  className={`block rounded-md px-3 py-3 text-sm font-medium transition-colors ${
                    isActive(item)
                      ? 'text-[#0F1B3D] bg-[#0F1B3D]/5'
                      : 'text-[#0F1B3D]/80 hover:text-[#0F1B3D] hover:bg-[#0F1B3D]/5'
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
