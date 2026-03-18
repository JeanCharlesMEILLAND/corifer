import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Youtube } from 'lucide-react';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
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

      <div style={{ backgroundColor: '#0F1B3D' }}>
        {/* Top section: Logo + description + social - full width */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-14 pb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 mb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link href="/" className="inline-block" aria-label="Retour à l'accueil CORIFER">
                <div className="inline-block bg-white rounded-lg px-4 py-3">
                  <Image
                    src="/images/logo-corifer.png"
                    alt="CORIFER"
                    width={160}
                    height={46}
                    style={{ height: 'auto' }}
                  />
                </div>
              </Link>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: '#D1D5DB' }}>
                {SITE_CONFIG.fullName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                aria-label="Suivez-nous sur LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                aria-label="Retrouvez-nous sur YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Column 1: Navigation */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: '#9CA3AF' }}>
                Navigation
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center text-sm transition-colors duration-200"
                      style={{ color: '#ffffff' }}
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#60A5FA' }} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Contact */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: '#9CA3AF' }}>
                Contact
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="group flex items-start gap-3 text-sm transition-colors duration-200"
                    style={{ color: '#ffffff' }}
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#60A5FA' }} />
                    {SITE_CONFIG.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                    className="group flex items-start gap-3 text-sm transition-colors duration-200"
                    style={{ color: '#ffffff' }}
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#60A5FA' }} />
                    {SITE_CONFIG.contact.phone}
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-sm" style={{ color: '#D1D5DB' }}>
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#60A5FA' }} />
                    <span>{SITE_CONFIG.contact.address}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Contacts clés */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: '#9CA3AF' }}>
                Contacts clés
              </h3>
              <ul className="space-y-4">
                {SITE_CONFIG.keyContacts.map((contact) => (
                  <li key={contact.name}>
                    <p className="text-sm font-medium" style={{ color: '#ffffff' }}>
                      {contact.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#D1D5DB' }}>{contact.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-5">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-xs" style={{ color: '#9CA3AF' }}>
                &copy; {currentYear} {SITE_CONFIG.name}. Tous droits r&eacute;serv&eacute;s.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/mentions-legales"
                  className="group text-xs transition-colors duration-200 hover:text-white"
                  style={{ color: '#D1D5DB' }}
                >
                  Mentions l&eacute;gales
                </Link>
                <Link
                  href="/politique-de-confidentialite"
                  className="group text-xs transition-colors duration-200 hover:text-white"
                  style={{ color: '#D1D5DB' }}
                >
                  Politique de confidentialit&eacute;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
