import {
  Project,
  Experience,
  Education,
  Skill,
  Leadership,
  BlogPost,
  Message,
  SiteSettings,
  AdminUser,
  DashboardStats,
} from '../types';

const API_BASE = (import.meta.env.VITE_API_BASE ?? '/api').replace(/\/$/, '');

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const config: RequestInit = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  // If body is FormData, delete Content-Type so browser sets boundary automatically
  if (options.body instanceof FormData) {
    const headers = { ...config.headers } as Record<string, string>;
    delete headers['Content-Type'];
    config.headers = headers;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // Public
  getPublicSettings: () => request<{ success: boolean; data: SiteSettings }>('/settings/public'),
  getPublicProjects: () => request<{ success: boolean; data: Project[] }>('/projects'),
  getPublicProjectBySlug: (slug: string) =>
    request<{ success: boolean; data: Project }>(`/projects/${slug}`),
  getPublicSkills: () =>
    request<{
      success: boolean;
      data: Skill[];
      categorized: Record<string, Skill[]>;
    }>('/skills'),
  getPublicExperience: () => request<{ success: boolean; data: Experience[] }>('/experience'),
  getPublicEducation: () => request<{ success: boolean; data: Education[] }>('/education'),
  getPublicLeadership: () => request<{ success: boolean; data: Leadership[] }>('/leadership'),
  getPublicBlogPosts: (params?: { category?: string; tag?: string; search?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return request<{ success: boolean; data: BlogPost[]; count: number }>(
      `/blog${query ? `?${query}` : ''}`
    );
  },
  getPublicBlogPostBySlug: (slug: string) =>
    request<{ success: boolean; data: BlogPost; related: BlogPost[] }>(`/blog/${slug}`),
  submitContactMessage: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    honeypot?: string;
  }) =>
    request<{ success: boolean; message: string }>('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Auth
  login: (email: string, password: string) =>
    request<{ success: boolean; user: AdminUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<{ success: boolean; message: string }>('/auth/logout', { method: 'POST' }),
  getMe: () => request<{ success: boolean; user: AdminUser }>('/auth/me'),
  updatePassword: (currentPassword: string, newPassword: string) =>
    request<{ success: boolean; message: string }>('/auth/update-password', {
      method: 'PATCH',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  // Admin Dashboard & Settings
  getDashboardStats: () =>
    request<{
      success: boolean;
      stats: DashboardStats;
      recentMessages: Message[];
      recentActivity: any[];
    }>('/settings/stats'),
  getAllSettingsAdmin: () => request<{ success: boolean; data: SiteSettings }>('/settings/admin'),
  updateSettings: (settings: Partial<SiteSettings>) =>
    request<{ success: boolean; data: SiteSettings }>('/settings', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    }),

  // Projects Admin
  getAllProjectsAdmin: () => request<{ success: boolean; data: Project[] }>('/projects/admin'),
  createProject: (project: Partial<Project>) =>
    request<{ success: boolean; data: Project }>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    }),
  updateProject: (id: string, project: Partial<Project>) =>
    request<{ success: boolean; data: Project }>(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(project),
    }),
  deleteProject: (id: string) =>
    request<{ success: boolean; message: string }>(`/projects/${id}`, { method: 'DELETE' }),

  // Experience Admin
  getAllExperienceAdmin: () => request<{ success: boolean; data: Experience[] }>('/experience/admin'),
  createExperience: (exp: Partial<Experience>) =>
    request<{ success: boolean; data: Experience }>('/experience', {
      method: 'POST',
      body: JSON.stringify(exp),
    }),
  updateExperience: (id: string, exp: Partial<Experience>) =>
    request<{ success: boolean; data: Experience }>(`/experience/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(exp),
    }),
  deleteExperience: (id: string) =>
    request<{ success: boolean; message: string }>(`/experience/${id}`, { method: 'DELETE' }),

  // Education Admin
  getAllEducationAdmin: () => request<{ success: boolean; data: Education[] }>('/education/admin'),
  createEducation: (edu: Partial<Education>) =>
    request<{ success: boolean; data: Education }>('/education', {
      method: 'POST',
      body: JSON.stringify(edu),
    }),
  updateEducation: (id: string, edu: Partial<Education>) =>
    request<{ success: boolean; data: Education }>(`/education/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(edu),
    }),
  deleteEducation: (id: string) =>
    request<{ success: boolean; message: string }>(`/education/${id}`, { method: 'DELETE' }),

  // Skills Admin
  getAllSkillsAdmin: () => request<{ success: boolean; data: Skill[] }>('/skills/admin'),
  createSkill: (skill: Partial<Skill>) =>
    request<{ success: boolean; data: Skill }>('/skills', {
      method: 'POST',
      body: JSON.stringify(skill),
    }),
  updateSkill: (id: string, skill: Partial<Skill>) =>
    request<{ success: boolean; data: Skill }>(`/skills/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(skill),
    }),
  deleteSkill: (id: string) =>
    request<{ success: boolean; message: string }>(`/skills/${id}`, { method: 'DELETE' }),

  // Leadership Admin
  getAllLeadershipAdmin: () => request<{ success: boolean; data: Leadership[] }>('/leadership/admin'),
  createLeadership: (lead: Partial<Leadership>) =>
    request<{ success: boolean; data: Leadership }>('/leadership', {
      method: 'POST',
      body: JSON.stringify(lead),
    }),
  updateLeadership: (id: string, lead: Partial<Leadership>) =>
    request<{ success: boolean; data: Leadership }>(`/leadership/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(lead),
    }),
  deleteLeadership: (id: string) =>
    request<{ success: boolean; message: string }>(`/leadership/${id}`, { method: 'DELETE' }),

  // Blog Admin
  getAllBlogPostsAdmin: () => request<{ success: boolean; data: BlogPost[] }>('/blog/admin'),
  createBlogPost: (post: Partial<BlogPost>) =>
    request<{ success: boolean; data: BlogPost }>('/blog', {
      method: 'POST',
      body: JSON.stringify(post),
    }),
  updateBlogPost: (id: string, post: Partial<BlogPost>) =>
    request<{ success: boolean; data: BlogPost }>(`/blog/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(post),
    }),
  deleteBlogPost: (id: string) =>
    request<{ success: boolean; message: string }>(`/blog/${id}`, { method: 'DELETE' }),

  // Messages Admin
  getMessagesAdmin: (params?: { status?: string; search?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return request<{ success: boolean; data: Message[]; count: number }>(
      `/messages${query ? `?${query}` : ''}`
    );
  },
  updateMessageStatus: (id: string, status: 'unread' | 'read' | 'replied') =>
    request<{ success: boolean; data: Message }>(`/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  deleteMessage: (id: string) =>
    request<{ success: boolean; message: string }>(`/messages/${id}`, { method: 'DELETE' }),

  // Uploads
  uploadProfileImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return request<{ success: boolean; url: string }>('/upload/profile', {
      method: 'POST',
      body: formData,
    });
  },
  uploadProjectImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return request<{ success: boolean; url: string }>('/upload/project', {
      method: 'POST',
      body: formData,
    });
  },
  uploadBlogImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return request<{ success: boolean; url: string }>('/upload/blog', {
      method: 'POST',
      body: formData,
    });
  },
  uploadCV: (file: File) => {
    const formData = new FormData();
    formData.append('cv', file);
    return request<{ success: boolean; cvFile: any }>('/upload/cv', {
      method: 'POST',
      body: formData,
    });
  },
  deleteCV: () => request<{ success: boolean; message: string }>('/upload/cv', { method: 'DELETE' }),
};
