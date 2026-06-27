export interface Project {
  id: string
  title: string
  pitch: string
  body: string
  highlights: string[]
  tags: string[]
  github: string
  demo?: string
}

export interface Skill {
  name: string
  category: 'backend' | 'messaging' | 'frontend' | 'language' | 'devops'
}

export interface CPStat {
  platform: string
  rank: string
  color: 'gold' | 'teal'
}

export interface ExperienceEntry {
  type: 'work' | 'education'
  title: string
  org: string
  period: string
  bullets: string[]
}
