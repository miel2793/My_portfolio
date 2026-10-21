export interface Project {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  image: string;
  gallery?: string[];
  repositoryUrl: string;
  liveDemoUrl: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  _id: string;
  organization: string;
  position: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  organizationUrl: string;
  logo: string;
  published: boolean;
  displayOrder: number;
  createdAt?: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  published: boolean;
  displayOrder: number;
  createdAt?: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: 'Development and Technical Skills' | 'Tools and Productivity' | 'Professional Skills';
  isPrimary: boolean;
  displayOrder: number;
  visible: boolean;
}

export interface Leadership {
  _id: string;
  organization: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  organizationUrl: string;
  image: string;
  visible: boolean;
  displayOrder: number;
  createdAt?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: string;
  readingTimeMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface SiteSettings {
  profile: {
    fullName: string;
    headline: string;
    shortBio: string;
    aboutSummary: string;
    interests: string[];
    location: string;
    email: string;
    phone: string;
    profileImage: string;
    availabilityStatus: string;
    isAvailable: boolean;
  };
  socialLinks: {
    github: string;
    existingPortfolio: string;
    oriqonMemberUrl: string;
    bubtItClub: string;
    tickify: string;
    linkedin: string;
    facebook: string;
  };
  cvFile?: {
    filename: string;
    originalName: string;
    url: string;
    sizeBytes: number;
    uploadedAt: string | null;
    isPublic: boolean;
  };
  hasPublicCV?: boolean;
  cvUrl?: string | null;
  theme: {
    defaultTheme: 'dark' | 'light';
    allowLightMode: boolean;
    allowDarkMode: boolean;
    primaryAccent: 'lime' | 'emerald' | 'cyan' | 'violet' | 'amber';
  };
  sectionVisibility: {
    about: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
    leadership: boolean;
    blog: boolean;
    contact: boolean;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  totalBlogs: number;
  publishedBlogs: number;
  unreadMessages: number;
  totalMessages: number;
  totalExperience: number;
  totalEducation: number;
  totalSkills: number;
  totalLeadership: number;
  databaseStatus: string;
  isMongoDBLive: boolean;
}
