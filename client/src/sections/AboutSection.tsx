import React from 'react';
import { User, CheckCircle2, Compass, Layers, Code2 } from 'lucide-react';
import { usePublicData } from '../context/PublicDataContext';

export const AboutSection: React.FC = () => {
  const { settings } = usePublicData();
  const profile = settings?.profile;

  const defaultInterests = [
    'Flutter development',
    'Cross-platform mobile applications',
    'Software development',
    'Problem solving',
    'Technology and innovation',
    'Technical event organization',
    'Team collaboration and leadership',
  ];

  const interests = profile?.interests?.length ? profile.interests : defaultInterests;

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-subtle relative" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            About Me
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-theme-primary tracking-tight">
            Driven by Code, Leadership & Impact
          </h2>
          <p className="text-sm sm:text-base text-theme-secondary">
            A snapshot of my background, focus areas, and technical interests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Summary Card */}
          <div className="lg:col-span-7 bg-[#151922] border border-subtle rounded-3xl p-8 sm:p-10 shadow-sm space-y-6" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
            <h3 className="font-heading font-bold text-2xl text-theme-primary flex items-center gap-3">
              <Code2 className="w-6 h-6 text-lime-400" />
              Professional Background
            </h3>

            <p className="text-base sm:text-lg text-theme-secondary leading-relaxed">
              {profile?.aboutSummary ||
                'Computer Science student and Flutter Developer with hands-on experience in developing cross-platform mobile applications, managing technical events, and customer relationship management. Strong problem-solving, leadership, and communication skills, with a passion for software development, technology, and delivering impactful solutions through teamwork and innovation.'}
            </p>

            <div className="pt-4 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-theme-secondary">
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono text-theme-muted tracking-wider">Core Focus</span>
                <p className="font-semibold text-theme-primary">Flutter & Cross-Platform Mobile</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono text-theme-muted tracking-wider">Primary Location</span>
                <p className="font-semibold text-theme-primary">{profile?.location || 'Dhaka, Bangladesh'}</p>
              </div>
            </div>
          </div>

          {/* Professional Interests */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#151922] border border-subtle rounded-3xl p-8 sm:p-10 shadow-sm space-y-6" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
              <h3 className="font-heading font-bold text-xl text-theme-primary flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-lime-400" />
                Professional Interests
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary">
                Key software disciplines and leadership areas I am actively engaged with:
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {interests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12161f] border border-slate-800 hover:border-lime-400/40 text-xs sm:text-sm text-theme-secondary hover:text-theme-primary transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 flex-shrink-0" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Values / Work Philosophy */}
            <div className="bg-gradient-to-br from-lime-400/10 via-transparent to-violet-600/10 border border-lime-400/20 rounded-3xl p-6 sm:p-8 space-y-2">
              <div className="flex items-center gap-2 text-lime-400 font-heading font-semibold text-sm">
                <Layers className="w-4 h-4" />
                Collaborative Innovation
              </div>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                Combining mobile engineering craftsmanship with active community engagement and technical event execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
