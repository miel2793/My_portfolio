import React from 'react';
import { Cpu, Wrench, Users, Smartphone, Terminal, Star } from 'lucide-react';
import { usePublicData } from '../context/PublicDataContext';

export const SkillsSection: React.FC = () => {
  const { skillsCategorized } = usePublicData();

  const devSkills = skillsCategorized['Development and Technical Skills'] || [];
  const toolSkills = skillsCategorized['Tools and Productivity'] || [];
  const profSkills = skillsCategorized['Professional Skills'] || [];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-subtle relative" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            Skills & Competencies
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-theme-primary tracking-tight">
            Categorized Technical & Professional Toolkit
          </h2>
          <p className="text-sm sm:text-base text-theme-secondary">
            Verified competencies across mobile development, technical tooling, and organizational leadership.
          </p>
        </div>

        {/* Highlight Banner for Flutter & Mobile Dev */}
        <div className="bg-[#151922] border border-lime-400/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 flex-shrink-0">
              <Smartphone className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h3 className="font-heading font-bold text-xl text-theme-primary">
                  Specialized in Flutter & Mobile Applications
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-lime-400 text-black">
                  <Star className="w-3 h-3 fill-current" />
                  Primary
                </span>
              </div>
              <p className="text-sm text-theme-secondary mt-1">
                Developing cross-platform applications with clean Dart architecture, state management, and responsive interfaces.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-lime-400 bg-[#12161f] px-4 py-2 rounded-xl border border-lime-400/20">
            <Terminal className="w-4 h-4" />
            Dart & Flutter Framework
          </div>
        </div>

        {/* 3 Category Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 1. Development & Technical Skills */}
          <div className="bg-[#151922] border border-subtle rounded-3xl p-7 shadow-sm flex flex-col justify-between" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-lime-400/10 text-lime-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-theme-primary">
                    Development & Technical
                  </h4>
                  <p className="text-xs text-theme-muted font-mono">Mobile & Software Engineering</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {devSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      skill.isPrimary
                        ? 'bg-lime-400/15 text-lime-300 border border-lime-400/40 font-semibold'
                        : 'bg-[#12161f] text-theme-secondary border border-slate-800 hover:text-theme-primary hover:border-slate-700'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Tools & Productivity */}
          <div className="bg-[#151922] border border-subtle rounded-3xl p-7 shadow-sm flex flex-col justify-between" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-theme-primary">
                    Tools & Productivity
                  </h4>
                  <p className="text-xs text-theme-muted font-mono">Modern Developer Workflow</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {toolSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-[#12161f] text-theme-secondary border border-slate-800 hover:text-theme-primary hover:border-slate-700 transition-all"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Professional Skills */}
          <div className="bg-[#151922] border border-subtle rounded-3xl p-7 shadow-sm flex flex-col justify-between" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-theme-primary">
                    Professional Skills
                  </h4>
                  <p className="text-xs text-theme-muted font-mono">Leadership & Communication</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {profSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-[#12161f] text-theme-secondary border border-slate-800 hover:text-theme-primary hover:border-slate-700 transition-all"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
