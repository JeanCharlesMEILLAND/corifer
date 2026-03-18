import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Youtube } from 'lucide-react';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Flatten nav items for the footer (skip children, just top-level pages)
  const footerLinks = NAV_ITEMS.filter((item) => item.href !== '/');

  return (
    <footer className="relative">
      {/* Decorative gradient top border */}
      <div
        className="h-1"
        style={{
          background: 'linear-gradient(90deg, #2563EB 0%, #06B6D4 50%, #10B981 100%)',
        }}
        aria-hidden="true"
      />

      <div className="bg-[#0F1B3D]">
        {/* Main footer content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Column 1: Logo + description + social */}
            <div>
              <Link href="/" className="inline-block" aria-label="Retour à l'accueil CORIFER">
                <Image
                  src="/images/logo-corifer.png"
                  alt="CORIFER"
                  width={180}
                  height={60}
                  className="brightness-0 invert"
                  style={{ height: 'auto' }}
                />
              </Link>
              <p className="mt-5 text-sm leading-relaxed text-white/90 max-w-xs">
                {SITE_CONFIG.description}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/90 transition-all duration-200 hover:bg-[#2563EB] hover:text-white hover:scale-105"
                  aria-label="Suivez-nous sur LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/90 transition-all duration-200 hover:bg-[#EF4444] hover:text-white hover:scale-105"
                  aria-label="Retrouvez-nous sur YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-6">
                Navigation
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center text-sm text-white/90 transition-colors duration-200 hover:text-white"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#06B6D4] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact + Key contacts */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-6">
                Contact
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="group flex items-start gap-3 text-sm text-white/90 transition-colors duration-200 hover:text-white"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#06B6D4]" />
                    {SITE_CONFIG.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                    className="group flex items-start gap-3 text-sm text-white/90 transition-colors duration-200 hover:text-white"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#06B6D4]" />
                    {SITE_CONFIG.contact.phone}
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-sm text-white/90">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#06B6D4]" />
                    <span>{SITE_CONFIG.contact.address}</span>
                  </div>
                </li>
              </ul>

              {/* Key contacts */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-4">
                  Contacts clés
                </h4>
                <ul className="space-y-3">
                  {SITE_CONFIG.keyContacts.map((contact) => (
                    <li key={contact.name}>
                      <p className="text-sm font-medium text-white/90">
                        {contact.name}
                      </p>
                      <p className="text-xs text-white/70">{contact.role}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-xs text-white/70">
                &copy; {currentYear} {SITE_CONFIG.name}. Tous droits r&eacute;serv&eacute;s.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/mentions-legales"
                  className="group text-xs text-white/70 transition-colors duration-200 hover:text-white"
                >
                  <span className="relative">
                    Mentions l&eacute;gales
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#06B6D4] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
                <Link
                  href="/politique-de-confidentialite"
                  className="group text-xs text-white/70 transition-colors duration-200 hover:text-white"
                >
                  <span className="relative">
                    Politique de confidentialit&eacute;
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#06B6D4] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
