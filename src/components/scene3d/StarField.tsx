import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, Float32BufferAttribute, BufferGeometry } from 'three'

const STAR_COUNT = 220

export default function StarField() {
  const ref = useRef<Points>(null)

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3)
    const sz = new Float32Array(STAR_COUNT)
    for (let i = 0; i < STAR_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 36
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24
      pos[i * 3 + 2] = Math.random() * -12 - 3
      sz[i] = Math.random() * 1.4 + 0.3
    }
    return { positions: pos, sizes: sz }
  }, [])

  const geo = useMemo(() => {
    const g = new BufferGeometry()
    g.setAttribute('position', new Float32BufferAttribute(positions, 3))
    g.setAttribute('size', new Float32BufferAttribute(sizes, 1))
    return g
  }, [positions, sizes])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.008
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#8A93A6"
        size={0.04}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
