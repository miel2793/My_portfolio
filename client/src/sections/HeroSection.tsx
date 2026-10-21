import React, { useState } from 'react';
import { ArrowDown, Mail, Download, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { usePublicData } from '../context/PublicDataContext';

export const HeroSection: React.FC = () => {
  const { settings } = usePublicData();
  const profile = settings?.profile;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    const email = profile?.email || 'mahmudsifat2793@gmail.com';
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const profileImgSrc = profile?.profileImage || '/miel.jpg';

  return (
    <section id="hero" className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#151922] border border-lime-400/30 text-xs sm:text-sm font-medium shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-400"></span>
              </span>
              <span className="text-theme-secondary">
                {profile?.availabilityStatus || 'Available for opportunities & collaboration'}
              </span>
            </div>

            {/* Name & Main Headline */}
            <div className="space-y-3">
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-theme-primary leading-[1.1]">
                MD: Miel Mahmud Sifat
              </h1>
              <p className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-lime-400 tracking-tight">
                {profile?.headline || 'Flutter Developer & Problem Solver'}
              </p>
            </div>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg text-theme-secondary max-w-2xl leading-relaxed">
              {profile?.shortBio ||
                'Building useful mobile experiences, exploring technology, and helping communities through software and event leadership.'}
            </p>

            {/* Location & Contact Meta */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-theme-muted font-mono">
              <div className="flex items-center gap-1.5 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800">
                <MapPin className="w-4 h-4 text-lime-400" />
                <span>{profile?.location || 'Dhaka, Bangladesh'}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 bg-slate-900/40 hover:bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-lime-400/40 transition-colors cursor-pointer text-theme-secondary hover:text-theme-primary"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-lime-400" />
                    <span className="text-lime-400 font-medium">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-lime-400" />
                    <span>{profile?.email || 'mahmudsifat2793@gmail.com'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4">
              {/* View Projects */}
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 rounded-xl bg-lime-400 text-black font-semibold text-sm sm:text-base hover:bg-lime-300 transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                View Projects
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Contact Me */}
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 rounded-xl bg-[#151922] border border-slate-700/80 hover:border-lime-400/60 text-theme-primary font-semibold text-sm sm:text-base transition-all hover:bg-slate-800/50 flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-lime-400" />
                Contact Me
              </button>

              {/* Download CV (controlled by admin) */}
              {settings?.hasPublicCV && settings?.cvUrl ? (
                <a
                  href={settings.cvUrl}
                  download="MD_Miel_Mahmud_Sifat_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-violet-600/15 border border-violet-500/30 text-violet-300 hover:bg-violet-600/25 font-semibold text-sm sm:text-base transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              ) : null}

              {/* GitHub */}
              <a
                href={settings?.socialLinks?.github || 'https://github.com/miel2793'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#151922] border border-slate-700/80 hover:border-lime-400/60 text-theme-primary hover:text-lime-400 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Profile Image / Monogram Graphic */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-2 bg-gradient-to-br from-lime-400/20 via-slate-800/40 to-violet-600/20 border border-lime-400/30 shadow-2xl">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-[#12161f] relative group">
                <img
                  src={profileImgSrc}
                  alt="MD: Miel Mahmud Sifat"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to monogram if image fails
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  className="hidden w-full h-full flex-col items-center justify-center bg-[#12161f] text-lime-400 p-6 text-center"
                >
                  <span className="font-heading font-extrabold text-6xl">MS</span>
                  <span className="mt-2 text-xs font-mono uppercase tracking-widest text-slate-400">
                    Flutter Developer
                  </span>
                </div>
              </div>

              {/* Floating Decorative Badges */}
              <div className="absolute -bottom-3 -right-3 bg-[#151922] border border-lime-400/40 rounded-2xl px-3.5 py-2 shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-400" />
                <span className="text-xs font-semibold text-theme-primary">Flutter & Dart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
