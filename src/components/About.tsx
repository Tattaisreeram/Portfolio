import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { skills } from '../data/skills'

const categoryColor: Record<string, string> = {
  backend:   'border-gold/40 text-gold bg-gold/5',
  messaging: 'border-teal/40 text-teal bg-teal/5',
  frontend:  'border-textMuted/30 text-textMuted bg-panel',
  language:  'border-textMuted/30 text-textPrimary bg-panel',
  devops:    'border-textMuted/30 text-textMuted bg-panel',
}

export default function About() {
  const reduced = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  }
  const chip = {
    hidden: { opacity: 0, y: 10 },
    show:   { opacity: 1, y: 0,  transition: { duration: 0.35 } },
  }

  return (
    <section id="about" className="py-24 bg-base">
      <div className="max-w-content mx-auto px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Text column */}
          <div>
            <p className="font-mono text-teal text-xs tracking-widest uppercase mb-3">About</p>
            <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6">
              Building the plumbing that keeps systems honest.
            </h2>
            <div className="space-y-4 text-textMuted leading-relaxed">
              <p>
                I am a final-year Information Technology student at IIIT Lucknow (CGPA 8.0,
                graduating June 2026), currently interning at Hugohub where I ship production
                backend microservices. My focus is event-driven architecture: designing systems
                that stay correct under partial failure, handle ordering guarantees across
                distributed consumers, and remain observable in production.
              </p>
              <p>
                My mental model for hard problems comes from competitive programming. Four years of
                solving 500+ problems across Codeforces, CodeChef and LeetCode trains you to reason
                about edge cases before they become incidents. That same mindset drives how I think
                about consistency, resilience and observability in the services I build.
              </p>
              <p>
                Outside work I serve as Senior Member of the Google Developer Group at IIIT Lucknow,
                running workshops and helping peers get into open-source and systems programming.
              </p>
            </div>
          </div>

          {/* Stack panel */}
          <div className="bg-panel border border-border rounded-xl p-6">
            <p className="font-mono text-xs text-textMuted uppercase tracking-widest mb-4">
              Stack at a glance
            </p>
            <motion.div
              variants={reduced ? undefined : container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill.name}
                  variants={reduced ? undefined : chip}
                  className={`font-mono text-xs px-3 py-1.5 rounded border ${categoryColor[skill.category]}`}
                >
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
