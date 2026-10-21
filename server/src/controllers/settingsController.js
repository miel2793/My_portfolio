import { dataStore } from '../utils/dataStore.js';
import { getIsConnected } from '../config/db.js';

export const getPublicSettings = async (req, res, next) => {
  try {
    let settings = await dataStore.findOne('settings');
    if (!settings) {
      settings = {};
    }

    // Explicitly return only public settings
    const publicData = {
      profile: settings.profile || {
        fullName: 'MD: Miel Mahmud Sifat',
        headline: 'Flutter Developer | Problem Solver | Event Management & Leadership | Technology Enthusiast',
        shortBio: 'Building useful mobile experiences, exploring technology, and helping communities through software and event leadership.',
        aboutSummary: 'Computer Science student and Flutter Developer with hands-on experience in developing cross-platform mobile applications, managing technical events, and customer relationship management. Strong problem-solving, leadership, and communication skills, with a passion for software development, technology, and delivering impactful solutions through teamwork and innovation.',
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
      socialLinks: settings.socialLinks || {
        github: 'https://github.com/miel2793',
        existingPortfolio: 'https://miel2793.github.io/My-Portfolio/',
        oriqonMemberUrl: 'https://oriqontechnologies.com/member/md-miel-mahmud-sifat',
        bubtItClub: 'https://bitc-club.vercel.app/',
        tickify: 'https://tickify.live/',
        linkedin: '',
        facebook: '',
      },
      theme: settings.theme || {
        defaultTheme: 'dark',
        allowLightMode: true,
        allowDarkMode: true,
        primaryAccent: 'lime',
      },
      sectionVisibility: settings.sectionVisibility || {
        about: true,
        skills: true,
        projects: true,
        experience: true,
        education: true,
        leadership: true,
        blog: true,
        contact: true,
      },
      hasPublicCV: Boolean(settings.cvFile?.isPublic && settings.cvFile?.url),
      cvUrl: settings.cvFile?.isPublic ? settings.cvFile.url : null,
    };

    res.json({
      success: true,
      data: publicData,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSettingsAdmin = async (req, res, next) => {
  try {
    let settings = await dataStore.findOne('settings');
    if (!settings) {
      settings = await dataStore.create('settings', {});
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    let settings = await dataStore.findOne('settings');

    if (!settings) {
      settings = await dataStore.create('settings', req.body);
    } else {
      const id = settings._id || settings.id;
      settings = await dataStore.findByIdAndUpdate('settings', id, req.body);
    }

    res.json({
      success: true,
      message: 'Settings updated successfully.',
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalProjects = await dataStore.countDocuments('project');
    const publishedProjects = await dataStore.countDocuments('project', { published: true });
    
    const totalBlogs = await dataStore.countDocuments('blog');
    const publishedBlogs = await dataStore.countDocuments('blog', { status: 'published' });
    
    const unreadMessages = await dataStore.countDocuments('message', { status: 'unread' });
    const totalMessages = await dataStore.countDocuments('message');

    const totalExperience = await dataStore.countDocuments('experience');
    const totalEducation = await dataStore.countDocuments('education');
    const totalSkills = await dataStore.countDocuments('skill');
    const totalLeadership = await dataStore.countDocuments('leadership');

    // Recent 5 messages
    const allMessages = await dataStore.find('message', {}, { createdAt: -1 });
    const recentMessages = allMessages.slice(0, 5);

    // Recent content activity
    const recentProjects = await dataStore.find('project', {}, { updatedAt: -1 });
    const recentBlogs = await dataStore.find('blog', {}, { updatedAt: -1 });

    const recentActivity = [
      ...recentProjects.slice(0, 3).map((p) => ({
        type: 'project',
        title: p.title,
        status: p.published ? 'published' : 'draft',
        date: p.updatedAt || p.createdAt,
      })),
      ...recentBlogs.slice(0, 3).map((b) => ({
        type: 'blog',
        title: b.title,
        status: b.status,
        date: b.updatedAt || b.createdAt,
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    res.json({
      success: true,
      stats: {
        totalProjects,
        publishedProjects,
        totalBlogs,
        publishedBlogs,
        unreadMessages,
        totalMessages,
        totalExperience,
        totalEducation,
        totalSkills,
        totalLeadership,
        databaseStatus: getIsConnected() ? 'MongoDB Connected' : 'Local DataStore Active',
        isMongoDBLive: getIsConnected(),
      },
      recentMessages,
      recentActivity,
    });
  } catch (error) {
    next(error);
  }
};
