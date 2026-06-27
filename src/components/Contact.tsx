import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Contact() {
  const reduced = useReducedMotion()

  return (
    <section id="contact" className="py-24 bg-base">
      <div className="max-w-content mx-auto px-6 text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-teal text-xs tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-10">
            Let's build something.
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* TODO: replace tattaisreeram@gmail.com with final email address if it changes */}
            <a
              href="mailto:tattaisreeram@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-gold text-base font-semibold rounded hover:bg-gold/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <Mail size={17} aria-hidden="true" />
              Email me
            </a>

            <a
              href="https://github.com/tattaisreeram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex items-center gap-2 px-6 py-3 border border-border text-textPrimary rounded hover:border-textMuted/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              <Github size={17} aria-hidden="true" />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/tatta-i-sreeram-794385257/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex items-center gap-2 px-6 py-3 border border-border text-textPrimary rounded hover:border-textMuted/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              <Linkedin size={17} aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
