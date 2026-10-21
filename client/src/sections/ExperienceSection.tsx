import React from 'react';
import { Briefcase, Calendar, ExternalLink, Building2 } from 'lucide-react';
import { usePublicData } from '../context/PublicDataContext';

export const ExperienceSection: React.FC = () => {
  const { experience } = usePublicData();

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-subtle relative" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            Work History
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-theme-primary tracking-tight">
            Professional Experience & Roles
          </h2>
          <p className="text-sm sm:text-base text-theme-secondary">
            Industry roles across mobile engineering, customer support, and freelance development.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-800 before:hidden md:before:block">
          {experience.map((exp, idx) => (
            <div
              key={exp._id || idx}
              className="relative flex flex-col md:flex-row items-start gap-6 group"
            >
              {/* Timeline Icon Badge */}
              <div className="hidden md:flex w-16 h-16 rounded-2xl bg-[#151922] border border-slate-800 group-hover:border-lime-400/50 items-center justify-center text-lime-400 flex-shrink-0 z-10 transition-colors shadow-sm" style={{ backgroundColor: 'var(--bg-card)' }}>
                <Building2 className="w-7 h-7" />
              </div>

              {/* Experience Card */}
              <div className="flex-1 bg-[#151922] border border-subtle group-hover:border-lime-400/30 rounded-3xl p-6 sm:p-8 shadow-sm transition-all" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                  <div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-theme-primary">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-lime-400">
                        {exp.organization}
                      </span>
                      {exp.employmentType && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {exp.employmentType}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date Range */}
                  {(exp.startDate || exp.endDate) && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-theme-muted bg-[#12161f] px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-lime-400" />
                      <span>
                        {exp.startDate ? `${exp.startDate} – ` : ''}
                        {exp.isCurrent ? 'Present' : exp.endDate || 'Present'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {exp.description && (
                  <p className="mt-4 text-sm sm:text-base text-theme-secondary leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {/* Organization Link */}
                {exp.organizationUrl && (
                  <div className="mt-5 pt-3 border-t border-slate-800/40">
                    <a
                      href={exp.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-400 hover:text-lime-300 transition-colors"
                    >
                      <span>View Organization Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
