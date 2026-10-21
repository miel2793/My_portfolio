import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Lock, EyeOff, MailCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 min-h-[75vh]">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-theme-secondary hover:text-lime-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Data Governance & Privacy
        </div>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-theme-primary tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-theme-muted font-mono">
          Last updated: October 2026 • MD: Miel Mahmud Sifat
        </p>
      </div>

      <div className="space-y-8 text-theme-secondary leading-relaxed text-sm sm:text-base">
        {/* Core Privacy Principles */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-8 space-y-4 shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <h2 className="font-heading font-bold text-xl text-theme-primary flex items-center gap-2.5">
            <EyeOff className="w-5 h-5 text-lime-400" />
            1. Strict Academic & Personal Privacy Guarantee
          </h2>
          <p>
            This website strictly adheres to privacy standards. Under no circumstances does this website display, publish, store, or transmit academic grading scores, GPA, or CGPA. The academic records displayed reflect verified institutions and degree programs only.
          </p>
        </div>

        {/* Contact Form Submissions */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-8 space-y-4 shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <h2 className="font-heading font-bold text-xl text-theme-primary flex items-center gap-2.5">
            <MailCheck className="w-5 h-5 text-lime-400" />
            2. Contact Form & Private Messages
          </h2>
          <p>
            When you submit an inquiry through the contact form, the details you provide (your name, email address, subject, and message) are transmitted securely to an encrypted backend database solely so MD: Miel Mahmud Sifat can respond to your request.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-theme-secondary">
            <li>Public visitors can never view, browse, or query messages sent by other individuals.</li>
            <li>Your information is never sold, leased, or distributed to third parties or advertising brokers.</li>
            <li>Rate limiting and honeypot mechanisms are deployed to prevent automated spam abuse.</li>
          </ul>
        </div>

        {/* Cookies & Storage */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-8 space-y-4 shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <h2 className="font-heading font-bold text-xl text-theme-primary flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-lime-400" />
            3. Cookies & Local Browser Preferences
          </h2>
          <p>
            We use localized browser storage strictly to remember your preferred visual theme (dark or light mode). Administrative sessions use secure, HTTP-only authentication cookies with strict SameSite protection to safeguard administrative access.
          </p>
        </div>

        {/* Contact */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs sm:text-sm text-theme-muted">
          For questions or requests regarding your personal data or submitted messages, contact me directly at{' '}
          <a
            href="mailto:mahmudsifat2793@gmail.com"
            className="text-lime-400 underline font-semibold hover:text-lime-300"
          >
            mahmudsifat2793@gmail.com
          </a>.
        </div>
      </div>
    </div>
  );
};
