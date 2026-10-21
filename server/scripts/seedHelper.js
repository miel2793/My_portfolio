import bcrypt from 'bcryptjs';
import { dataStore } from '../src/utils/dataStore.js';

export const initialVerifiedData = {
  profile: {
    fullName: 'MD: Miel Mahmud Sifat',
    headline: 'Flutter Developer | Problem Solver | Event Management & Leadership | Technology Enthusiast',
    shortBio: 'Building useful mobile experiences, exploring technology, and helping communities through software and event leadership.',
    aboutSummary:
      'Computer Science student and Flutter Developer with hands-on experience in developing cross-platform mobile applications, managing technical events, and customer relationship management. Strong problem-solving, leadership, and communication skills, with a passion for software development, technology, and delivering impactful solutions through teamwork and innovation.',
    interests: [
      'Flutter development',
      'Cross-platform mobile applications',
      'Software development',
      'Problem solving',
      'Technology and innovation',
      'Technical event organization',
      'Team collaboration and leadership',
    ],
    location: 'Dhaka, Bangladesh',
    email: 'mahmudsifat2793@gmail.com',
    phone: '+8801981824807',
    profileImage: '/uploads/profile/miel.jpg',
    availabilityStatus: 'Available for opportunities & collaboration',
    isAvailable: true,
  },
  socialLinks: {
    github: 'https://github.com/miel2793',
    existingPortfolio: 'https://miel2793.github.io/My-Portfolio/',
    oriqonMemberUrl: 'https://oriqontechnologies.com/member/md-miel-mahmud-sifat',
    bubtItClub: 'https://bitc-club.vercel.app/',
    tickify: 'https://tickify.live/',
    linkedin: '',
    facebook: '',
  },
  cvFile: {
    filename: '',
    originalName: '',
    url: '',
    sizeBytes: 0,
    uploadedAt: null,
    isPublic: false,
  },
  theme: {
    defaultTheme: 'dark',
    allowLightMode: true,
    allowDarkMode: true,
    primaryAccent: 'lime',
  },
  sectionVisibility: {
    about: true,
    skills: true,
    projects: true,
    experience: true,
    education: true,
    leadership: true,
    blog: true,
    contact: true,
  },
};

export const initialSkills = [
  // Development and Technical Skills
  { name: 'Flutter', category: 'Development and Technical Skills', isPrimary: true, displayOrder: 1, visible: true },
  { name: 'Dart', category: 'Development and Technical Skills', isPrimary: true, displayOrder: 2, visible: true },
  { name: 'Mobile Application Development', category: 'Development and Technical Skills', isPrimary: true, displayOrder: 3, visible: true },
  { name: 'Firebase', category: 'Development and Technical Skills', isPrimary: false, displayOrder: 4, visible: true },
  { name: 'REST API', category: 'Development and Technical Skills', isPrimary: false, displayOrder: 5, visible: true },
  { name: 'Node.js', category: 'Development and Technical Skills', isPrimary: false, displayOrder: 6, visible: true },
  { name: 'MongoDB', category: 'Development and Technical Skills', isPrimary: false, displayOrder: 7, visible: true },
  { name: 'Git', category: 'Development and Technical Skills', isPrimary: false, displayOrder: 8, visible: true },
  { name: 'GitHub', category: 'Development and Technical Skills', isPrimary: false, displayOrder: 9, visible: true },
  { name: 'Programming', category: 'Development and Technical Skills', isPrimary: false, displayOrder: 10, visible: true },
  { name: 'Software Development', category: 'Development and Technical Skills', isPrimary: false, displayOrder: 11, visible: true },
  { name: 'Android Studio', category: 'Development and Technical Skills', isPrimary: false, displayOrder: 12, visible: true },
  { name: 'Visual Studio Code', category: 'Development and Technical Skills', isPrimary: false, displayOrder: 13, visible: true },

  // Tools and Productivity
  { name: 'Microsoft Office', category: 'Tools and Productivity', isPrimary: false, displayOrder: 1, visible: true },
  { name: 'Computer Operations', category: 'Tools and Productivity', isPrimary: false, displayOrder: 2, visible: true },
  { name: 'Internet Research', category: 'Tools and Productivity', isPrimary: false, displayOrder: 3, visible: true },
  { name: 'ChatGPT', category: 'Tools and Productivity', isPrimary: false, displayOrder: 4, visible: true },
  { name: 'Gemini', category: 'Tools and Productivity', isPrimary: false, displayOrder: 5, visible: true },
  { name: 'GitHub Copilot', category: 'Tools and Productivity', isPrimary: false, displayOrder: 6, visible: true },

  // Professional Skills
  { name: 'Problem Solving', category: 'Professional Skills', isPrimary: false, displayOrder: 1, visible: true },
  { name: 'Critical Thinking', category: 'Professional Skills', isPrimary: false, displayOrder: 2, visible: true },
  { name: 'Leadership', category: 'Professional Skills', isPrimary: false, displayOrder: 3, visible: true },
  { name: 'Team Collaboration', category: 'Professional Skills', isPrimary: false, displayOrder: 4, visible: true },
  { name: 'Communication', category: 'Professional Skills', isPrimary: false, displayOrder: 5, visible: true },
  { name: 'Interpersonal Skills', category: 'Professional Skills', isPrimary: false, displayOrder: 6, visible: true },
  { name: 'Event Management', category: 'Professional Skills', isPrimary: false, displayOrder: 7, visible: true },
  { name: 'Customer Relationship Management', category: 'Professional Skills', isPrimary: false, displayOrder: 8, visible: true },
  { name: 'Time Management', category: 'Professional Skills', isPrimary: false, displayOrder: 9, visible: true },
  { name: 'Adaptability', category: 'Professional Skills', isPrimary: false, displayOrder: 10, visible: true },
  { name: 'Analytical Thinking', category: 'Professional Skills', isPrimary: false, displayOrder: 11, visible: true },
  { name: 'Organizational Skills', category: 'Professional Skills', isPrimary: false, displayOrder: 12, visible: true },
  { name: 'Decision Making', category: 'Professional Skills', isPrimary: false, displayOrder: 13, visible: true },
];

export const initialProjects = [
  {
    title: 'Suggest Me — Suggestion Sharing Platform',
    slug: 'suggest-me-suggestion-sharing-platform',
    shortDescription:
      'Suggest Me is a Flutter-based suggestion-sharing platform designed to provide a centralized, user-friendly system for submitting, browsing, discussing, and managing suggestions.',
    description:
      'Suggest Me is a Flutter-based suggestion-sharing platform designed to provide a centralized, user-friendly system for submitting, browsing, discussing, and managing suggestions. The frontend is built with Flutter and Dart and communicates with a RESTful backend developed using Node.js and MongoDB.',
    technologies: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    repositoryUrl: 'https://github.com/miel2793/Suggestion-Sharing-Platform',
    liveDemoUrl: '',
    image: '',
    gallery: [],
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    title: 'Annual Picnic (Remain-52) — Event Organizer',
    slug: 'annual-picnic-remain-52-event-organizer',
    shortDescription:
      'Organized and coordinated the CSE 52 Intake picnic at the BUBT Sports Complex.',
    description:
      'Organized and coordinated the CSE 52 Intake picnic at the BUBT Sports Complex. Responsibilities included event planning, budgeting, logistics, participant coordination, scheduling, venue arrangements, and volunteer management. Collaborated with faculty members and the organizing team to ensure a smooth and enjoyable event.',
    technologies: ['Event Management', 'Budgeting & Logistics', 'Team Leadership', 'Coordination'],
    repositoryUrl: '',
    liveDemoUrl: '',
    image: '',
    gallery: [],
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    title: 'Intra-Intake Programming Contest (IIPC 52) — Event Organizer',
    slug: 'intra-intake-programming-contest-iipc-52-event-organizer',
    shortDescription:
      'Organized and managed the Intra-Intake Programming Contest (IIPC 52) at the Department of CSE, BUBT involving 180+ participants.',
    description:
      'Organized and managed the Intra-Intake Programming Contest (IIPC 52) at the Department of Computer Science and Engineering, BUBT, held on March 22, 2024. Coordinated planning, registration, scheduling, volunteers, logistics, and communication. Collaborated with the BUBT competitive programming community on problem setting and online judging. The contest involved more than 180 participants.',
    technologies: ['Event Management', 'Problem Setting & Online Judging', 'Volunteer Management', 'Logistics'],
    repositoryUrl: '',
    liveDemoUrl: '',
    image: '',
    gallery: [],
    featured: true,
    published: true,
    displayOrder: 3,
  },
];

export const initialExperience = [
  {
    organization: 'Oriqon Technologies',
    position: 'Flutter Developer',
    employmentType: 'Contract',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: 'Contributing to mobile application development and software solutions.',
    organizationUrl: 'https://oriqontechnologies.com/member/md-miel-mahmud-sifat',
    logo: '',
    published: true,
    displayOrder: 1,
  },
  {
    organization: 'The Travel People',
    position: 'Customer Support Executive',
    employmentType: 'Full-time',
    startDate: 'December 2024',
    endDate: 'March 2025',
    isCurrent: false,
    description:
      'Worked in customer support and customer relationship management, developing communication, interpersonal, and problem-solving skills.',
    organizationUrl: '',
    logo: '',
    published: true,
    displayOrder: 2,
  },
  {
    organization: 'Freelance Developer',
    position: 'Mobile Application Developer',
    employmentType: 'Freelance',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    organizationUrl: '',
    logo: '',
    published: true,
    displayOrder: 3,
  },
];

export const initialEducation = [
  {
    institution: 'Bangladesh University of Business and Technology (BUBT)',
    degree: 'Bachelor of Science (B.Sc.)',
    field: 'Computer Science and Engineering (CSE)',
    startDate: 'July 2023',
    endDate: 'Present',
    description: 'Pursuing undergraduate degree in Computer Science and Engineering.',
    published: true,
    displayOrder: 1,
  },
  {
    institution: 'Dhaka Commerce College',
    degree: 'Higher Secondary Certificate (HSC)',
    field: 'Science',
    startDate: '2020',
    endDate: '2022',
    description: 'Completed higher secondary education in science.',
    published: true,
    displayOrder: 2,
  },
];

export const initialLeadership = [
  {
    organization: 'BUBT IT Club',
    role: 'President',
    description:
      'Leadership and organizational experience in a university technology club, supporting technology-related activities, student engagement, collaboration, and event organization.',
    organizationUrl: 'https://bitc-club.vercel.app/',
    startDate: '',
    endDate: '',
    image: '',
    visible: true,
    displayOrder: 1,
  },
  {
    organization: 'Tickify',
    role: 'Volunteer',
    description:
      "Contributed to the successful execution of more than 35 events, supporting event management, logistics, participant coordination, registration, crowd management, and on-site operations. Activities included Let's Vibe Concert, BPL Music Fest, Bangladesh Football Federation football matches, programming contests, hackathons, and university events.",
    organizationUrl: 'https://tickify.live/',
    startDate: '',
    endDate: '',
    image: '',
    visible: true,
    displayOrder: 2,
  },
  {
    organization: 'ICPC Asia Regional 2023',
    role: 'Technical Team Volunteer',
    description: 'Participated as a technical team volunteer for the ICPC Asia Regional 2023 event.',
    organizationUrl: '',
    startDate: '',
    endDate: '',
    image: '',
    visible: true,
    displayOrder: 3,
  },
  {
    organization: 'ICPC Dhaka Regional 2023',
    role: 'Logistics Team Volunteer',
    description: 'Participated as a logistics team volunteer for the ICPC Dhaka Regional 2023 event.',
    organizationUrl: '',
    startDate: '',
    endDate: '',
    image: '',
    visible: true,
    displayOrder: 4,
  },
  {
    organization: 'Bangladesh National Cadet Corps (BNCC)',
    role: 'Cadet Corporal (CPL)',
    description: 'Leadership, discipline, civic engagement, and national service.',
    organizationUrl: '',
    startDate: '',
    endDate: '',
    image: '',
    visible: true,
    displayOrder: 5,
  },
  {
    organization: 'BUBT CSE Department',
    role: 'Volunteer',
    description:
      'Supported programming competitions, hackathons, seminars, workshops, registration, participant coordination, logistics, technical support, and on-site event operations.',
    organizationUrl: '',
    startDate: '',
    endDate: '',
    image: '',
    visible: true,
    displayOrder: 6,
  },
];

export const initialBlogPost = {
  title: '[Demo Draft] Exploring Flutter Architecture and Responsive UI Patterns',
  slug: 'exploring-flutter-architecture-responsive-ui-patterns',
  excerpt:
    'A sample guide demonstrating clean state management, modular widget structure, and responsive mobile architecture in Flutter.',
  content: `### Architecture in Flutter Applications

Building high quality, maintainable mobile applications with Flutter requires thoughtful organization of state, services, and presentation widgets.

#### Core Principles
- **Separation of Concerns:** Keep business logic separated from UI rendering components.
- **Predictable State Flow:** Use structured patterns like Provider, Riverpod, or BLoC to ensure reproducible data flow.
- **Responsive Layouts:** Design with LayoutBuilder and MediaQuery to deliver seamless experiences across phones, foldables, and tablets.

*Note: This article is an initial demo draft created to showcase the dynamic blog system and rich Markdown rendering capabilities of the portfolio dashboard.*`,
  featuredImage: '',
  category: 'Mobile Development',
  tags: ['Flutter', 'Dart', 'Mobile', 'UI/UX'],
  status: 'draft', // Preserved as draft per privacy and requirements
  readingTimeMinutes: 3,
  seoTitle: 'Exploring Flutter Architecture — MD: Miel Mahmud Sifat',
  seoDescription: 'A sample guide covering clean state management and responsive mobile architecture.',
};

export const seedInitialDataIfEmpty = async () => {
  try {
    const adminCount = await dataStore.countDocuments('admin');
    if (adminCount === 0) {
      const email = (process.env.ADMIN_EMAIL || 'mahmudsifat2793@gmail.com').toLowerCase().trim();
      const rawPassword = process.env.ADMIN_INITIAL_PASSWORD || 'Admin@Miel2026!';
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(rawPassword, salt);

      await dataStore.create('admin', {
        email,
        passwordHash,
        name: 'MD: Miel Mahmud Sifat',
        role: 'admin',
      });
      console.log(`[Seed] Initial administrator initialized: ${email}`);
    }

    const settingsCount = await dataStore.findOne('settings');
    if (!settingsCount) {
      await dataStore.create('settings', initialVerifiedData);
      console.log('[Seed] Default site settings initialized.');
    }

    const skillsCount = await dataStore.countDocuments('skill');
    if (skillsCount === 0) {
      for (const s of initialSkills) {
        await dataStore.create('skill', s);
      }
      console.log(`[Seed] Initialized ${initialSkills.length} skills.`);
    }

    const projectsCount = await dataStore.countDocuments('project');
    if (projectsCount === 0) {
      for (const p of initialProjects) {
        await dataStore.create('project', p);
      }
      console.log(`[Seed] Initialized ${initialProjects.length} projects.`);
    }

    const expCount = await dataStore.countDocuments('experience');
    if (expCount === 0) {
      for (const e of initialExperience) {
        await dataStore.create('experience', e);
      }
      console.log(`[Seed] Initialized ${initialExperience.length} experience entries.`);
    }

    const eduCount = await dataStore.countDocuments('education');
    if (eduCount === 0) {
      for (const ed of initialEducation) {
        await dataStore.create('education', ed);
      }
      console.log(`[Seed] Initialized ${initialEducation.length} education entries (NO GPA).`);
    }

    const leadCount = await dataStore.countDocuments('leadership');
    if (leadCount === 0) {
      for (const l of initialLeadership) {
        await dataStore.create('leadership', l);
      }
      console.log(`[Seed] Initialized ${initialLeadership.length} leadership/volunteering entries.`);
    }

    const blogCount = await dataStore.countDocuments('blog');
    if (blogCount === 0) {
      await dataStore.create('blog', initialBlogPost);
      console.log('[Seed] Initialized sample demo draft blog post.');
    }

    console.log('[Seed] Database initialization verified.');
  } catch (err) {
    console.error('[Seed] Error during seeding:', err.message);
  }
};
