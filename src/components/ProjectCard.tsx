import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Github, ExternalLink, CheckCircle2 } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { Project } from '../types'

interface Props {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: Props) {
  const reduced = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={reduced ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`bg-panel border rounded-2xl p-7 flex flex-col gap-5 transition-colors duration-300 ${
        hovered ? 'border-gold/40' : 'border-border'
      }`}
    >
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-bold text-textPrimary">{project.title}</h3>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="text-textMuted hover:text-textPrimary transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              <Github size={17} />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-textMuted hover:text-teal transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
              >
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>
        <p className="text-gold text-sm font-medium italic">{project.pitch}</p>
      </div>

      {/* Body */}
      <p className="text-textMuted text-sm leading-relaxed">{project.body}</p>

      {/* Highlights */}
      <ul className="space-y-2">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex gap-3 text-sm text-textMuted leading-relaxed">
            <CheckCircle2 size={15} className="text-teal shrink-0 mt-0.5" aria-hidden="true" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-1 bg-base border border-border text-textMuted rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
