import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { Group } from 'three'
import { NODE_DEFS, EDGE_DEFS } from './nodes'
import Node3D from './Node3D'
import Edge3D from './Edge3D'
import Packet3D from './Packet3D'
import StarField from './StarField'

interface Props {
  reduced: boolean
  mouseX: number
  mouseY: number
}

// Two packets per edge with staggered offsets for a busier flow
const PACKET_CONFIGS = EDGE_DEFS.flatMap((edge, ei) => [
  { edge, offset: (ei * 0.23) % 1,          speed: 0.22 + (ei % 3) * 0.06 },
  { edge, offset: ((ei * 0.23) + 0.5) % 1,  speed: 0.18 + (ei % 4) * 0.05 },
])

export default function Graph3D({ reduced, mouseX, mouseY }: Props) {
  const groupRef  = useRef<Group>(null)
  const cameraRef = useRef({ driftX: 0, driftY: 0 })
  const { size }  = useThree()
  const isMobile  = size.width < 768

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()

    if (groupRef.current) {
      // slow auto-rotation around Y
      groupRef.current.rotation.y = t * 0.055

      // subtle nod on X so it never feels flat
      groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.06

      // mouse parallax on desktop
      if (!isMobile && !reduced) {
        groupRef.current.rotation.x += mouseY * 0.1
        groupRef.current.rotation.z  = -mouseX * 0.05
      }
    }

    // very gentle camera drift for depth
    if (!reduced) {
      const drift = cameraRef.current
      drift.driftX = Math.sin(t * 0.12) * 0.3
      drift.driftY = Math.cos(t * 0.17) * 0.2
      camera.position.x += (drift.driftX - camera.position.x) * 0.02
      camera.position.y += (drift.driftY - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)
    }
  })

  const nodeMap = Object.fromEntries(NODE_DEFS.map((n) => [n.id, n]))

  return (
    <>
      <StarField />

      <group ref={groupRef}>
        {/* edges first so they render behind nodes */}
        {EDGE_DEFS.map((e, i) => (
          <Edge3D key={i} from={nodeMap[e.from]} to={nodeMap[e.to]} />
        ))}

        {/* packets */}
        {!reduced && PACKET_CONFIGS.map((pc, i) => (
          <Packet3D
            key={i}
            from={nodeMap[pc.edge.from]}
            to={nodeMap[pc.edge.to]}
            offset={pc.offset}
            speed={pc.speed}
          />
        ))}

        {/* nodes */}
        {NODE_DEFS.map((node) => (
          <Node3D key={node.id} node={node} reduced={reduced} />
        ))}
      </group>
    </>
  )
}
