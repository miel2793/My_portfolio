import React, { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  Trash2,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  X,
  ShieldAlert,
} from 'lucide-react';
import { api } from '../services/api';
import { SiteSettings } from '../types';
import { usePublicData } from '../context/PublicDataContext';

export const AdminCVPage: React.FC = () => {
  const { refresh } = usePublicData();
  const [cvFile, setCvFile] = useState<SiteSettings['cvFile'] | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchCVStatus = async () => {
    try {
      setIsLoading(true);
      const res = await api.getAllSettingsAdmin();
      if (res.success && res.data) {
        setCvFile(res.data.cvFile || null);
        setIsPublic(Boolean(res.data.cvFile?.isPublic));
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCVStatus();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setFeedback({ type: 'error', message: 'Only PDF documents are accepted for CV uploads.' });
      return;
    }

    setUploading(true);
    setFeedback(null);
    try {
      const res = await api.uploadCV(file);
      if (res.success) {
        setCvFile(res.cvFile);
        setFeedback({
          type: 'success',
          message: 'CV uploaded successfully. Note: Public download is currently ' + (isPublic ? 'enabled' : 'disabled') + '.',
        });
        await refresh();
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'CV upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleTogglePublic = async () => {
    if (!cvFile || !cvFile.url) {
      setFeedback({ type: 'error', message: 'Please upload a CV document first before enabling public download.' });
      return;
    }

    const nextState = !isPublic;
    setIsPublic(nextState);

    try {
      const updatedCvData = {
        ...cvFile,
        isPublic: nextState,
      };
      await api.updateSettings({ cvFile: updatedCvData });
      setCvFile(updatedCvData);
      setFeedback({
        type: 'success',
        message: nextState
          ? 'Public Download CV button is now visible on the homepage.'
          : 'Public Download CV button has been hidden.',
      });
      await refresh();
    } catch (err: any) {
      setIsPublic(!nextState);
      setFeedback({ type: 'error', message: err.message || 'Failed to update visibility.' });
    }
  };

  const handleDeleteCV = async () => {
    try {
      await api.deleteCV();
      setCvFile(null);
      setIsPublic(false);
      setDeleteConfirmOpen(false);
      setFeedback({ type: 'success', message: 'CV file removed from server.' });
      await refresh();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to remove CV file.' });
    }
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 KB';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-theme-primary">
          CV / Résumé Management
        </h1>
        <p className="text-xs sm:text-sm text-theme-secondary mt-1">
          Upload PDF résumé, preview metadata, and control public download availability.
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

      {/* Strict Privacy Notice */}
      <div className="p-5 rounded-3xl bg-amber-400/10 border border-amber-400/20 space-y-2 text-xs sm:text-sm text-amber-200">
        <div className="flex items-center gap-2 text-amber-400 font-semibold font-heading">
          <ShieldAlert className="w-4 h-4" />
          Important Privacy Rule:
        </div>
        <p className="leading-relaxed">
          Ensure that any CV file enabled for public download does <strong>NOT</strong> display your GPA or CGPA. The public download button on the website remains hidden until you explicitly toggle "Enable Public Download" below.
        </p>
      </div>

      {isLoading ? (
        <div className="py-20 text-center font-mono text-sm text-theme-muted">
          Loading CV metadata...
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active CV Status Card */}
          <div className="bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="font-heading font-bold text-lg text-theme-primary pb-3 border-b border-slate-800">
              Current CV Document
            </h2>

            {cvFile && cvFile.url ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-2xl bg-[#12161f] border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-lime-400/10 text-lime-400 flex-shrink-0">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-heading font-bold text-base text-theme-primary truncate max-w-sm">
                      {cvFile.originalName || cvFile.filename}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-theme-muted">
                      <span>Size: {formatSize(cvFile.sizeBytes)}</span>
                      <span>•</span>
                      <span>
                        Uploaded:{' '}
                        {cvFile.uploadedAt
                          ? new Date(cvFile.uploadedAt).toLocaleDateString()
                          : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <a
                    href={cvFile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </a>
                  <a
                    href={cvFile.url}
                    download
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-lime-400 text-black text-xs font-semibold hover:bg-lime-300 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </a>
                  <button
                    onClick={() => setDeleteConfirmOpen(true)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                    title="Delete CV file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-2 text-xs sm:text-sm text-theme-muted font-mono">
                <FileText className="w-10 h-10 text-theme-muted mx-auto opacity-50" />
                <p>No CV document is currently uploaded.</p>
              </div>
            )}

            {/* Public Visibility Switch */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-theme-primary">
                  Public Download Button on Website
                </h3>
                <p className="text-xs text-theme-muted mt-0.5">
                  Controls whether visitors can see and click the "Download CV" action button in the hero section.
                </p>
              </div>

              <button
                onClick={handleTogglePublic}
                disabled={!cvFile || !cvFile.url}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-40 cursor-pointer ${
                  isPublic ? 'bg-lime-400' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                    isPublic ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Upload / Replace Card */}
          <div className="bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="font-heading font-bold text-lg text-theme-primary">
              {cvFile?.url ? 'Replace CV Document' : 'Upload New CV Document'}
            </h2>
            <p className="text-xs text-theme-secondary">
              Upload an updated PDF CV. The previous file will be safely replaced on the server.
            </p>

            <div className="pt-2">
              <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-400 text-black font-semibold text-xs sm:text-sm cursor-pointer hover:bg-lime-300 transition-colors">
                <Upload className="w-4 h-4" />
                <span>{uploading ? 'Uploading PDF...' : 'Select PDF Document'}</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#151922] border border-slate-700 rounded-3xl max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-theme-primary">Delete CV Document</h3>
            <p className="text-xs text-theme-secondary">
              Are you sure you want to delete your current CV file from the server? This will also disable the public download button.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCV}
                className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
