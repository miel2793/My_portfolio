import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { api } from '../services/api';
import { usePublicData } from '../context/PublicDataContext';

export const ContactSection: React.FC = () => {
  const { settings } = usePublicData();
  const profile = settings?.profile;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Hidden honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setFeedback({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        honeypot: formData.honeypot,
      });

      if (res.success) {
        setFeedback({
          type: 'success',
          message: res.message || 'Thank you! Your message has been sent successfully.',
        });
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Unable to submit your message at this time. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-subtle relative" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-theme-primary tracking-tight">
            Let’s Build Something Meaningful
          </h2>
          <p className="text-sm sm:text-base text-theme-secondary">
            Have a project in mind, an opportunity, or want to discuss mobile architecture? Send me a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Copy Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#151922] border border-subtle rounded-3xl p-8 shadow-sm space-y-6" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
              <h3 className="font-heading font-bold text-xl text-theme-primary">
                Direct Contact Information
              </h3>
              <p className="text-sm text-theme-secondary leading-relaxed">
                Feel free to reach out via email or phone. Click to copy my details to your clipboard:
              </p>

              {/* Email Card */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#12161f] border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-lime-400/10 text-lime-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-theme-muted">Email</span>
                    <p className="text-sm font-semibold text-theme-primary break-all">
                      {profile?.email || 'mahmudsifat2793@gmail.com'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(profile?.email || 'mahmudsifat2793@gmail.com', 'email')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-lime-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              {profile?.phone && (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#12161f] border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-violet-600/15 text-violet-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-theme-muted">Phone / WhatsApp</span>
                      <p className="text-sm font-semibold text-theme-primary">
                        {profile.phone}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(profile.phone, 'phone')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Copy phone number"
                    aria-label="Copy phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-lime-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Location Card */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#12161f] border border-slate-800">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-theme-muted">Location</span>
                  <p className="text-sm font-semibold text-theme-primary">
                    {profile?.location || 'Dhaka, Bangladesh'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Submission Form */}
          <div className="lg:col-span-7 bg-[#151922] border border-subtle rounded-3xl p-8 sm:p-10 shadow-sm" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {feedback && (
                <div
                  className={`p-4 rounded-2xl flex items-start gap-3 text-sm ${
                    feedback.type === 'success'
                      ? 'bg-lime-400/10 border border-lime-400/30 text-lime-300'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Hidden Honeypot for Bot Prevention */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono uppercase text-theme-muted">
                    Full Name <span className="text-lime-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary placeholder-slate-500 focus:outline-none focus:border-lime-400 transition-colors text-sm"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono uppercase text-theme-muted">
                    Email Address <span className="text-lime-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary placeholder-slate-500 focus:outline-none focus:border-lime-400 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-mono uppercase text-theme-muted">
                  Subject <span className="text-lime-400">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Mobile Application Collaboration / Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary placeholder-slate-500 focus:outline-none focus:border-lime-400 transition-colors text-sm"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono uppercase text-theme-muted">
                  Message <span className="text-lime-400">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, question, or inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary placeholder-slate-500 focus:outline-none focus:border-lime-400 transition-colors text-sm resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-lime-400 text-black font-semibold text-sm hover:bg-lime-300 disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
