import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'metalpulse',
    title: 'MetalPulse',
    pitch: 'Event-driven trading backend with an AI assistant, built for correctness under failure.',
    body: 'A full trading platform where users register, fund an account, and trade gold, silver, platinum and palladium at live spot prices, with portfolio analytics and a context-aware AI assistant.',
    highlights: [
      'Every BUY / SELL / HOLD commits to MySQL first, then publishes a TradeExecutedEvent to Kafka via @TransactionalEventListener(AFTER_COMMIT), solving the dual-write problem so no event fires if the DB transaction rolls back.',
      'Kafka pipeline (KRaft, 3 partitions keyed by userId for per-user ordering) feeds two consumer groups: a structured audit log and a live Redis portfolio projection.',
      'AI assistant on Spring AI + Google Gemini 2.0 Flash, using RAG (in-memory vector store, QuestionAnswerAdvisor) plus function-calling tools that read live per-user balance and trades, scoped to the authenticated caller only.',
      'Resilience4j circuit breakers and retry with exponential backoff guarding the spot-price API and the AI calls, so trading never blocks on a downstream outage.',
      'Observability via Actuator, Micrometer and Prometheus. Integration tests with Testcontainers spinning real MySQL and Redis.',
    ],
    tags: ['Spring Boot 4', 'Java 21', 'gRPC', 'Kafka', 'Redis', 'MySQL', 'Spring AI', 'Gemini', 'Resilience4j', 'Docker', 'React 19', 'TypeScript'],
    // TODO: confirm the exact MetalPulse repo URL before publishing
    github: 'https://github.com/tattaisreeram/MetalPulse',
  },
  {
    id: 'breathe-esg',
    title: 'Breathe ESG',
    pitch: 'Turn messy enterprise CSVs into an audited, normalized emissions ledger.',
    body: 'Analysts upload SAP fuel, utility electricity and corporate travel CSVs. The system auto-parses, normalizes units, auto-flags bad rows, and drives an approve/flag review workflow with a full audit trail.',
    highlights: [
      'Pandas-based parsers normalize units (gallons to litres, miles to km, MWh to kWh) and auto-assign emission scope (1 / 2 / 3) by source type.',
      'Auto-flagging for negative values, missing units, invalid IATA airport codes and unparseable dates, with every status change logged (who, when, why).',
      'Token-authenticated DRF API, dashboard with live counts (total, pending, approved, flagged), and a clean React review UI.',
      '33 passing parser unit tests. Deployed with the frontend on Vercel and the backend on Railway with PostgreSQL.',
    ],
    tags: ['Django 4.2', 'DRF', 'PostgreSQL', 'pandas', 'React 18', 'Vite', 'Vercel', 'Railway'],
    github: 'https://github.com/tattaisreeram/Breathe-Esg',
    demo: 'https://breathe-esg-jet-eight.vercel.app',
  },
]
