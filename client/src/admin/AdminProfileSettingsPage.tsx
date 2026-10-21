import React, { useState, useEffect } from 'react';
import { UserCheck, Upload, Globe, Save, CheckCircle2, X } from 'lucide-react';
import { api } from '../services/api';
import { SiteSettings } from '../types';
import { usePublicData } from '../context/PublicDataContext';

export const AdminProfileSettingsPage: React.FC = () => {
  const { refresh } = usePublicData();
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    headline: '',
    shortBio: '',
    aboutSummary: '',
    interests: '',
    location: '',
    email: '',
    phone: '',
    profileImage: '',
    availabilityStatus: '',
    isAvailable: true,
    github: '',
    existingPortfolio: '',
    oriqonMemberUrl: '',
    bubtItClub: '',
    tickify: '',
    linkedin: '',
    facebook: '',
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const res = await api.getAllSettingsAdmin();
        if (res.success && res.data) {
          const s = res.data;
          setFormData({
            fullName: s.profile?.fullName || 'MD: Miel Mahmud Sifat',
            headline: s.profile?.headline || '',
            shortBio: s.profile?.shortBio || '',
            aboutSummary: s.profile?.aboutSummary || '',
            interests: s.profile?.interests?.join(', ') || '',
            location: s.profile?.location || 'Dhaka, Bangladesh',
            email: s.profile?.email || 'mahmudsifat2793@gmail.com',
            phone: s.profile?.phone || '+8801981824807',
            profileImage: s.profile?.profileImage || '/uploads/profile/miel.jpg',
            availabilityStatus: s.profile?.availabilityStatus || '',
            isAvailable: s.profile?.isAvailable !== undefined ? s.profile.isAvailable : true,
            github: s.socialLinks?.github || 'https://github.com/miel2793',
            existingPortfolio: s.socialLinks?.existingPortfolio || 'https://miel2793.github.io/My-Portfolio/',
            oriqonMemberUrl: s.socialLinks?.oriqonMemberUrl || '',
            bubtItClub: s.socialLinks?.bubtItClub || '',
            tickify: s.socialLinks?.tickify || '',
            linkedin: s.socialLinks?.linkedin || '',
            facebook: s.socialLinks?.facebook || '',
          });
        }
      } catch (err: any) {
        setFeedback({ type: 'error', message: err.message });
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const res = await api.uploadProfileImage(file);
      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, profileImage: res.url }));
        setFeedback({ type: 'success', message: 'Profile photo updated successfully!' });
        await refresh();
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Photo upload failed.' });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const payload: Partial<SiteSettings> = {
      profile: {
        fullName: formData.fullName.trim(),
        headline: formData.headline.trim(),
        shortBio: formData.shortBio.trim(),
        aboutSummary: formData.aboutSummary.trim(),
        interests: formData.interests
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean),
        location: formData.location.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        profileImage: formData.profileImage,
        availabilityStatus: formData.availabilityStatus.trim(),
        isAvailable: formData.isAvailable,
      },
      socialLinks: {
        github: formData.github.trim(),
        existingPortfolio: formData.existingPortfolio.trim(),
        oriqonMemberUrl: formData.oriqonMemberUrl.trim(),
        bubtItClub: formData.bubtItClub.trim(),
        tickify: formData.tickify.trim(),
        linkedin: formData.linkedin.trim(),
        facebook: formData.facebook.trim(),
      },
    };

    try {
      await api.updateSettings(payload);
      setFeedback({ type: 'success', message: 'Profile details saved successfully.' });
      await refresh();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to save profile settings.' });
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center font-mono text-sm text-theme-muted">
        Loading profile settings...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-theme-primary">
          Profile & Personal Details
        </h1>
        <p className="text-xs sm:text-sm text-theme-secondary mt-1">
          Update verified identity, headlines, professional summary, and official organization profiles.
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

      <form onSubmit={handleSave} className="space-y-8 text-sm">
        {/* Profile Image & Basic Identity Card */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-heading font-bold text-lg text-theme-primary pb-3 border-b border-slate-800">
            Identity & Photo
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-[#12161f] border border-lime-400/30 shadow-md flex-shrink-0">
              <img
                src={formData.profileImage || '/miel.jpg'}
                alt="Profile avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/miel.jpg';
                }}
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-400 text-black font-semibold text-xs cursor-pointer hover:bg-lime-300 transition-colors">
                <Upload className="w-4 h-4" />
                <span>{uploadingPhoto ? 'Uploading Photo...' : 'Upload Profile Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] font-mono text-theme-muted">
                Accepts JPEG, PNG, or WebP up to 5MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-theme-muted">Full Display Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-theme-muted">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-theme-muted">Professional Headline</label>
            <input
              type="text"
              required
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-theme-muted">
              Short Introduction (Hero Statement)
            </label>
            <input
              type="text"
              required
              value={formData.shortBio}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
            />
          </div>
        </div>

        {/* About Summary & Interests */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-heading font-bold text-lg text-theme-primary pb-3 border-b border-slate-800">
            About Summary & Professional Interests
          </h2>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-theme-muted">
              Professional Summary Paragraph
            </label>
            <textarea
              rows={4}
              required
              value={formData.aboutSummary}
              onChange={(e) => setFormData({ ...formData, aboutSummary: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none resize-y"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-theme-muted">
              Professional Interests (Comma separated)
            </label>
            <input
              type="text"
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-theme-muted">
                Availability Badge Text
              </label>
              <input
                type="text"
                value={formData.availabilityStatus}
                onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                id="isAvailable"
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4 rounded text-lime-400"
              />
              <label htmlFor="isAvailable" className="text-xs font-medium text-theme-primary">
                Display Active Availability Status
              </label>
            </div>
          </div>
        </div>

        {/* Contact Coordinates & Verified Profile URLs */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-heading font-bold text-lg text-theme-primary pb-3 border-b border-slate-800">
            Contact Coordinates & External Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-theme-muted">Public Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-theme-muted">Public Phone / WhatsApp</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-theme-muted">GitHub Profile URL</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-theme-muted">Existing Portfolio URL</label>
              <input
                type="url"
                value={formData.existingPortfolio}
                onChange={(e) => setFormData({ ...formData, existingPortfolio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-theme-muted">Oriqon Member URL</label>
              <input
                type="url"
                value={formData.oriqonMemberUrl}
                onChange={(e) => setFormData({ ...formData, oriqonMemberUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-theme-muted">BUBT IT Club URL</label>
              <input
                type="url"
                value={formData.bubtItClub}
                onChange={(e) => setFormData({ ...formData, bubtItClub: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-theme-muted">Tickify URL</label>
              <input
                type="url"
                value={formData.tickify}
                onChange={(e) => setFormData({ ...formData, tickify: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-lime-400 text-black font-semibold text-sm hover:bg-lime-300 transition-all shadow-md active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Profile Settings
          </button>
        </div>
      </form>
    </div>
  );
};
