import React from 'react';
import { X, ExternalLink, Calendar, Layers, Tag } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="relative bg-[#151922] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-lime-400/15 text-lime-400 border border-lime-400/30">
                Project Details
              </span>
              {project.featured && (
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-600/20 text-violet-300">
                  Featured
                </span>
              )}
            </div>
            <h3 className="font-heading font-bold text-2xl text-theme-primary">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-theme-secondary hover:text-theme-primary hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Image or Visual Badge */}
        {project.image ? (
          <div className="w-full h-56 rounded-2xl overflow-hidden bg-[#12161f] border border-slate-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-40 rounded-2xl bg-gradient-to-r from-lime-400/10 via-slate-800/40 to-violet-600/10 border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
            <Layers className="w-8 h-8 text-lime-400 mb-2" />
            <span className="font-heading font-semibold text-lg text-theme-primary">
              {project.title}
            </span>
          </div>
        )}

        {/* Full Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-theme-muted">
            Overview & Scope
          </h4>
          <p className="text-sm sm:text-base text-theme-secondary leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Technology Stack Tags */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-theme-muted flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-lime-400" />
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-[#12161f] border border-slate-800 text-xs font-medium text-theme-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#12161f] border border-slate-700 hover:border-lime-400 text-sm font-semibold text-theme-primary transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-lime-400" />
              Source Repository
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-400 text-black text-sm font-semibold hover:bg-lime-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
