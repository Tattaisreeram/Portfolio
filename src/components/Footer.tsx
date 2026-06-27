export default function Footer() {
  return (
    <footer className="py-8 border-t border-border bg-base">
      <div className="max-w-content mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-sm font-semibold text-gold">TS</span>
        <p className="font-mono text-xs text-textMuted text-center">
          Built with React, Three.js and Tailwind
        </p>
        <p className="font-mono text-xs text-textMuted">{new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
