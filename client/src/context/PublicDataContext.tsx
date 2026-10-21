import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  Project,
  Experience,
  Education,
  Skill,
  Leadership,
  BlogPost,
  SiteSettings,
} from '../types';
import { api } from '../services/api';

interface PublicDataContextType {
  settings: SiteSettings | null;
  projects: Project[];
  skills: Skill[];
  skillsCategorized: Record<string, Skill[]>;
  experience: Experience[];
  education: Education[];
  leadership: Leadership[];
  blogPosts: BlogPost[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const PublicDataContext = createContext<PublicDataContextType | undefined>(undefined);

export const PublicDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsCategorized, setSkillsCategorized] = useState<Record<string, Skill[]>>({});
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [leadership, setLeadership] = useState<Leadership[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const [
        settingsRes,
        projectsRes,
        skillsRes,
        expRes,
        eduRes,
        leadRes,
        blogRes,
      ] = await Promise.allSettled([
        api.getPublicSettings(),
        api.getPublicProjects(),
        api.getPublicSkills(),
        api.getPublicExperience(),
        api.getPublicEducation(),
        api.getPublicLeadership(),
        api.getPublicBlogPosts(),
      ]);

      if (settingsRes.status === 'fulfilled' && settingsRes.value.success) {
        setSettings(settingsRes.value.data);
      }
      if (projectsRes.status === 'fulfilled' && projectsRes.value.success) {
        setProjects(projectsRes.value.data);
      }
      if (skillsRes.status === 'fulfilled' && skillsRes.value.success) {
        setSkills(skillsRes.value.data);
        setSkillsCategorized(skillsRes.value.categorized || {});
      }
      if (expRes.status === 'fulfilled' && expRes.value.success) {
        setExperience(expRes.value.data);
      }
      if (eduRes.status === 'fulfilled' && eduRes.value.success) {
        setEducation(eduRes.value.data);
      }
      if (leadRes.status === 'fulfilled' && leadRes.value.success) {
        setLeadership(leadRes.value.data);
      }
      if (blogRes.status === 'fulfilled' && blogRes.value.success) {
        setBlogPosts(blogRes.value.data);
      }
    } catch (err) {
      console.error('[PublicDataContext] Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PublicDataContext.Provider
      value={{
        settings,
        projects,
        skills,
        skillsCategorized,
        experience,
        education,
        leadership,
        blogPosts,
        isLoading,
        refresh: fetchData,
      }}
    >
      {children}
    </PublicDataContext.Provider>
  );
};

export const usePublicData = () => {
  const context = useContext(PublicDataContext);
  if (!context) {
    throw new Error('usePublicData must be used within a PublicDataProvider');
  }
  return context;
};
