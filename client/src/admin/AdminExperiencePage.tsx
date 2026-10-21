import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Briefcase, X, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';
import { Experience } from '../types';
import { usePublicData } from '../context/PublicDataContext';

export const AdminExperiencePage: React.FC = () => {
  const { refresh } = usePublicData();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    organization: '',
    position: '',
    employmentType: 'Full-time',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    organizationUrl: '',
    displayOrder: 0,
    published: true,
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchExperience = async () => {
    try {
      setIsLoading(true);
      const res = await api.getAllExperienceAdmin();
      if (res.success) {
        setExperiences(res.data);
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const openCreateModal = () => {
    setEditingExp(null);
    setFormData({
      organization: '',
      position: '',
      employmentType: 'Full-time',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      organizationUrl: '',
      displayOrder: experiences.length + 1,
      published: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      organization: exp.organization,
      position: exp.position,
      employmentType: exp.employmentType || 'Full-time',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      isCurrent: exp.isCurrent || false,
      description: exp.description || '',
      organizationUrl: exp.organizationUrl || '',
      displayOrder: exp.displayOrder || 0,
      published: exp.published,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      if (editingExp) {
        await api.updateExperience(editingExp._id, formData);
        setFeedback({ type: 'success', message: 'Experience record updated successfully.' });
      } else {
        await api.createExperience(formData);
        setFeedback({ type: 'success', message: 'Experience record created successfully.' });
      }

      setModalOpen(false);
      await fetchExperience();
      await refresh();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to save experience record.' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteExperience(id);
      setDeleteConfirmId(null);
      setFeedback({ type: 'success', message: 'Experience record deleted successfully.' });
      await fetchExperience();
      await refresh();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to delete record.' });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-theme-primary">
            Experience Manager
          </h1>
          <p className="text-xs sm:text-sm text-theme-secondary mt-1">
            Manage professional employment, contract roles, and customer relationship experience.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime-400 text-black font-semibold text-xs sm:text-sm hover:bg-lime-300 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
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

      {isLoading ? (
        <div className="py-20 text-center font-mono text-sm text-theme-muted">
          Loading experience records...
        </div>
      ) : (
        <div className="bg-[#151922] border border-subtle rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#12161f] border-b border-slate-800 text-xs font-mono text-theme-muted uppercase">
                <tr>
                  <th className="px-6 py-4">Role & Organization</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {experiences.map((exp) => (
                  <tr key={exp._id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-heading font-bold text-theme-primary">{exp.position}</div>
                      <div className="text-xs text-lime-400 mt-0.5">{exp.organization}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{exp.employmentType}</td>
                    <td className="px-6 py-4 font-mono text-xs text-theme-muted">
                      {exp.startDate || '—'} – {exp.isCurrent ? 'Present' : exp.endDate || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase font-bold ${
                          exp.published ? 'bg-lime-400/15 text-lime-400' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {exp.published ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{exp.displayOrder}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(exp)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(exp._id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#151922] border border-slate-700 rounded-3xl max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-theme-primary">Confirm Deletion</h3>
            <p className="text-xs text-theme-secondary">
              Are you sure you want to delete this experience record?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
          <div className="relative bg-[#151922] border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="font-heading font-bold text-xl text-theme-primary">
                {editingExp ? 'Edit Experience' : 'Add Experience Entry'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-theme-muted">Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Oriqon Technologies"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-theme-muted">Position / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g. Flutter Developer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-theme-muted">Employment Type</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-theme-muted">Organization URL</label>
                  <input
                    type="url"
                    value={formData.organizationUrl}
                    onChange={(e) => setFormData({ ...formData, organizationUrl: e.target.value })}
                    placeholder="https://oriqontechnologies.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-theme-muted">Start Date</label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="e.g. December 2024"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-theme-muted">End Date</label>
                  <input
                    type="text"
                    disabled={formData.isCurrent}
                    value={formData.isCurrent ? 'Present' : formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="e.g. March 2025"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="isCurrent"
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isCurrent: e.target.checked,
                      endDate: e.target.checked ? 'Present' : formData.endDate,
                    })
                  }
                  className="w-4 h-4 rounded text-lime-400"
                />
                <label htmlFor="isCurrent" className="text-xs font-medium text-theme-primary">
                  Current Position (ongoing)
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-theme-muted">Description / Responsibilities</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key responsibilities and skills developed..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none resize-y"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-theme-muted">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    id="expPublished"
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded text-lime-400"
                  />
                  <label htmlFor="expPublished" className="text-xs font-medium text-theme-primary">
                    Published
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-lime-400 text-black text-xs font-semibold hover:bg-lime-300"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
