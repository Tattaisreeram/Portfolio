import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const Scene3D = lazy(() => import('./scene3d/Scene3D'))

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D background */}
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-base animate-pulse" />
        }
      >
        {!reduced && <Scene3D />}
      </Suspense>

      {/* gradient scrim so text is always readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,12,16,0.55) 0%, rgba(10,12,16,0.88) 100%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-content mx-auto px-6 text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-mono text-teal text-sm tracking-widest uppercase mb-4">
            Backend / Distributed Systems Engineer
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-textPrimary mb-4 leading-tight">
            Sreeram
          </h1>

          <p className="text-xl md:text-2xl text-textPrimary font-medium mb-3">
            I build scalable, event-driven backend systems.
          </p>

          <p className="text-base md:text-lg text-textMuted max-w-xl mx-auto mb-10">
            Spring Boot, Kafka, gRPC and the messy distributed-systems problems in between.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={reduced ? {} : { scale: 1.04 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 bg-gold text-base font-semibold rounded hover:bg-gold/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              View Projects
            </motion.button>

            <motion.button
              whileHover={reduced ? {} : { scale: 1.04 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 border border-textMuted/40 text-textPrimary font-semibold rounded hover:border-teal/60 hover:text-teal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              Get in touch
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-textMuted"
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  )
}
