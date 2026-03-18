import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Youtube } from 'lucide-react';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1B3D] text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + description + social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                CORIFER
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="group flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40 group-hover:text-white/80" />
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                  className="group flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/40 group-hover:text-white/80" />
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li>
                <div className="group flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                  <span>
                    {SITE_CONFIG.contact.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Key contacts */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contacts clés
            </h3>
            <ul className="mt-4 space-y-4">
              {SITE_CONFIG.keyContacts.map((contact) => (
                <li key={contact.name}>
                  <p className="text-sm font-medium text-white/80">
                    {contact.name}
                  </p>
                  <p className="text-xs text-white/50">{contact.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/50">
              &copy; {currentYear} {SITE_CONFIG.name}. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/mentions-legales"
                className="text-xs text-white/50 transition-colors hover:text-white/80"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-de-confidentialite"
                className="text-xs text-white/50 transition-colors hover:text-white/80"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
