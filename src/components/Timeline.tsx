import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { experience } from '../data/experience'

export default function Timeline() {
  const reduced = useReducedMotion()

  return (
    <section id="experience" className="py-24 bg-panel">
      <div className="max-w-content mx-auto px-6">
        <p className="font-mono text-teal text-xs tracking-widest uppercase mb-3">Experience</p>
        <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-12">
          Where I have been.
        </h2>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" aria-hidden="true" />

          <div className="space-y-10">
            {experience.map((entry, i) => (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-6"
              >
                {/* Icon */}
                <div className="hidden sm:flex items-start shrink-0">
                  <div className="w-10 h-10 rounded-full bg-base border border-border flex items-center justify-center z-10">
                    {entry.type === 'work'
                      ? <Briefcase size={16} className="text-gold" />
                      : <GraduationCap size={16} className="text-teal" />
                    }
                  </div>
                </div>

                {/* Content */}
                <div className="bg-base border border-border rounded-xl p-5 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-textPrimary">{entry.title}</h3>
                      <p className="text-gold text-sm font-mono">{entry.org}</p>
                    </div>
                    <span className="font-mono text-xs text-textMuted border border-border px-2 py-1 rounded">
                      {entry.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {entry.bullets.map((b, j) => (
                      <li key={j} className="text-sm text-textMuted leading-relaxed flex gap-2">
                        <span className="text-teal mt-1.5 shrink-0" aria-hidden="true">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
