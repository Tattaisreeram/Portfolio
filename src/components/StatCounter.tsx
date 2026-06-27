import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Props {
  target: string
  duration?: number
}

function parseTarget(raw: string): { number: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/)
  if (match) return { number: parseInt(match[1], 10), suffix: match[2] }
  return { number: 0, suffix: raw }
}

export default function StatCounter({ target, duration = 1600 }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState<string>('')
  const [hasRun, setHasRun] = useState(false)

  const { number, suffix } = parseTarget(target)

  useEffect(() => {
    if (hasRun) return
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        setHasRun(true)

        if (reduced) {
          setDisplayed(target)
          return
        }

        const start = performance.now()
        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = Math.round(eased * number)
          setDisplayed(`${current}${suffix}`)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [hasRun, number, suffix, target, duration, reduced])

  return <span ref={ref}>{displayed || '0'}</span>
}
