import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  BookOpen,
  Mail,
  Briefcase,
  Database,
  ArrowUpRight,
  Plus,
  Clock,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { api } from '../services/api';
import { DashboardStats, Message } from '../types';

export const AdminOverviewPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const res = await api.getDashboardStats();
      if (res.success) {
        setStats(res.stats);
        setRecentMessages(res.recentMessages || []);
        setRecentActivity(res.recentActivity || []);
      }
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-theme-primary">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-theme-secondary mt-1">
            Real-time portfolio metrics, content status, and message center.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchStats}
            className="p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-theme-secondary hover:text-theme-primary transition-colors cursor-pointer"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-lime-400 text-black font-semibold text-xs sm:text-sm hover:bg-lime-300 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#151922] border border-slate-800 hover:border-lime-400/40 text-theme-primary font-semibold text-xs sm:text-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-lime-400" />
            Write Article
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Published Projects */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-6 shadow-sm space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
              Projects
            </span>
            <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-theme-primary">
              {stats?.publishedProjects ?? 0}
            </div>
            <p className="text-xs text-theme-muted mt-1">
              {stats?.totalProjects ?? 0} total created
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-6 shadow-sm space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
              Blog Posts
            </span>
            <div className="p-2 rounded-xl bg-violet-600/15 text-violet-400">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-theme-primary">
              {stats?.publishedBlogs ?? 0}
            </div>
            <p className="text-xs text-theme-muted mt-1">
              {stats?.totalBlogs ?? 0} total (drafts included)
            </p>
          </div>
        </div>

        {/* Unread Messages */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-6 shadow-sm space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
              Unread Messages
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-rose-400">
              {stats?.unreadMessages ?? 0}
            </div>
            <p className="text-xs text-theme-muted mt-1">
              {stats?.totalMessages ?? 0} total submissions
            </p>
          </div>
        </div>

        {/* Experience & DB Health */}
        <div className="bg-[#151922] border border-subtle rounded-3xl p-6 shadow-sm space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
              Database State
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse"></span>
              <span className="font-heading font-bold text-base text-theme-primary">
                {stats?.databaseStatus || 'Active'}
              </span>
            </div>
            <p className="text-xs text-theme-muted mt-1 font-mono">
              {stats?.totalExperience ?? 0} experiences • {stats?.totalEducation ?? 0} education
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Messages & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-7 bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="font-heading font-bold text-lg text-theme-primary">
                Recent Inquiries
              </h2>
              <p className="text-xs text-theme-muted">Submissions received via public contact form</p>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-semibold text-lime-400 hover:text-lime-300 flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="py-8 text-center text-xs text-theme-muted font-mono">
              No messages received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="p-4 rounded-2xl bg-[#12161f] border border-slate-800/80 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-sm text-theme-primary truncate">
                        {msg.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                          msg.status === 'unread'
                            ? 'bg-rose-500/20 text-rose-300'
                            : msg.status === 'replied'
                            ? 'bg-lime-400/20 text-lime-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-xs text-theme-secondary font-medium truncate">
                      {msg.subject}
                    </p>
                    <p className="text-xs text-theme-muted truncate">{msg.email}</p>
                  </div>
                  <span className="text-[10px] font-mono text-theme-muted whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Activity Log & Shortcuts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#151922] border border-subtle rounded-3xl p-6 sm:p-8 space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="font-heading font-bold text-lg text-theme-primary pb-3 border-b border-slate-800">
              Content Activity
            </h2>

            {recentActivity.length === 0 ? (
              <div className="py-6 text-center text-xs text-theme-muted font-mono">
                No recent activity recorded.
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400"></span>
                      <span className="text-theme-primary font-medium truncate">{act.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-theme-muted uppercase">
                      {act.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Management Links */}
          <div className="bg-gradient-to-br from-lime-400/10 via-transparent to-violet-600/10 border border-lime-400/20 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-lime-400 font-heading font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              Quick Portals
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                to="/admin/cv"
                className="p-3 rounded-xl bg-[#12161f] border border-slate-800 hover:border-lime-400/40 text-theme-primary block transition-colors"
              >
                📄 CV Management
              </Link>
              <Link
                to="/admin/profile"
                className="p-3 rounded-xl bg-[#12161f] border border-slate-800 hover:border-lime-400/40 text-theme-primary block transition-colors"
              >
                👤 Profile Settings
              </Link>
              <Link
                to="/admin/appearance"
                className="p-3 rounded-xl bg-[#12161f] border border-slate-800 hover:border-lime-400/40 text-theme-primary block transition-colors"
              >
                🎨 Theme & Layout
              </Link>
              <Link
                to="/admin/security"
                className="p-3 rounded-xl bg-[#12161f] border border-slate-800 hover:border-lime-400/40 text-theme-primary block transition-colors"
              >
                🔒 Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
