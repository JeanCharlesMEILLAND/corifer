'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Linkedin, Youtube, Send, CheckCircle, AlertCircle, Loader2, User, Building2 } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SITE_CONFIG } from '@/lib/constants'

// ========================================
// Types
// ========================================

type FormState = 'idle' | 'loading' | 'success' | 'error'

type FormData = {
  name: string
  email: string
  organization: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const SUBJECT_OPTIONS = [
  { value: '', label: 'Sélectionnez un sujet' },
  { value: 'renseignements', label: 'Renseignements généraux' },
  { value: 'appel-projets', label: 'Appel à projets' },
  { value: 'partenariat', label: 'Partenariat' },
  { value: 'presse', label: 'Presse' },
  { value: 'autre', label: 'Autre' },
]

// ========================================
// Form Field Component
// ========================================

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0F1B3D] mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  )
}

// ========================================
// Page Component
// ========================================

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const inputClasses = (hasError: boolean) =>
    `w-full rounded-lg border ${
      hasError
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
        : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]/20'
    } bg-white px-4 py-3 text-sm text-[#0F1B3D] placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2`

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setFormState('loading')

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFormState('success')
      setFormData({ name: '', email: '', organization: '', subject: '', message: '' })
    } catch {
      setFormState('error')
    }
  }

  return (
    <>
      {/* ============ Hero - Minimal title section ============ */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F1B3D] tracking-tight">
              Contact
            </h1>
            <p className="mt-2 text-base md:text-lg text-gray-500">
              Une question ? Un projet ? Contactez-nous.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ Main Content ============ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* ---- Left Column: Form ---- */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              <SectionTitle
                title="Écrivez-nous"
                subtitle="Remplissez le formulaire ci-dessous et nous vous répondrons dans les meilleurs délais."
              />

              {/* Success state */}
              {formState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 rounded-xl bg-green-50 border border-green-200 p-6 flex items-start gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-800">Message envoyé avec succès</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Merci pour votre message. Notre équipe vous répondra dans les meilleurs délais.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error state */}
              {formState === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 rounded-xl bg-red-50 border border-red-200 p-6 flex items-start gap-4"
                >
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800">Erreur lors de l&apos;envoi</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Nom complet" error={errors.name} required>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Jean Dupont"
                        className={`${inputClasses(!!errors.name)} pl-10`}
                      />
                    </div>
                  </FormField>

                  <FormField label="Email" error={errors.email} required>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="jean@exemple.fr"
                        className={`${inputClasses(!!errors.email)} pl-10`}
                      />
                    </div>
                  </FormField>
                </div>

                {/* Organization */}
                <FormField label="Organisation">
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => handleChange('organization', e.target.value)}
                      placeholder="Nom de votre entreprise ou organisme"
                      className={`${inputClasses(false)} pl-10`}
                    />
                  </div>
                </FormField>

                {/* Subject */}
                <FormField label="Sujet">
                  <select
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={inputClasses(false)}
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FormField>

                {/* Message */}
                <FormField label="Message" error={errors.message} required>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Décrivez votre demande..."
                    rows={6}
                    className={`${inputClasses(!!errors.message)} resize-y min-h-[120px]`}
                  />
                </FormField>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-lg px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 ${
                    formState === 'loading'
                      ? 'bg-[#2563EB]/60 cursor-not-allowed'
                      : 'bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-[0.98]'
                  }`}
                >
                  {formState === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* ---- Right Column: Contact Info ---- */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <SectionTitle title="Coordonnées" />

              {/* Address */}
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F1B3D]">Adresse</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {SITE_CONFIG.contact.address}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F1B3D]">Email</h3>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-sm text-[#2563EB] hover:underline mt-1 inline-block"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F1B3D]">Téléphone</h3>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                    className="text-sm text-[#2563EB] hover:underline mt-1 inline-block"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                </div>
              </div>

              {/* Key Contacts */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Contacts clés
                </h3>
                <div className="space-y-4">
                  {/* Lionel Pujol */}
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-5">
                    <p className="text-sm font-semibold text-[#0F1B3D]">Lionel Pujol</p>
                    <p className="text-xs text-gray-500 mt-0.5">Chef de projet industrie ferroviaire</p>
                    <p className="text-xs text-gray-400">DGE - Ministère de l&apos;Économie</p>
                  </div>

                  {/* Jean-Jacques Mogoro */}
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-5">
                    <p className="text-sm font-semibold text-[#0F1B3D]">Jean-Jacques Mogoro</p>
                    <p className="text-xs text-gray-500 mt-0.5">Secrétaire CORIFER &amp; Directeur Pôle Industrie</p>
                    <p className="text-xs text-gray-400">FIF</p>
                    <a
                      href="tel:0766453000"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs text-[#2563EB] hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      07 66 45 30 00
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Suivez-nous
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0077B5]/10 px-4 py-2.5 text-sm font-medium text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href={SITE_CONFIG.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#FF0000]/10 px-4 py-2.5 text-sm font-medium text-[#CC0000] hover:bg-[#FF0000]/20 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Nous trouver
                </h3>
                <div className="relative rounded-xl overflow-hidden h-56 bg-gradient-to-br from-[#0F1B3D]/5 via-[#2563EB]/10 to-[#10B981]/10 border border-gray-200">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center mb-3">
                      <MapPin className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <p className="text-sm font-medium text-[#0F1B3D]">Carte interactive</p>
                    <p className="text-xs text-gray-500 mt-1">60 av. Anatole France, 92300 Levallois-Perret</p>
                  </div>
                  {/* Decorative grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: 'linear-gradient(#0F1B3D 1px, transparent 1px), linear-gradient(90deg, #0F1B3D 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
