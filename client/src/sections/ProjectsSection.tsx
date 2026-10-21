import React, { useState } from 'react';
import { FolderGit2, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { usePublicData } from '../context/PublicDataContext';
import { Project } from '../types';
import { ProjectModal } from '../components/ProjectModal';

export const ProjectsSection: React.FC = () => {
  const { projects } = usePublicData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-subtle relative" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5" />
            Featured Work & Initiatives
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-theme-primary tracking-tight">
            Software Projects & Event Leadership
          </h2>
          <p className="text-sm sm:text-base text-theme-secondary">
            Highlighting mobile engineering platforms and technical community events.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group bg-[#151922] border border-subtle hover:border-lime-400/50 rounded-3xl p-6 sm:p-7 shadow-sm transition-all duration-300 flex flex-col justify-between"
              style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}
            >
              <div className="space-y-4">
                {/* Visual Header / Banner */}
                {project.image ? (
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-[#12161f] border border-slate-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-lime-400/10 via-slate-800/30 to-violet-600/10 border border-slate-800/80 flex items-center justify-center p-4">
                    <div className="p-3 rounded-xl bg-lime-400/10 text-lime-400 group-hover:scale-110 transition-transform">
                      <FolderGit2 className="w-8 h-8" />
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  {project.featured ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-lime-400/15 text-lime-400 border border-lime-400/30">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                      Project
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-theme-primary group-hover:text-lime-400 transition-colors line-clamp-2">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-theme-secondary leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies?.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium font-mono px-2 py-1 rounded-md bg-[#12161f] text-theme-secondary border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies && project.technologies.length > 4 && (
                    <span className="text-[11px] font-mono px-1.5 py-1 text-theme-muted">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Links & Details */}
              <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-400 hover:text-lime-300 transition-colors"
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#12161f] border border-slate-800 text-theme-secondary hover:text-lime-400 hover:border-lime-400/40 transition-colors"
                      title="GitHub Repository"
                      aria-label="View repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-lime-400 text-black hover:bg-lime-300 transition-colors"
                      title="Live Demo"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
