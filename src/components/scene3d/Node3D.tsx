import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Mesh, AdditiveBlending } from 'three'
import type { NodeDef } from './nodes'
import { GOLD, TEAL } from './nodes'

interface Props {
  node: NodeDef
  reduced: boolean
}

// Each node gets a stable random seed for phase offset
function seededRand(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  return ((h >>> 0) / 0xffffffff)
}

export default function Node3D({ node, reduced }: Props) {
  const coreRef    = useRef<Mesh>(null)
  const halo1Ref   = useRef<Mesh>(null)
  const halo2Ref   = useRef<Mesh>(null)
  const ringRef    = useRef<Mesh>(null)
  const pulseRef   = useRef<Mesh>(null)

  const color = node.color === 'gold' ? GOLD : TEAL
  const phase = useMemo(() => seededRand(node.id) * Math.PI * 2, [node.id])
  const ringTilt = useMemo(() => seededRand(node.id + 'tilt') * Math.PI * 0.6, [node.id])
  const ringSpeed = useMemo(() => 0.4 + seededRand(node.id + 'spd') * 0.5, [node.id])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // core gentle pulse
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.8 + phase) * 0.06
      coreRef.current.scale.setScalar(s)
    }

    // inner halo breathe
    if (halo1Ref.current) {
      const s = 1 + Math.sin(t * 1.2 + phase + 0.5) * 0.08
      halo1Ref.current.scale.setScalar(s)
      const mat = halo1Ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.12 + Math.sin(t * 1.2 + phase) * 0.05
    }

    // outer halo slow breathe
    if (halo2Ref.current && !reduced) {
      const s = 1 + Math.sin(t * 0.7 + phase + 1.2) * 0.12
      halo2Ref.current.scale.setScalar(s)
    }

    // orbital ring rotation
    if (ringRef.current && !reduced) {
      ringRef.current.rotation.x = t * ringSpeed
      ringRef.current.rotation.z = t * ringSpeed * 0.7 + ringTilt
    }

    // expanding pulse ring
    if (pulseRef.current && !reduced) {
      const cycle = ((t * 0.5 + phase * 0.3) % 1)
      const scale = 0.3 + cycle * 1.8
      pulseRef.current.scale.setScalar(scale)
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = (1 - cycle) * 0.22
    }
  })

  return (
    <group position={node.position}>
      {/* expanding pulse ring */}
      {!reduced && (
        <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.008, 6, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.18}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
      )}

      {/* outermost soft halo */}
      <mesh ref={halo2Ref}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.04}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* inner glow halo */}
      <mesh ref={halo1Ref}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* orbital ring */}
      {!reduced && (
        <mesh ref={ringRef}>
          <torusGeometry args={[0.21, 0.009, 8, 40]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.55}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
      )}

      {/* core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>

      {/* label */}
      <Html
        center
        distanceFactor={5.5}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 500,
            color: node.color === 'gold' ? GOLD : TEAL,
            background: 'rgba(10,12,16,0.82)',
            padding: '2px 7px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            border: `1px solid ${node.color === 'gold' ? 'rgba(232,176,75,0.35)' : 'rgba(45,212,191,0.35)'}`,
            boxShadow: `0 0 8px ${node.color === 'gold' ? 'rgba(232,176,75,0.15)' : 'rgba(45,212,191,0.15)'}`,
            display: 'block',
            marginTop: '20px',
            letterSpacing: '0.02em',
          }}
        >
          {node.label}
        </span>
      </Html>
    </group>
  )
}

// needed for the inline THREE type reference in useFrame
import * as THREE from 'three'
