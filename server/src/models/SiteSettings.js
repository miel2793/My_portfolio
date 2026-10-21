import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    profile: {
      fullName: {
        type: String,
        default: 'MD: Miel Mahmud Sifat',
      },
      headline: {
        type: String,
        default: 'Flutter Developer | Problem Solver | Event Management & Leadership | Technology Enthusiast',
      },
      shortBio: {
        type: String,
        default: 'Building useful mobile experiences, exploring technology, and helping communities through software and event leadership.',
      },
      aboutSummary: {
        type: String,
        default: 'Computer Science student and Flutter Developer with hands-on experience in developing cross-platform mobile applications, managing technical events, and customer relationship management. Strong problem-solving, leadership, and communication skills, with a passion for software development, technology, and delivering impactful solutions through teamwork and innovation.',
      },
      interests: [
        {
          type: String,
        },
      ],
      location: {
        type: String,
        default: 'Dhaka, Bangladesh',
      },
      email: {
        type: String,
        default: 'mahmudsifat2793@gmail.com',
      },
      phone: {
        type: String,
        default: '+8801981824807',
      },
      profileImage: {
        type: String,
        default: '/uploads/profile/miel.jpg',
      },
      availabilityStatus: {
        type: String,
        default: 'Available for opportunities & collaboration',
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
    socialLinks: {
      github: {
        type: String,
        default: 'https://github.com/miel2793',
      },
      existingPortfolio: {
        type: String,
        default: 'https://miel2793.github.io/My-Portfolio/',
      },
      oriqonMemberUrl: {
        type: String,
        default: 'https://oriqontechnologies.com/member/md-miel-mahmud-sifat',
      },
      bubtItClub: {
        type: String,
        default: 'https://bitc-club.vercel.app/',
      },
      tickify: {
        type: String,
        default: 'https://tickify.live/',
      },
      linkedin: {
        type: String,
        default: '',
      },
      facebook: {
        type: String,
        default: '',
      },
    },
    cvFile: {
      filename: {
        type: String,
        default: '',
      },
      originalName: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: '',
      },
      sizeBytes: {
        type: Number,
        default: 0,
      },
      uploadedAt: {
        type: Date,
        default: null,
      },
      isPublic: {
        type: Boolean,
        default: false,
      },
    },
    theme: {
      defaultTheme: {
        type: String,
        default: 'dark',
        enum: ['dark', 'light'],
      },
      allowLightMode: {
        type: Boolean,
        default: true,
      },
      allowDarkMode: {
        type: Boolean,
        default: true,
      },
      primaryAccent: {
        type: String,
        default: 'lime',
        enum: ['lime', 'emerald', 'cyan', 'violet', 'amber'],
      },
    },
    sectionVisibility: {
      about: { type: Boolean, default: true },
      skills: { type: Boolean, default: true },
      projects: { type: Boolean, default: true },
      experience: { type: Boolean, default: true },
      education: { type: Boolean, default: true },
      leadership: { type: Boolean, default: true },
      blog: { type: Boolean, default: true },
      contact: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
