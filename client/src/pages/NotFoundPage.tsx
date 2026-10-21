import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="bg-[#151922] border border-subtle rounded-3xl p-10 sm:p-14 max-w-lg w-full space-y-6 shadow-xl" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
        <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-heading font-extrabold text-5xl text-theme-primary">404</h1>
          <h2 className="font-heading font-bold text-xl text-theme-primary">Page Not Found</h2>
          <p className="text-sm text-theme-secondary">
            The page you are looking for doesn’t exist or has been relocated.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-400 text-black font-semibold text-sm hover:bg-lime-300 transition-all shadow-md active:scale-95"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
