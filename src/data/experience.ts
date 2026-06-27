import type { ExperienceEntry } from '../types'

export const experience: ExperienceEntry[] = [
  {
    type: 'work',
    title: 'SDE Intern',
    org: 'Hugohub',
    period: 'Current',
    bullets: [
      'Building production backend microservices in Java and Spring Boot, shipping features with gRPC for inter-service communication, Kafka for event-driven pipelines, MySQL for persistence and Redis for caching.',
      'Delivering services with proper integration test coverage and observability: structured logging, Micrometer metrics and health endpoints.',
      'Contributing to system design discussions and owning full feature slices from API contract to deployment.',
    ],
  },
  {
    type: 'education',
    title: 'B.Tech, Information Technology',
    org: 'IIIT Lucknow',
    period: '2022 to 2026',
    bullets: [
      'CGPA 8.0. Graduating June 2026.',
      'Senior Member, Google Developer Group, IIIT Lucknow.',
      'Competitive programming: Codeforces Specialist, CodeChef 3 Star, LeetCode Knight.',
    ],
  },
]
