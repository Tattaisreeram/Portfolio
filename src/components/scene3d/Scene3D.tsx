import { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import Graph3D from './Graph3D'

export default function Scene3D() {
  const reduced      = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [mouse, setMouse]   = useState({ x: 0, y: 0 })

  // pause renderer when hero scrolls out of view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x =  (e.clientX / window.innerWidth  - 0.5) * 2
    const y = -(e.clientY / window.innerHeight - 0.5) * 2
    setMouse({ x, y })
  }, [])

  useEffect(() => {
    if (reduced) return
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reduced, handleMouseMove])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        frameloop={inView ? 'always' : 'never'}
        camera={{ position: [0, 0.5, 8], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* ambient fill */}
        <ambientLight intensity={0.15} />

        {/* key light: warm gold from top-right */}
        <pointLight position={[6, 6, 4]}  intensity={2.2} color="#E8B04B" distance={22} decay={2} />

        {/* fill light: teal from bottom-left */}
        <pointLight position={[-5, -4, 3]} intensity={1.4} color="#2DD4BF" distance={20} decay={2} />

        {/* rim light from behind */}
        <pointLight position={[0, 0, -8]}  intensity={0.8} color="#8A93A6" distance={18} decay={2} />

        <Suspense fallback={null}>
          <Graph3D reduced={reduced} mouseX={mouse.x} mouseY={mouse.y} />
        </Suspense>
      </Canvas>
    </div>
  )
}
