import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import { Vector3, Color } from 'three'
import type { NodeDef } from './nodes'
import { GOLD, TEAL } from './nodes'

interface Props {
  from: NodeDef
  to: NodeDef
}

export default function Edge3D({ from, to }: Props) {
  const { points, colors } = useMemo(() => {
    const p = [new Vector3(...from.position), new Vector3(...to.position)]

    // vertex color gradient: source color to target color
    const cFrom = new Color(from.color === 'gold' ? GOLD : TEAL)
    const cTo   = new Color(to.color   === 'gold' ? GOLD : TEAL)

    // lerp through 12 segments for a smooth gradient
    const segments = 12
    const pts: Vector3[] = []
    const cols: Color[] = []
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const x = p[0].x + (p[1].x - p[0].x) * t
      const y = p[0].y + (p[1].y - p[0].y) * t
      const z = p[0].z + (p[1].z - p[0].z) * t
      pts.push(new Vector3(x, y, z))
      cols.push(cFrom.clone().lerp(cTo, t))
    }
    return { points: pts, colors: cols }
  }, [from, to])

  return (
    <Line
      points={points}
      vertexColors={colors}
      lineWidth={0.6}
      transparent
      opacity={0.45}
    />
  )
}
