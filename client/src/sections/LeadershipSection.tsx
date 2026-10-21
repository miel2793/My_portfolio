import React from 'react';
import { Award, ExternalLink, Calendar, Users2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { usePublicData } from '../context/PublicDataContext';

export const LeadershipSection: React.FC = () => {
  const { leadership } = usePublicData();

  return (
    <section id="leadership" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-subtle relative" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            Impact & Community
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-theme-primary tracking-tight">
            Leadership & Volunteering
          </h2>
          <p className="text-sm sm:text-base text-theme-secondary">
            Driving community growth through university tech club leadership, ICPC regional volunteering, and national service.
          </p>
        </div>

        {/* Grid of Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadership.map((item, idx) => (
            <div
              key={item._id || idx}
              className="bg-[#151922] border border-subtle hover:border-lime-400/40 rounded-3xl p-7 shadow-sm transition-all flex flex-col justify-between space-y-6"
              style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/60">
                  <div className="p-3 rounded-2xl bg-violet-600/15 text-violet-400">
                    <Users2 className="w-6 h-6" />
                  </div>
                  {(item.startDate || item.endDate) && (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-theme-muted bg-[#12161f] px-2.5 py-1 rounded-lg border border-slate-800">
                      <Calendar className="w-3 h-3 text-lime-400" />
                      {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl text-theme-primary">
                    {item.role}
                  </h3>
                  <p className="text-sm font-semibold text-lime-400 mt-0.5">
                    {item.organization}
                  </p>
                </div>

                {item.description && (
                  <p className="text-sm text-theme-secondary leading-relaxed line-clamp-4">
                    {item.description}
                  </p>
                )}
              </div>

              {item.organizationUrl && (
                <div className="pt-4 border-t border-slate-800/60">
                  <a
                    href={item.organizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-400 hover:text-lime-300 transition-colors"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
