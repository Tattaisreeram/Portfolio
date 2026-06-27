import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cpStats } from '../data/stats'
import StatCounter from './StatCounter'

export default function CPStats() {
  const reduced = useReducedMotion()

  return (
    <section id="cp" className="py-24 bg-base">
      <div className="max-w-content mx-auto px-6">
        <p className="font-mono text-teal text-xs tracking-widest uppercase mb-3">
          Competitive Programming
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-4">
          By the numbers.
        </h2>
        <p className="text-textMuted mb-12 max-w-lg">
          Problem solving from competitive programming is the backbone of how I reason about systems.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cpStats.map((stat, i) => (
            <motion.div
              key={stat.platform}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-panel border border-border rounded-xl p-5 flex flex-col gap-1"
            >
              <p
                className={`font-mono text-3xl font-bold ${
                  stat.color === 'gold' ? 'text-gold' : 'text-teal'
                }`}
              >
                <StatCounter target={stat.rank} />
              </p>
              <p className="font-mono text-xs text-textMuted uppercase tracking-wider">
                {stat.platform}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
