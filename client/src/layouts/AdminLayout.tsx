import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Cpu,
  HeartHandshake,
  BookOpen,
  Mail,
  UserCheck,
  FileText,
  Palette,
  Shield,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  Database,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { usePublicData } from '../context/PublicDataContext';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0d11] text-slate-300 flex items-center justify-center font-mono text-sm">
        Verifying administrator credentials...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Education', path: '/admin/education', icon: GraduationCap },
    { name: 'Skills', path: '/admin/skills', icon: Cpu },
    { name: 'Leadership & Volunteering', path: '/admin/leadership', icon: HeartHandshake },
    { name: 'Blog Management', path: '/admin/blog', icon: BookOpen },
    { name: 'Contact Messages', path: '/admin/messages', icon: Mail },
    { name: 'Profile Settings', path: '/admin/profile', icon: UserCheck },
    { name: 'CV Management', path: '/admin/cv', icon: FileText },
    { name: 'Appearance & Themes', path: '/admin/appearance', icon: Palette },
    { name: 'Security & Password', path: '/admin/security', icon: Shield },
  ];

  return (
    <div className="min-h-screen flex bg-theme-main text-theme-primary transition-colors">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#12161f] border-r border-subtle flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Admin Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lime-400 text-black flex items-center justify-center font-heading font-extrabold text-lg shadow-sm">
                MS
              </div>
              <div>
                <h2 className="font-heading font-bold text-sm text-theme-primary">
                  Admin Workspace
                </h2>
                <p className="text-[11px] font-mono text-lime-400">MD: Miel Mahmud Sifat</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-lime-400 text-black font-semibold shadow-sm'
                      : 'text-theme-secondary hover:text-theme-primary hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between px-2 text-xs text-theme-muted font-mono">
            <span className="truncate">{user?.email}</span>
            <span className="px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-400 font-bold uppercase text-[10px]">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#151922] border border-slate-800 text-xs font-semibold text-theme-secondary hover:text-theme-primary hover:border-slate-700 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
              title="Logout from admin session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Topbar */}
        <header
          className="h-16 border-b border-subtle px-4 sm:px-8 flex items-center justify-between bg-theme-surface"
          style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-800 text-theme-primary"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-theme-muted">
              <span className="w-2 h-2 rounded-full bg-lime-400"></span>
              <span className="hidden sm:inline">Active Session:</span>
              <span className="text-theme-primary font-semibold">MD: Miel Mahmud Sifat</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-800 hover:border-slate-700 text-theme-secondary hover:text-theme-primary"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet-500" />}
            </button>
          </div>
        </header>

        {/* Routed Admin Page Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
