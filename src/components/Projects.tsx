import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-panel">
      <div className="max-w-content mx-auto px-6">
        <p className="font-mono text-teal text-xs tracking-widest uppercase mb-3">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-12">
          Things I have built.
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
