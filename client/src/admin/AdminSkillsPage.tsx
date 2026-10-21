import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Cpu, X, Star, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';
import { Skill } from '../types';
import { usePublicData } from '../context/PublicDataContext';

export const AdminSkillsPage: React.FC = () => {
  const { refresh } = usePublicData();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Development and Technical Skills' as Skill['category'],
    isPrimary: false,
    displayOrder: 0,
    visible: true,
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const categories: Skill['category'][] = [
    'Development and Technical Skills',
    'Tools and Productivity',
    'Professional Skills',
  ];

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      const res = await api.getAllSkillsAdmin();
      if (res.success) {
        setSkills(res.data);
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: (selectedCat !== 'All' ? selectedCat : 'Development and Technical Skills') as Skill['category'],
      isPrimary: false,
      displayOrder: skills.length + 1,
      visible: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      isPrimary: skill.isPrimary,
      displayOrder: skill.displayOrder || 0,
      visible: skill.visible,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      if (editingSkill) {
        await api.updateSkill(editingSkill._id, formData);
        setFeedback({ type: 'success', message: 'Skill updated successfully.' });
      } else {
        await api.createSkill(formData);
        setFeedback({ type: 'success', message: 'Skill added successfully.' });
      }

      setModalOpen(false);
      await fetchSkills();
      await refresh();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to save skill.' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteSkill(id);
      setDeleteConfirmId(null);
      setFeedback({ type: 'success', message: 'Skill removed successfully.' });
      await fetchSkills();
      await refresh();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to delete skill.' });
    }
  };

  const filteredSkills =
    selectedCat === 'All' ? skills : skills.filter((s) => s.category === selectedCat);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-theme-primary">
            Skills & Competencies Manager
          </h1>
          <p className="text-xs sm:text-sm text-theme-secondary mt-1">
            Add, reorder, categorize, and prioritize technical and professional skills.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime-400 text-black font-semibold text-xs sm:text-sm hover:bg-lime-300 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Skill
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

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedCat === cat
                ? 'bg-lime-400 text-black font-semibold'
                : 'bg-[#151922] text-theme-secondary hover:text-theme-primary border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="py-20 text-center font-mono text-sm text-theme-muted">
          Loading skills...
        </div>
      ) : (
        <div className="bg-[#151922] border border-subtle rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#12161f] border-b border-slate-800 text-xs font-mono text-theme-muted uppercase">
                <tr>
                  <th className="px-6 py-4">Skill Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Priority Highlight</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredSkills.map((skill) => (
                  <tr key={skill._id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-heading font-bold text-theme-primary">{skill.name}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-theme-secondary">
                      {skill.category}
                    </td>
                    <td className="px-6 py-4">
                      {skill.isPrimary ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-lime-400">
                          <Star className="w-3.5 h-3.5 fill-current" /> Primary
                        </span>
                      ) : (
                        <span className="text-xs text-theme-muted">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase font-bold ${
                          skill.visible ? 'bg-lime-400/15 text-lime-400' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {skill.visible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{skill.displayOrder}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(skill)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(skill._id)}
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
            <p className="text-xs text-theme-secondary">Are you sure you want to delete this skill?</p>
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
          <div className="relative bg-[#151922] border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="font-heading font-bold text-xl text-theme-primary">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-theme-muted">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Flutter"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-theme-muted">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as Skill['category'] })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12161f] border border-slate-800 text-theme-primary focus:border-lime-400 outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="isPrimary"
                  type="checkbox"
                  checked={formData.isPrimary}
                  onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                  className="w-4 h-4 rounded text-lime-400"
                />
                <label htmlFor="isPrimary" className="text-xs font-medium text-theme-primary">
                  Highlight as Primary Skill (Special accent on frontend)
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
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
                    id="skillVisible"
                    type="checkbox"
                    checked={formData.visible}
                    onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                    className="w-4 h-4 rounded text-lime-400"
                  />
                  <label htmlFor="skillVisible" className="text-xs font-medium text-theme-primary">
                    Visible
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
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
