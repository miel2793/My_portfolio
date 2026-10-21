import React, { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Layout, Save, CheckCircle2, X } from 'lucide-react';
import { api } from '../services/api';
import { SiteSettings } from '../types';
import { usePublicData } from '../context/PublicDataContext';

export const AdminAppearancePage: React.FC = () => {
  const { refresh } = usePublicData();
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [themeSettings, setThemeSettings] = useState({
    defaultTheme: 'dark' as SiteSettings['theme']['defaultTheme'],
    allowLightMode: true,
    allowDarkMode: true,
    primaryAccent: 'lime' as SiteSettings['theme']['primaryAccent'],
  });

  const [sections, setSections] = useState({
    about: true,
    skills: true,
    projects: true,
    experience: true,
    education: true,
    leadership: true,
    blog: true,
    contact: true,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const res = await api.getAllSettingsAdmin();
        if (res.success && res.data) {
          if (res.data.theme) {
            setThemeSettings({
              defaultTheme: res.data.theme.defaultTheme || 'dark',
              allowLightMode: res.data.theme.allowLightMode ?? true,
              allowDarkMode: res.data.theme.allowDarkMode ?? true,
              primaryAccent: res.data.theme.primaryAccent || 'lime',
            });
          }
          if (res.data.sectionVisibility) {
            setSections({
              about: res.data.sectionVisibility.about ?? true,
              skills: res.data.sectionVisibility.skills ?? true,
              projects: res.data.sectionVisibility.projects ?? true,
              experience: res.data.sectionVisibility.experience ?? true,
              education: res.data.sectionVisibility.education ?? true,
              leadership: res.data.sectionVisibility.leadership ?? true,
              blog: res.data.sectionVisibility.blog ?? true,
              contact: res.data.sectionVisibility.contact ?? true,
            });
          }
        }
      } catch (err: any) {
        setFeedback({ type: 'error', message: err.message });
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      await api.updateSettings({
        theme: themeSettings,
        sectionVisibility: sections,
      });
      setFeedback({ type: 'success', message: 'Appearance and layout settings saved.' });
      await refresh();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to save settings.' });
    }
  };

  const accentOptions = [
    { id: 'lime', name: 'Electric Lime', color: '#a3e635' },
    { id: 'emerald', name: 'Emerald Green', color: '#10b981' },
    { id: 'cyan', name: 'Cyber Cyan', color: '#06b6d4' },
    { id: 'violet', name: 'Muted Violet', color: '#8b5cf6' },
    { id: 'amber', name: 'Warm Amber', color: '#f59e0b' },
  ];

  if (isLoading) {
    return (
      <div className="py-20 text-center font-mono text-sm text-theme-muted">
        Loading appearance settings...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-theme-primary">
          Appearance & Layout Settings
        </h1>
        <p className="text-xs sm:text-sm text-theme-secondary mt-1">
          Customize default color themes, accent palettes, and section visibility.
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
        {/* Color Theme Defaults */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-heading font-bold text-lg text-theme-primary pb-3 border-b border-slate-800">
            Theme Configuration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-theme-muted">Default Theme</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setThemeSettings({ ...themeSettings, defaultTheme: 'dark' })}
                  className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${
                    themeSettings.defaultTheme === 'dark'
                      ? 'bg-lime-400/10 border-lime-400 text-lime-400 font-semibold'
                      : 'bg-[#12161f] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setThemeSettings({ ...themeSettings, defaultTheme: 'light' })}
                  className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${
                    themeSettings.defaultTheme === 'light'
                      ? 'bg-lime-400/10 border-lime-400 text-lime-400 font-semibold'
                      : 'bg-[#12161f] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Light Mode</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-6 sm:pt-0">
              <label className="text-xs font-mono uppercase text-theme-muted">Allowed Modes</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={themeSettings.allowDarkMode}
                    onChange={(e) =>
                      setThemeSettings({ ...themeSettings, allowDarkMode: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-lime-400"
                  />
                  <span className="text-xs font-medium text-theme-primary">Allow Dark Mode</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={themeSettings.allowLightMode}
                    onChange={(e) =>
                      setThemeSettings({ ...themeSettings, allowLightMode: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-lime-400"
                  />
                  <span className="text-xs font-medium text-theme-primary">Allow Light Mode</span>
                </label>
              </div>
            </div>
          </div>

          {/* Accent Color Palette */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <label className="text-xs font-mono uppercase text-theme-muted">
              Primary Brand Accent Color
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {accentOptions.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() =>
                    setThemeSettings({
                      ...themeSettings,
                      primaryAccent: acc.id as SiteSettings['theme']['primaryAccent'],
                    })
                  }
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                    themeSettings.primaryAccent === acc.id
                      ? 'border-lime-400 bg-lime-400/10'
                      : 'border-slate-800 bg-[#12161f] text-theme-secondary hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full border border-black/20 shadow-sm"
                    style={{ backgroundColor: acc.color }}
                  />
                  <span className="text-xs font-medium">{acc.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section Visibility Controls */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-heading font-bold text-lg text-theme-primary pb-3 border-b border-slate-800">
            Public Section Visibility
          </h2>
          <p className="text-xs text-theme-secondary">
            Toggle which sections appear on your public personal portfolio.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(sections).map((key) => {
              const secKey = key as keyof typeof sections;
              const titleMap: Record<string, string> = {
                about: 'About Section',
                skills: 'Skills & Competencies',
                projects: 'Featured Projects',
                experience: 'Work Experience',
                education: 'Education',
                leadership: 'Leadership & Volunteering',
                blog: 'Technical Blog',
                contact: 'Contact Section',
              };

              return (
                <div
                  key={secKey}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#12161f] border border-slate-800"
                >
                  <span className="text-xs font-medium text-theme-primary">
                    {titleMap[secKey] || secKey}
                  </span>
                  <input
                    type="checkbox"
                    checked={sections[secKey]}
                    onChange={(e) => setSections({ ...sections, [secKey]: e.target.checked })}
                    className="w-4 h-4 rounded text-lime-400"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-lime-400 text-black font-semibold text-sm hover:bg-lime-300 transition-all shadow-md active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Appearance Settings
          </button>
        </div>
      </form>
    </div>
  );
};
