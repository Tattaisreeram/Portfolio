import type { Vector3Tuple } from 'three'

export interface NodeDef {
  id: string
  label: string
  position: Vector3Tuple
  color: 'gold' | 'teal'
}

export interface EdgeDef {
  from: string
  to: string
}

export const NODE_DEFS: NodeDef[] = [
  { id: 'gateway',   label: 'API Gateway',    position: [ 0,    1.4,  0   ], color: 'gold' },
  { id: 'auth',      label: 'Auth',           position: [-2.2,  0.6,  0.5 ], color: 'gold' },
  { id: 'trade',     label: 'Trade Service',  position: [ 2.2,  0.4,  0.2 ], color: 'gold' },
  { id: 'kafka',     label: 'Kafka',          position: [ 1.0, -1.0,  0.8 ], color: 'teal' },
  { id: 'redis',     label: 'Redis',          position: [-0.8, -1.6,  0.3 ], color: 'teal' },
  { id: 'mysql',     label: 'MySQL',          position: [ 3.0, -0.8, -0.4 ], color: 'teal' },
  { id: 'grpc',      label: 'gRPC',           position: [-2.8, -0.4, -0.6 ], color: 'gold' },
  { id: 'ai',        label: 'AI Assistant',   position: [ 0.2,  0.0, -1.8 ], color: 'teal' },
]

export const EDGE_DEFS: EdgeDef[] = [
  { from: 'gateway', to: 'auth'  },
  { from: 'gateway', to: 'trade' },
  { from: 'gateway', to: 'grpc'  },
  { from: 'trade',   to: 'kafka' },
  { from: 'trade',   to: 'mysql' },
  { from: 'trade',   to: 'ai'    },
  { from: 'kafka',   to: 'redis' },
]

export const GOLD = '#E8B04B'
export const TEAL = '#2DD4BF'
