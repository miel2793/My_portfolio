import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ExternalLink, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { usePublicData } from '../context/PublicDataContext';

export const Footer: React.FC = () => {
  const { settings } = usePublicData();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-subtle bg-[#0b0d11] text-theme-secondary py-14 transition-colors"
      style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-main)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Monogram & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#12161f] border border-lime-400/30 flex items-center justify-center font-heading font-bold text-lime-400 text-lg">
                MS
              </div>
              <span className="font-heading font-bold text-xl text-theme-primary">
                {settings?.profile?.fullName || 'MD: Miel Mahmud Sifat'}
              </span>
            </div>
            <p className="text-sm text-theme-secondary max-w-md leading-relaxed">
              {settings?.profile?.shortBio ||
                'Building useful mobile experiences, exploring technology, and helping communities through software and event leadership.'}
            </p>
            <div className="flex items-center gap-3 text-xs text-theme-muted font-mono">
              <span>📍 {settings?.profile?.location || 'Dhaka, Bangladesh'}</span>
              <span>•</span>
              <span>✉️ {settings?.profile?.email || 'mahmudsifat2793@gmail.com'}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-theme-primary">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#about" className="hover:text-lime-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/#skills" className="hover:text-lime-400 transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-lime-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/#experience" className="hover:text-lime-400 transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="/#leadership" className="hover:text-lime-400 transition-colors">
                  Leadership & Volunteering
                </a>
              </li>
              <li>
                <Link to="/blog" className="hover:text-lime-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified External Profiles */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-theme-primary">
              Verified Profiles
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={settings?.socialLinks?.github || 'https://github.com/miel2793'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-lime-400 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub Profile
                  <ExternalLink className="w-3 h-3 text-theme-muted" />
                </a>
              </li>
              <li>
                <a
                  href={
                    settings?.socialLinks?.oriqonMemberUrl ||
                    'https://oriqontechnologies.com/member/md-miel-mahmud-sifat'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-lime-400 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Oriqon Technologies
                  <ExternalLink className="w-3 h-3 text-theme-muted" />
                </a>
              </li>
              <li>
                <a
                  href={settings?.socialLinks?.bubtItClub || 'https://bitc-club.vercel.app/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-lime-400 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  BUBT IT Club
                  <ExternalLink className="w-3 h-3 text-theme-muted" />
                </a>
              </li>
              <li>
                <a
                  href={settings?.socialLinks?.tickify || 'https://tickify.live/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-lime-400 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Tickify
                  <ExternalLink className="w-3 h-3 text-theme-muted" />
                </a>
              </li>
              <li>
                <a
                  href={
                    settings?.socialLinks?.existingPortfolio ||
                    'https://miel2793.github.io/My-Portfolio/'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-lime-400 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Existing Portfolio
                  <ExternalLink className="w-3 h-3 text-theme-muted" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted">
          <p>© {currentYear} MD: Miel Mahmud Sifat. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-theme-primary transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              to="/admin"
              className="flex items-center gap-1 hover:text-lime-400 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
