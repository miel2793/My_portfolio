import React, { useState } from 'react';
import { Shield, KeyRound, CheckCircle2, AlertTriangle, X, Lock } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AdminSecurityPage: React.FC = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setFeedback({ type: 'error', message: 'All password fields are required.' });
      return;
    }

    if (newPassword.length < 8) {
      setFeedback({ type: 'error', message: 'New password must be at least 8 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.updatePassword(currentPassword, newPassword);
      if (res.success) {
        setFeedback({ type: 'success', message: 'Password updated successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to update password.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-theme-primary">
          Security & Password Management
        </h1>
        <p className="text-xs sm:text-sm text-theme-secondary mt-1">
          Update administrative password and review session security controls.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm ${
            feedback.type === 'success'
              ? 'bg-lime-400/10 border border-lime-400/30 text-lime-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Password Change Form */}
      <div className="bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="font-heading font-bold text-lg text-theme-primary pb-3 border-b border-slate-800 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-lime-400" />
          Change Password
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-4 text-sm max-w-lg">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-theme-muted">
              Current Password *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-theme-muted">
              New Password (min 8 chars) *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-theme-muted">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-lime-400 text-black font-semibold text-xs sm:text-sm hover:bg-lime-300 disabled:opacity-50 transition-all shadow-sm cursor-pointer mt-2"
          >
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Security Architecture Guidelines Card */}
      <div className="bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm text-xs text-theme-secondary">
        <h3 className="font-heading font-bold text-base text-theme-primary flex items-center gap-2">
          <Shield className="w-4 h-4 text-lime-400" />
          Active Security Defenses
        </h3>
        <ul className="space-y-2 list-disc pl-5 leading-relaxed text-theme-secondary">
          <li>
            <strong>HTTP-Only Cookie:</strong> Authentication tokens are stored exclusively in secure HTTP-only cookies, shielded from JavaScript-based XSS attacks.
          </li>
          <li>
            <strong>bcrypt Password Hashing:</strong> Passwords are salted and hashed using bcrypt before database storage. Plaintext passwords are never saved.
          </li>
          <li>
            <strong>Brute-Force Rate Limiting:</strong> Login attempts are capped at 10 requests per 15 minutes per IP address.
          </li>
          <li>
            <strong>NoSQL Injection Defense:</strong> Request keys containing <code className="text-lime-400 font-mono">$</code> or <code className="text-lime-400 font-mono">.</code> operators are automatically sanitized.
          </li>
        </ul>
      </div>
    </div>
  );
};
