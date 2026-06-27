import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Menu, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Projects',   href: '#projects'   },
  { label: 'CP',         href: '#cp'         },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

function scrollTo(id: string) {
  const el = document.getElementById(id.replace('#', ''))
  el?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-base/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-content mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="font-mono font-semibold text-lg text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label="Back to top"
          >
            TS
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '')
              return (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      active === id
                        ? 'text-gold'
                        : 'text-textMuted hover:text-textPrimary'
                    }`}
                  >
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/tattaisreeram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-textMuted hover:text-textPrimary transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/tatta-i-sreeram-794385257/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-textMuted hover:text-textPrimary transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              <Linkedin size={18} />
            </a>
            {/* TODO: replace /resume.pdf with actual resume file path once uploaded to public/ */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm font-medium border border-gold/60 text-gold rounded hover:bg-gold/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-textMuted hover:text-textPrimary transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-base/98 backdrop-blur-lg flex flex-col items-center justify-center gap-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => { scrollTo(href); setOpen(false) }}
                className="text-2xl font-semibold text-textPrimary hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              >
                {label}
              </button>
            ))}
            <div className="flex items-center gap-6 mt-4">
              <a
                href="https://github.com/tattaisreeram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-textMuted hover:text-textPrimary"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/tatta-i-sreeram-794385257/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-textMuted hover:text-textPrimary"
              >
                <Linkedin size={22} />
              </a>
            </div>
            {/* TODO: replace /resume.pdf with actual resume file path */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border border-gold/60 text-gold rounded hover:bg-gold/10 transition-colors"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
