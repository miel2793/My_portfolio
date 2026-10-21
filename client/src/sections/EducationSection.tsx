import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { usePublicData } from '../context/PublicDataContext';

export const EducationSection: React.FC = () => {
  const { education } = usePublicData();

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-subtle relative" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Pathway
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-theme-primary tracking-tight">
            Education & Academic Background
          </h2>
          <p className="text-sm sm:text-base text-theme-secondary">
            Formal education in Computer Science & Engineering and foundational science studies.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, idx) => (
            <div
              key={edu._id || idx}
              className="bg-[#151922] border border-subtle hover:border-lime-400/40 rounded-3xl p-7 sm:p-8 shadow-sm transition-all flex flex-col justify-between space-y-6"
              style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}
            >
              <div className="space-y-4">
                {/* Header Icon & Duration */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                  <div className="p-3 rounded-2xl bg-lime-400/10 text-lime-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-theme-muted bg-[#12161f] px-3 py-1.5 rounded-lg border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-lime-400" />
                      {edu.startDate} – {edu.endDate}
                    </span>
                  )}
                </div>

                {/* Degree & Field */}
                <div>
                  <h3 className="font-heading font-bold text-xl text-theme-primary">
                    {edu.degree}
                  </h3>
                  {edu.field && (
                    <p className="text-sm font-semibold text-lime-400 mt-0.5">
                      {edu.field}
                    </p>
                  )}
                </div>

                {/* Institution */}
                <div className="space-y-1">
                  <p className="text-xs uppercase font-mono text-theme-muted tracking-wider">
                    Institution
                  </p>
                  <p className="text-base font-semibold text-theme-secondary">
                    {edu.institution}
                  </p>
                </div>

                {/* Description */}
                {edu.description && (
                  <p className="text-sm text-theme-secondary leading-relaxed pt-2">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
