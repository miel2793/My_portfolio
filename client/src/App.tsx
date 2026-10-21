import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { PublicDataProvider } from './context/PublicDataContext';

import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminOverviewPage } from './admin/AdminOverviewPage';
import { AdminProjectsPage } from './admin/AdminProjectsPage';
import { AdminExperiencePage } from './admin/AdminExperiencePage';
import { AdminEducationPage } from './admin/AdminEducationPage';
import { AdminSkillsPage } from './admin/AdminSkillsPage';
import { AdminLeadershipPage } from './admin/AdminLeadershipPage';
import { AdminBlogPage } from './admin/AdminBlogPage';
import { AdminMessagesPage } from './admin/AdminMessagesPage';
import { AdminProfileSettingsPage } from './admin/AdminProfileSettingsPage';
import { AdminCVPage } from './admin/AdminCVPage';
import { AdminAppearancePage } from './admin/AdminAppearancePage';
import { AdminSecurityPage } from './admin/AdminSecurityPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PublicDataProvider>
          <HashRouter>
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin Login Route */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverviewPage />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="experience" element={<AdminExperiencePage />} />
                <Route path="education" element={<AdminEducationPage />} />
                <Route path="skills" element={<AdminSkillsPage />} />
                <Route path="leadership" element={<AdminLeadershipPage />} />
                <Route path="blog" element={<AdminBlogPage />} />
                <Route path="messages" element={<AdminMessagesPage />} />
                <Route path="profile" element={<AdminProfileSettingsPage />} />
                <Route path="cv" element={<AdminCVPage />} />
                <Route path="appearance" element={<AdminAppearancePage />} />
                <Route path="security" element={<AdminSecurityPage />} />
              </Route>
            </Routes>
          </HashRouter>
        </PublicDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
