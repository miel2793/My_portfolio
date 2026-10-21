import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationSection } from '../sections/EducationSection';
import { LeadershipSection } from '../sections/LeadershipSection';
import { ContactSection } from '../sections/ContactSection';
import { usePublicData } from '../context/PublicDataContext';

export const HomePage: React.FC = () => {
  const { settings, isLoading } = usePublicData();
  const visibility = settings?.sectionVisibility || {
    about: true,
    skills: true,
    projects: true,
    experience: true,
    education: true,
    leadership: true,
    blog: true,
    contact: true,
  };

  return (
    <div>
      <HeroSection />
      {visibility.about && <AboutSection />}
      {visibility.skills && <SkillsSection />}
      {visibility.projects && <ProjectsSection />}
      {visibility.experience && <ExperienceSection />}
      {visibility.education && <EducationSection />}
      {visibility.leadership && <LeadershipSection />}
      {visibility.contact && <ContactSection />}
    </div>
  );
};
