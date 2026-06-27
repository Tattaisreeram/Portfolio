import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, AdditiveBlending } from 'three'
import type { Mesh } from 'three'
import type { NodeDef } from './nodes'
import { GOLD, TEAL } from './nodes'

interface Props {
  from: NodeDef
  to: NodeDef
  offset: number
  speed: number
}

const TRAIL_COUNT = 5
const TRAIL_STEP  = 0.04  // position gap between trail dots

const _start = new Vector3()
const _end   = new Vector3()
const _tmp   = new Vector3()

export default function Packet3D({ from, to, offset, speed }: Props) {
  const headsRef = useRef<(Mesh | null)[]>(Array(TRAIL_COUNT).fill(null))
  const color = (from.color === 'teal' || to.color === 'teal') ? TEAL : GOLD

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * speed + offset) % 1
    _start.set(...from.position)
    _end.set(...to.position)

    headsRef.current.forEach((mesh, i) => {
      if (!mesh) return
      const trailT = Math.max(0, t - i * TRAIL_STEP)
      _tmp.lerpVectors(_start, _end, trailT)
      mesh.position.copy(_tmp)

      const mat = mesh.material as THREE.MeshBasicMaterial
      // head is full bright, trail fades
      mat.opacity = (1 - i / TRAIL_COUNT) * (i === 0 ? 1.0 : 0.55)
    })
  })

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }, (_, i) => {
        const scale = 1 - i * 0.18
        return (
          <mesh
            key={i}
            ref={(el) => { headsRef.current[i] = el }}
            scale={scale}
          >
            <sphereGeometry args={[i === 0 ? 0.045 : 0.032, 7, 7]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={1}
              depthWrite={false}
              blending={AdditiveBlending}
            />
          </mesh>
        )
      })}
    </>
  )
}

import * as THREE from 'three'
